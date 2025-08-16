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
      <div className="max-w-5xl mx-auto">
        {/* Hero Section for landing experience */}
        <div className="py-16 mb-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Valora Protocol – The Next-Gen Decentralized Stablecoin</h1>
          <p className="text-xl mb-8 opacity-70 max-w-3xl mx-auto">
            A fully permissionless, overcollateralized stablecoin protocol designed for transparency and stability.
          </p>
          
          {!isConnected && (
            <div className="mb-10 flex justify-center">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted
                }) => {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="bg-[#3B82F6] hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-all"
                    >
                      Connect Wallet to Launch App
                    </button>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          )}
        </div>
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold animate-slideInLeft">
            {isConnected ? "Your Dashboard" : "Welcome to Valora"}
          </h1>
          <div className="animate-slideInRight">
            {isConnected && <ConnectButton />}
          </div>
        </div>
        
        {isConnected && (
          <p className="opacity-70 mb-6">
            Manage your stablecoins with ease – Deposit, Mint, Redeem, and Liquidate seamlessly.
          </p>
        )}

        {!isConnected ? (
          <div>
            {/* Comparison Table Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-center">How Valora Compares</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full rounded-lg overflow-hidden shadow-md">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <th className="p-4 text-left">Feature</th>
                      <th className="p-4 text-left">Valora</th>
                      <th className="p-4 text-left">MakerDAO</th>
                      <th className="p-4 text-left">Liquity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium">Collateral</td>
                      <td className="p-4">WETH, WBTC</td>
                      <td className="p-4">Multiple</td>
                      <td className="p-4">ETH only</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium">Governance Token</td>
                      <td className="p-4">❌ None</td>
                      <td className="p-4">✅ MKR</td>
                      <td className="p-4">✅ LQTY</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium">Collateral Ratio</td>
                      <td className="p-4">200%</td>
                      <td className="p-4">150%</td>
                      <td className="p-4">110%</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-900">
                      <td className="p-4 font-medium">Liquidation Fee</td>
                      <td className="p-4">10% bonus</td>
                      <td className="p-4">13% penalty</td>
                      <td className="p-4">Variable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Protocol Flow Diagram */}
            <div className="mb-10 rounded-xl overflow-hidden relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-12 text-white">
                <h2 className="text-2xl font-bold mb-10 text-center">How Valora Works</h2>
                
                <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-8 md:space-y-0">
                  {/* Step 1 */}
                  <Link href="/mint" className="group flex flex-col items-center transition-transform hover:scale-105">
                    <div className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center mb-3 cursor-pointer transition-all">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 className="font-bold text-lg">Deposit Collateral</h3>
                    <p className="text-sm text-center text-white/80">WETH or WBTC</p>
                  </Link>
                  
                  {/* Arrow 1 - horizontal for md screens, vertical for sm screens */}
                  <div className="hidden md:flex items-center relative" style={{ top: "-25px" }}>
                    <svg width="40" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex md:hidden justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* Step 2 */}
                  <Link href="/mint" className="group flex flex-col items-center transition-transform hover:scale-105">
                    <div className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center mb-3 cursor-pointer transition-all">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <h3 className="font-bold text-lg">Mint DSC</h3>
                    <p className="text-sm text-center text-white/80">Up to 50% of value</p>
                  </Link>
                  
                  {/* Arrow 2 - horizontal for md screens, vertical for sm screens */}
                  <div className="hidden md:flex items-center relative" style={{ top: "-25px" }}>
                    <svg width="40" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex md:hidden justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* Step 3 */}
                  <Link href="/mint" className="group flex flex-col items-center transition-transform hover:scale-105">
                    <div className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center mb-3 cursor-pointer transition-all">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <h3 className="font-bold text-lg">Monitor Health</h3>
                    <p className="text-sm text-center text-white/80">Keep above 1.0</p>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Social Proof Section */}
            <div className="mb-10 flex justify-center">
              <div className="flex flex-wrap justify-center gap-4">
                <button className="flex items-center gap-2 px-5 py-3 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>Open Source</span>
                </button>
                
                <button className="flex items-center gap-2 px-5 py-3 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 12 2 2 4-4"/>
                    <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/>
                  </svg>
                  <span>100% Test Coverage</span>
                </button>
                
                <a href="https://github.com/chauhan-varun/valora-stablecoin-contract" 
                   className="flex items-center gap-2 px-5 py-3 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                   target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                
                <a href="/About" 
                   className="flex items-center gap-2 px-5 py-3 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                  <span>About</span>
                </a>
              </div>
            </div>
            
            <div className="flex justify-center mb-16">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted
                }) => {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="bg-[#3B82F6] hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-all"
                    >
                      Get Started
                    </button>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-slideInUp">
            {/* Wallet Status Card - Shows user's wallet information */}
            <div className="rounded-lg p-6 shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Your Wallet Status</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Connected
                </div>
              </div>

              {/* Protocol Overview / Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Collateral</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{formattedCollateral}</div>
                </div>
                <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">DSC Minted</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{formattedDscMinted}</div>
                </div>
                <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Ratio</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {dscMinted && Number(formatUnits(dscMinted, 18)) > 0 && collateralValue 
                      ? `${((Number(formatUnits(collateralValue, 18)) / Number(formatUnits(dscMinted, 18))) * 100).toFixed(0)}%` 
                      : '∞'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Position Health Card with visual indicator */}
            <div className="rounded-lg p-6 shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Position Health</h3>
                </div>
                
                <div className="tooltip" data-tip="Health Factor = (Collateral Value × 50%) ÷ Total DSC Minted">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                </div>
              </div>
              
              {/* Enhanced Health Factor Gauge with additional info */}
              <div className="mb-2">
                <HealthFactorGauge healthFactor={healthFactor} isLoading={isLoadingHF} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mt-3">
                <div className={`flex items-center gap-2 p-2 rounded-lg ${Number(healthFactor) > 1.5 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium' : 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400'}`}>
                  <span>✅</span> &gt;1.5: Safe
                </div>
                <div className={`flex items-center gap-2 p-2 rounded-lg ${Number(healthFactor) <= 1.5 && Number(healthFactor) >= 1.0 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-medium' : 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400'}`}>
                  <span>⚠️</span> 1.0-1.5: Caution
                </div>
                <div className={`flex items-center gap-2 p-2 rounded-lg ${Number(healthFactor) < 1.0 ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 font-medium' : 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400'}`}>
                  <span>❌</span> &lt;1.0: Liquidatable
                </div>
              </div>
            </div>
            
            {/* Account Info Card - Full width with white background */}
            <div className="rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <AccountInfo />
            </div>
          </div>
        )}
        
        <div className="mt-10 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Quick Actions</h2>
            {isConnected && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>Hover for more information</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/mint" 
                  className="group px-6 py-4 rounded-lg text-center transition-all duration-300 shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg block"
                  title="Deposit collateral tokens and mint DSC stablecoins up to 50% of your collateral value">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"/>
                    <path d="M2 12h20"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Deposit & Mint</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add collateral and mint DSC</p>
            </Link>
            
            <Link href="/redeem" 
                  className="group px-6 py-4 rounded-lg text-center transition-all duration-300 shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg block"
                  title="Burn your DSC tokens to withdraw your deposited collateral">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Redeem & Burn</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Burn DSC and withdraw collateral</p>
            </Link>
            
            <Link href="/liquidate" 
                  className="group px-6 py-4 rounded-lg text-center transition-all duration-300 shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg block"
                  title="Earn a 10% bonus by liquidating unhealthy positions with health factors below 1.0">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m15 9-6 6"/>
                    <path d="m9 9 6 6"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Liquidations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Earn 10% bonus on liquidations</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}