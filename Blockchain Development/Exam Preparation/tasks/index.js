task("deploy", "print account")
  .addParam("account", "account address")
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const NFTMarketPlaceFactory = await hre.ethers.getContractFactory(
      "NFTMarketPlace",
      deployer
    );
    const nftMarketPlace = await NFTMarketPlaceFactory.deploy();
    await nftMarketPlace.deployed();

    console.log(
      `NFT Market place with owner ${deployer.address} deployed to ${nftMarketPlace.address}`
    );
    console.log(taskArgs.account);
  });

task("create-nft", "print account")
  .addParam("marketplace", "contracts address")
  .setAction(async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();

    const NFTMarketPlaceFactory = await hre.ethers.getContractFactory(
      "NFTMarketPlace",
      deployer
    );

    // const nftMarketPlace = await NFTMarketPlaceFactory.attach(taskArgs.marketplace);
    const nftMarketPlace = new hre.ethers.Contract(
      taskArgs.marketplace,
      NFTMarketPlaceFactory.interface,
      deployer
    );

    const tx = await nftMarketPlace.createNFT("test url");
    const receipt = await tx.wait();
    if (receipt.status === 0) {
      throw new Error("Transaction failed");
    }

    console.log("NFT created");
  });

task("claim-profit", "print account")
  .addParam("marketplace", "contracts address")
  .setAction(async (taskArgs, hre) => {
    const [deployer, firstUser] = await hre.ethers.getSigners();

    const NFTMarketPlaceFactory = await hre.ethers.getContractFactory(
      "NFTMarketPlace",
      deployer
    );

    // const nftMarketPlace = await NFTMarketPlaceFactory.attach(taskArgs.marketplace);
    const nftMarketPlace = new hre.ethers.Contract(
      taskArgs.marketplace,
      NFTMarketPlaceFactory.interface,
      deployer
    );

    const approveTx = await nftMarketPlace.approve(taskArgs.marketplace, 0);
    const approveReceipt = approveTx.wait();
    if (approveReceipt.status === 0) {
      throw new Error("Approve transaction failed");
    }

    console.log("Approved");

    const listNFTForSaleTx = await nftMarketPlace.listNFTForSale(
      taskArgs.marketplace,
      0,
      10000
    );
    const listNFTForSaleReceipt = await listNFTForSaleTx.wait();
    if (listNFTForSaleReceipt.status === 0) {
      throw new Error("List NFT for sale transaction failed");
    }

    console.log("NFT listed");

    const marketPlaceFirstUser = await nftMarketPlace.connect(firstUser);
    const purchaseNFTTx = await marketPlaceFirstUser.purchaseNFT(
      taskArgs.marketplace,
      0,
      firstUser.address,
      { value: 10000 }
    );
    const purchaseNFTReceipt = await purchaseNFTTx.wait();
    if (purchaseNFTReceipt.status === 0) {
      throw new Error("Purchase NFT transaction failed");
    }

    console.log("NFT purchased");

    const claimProfitTx = await nftMarketPlace.claimProfit();
    const claimProfitReceipt = await claimProfitTx.wait();
    if (claimProfitReceipt.status === 0) {
      throw new Error("Claim profit transaction failed");
    }

    console.log("Profit claimed");
  });