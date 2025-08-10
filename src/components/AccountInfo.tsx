'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { formatUnits } from 'viem'
import { abis, addresses } from '@/lib/contracts'

// Token addresses and metadata
const tokenInfo = {
  WETH: {
    address: '0xdd13E55209Fd76AfE204dBda4007C227904f0a81' as `0x${string}`,
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether'
  },
  WBTC: {
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as `0x${string}`,
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin'
  }
}

interface AccountInfoProps {
  userAddress?: `0x${string}`
}

export default function AccountInfo({ userAddress }: AccountInfoProps) {
  const { address } = useAccount()
  const [displayUnit, setDisplayUnit] = useState<'wei' | 'usd'>('usd')
  
  // Use the provided address or the connected wallet address
  const targetAddress = userAddress || address
  
  // Get account information (totalDscMinted, collateralValueInUsd)
  const { data: accountInfo, isLoading: isLoadingAccountInfo, refetch: refetchAccountInfo } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getAccountInfo',
    args: targetAddress ? [targetAddress] : undefined,
    query: { enabled: Boolean(targetAddress) }
  })
  
  // Get WETH collateral balance
  const { data: wethBalance, isLoading: isLoadingWeth } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getCollateralBalanceOfUser',
    args: targetAddress ? [targetAddress, tokenInfo.WETH.address] : undefined,
    query: { enabled: Boolean(targetAddress) }
  })
  
  // Get WBTC collateral balance
  const { data: wbtcBalance, isLoading: isLoadingWbtc } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getCollateralBalanceOfUser',
    args: targetAddress ? [targetAddress, tokenInfo.WBTC.address] : undefined,
    query: { enabled: Boolean(targetAddress) }
  })
  
  // Parse account info - getAccountInformation returns [totalDscMinted, collateralValueInUsd]
  const totalDscMinted = accountInfo ? (accountInfo as [bigint, bigint])[0] : undefined
  const collateralValueInUsd = accountInfo ? (accountInfo as [bigint, bigint])[1] : undefined
  
  // Use useEffect to avoid hydration mismatch
  const [formattedValues, setFormattedValues] = useState({
    dscMinted: '0.00',
    collateralUsd: '0.00',
    wethBalance: '0.000000',
    wbtcBalance: '0.00000000'
  })

  // Format values on client-side only to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Debug logs to see what data we're getting
    console.log("AccountInfo data:", {
      accountInfo,
      totalDscMinted,
      collateralValueInUsd,
      wethBalance,
      wbtcBalance
    });
    
    setFormattedValues({
      dscMinted: totalDscMinted 
        ? Number(formatUnits(totalDscMinted, 18)).toFixed(2)
        : '0.00',
      collateralUsd: collateralValueInUsd 
        ? Number(formatUnits(collateralValueInUsd, 18)).toFixed(2)
        : '0.00',
      wethBalance: wethBalance 
        ? Number(formatUnits(wethBalance as bigint, tokenInfo.WETH.decimals)).toFixed(6)
        : '0.000000',
      wbtcBalance: wbtcBalance 
        ? Number(formatUnits(wbtcBalance as bigint, tokenInfo.WBTC.decimals)).toFixed(8)
        : '0.00000000'
    })
  }, [accountInfo, totalDscMinted, collateralValueInUsd, wethBalance, wbtcBalance])
    
  const isLoading = isLoadingAccountInfo || isLoadingWeth || isLoadingWbtc
  
  // Toggle between wei and USD display
  const toggleDisplayUnit = () => {
    setDisplayUnit(prev => prev === 'wei' ? 'usd' : 'wei')
  }
  
  if (!targetAddress) {
    return (
      <div className="bg-card rounded-lg p-6 shadow">
        <h2 className="text-xl font-medium mb-4">Account Information</h2>
        <p className="text-muted-foreground">No address provided. Please connect your wallet.</p>
      </div>
    )
  }
  
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-border/50 position-health-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Account Information</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              refetchAccountInfo();
            }}
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Refresh Data
          </button>
          <button 
            onClick={toggleDisplayUnit}
            className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80 transition-colors"
          >
            Show in {displayUnit === 'wei' ? 'USD' : 'Wei'}
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-2">
          <div className="animate-pulse bg-muted h-6 rounded w-3/4"></div>
          <div className="animate-pulse bg-muted h-6 rounded w-2/3"></div>
          <div className="animate-pulse bg-muted h-6 rounded w-4/5"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">DSC Minted</h3>
            <p className="text-lg font-bold">
              { totalDscMinted ? totalDscMinted.toString() + ' wei' : '0 wei'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Collateral Value</h3>
            <p className="text-lg font-bold">
              {displayUnit === 'wei' 
                ? wethBalance ? (wethBalance as bigint).toString() + ' wei' : '0 wei'
                : collateralValueInUsd ? "$" + collateralValueInUsd.toString() + ' USD' : '0 USD'
              }
            </p>
          </div>
          
          
        </div>
      )}
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>Address: {targetAddress.slice(0, 6)}...{targetAddress.slice(-4)}</p>
      </div>
    </div>
  )
}
