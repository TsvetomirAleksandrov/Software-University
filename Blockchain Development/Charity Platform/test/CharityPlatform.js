const { expect } = require("chai");

describe("CharityPlatform", function () {
  let charityPlatform;
  let creator;

  beforeEach(async function () {
    const CharityPlatform = await ethers.getContractFactory("CharityPlatform");
    charityPlatform = await CharityPlatform.deploy();
    await charityPlatform.deployed();

    [creator] = await ethers.getSigners();
  });

  it("should create a new campaign", async function () {
    const campaignName = "Test Campaign";
    const campaignDescription = "A test campaign";
    const fundingGoal = ethers.utils.parseEther("10");
    const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

    await charityPlatform.createCampaign(
      campaignName,
      campaignDescription,
      fundingGoal,
      deadline
    );

    const campaign = await charityPlatform.campaigns(1);

    expect(campaign.id).to.equal(1);
    expect(campaign.name).to.equal(campaignName);
    expect(campaign.description).to.equal(campaignDescription);
    expect(campaign.fundingGoal).to.equal(fundingGoal);
    expect(campaign.deadline).to.equal(deadline);
    expect(campaign.currentFunding).to.equal(0);
    expect(campaign.creator).to.equal(creator.address);
  });

  it("should donate funds to a campaign", async function () {
    await charityPlatform.createCampaign("Test Campaign", "A test campaign", ethers.utils.parseEther("10"), Math.floor(Date.now() / 1000) + 3600);

    const id = 1;
    const donationAmount = ethers.utils.parseEther("1");

    await charityPlatform.connect(creator).donateFunds(id, { value: donationAmount });

    const campaign = await charityPlatform.campaigns(id);
    expect(campaign.currentFunding).to.equal(donationAmount);
  });

  it("should collect funds from a campaign", async function () {
    await charityPlatform.createCampaign("Test Campaign", "A test campaign", ethers.utils.parseEther("10"), Math.floor(Date.now() / 1000) + 3600);

    const campaignId = 1;
    const donationAmount = ethers.utils.parseEther("10");

    await charityPlatform.connect(creator).donateFunds(campaignId, { value: donationAmount });

    const receiver = "0x1234567890123456789012345678901234567890";

    await charityPlatform.connect(creator).collectFunds(campaignId, receiver);

    const campaign = await charityPlatform.campaigns(campaignId);

    expect(campaign.currentFunding).to.equal(0);
  });

  it("should refund funds for an unsuccessful campaign", async function () {
    await charityPlatform.createCampaign("Test Campaign", "A test campaign", ethers.utils.parseEther("10"), Math.floor(Date.now() / 1000) + 3600);

    const campaignId = 1;
    const donationAmount = ethers.utils.parseEther("5");

    await charityPlatform.connect(creator).donateFunds(campaignId, { value: donationAmount });
    await charityPlatform.refundFunds(campaignId);

    const campaign = await charityPlatform.campaigns(campaignId);

    expect(campaign.currentFunding).to.equal(0);
  });
});
