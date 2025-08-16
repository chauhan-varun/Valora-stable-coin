'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { formatUnits } from 'viem'
import { useHealthFactor, useCollateralValue, useDscMinted } from '@/hooks'
import HealthFactorGauge from '@/components/HealthFactorGauge'
import AccountInfo from '@/components/AccountInfo'
import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'
import Link from 'next/link'

export default function Home() {
  const { isConnected } = useAccount()
  const { healthFactor, isLoading: isLoadingHF } = useHealthFactor()
  const { collateralValue, isLoading: isLoadingCollateral } = useCollateralValue()
  const { dscMinted, isLoading: isLoadingDsc } = useDscMinted()
  const { theme } = useTheme()
  
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
          <h1 className="text-3xl font-bold text-blue-400 animate-slideInLeft">DSC Dashboard</h1>
          <div className="animate-slideInRight">
            <ConnectButton />
          </div>
        </div>

        {!isConnected ? (
          <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm border border-border/50'} rounded-lg p-8 text-center shadow-lg animate-slideInUp ${theme === 'dark' ? '' : 'hover-card'}`}>
            <div className="flex justify-center mb-6 animate-float">
              <Image src="/logo.png" alt="Valora" width={80} height={80} className="rounded-xl animate-pulse-subtle" />
            </div>
            <h2 className="text-2xl font-bold mb-4 gradient-text">Welcome to DSC Protocol</h2>
            <p className="mb-6 text-muted-foreground">A production-ready, over-collateralized, algorithmic stablecoin designed to maintain a soft peg of 1 DSC = 1 USD</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/30">
                <span className="text-primary text-xl mb-1">🔒</span>
                <h3 className="font-medium">Exogenously Collateralized</h3>
                <p className="text-muted-foreground text-center text-xs">Backed by WETH and WBTC</p>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/30">
                <span className="text-primary text-xl mb-1">📊</span>
                <h3 className="font-medium">200% Collateral Ratio</h3>
                <p className="text-muted-foreground text-center text-xs">Liquidation at 150% ratio</p>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-secondary/30">
                <span className="text-primary text-xl mb-1">🌐</span>
                <h3 className="font-medium">Fully Permissionless</h3>
                <p className="text-muted-foreground text-center text-xs">No governance token, no fees</p>
              </div>
            </div>
            <ConnectButton />
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-slideInUp">
            {/* Position Health Card - standalone card with gray background */}
            <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm border border-border/50 hover-card'} rounded-lg p-6 shadow-lg transition-all`}>
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <span className="text-lg">Position Health</span>
              </div>
              <HealthFactorGauge healthFactor={healthFactor} isLoading={isLoadingHF} />
            </div>
            
            {/* Account Info Card - Full width with dark background */}
            <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm border border-border/50'} rounded-lg shadow-lg animate-fadeIn`} style={{animationDelay: '0.2s'}}>
              <AccountInfo />
            </div>
          </div>
        )}
        
        <div className="mt-10 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <h2 className="text-xl text-blue-400 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/mint" className={`group ${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm border border-border/50'} px-6 py-4 rounded-lg text-center transition-all duration-300 hover:bg-primary/10 ${theme === 'dark' ? '' : 'hover-card'} block`}>
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
            </Link>
            <Link href="/redeem" className={`group ${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm border border-border/50'} px-6 py-4 rounded-lg text-center transition-all duration-300 hover:bg-primary/10 ${theme === 'dark' ? '' : 'hover-card'} block`}>
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
            </Link>
            <Link href="/liquidate" className={`group ${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm border border-border/50'} px-6 py-4 rounded-lg text-center transition-all duration-300 hover:bg-primary/10 ${theme === 'dark' ? '' : 'hover-card'} block`}>
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}