'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseUnits } from 'viem'
import HealthFactorGauge from '@/components/HealthFactorGauge'
import { useHealthFactor } from '@/hooks/useHealthFactor'
import { abis, addresses } from '@/lib/contracts'
import { cn } from '@/lib/utils'

  // Token addresses on Sepolia
const tokenAddresses = {
  WETH: '0xdd13E55209Fd76AfE204dBda4007C227904f0a81' as `0x${string}`, // Sepolia WETH
  WBTC: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as `0x${string}`, // Sepolia WBTC
}

export default function MintPage() {
  const { address, isConnected } = useAccount()
  const { healthFactor, isLoading: isLoadingHF, refetch: refetchHF } = useHealthFactor()
  const { writeContract, isPending } = useWriteContract()
  
  // Token and amount states
  const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>('WETH')
  const [collateralAmount, setCollateralAmount] = useState('')
  const [dscAmount, setDscAmount] = useState('')
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  
  // UI view modes: 'combined' (default), 'deposit', or 'mint'
  const [viewMode, setViewMode] = useState<'combined' | 'deposit' | 'mint'>('combined')
  const [animateTab, setAnimateTab] = useState(false)
  
  // Handle tab change with animation
  const changeTab = (tab: 'combined' | 'deposit' | 'mint') => {
    if (tab === viewMode) return
    setAnimateTab(false)
    setTimeout(() => {
      setViewMode(tab)
      setAnimateTab(true)
    }, 200)
  }
  
  // Initialize animation on first render
  useEffect(() => {
    setAnimateTab(true)
  }, [])

  // Helper to show status messages
  const showStatus = (message: string) => {
    setStatusMessage(message)
    setTimeout(() => setStatusMessage(''), 5000)
  }

  // Step 1: Handle token approval - calling approve() directly on the ERC20 token
  const handleApprove = async () => {
    if (!isConnected || !address || !collateralAmount || parseFloat(collateralAmount) <= 0) {
      showStatus('Please connect wallet and enter a valid amount')
      return
    }
    
    try {
      setIsApproving(true)
      showStatus('Approving tokens...')
      
      // If the user wants to input the exact amount in wei
      let amountInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        amountInWei = BigInt(collateralAmount)
      } catch {
        // If that fails, treat it as ETH and convert to wei
        const decimals = selectedToken === 'WETH' ? 18 : 8
        amountInWei = parseUnits(collateralAmount, decimals)
      }
      
      // Call approve() directly on the ERC20 token contract
      // This is exactly what happens in the test: ERC20Mock(weth).approve(address(dscEngine), AMOUNT_COLLATERAL)
      await writeContract({
        address: tokenAddresses[selectedToken],
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
      
      showStatus('Tokens approved! You can now deposit.')
      setIsApproved(true)
    } catch (error) {
      console.error('Error approving tokens:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Approval failed'))
      setIsApproved(false)
    } finally {
      setIsApproving(false)
    }
  }
  
  // Step 2: Handle deposit after approval
  const handleDeposit = async () => {
    if (!isConnected || !address || !collateralAmount || parseFloat(collateralAmount) <= 0) {
      showStatus('Please connect wallet and enter a valid amount')
      return
    }
    
    if (!isApproved) {
      showStatus('Please approve tokens first')
      return
    }
    
    try {
      showStatus('Depositing collateral...')
      
      // Deposit collateral
      // If the user wants to input the exact amount in wei
      let amountInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        amountInWei = BigInt(collateralAmount)
      } catch {
        // If that fails, treat it as ETH and convert to wei
        const decimals = selectedToken === 'WETH' ? 18 : 8
        amountInWei = parseUnits(collateralAmount, decimals)
      }
      
      await writeContract({
        address: addresses.dscEngine,
        abi: abis.dscEngine,
        functionName: 'depositCollateral',
        args: [tokenAddresses[selectedToken], amountInWei],
      })
      
      showStatus('Deposit successful!')
      setCollateralAmount('')
      setIsApproved(false)
      refetchHF()
    } catch (error) {
      console.error('Error depositing:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Transaction failed'))
    }
  }

  const handleMint = async () => {
    if (!isConnected || !address || !dscAmount || parseFloat(dscAmount) <= 0) {
      showStatus('Please connect wallet and enter a valid amount')
      return
    }
    
    try {
      showStatus('Minting DSC...')
      
      // Mint DSC
      // Handle the DSC amount input as well
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
        functionName: 'mintDsc',
        args: [amountInWei],
      })
      
      showStatus('Mint successful!')
      setDscAmount('')
      refetchHF()
    } catch (error) {
      console.error('Error minting:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Transaction failed'))
    }
  }

  // Handle combined operation - first approve, then separately deposit and mint
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
      showStatus('Approving tokens for combined operation...')
      
      // If the user wants to input the exact amount in wei
      let amountInWei: bigint;
      try {
        // Try to parse the input directly as a bigint (wei)
        amountInWei = BigInt(collateralAmount)
      } catch {
        // If that fails, treat it as ETH and convert to wei
        const decimals = selectedToken === 'WETH' ? 18 : 8
        amountInWei = parseUnits(collateralAmount, decimals)
      }
      
      // Call approve() directly on the ERC20 token contract - just like in the test
      // This exactly matches: ERC20Mock(weth).approve(address(dscEngine), AMOUNT_COLLATERAL)
      await writeContract({
        address: tokenAddresses[selectedToken],
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
      
      showStatus('Tokens approved! You can now deposit and mint.')
      setIsApproved(true)
    } catch (error) {
      console.error('Error approving tokens:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Approval failed'))
      setIsApproved(false)
    } finally {
      setIsApproving(false)
    }
  }
  
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
      showStatus('Please approve tokens first')
      return
    }
    
    try {
      showStatus('Depositing collateral and minting DSC...')
      
      // Deposit and mint
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
        // If that fails, treat it as DSC and convert to wei (DSC has 18 decimals)
        dscAmountInWei = parseUnits(dscAmount, 18)
      }
      
      await writeContract({
        address: addresses.dscEngine,
        abi: abis.dscEngine,
        functionName: 'depositCollateralAndMintDsc',
        args: [tokenAddresses[selectedToken], collateralAmountInWei, dscAmountInWei],
      })
      
      showStatus('Deposit and mint successful!')
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
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fadeIn">Deposit & Mint</h1>
        
        {statusMessage && (
          <div className="mb-4 p-4 rounded-md bg-primary/10 text-primary font-medium">
            {statusMessage}
          </div>
                )}

        {/* View mode selector tabs */}
        <div className="mb-6 border-b">
          <div className="flex gap-4">
            <button 
              className={cn(
                'px-4 py-2 -mb-px transition-all duration-300 relative',
                viewMode === 'combined' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => changeTab('combined')}
            >
              Combined
              {viewMode === 'combined' && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary animate-scaleIn" />
              )}
            </button>
            <button 
              className={cn(
                'px-4 py-2 -mb-px transition-all duration-300 relative',
                viewMode === 'deposit' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => changeTab('deposit')}
            >
              Deposit Only
              {viewMode === 'deposit' && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary animate-scaleIn" />
              )}
            </button>
            <button 
              className={cn(
                'px-4 py-2 -mb-px transition-all duration-300 relative',
                viewMode === 'mint' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => changeTab('mint')}
            >
              Mint Only
              {viewMode === 'mint' && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary animate-scaleIn" />
              )}
            </button>
          </div>
        </div>
        
        <div className={cn('transition-opacity duration-200', animateTab ? 'opacity-100' : 'opacity-0')}>
        {!isConnected ? (
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
            <p className="mb-6">You need to connect your wallet to deposit collateral and mint DSC</p>
            <ConnectButton />
          </div>
        ) : viewMode === 'combined' ? (
          // COMBINED VIEW - DEFAULT
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-medium mb-4">Deposit Collateral & Mint DSC</h2>
            
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
                  <input 
                    type="text" 
                    className="w-full rounded border px-4 py-2"
                    value={dscAmount}
                    onChange={(e) => {
                      setDscAmount(e.target.value)
                      setIsApproved(false)
                    }}
                    placeholder="0.0"
                  />
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
                {isApproving ? 'Approving...' : isApproved ? 'Approved ✓' : 'Step 1: Approve'}
              </button>
              
              <button 
                className={`w-full py-2 rounded ${isApproved ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={handleCombined}
                disabled={isPending || !isApproved}
              >
                {isPending ? 'Processing...' : 'Step 2: Deposit & Mint'}
              </button>
            </div>
          </div>
        ) : viewMode === 'deposit' ? (
          // DEPOSIT ONLY VIEW
          <div className="bg-card rounded-lg p-6 shadow max-w-md mx-auto">
            <h2 className="text-xl font-medium mb-4">Deposit Collateral</h2>
            
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
            
            <div className="flex flex-col gap-2">
              <button 
                className="bg-primary text-primary-foreground w-full py-2 rounded"
                onClick={handleApprove}
                disabled={isPending || isApproving || isApproved}
              >
                {isApproving ? 'Approving...' : isApproved ? 'Approved ✓' : 'Step 1: Approve'}
              </button>
              
              <button 
                className={`w-full py-2 rounded ${isApproved ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={handleDeposit}
                disabled={isPending || !isApproved}
              >
                {isPending ? 'Depositing...' : 'Step 2: Deposit'}
              </button>
            </div>
          </div>
        ) : (
          // MINT ONLY VIEW
          <div className="bg-card rounded-lg p-6 shadow max-w-md mx-auto">
            <h2 className="text-xl font-medium mb-4">Mint DSC</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <div className="flex flex-col">
                <input 
                  type="text" 
                  className="w-full rounded border px-4 py-2"
                  value={dscAmount}
                  onChange={(e) => {
                    setDscAmount(e.target.value)
                  }}
                  placeholder="0.0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter value in wei (e.g. 1000000000000000000 for 1 DSC) or as decimal DSC units
                </p>
              </div>
            </div>
            
            <button 
              className="bg-primary text-primary-foreground w-full py-2 rounded"
              onClick={handleMint}
              disabled={isPending}
            >
              {isPending ? 'Minting...' : 'Mint DSC'}
            </button>
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
      </div>
    </>
  )
}
