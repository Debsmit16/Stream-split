# 🪙 Getting Testnet Funds - Simple Guide

## ✅ Your Wallet is Ready!

**Your Test Wallet Address:**
```
0x03Da0E4572367606bEe2BAe6F4f00E2EBF9f8733
```

**Private Key:** Already saved in `.env` file ✓

---

## 💰 Step 1: Get Free Testnet CELO (2 minutes)

### Method 1: Celo Faucet (Easiest)

1. **Visit the faucet:**
   - Open: https://faucet.celo.org/alfajores

2. **Enter your address:**
   - Copy: `0x03Da0E4572367606bEe2BAe6F4f00E2EBF9f8733`
   - Paste into the form

3. **Click "Get Testnet Tokens"**
   - You'll receive testnet CELO automatically
   - Wait 10-30 seconds

4. **Verify you received funds:**
   - Open: https://alfajores.celoscan.io/address/0x03Da0E4572367606bEe2BAe6F4f00E2EBF9f8733
   - You should see a balance (usually 1-5 CELO)

### Method 2: Alternative Faucets (if Method 1 doesn't work)

Try these in order:
1. https://celo.org/developers/faucet
2. https://stakely.io/en/faucet/celo-alfajores

---

## 🚀 Step 2: Deploy Your Contract (30 seconds)

Once you have testnet funds, run:

```powershell
cd c:\Users\User\Desktop\celo\stream-split\packages\hardhat
npm run deploy
```

This will:
- Deploy StreamSplit contract to Alfajores testnet
- Show you the contract address
- Give you a Celoscan link

---

## ❓ FAQ

**Q: Do I need MetaMask?**
A: No! We generated a wallet for you. MetaMask is optional (for viewing in a browser).

**Q: Is this real money?**
A: No! This is testnet CELO - it's free and has no real value.

**Q: What if the faucet doesn't work?**
A: Try the alternative faucets above, or wait 24 hours and try again.

**Q: Can I use this wallet on mainnet?**
A: Not recommended! Create a new wallet for real money later.

**Q: How do I add this wallet to MetaMask?**
A: 
1. Open MetaMask
2. Click account icon → Import Account
3. Paste private key: `55b89a1f0af09d9139a0b06f06efd5c7a35214020e49d0200b2181fd7def237f`
4. Switch network to "Celo Alfajores"

---

## 🎯 Next Steps

1. ✅ Wallet created
2. 🔄 **Get testnet funds** (do this now!)
3. 🔜 Deploy contract
4. 🔜 Build frontend (Day 2)

**Action Required:** Visit the faucet and get some testnet CELO!
