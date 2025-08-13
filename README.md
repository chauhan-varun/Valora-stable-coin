# DSC Protocol - Frontend 

A modern, responsive frontend for the DSC (Decentralized Stablecoin) Protocol. This Next.js application provides a user-friendly interface to interact with the production-ready, over-collateralized, algorithmic stablecoin system that maintains a soft peg of 1 DSC = 1 USD.

![Valora Logo](public/logo.png)

## 🎯 Introduction

This repository contains the **frontend application** for the DSC Protocol. The smart contracts (backend) are located in a separate repository: **[foundry-defi-stablecoin](https://github.com/chauhan-varun/foundry-defi-stablecoin)**.

The frontend allows users to:
- Deposit approved collateral tokens (WETH, WBTC)
- Mint DSC stablecoins against their collateral
- Maintain healthy collateralization ratios
- Redeem collateral by burning DSC tokens
- Participate in liquidations to maintain system health


A production-ready, over-collateralized, algorithmic stablecoin protocol designed to maintain a soft peg of 1 DSC = 1 USD. The system is inspired by MakerDAO's DAI but built from scratch with modern Solidity practices, comprehensive testing, and a user-friendly Next.js frontend.


## 🔑 Protocol Characteristics

- 🔒 **Exogenously collateralized**: Backed by external crypto assets (WETH, WBTC)
- 📊 **200% collateral requirement**: Enforced via a 50% liquidation threshold
- 🌐 **Fully on-chain & permissionless**: No governance token, no fees
- ⚡ **Built with Foundry**: For blazing-fast compilation, testing, and deployment
- 🛡️ **Security-first**: Comprehensive testing with 100% line coverage
- 📈 **Liquidation incentives**: 10% bonus for liquidators maintaining system health

## 🎨 Frontend Features

This Next.js application provides:

- **Modern UI/UX**: Built with Next.js 15, React 19, and Web3 integrations
- **Real-time Monitoring**: Live health factor tracking and position management
- **Multi-wallet Support**: RainbowKit integration for seamless wallet connections
- **Responsive Design**: Mobile-friendly interface with dark/light theme support
- **Transaction Management**: Clear status updates and error handling

## 🌟 System Properties

| Property | Value | Description |
|----------|-------|-------------|
| Collateral Type | Exogenous | WETH, WBTC |
| Stability Mechanism | Algorithmic | Liquidation-based |
| Collateral Ratio | 200% minimum | Overcollateralized |
| Liquidation Threshold | 50% | Positions liquidatable at 150% ratio |
| Liquidation Bonus | 10% | Incentive for liquidators |
| Peg Target | $1.00 USD | Soft peg maintained |

## 🚀 Technology Stack

### Frontend Application (This Repository)
- **Next.js 15**: React framework with app router
- **React 19**: Latest React version with modern features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom animations
- **Wagmi & Viem**: Web3 React hooks and Ethereum interaction
- **RainbowKit**: Wallet connection and management
- **Zustand**: State management
- **React Hook Form**: Form handling with Zod validation

### Smart Contracts (Backend - Separate Repository)

- **Foundry**: Development framework for compilation, testing, and deployment
- **Solidity**: Smart contract programming language
- **Chainlink**: Decentralized oracle network for price feeds
- **OpenZeppelin**: Battle-tested smart contract libraries


### Frontend Components Integration

The frontend interacts with the deployed smart contracts via Web3 hooks and provides:

- **Real-time Data**: Live health factors, collateral values, and DSC balances
- **Transaction Interface**: User-friendly forms for all protocol operations
- **Wallet Integration**: Seamless connection with multiple wallet providers
- **Error Handling**: Comprehensive transaction status and error management

### Quick Reference

**Health Factor Calculation:**
```
healthFactor = (collateralValueUSD * LIQUIDATION_THRESHOLD) / totalDscMinted
```

**Health Factor Interpretation:**
- `> 1.0`: ✅ Healthy position, cannot be liquidated
- `= 1.0`: ⚠️ At liquidation threshold, risky position  
- `< 1.0`: ❌ Unhealthy position, can be liquidated
- `∞`: 🌟 No debt, perfect health

## 📦 Installation & Setup

### Prerequisites
- **Node.js 18+**: For frontend development
- **pnpm**: Package manager for frontend dependencies
- **Git**: For cloning and version control

### 1. Clone the Repository
```bash
git clone https://github.com/chauhan-varun/defi-stable-coin.git
cd defi-stable-coin
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
pnpm install
```

### 3. Environment Configuration
```bash
# Set up environment variables
cp .env.example .env.local
```

Add your environment variables:
```env
# Smart Contract Addresses (deployed contracts from foundry-defi-stablecoin repo)
NEXT_PUBLIC_DSC_ENGINE_ADDRESS=0x...
NEXT_PUBLIC_DSC_TOKEN_ADDRESS=0x...

# Optional: For wallet connect and additional features
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id
```

### 4. Run the Application
```bash
# Start development server
pnpm dev

# Open browser
# Navigate to http://localhost:3000
```

## 🏗️ Project Structure

```
├── src/                           # Frontend 
│   ├── app/                      # Next.js app 
│   │   ├── mint/                # Mint DSC tokens 
│   │   ├── redeem/              # Redeem 
│   │   ├── liquidate/           # Liquidation 
│   │   └── About/               # About page
│   ├── components/              # Reusable UI 
│   │   ├── AccountInfo.tsx      # User account information display
│   │   ├── Header.tsx           # Navigation header
│   │   ├── HealthFactorGauge.tsx # Health factor visualization
│   │   └── ThemeProvider.tsx    # Dark/light theme management
│   ├── hooks/                   # Custom React hooks for Web3 interactions
│   │   ├── useCollateralBalance.ts
│   │   ├── useHealthFactor.ts
│   │   ├── useDscMinted.ts
│   │   └── useDepositAndMint.ts
│   ├── lib/                     # Utility libraries
│   │   ├── contracts.ts         # Contract addresses and ABIs
│   │   ├── wagmi.ts            # Wagmi configuration
│   │   └── utils.ts            # Helper functions
│   └── abi/                    # Smart contract ABIs
│       ├── dsc.json            # DSC token ABI
│       └── dsce.json           # DSC Engine ABI
├── contracts/                   # Smart contract source (if included)
├── script/                     # Foundry deployment scripts
├── test/                       # Comprehensive test suite
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── fuzz/                   # Fuzz testing
└── public/                     # Static assets
    └── logo.png               # Project logo
```

## 🧪 Frontend Testing

```bash
# Run frontend tests (if implemented)
pnpm test

# Run with coverage
pnpm test:coverage

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

## 🚀 Deployment

### Frontend Deployment

```bash
# Build for production
pnpm build

# Start production server  
pnpm start

# Deploy to Vercel (recommended)
# Connect your GitHub repository to Vercel for automatic deployments
```

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
NEXT_PUBLIC_DSC_ENGINE_ADDRESS=0x... # Deployed DSCEngine contract address
NEXT_PUBLIC_DSC_TOKEN_ADDRESS=0x...  # Deployed DSC token contract address
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id
```

### Key Contract Addresses

The frontend connects to these deployed contracts:
- **DSC Engine**: Handles all protocol logic and operations
- **DSC Token**: ERC-20 stablecoin token contract


### Deployment
```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Deploy to Vercel (recommended)
# Connect your GitHub repository to Vercel for automatic deployments
```

## ⛽ Gas Optimization

### Gas Usage Estimates
| Operation | Estimated Gas | Notes |
|-----------|---------------|-------|
| Deposit Collateral | ~85,000 | First deposit higher due to storage |
| Mint DSC | ~65,000 | Includes health factor check |
| Combined Deposit + Mint | ~140,000 | More efficient than separate calls |
| Liquidation | ~180,000 | Complex multi-step operation |
| Redeem Collateral | ~70,000 | Including health factor verification |

### Optimization Strategies
- **Packed Structs**: Efficient storage layout
- **Batch Operations**: Combined deposit + mint functions
- **Minimal External Calls**: Reduced gas costs
- **Efficient Loops**: Optimized collateral iterations

## 🛡️ Security Features

### Oracle Security
- **Chainlink Integration**: Decentralized, battle-tested price feeds
- **Stale Price Protection**: Using OracleLib for additional safety
- **Multiple Price Sources**: WETH/USD and WBTC/USD feeds

### Smart Contract Security
- **Reentrancy Protection**: All state-changing functions protected
- **Input Validation**: Comprehensive validation of parameters
- **Health Factor Monitoring**: Continuous position health checks
- **Access Control**: Proper ownership and permission management

### Economic Security
- **Liquidation Incentives**: 10% bonus ensures rapid liquidations
- **Overcollateralization**: 200% minimum provides price volatility buffer
- **Partial Liquidations**: Allows precise debt coverage

## 💡 How to Use the Protocol

### 1. Minting DSC
1. Connect your wallet to the application
2. Navigate to the **Mint** page
3. Select collateral type (WETH or WBTC)
4. Enter collateral amount and desired DSC amount
5. Approve token spending for the DSCEngine contract
6. Execute `depositCollateralAndMintDsc` transaction
7. Monitor your health factor to stay above 1.0

### 2. Managing Positions
- **Health Factor**: Monitor your position health (must stay above 1.0)
- **Collateral Value**: Track total USD value of your deposited collateral
- **DSC Minted**: View amount of DSC tokens you've minted
- **Real-time Updates**: Position data updates automatically

### 3. Redeeming Collateral
1. Go to the **Redeem** page
2. Choose between:
   - **Burn DSC only**: Just repay debt
   - **Redeem collateral + burn DSC**: Combined operation
3. Enter amounts and approve DSC spending
4. Execute burn/redeem transaction
5. Collateral is returned to your wallet

### 4. Liquidations
1. Navigate to the **Liquidate** page
2. Enter a user's address to check their health factor
3. If health factor < 1.0, position is liquidatable
4. Enter debt amount to cover (in DSC)
5. Approve DSC spending for the debt amount
6. Execute liquidation transaction
7. Receive liquidated collateral + 10% bonus

### Example Scenarios

#### Healthy Position Example:
- User deposits: **$2,000** worth of ETH
- User mints: **$800** DSC
- Health Factor: `($2,000 × 0.5) ÷ $800 = 1.25` ✅ **Safe**

#### Liquidatable Position Example:
- ETH price drops, collateral now worth: **$1,200**
- User still owes: **$800** DSC  
- Health Factor: `($1,200 × 0.5) ÷ $800 = 0.75` ❌ **Liquidatable**

## 🔗 Smart Contract Integration

The frontend integrates with two main smart contracts:

### DSC Engine Contract
- **Address**: Set via `NEXT_PUBLIC_DSC_ENGINE_ADDRESS`
- **Functions Used**:
  - `depositCollateralAndMintDsc()`
  - `redeemCollateralForDsc()`
  - `burnDsc()`
  - `liquidate()`
  - `getHealthFactor()`
  - `getCollateralBalanceOfUser()`

### DSC Token Contract  
- **Address**: Set via `NEXT_PUBLIC_DSC_TOKEN_ADDRESS`
- **Functions Used**:
  - `approve()` - For spending allowances
  - `balanceOf()` - Check DSC balance
  - Standard ERC-20 functions

## 🎨 Frontend Features

### Real-time Health Factor Monitoring
- **Visual Gauge**: Color-coded health factor display
- **Risk Levels**: Safe (green), Warning (yellow), Danger (red)
- **Automatic Updates**: Real-time position monitoring

### User Experience
- **Responsive Design**: Mobile-friendly interface
- **Dark/Light Theme**: Toggle between themes
- **Smooth Animations**: Enhanced user interactions
- **Clear Status Messages**: Transaction feedback
- **Input Validation**: Error prevention and handling
- **Max Buttons**: Quick amount selection
- **Wei/Decimal Support**: Flexible input formats

### Wallet Integration
- **RainbowKit**: Beautiful wallet connection UI
- **Multi-wallet Support**: MetaMask, WalletConnect, etc.
- **Account Information**: Real-time balance and position data
- **Transaction Management**: Clear transaction states

## 🛠️ Development Commands

### Frontend Development
```bash
# Development
pnpm dev                   # Start development server
pnpm dev --turbopack      # Start with Turbopack (faster)
pnpm build                # Build for production
pnpm start                # Start production server
pnpm lint                 # Run ESLint
pnpm type-check           # TypeScript type checking
```

## ⚠️ Risk Considerations

### Technical Risks
| Risk Type | Impact | Mitigation |
|-----------|--------|------------|
| Oracle Risk | High | Chainlink integration + stale price protection |
| Smart Contract Risk | High | Extensive testing + code audits |
| Liquidation Risk | Medium | Economic incentives + partial liquidations |
| Price Volatility | Medium | 200% overcollateralization requirement |

### Operational Risks
- **Price Feed Manipulation**: Mitigated by Chainlink's decentralized oracles
- **Flash Loan Attacks**: Protected by reentrancy guards and health factor checks
- **Governance Risk**: Eliminated by having no governance token
- **Liquidity Risk**: Requires market makers for DSC/USD liquidity

### User Safety Guidelines
⚠️ **Important Safety Tips:**
- Maintain health factor well above **1.2** for safety buffer
- Monitor collateral prices regularly during volatile markets
- Consider partial redemptions during significant market volatility
- Understand liquidation mechanics before using the protocol
## 📚 Learn More

### Frontend Technologies
- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Smart Contracts & DeFi
- [DSC Smart Contracts Repository](https://github.com/chauhan-varun/foundry-defi-stablecoin)
- [Foundry Documentation](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Chainlink Price Feeds](https://docs.chain.link/data-feeds/price-feeds)

## 🤝 Contributing

We welcome contributions to improve the frontend application!

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Write clear, descriptive component names
- Add proper error handling for Web3 interactions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an experimental DeFi protocol frontend. Please use at your own risk and never invest more than you can afford to lose. Always verify smart contract addresses and do your own research before interacting with any DeFi protocol.

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Check the [smart contracts documentation](https://github.com/chauhan-varun/foundry-defi-stablecoin)
- Review the frontend code and components

## 👨‍💻 Author

**Varun Chauhan** - Frontend & Smart Contract Developer

- 🐙 GitHub: [chauhan-varun](https://github.com/chauhan-varun)
- 📧 Email: varunchauhan097@gmail.com
- 🔗 Smart Contracts: [foundry-defi-stablecoin](https://github.com/chauhan-varun/foundry-defi-stablecoin)

---

Built with ❤️ for the DeFi community
