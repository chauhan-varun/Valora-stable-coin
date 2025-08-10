'use client'

import { useTheme } from '@/components/ThemeProvider'

interface HealthFactorGaugeProps {
  healthFactor: bigint | undefined
  isLoading?: boolean
}

export default function HealthFactorGauge({ 
  healthFactor, 
  isLoading = false 
}: HealthFactorGaugeProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark' || theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  
  // Health factor is stored as a fixed point number with 18 decimals
  const hfValue = healthFactor ? Number(healthFactor) / 1e18 : undefined
  
  // Determine color based on health factor value
  let color = 'bg-green-500'
  
  if (hfValue === undefined) {
    color = 'bg-gray-300'
  } else if (hfValue < 1.0) {
    color = 'bg-red-500'
  } else if (hfValue < 1.2) {
    color = 'bg-amber-500'
  }
  
  // Calculate width for the gauge - cap at 100%
  const width = hfValue ? Math.min(hfValue / 2, 1) * 100 : 0
  
  return (
    <div className={isDarkMode ? "bg-[#171720] rounded-lg p-4 shadow-md" : "bg-card/50 backdrop-blur-sm rounded-lg p-4 shadow-md hover-card"}>
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center gap-1.5 text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          Health Factor
        </span>
        <span className="text-green-400 font-bold">
          {isLoading ? 'Loading...' : hfValue ? hfValue.toFixed(2) : 'N/A'}
        </span>
      </div>
      
      <div className={isDarkMode ? "w-full bg-[#0f0f13] rounded-full h-2.5" : "w-full bg-secondary/30 rounded-full h-2.5"}>
        {isLoading ? (
          <div className="animate-pulse bg-gray-500 h-2.5 rounded-full w-3/4"></div>
        ) : (
          <div 
            className={`${color} h-2.5 rounded-full`} 
            style={{ width: `${width}%` }}
          ></div>
        )}
      </div>
      
      <div className="flex justify-between text-xs mt-1">
        <span className="text-red-500">Liquidation</span>
        <span className="text-green-500">Safe</span>
      </div>
    </div>
  )
}