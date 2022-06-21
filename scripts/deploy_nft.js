const { ethers, network } = require("hardhat");

async function main() {

  console.log(network.name);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("NFT");
  const token = await Token.deploy("hala", "hala");

  console.log("Contract address:", token.address);

  saveFrontendFiles(token);
}
  
function saveFrontendFiles(token) {
  const fs = require("fs");
  const directory_name = "frontend/src/contracts/nft";

  const frontendContractsDir = __dirname + "/../" + directory_name;

  if (!fs.existsSync(frontendContractsDir)) {
    fs.mkdirSync(frontendContractsDir);
  }

  fs.writeFileSync(
    frontendContractsDir + "/contract-address.json",
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("NFT");

  fs.writeFileSync(
    frontendContractsDir + "/NFT.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});