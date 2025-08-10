'use client'

import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ThemeToggle from './ThemeToggle'

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
            <Link href="/About" className="hover:text-foreground/80">About</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
