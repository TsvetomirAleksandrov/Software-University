import { ethers } from "hardhat";

async function main() {
  const CrowdfundingPlatform = await ethers.getContractFactory(
    "CrowdfundingPlatform"
  );
  const crowdfundingPlatform = await CrowdfundingPlatform.deploy();

  await crowdfundingPlatform.deployed();

  console.log(
    `Crowd Funding Platform deployed to ${crowdfundingPlatform.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});