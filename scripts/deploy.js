import hre from "hardhat";

async function main() {
  console.log("Deploying contracts...");

  // Deploy UserProfile contract
  const UserProfile = await hre.ethers.getContractFactory("UserProfile");
  const userProfile = await UserProfile.deploy();
  await userProfile.waitForDeployment();
  const userProfileAddress = await userProfile.getAddress();
  console.log(`UserProfile deployed to: ${userProfileAddress}`);

  // Deploy Content contract
  const Content = await hre.ethers.getContractFactory("Content");
  const content = await Content.deploy();
  await content.waitForDeployment();
  const contentAddress = await content.getAddress();
  console.log(`Content deployed to: ${contentAddress}`);

  // Deploy SocialGraph contract
  const SocialGraph = await hre.ethers.getContractFactory("SocialGraph");
  const socialGraph = await SocialGraph.deploy();
  await socialGraph.waitForDeployment();
  const socialGraphAddress = await socialGraph.getAddress();
  console.log(`SocialGraph deployed to: ${socialGraphAddress}`);

  console.log("\nDeployment complete!");
  console.log("\nUpdate the CONTRACT_ADDRESSES in frontend/src/utils/contracts.js with:");
  console.log(`UserProfile: '${userProfileAddress}'`);
  console.log(`Content: '${contentAddress}'`);
  console.log(`SocialGraph: '${socialGraphAddress}'`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
