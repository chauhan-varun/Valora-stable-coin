## DSC dApp Frontend Guide

A practical guide for how the frontend of this protocol should look and behave. This document covers UX, pages, components, data flows, and integration patterns with `DSCEngine` and `DecentralizedStableCoin`.

### Goals
- Clear, safe UX for depositing collateral, minting/burning DSC, redeeming, and liquidations
- Real-time health factor preview and risk visibility
- Reliable on-chain state with optimistic UI and robust error handling

### Recommended Stack
- Framework: Next.js (App Router) + TypeScript
- Wallet/Contracts: wagmi v2 + viem, RainbowKit for wallet UI
- UI: Tailwind CSS + Shadcn UI
- State: Zustand/Jotai for local app state; React Query (via wagmi) for async
- Formatting/Validation: Zod + react-hook-form

### Environment
Create `.env.local` in the frontend app and expose required values:

```env
NEXT_PUBLIC_CHAIN_ID=11155111           # e.g., Sepolia
NEXT_PUBLIC_RPC_URL=https://...
NEXT_PUBLIC_DSC_ENGINE_ADDRESS=0x...
NEXT_PUBLIC_DSC_TOKEN_ADDRESS=0x...
```

ABIs can be consumed directly from Foundry artifacts:
- `src/abi/dsc.json`
- `src/abi/dsce.json`

### Navigation & Pages
- Dashboard (`/`)
  - Wallet connect, network guard, global notices
  - Cards: Health Factor, Total Collateral (USD), DSC Debt, Collateral Breakdown
  - Price panel with Chainlink price + staleness indicator
- Deposit & Mint (`/mint`)
  - Token selector (WETH/WBTC), amount input, allowance flow
  - Optional combined action: depositCollateralAndMintDsc
  - Live health factor preview BEFORE submit
- Redeem & Burn (`/redeem`)
  - Burn DSC and/or redeem collateral
  - Live health factor preview AFTER action
- Liquidations (`/liquidate`)
  - List positions with HF < 1.0 (requires an indexer or subgraph; fallback: user search)
  - Input `debtToCover`, show calculated collateral + 10% bonus
  - Safety checks and confirmations
- History (`/history`)
  - Recent events: deposits, mints, burns, redemptions, liquidations

### Component Hierarchy
- Layout
  - Header (Network selector, Wallet connect)
  - Nav (Dashboard, Mint, Redeem, Liquidate)
  - Toasts / Modals
- Widgets
  - HealthFactorGauge
  - TokenSelector (WETH/WBTC)
  - AmountInput with max button
  - PriceCard (price, updatedAt, staleness)
  - RiskBanner (HF warnings, oracle staleness)
  - TxModal (pending/success/error)

### UX & Safety
- Show health factor prominently; color-code:
  - HF ≥ 1.2: green, HF 1.0–1.2: amber, HF < 1.0: red
- Pre-flight simulation: compute post-action HF client-side
- Require explicit approval amounts (avoid infinite approvals by default)
- Clear confirmations for risky actions (mint pushing HF near 1.0, redeem with debt)
- Show price freshness: Chainlink updatedAt; flag > 3 hours as stale

### Data & Contracts
Key reads/writes from `DSCEngine`:
- Reads
  - `getHealthFactor(user)`
  - `getAccountCollateralValue(user)`
  - `getCollateralBalanceOfUser(user, token)`
  - `getDscMinted(user)`
  - `getUsdValue(token, amount)` / `getTokenAmountFromUsd(token, usdAmount)`
  - `getCollateralTokens()` (for supported token list)
- Writes
  - `depositCollateral(token, amount)`
  - `mintDsc(amountDscToMint)`
  - `depositCollateralAndMintDsc(token, amount, amountDscToMint)`
  - `redeemCollateral(token, amount)`
  - `redeemCollateralForDsc(token, amount, amountDscToBurn)`
  - `burnDsc(amount)`
  - `liquidate(collateral, user, debtToCover)`

Note: token transfers require ERC-20 approvals to the `DSCEngine` contract.

### Health Factor Preview (Client-Side)
Use the on-chain constants and getters to preview HF before/after:
- Fetch:
  - `totalDscMinted` via `getDscMinted(user)`
  - `collateralValueUsd` via `getAccountCollateralValue(user)`
  - Constants: `getLiquidationThreshold()`, `getLiquidationPrecision()`, `getMinHealthFactor()`, `getPrecision()`
- Formula (mirrors contract):
  - `collateralAdjusted = collateralValueUsd * LIQUIDATION_THRESHOLD / LIQUIDATION_PRECISION`
  - `healthFactor = collateralAdjusted * PRECISION / totalDscMinted` (use max if minted == 0)

### Liquidation Preview
Given `debtToCover` and chosen `collateral`:
- `tokenAmountFromDebtCovered = (debtToCover * PRECISION) / (price * ADDITIONAL_PRICEFEED_PRECISION)`
- `bonusCollateral = tokenAmountFromDebtCovered * LIQUIDATION_BONUS / LIQUIDATION_PRECISION`
- `totalCollateralToRedeem = tokenAmountFromDebtCovered + bonusCollateral`
Display all three clearly, and the expected new HF.

