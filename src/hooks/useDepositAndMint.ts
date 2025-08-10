import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { abis, addresses } from '@/lib/contracts'

export function useDepositAndMint() {
  const { address } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })

  async function depositAndMint(token: `0x${string}`, amount: bigint, dscToMint: bigint) {
    // Ensure approval done in UI prior to this call
    writeContract({
      address: addresses.dscEngine,
      abi: abis.dscEngine,
      functionName: 'depositCollateralAndMintDsc',
      args: [token, amount, dscToMint],
    })
  }

  return { depositAndMint, hash, isPending, receipt, error }
}
