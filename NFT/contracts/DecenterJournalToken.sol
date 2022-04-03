// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract DecenterJournalToken is ERC721 {
    constructor() ERC721("Journal", "DCJ") {
    }
}