### Example Setup (wagmi + viem)
```ts
// lib/wagmi.ts
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = createConfig(
  getDefaultConfig({
    appName: 'DSC dApp',
    projectId: '<walletconnect-project-id>',
    chains: [sepolia],
    transports: { [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL) },
  })
)
```

```tsx
// app/providers.tsx
'use client'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

```ts
// lib/contracts.ts
import DSCEngineArtifact from '../../out/DSCEngine.sol/DSCEngine.json'
import DSCArtifact from '../../out/DecentralizedStableCoin.sol/DecentralizedStableCoin.json'

export const addresses = {
  dscEngine: process.env.NEXT_PUBLIC_DSC_ENGINE_ADDRESS as `0x${string}`,
  dscToken: process.env.NEXT_PUBLIC_DSC_TOKEN_ADDRESS as `0x${string}`,
}

export const abis = {
  dscEngine: DSCEngineArtifact.abi,
  dsc: DSCArtifact.abi,
}
```

```ts
// hooks/useHealthFactor.ts
import { useAccount, useReadContract } from 'wagmi'
import { abis, addresses } from '@/lib/contracts'

export function useHealthFactor() {
  const { address } = useAccount()
  const { data, isLoading, refetch } = useReadContract({
    address: addresses.dscEngine,
    abi: abis.dscEngine,
    functionName: 'getHealthFactor',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  })
  return { healthFactor: data as bigint | undefined, isLoading, refetch }
}
```

```ts
// hooks/useDepositAndMint.ts
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
```

### Token Approvals
For WETH/WBTC approvals to `DSCEngine`:
```ts
import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json' // or local minimal ABI

writeContract({
  address: tokenAddress,
  abi: ERC20.abi,
  functionName: 'approve',
  args: [addresses.dscEngine, amount],
})
```

### Error Mapping (User-Friendly)
Map common revert errors to readable messages:
- `DSCEngine__AmountMustBeGreaterThanZero` → "Amount must be greater than zero"
- `DSCEngine__TokenNotSupported` → "Unsupported collateral token"
- `DSCEngine__BreakHealthFactor` → "Action would break your health factor"
- `DSCEngine__HealthFactorOk` → "Position is healthy; cannot liquidate"
- `DSCEngine__HealthFactorNotImproved` → "Liquidation didn’t improve health factor"
- `DSCEngine__MintFailed` / `DSCEngine__TransferFailed` → "Token operation failed"

Implement a parser for `errorName` from viem/wagmi and surface contextual guidance.

### Visual Design Guidelines
- Use token icons and USD formatting
- Clear input grouping with helper text and inline validation
- Prominent risk banners when HF approaches 1.0
- Accessible colors (WCAG AA), keyboard nav, ARIA roles

### Testing Strategy
- Unit: utility functions (HF preview, formatting)
- Integration: hooks for reads/writes with mocked clients
- E2E: Cypress/Playwright flows for Mint, Redeem, Liquidate on a local chain (Anvil)

### Optional Enhancements
- Position indexer via The Graph/subgraph to populate liquidation table
- Notifications (push/Socket) for HF threshold alerts
- Batch calls (multicall) to reduce RPC round trips

### High-Level User Flows (Mermaid)
```mermaid
flowchart LR
  User -->|Connect| Wallet
  User -->|Deposit & Mint| DSCEngine
  DSCEngine -->|Mint| DSCToken
  User -->|Burn & Redeem| DSCEngine
  Liquidator -->|Liquidate| DSCEngine
  DSCEngine -->|Transfer Collateral + Bonus| Liquidator
```

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Frontend
  participant W as Wallet
  participant E as DSCEngine
  participant T as DSC Token

  U->>UI: Input deposit + mint
  UI->>W: Request token approval
  W-->>UI: Approval tx hash
  UI->>W: Call depositCollateralAndMintDsc
  W-->>UI: Tx hash
  UI->>E: Read health factor
  E-->>UI: HF updated
  UI->>U: Show success and new HF
```

dsc 0xa81AD6E369cE3a4e9925F7aBD24EfC34fc6fD9d5
dsce 0x7DFCB34B67fF51E7a8B423aC8AD85D913d274327
SEPOLIA_RPC_URL=https://blockchain.googleapis.com/v1/projects/ascendant-study-464412-p9/locations/us-central1/endpoints/ethereum-sepolia/rpc?key=AIzaSyAOXxShkTqMdBTanA-mXxc-vL458lNYc1I
ETHERSCAN_API_KEY=W7QG2P873AU5MEFVYJKFDCQ54BQF1AR9VS
PRIVATE_KEY=d3b7a3f0d716882a7dc8f678f375e9bf38cbd791440efc85246d2866ff72a17a

This guide should be sufficient to build a production-grade frontend for the DSC protocol with safe UX and robust on-chain integration. Update addresses and ABIs post-deployment, and tailor UI styling to your brand. 