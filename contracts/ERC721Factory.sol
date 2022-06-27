// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "./ERC721NFT.sol";

contract ERC721Factory {
    ERC721NFT public erc721nft;

    constructor() {}

    function createToken(
        string memory _name,
        string memory _symbol
    ) public returns (address _contractAddr) {
        erc721nft = new ERC721NFT(_name, _symbol);
        _contractAddr = address(erc721nft);
        return _contractAddr;
    }

}
