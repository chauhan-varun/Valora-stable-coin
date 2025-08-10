'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { formatUnits } from 'viem'
import { useHealthFactor, useCollateralValue, useDscMinted } from '@/hooks'
import HealthFactorGauge from '@/components/HealthFactorGauge'
import AccountInfo from '@/components/AccountInfo'
import Image from 'next/image'

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
    <div className="animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-slideInLeft">DSC Dashboard</h1>
          <div className="animate-slideInRight">
            <ConnectButton />
          </div>
        </div>

        {!isConnected ? (
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 text-center border border-border/50 shadow-lg animate-slideInUp hover-card">
            <div className="flex justify-center mb-6 animate-float">
              <Image src="/logo.png" alt="Valora" width={80} height={80} className="rounded-xl animate-pulse-subtle" />
            </div>
            <h2 className="text-2xl font-bold mb-4 gradient-text">Welcome to Valora</h2>
            <p className="mb-6 text-muted-foreground">Connect your wallet to manage your decentralized stablecoin position</p>
            <ConnectButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideInUp">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-border/50 hover-card transition-all">
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-pulse-subtle">
                  <path d="M5 3v16h16"/>
                  <path d="m5 19 6-6 4 4 6-6"/>
                </svg>
                Position Health
              </h2>
              <HealthFactorGauge healthFactor={healthFactor} isLoading={isLoadingHF} />
            </div>
            
            <div className="col-span-1 md:col-span-2 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <AccountInfo />
            </div>
          </div>
        )}
        
        <div className="mt-10 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-bold mb-6 gradient-text">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/mint" className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 px-6 py-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover-card">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2v20"/>
                    <path d="M2 12h20"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Deposit & Mint</h3>
              <p className="text-sm text-muted-foreground">Add collateral and mint DSC</p>
            </a>
            <a href="/redeem" className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 px-6 py-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover-card">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2v6"/>
                    <path d="m4.93 10.93 1.41 1.41"/>
                    <path d="M2 18h2"/>
                    <path d="M20 18h2"/>
                    <path d="m19.07 10.93-1.41 1.41"/>
                    <path d="M22 22H2"/>
                    <path d="m16 6-4 4-4-4"/>
                    <path d="M16 18a4 4 0 0 0-8 0"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Redeem & Burn</h3>
              <p className="text-sm text-muted-foreground">Burn DSC and withdraw collateral</p>
            </a>
            <a href="/liquidate" className="group bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-primary/10 px-6 py-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover-card">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m15 9-6 6"/>
                    <path d="m9 9 6 6"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">Liquidations</h3>
              <p className="text-sm text-muted-foreground">Liquidate unhealthy positions</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}