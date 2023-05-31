import { task } from "hardhat/config";

task("deploy", "print deployer (owner) and contract addresses").setAction(
  async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const CrowdfundingPlatform = await hre.ethers.getContractFactory(
      "CrowdfundingPlatform",
      deployer
    );
    const crowdfundingPlatform = await CrowdfundingPlatform.deploy();
    await crowdfundingPlatform.deployed();

    console.log(
      `Crowd Funding Platform with owner ${deployer.address} deployed to ${crowdfundingPlatform.address}`
    );
  }
);

task(
  "create-campaign",
  "print deployer (owner) and contract addresses"
).setAction(async (taskArgs, hre) => {
  const [deployer] = await hre.ethers.getSigners();

  const CrowdfundingPlatform = await hre.ethers.getContractFactory(
    "CrowdfundingPlatform",
    deployer
  );
  const crowdfundingPlatform = await CrowdfundingPlatform.deploy();
  await crowdfundingPlatform.deployed();

  await crowdfundingPlatform.createCampgain(
    "Test1",
    "TST",
    "test desc",
    100,
    200,
    1000000
  );

  const deployedCampaigns = await crowdfundingPlatform.getCampaigns();
  const Campaign = await hre.ethers.getContractFactory("Campaign");
  const campaign = Campaign.attach(deployedCampaigns[0]);

  console.log(
    `Campaign with owner ${deployer.address} deployed to ${campaign.address}`
  );
});

task("contribute", "contributor, contract addresses and contribution amount")
  .addParam("campaign", "contract address")
  .addParam("amount", "amount to contribute")
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const Campaign = await hre.ethers.getContractFactory("Campaign", deployer);
    const campaign = Campaign.attach(taskArgs.campaign);

    await campaign.contribute({ value: taskArgs.amount });

    console.log(
      `User ${deployer.address} contributed ${taskArgs.amount} to Campaign ${campaign.address}`
    );
  });