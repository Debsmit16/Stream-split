import { ethers } from "ethers";

async function main() {
  console.log("🔑 Generating new Celo wallet...\n");
  
  // Create random wallet
  const wallet = ethers.Wallet.createRandom();
  
  console.log("✅ Wallet created successfully!\n");
  console.log("📋 Wallet Details:");
  console.log("=====================================");
  console.log("Address:", wallet.address);
  console.log("Private Key:", wallet.privateKey);
  console.log("Mnemonic:", wallet.mnemonic?.phrase);
  console.log("=====================================\n");
  
  console.log("⚠️  IMPORTANT SECURITY NOTES:");
  console.log("1. Save your private key and mnemonic in a SECURE place");
  console.log("2. NEVER share your private key with anyone");
  console.log("3. This is for TESTNET only - use a different wallet for mainnet");
  console.log("4. Add the private key (without 0x) to your .env file\n");
  
  console.log("📝 Next Steps:");
  console.log("1. Copy the private key (without '0x' prefix)");
  console.log("2. Open packages/hardhat/.env");
  console.log("3. Add: PRIVATE_KEY=your_private_key_here");
  console.log("4. Get testnet funds: https://faucet.celo.org/alfajores");
  console.log("5. Use your address:", wallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
