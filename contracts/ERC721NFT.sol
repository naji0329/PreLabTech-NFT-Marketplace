// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721NFT is ERC721URIStorage, Ownable {
    using Strings for uint256;

    uint256 public supply = 0;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    // public
    function mint(address _to, string memory _tokenURI) public payable {
        // Mint NFT
        _mint(_to, supply);

        // Set Token URI
        _setTokenURI(supply, _tokenURI);
        supply ++;
    }
}
