'use client'

import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { addresses } from '@/lib/contracts'

// Minimal ERC20 ABI for approval
const erc20ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const tokenAddresses = {
  WETH: '0xdd13E55209Fd76AfE204dBda4007C227904f0a81' as `0x${string}`, // Sepolia WETH
  WBTC: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as `0x${string}`, // Sepolia WBTC
}

export function useTokenApproval() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })
  
  // Check allowance
  const checkAllowance = async (token: 'WETH' | 'WBTC', owner: `0x${string}`) => {
    try {
      const data = await readContract({
        address: tokenAddresses[token],
        abi: erc20ABI,
        functionName: 'allowance',
        args: [owner, addresses.dscEngine],
      })
      return data
    } catch (error) {
      console.error('Error checking allowance:', error)
      return BigInt(0)
    }
  }

  // Approve tokens
  const approveToken = async (token: 'WETH' | 'WBTC', amount: string) => {
    // Convert amount to wei (18 decimals for WETH, 8 for WBTC)
    const decimals = token === 'WETH' ? 18 : 8
    const amountInWei = parseUnits(amount, decimals)

    await writeContract({
      address: tokenAddresses[token],
      abi: erc20ABI,
      functionName: 'approve',
      args: [addresses.dscEngine, amountInWei],
    })
  }

  return { approveToken, checkAllowance, hash, isPending, receipt, error }
}

// Helper function for contract reads
async function readContract(config: any) {
  // This is a simplified placeholder for the actual readContract function
  // In a real implementation, you'd use useReadContract or similar
  return BigInt(0)
}
