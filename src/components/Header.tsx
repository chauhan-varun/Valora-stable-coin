'use client'

import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <header className="border-b border-border py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">DSC</Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className="hover:text-foreground/80">Dashboard</Link>
            <Link href="/mint" className="hover:text-foreground/80">Deposit & Mint</Link>
            <Link href="/redeem" className="hover:text-foreground/80">Redeem & Burn</Link>
            <Link href="/liquidate" className="hover:text-foreground/80">Liquidations</Link>
            <Link href="/history" className="hover:text-foreground/80">History</Link>
          </nav>
        </div>
        <ConnectButton />
      </div>
    </header>
  )
}
