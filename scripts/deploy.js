const { ethers, network } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log(network.name);
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  await deploy_erc721_factory();
  await deploy_erc1155_factory();
  // await deploy_erc721_contract();
  // await deploy_erc1155_contract();
}

async function deploy_erc721_factory() {
  const contractName = "ERC721Factory";
  const Token = await ethers.getContractFactory(contractName);
  const token = await Token.deploy();
  console.log("NFTMarketplace Contract address:", token.address);

  const directory_name = "frontend/src/contracts/ERC721Factory";
  const frontendContractsDir = __dirname + "/../" + directory_name;
  saveFrontendFiles(token, frontendContractsDir, contractName);
}

async function deploy_erc1155_factory() {
  const contractName = "ERC1155Factory";
  const Token = await ethers.getContractFactory(contractName);
  const token = await Token.deploy();
  console.log("NFTMarketplace Contract address:", token.address);

  const directory_name = "frontend/src/contracts/ERC1155Factory";
  const frontendContractsDir = __dirname + "/../" + directory_name;
  saveFrontendFiles(token, frontendContractsDir, contractName);
}

async function deploy_erc721_contract() {
  const contractName = "ERC721NFT";
  const Token = await ethers.getContractFactory(contractName);
  const token = await Token.deploy("hala", "hala");
  console.log("NFTMarketplace Contract address:", token.address);

  const directory_name = "frontend/src/contracts/ERC721NFT";
  const frontendContractsDir = __dirname + "/../" + directory_name;
  saveFrontendFiles(token, frontendContractsDir, contractName);
}

async function deploy_erc1155_contract() {
  const contractName = "ERC1155NFT";
  const Token = await ethers.getContractFactory(contractName);
  const token = await Token.deploy("hala", "hala");
  console.log("NFTMarketplace Contract address:", token.address);

  const directory_name = "frontend/src/contracts/ERC1155NFT";
  const frontendContractsDir = __dirname + "/../" + directory_name;
  saveFrontendFiles(token, frontendContractsDir, contractName);
}

function saveFrontendFiles(token, frontendContractsDir, contractName) {
  if (!fs.existsSync(frontendContractsDir)) {
    fs.mkdirSync(frontendContractsDir);
  }

  fs.writeFileSync(
    frontendContractsDir + "/contract-address.json",
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync(contractName);

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
