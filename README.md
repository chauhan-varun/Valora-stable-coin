# DSC Protocol - Decentralized Stablecoin Platform

A production-ready, over-collateralized, algorithmic stablecoin protocol designed to maintain a soft peg of 1 DSC = 1 USD. The system is inspired by MakerDAO's DAI but built from scratch with modern Solidity practices, comprehensive testing, and a user-friendly Next.js frontend.

![Valora Logo](public/logo.png)

## � Introduction

This repository contains both the smart contracts and frontend application for a fully decentralized stablecoin protocol. Users can deposit approved collateral tokens (WETH, WBTC), mint DSC stablecoins, maintain healthy collateralization ratios, and participate in liquidations to maintain system health.

## 🔑 Key Characteristics

- 🔒 **Exogenously collateralized**: Backed by external crypto assets (WETH, WBTC)
- 📊 **200% collateral requirement**: Enforced via a 50% liquidation threshold
- 🌐 **Fully on-chain & permissionless**: No governance token, no fees
- ⚡ **Built with Foundry**: For blazing-fast compilation, testing, and deployment
- 🛡️ **Security-first**: Comprehensive testing with 100% line coverage
- 📈 **Liquidation incentives**: 10% bonus for liquidators maintaining system health
- 🎨 **Modern Frontend**: Built with Next.js 15, React 19, and Web3 integrations

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

### Smart Contracts (Backend)
- **Foundry**: Development framework for compilation, testing, and deployment
- **Solidity**: Smart contract programming language
- **Chainlink**: Decentralized oracle network for price feeds
- **OpenZeppelin**: Battle-tested smart contract libraries

### Frontend Application
- **Next.js 15**: React framework with app router
- **React 19**: Latest React version with modern features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom animations
- **Wagmi & Viem**: Web3 React hooks and Ethereum interaction
- **RainbowKit**: Wallet connection and management
- **Zustand**: State management
- **React Hook Form**: Form handling with Zod validation

## 🏗️ Architecture

### Smart Contract Components

#### 1. DecentralizedStableCoin.sol
```solidity
contract DecentralizedStableCoin is ERC20Burnable, Ownable
```
- ERC-20 token contract for DSC stablecoin
- Extends OpenZeppelin's ERC20Burnable and Ownable
- Minting/burning restricted to DSCEngine contract only
- Implements standard ERC-20 functionality with burn capability

**Key Functions:**
- `mint(address to, uint256 amount)` - Only callable by DSCEngine
- `burn(uint256 amount)` - Inherited from ERC20Burnable
- Standard ERC-20 functions (transfer, approve, etc.)

#### 2. DSCEngine.sol
```solidity
contract DSCEngine is ReentrancyGuard
```
- Core protocol logic and system management
- Handles all collateral operations and DSC lifecycle
- Implements comprehensive safety checks and liquidation mechanisms
- Uses Chainlink oracles for reliable price feeds

**Core Functions:**

| Function | Purpose | Access |
|----------|---------|--------|
| `depositCollateral()` | Deposit approved collateral | Public |
| `mintDsc()` | Mint DSC against collateral | Public |
| `depositCollateralAndMintDsc()` | Combined deposit + mint | External |
| `redeemCollateral()` | Withdraw collateral | External |
| `burnDsc()` | Burn DSC to improve health | External |
| `liquidate()` | Liquidate unhealthy positions | External |
| `getHealthFactor()` | Check position health | View |

### System Constants
```solidity
uint256 private constant LIQUIDATION_THRESHOLD = 50;        // 50%
uint256 private constant LIQUIDATION_BONUS = 10;           // 10%
uint256 private constant MIN_HEALTH_FACTOR = 1 ether;      // 1.0
uint256 private constant PRECISION = 1e18;                 // 18 decimals
```

## 📊 Health Factor & Liquidations

### Health Factor Calculation
The health factor determines the safety of a user's position:

```
healthFactor = (collateralValueUSD * LIQUIDATION_THRESHOLD) / totalDscMinted
```

**Health Factor Interpretation:**
- `> 1.0`: ✅ Healthy position, cannot be liquidated
- `= 1.0`: ⚠️ At liquidation threshold, risky position  
- `< 1.0`: ❌ Unhealthy position, can be liquidated
- `∞`: 🌟 No debt, perfect health

### Mathematical Formulas

**Health Factor:**
```
Health Factor = (Collateral Value USD × 50%) ÷ Total DSC Minted
```

**Collateral Value:**
```
Collateral Value = Σ(Token Amount × Token Price USD)
```

**Liquidation Collateral:**
```
Collateral to Transfer = (Debt to Cover ÷ Collateral Price) × 1.10
```

## 📦 Installation & Setup

### Prerequisites
- **Node.js 18+**: For frontend development
- **Git**: For cloning and version control
- **pnpm**: Package manager for frontend dependencies

### 1. Clone the Repository
```bash
git clone https://github.com/chauhan-varun/defi-stable-coin.git
cd defi-stable-coin
```

### 2. Smart Contract Setup
```bash
# Install Foundry dependencies
forge install

# Build contracts
forge build

# Run tests
forge test

# Generate coverage report
forge coverage
```

### 3. Frontend Setup
```bash
# Install frontend dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

Add your environment variables:
```env
# Smart Contract Addresses
NEXT_PUBLIC_DSC_ENGINE_ADDRESS=0x...
NEXT_PUBLIC_DSC_TOKEN_ADDRESS=0x...

# RPC URLs (for smart contract deployment)
MAINNET_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your-api-key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key

# Private Keys (use test accounts only)
PRIVATE_KEY=your-private-key-here

# API Keys
ETHERSCAN_API_KEY=your-etherscan-api-key
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

### Frontend Testing
```bash
# Run frontend tests (if implemented)
pnpm test

# Run with coverage
pnpm test:coverage
```


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

### Foundry Commands
```bash
# Essential Commands
forge build                 # Compile contracts
forge test                  # Run test suite
forge coverage             # Generate coverage report
forge fmt                  # Format Solidity code
forge snapshot             # Create gas snapshots
forge doc                  # Generate documentation

# Advanced Commands
forge install openzeppelin/openzeppelin-contracts  # Install dependency
forge remove openzeppelin-contracts               # Remove dependency
forge update                                      # Update all dependencies
forge flatten src/DSCEngine.sol                  # Flatten contracts
```

### Frontend Commands
```bash
# Development
pnpm dev                   # Start development server
pnpm dev --turbopack      # Start with Turbopack (faster)
pnpm build                # Build for production
pnpm start                # Start production server
pnpm lint                 # Run ESLint
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
- Never invest more than you can afford to lose
- Verify smart contract addresses before interacting

## 🚀 Deployment

### Build for production
```bash
pnpm build
```

### Start production server
```bash
pnpm start
```

### Deploy to Vercel
The app is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy on each push to the main branch.

## 🛠️ Development

### Run linting
```bash
pnpm lint
```

### Development with Turbopack
```bash
pnpm dev --turbopack
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an experimental DeFi protocol. Please use at your own risk and never invest more than you can afford to lose. Always verify smart contract addresses and do your own research before interacting with any DeFi protocol.

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Check the documentation
- Review the smart contract code

---

Built with ❤️ by [Varun Chauhan](https://github.com/chauhan-varun)
