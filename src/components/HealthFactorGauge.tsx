'use client'

interface HealthFactorGaugeProps {
  healthFactor: bigint | undefined
  isLoading?: boolean
}

export default function HealthFactorGauge({ 
  healthFactor, 
  isLoading = false 
}: HealthFactorGaugeProps) {
  // Health factor is stored as a fixed point number with 18 decimals
  const hfValue = healthFactor ? Number(healthFactor) / 1e18 : undefined
  
  // Determine color based on health factor value
  let color = 'bg-green-500'
  let textColor = 'text-green-500'
  let statusText = 'Excellent'

  if (hfValue === undefined) {
    color = 'bg-gray-300'
    textColor = 'text-gray-400'
    statusText = 'Unknown'
  } else if (hfValue < 1.0) {
    color = 'bg-red-500'
    textColor = 'text-red-500'
    statusText = 'Liquidation Risk'
  } else if (hfValue < 1.2) {
    color = 'bg-amber-500'
    textColor = 'text-amber-500' 
    statusText = 'Warning'
  }
  
  // Calculate width for the gauge - cap at 100%
  const width = hfValue ? Math.min(hfValue / 2, 1) * 100 : 0
  
  return (
    <div className="w-full p-4 bg-card/50 backdrop-blur-sm rounded-lg shadow-md hover-card animate-fadeIn">
      <div className="flex justify-between mb-2 items-center">
        <span className="text-sm font-medium flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse-slow">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
          Health Factor
        </span>
        <span className={`text-sm font-bold transition-colors duration-500 ${textColor} animate-fadeIn`}>
          {isLoading ? 'Loading...' : hfValue ? hfValue.toFixed(2) : 'N/A'}
        </span>
      </div>
      <div className="w-full bg-secondary/30 rounded-full h-3 overflow-hidden">
        {isLoading ? (
          <div className="animate-pulse bg-gray-300 h-3 rounded-full w-3/4"></div>
        ) : (
          <div 
            className={`${color} h-3 rounded-full transition-all duration-1000 ease-out shadow-sm relative`} 
            style={{ width: `${width}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
          </div>
        )}
      </div>
      <div className="flex justify-between text-xs mt-2">
        <span className="text-red-500">Liquidation</span>
        <span className={`${textColor} font-medium animate-fadeIn`}>{statusText}</span>
        <span className="text-green-500">Safe</span>
      </div>
    </div>
  )
}
