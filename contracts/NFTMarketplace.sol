// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "./ERC721NFT.sol";
import "./ERC1155NFT.sol";

contract NFTMarketplace {
    ERC721NFT public erc721nft;

    ERC1155NFT public erc1155nft;

    constructor() {}

    function create_ERC721_collection(
        string memory _name,
        string memory _symbol
    ) public returns (address _contractAddr) {
        erc721nft = new ERC721NFT(_name, _symbol);
        _contractAddr = address(erc721nft);
        return _contractAddr;
    }

    function create_ERC1155_collection()
        public
        returns (address _contractAddr)
    {
        erc1155nft = new ERC1155NFT();
        _contractAddr = address(erc1155nft);
        return _contractAddr;
    }
}
