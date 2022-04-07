// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract DecenterJournalToken is Ownable, ERC721 {
    
    struct Metadata {
        string title;
        uint8 discount;
    }

    mapping(uint256 => Metadata) decenterJournalTokenId;
    string private _currentBaseURI;

    constructor() ERC721("Journal", "DCJ") {
        setBaseURI("http://localhost/token/");

        mint("Testni journal", 15);
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _currentBaseURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _currentBaseURI;
    }

    function mint(string memory title, uint8 discount) internal {
        uint256 tokenId = id(discount);
        decenterJournalTokenId[tokenId] = Metadata(title, discount);
        _safeMint(msg.sender, tokenId);
    }

    function claim(string calldata title, uint8 discount) external payable {
        require(msg.value == 0.01 ether, "claiming a token costs 0.01 ether");

        // discount = pseudoRNG(title) % 100000;

        mint(title, discount);
        payable(owner()).transfer(0.01 ether);
    }

    function ownerOf(uint8 discount) public view returns(address){
        return ownerOf(id(discount));
    }

    function id(uint8 discount) pure internal returns(uint256) {
        return (uint256(discount)-1) * 372;
    }

    function get(uint256 tokenId) external view returns(string memory title, uint8 discount) {
        require(_exists(tokenId), "token not minted");
        Metadata memory token = decenterJournalTokenId[tokenId];
        title = token.title;
        discount = token.discount;
    }

    function titleOf(uint256 tokenId) external view returns(string memory) {
        require(_exists(tokenId), "token not minted");
        Metadata memory token = decenterJournalTokenId[tokenId];
        return token.title;
    }

    function changeTitleOf(uint256 tokenId, string memory title) public {
        require(_exists(tokenId), "token not minted");
        require(ownerOf(tokenId) == msg.sender, "only the owner of this token can change its title");
        decenterJournalTokenId[tokenId].title = title;
    }


}