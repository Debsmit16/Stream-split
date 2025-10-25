import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying StreamSplit contract...");
  
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "CELO");
  
  // Deploy contract
  const StreamSplit = await ethers.getContractFactory("StreamSplit");
  const streamSplit = await StreamSplit.deploy();
  
  await streamSplit.waitForDeployment();
  
  const address = await streamSplit.getAddress();
  
  console.log("✅ StreamSplit deployed to:", address);
  console.log("\n📋 Save this address for your frontend!");
  console.log("\n🔍 Verify on Celoscan:");
  console.log(`https://alfajores.celoscan.io/address/${address}`);
  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error deploying contract:", error);
    process.exit(1);
  });
