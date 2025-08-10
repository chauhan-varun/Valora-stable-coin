'use client'

import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseUnits } from 'viem'
import HealthFactorGauge from '@/components/HealthFactorGauge'
import { useHealthFactor } from '@/hooks/useHealthFactor'
import { abis, addresses } from '@/lib/contracts'
import Header from '@/components/Header'

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
  const [statusMessage, setStatusMessage] = useState('')

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

  const handleBurn = async () => {
    if (!isConnected || !address || !dscAmount || parseFloat(dscAmount) <= 0) {
      showStatus('Please connect wallet and enter a valid amount')
      return
    }
    
    try {
      showStatus('Burning DSC...')
      
      // Burn DSC
      const amountInWei = parseUnits(dscAmount, 18) // DSC has 18 decimals
      
      await writeContract({
        address: addresses.dscEngine,
        abi: abis.dscEngine,
        functionName: 'burnDsc',
        args: [amountInWei],
      })
      
      showStatus('Burn successful!')
      setDscAmount('')
      refetchHF()
    } catch (error) {
      console.error('Error burning:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Transaction failed'))
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
    
    try {
      showStatus('Processing redeem and burn...')
      
      // Redeem and burn
      const tokenDecimals = selectedToken === 'WETH' ? 18 : 8
      const collateralAmountInWei = parseUnits(collateralAmount, tokenDecimals)
      const dscAmountInWei = parseUnits(dscAmount, 18) // DSC has 18 decimals
      
      await writeContract({
        address: addresses.dscEngine,
        abi: abis.dscEngine,
        functionName: 'redeemCollateralForDsc',
        args: [tokenAddresses[selectedToken], collateralAmountInWei, dscAmountInWei],
      })
      
      showStatus('Redeem and burn successful!')
      setCollateralAmount('')
      setDscAmount('')
      refetchHF()
    } catch (error) {
      console.error('Error in combined operation:', error)
      showStatus('Error: ' + (error instanceof Error ? error.message : 'Transaction failed'))
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Redeem & Burn</h1>
        
        {statusMessage && (
          <div className="mb-4 p-4 rounded-md bg-primary/10 text-primary font-medium">
            {statusMessage}
          </div>
        )}

        {!isConnected ? (
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
            <p className="mb-6">You need to connect your wallet to redeem collateral and burn DSC</p>
            <ConnectButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-6 shadow">
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
              </div>
              
              <button 
                className="bg-primary text-primary-foreground w-full py-2 rounded"
                onClick={handleRedeem}
                disabled={isPending}
              >
                {isPending ? 'Processing...' : 'Redeem'}
              </button>
            </div>

            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-xl font-medium mb-4">Burn DSC</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="flex">
                  <input 
                    type="text" 
                    className="w-full rounded-l border px-4 py-2"
                    value={dscAmount}
                    onChange={(e) => setDscAmount(e.target.value)}
                    placeholder="0.0"
                  />
                  <button 
                    className="bg-muted px-4 py-2 rounded-r"
                    onClick={() => setDscAmount('Max')}
                  >
                    Max
                  </button>
                </div>
              </div>
              
              <button 
                className="bg-primary text-primary-foreground w-full py-2 rounded mb-4"
                onClick={handleBurn}
                disabled={isPending}
              >
                {isPending ? 'Processing...' : 'Burn DSC'}
              </button>
              
              <button 
                className="bg-primary text-primary-foreground w-full py-2 rounded"
                onClick={handleCombined}
                disabled={isPending}
              >
                {isPending ? 'Processing...' : 'Redeem & Burn Together'}
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
