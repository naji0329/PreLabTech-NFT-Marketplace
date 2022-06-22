// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721NFT.sol";

contract NFTMarketplace {
    string public name;
    uint256 public age;

    ERC721NFT public erc721nft;

    constructor() {}

    function createToken(string memory _name, string memory _symbol)
        public
        returns (address _contractAddr)
    {
        erc721nft = new ERC721NFT(_name, _symbol);
        _contractAddr = address(erc721nft);
        return _contractAddr;
    }
}
