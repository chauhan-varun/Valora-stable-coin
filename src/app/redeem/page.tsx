'use client'

import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseUnits } from 'viem'
import HealthFactorGauge from '@/components/HealthFactorGauge'
import { useHealthFactor } from '@/hooks/useHealthFactor'
import { abis, addresses } from '@/lib/contracts'

// Token addresses on Sepolia
const tokenAddresses = {
  WETH: '0xdd13E55209Fd76AfE204dBda4007C227904f0a81' as `0x${string}`, // Sepolia WETH
  WBTC: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as `0x${string}`, // Sepolia WBTC
}

export default function RedeemPage() {
  const { address, isConnected } = useAccount()
  const { healthFactor, isLoading: isLoadingHF, refetch: refetchHF } = useHealthFactor()
  const { writeContract, isPending } = useWriteContract()
  
  const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>('WETH')
  const [collateralAmount, setCollateralAmount] = useState('')
  const [dscAmount, setDscAmount] = useState('')
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  
  // UI view modes: 'combined' (default), 'redeem', or 'burn'
  const [viewMode, setViewMode] = useState<'combined' | 'redeem' | 'burn'>('combined')

  // Helper to show status messages
  const showStatus = (message: string) => {
    setStatusMessage(message)
    setTimeout(() => setStatusMessage(''), 5000)
  }

  const handleRedeem = async () => {
    if (!isConnected || !address || !collateralAmount || parseFloat(collateralAmount) <= 0) {
      showStatus('Please connect wallet and enter a valid amount')
      return
    }
    
    try {
      showStatus('Redeeming collateral...')
      
      // Redeem collateral
      const decimals = selectedToken === 'WETH' ? 18 : 8
      const amountInWei = parseUnits(collateralAmount, decimals)
      
      await writeContract({
        address: addresses.dscEngine,
        abi: abis.dscEngine,
        functionName: 'redeemCollateral',
        args: [tokenAddresses[selectedToken], amountInWei],
      })
      
      showStatus('Redemption successful!')
      setCollateralAmount('')
      refetchHF()
    } catch (error) {
      console.error('Error redeeming:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Transaction failed'))
    }
  }

  // Step 1: Handle DSC approval for burning
  const handleBurnApprove = async () => {
    if (!isConnected || !address || !dscAmount || parseFloat(dscAmount) <= 0) {
      showStatus('Please connect wallet and enter a valid amount')
      return
    }
    
    try {
      setIsApproving(true)
      showStatus('Approving DSC tokens...')
      
      // Get amount in wei based on user input
      let amountInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        amountInWei = BigInt(dscAmount)
      } catch {
        // If that fails, treat it as DSC and convert to wei (DSC has 18 decimals)
        amountInWei = parseUnits(dscAmount, 18)
      }
      
      // Call approve() directly on the DSC token contract
      // Following the pattern: dsc.approve(address(dscEngine), amountToBurn);
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
        args: [addresses.dscEngine, amountInWei],
      })
      
      showStatus('DSC tokens approved! You can now burn.')
      setIsApproved(true)
    } catch (error) {
      console.error('Error approving DSC tokens:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Approval failed'))
      setIsApproved(false)
    } finally {
      setIsApproving(false)
    }
  }
  
  // Step 2: Handle burning of DSC after approval
  const handleBurn = async () => {
    if (!isConnected || !address || !dscAmount || parseFloat(dscAmount) <= 0) {
      showStatus('Please connect wallet and enter a valid amount')
      return
    }
    
    if (!isApproved) {
      showStatus('Please approve DSC tokens first')
      return
    }
    
    try {
      showStatus('Burning DSC...')
      
      // Handle the amount input - support both direct wei input and decimal DSC
      let amountInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        amountInWei = BigInt(dscAmount)
      } catch {
        // If that fails, treat it as DSC and convert to wei (DSC has 18 decimals)
        amountInWei = parseUnits(dscAmount, 18)
      }
      
      await writeContract({
        address: addresses.dscEngine,
        abi: abis.dscEngine,
        functionName: 'burnDsc',
        args: [amountInWei],
      })
      
      showStatus('Burn successful!')
      setDscAmount('')
      setIsApproved(false)
      refetchHF()
    } catch (error) {
      console.error('Error burning:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Transaction failed'))
    }
  }

  // Step 1: Handle DSC approval for combined operation
  const handleCombinedApprove = async () => {
    if (
      !isConnected || 
      !address || 
      !collateralAmount || 
      parseFloat(collateralAmount) <= 0 ||
      !dscAmount ||
      parseFloat(dscAmount) <= 0
    ) {
      showStatus('Please connect wallet and enter valid amounts')
      return
    }
    
    try {
      setIsApproving(true)
      showStatus('Approving DSC tokens...')
      
      // Get DSC amount in wei based on user input
      let dscAmountInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        dscAmountInWei = BigInt(dscAmount)
      } catch {
        // If that fails, treat it as DSC and convert to wei
        dscAmountInWei = parseUnits(dscAmount, 18)
      }
      
      // Call approve() on DSC token
      await writeContract({
        address: addresses.dscToken,
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
        args: [addresses.dscEngine, dscAmountInWei],
      })
      
      showStatus('DSC tokens approved! You can now redeem and burn.')
      setIsApproved(true)
    } catch (error) {
      console.error('Error approving DSC tokens:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Approval failed'))
      setIsApproved(false)
    } finally {
      setIsApproving(false)
    }
  }
  
  // Step 2: Handle combined redeem and burn after approval
  const handleCombined = async () => {
    if (
      !isConnected || 
      !address || 
      !collateralAmount || 
      parseFloat(collateralAmount) <= 0 ||
      !dscAmount ||
      parseFloat(dscAmount) <= 0
    ) {
      showStatus('Please connect wallet and enter valid amounts')
      return
    }
    
    if (!isApproved) {
      showStatus('Please approve DSC tokens first')
      return
    }
    
    try {
      showStatus('Processing redeem and burn...')
      
      // Handle collateral amount
      let collateralAmountInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        collateralAmountInWei = BigInt(collateralAmount)
      } catch {
        // If that fails, treat it as token units and convert to wei
        const tokenDecimals = selectedToken === 'WETH' ? 18 : 8
        collateralAmountInWei = parseUnits(collateralAmount, tokenDecimals)
      }
      
      // Handle DSC amount
      let dscAmountInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        dscAmountInWei = BigInt(dscAmount)
      } catch {
        // If that fails, treat it as DSC and convert to wei
        dscAmountInWei = parseUnits(dscAmount, 18)
      }
      
      await writeContract({
        address: addresses.dscEngine,
        abi: abis.dscEngine,
        functionName: 'redeemCollateralForDsc',
        args: [tokenAddresses[selectedToken], collateralAmountInWei, dscAmountInWei],
      })
      
      showStatus('Redeem and burn successful!')
      setCollateralAmount('')
      setDscAmount('')
      setIsApproved(false)
      refetchHF()
    } catch (error) {
      console.error('Error in combined operation:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Transaction failed'))
    }
  }

  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Redeem & Burn</h1>
        
        {statusMessage && (
          <div className="mb-4 p-4 rounded-md bg-primary/10 text-primary font-medium">
            {statusMessage}
          </div>
        )}
        
        {/* View mode selector tabs */}
        <div className="mb-6 border-b">
          <div className="flex gap-4">
            <button 
              className={`px-4 py-2 -mb-px ${viewMode === 'combined' ? 'text-primary border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('combined')}
            >
              Combined
            </button>
            <button 
              className={`px-4 py-2 -mb-px ${viewMode === 'redeem' ? 'text-primary border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('redeem')}
            >
              Redeem Only
            </button>
            <button 
              className={`px-4 py-2 -mb-px ${viewMode === 'burn' ? 'text-primary border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('burn')}
            >
              Burn Only
            </button>
          </div>
        </div>

        {!isConnected ? (
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
            <p className="mb-6">You need to connect your wallet to redeem collateral and burn DSC</p>
            <ConnectButton />
          </div>
        ) : viewMode === 'combined' ? (
          // COMBINED VIEW - DEFAULT
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-medium mb-4">Redeem Collateral & Burn DSC</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Token</label>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Collateral Amount</label>
                <div className="flex flex-col">
                  <div className="flex">
                    <input 
                      type="text" 
                      className="w-full rounded-l border px-4 py-2"
                      value={collateralAmount}
                      onChange={(e) => {
                        setCollateralAmount(e.target.value)
                        setIsApproved(false)
                      }}
                      placeholder="0.0"
                    />
                    <button 
                      className="bg-muted px-4 py-2 rounded-r"
                      onClick={() => setCollateralAmount('Max')}
                    >
                      Max
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter value in wei (e.g. 1000000000000000000 for 1 ETH) or as decimal ETH units
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">DSC Amount</label>
                <div className="flex flex-col">
                  <div className="flex">
                    <input 
                      type="text" 
                      className="w-full rounded-l border px-4 py-2"
                      value={dscAmount}
                      onChange={(e) => {
                        setDscAmount(e.target.value)
                        setIsApproved(false)
                      }}
                      placeholder="0.0"
                    />
                    <button 
                      className="bg-muted px-4 py-2 rounded-r"
                      onClick={() => setDscAmount('Max')}
                    >
                      Max
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter value in wei (e.g. 1000000000000000000 for 1 DSC) or as decimal DSC units
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button 
                className="bg-primary text-primary-foreground w-full py-2 rounded"
                onClick={handleCombinedApprove}
                disabled={isPending || isApproving || isApproved}
              >
                {isApproving ? 'Approving...' : isApproved ? 'Approved ✓' : 'Step 1: Approve DSC'}
              </button>
              
              <button 
                className={`w-full py-2 rounded ${isApproved ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={handleCombined}
                disabled={isPending || !isApproved}
              >
                {isPending ? 'Processing...' : 'Step 2: Redeem & Burn'}
              </button>
            </div>
          </div>
        ) : viewMode === 'redeem' ? (
          // REDEEM ONLY VIEW
          <div className="bg-card rounded-lg p-6 shadow max-w-md mx-auto">
            <h2 className="text-xl font-medium mb-4">Redeem Collateral</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Token</label>
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
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <div className="flex flex-col">
                <div className="flex">
                  <input 
                    type="text" 
                    className="w-full rounded-l border px-4 py-2"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(e.target.value)}
                    placeholder="0.0"
                  />
                  <button 
                    className="bg-muted px-4 py-2 rounded-r"
                    onClick={() => setCollateralAmount('Max')}
                  >
                    Max
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter value in wei (e.g. 1000000000000000000 for 1 ETH) or as decimal ETH units
                </p>
              </div>
            </div>
            
            <button 
              className="bg-primary text-primary-foreground w-full py-2 rounded"
              onClick={handleRedeem}
              disabled={isPending}
            >
              {isPending ? 'Redeeming...' : 'Redeem Collateral'}
            </button>
          </div>
        ) : (
          // BURN ONLY VIEW
          <div className="bg-card rounded-lg p-6 shadow max-w-md mx-auto">
            <h2 className="text-xl font-medium mb-4">Burn DSC</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <div className="flex flex-col">
                <div className="flex">
                  <input 
                    type="text" 
                    className="w-full rounded-l border px-4 py-2"
                    value={dscAmount}
                    onChange={(e) => {
                      setDscAmount(e.target.value)
                      setIsApproved(false)
                    }}
                    placeholder="0.0"
                  />
                  <button 
                    className="bg-muted px-4 py-2 rounded-r"
                    onClick={() => setDscAmount('Max')}
                  >
                    Max
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter value in wei (e.g. 1000000000000000000 for 1 DSC) or as decimal DSC units
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button 
                className="bg-primary text-primary-foreground w-full py-2 rounded"
                onClick={handleBurnApprove}
                disabled={isPending || isApproving || isApproved}
              >
                {isApproving ? 'Approving...' : isApproved ? 'Approved ✓' : 'Step 1: Approve DSC'}
              </button>
              
              <button 
                className={`w-full py-2 rounded ${isApproved ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={handleBurn}
                disabled={isPending || !isApproved}
              >
                {isPending ? 'Burning...' : 'Step 2: Burn DSC'}
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">Health Factor Preview</h2>
          <div className="bg-card rounded-lg p-6 shadow">
            <HealthFactorGauge healthFactor={healthFactor} isLoading={isLoadingHF} />
            <p className="mt-4 text-sm text-muted-foreground">
              Your health factor represents the safety of your position. 
              A health factor below 1.0 puts your position at risk of liquidation.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
