# 💸 StreamSplit - Real-Time Salary Streaming on Celo

> Get paid every second. Stream your salary payments in real-time on the Celo blockchain.

![StreamSplit Banner](https://img.shields.io/badge/Celo-Blockchain-yellow?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js) ![Solidity](https://img.shields.io/badge/Solidity-0.8.28-blue?style=for-the-badge&logo=solidity) ![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge)

## 🌟 Features

### 💰 Real-Time Payment Streaming
- **Second-by-Second Payments**: Workers earn money every second they work
- **Instant Withdrawals**: Access earned funds at any time
- **Zero Delays**: No waiting for monthly or weekly payroll cycles
- **Blockchain Verified**: All transactions recorded on Celo blockchain

### 🎛️ Employer Dashboard
- Create payment streams with hourly rates
- Pause/Resume stream payments
- Stop streams permanently
- Add funds to existing streams
- View transaction history with Celoscan links
- Real-time stream status monitoring

### 👷 Worker Dashboard
- View real-time earnings (18-decimal precision)
- Withdraw funds instantly to wallet
- Live earnings counter updates every second
- Track payment history

### 🎨 Retro-Futuristic UI
- Dark cyberpunk theme with cyan/purple color scheme
- Animated grid backgrounds and scanlines
- Twinkling stars effect
- Terminal-style authentication screens
- Monospace fonts throughout
- Retro toast notifications with glow effects

### 📱 Progressive Web App (PWA)
- **Installable**: Add to home screen on mobile/desktop
- **Offline Support**: Service worker caching
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Touch Optimized**: 44px minimum touch targets
- **Mobile Menu**: Hamburger navigation for small screens

## 🚀 Live Demo

- **Frontend**: Deploy to Vercel - See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
- **Contract (Testnet)**: `0x28f8aE58a76aEe9024e4a823af429831c6173029` (Celo Alfajores)
- **Contract (Mainnet)**: Not yet deployed - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0 (App Router, Turbopack)
- **React**: 19.2.0
- **Language**: TypeScript 5
- **Web3**: RainbowKit 2.2.9, Wagmi 2.18.2, Viem 2.38.4
- **Styling**: Tailwind CSS 4
- **Notifications**: react-hot-toast
- **PWA**: Custom service worker implementation

### Smart Contracts
- **Language**: Solidity 0.8.28
- **Framework**: Hardhat
- **Network**: Celo (Alfajores Testnet)
- **Features**: Pausable, Ownable, ReentrancyGuard

### Blockchain
- **Network**: Celo Alfajores Testnet
- **Currency**: CELO tokens
- **Block Explorer**: [Celoscan](https://alfajores.celoscan.io)

## 📦 Installation

### Prerequisites
```bash
node >= 18.x
npm >= 9.x
```

### Clone Repository
```bash
git clone https://github.com/Debsmit16/Stream-split.git
cd Stream-split
```

### Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd packages/react-app
npm install --legacy-peer-deps

# Install smart contract dependencies
cd ../hardhat
npm install
```

### Environment Setup

Create `.env.local` in `packages/react-app/`:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

## 🏃 Running Locally

### Start Development Server
```bash
cd packages/react-app
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Compile Smart Contracts
```bash
cd packages/hardhat
npx hardhat compile
```

### Deploy Smart Contracts
```bash
# Deploy to Alfajores testnet
npx hardhat run scripts/deploy.ts --network alfajores

# Deploy to Celo mainnet
npx hardhat run scripts/deploy.ts --network celo
```

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Visit the website
2. Click install icon in address bar
3. Or click the floating "INSTALL APP" button

### Mobile (Android)
1. Open in Chrome
2. Tap "Add to Home Screen"
3. App opens in standalone mode

### Mobile (iOS)
1. Open in Safari
2. Tap Share → "Add to Home Screen"
3. Icon appears on home screen

## 🎮 How to Use

### For Employers
1. **Connect Wallet**: Click "Connect Wallet" and connect MetaMask
2. **Login**: Click "[[ LOGIN ]]" and enter credentials (demo mode)
3. **Create Stream**:
   - Enter worker's wallet address
   - Set hourly rate (in CELO)
   - Set duration (in hours)
   - Click "Create Payment Stream"
4. **Manage Streams**:
   - **[PAUSE]**: Temporarily pause payments
   - **[RESUME]**: Resume paused stream
   - **[STOP]**: Permanently end stream
   - **[ADD FUNDS]**: Top up stream deposit

### For Workers
1. **Connect Wallet**: Connect your wallet
2. **Login**: Click "[[ LOGIN ]]" and authenticate
3. **View Earnings**: See real-time earnings updating every second
4. **Withdraw**: Click "WITHDRAW EARNINGS" to claim funds

## 🔐 Smart Contract Functions

### Core Functions
- `createStream()`: Create new payment stream
- `pauseStream()`: Pause active stream
- `resumeStream()`: Resume paused stream
- `stopStream()`: Stop stream permanently
- `addDeposit()`: Add more funds to stream
- `withdraw()`: Worker withdraws earned amount
- `getStreamInfo()`: Get stream details

### Security Features
- ReentrancyGuard protection
- Ownable access control
- Pausable functionality
- Comprehensive event logging

## 📊 Smart Contract Details

```solidity
struct Stream {
    address employer;
    address worker;
    uint256 ratePerSecond;
    uint256 deposit;
    uint256 withdrawn;
    uint256 lastWithdrawal;
    bool active;
}
```

### Key Events
- `StreamCreated(uint256 streamId, address employer, address worker, uint256 ratePerSecond)`
- `Withdrawn(uint256 streamId, address worker, uint256 amount)`
- `StreamPaused(uint256 streamId)`
- `StreamResumed(uint256 streamId)`
- `StreamStopped(uint256 streamId)`
- `DepositAdded(uint256 streamId, uint256 amount)`

## 🎨 UI/UX Features

### Responsive Breakpoints
- **Mobile**: 0-479px
- **Tablet**: 480-767px
- **Desktop**: 768px+
- **Large Desktop**: 1280px+
- **Ultra-wide**: 1536px+

### Accessibility
- Touch-friendly (44px minimum targets)
- Keyboard navigation support
- Reduced motion support
- High contrast mode
- Screen reader friendly

## 📝 Project Structure

```
stream-split/
├── packages/
│   ├── react-app/          # Next.js frontend
│   │   ├── app/
│   │   │   ├── components/ # React components
│   │   │   ├── employer/   # Employer dashboard
│   │   │   ├── worker/     # Worker dashboard
│   │   │   ├── page.tsx    # Landing page
│   │   │   └── layout.tsx  # Root layout
│   │   ├── config/         # Contract config
│   │   ├── public/         # PWA assets, icons
│   │   └── package.json
│   └── hardhat/            # Smart contracts
│       ├── contracts/      # Solidity contracts
│       ├── scripts/        # Deployment scripts
│       └── hardhat.config.ts
├── PWA_RESPONSIVE_GUIDE.md # PWA documentation
└── README.md
```

## 🧪 Testing

### Frontend Testing
```bash
cd packages/react-app
npm run build
npm run start
```

### Contract Testing
```bash
cd packages/hardhat
npx hardhat test
```

### Lighthouse PWA Audit
```bash
# Build production version
npm run build

# Run Lighthouse audit
lighthouse http://localhost:3000 --view
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
# Push to GitHub
git push origin main

# Deploy on Vercel
# Connect GitHub repo at vercel.com
# Set environment variables
# Deploy automatically
```

### Smart Contract (Celo Mainnet)
```bash
cd packages/hardhat
npx hardhat run scripts/deploy.ts --network celo
```

## 🔧 Configuration

### Network Configuration (hardhat.config.ts)
- **Alfajores Testnet**: Chain ID 44787
- **Celo Mainnet**: Chain ID 42220

### WalletConnect
- Project ID required from [WalletConnect Cloud](https://cloud.walletconnect.com/)
- Configure in `.env.local`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Celo**: For the fast, mobile-first blockchain
- **RainbowKit**: For excellent wallet connection UI
- **Next.js**: For the amazing React framework
- **Tailwind CSS**: For utility-first styling

## 📞 Contact

- **GitHub**: [@Debsmit16](https://github.com/Debsmit16)
- **Repository**: [Stream-split](https://github.com/Debsmit16/Stream-split)

## 🗺️ Roadmap

- [x] Smart contract deployment (Alfajores)
- [x] Employer dashboard
- [x] Worker dashboard
- [x] Real-time earnings
- [x] Stream management controls
- [x] Retro-futuristic UI
- [x] PWA implementation
- [x] Responsive design
- [ ] **Vercel deployment** - [Quick Guide](./QUICK_DEPLOY.md)
- [ ] **Mainnet deployment** - [Full Guide](./DEPLOYMENT_GUIDE.md)
- [ ] Multi-token support (CELO, cUSD, cEUR)
- [ ] Stream scheduling
- [ ] Email notifications

---

## 🚀 Quick Deploy

**Ready to deploy?** Check out:
- 📘 [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 5-minute Vercel deployment
- 📗 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete production guide

---
- [ ] Mainnet deployment
- [ ] Multi-stream support
- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Multi-language support

---

<div align="center">
  <strong>Built with ❤️ on Celo Blockchain</strong>
  <br/>
  <sub>Stream your salary. Get paid every second.</sub>
</div>
