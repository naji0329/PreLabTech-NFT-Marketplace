// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "./ERC1155NFT.sol";

contract ERC1155Factory {
    ERC1155NFT public erc1155nft;

    constructor() {}

    //Declare an Event
    event NewTokenCreate(address indexed _from, address indexed _mewTokenAddr);


    function createToken(
        string memory _name,
        string memory _symbol
    ) public returns (address _contractAddr) {
        erc1155nft = new ERC1155NFT(_name, _symbol);
        _contractAddr = erc1155nft.getData();

        //Emit an event
        emit NewTokenCreate(msg.sender, _contractAddr);

        return _contractAddr;
    }
}
