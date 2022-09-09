// SPDX-License-Identifier: MIT

pragma solidity ^0.4.8;

contract User {
    enum UserRole { none, reader, reviewer, author, editor }
    
    // Maps user Ethereum addresses to accounts roles
    mapping (address => UserRole) userRole;

    function updateUserRole(UserRole newType) public {
        userRole[msg.sender] = newType;
    }

    function retrieveUserRole(address userAddress) public view returns (UserRole) {
        return userRole[userAddress];
    }

    function setTypeEditor() public {
        userRole[msg.sender] = UserRole.editor;
    }

    function setTypeEditor(address userAddress) public {
        userRole[userAddress] = UserRole.editor;
    }

    function setTypeReviewer() public {
        userRole[msg.sender] = UserRole.reviewer;
    }

    function setTypeReviewer(address userAddress) public {
        userRole[userAddress] = UserRole.reviewer;
    }

    function setTypeAuthor() public {
        userRole[msg.sender] = UserRole.author;
    }

    function setTypeAuthor(address userAddress) public {
        userRole[userAddress] = UserRole.author;
    }
}