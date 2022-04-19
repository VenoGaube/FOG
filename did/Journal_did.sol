// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


contract JournalDID {
    address owner;

    modifier onlyOwner(){
        if (msg.sender == owner) _;
    }

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address _ownerAddress) public onlyOwner {
        owner = _ownerAddress;
    }
    
    function getOwner() external view returns (address) {
        return owner;
    }
}