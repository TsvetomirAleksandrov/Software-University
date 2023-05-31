import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CrowdfundingPlatform", () => {
  const campaignName = "Campaign 1";
  const campaignSymbol = "TCO";
  const campaignDescription = "Campaign 1 Description";
  const campaignFundingGoal = ethers.utils.parseEther("10");
  const campaignDuration = 1000;
  const campaignInitialSupply = 1000000000;

  let deployer, account1, account2;

  before(async () => {
    [deployer, account1, account2] = await ethers.getSigners();
  });

  const deployAndCreateFixture = async () => {
    const CrowdfundingPlatform = await ethers.getContractFactory(
      "CrowdfundingPlatform"
    );
    const crowdfundingPlatform = await CrowdfundingPlatform.deploy();
    const crowdfundingPlatformOwner = crowdfundingPlatform.connect(deployer);

    const crowdfundingPlatformContracts = CrowdfundingPlatform.attach(
      crowdfundingPlatform.address
    );

    const campaignTx = await crowdfundingPlatformOwner.createCampgain(
      campaignName,
      campaignSymbol,
      campaignDescription,
      campaignFundingGoal,
      campaignDuration,
      campaignInitialSupply
    );
    await campaignTx.wait();

    const campaignAddress = (
      await crowdfundingPlatformContracts.getCampaigns()
    )[0];
    if (campaignAddress === undefined) {
      throw Error("No campaign address");
    }
    const Campaign = await ethers.getContractFactory("Campaign");
    const campaign = Campaign.attach(campaignAddress);

    return { campaign };
  };

  const deployAndCreateWithLittleDurationAndFullContributionFixture =
    async () => {
      const CrowdfundingPlatform = await ethers.getContractFactory(
        "CrowdfundingPlatform"
      );
      const crowdfundingPlatform = await CrowdfundingPlatform.deploy();
      const crowdfundingPlatformOwner = crowdfundingPlatform.connect(deployer);

      const crowdfundingPlatformContracts = CrowdfundingPlatform.attach(
        crowdfundingPlatform.address
      );

      const campaignTx = await crowdfundingPlatformOwner.createCampgain(
        campaignName,
        campaignSymbol,
        campaignDescription,
        campaignFundingGoal,
        2,
        campaignInitialSupply
      );
      await campaignTx.wait();

      const campaignAddress = (
        await crowdfundingPlatformContracts.getCampaigns()
      )[0];
      if (campaignAddress === undefined) {
        throw Error("No campaign address");
      }
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = Campaign.attach(campaignAddress);

      await campaign.contribute({ value: campaignFundingGoal });

      return { campaign };
    };

  const deployAndCreateWithLittleMoreDurationAndFullContributionFixture =
    async () => {
      const CrowdfundingPlatform = await ethers.getContractFactory(
        "CrowdfundingPlatform"
      );
      const crowdfundingPlatform = await CrowdfundingPlatform.deploy();
      const crowdfundingPlatformOwner = crowdfundingPlatform.connect(deployer);

      const crowdfundingPlatformContracts = CrowdfundingPlatform.attach(
        crowdfundingPlatform.address
      );

      const campaignTx = await crowdfundingPlatformOwner.createCampgain(
        campaignName,
        campaignSymbol,
        campaignDescription,
        campaignFundingGoal,
        3,
        campaignInitialSupply
      );
      await campaignTx.wait();

      const campaignAddress = (
        await crowdfundingPlatformContracts.getCampaigns()
      )[0];
      if (campaignAddress === undefined) {
        throw Error("No campaign address");
      }
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = Campaign.attach(campaignAddress);

      await campaign.contribute({ value: campaignFundingGoal });

      return { campaign };
    };

  const deployAndCreateWithLittleMoreDurationAndLessContributionFixture =
    async () => {
      const CrowdfundingPlatform = await ethers.getContractFactory(
        "CrowdfundingPlatform"
      );
      const crowdfundingPlatform = await CrowdfundingPlatform.deploy();
      const crowdfundingPlatformOwner = crowdfundingPlatform.connect(deployer);

      const crowdfundingPlatformContracts = CrowdfundingPlatform.attach(
        crowdfundingPlatform.address
      );

      const campaignTx = await crowdfundingPlatformOwner.createCampgain(
        campaignName,
        campaignSymbol,
        campaignDescription,
        campaignFundingGoal,
        2,
        campaignInitialSupply
      );
      await campaignTx.wait();

      const campaignAddress = (
        await crowdfundingPlatformContracts.getCampaigns()
      )[0];
      if (campaignAddress === undefined) {
        throw Error("No campaign address");
      }
      const Campaign = await ethers.getContractFactory("Campaign");
      const campaign = Campaign.attach(campaignAddress);

      return { campaign };
    };

  describe("Reward Distribution", () => {
    it("Reverts if sender is not owner", async () => {
      const { campaign } = await loadFixture(deployAndCreateFixture);

      const account2Campaign = campaign.connect(account2);

      await expect(account2Campaign.rewardDistribution(1)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("Reverts if amount is < 0", async () => {
      const { campaign } = await loadFixture(deployAndCreateFixture);

      await expect(campaign.rewardDistribution(0)).to.be.revertedWith(
        "Amount > 0"
      );
    });

    it("Reverts if amount is > total supply", async () => {
      const { campaign } = await loadFixture(deployAndCreateFixture);

      await expect(
        campaign.rewardDistribution(campaignInitialSupply + 1)
      ).to.be.revertedWith("Amount <= total supply");
    });

    it("Reverts if no contributors", async () => {
      const { campaign } = await loadFixture(deployAndCreateFixture);

      await expect(campaign.rewardDistribution(1)).to.be.revertedWith(
        "No contributors"
      );
    });

    it("Reverts if campaign not ended", async () => {
      const { campaign } = await loadFixture(deployAndCreateFixture);

      await campaign.contribute({ value: 100 });

      await expect(campaign.rewardDistribution(1)).to.be.revertedWith(
        "Campaign not ended"
      );
    });

    it("Expects to set reward", async () => {
      const { campaign } = await loadFixture(
        deployAndCreateWithLittleDurationAndFullContributionFixture
      );

      const amount = 10000;
      await campaign.rewardDistribution(amount);

      expect(await campaign.reward()).to.equal(amount);
    });

    it("Reverts if reward was distributed", async () => {
      const { campaign } = await loadFixture(
        deployAndCreateWithLittleDurationAndFullContributionFixture
      );

      await campaign.rewardDistribution(1);
      await expect(campaign.rewardDistribution(1)).to.be.revertedWith(
        "Reward distributed"
      );
    });
  });

  describe("Refund", () => {
    it("Reverts if sender is not contributor", async () => {
      const { campaign } = await loadFixture(deployAndCreateFixture);

      await expect(campaign.refund()).to.be.revertedWith(
        "User not contributed"
      );
    });

    it("Reverts if campaign is active", async () => {
      const { campaign } = await loadFixture(deployAndCreateFixture);

      await campaign.contribute({ value: 1 });

      await expect(campaign.refund()).to.be.revertedWith("Campaign not ended");
    });

    it("Reverts if balance is 0", async () => {
      const { campaign } = await loadFixture(
        deployAndCreateWithLittleMoreDurationAndFullContributionFixture
      );

      await campaign.releaseFunds();

      await expect(campaign.refund()).to.be.revertedWith("Balance > 0");
    });

    it("Reverts if funding goal is reached", async () => {
      const { campaign } = await loadFixture(
        deployAndCreateWithLittleDurationAndFullContributionFixture
      );

      await expect(campaign.refund()).to.be.revertedWith(
        "Funding goal reached"
      );
    });

    it("Refund contribution", async () => {
      const { campaign } = await loadFixture(
        deployAndCreateWithLittleMoreDurationAndLessContributionFixture
      );

      const balance = ethers.utils.formatEther(await campaign.balance());
      await campaign.contribute({ value: 10 });
      await campaign.refund();
      const newBalance = ethers.utils.formatEther(await campaign.balance());

      expect(balance).to.equal(newBalance);
      expect(await campaign.contributors(deployer.address)).to.equal(0);
    });

    it("Refund contribution emits Event", async () => {
      const { campaign } = await loadFixture(
        deployAndCreateWithLittleMoreDurationAndLessContributionFixture
      );

      const contribution = 10;
      await campaign.contribute({ value: contribution });

      await expect(await campaign.refund())
        .to.emit(campaign, "ContributorRefunded")
        .withArgs(deployer.address, contribution);
    });
  });
});