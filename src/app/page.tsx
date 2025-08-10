'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { formatUnits } from 'viem'
import { useHealthFactor, useCollateralValue, useDscMinted } from '@/hooks'
import HealthFactorGauge from '@/components/HealthFactorGauge'
import Header from '@/components/Header'

export default function Home() {
  const { isConnected } = useAccount()
  const { healthFactor, isLoading: isLoadingHF } = useHealthFactor()
  const { collateralValue, isLoading: isLoadingCollateral } = useCollateralValue()
  const { dscMinted, isLoading: isLoadingDsc } = useDscMinted()
  
  // Format values for display
  const formattedCollateral = collateralValue 
    ? `$${(Number(formatUnits(collateralValue, 18))).toFixed(2)}`
    : '$0.00'
    
  const formattedDscMinted = dscMinted
    ? `${(Number(formatUnits(dscMinted, 18))).toFixed(2)} DSC`
    : '0 DSC'

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">DSC Dashboard</h1>
          <ConnectButton />
        </div>

      {!isConnected ? (
        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to DSC</h2>
          <p className="mb-6">Connect your wallet to manage your position</p>
          <ConnectButton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-medium mb-2">Health Factor</h2>
            <HealthFactorGauge healthFactor={healthFactor} isLoading={isLoadingHF} />
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-medium mb-2">Total Collateral (USD)</h2>
            {isLoadingCollateral ? (
              <div className="animate-pulse bg-muted h-8 rounded w-3/4"></div>
            ) : (
              <div className="text-2xl font-bold">{formattedCollateral}</div>
            )}
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-medium mb-2">DSC Debt</h2>
            {isLoadingDsc ? (
              <div className="animate-pulse bg-muted h-8 rounded w-3/4"></div>
            ) : (
              <div className="text-2xl font-bold">{formattedDscMinted}</div>
            )}
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-medium mb-2">Collateral Breakdown</h2>
            <div className="text-md">No collateral deposited</div>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/mint" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded text-center">
            Deposit & Mint
          </a>
          <a href="/redeem" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded text-center">
            Redeem & Burn
          </a>
          <a href="/liquidate" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded text-center">
            Liquidations
          </a>
        </div>
      </div>
    </div>
    </>
  )
}