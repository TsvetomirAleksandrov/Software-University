import { ethers } from "hardhat";

async function main() {
  const CharityPlatform = await ethers.getContractFactory(
    "CharityPlatform"
  );
  const charityPlatform = await CharityPlatform.deploy();

  await charityPlatform.deployed();

  console.log(
    `Charity Funding Platform deployed to ${charityPlatform.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});