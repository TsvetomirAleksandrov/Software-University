task("deploy", "Print account")
    .addParam("account", "Account address")
    .setAction(async (taskArgs, hre) => {
        const [deployer] = await hre.ethers.getSigners();

        const CharityPlatformFactory = await hre.ethers.getContractFactory(
            "CharityPlatform",
            deployer
        );
        const charityPlatform = await CharityPlatformFactory.deploy();
        await charityPlatform.deployed();

        console.log(
            `Charity Platform with owner ${deployer.address} deployed to ${charityPlatform.address}`
        );
        console.log(taskArgs.account);
    });