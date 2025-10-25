# StreamSplit Smart Contract 🚀

## ✅ Status: Ready to Deploy!

**All tests passing: 19/19** ✓

## 📋 What's Done

- ✅ Smart contract written (StreamSplit.sol)
- ✅ Hardhat configuration for Celo networks
- ✅ Comprehensive test suite (19 tests)
- ✅ Deployment script ready
- ✅ All dependencies installed

## 🎯 Next Steps to Deploy

### 1. Get a Wallet Private Key

You need a wallet with some testnet CELO for deployment. Choose one method:

**Option A: MetaMask (Recommended)**
1. Install MetaMask browser extension
2. Create/import a wallet
3. Go to Settings → Security & Privacy → Show private key
4. Copy your private key

**Option B: Generate New Wallet**
```powershell
# This will create a new wallet and show private key
npx hardhat run scripts/create-wallet.ts
```

### 2. Add Private Key to .env

Open `packages/hardhat/.env` and add your private key:
```
PRIVATE_KEY=your_private_key_here_without_0x
```

⚠️ **IMPORTANT**: Never commit this file to git! It's already in .gitignore.

### 3. Get Testnet Funds

You need CELO on Alfajores testnet to deploy:

**Celo Faucet**
- Visit: https://faucet.celo.org/alfajores
- Enter your wallet address
- Request testnet CELO

**Alternative Faucets**
- https://celo.org/developers/faucet

### 4. Deploy to Alfajores Testnet

```powershell
npm run deploy
```

This will:
- Deploy StreamSplit contract
- Show you the contract address
- Give you the Celoscan link

### 5. Verify on Celoscan (Optional but Recommended)

After deployment, verify your contract:
```powershell
npx hardhat verify --network alfajores YOUR_CONTRACT_ADDRESS
```

## 🧪 Testing

Run all tests:
```powershell
npm test
```

Run tests with gas reporting:
```powershell
REPORT_GAS=true npm test
```

## 🏗️ Contract Functions

### For Employers (Who Pay)
- `createStream(worker, ratePerSecond)` - Create a new salary stream
- `pauseStream(streamId)` - Temporarily pause payments
- `resumeStream(streamId)` - Resume a paused stream
- `stopStream(streamId)` - Stop stream and get refund
- `addDeposit(streamId)` - Add more funds to stream

### For Workers (Who Get Paid)
- `withdraw(streamId)` - Withdraw earned salary
- `calculateEarned(streamId)` - Check how much is available

### For Everyone
- `getStreamInfo(streamId)` - View stream details

## 📊 Test Coverage

- ✅ Stream creation validation (5 tests)
- ✅ Earnings calculation (2 tests)
- ✅ Withdrawal functionality (4 tests)
- ✅ Pause/Resume control (4 tests)
- ✅ Stream termination (2 tests)
- ✅ Deposit management (2 tests)

## 🔒 Security Features

- Non-reentrant withdrawals
- Access control (only employer can pause/stop)
- Input validation
- Safe math (Solidity 0.8.20)
- Event emissions for all actions

## 🌐 Networks Configured

- **Alfajores Testnet** (for testing)
  - Chain ID: 44787
  - RPC: https://alfajores-forno.celo-testnet.org
  
- **Celo Mainnet** (for production)
  - Chain ID: 42220
  - RPC: https://forno.celo.org

## 📝 Useful Commands

```powershell
# Compile contracts
npm run compile

# Run tests
npm test

# Deploy to Alfajores
npm run deploy

# Deploy to mainnet (use with caution!)
npm run deploy -- --network celo

# Verify contract
npm run verify YOUR_CONTRACT_ADDRESS
```

## 🆘 Troubleshooting

**"Insufficient funds" error**
- Make sure you have testnet CELO from the faucet
- Check your wallet balance on Celoscan

**"Private key not found"**
- Make sure you added PRIVATE_KEY to `.env`
- Don't include "0x" prefix in the private key

**Tests failing**
- Run `npm install` to ensure all dependencies are installed
- Try `npx hardhat clean` then `npx hardhat compile`

## 🎓 What's Next?

After successful deployment, you'll need to:
1. Save the contract address
2. Build the React frontend (Day 2)
3. Connect frontend to your deployed contract
4. Test the full application
5. Prepare demo for hackathon!

---

**Ready to deploy?** Just follow steps 1-4 above! 🚀
