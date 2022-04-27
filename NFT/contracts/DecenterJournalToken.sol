// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";


contract DecenterJournalToken is Ownable, ERC721 {
    using Address for address payable;
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIdCounter;

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    struct Metadata {
        uint256 articleId;
        address owner;

        string title;
        string author;
        string ipfs;
        uint256 articleData;
        string articleImage;
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

    function mintAuthor(string memory title, string memory author, string memory ipfs, uint256 articleData, string memory articleImage, string memory _tokenURI) external payable returns (uint256 tokenId){
        require(msg.value == 0.0001 ether, "claiming a token costs 0.01 ether");
        _tokenIdCounter.increment();
        uint256 currentTokenId = _tokenIdCounter.current();
        decenterJournalTokenId[currentTokenId] = Metadata(currentTokenId, msg.sender, title, author, ipfs, articleData, articleImage);
        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, _tokenURI);
        return currentTokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual{
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
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

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
        require(_exists(tokenId), "ERC721 Metadata: URI query for nonexistent token.");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        if(bytes(_tokenURI).length == 0){
            return _tokenURI;
        }

        if(bytes(_tokenURI).length > 0){
            return string(abi.encodePacked(base, _tokenURI));
        }

        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function claimItem(string memory _tokenURI) public returns (uint256) {
        _tokenIdCounter.increment();
        uint256 newItemId = _tokenIdCounter.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        return newItemId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}