import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = createConfig(
  getDefaultConfig({
    appName: 'DSC dApp',
    projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
    chains: [sepolia],
    transports: { 
      [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL) 
    },
  })
)
