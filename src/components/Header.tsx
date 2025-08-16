'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ThemeToggle from './ThemeToggle'
import { cn } from '../lib/utils'
import { useTheme } from './ThemeProvider'

export default function Header() {
  const pathname = usePathname()
  const { theme } = useTheme()
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md ${theme === 'dark' ? 'bg-black/90' : 'bg-white/80'} border-b border-border py-3 animate-fadeIn`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image src="/logo.png" alt="Valora" width={36} height={36} className="rounded-md animate-pulse-subtle" />
            <span className="text-xl font-bold">{theme === 'dark' ? 'Valora' : 'Valora'}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {[
              { href: '/', label: 'Dashboard' },
              { href: '/mint', label: 'Deposit & Mint' },
              { href: '/redeem', label: 'Redeem & Burn' },
              { href: '/liquidate', label: 'Liquidations' },
              { href: '/About', label: 'About' }
            ].map(({ href, label }) => (
              <Link 
                key={href} 
                href={href} 
                className={cn(
                  'relative px-2 py-1 transition-all duration-300 hover:text-primary',
                  pathname === href ? 'text-primary font-medium' : 'text-foreground/80'
                )}
              >
                {label}
                {pathname === href && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary animate-scaleIn" />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 animate-slideInRight">
          <ThemeToggle />
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
