'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseUnits, formatUnits } from 'viem'
import AccountInfo from '@/components/AccountInfo'
import { abis, addresses } from '@/lib/contracts'

// Token addresses on Sepolia
const tokenAddresses = {
  WETH: '0xdd13E55209Fd76AfE204dBda4007C227904f0a81' as `0x${string}`, // Sepolia WETH
  WBTC: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as `0x${string}`, // Sepolia WBTC
}

export default function LiquidatePage() {
  const { address, isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()
  
  const [userAddress, setUserAddress] = useState('')
  const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>('WETH')
  const [debtToCover, setDebtToCover] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  
  const [userHealthFactor, setUserHealthFactor] = useState<bigint | null>(null)
  const [minHealthFactor, setMinHealthFactor] = useState<bigint | null>(null)
  const [isLoadingHF, setIsLoadingHF] = useState(false)
  const [collateralReceived, setCollateralReceived] = useState('0')
  const [bonusAmount, setBonusAmount] = useState('0')
  const [totalReceived, setTotalReceived] = useState('0')

  // Health factor read contract
  const { data: healthFactorData, refetch: refetchHealthFactor } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getHealthFactor',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    query: { 
      enabled: false // We'll call this manually when needed
    }
  })
  
  // Min health factor read contract
  const { data: minHealthFactorData, refetch: refetchMinHealthFactor } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getMinHealthFactor',
    query: { 
      enabled: true // We can fetch this on component load
    }
  })
  
  // Get min health factor on component load
  useEffect(() => {
    if (minHealthFactorData) {
      setMinHealthFactor(minHealthFactorData as bigint)
    }
  }, [minHealthFactorData])

  // Helper to show status messages
  const showStatus = (message: string) => {
    setStatusMessage(message)
    setTimeout(() => setStatusMessage(''), 5000)
  }
  
  // Calculate liquidation preview
  useEffect(() => {
    if (!debtToCover || parseFloat(debtToCover) <= 0) {
      setCollateralReceived('0')
      setBonusAmount('0')
      setTotalReceived('0')
      return
    }
    
    // This is a simplified calculation for UI purposes
    // In a real implementation, we would use on-chain data for precision
    const debtAmountInUSD = parseFloat(debtToCover)
    
    // Mock token prices (in a real app, get these from chainlink oracles via contract)
    const tokenPriceUSD = selectedToken === 'WETH' ? 3500 : 65000
    
    // Calculate token amount from debt
    const baseTokenAmount = debtAmountInUSD / tokenPriceUSD
    
    // Apply 10% bonus
    const bonusTokenAmount = baseTokenAmount * 0.1
    
    // Total to receive
    const totalTokenAmount = baseTokenAmount + bonusTokenAmount
    
    setCollateralReceived(baseTokenAmount.toFixed(6))
    setBonusAmount(bonusTokenAmount.toFixed(6))
    setTotalReceived(totalTokenAmount.toFixed(6))
  }, [debtToCover, selectedToken])

  const handleSearch = async () => {
    if (!userAddress || !userAddress.startsWith('0x') || userAddress.length !== 42) {
      showStatus('Please enter a valid Ethereum address')
      return
    }
    
    try {
      setIsLoadingHF(true)
      showStatus('Checking health factor...')
      
      const result = await refetchHealthFactor()
      const healthFactor = result.data as bigint | undefined
      
      if (healthFactor) {
        setUserHealthFactor(healthFactor)
        
        // Health factor is stored with 18 decimals
        const hfValue = Number(formatUnits(healthFactor, 18))
        
        // Get min health factor (also with 18 decimals)
        const minHfValue = minHealthFactor ? Number(formatUnits(minHealthFactor, 18)) : 1.0
        
        // Check if position is liquidatable: health factor < min health factor
        if (hfValue < minHfValue) {
          showStatus(`Position can be liquidated! Health factor: ${hfValue.toFixed(2)} (Min: ${minHfValue.toFixed(2)})`)
        } else {
          showStatus(`Position is healthy (HF: ${hfValue.toFixed(2)}, Min: ${minHfValue.toFixed(2)}). Can't liquidate.`)
        }
      } else {
        showStatus('No position found for this address')
        setUserHealthFactor(null)
      }
    } catch (error) {
      console.error('Error searching for position:', error)
      showStatus('Error checking position')
      setUserHealthFactor(null)
    } finally {
      setIsLoadingHF(false)
    }
  }
  
  // Step 1: Handle DSC approval for liquidation
  const handleApprove = async () => {
    if (!isConnected || !address || !userAddress || !debtToCover || parseFloat(debtToCover) <= 0) {
      showStatus('Please connect wallet and enter valid values')
      return
    }
    
    // Check if position is liquidatable (health factor < minHealthFactor)
    const minHfValue = minHealthFactor ? Number(formatUnits(minHealthFactor, 18)) : 1.0
    if (userHealthFactor && Number(formatUnits(userHealthFactor, 18)) >= minHfValue) {
      showStatus(`This position is not liquidatable (health factor ≥ ${minHfValue.toFixed(2)})`)
      return
    }
    
    try {
      setIsApproving(true)
      showStatus('Approving DSC tokens...')
      
      // Get debt amount in wei based on user input
      let debtInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        debtInWei = BigInt(debtToCover)
      } catch {
        // If that fails, treat it as DSC and convert to wei (DSC has 18 decimals)
        debtInWei = parseUnits(debtToCover, 18)
      }
      
      // Call approve() directly on the DSC token contract
      // Following the pattern: dsc.approve(address(dscEngine), debtToCover);
      await writeContract({
        address: addresses.dscToken, // DSC token address
        // Basic ERC20 approve function ABI
        abi: [
          {
            inputs: [
              { name: "spender", type: "address" },
              { name: "amount", type: "uint256" }
            ],
            name: "approve",
            outputs: [{ name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        functionName: 'approve',
        // Parameters: dscEngine contract address, amount to approve
        args: [addresses.dscEngine, debtInWei],
      })
      
      showStatus('DSC tokens approved! You can now liquidate.')
      setIsApproved(true)
    } catch (error) {
      console.error('Error approving DSC tokens:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Approval failed'))
      setIsApproved(false)
    } finally {
      setIsApproving(false)
    }
  }

  // Step 2: Handle liquidation after approval
  const handleLiquidate = async () => {
    if (!isConnected || !address || !userAddress || !debtToCover || parseFloat(debtToCover) <= 0) {
      showStatus('Please connect wallet and enter valid values')
      return
    }
    
    // Check if position is liquidatable (health factor < minHealthFactor)
    const minHfValue = minHealthFactor ? Number(formatUnits(minHealthFactor, 18)) : 1.0
    if (userHealthFactor && Number(formatUnits(userHealthFactor, 18)) >= minHfValue) {
      showStatus(`This position is not liquidatable (health factor ≥ ${minHfValue.toFixed(2)})`)
      return
    }
    
    if (!isApproved) {
      showStatus('Please approve DSC tokens first')
      return
    }
    
    try {
      showStatus('Liquidating position...')
      
      // Get debt amount in wei based on user input
      let debtInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        debtInWei = BigInt(debtToCover)
      } catch {
        // If that fails, treat it as DSC and convert to wei (DSC has 18 decimals)
        debtInWei = parseUnits(debtToCover, 18)
      }
      
      await writeContract({
        address: addresses.dscEngine,
        abi: abis.dscEngine,
        functionName: 'liquidate',
        args: [tokenAddresses[selectedToken], userAddress as `0x${string}`, debtInWei],
      })
      
      showStatus('Liquidation successful!')
      setDebtToCover('')
      setIsApproved(false)
      
      // Refresh health factor
      handleSearch()
    } catch (error) {
      console.error('Error liquidating:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Transaction failed'))
    }
  }

  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Liquidations</h1>
        
        {statusMessage && (
          <div className="mb-4 p-4 rounded-md bg-primary/10 text-primary font-medium">
            {statusMessage}
          </div>
        )}

        {!isConnected ? (
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
            <p className="mb-6">You need to connect your wallet to perform liquidations</p>
            <ConnectButton />
          </div>
        ) : (
          <>
            <div className="bg-card rounded-lg p-6 shadow mb-8">
              <h2 className="text-xl font-medium mb-4">Find Liquidatable Positions</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">User Address</label>
                <div className="flex">
                  <input 
                    type="text" 
                    className="w-full rounded-l border px-4 py-2"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    placeholder="0x..."
                  />
                  <button 
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-r"
                    onClick={handleSearch}
                    disabled={isLoadingHF}
                  >
                    {isLoadingHF ? 'Searching...' : 'Search'}
                  </button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter a user address to check if their position can be liquidated
                </p>
              </div>
            </div>
            
            {userAddress && userAddress.startsWith('0x') && userAddress.length === 42 && (
              <div className="mb-8">
                <AccountInfo userAddress={userAddress as `0x${string}`} />
              </div>
            )}

            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-xl font-medium mb-4">Liquidate Position</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Collateral</label>
                <div className="flex gap-2">
                  <button 
                    className={`px-4 py-2 rounded ${selectedToken === 'WETH' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    onClick={() => setSelectedToken('WETH')}
                  >
                    WETH
                  </button>
                  <button 
                    className={`px-4 py-2 rounded ${selectedToken === 'WBTC' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    onClick={() => setSelectedToken('WBTC')}
                  >
                    WBTC
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Debt To Cover (DSC)</label>
                <div className="flex flex-col">
                  <input 
                    type="text" 
                    className="w-full rounded border px-4 py-2"
                    value={debtToCover}
                    onChange={(e) => {
                      setDebtToCover(e.target.value)
                      setIsApproved(false) // Reset approval when debt amount changes
                    }}
                    placeholder="0.0"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter value in wei (e.g. 1000000000000000000 for 1 DSC) or as decimal DSC units
                  </p>
                </div>
              </div>
              
              <div className="mb-6 bg-muted/50 p-4 rounded">
                <h3 className="text-md font-medium mb-2">Liquidation Preview</h3>
                <div className="flex justify-between mb-2">
                  <span>Debt to cover:</span>
                  <span>{debtToCover || '0'} DSC</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Collateral received:</span>
                  <span>{collateralReceived} {selectedToken}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Bonus (10%):</span>
                  <span>{bonusAmount} {selectedToken}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{totalReceived} {selectedToken}</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  className={`w-full py-2 rounded ${
                    !userHealthFactor || !minHealthFactor || 
                    Number(formatUnits(userHealthFactor || BigInt(0), 18)) >= Number(formatUnits(minHealthFactor, 18))
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                  onClick={handleApprove}
                  disabled={isPending || isApproving || isApproved || 
                    !userHealthFactor || !minHealthFactor ||
                    Number(formatUnits(userHealthFactor || BigInt(0), 18)) >= Number(formatUnits(minHealthFactor, 18))}
                >
                  {isApproving 
                    ? 'Approving...' 
                    : isApproved 
                      ? 'Approved ✓' 
                      : !userHealthFactor 
                        ? 'Search for a user first'
                        : !minHealthFactor
                          ? 'Loading min health factor...'
                          : Number(formatUnits(userHealthFactor || BigInt(0), 18)) >= Number(formatUnits(minHealthFactor, 18))
                            ? 'Position is healthy (cannot liquidate)'
                            : 'Step 1: Approve DSC'
                  }
                </button>
                
                <button 
                  className={`w-full py-2 rounded ${
                    isApproved && userHealthFactor && minHealthFactor && 
                    Number(formatUnits(userHealthFactor || BigInt(0), 18)) < Number(formatUnits(minHealthFactor, 18))
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                  onClick={handleLiquidate}
                  disabled={isPending || !isApproved || 
                    !userHealthFactor || !minHealthFactor ||
                    Number(formatUnits(userHealthFactor || BigInt(0), 18)) >= Number(formatUnits(minHealthFactor, 18))}
                >
                  {isPending 
                    ? 'Processing...' 
                    : !isApproved 
                      ? 'Approval required first'
                      : 'Step 2: Liquidate Position'
                  }
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
