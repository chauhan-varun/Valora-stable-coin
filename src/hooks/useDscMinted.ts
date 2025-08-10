'use client'

import { useAccount, useReadContract } from 'wagmi'
import { abis, addresses } from '@/lib/contracts'

export function useDscMinted() {
  const { address } = useAccount()
  const { data, isLoading, refetch } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getDscMinted',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  })
  return { 
    dscMinted: data as bigint | undefined, 
    isLoading, 
    refetch 
  }
}
