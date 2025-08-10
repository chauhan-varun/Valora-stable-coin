'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import HealthFactorGauge from '@/components/HealthFactorGauge'
import { useHealthFactor } from '@/hooks/useHealthFactor'
import Header from '@/components/Header'

export default function RedeemPage() {
  const { isConnected } = useAccount()
  const { healthFactor, isLoading } = useHealthFactor()
  const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>('WETH')
  const [collateralAmount, setCollateralAmount] = useState('')
  const [dscAmount, setDscAmount] = useState('')

  const handleRedeem = async () => {
    // Implementation will be added later
    console.log('Redeeming', collateralAmount, selectedToken)
  }

  const handleBurn = async () => {
    // Implementation will be added later
    console.log('Burning', dscAmount, 'DSC')
  }

  const handleCombined = async () => {
    // Implementation will be added later
    console.log('Redeeming and burning', collateralAmount, selectedToken, dscAmount, 'DSC')
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Redeem & Burn</h1>

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
              >
                Redeem
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
              >
                Burn DSC
              </button>
              
              <button 
                className="bg-primary text-primary-foreground w-full py-2 rounded"
                onClick={handleCombined}
              >
                Redeem & Burn Together
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">Health Factor Preview</h2>
          <div className="bg-card rounded-lg p-6 shadow">
            <HealthFactorGauge healthFactor={healthFactor} isLoading={isLoading} />
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
