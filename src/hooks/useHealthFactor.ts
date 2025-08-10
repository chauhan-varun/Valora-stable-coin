import { useAccount, useReadContract } from 'wagmi'
import { abis, addresses } from '@/lib/contracts'

export function useHealthFactor() {
  const { address } = useAccount()
  const { data, isLoading, refetch } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getHealthFactor',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  })
  return { healthFactor: data as bigint | undefined, isLoading, refetch }
}
