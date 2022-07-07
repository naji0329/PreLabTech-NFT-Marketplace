import Web3 from "web3";

import {
  ERC721NFT_json,
  ERC721Factory_address,
  ERC721Factory_json,
} from "@/constants/constant.js";

let web3 = new Web3(window.ethereum);

export function buildERC721NFTContract(contract_address) {
  let contract = new web3.eth.Contract(ERC721NFT_json.abi, contract_address);
  return contract;
}

export const ERC721Factory = new web3.eth.Contract(
  ERC721Factory_json.abi,
  ERC721Factory_address.Token
);
