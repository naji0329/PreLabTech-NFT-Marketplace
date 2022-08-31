import * as anchor from "@project-serum/anchor";

import ERC721Factory_address from "@/contracts/ERC721Factory/contract-address.json";
import ERC721Factory_json from "@/contracts/ERC721Factory/NFT.json";

import ERC1155Factory_address from "@/contracts/ERC1155Factory/contract-address.json";
import ERC1155Factory_json from "@/contracts/ERC1155Factory/NFT.json";

import ERC721NFT_json from "@/contracts/ERC721NFT/NFT.json";

import ERC1155NFT_json from "@/contracts/ERC1155NFT/NFT.json";

export const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")

import SolanaNFT_json from "@/contracts/SolanaNFT/SolanaNFT.json";
const programId = new anchor.web3.PublicKey('C47gbJh2S4ESsLYDgxod6k83uawxEhYsNbLfNi1vuqvV');

// For testing
// import SolanaNFT_json from "@/contracts/SolanaNFT/TestSolanaNFT.json";
// const programId = new anchor.web3.PublicKey('H4wGZSiwhHKoHYytShskZ9qMuyJ1ojCKBsNX4L72sAMP');

export {
  ERC721Factory_address,
  ERC721Factory_json,
  ERC1155Factory_address,
  ERC1155Factory_json,
  ERC721NFT_json,
  ERC1155NFT_json,
};

export {
  SolanaNFT_json,
  programId
}