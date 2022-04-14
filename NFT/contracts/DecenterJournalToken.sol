// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";

contract DecenterJournalToken is Ownable, ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Metadata {
        uint256 articleId;
        string title;
        string author;
        string ipfs;
        uint256 articleData;
    }

    mapping(uint256 => Metadata) decenterJournalTokenId;
    string private _currentBaseURI;

    constructor() ERC721("Published article Token", "DCJ") {
        setBaseURI("http://localhost/token/");
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _currentBaseURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _currentBaseURI;
    }

    function mintAuthor(address authorAddress, string memory title, string memory author, string memory ipfs, uint256 articleData) external payable returns (uint256 tokenId){
        require(msg.value == 0.01 ether, "claiming a token costs 0.01 ether");

        _tokenIdCounter.increment();
        uint256 currentTokenId = _tokenIdCounter.current();
        decenterJournalTokenId[currentTokenId] = Metadata(currentTokenId, title, author, ipfs, articleData);
        _safeMint(authorAddress, currentTokenId);
        return currentTokenId;
    }

    function get(uint256 tokenId) external view returns(string memory title, uint256 articleData) {
        require(_exists(tokenId), "token not minted");
        Metadata memory token = decenterJournalTokenId[tokenId];
        title = token.title;
        articleData = token.articleData;
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