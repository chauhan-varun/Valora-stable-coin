export interface DepositParams {
  tokenAddress: string
  amountWei: bigint
  dscToMint: bigint
}

export function buildDepositTxParams(params: DepositParams) {
  return {
    token: params.tokenAddress as `0x${string}`,
    amount: params.amountWei,
    dscToMint: params.dscToMint,
  }
}
