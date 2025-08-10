'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Header from '@/components/Header'

export default function LiquidatePage() {
  const { isConnected } = useAccount()
  const [userAddress, setUserAddress] = useState('')
  const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>('WETH')
  const [debtToCover, setDebtToCover] = useState('')
  
  const handleSearch = async () => {
    // Implementation will be added later
    console.log('Searching for user', userAddress)
  }
  
  const handleLiquidate = async () => {
    // Implementation will be added later
    console.log('Liquidating', userAddress, 'covering', debtToCover, 'DSC with', selectedToken)
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Liquidations</h1>

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
                  >
                    Search
                  </button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter a user address to check if their position can be liquidated
                </p>
              </div>
            </div>

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
                <input 
                  type="text" 
                  className="w-full rounded border px-4 py-2"
                  value={debtToCover}
                  onChange={(e) => setDebtToCover(e.target.value)}
                  placeholder="0.0"
                />
              </div>
              
              <div className="mb-6 bg-muted/50 p-4 rounded">
                <h3 className="text-md font-medium mb-2">Liquidation Preview</h3>
                <div className="flex justify-between mb-2">
                  <span>Debt to cover:</span>
                  <span>{debtToCover || '0'} DSC</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Collateral received:</span>
                  <span>0 {selectedToken}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Bonus (10%):</span>
                  <span>0 {selectedToken}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>0 {selectedToken}</span>
                </div>
              </div>
              
              <button 
                className="bg-primary text-primary-foreground w-full py-2 rounded"
                onClick={handleLiquidate}
              >
                Liquidate Position
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
