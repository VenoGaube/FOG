// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


contract JournalDID {
    address owner; // address - identifier of the user
    int hash; // user private key hash for verification
    enum Journal_usertype{ READER, REVIEWER, EDITOR, AUTHOR }
    Journal_usertype current_usertype; // user type
    address authority_address; // string, only journal authority can elevate user
    string user_data_json; //json string for dynamically storing user data

    modifier onlyOwner(){
        if (msg.sender == owner) _;
    }
    modifier onlyAuthority(){
        // default (unset) address type is 0x0
        if (authority_address == address(0) || msg.sender == authority_address ) _;
    }

    constructor() {
        owner = msg.sender;
        current_usertype = Journal_usertype.READER;
        user_data_json = "{}";
    }

    function changeOwner(address _ownerAddress, int _hash) public onlyOwner {
        owner = _ownerAddress;
        hash = _hash;
    }
    
    function getOwner() external view returns (address) {
        return owner;
    }

    function setHash(int _hash) public onlyOwner {
        hash = _hash;
    }

    function getHash() external view returns (int) {
        return hash;
    }
    
    function setAuthority(address _authority) public onlyAuthority {
        authority_address = _authority;
    }

    function getAuthority() external view returns (address) {
        return authority_address;
    }

    function getType() external view returns (Journal_usertype) {
        return current_usertype;
    }

    function setReviewerType() public onlyAuthority {
        current_usertype = Journal_usertype.REVIEWER;
    }

    function setAuthorType() public onlyAuthority {
        current_usertype = Journal_usertype.AUTHOR;
    }

    function setEditorType() public onlyAuthority {
        current_usertype = Journal_usertype.EDITOR;
    }

    function setUserData(string memory _newJson) public onlyAuthority {
        user_data_json = _newJson;
    }

    function getUserData() external view returns (string memory) {
        return user_data_json;
    }
}
