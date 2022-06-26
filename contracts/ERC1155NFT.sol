// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ERC1155NFT is ERC1155 {
    uint256 public currentID = 0;

    mapping(uint256 => string) tokenURI;

    constructor() ERC1155("") {}

    function mint(address _to, string memory _tokenURI) external {
        tokenURI[currentID] = _tokenURI;
        _mint(_to, currentID, 1, "");
        currentID++;
    }
}
