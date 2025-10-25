import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("📍 Wallet Address:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  const balanceInCelo = ethers.formatEther(balance);
  
  console.log("💰 Current Balance:", balanceInCelo, "CELO");
  
  // Estimate deployment cost
  const estimatedDeploymentCost = 0.05; // Conservative estimate
  const remainingAfterDeployment = parseFloat(balanceInCelo) - estimatedDeploymentCost;
  
  console.log("\n📊 Estimated Costs:");
  console.log("   Contract Deployment: ~0.01-0.05 CELO");
  console.log("   Remaining after deployment: ~", remainingAfterDeployment.toFixed(4), "CELO");
  
  if (parseFloat(balanceInCelo) < 0.1) {
    console.log("\n⚠️  Warning: Balance is low. You have enough to deploy but limited testing.");
  } else {
    console.log("\n✅ You have sufficient funds for deployment and testing!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
