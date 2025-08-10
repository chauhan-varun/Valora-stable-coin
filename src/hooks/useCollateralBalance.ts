'use client'

import { useAccount, useReadContract } from 'wagmi'
import { abis, addresses } from '@/lib/contracts'

export function useCollateralBalance(tokenAddress: `0x${string}` | undefined) {
  const { address } = useAccount()
  
  const { data, isLoading, refetch } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getCollateralBalanceOfUser',
    args: address && tokenAddress ? [address, tokenAddress] : undefined,
    query: { enabled: Boolean(address && tokenAddress) },
  })
  
  return { 
    balance: data as bigint | undefined, 
    isLoading, 
    refetch 
  }
}
