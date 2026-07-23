import { useMemo } from 'react'

export function useLiquidationSim(collateralUsd: number, debtUsd: number) {
  return useMemo(() => {
    if (debtUsd <= 0) {
      return { isLiquidatable: false, healthFactor: Infinity, bonusUsd: 0 }
    }

    const healthFactor = (collateralUsd * 0.5) / debtUsd
    const isLiquidatable = healthFactor < 1.0
    const bonusUsd = debtUsd * 0.10

    return {
      isLiquidatable,
      healthFactor,
      bonusUsd,
    }
  }, [collateralUsd, debtUsd])
}
