import Web3 from "web3";

import { ERC721NFT_json } from "@/constants/constant.js";

export default function buildERC721NFTContract(contract_address) {
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(ERC721NFT_json.abi, contract_address);
  return contract;
}
