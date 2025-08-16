'use client'

import { useTheme } from '@/components/ThemeProvider'
import Image from 'next/image'

export default function AboutPage() {
  const { theme } = useTheme()

  return (
    <div className="container mx-auto p-4 max-w-5xl animate-fadeIn">
      <div className="relative mb-16">
        <h1 className="text-4xl font-bold text-center mb-4">About Valora Protocol</h1>
        <div className="h-1 w-32 mx-auto rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-xl p-8 shadow-lg mb-12 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all`}>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              <path d="M2 12h20"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-gray-900">Introduction</h2>
        </div>
        <p className="mb-8 leading-relaxed text-lg">
          The Valora (Decentralized Stablecoin) protocol is a <span className="font-semibold text-gray-900 dark:text-white dark:text-gray-900">production-ready, over-collateralized, algorithmic stablecoin protocol</span> designed to maintain a soft peg of <span className="font-semibold text-gray-900 dark:text-white dark:text-gray-900">1 DSC = 1 USD</span>. The system is inspired by MakerDAO's DAI but built from scratch with modern Solidity practices and comprehensive testing.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`${theme === 'dark' ? 'bg-[#1e1e23]' : 'bg-card'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] border border-blue-500/10 hover:border-blue-500/30`}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-gray-900">Key Characteristics</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900">🔒</span>
                </div>
                <span><strong className="text-gray-900 dark:text-white dark:text-gray-900">Exogenously collateralized</strong>: Backed by external crypto assets (WETH, WBTC)</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900">📊</span>
                </div>
                <span><strong className="text-gray-900 dark:text-white dark:text-gray-900">200% collateral requirement</strong>: Enforced via a 50% liquidation threshold</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900">🌐</span>
                </div>
                <span><strong className="text-gray-900 dark:text-white dark:text-gray-900">Fully on-chain & permissionless</strong>: No governance token, no fees</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900">💰</span>
                </div>
                <span><strong className="text-gray-900 dark:text-white dark:text-gray-900">Liquidation incentives</strong>: 10% bonus for liquidators maintaining system health</span>
              </li>
            </ul>
          </div>
          
          <div className={`${theme === 'dark' ? 'bg-[#1e1e23]' : 'bg-card'} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] border border-blue-500/10 hover:border-blue-500/30`}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M9 21V9"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-gray-900">System Properties</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Collateral Type", value: "Exogenous (WETH, WBTC)" },
                { label: "Stability Mechanism", value: "Algorithmic (Liquidation-based)" },
                { label: "Collateral Ratio", value: "200% minimum (Overcollateralized)" },
                { label: "Liquidation Threshold", value: "50% (Positions liquidatable at 150% ratio)" },
                { label: "Liquidation Bonus", value: "10% (Incentive for liquidators)" },
                { label: "Peg Target", value: "$1.00 USD (Soft peg maintained)" }
              ].map((item, index) => (
                <div key={index} className="flex items-center py-2 border-b border-blue-500/10">
                  <div className="w-1/2 font-medium text-gray-900 dark:text-white dark:text-gray-900">{item.label}</div>
                  <div className="w-1/2">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-xl p-8 shadow-lg mb-12 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all`}>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.29 7 12 12 20.71 7"/>
              <line x1="12" y1="22" x2="12" y2="12"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-gray-900">System Overview</h2>
        </div>
        
        <p className="mb-8 leading-relaxed text-lg">
          The DSC system allows users to:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg hover:shadow-blue-500/5 transform hover:scale-[1.02] duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white dark:text-gray-900">Deposit Collateral</h3>
              <p className="text-muted-foreground">Deposit approved collateral tokens (WETH, WBTC)</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg hover:shadow-blue-500/5 transform hover:scale-[1.02] duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white dark:text-gray-900">Mint DSC</h3>
              <p className="text-muted-foreground">Mint DSC stablecoins against your collateral</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg hover:shadow-blue-500/5 transform hover:scale-[1.02] duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white dark:text-gray-900">Maintain Health</h3>
              <p className="text-muted-foreground">Keep a healthy collateralization ratio (≥200%)</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg hover:shadow-blue-500/5 transform hover:scale-[1.02] duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <path d="M20 12V8H6a2 2 0 1 1 0-4h12v4"/>
                  <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
                  <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white dark:text-gray-900">Redeem Collateral</h3>
              <p className="text-muted-foreground">Burn DSC tokens to reclaim your collateral</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg hover:shadow-blue-500/5 transform hover:scale-[1.02] duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <path d="M2 18h1.4c1.3 0 2.5-.7 3.2-1.8l.6-.8c.7-1.1 1.9-1.8 3.2-1.8h2.2c.7 0 1.3.3 1.7.8l2.5 3"/>
                  <path d="M22 18h-1.4c-1.3 0-2.5-.7-3.2-1.8l-.6-.8c-.7-1.1-1.9-1.8-3.2-1.8h-2.2c-.7 0-1.3.3-1.7.8l-2.5 3"/>
                  <path d="M2 6h20"/>
                  <path d="M2 10h20"/>
                  <path d="M2 14h20"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white dark:text-gray-900">Participate in Liquidations</h3>
              <p className="text-muted-foreground">Help maintain system health and earn a 10% bonus</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-xl p-8 shadow-lg mb-12 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all`}>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
              <path d="M21 12V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.5"/>
              <path d="M16 2v4"/>
              <path d="M8 2v4"/>
              <path d="M3 10h18"/>
              <circle cx="18" cy="18" r="3"/>
              <path d="m16.5 16.5 3 3"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-gray-900">Health Factor & Liquidations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg transform hover:scale-[1.01] duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <path d="M2 5v14c0 .5.4 1 1 1h18c.6 0 1-.5 1-1V5c0-.5-.4-1-1-1H3c-.6 0-1 .5-1 1z"/>
                  <path d="M6 9h12v7H6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-gray-900">Health Factor Calculation</h3>
            </div>
            <p className="mb-4 leading-relaxed">
              The health factor determines the safety of a user's position:
            </p>
            <div className="bg-gradient-to-r bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm mb-4 border border-blue-400/20">
              <span className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">healthFactor</span> = (collateralValueUSD × 50%) ÷ totalDscMinted
            </div>
            
            <h4 className="font-medium mb-3 text-gray-900 dark:text-white dark:text-gray-900">Health Factor Interpretation:</h4>
            <div className="space-y-3">
              <div className="flex items-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <span className="text-green-500 mr-3 text-xl">✅</span>
                <div>
                  <strong className="text-green-400">&gt; 1.0</strong>
                  <p className="text-sm">Healthy position, cannot be liquidated</p>
                </div>
              </div>
              <div className="flex items-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-yellow-500 mr-3 text-xl">⚠️</span>
                <div>
                  <strong className="text-yellow-400">= 1.0</strong>
                  <p className="text-sm">At liquidation threshold, risky position</p>
                </div>
              </div>
              <div className="flex items-center p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="text-red-500 mr-3 text-xl">❌</span>
                <div>
                  <strong className="text-red-400">&lt; 1.0</strong>
                  <p className="text-sm">Unhealthy position, can be liquidated</p>
                </div>
              </div>
              <div className="flex items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-800 border border-blue-500/20">
                <span className="text-blue-500 mr-3 text-xl">🌟</span>
                <div>
                  <strong className="text-gray-900 dark:text-white dark:text-gray-900">∞</strong>
                  <p className="text-sm">No debt, perfect health</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg transform hover:scale-[1.01] duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <path d="M12 14c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6Z"/>
                  <path d="M16 17.5c0-1.38-1.79-2.5-4-2.5s-4 1.12-4 2.5"/>
                  <path d="m20.5 20.5-5-5"/>
                  <path d="m15.5 15.5 5 5"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-gray-900">Liquidation Process</h3>
            </div>
            <p className="mb-4 leading-relaxed">
              When a position becomes undercollateralized (health factor &lt; 1.0):
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">1</span>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white dark:text-gray-900">Liquidators identify</strong> 
                  <p>Users with health factors below 1.0</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">2</span>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white dark:text-gray-900">Liquidators provide DSC</strong>
                  <p>Cover some/all of the debt position</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">3</span>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white dark:text-gray-900">Receive collateral + 10% bonus</strong>
                  <p>Economic incentive to maintain system health</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">4</span>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white dark:text-gray-900">Position health improves</strong>
                  <p>User's health factor increases after liquidation</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <span className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">5</span>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white dark:text-gray-900">System remains fully collateralized</strong>
                  <p>Protocol health is maintained through liquidations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-xl p-8 shadow-lg mb-12 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all`}>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-gray-900">Contract Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg transform hover:scale-[1.01] duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <path d="M21 2H3v3h18V2z"/>
                  <path d="M19 5H5v16h14V5z"/>
                  <path d="M9 9h1"/>
                  <path d="M14 9h1"/>
                  <path d="M9 13h1"/>
                  <path d="M14 13h1"/>
                  <path d="M9 17h1"/>
                  <path d="M14 17h1"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-gray-900">DSC Engine Contract</h3>
            </div>
            <div className="bg-gradient-to-r bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm mb-3 border border-blue-400/20 relative group hover:border-blue-400/40 transition-all">
              <div className="truncate">
                {process.env.NEXT_PUBLIC_DSC_ENGINE_ADDRESS || "0xadB635a70092D748d0534fFc2d803b37A47BC7D1"}
              </div>
              <div className="absolute right-2 top-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-2 px-3 rounded-lg">
                <span className="text-sm">Network</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-900">Sepolia Testnet</span>
              </div>
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-2 px-3 rounded-lg">
                <span className="text-sm">Type</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-900">Core Engine</span>
              </div>
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-2 px-3 rounded-lg">
                <span className="text-sm">Functions</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-900">Deposit, Mint, Liquidate</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <a 
                href={`https://sepolia.etherscan.io/address/${process.env.NEXT_PUBLIC_DSC_ENGINE_ADDRESS || "0xadB635a70092D748d0534fFc2d803b37A47BC7D1"}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-gray-800 hover:bg-blue-500/30 transition-colors text-gray-900 dark:text-white dark:text-gray-900 font-medium py-2 px-4 rounded-lg flex items-center"
              >
                View on Etherscan
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-lg transform hover:scale-[1.01] duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="4"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white dark:text-gray-900">DSC Token Contract</h3>
            </div>
            <div className="bg-gradient-to-r bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm mb-3 border border-blue-400/20 relative group hover:border-blue-400/40 transition-all">
              <div className="truncate">
                {process.env.NEXT_PUBLIC_DSC_TOKEN_ADDRESS || "0x995B5Ad8eE7686074Ab6F25B28867ED8260532F1"}
              </div>
              <div className="absolute right-2 top-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-2 px-3 rounded-lg">
                <span className="text-sm">Network</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-900">Sepolia Testnet</span>
              </div>
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-2 px-3 rounded-lg">
                <span className="text-sm">Token Standard</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-900">ERC-20</span>
              </div>
              <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 p-2 px-3 rounded-lg">
                <span className="text-sm">Decimals</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white dark:text-gray-900">18</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <a 
                href={`https://sepolia.etherscan.io/address/${process.env.NEXT_PUBLIC_DSC_TOKEN_ADDRESS || "0x995B5Ad8eE7686074Ab6F25B28867ED8260532F1"}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-gray-800 hover:bg-blue-500/30 transition-colors text-gray-900 dark:text-white dark:text-gray-900 font-medium py-2 px-4 rounded-lg flex items-center"
              >
                View on Etherscan
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all`}>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-gray-900">About the Developer</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center text-white dark:text-gray-900 text-4xl font-bold shadow-lg animate-pulse-subtle">
            VC
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Varun Chauhan</h3>
              <div className="border-b-2 border-gray-300 dark:border-gray-700 w-16 mb-4"></div>
              <p className="text-muted-foreground mb-2 leading-relaxed">
                A blockchain developer passionate about decentralized applications and smart contract development.
                Specialized in building secure, efficient DeFi protocols with a focus on stablecoin mechanisms.
              </p>
              <p className="text-sm text-gray-900 dark:text-white dark:text-gray-900/80 italic">
                "Building the financial infrastructure of tomorrow, one smart contract at a time."
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="https://github.com/chauhan-varun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all transform hover:scale-[1.02] duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">GitHub</div>
                  <div className="text-sm">chauhan-varun</div>
                </div>
              </a>
              
              <a 
                href="https://linkedin.com/in/chauhan-varun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all transform hover:scale-[1.02] duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">LinkedIn</div>
                  <div className="text-sm">chauhan-varun</div>
                </div>
              </a>
              
              <a 
                href="https://twitter.com/varunchauhanx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all transform hover:scale-[1.02] duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">Twitter</div>
                  <div className="text-sm">@varunchauhanx</div>
                </div>
              </a>
              
              <a 
                href="mailto:varunchauhan097@gmail.com"
                className="flex items-center gap-3 bg-gradient-to-r bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all transform hover:scale-[1.02] duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white dark:text-gray-900">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white dark:text-gray-900 font-semibold">Email</div>
                  <div className="text-sm">varunchauhan097@gmail.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}