pragma solidity >=0.6.0 <0.9.0;

contract User {
    enum Role { none, author, reader, reviewer, editor }

    mapping (address => Role) role;


    function getUserRole(address userAddress) constant returns (Role) {
        return role[userAddress];
    }

}