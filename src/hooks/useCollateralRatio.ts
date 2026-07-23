import { useMemo } from 'react'
import { useCollateralValue } from './useCollateralValue'
import { useDscMinted } from './useDscMinted'
import { formatUnits } from 'viem'

export function useCollateralRatio(address?: `0x${string}`) {
  const { data: collateralValue, isLoading: isCollateralLoading } = useCollateralValue(address)
  const { data: dscMinted, isLoading: isDscLoading } = useDscMinted(address)

  const ratio = useMemo(() => {
    if (!collateralValue || !dscMinted) return null
    const mintedVal = Number(formatUnits(dscMinted, 18))
    const collatVal = Number(formatUnits(collateralValue, 18))
    if (mintedVal === 0) return Infinity
    return (collatVal / mintedVal) * 100
  }, [collateralValue, dscMinted])

  return {
    ratio,
    isLoading: isCollateralLoading || isDscLoading,
  }
}
