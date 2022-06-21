// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

contract NFTMarketplace {
    string public name;
    uint256 public age;

    NFT public nft;

    constructor() {}

    function createToken(string memory _name, string memory _symbol)
        public
        returns (address _contractAddr)
    {
        nft = new NFT(_name, _symbol);
        _contractAddr = address(nft);
        return _contractAddr;
    }
}
