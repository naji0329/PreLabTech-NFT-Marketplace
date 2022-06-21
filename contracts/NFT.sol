// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public baseURI = "";
    string public baseExtension = "";

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    // public
    function mint(address _to, string _tokenURI) public payable {
        uint256 supply = totalSupply();

        // Mint NFT
        _mint(_to, supply);

        // Set Token URI
        _setTokenURI(supply, _tokenURI);
    }
}
