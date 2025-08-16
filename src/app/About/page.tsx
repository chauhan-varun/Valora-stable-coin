'use client'

import { useTheme } from '@/components/ThemeProvider'
import Image from 'next/image'

export default function AboutPage() {
  const { theme } = useTheme()

  return (
    <div className="container mx-auto p-4 max-w-5xl animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">About DSC Protocol</h1>

      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-lg p-8 shadow-lg mb-8`}>
        <h2 className="text-2xl font-bold mb-6">Introduction</h2>
        <p className="mb-6 leading-relaxed">
          The DSC (Decentralized Stablecoin) protocol is a <strong>production-ready, over-collateralized, algorithmic stablecoin protocol</strong> designed to maintain a soft peg of <strong>1 DSC = 1 USD</strong>. The system is inspired by MakerDAO's DAI but built from scratch with modern Solidity practices and comprehensive testing.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`${theme === 'dark' ? 'bg-[#1e1e23]' : 'bg-card'} p-6 rounded-lg shadow`}>
            <h3 className="text-xl font-semibold mb-4 text-primary">Key Characteristics</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Exogenously collateralized</strong>: Backed by external crypto assets (WETH, WBTC)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>200% collateral requirement</strong>: Enforced via a 50% liquidation threshold</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Fully on-chain & permissionless</strong>: No governance token, no fees</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span><strong>Liquidation incentives</strong>: 10% bonus for liquidators maintaining system health</span>
              </li>
            </ul>
          </div>
          
          <div className={`${theme === 'dark' ? 'bg-[#1e1e23]' : 'bg-card'} p-6 rounded-lg shadow`}>
            <h3 className="text-xl font-semibold mb-4 text-primary">System Properties</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-5">
                <div className="col-span-2 font-medium">Collateral Type</div>
                <div className="col-span-3">Exogenous (WETH, WBTC)</div>
              </div>
              <div className="grid grid-cols-5">
                <div className="col-span-2 font-medium">Stability Mechanism</div>
                <div className="col-span-3">Algorithmic (Liquidation-based)</div>
              </div>
              <div className="grid grid-cols-5">
                <div className="col-span-2 font-medium">Collateral Ratio</div>
                <div className="col-span-3">200% minimum (Overcollateralized)</div>
              </div>
              <div className="grid grid-cols-5">
                <div className="col-span-2 font-medium">Liquidation Threshold</div>
                <div className="col-span-3">50% (Positions liquidatable at 150% ratio)</div>
              </div>
              <div className="grid grid-cols-5">
                <div className="col-span-2 font-medium">Liquidation Bonus</div>
                <div className="col-span-3">10% (Incentive for liquidators)</div>
              </div>
              <div className="grid grid-cols-5">
                <div className="col-span-2 font-medium">Peg Target</div>
                <div className="col-span-3">$1.00 USD (Soft peg maintained)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-lg p-8 shadow-lg mb-8`}>
        <h2 className="text-2xl font-bold mb-6">System Overview</h2>
        
        <p className="mb-8 leading-relaxed">
          The DSC system allows users to:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Deposit Collateral</h3>
            <p className="text-muted-foreground text-sm">Deposit approved collateral tokens (WETH, WBTC)</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"/>
                <text x="7" y="16" className="text-primary font-bold text-base">$</text>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Mint DSC</h3>
            <p className="text-muted-foreground text-sm">Mint DSC stablecoins against your collateral</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Maintain Health</h3>
            <p className="text-muted-foreground text-sm">Keep a healthy collateralization ratio (≥200%)</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M20 12V8H6a2 2 0 1 1 0-4h12v4"/>
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
                <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Redeem Collateral</h3>
            <p className="text-muted-foreground text-sm">Burn DSC tokens to reclaim your collateral</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M2 18h1.4c1.3 0 2.5-.7 3.2-1.8l.6-.8c.7-1.1 1.9-1.8 3.2-1.8h2.2c.7 0 1.3.3 1.7.8l2.5 3"/>
                <path d="M22 18h-1.4c-1.3 0-2.5-.7-3.2-1.8l-.6-.8c-.7-1.1-1.9-1.8-3.2-1.8h-2.2c-.7 0-1.3.3-1.7.8l-2.5 3"/>
                <path d="M2 6h20"/>
                <path d="M2 10h20"/>
                <path d="M2 14h20"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Participate in Liquidations</h3>
            <p className="text-muted-foreground text-sm">Help maintain system health and earn a 10% bonus</p>
          </div>
        </div>
      </div>
      
      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-lg p-8 shadow-lg mb-8`}>
        <h2 className="text-2xl font-bold mb-6">Health Factor & Liquidations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Health Factor Calculation</h3>
            <p className="mb-4 leading-relaxed">
              The health factor determines the safety of a user's position:
            </p>
            <div className={`${theme === 'dark' ? 'bg-[#1e1e23]' : 'bg-card'} p-4 rounded-lg font-mono text-sm mb-4`}>
              healthFactor = (collateralValueUSD × LIQUIDATION_THRESHOLD) ÷ totalDscMinted
            </div>
            
            <h4 className="font-medium mb-2">Health Factor Interpretation:</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <strong>&gt; 1.0</strong>: Healthy position, cannot be liquidated
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">⚠️</span>
                <strong>= 1.0</strong>: At liquidation threshold, risky position
              </li>
              <li className="flex items-center">
                <span className="text-red-500 mr-2">❌</span>
                <strong>&lt; 1.0</strong>: Unhealthy position, can be liquidated
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">🌟</span>
                <strong>∞</strong>: No debt, perfect health
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Liquidation Process</h3>
            <p className="mb-4 leading-relaxed">
              When a position becomes undercollateralized (health factor &lt; 1.0):
            </p>
            <ol className="space-y-3 list-decimal ml-4">
              <li>
                <strong>Liquidators identify</strong> unhealthy positions
              </li>
              <li>
                <strong>Liquidators provide DSC</strong> to cover some/all of the debt
              </li>
              <li>
                <strong>In return, they receive collateral + 10% bonus</strong> from the underwater position
              </li>
              <li>
                <strong>Position health improves</strong> after liquidation
              </li>
              <li>
                The system remains <strong>fully collateralized</strong>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-lg p-8 shadow-lg mb-8`}>
        <h2 className="text-2xl font-bold mb-6">Contract Information</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">DSC Engine Contract</h3>
            <div className={`${theme === 'dark' ? 'bg-[#1e1e23]' : 'bg-card'} p-4 rounded-lg font-mono text-sm mb-2 break-all`}>
              {process.env.NEXT_PUBLIC_DSC_ENGINE_ADDRESS}
            </div>
            <div className="flex justify-end">
              <a 
                href={`https://sepolia.etherscan.io/address/${process.env.NEXT_PUBLIC_DSC_ENGINE_ADDRESS}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center"
              >
                View on Etherscan
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">DSC Token Contract</h3>
            <div className={`${theme === 'dark' ? 'bg-[#1e1e23]' : 'bg-card'} p-4 rounded-lg font-mono text-sm mb-2 break-all`}>
              {process.env.NEXT_PUBLIC_DSC_TOKEN_ADDRESS}
            </div>
            <div className="flex justify-end">
              <a 
                href={`https://sepolia.etherscan.io/address/${process.env.NEXT_PUBLIC_DSC_TOKEN_ADDRESS}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center"
              >
                View on Etherscan
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-[#171720]' : 'bg-card/50 backdrop-blur-sm'} rounded-lg p-8 shadow-lg`}>
        <h2 className="text-2xl font-bold mb-6">About the Developer</h2>
        
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            VC
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Varun Chauhan</h3>
            <p className="text-muted-foreground mb-4">
              A blockchain developer passionate about decentralized applications and smart contract development.
              Specialized in building secure, efficient DeFi protocols with a focus on stablecoin mechanisms.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/chauhan-varun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                GitHub: chauhan-varun
              </a>
              
              <a 
                href="https://linkedin.com/in/chauhan-varun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn: chauhan-varun
              </a>
              
              <a 
                href="https://twitter.com/varunchauhanx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                Twitter: @varunchauhanx
              </a>
              
              <a 
                href="mailto:varunchauhan097@gmail.com"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Email: varunchauhan097@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}