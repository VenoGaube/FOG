// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/utils/Base64.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";

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
        uint256 articleData;
        string ipfsImageHash;
    }

    mapping(uint256 => Metadata) decenterJournalTokenId;
    string private _currentBaseURI;

    constructor() ERC721("Published article Token", "DCJ") { }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _currentBaseURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _currentBaseURI;
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

    function mintAuthor(string memory title, string memory author, uint256 articleData, string memory ipfsImageHash) external payable returns (uint256 tokenId){
        // require(msg.value == 0.0001 ether, "claiming a token costs 0.01 ether");
        _tokenIdCounter.increment();
        uint256 currentTokenId = _tokenIdCounter.current();
        string memory _ipfsImageHash = getTokenURI(ipfsImageHash);
        decenterJournalTokenId[currentTokenId] = Metadata(currentTokenId, msg.sender, title, author, articleData, _ipfsImageHash);
        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI(currentTokenId));
        return currentTokenId;
    }

    function getTokenURI(string memory _ipfsHashOfPhoto) internal pure returns (string memory) {
        return string(abi.encodePacked(baseTokenURI(), _ipfsHashOfPhoto));
    }

    function baseTokenURI() public pure returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "Token does not exists.");
        Metadata memory tokenAttributes = decenterJournalTokenId[_tokenId];

        string memory title = tokenAttributes.title;
        address owner = tokenAttributes.owner;
        string memory author = tokenAttributes.author;

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                            tokenAttributes.title,
                            '", "description": "This is a token for the decentralized journal", "image": "', tokenAttributes.ipfsImageHash,
                        '"}'
                    )
                )
            )
        );

        return string(abi.encodePacked('data:application/json;base64,', json));
    }

}