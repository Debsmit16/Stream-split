# Changelog

All notable changes to StreamSplit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-26

### Added
- **Smart Contract**: StreamSplit.sol deployed to Celo Alfajores testnet at `0x28f8aE58a76aEe9024e4a823af429831c6173029`
  - Create payment streams with hourly rates
  - Pause/Resume stream functionality
  - Stop stream permanently
  - Add deposit to existing streams
  - Worker withdrawal function
  - Real-time earnings calculation on-chain

- **Employer Dashboard** (`/employer`)
  - Create new payment streams
  - Transaction history with event listening
  - Stream management controls (Pause/Resume/Stop/Add Funds)
  - Celoscan transaction links
  - Cyan-themed login authentication
  - Real-time stream status monitoring

- **Worker Dashboard** (`/worker`)
  - Real-time earnings display (updates every second)
  - 18-decimal precision for accurate earnings
  - Instant withdrawal to wallet
  - Purple-themed login authentication
  - Blockchain-verified earnings from smart contract

- **Landing Page** - Retro-Futuristic Theme
  - Twinkling stars animation (50 stars)
  - Retro grid background (50px squares)
  - Scanlines CRT effect
  - Cyan/purple color scheme
  - Monospace fonts throughout
  - Live demo earnings counter
  - Terminal-style branding

- **Authentication System**
  - Login forms for both employer and worker dashboards
  - Demo mode (accepts any credentials)
  - Retro terminal-style UI with corner brackets
  - Color-coded themes (cyan for employer, purple for worker)

- **Toast Notifications**
  - Installed react-hot-toast library
  - Retro-themed notifications with glow effects
  - Success notifications (green border)
  - Error notifications (red border)
  - Loading notifications (cyan border)
  - Monospace font with [PREFIX] format

- **Progressive Web App (PWA)**
  - `manifest.json` with app metadata
  - Service worker (`sw.js`) for offline support
  - 8 PWA icons (72px to 512px) with gradient branding
  - PWA install prompt component with retro styling
  - Service worker registration (production only)
  - Apple Touch Icon support for iOS

- **Responsive Design**
  - Mobile-first CSS approach
  - Breakpoints: Mobile (0-479px), Tablet (480-767px), Desktop (768px+)
  - Mobile hamburger menu component
  - Touch-optimized controls (44px minimum targets)
  - Landscape mode support
  - High DPI display optimization
  - Reduced motion support for accessibility

- **Developer Tools**
  - Icon generation script (`generate-icons.js`)
  - PWA documentation (`PWA_RESPONSIVE_GUIDE.md`)
  - Comprehensive README.md
  - MIT License
  - Updated .gitignore

### Technical Stack
- Next.js 16.0.0 with Turbopack
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- RainbowKit 2.2.9
- Wagmi 2.18.2
- Viem 2.38.4
- Solidity 0.8.28
- Hardhat
- react-hot-toast

### Fixed
- Real-time earnings now use actual blockchain data (`streamInfo[5]`) instead of client-side calculations
- Refetch interval set to 1 second for real-time updates
- Next.js 16 viewport configuration moved to separate export
- PWA install button structure (removed nested buttons)
- CSS parsing errors in globals.css
- Build compatibility with Turbopack

### Changed
- Removed floating emoji icons from landing page (kept only stars)
- Updated metadata configuration for Next.js 16 compatibility
- Optimized responsive CSS for better mobile experience
- Improved toast notification styling to match retro theme

### Security
- ReentrancyGuard on smart contract
- Ownable access control
- Pausable functionality
- Comprehensive event logging

## [Unreleased]

### Planned Features
- Deploy to Vercel/Netlify
- Celo Mainnet deployment
- Multi-stream support for workers
- Push notifications for payment updates
- Biometric authentication
- Background sync for offline transactions
- Multi-language support
- Dark/light mode toggle
- App shortcuts in manifest
- Share target API

---

**Legend:**
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities
