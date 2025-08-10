'use client'

import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function HistoryPage() {
  const { isConnected } = useAccount()

  // Mock transaction history for demonstration
  const mockTransactions = [
    { 
      id: '1', 
      type: 'Deposit', 
      token: 'WETH', 
      amount: '1.5', 
      timestamp: new Date().toISOString(), 
      txHash: '0x123...'
    },
    { 
      id: '2', 
      type: 'Mint', 
      token: 'DSC', 
      amount: '2000', 
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      txHash: '0x456...'
    }
  ]

  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Transaction History</h1>

        {!isConnected ? (
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
            <p className="mb-6">You need to connect your wallet to see your transaction history</p>
            <ConnectButton />
          </div>
        ) : (
          <div className="bg-card rounded-lg p-6 shadow">
            <h2 className="text-xl font-medium mb-4">Recent Transactions</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Type</th>
                    <th className="py-2 text-left">Token</th>
                    <th className="py-2 text-left">Amount</th>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map(tx => (
                    <tr key={tx.id} className="border-b">
                      <td className="py-2">{tx.type}</td>
                      <td className="py-2">{tx.token}</td>
                      <td className="py-2">{tx.amount}</td>
                      <td className="py-2">{new Date(tx.timestamp).toLocaleString()}</td>
                      <td className="py-2">
                        <a 
                          href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {`${tx.txHash.substring(0, 6)}...`}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {mockTransactions.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No transactions found
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
