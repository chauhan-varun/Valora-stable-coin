'use client'

import { useReadContract } from 'wagmi'
import { abis, addresses } from '@/lib/contracts'

export function useCollateralTokens() {
  const { data, isLoading, refetch } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getCollateralTokens',
    query: { enabled: true },
  })
  return { 
    collateralTokens: data as Array<`0x${string}`> | undefined, 
    isLoading, 
    refetch 
  }
}
