# 🚀 Quick Start Guide - StreamSplit

## Current Status: Day 1 Complete ✅

All smart contract code is written, tested, and ready to deploy!

## Next: Deploy to Testnet (10 minutes)

### Option 1: Use Existing Wallet

If you already have MetaMask:

1. **Get your private key:**
   - Open MetaMask
   - Click 3 dots → Account Details → Show Private Key
   - Copy the key (without 0x)

2. **Add to .env:**
   ```powershell
   cd c:\Users\User\Desktop\celo\stream-split\packages\hardhat
   notepad .env
   ```
   Add this line:
   ```
   PRIVATE_KEY=your_private_key_here_without_0x
   ```

3. **Get testnet funds:**
   - Visit: https://faucet.celo.org/alfajores
   - Paste your MetaMask address
   - Click "Get CELO"

4. **Deploy:**
   ```powershell
   cd c:\Users\User\Desktop\celo\stream-split\packages\hardhat
   npm run deploy
   ```

5. **Save the contract address!**
   You'll need it for the frontend.

### Option 2: Generate New Wallet

If you need a new wallet:

1. **Create wallet:**
   ```powershell
   cd c:\Users\User\Desktop\celo\stream-split\packages\hardhat
   npx hardhat run scripts/create-wallet.ts
   ```

2. **Copy the output** and follow steps 2-5 from Option 1

## After Deployment

You'll get output like:
```
✅ StreamSplit deployed to: 0x1234...5678
🔍 Verify on Celoscan:
https://alfajores.celoscan.io/address/0x1234...5678
```

**Save that contract address!** You'll need it for Day 2 (frontend).

## What's Ready

✅ Smart Contract (StreamSplit.sol)
✅ Tests (19/19 passing)
✅ Deployment Script
✅ Helper Scripts
✅ Documentation

## What's Next (Day 2)

🔜 React Frontend
🔜 Composer Kit UI
🔜 Wallet Connection
🔜 Beautiful Dashboard

## Quick Commands

```powershell
# Navigate to hardhat directory
cd c:\Users\User\Desktop\celo\stream-split\packages\hardhat

# Run tests
npm test

# Generate wallet
npx hardhat run scripts/create-wallet.ts

# Deploy to testnet
npm run deploy

# Verify contract
npx hardhat verify --network alfajores YOUR_CONTRACT_ADDRESS
```

## Need Help?

- **Full Guide**: Read `packages/hardhat/README.md`
- **Day 1 Summary**: Read `DAY1_COMPLETE.md`
- **Project Overview**: Read `StreamSplit_Project_Guide.md`

## Faucets (Get Testnet CELO)

- https://faucet.celo.org/alfajores (Official)
- https://celo.org/developers/faucet (Backup)

## 🎯 Your Goal Today

1. Deploy the smart contract to Alfajores ✓
2. Verify it on Celoscan ✓
3. Save the contract address ✓

That's it! You'll be ready for Day 2 tomorrow.

---

**Questions?** Everything is documented in the README files! 📚
