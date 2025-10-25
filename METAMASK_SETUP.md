# 🦊 MetaMask Setup Guide - Step by Step

## ✅ Your New Wallet Info

**Address:**
```
0x642826Fd8cB0a0A9A337774933c5EA4B732b42E3
```

**Recovery Phrase (12 words) - SAVE THIS:**
```
nest tree proof cool physical warfare vessel hold key left table person
```

**Private Key (already saved in .env):**
```
e3050fe5ce4ea31b5aeb99714a0da5218b3d417fd79cfd0064673b0ecc18185e
```

---

## Step 1: Install MetaMask (1 minute)

1. **Open this link:**
   https://metamask.io/download/

2. **Click "Install MetaMask for [Your Browser]"**

3. **Click "Add to Chrome"** (or Edge/Brave)

4. **Click "Add Extension"**

5. **MetaMask will open automatically**

---

## Step 2: Import Your Wallet (2 minutes)

In MetaMask:

1. **Click "Get Started"**

2. **Click "Import an existing wallet"**

3. **Click "I Agree"** (to help improve MetaMask)

4. **Enter your Secret Recovery Phrase** (paste each word):
   ```
   nest tree proof cool physical warfare vessel hold key left table person
   ```
   Type each word in the boxes (or paste all 12 words)

5. **Create a password** for MetaMask
   - Use any password you'll remember
   - This is just to unlock MetaMask, NOT your recovery phrase

6. **Click "Import my wallet"**

7. ✅ **Success!** You should see your wallet

---

## Step 3: Add Celo Alfajores Network (1 minute)

1. **Click the network dropdown** (top left - probably says "Ethereum Mainnet")

2. **Click "Add Network"** or "Add a network manually"

3. **Enter these details:**
   - Network Name: `Celo Alfajores Testnet`
   - New RPC URL: `https://alfajores-forno.celo-testnet.org`
   - Chain ID: `44787`
   - Currency Symbol: `CELO`
   - Block Explorer URL: `https://alfajores.celoscan.io`

4. **Click "Save"**

5. **Switch to Celo Alfajores** (click network dropdown → select "Celo Alfajores Testnet")

---

## Step 4: Get Testnet Funds (1 minute)

Now the faucet will detect your wallet!

1. **Visit:** https://faucet.celo.org/alfajores

2. **Click "Connect Wallet"** (MetaMask should pop up)

3. **Click "Next" → "Connect"** in MetaMask

4. **Click "Get Testnet Tokens"**

5. **Wait 30 seconds** - you'll receive testnet CELO!

6. **Check your MetaMask** - you should see a balance

---

## ✅ Verification

Your wallet address should be:
```
0x03Da0E4572367606bEe2BAe6F4f00E2EBF9f8733
```

You should see a balance like "1.0 CELO" or similar in MetaMask.

---

## 🚀 After You Have Funds

Come back to the terminal and run:

```powershell
cd c:\Users\User\Desktop\celo\stream-split\packages\hardhat
npm run deploy
```

This will deploy your smart contract!

---

## 🆘 Troubleshooting

**"MetaMask not popping up?"**
- Look for the MetaMask icon in your browser extensions
- Click it manually
- Make sure you're on Celo Alfajores network

**"Can't add network?"**
- Try clicking "Add Network Manually" at the bottom
- Copy the details exactly as shown above

**"Faucet still doesn't work?"**
- Try this alternative: https://stakely.io/en/faucet/celo-alfajores
- Or this: https://celo.org/developers/faucet

**"Wrong address showing in MetaMask?"**
- Make sure you imported using the private key above
- Check you selected the imported account (click account icon → select Account 2)

---

## 📝 Quick Summary

1. Install MetaMask extension
2. Import your wallet using private key
3. Add Celo Alfajores network
4. Visit faucet and connect wallet
5. Get free testnet CELO
6. Deploy contract!

**You're almost there! Just follow these steps and you'll have your contract deployed in 5 minutes!** 🚀
