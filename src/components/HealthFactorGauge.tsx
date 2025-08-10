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
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Health Factor</span>
        <span className="text-sm font-medium">
          {isLoading ? 'Loading...' : hfValue ? hfValue.toFixed(2) : 'N/A'}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        {isLoading ? (
          <div className="animate-pulse bg-gray-300 h-2.5 rounded-full w-3/4"></div>
        ) : (
          <div 
            className={`${color} h-2.5 rounded-full transition-all duration-500`} 
            style={{ width: `${width}%` }}
          ></div>
        )}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Danger</span>
        <span>Safe</span>
      </div>
    </div>
  )
}
