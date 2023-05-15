const hre = require("hardhat");

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 2;

    const lockedAmount = hre.ethers.utils.parseEther("0.001");

    const Lock = await hre.ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    await lock.deployed();

    await waitASecond();

    const tx = await lock.withdraw();

    console.log(tx);
}

async function waitASecond() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000)
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
