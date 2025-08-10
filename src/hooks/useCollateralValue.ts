'use client'

import { useAccount, useReadContract } from 'wagmi'
import { abis, addresses } from '@/lib/contracts'

export function useCollateralValue() {
  const { address } = useAccount()
  const { data, isLoading, refetch } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getAccountCollateralValue',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  })
  return { 
    collateralValue: data as bigint | undefined, 
    isLoading, 
    refetch 
  }
}
