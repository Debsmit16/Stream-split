# 🚀 Quick Deploy Guide

## Step 1: Deploy to Vercel (5 minutes)

### Easy Way - Import from GitHub:

1. **Go to Vercel**
   ```
   https://vercel.com
   ```
   - Sign in with GitHub

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Search for "Stream-split"
   - Click "Import"

3. **Configure Settings**
   ```
   Root Directory: packages/react-app
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=245ad129f4e05f4025acb312a2df7e5c
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x28f8aE58a76aEe9024e4a823af429831c6173029
   NEXT_PUBLIC_NETWORK=alfajores
   ```

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! 🎉

---

## Step 2: Deploy Contract to Celo Mainnet

### ⚠️ IMPORTANT: You Need Real CELO Tokens

**Before deploying to mainnet:**
- You need ~0.5-1 CELO for gas fees
- This costs real money (unlike testnet)
- Only deploy when you're ready for production

### Get CELO Tokens:
1. Buy from exchanges: Coinbase, Binance, OKX
2. Withdraw to your deployer wallet address
3. Check `.env` in `packages/hardhat` for your address

### Deploy Command:

```bash
# From project root
cd packages/hardhat

# Check your balance first (you need CELO!)
npx hardhat run scripts/check-balance.ts --network celo

# Deploy to Celo Mainnet
npx hardhat run scripts/deploy.ts --network celo

# Save the contract address shown in terminal!
```

### After Deployment:

1. **Verify Contract**
   ```bash
   npx hardhat verify --network celo YOUR_CONTRACT_ADDRESS
   ```

2. **Update Frontend**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` to your new address
   - Update `NEXT_PUBLIC_NETWORK` to "celo"
   - Redeploy

---

## 📝 Simple Checklist

### Vercel Deployment:
- [ ] Sign in to Vercel with GitHub
- [ ] Import Stream-split repository
- [ ] Set root directory to `packages/react-app`
- [ ] Add environment variables
- [ ] Click Deploy
- [ ] Test your live site

### Contract Deployment (Optional - Costs Money):
- [ ] Buy CELO tokens (~1 CELO)
- [ ] Send to your deployer wallet
- [ ] Run deploy script
- [ ] Save contract address
- [ ] Verify on Celoscan
- [ ] Update Vercel environment variables

---

## 🆘 Need Help?

**Vercel Issues:**
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify root directory is `packages/react-app`

**Contract Issues:**
- Make sure you have CELO for gas
- Check you're on the right network
- Verify private key in `.env`

**More Details:**
- See `DEPLOYMENT_GUIDE.md` for complete guide
- Check `README.md` for project overview

---

## ✨ That's It!

Your dApp will be live at: `https://your-project.vercel.app`

For mainnet contract deployment, only proceed when you have:
1. ✅ Real CELO tokens
2. ✅ Tested everything on Alfajores
3. ✅ Ready for production users
