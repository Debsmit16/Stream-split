# 🚀 Deployment Guide

Complete guide for deploying StreamSplit to production.

## 📋 Table of Contents

- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Smart Contract Deployment (Celo Mainnet)](#smart-contract-deployment-celo-mainnet)
- [Post-Deployment Configuration](#post-deployment-configuration)

---

## 🌐 Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose `Debsmit16/Stream-split`

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: packages/react-app
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=245ad129f4e05f4025acb312a2df7e5c
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x28f8aE58a76aEe9024e4a823af429831c6173029
   NEXT_PUBLIC_NETWORK=alfajores
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
cd c:\Users\User\Desktop\celo\stream-split
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? stream-split
# - Directory? packages/react-app
# - Override settings? No

# Deploy to production
vercel --prod
```

### Vercel Configuration Files

The repository includes:
- `vercel.json` - Vercel configuration (monorepo setup)
- `.env.example` - Template for environment variables

---

## 📜 Smart Contract Deployment (Celo Mainnet)

### Prerequisites

1. **Get Mainnet CELO**
   - You need CELO tokens for gas fees
   - Buy from exchanges: Coinbase, Binance, etc.
   - Or use a faucet if available

2. **Fund Your Deployer Wallet**
   - Check `.env` in `packages/hardhat/`
   - Transfer ~1 CELO to your deployer address

### Deployment Steps

#### Step 1: Update Hardhat Configuration

```bash
cd packages/hardhat
```

Check `hardhat.config.ts` has Celo Mainnet:

```typescript
networks: {
  celo: {
    url: "https://forno.celo.org",
    accounts: [process.env.PRIVATE_KEY!],
    chainId: 42220,
  }
}
```

#### Step 2: Deploy Contract

```bash
# Make sure you're in packages/hardhat directory
cd c:\Users\User\Desktop\celo\stream-split\packages\hardhat

# Deploy to Celo Mainnet
npx hardhat run scripts/deploy.ts --network celo
```

**Expected Output:**
```
StreamSplit deployed to: 0x1234567890abcdef1234567890abcdef12345678
```

**⚠️ IMPORTANT:** Save this contract address!

#### Step 3: Verify Contract on Celoscan

```bash
# Replace with your actual contract address
npx hardhat verify --network celo 0x1234567890abcdef1234567890abcdef12345678
```

---

## ⚙️ Post-Deployment Configuration

### Update Frontend with Mainnet Contract

1. **Update Environment Variables in Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update these values:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=0xYOUR_NEW_MAINNET_ADDRESS
   NEXT_PUBLIC_NETWORK=celo
   ```

2. **Update Contract Address in Code**

   Edit `packages/react-app/config/contracts.ts`:
   ```typescript
   export const STREAM_SPLIT_ADDRESS = 
     process.env.NEXT_PUBLIC_NETWORK === 'celo' 
       ? '0xYOUR_MAINNET_ADDRESS'  // Celo Mainnet
       : '0x28f8aE58a76aEe9024e4a823af429831c6173029'; // Alfajores
   ```

3. **Redeploy Frontend**
   ```bash
   # Push changes to GitHub
   git add .
   git commit -m "chore: Update contract address to Celo Mainnet"
   git push origin main
   
   # Vercel will auto-deploy
   ```

### Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## 🧪 Testing Production Deployment

### Test Checklist

- [ ] Frontend loads correctly
- [ ] Wallet connection works (RainbowKit)
- [ ] Can switch to Celo Mainnet in wallet
- [ ] Employer dashboard accessible
- [ ] Worker dashboard accessible
- [ ] Can create payment stream
- [ ] Real-time earnings update
- [ ] Withdraw functionality works
- [ ] Transaction history displays
- [ ] PWA install prompt appears
- [ ] Mobile responsive design works
- [ ] Service worker caches assets

### Mainnet Testing

**⚠️ Use Small Amounts First!**

1. **Create Test Stream**
   - Use very small hourly rate (0.001 CELO)
   - Short duration (1-2 hours)
   - Test address you control

2. **Verify Blockchain**
   - Check transaction on https://celoscan.io
   - Verify contract interactions
   - Monitor gas costs

3. **Test Worker Features**
   - Login as worker
   - Verify real-time earnings
   - Test withdrawal

---

## 🔐 Security Considerations

### Before Mainnet Deployment

1. **Audit Smart Contract**
   - Get professional audit for production
   - Test thoroughly on testnet first
   - Consider bug bounty program

2. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel's encrypted environment variables
   - Rotate WalletConnect Project ID if exposed

3. **Rate Limiting**
   - Consider adding rate limiting for API calls
   - Monitor for unusual activity

4. **Backup**
   - Keep copy of contract source code
   - Document all deployment addresses
   - Save deployment transaction hashes

---

## 📊 Monitoring

### Vercel Analytics

1. Enable in Vercel Dashboard
2. Monitor:
   - Page views
   - User engagement
   - Performance metrics
   - Error rates

### Contract Monitoring

1. **Celoscan**
   - Bookmark your contract: `https://celoscan.io/address/0xYOUR_ADDRESS`
   - Monitor transactions
   - Watch for errors

2. **Alerts**
   - Set up email alerts for large transactions
   - Monitor contract balance
   - Track active streams

---

## 🆘 Troubleshooting

### Common Issues

**Build Fails on Vercel**
```bash
# Solution: Check Node version
# Add to package.json:
"engines": {
  "node": ">=18.17.0"
}
```

**Wallet Connection Fails**
```
# Verify environment variables in Vercel
# Check WalletConnect Project ID is valid
```

**Contract Interaction Fails**
```
# Ensure correct network (Celo Mainnet)
# Verify contract address is correct
# Check user has CELO for gas
```

**PWA Not Working**
```
# Ensure HTTPS (automatic on Vercel)
# Check manifest.json is accessible
# Verify service worker registration
```

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Celo Documentation](https://docs.celo.org)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Celoscan](https://celoscan.io)

---

## 🎉 Success!

Your StreamSplit dApp is now live on:
- ✅ Frontend: Vercel
- ✅ Smart Contract: Celo Mainnet
- ✅ PWA: Installable on mobile/desktop

**Share your dApp:**
- Tweet about it
- Submit to Celo showcase
- Add to your portfolio

---

**Need Help?**
- Open an issue on GitHub
- Check CONTRIBUTING.md
- Review README.md

Happy streaming! 🚀💰
