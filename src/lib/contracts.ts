import dscEngineAbi from '../abi/dsce.json'
import dscAbi from '../abi/dsc.json'

export const addresses = {
  dscEngine: process.env.NEXT_PUBLIC_DSC_ENGINE_ADDRESS as `0x${string}`,
  dscToken: process.env.NEXT_PUBLIC_DSC_TOKEN_ADDRESS as `0x${string}`,
}

export const abis = {
  dscEngine: dscEngineAbi,
  dsc: dscAbi,
}
