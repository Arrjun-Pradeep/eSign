const hre = require("hardhat");

async function main() {

  const eSign = await hre.ethers.getContractFactory("eSign");
  const esign = await eSign.deploy();

  await esign.deployed();

  console.log(":: eSign ::", esign.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
