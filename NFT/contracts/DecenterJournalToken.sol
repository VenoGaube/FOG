// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Base64.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";

contract DecenterJournalToken is Ownable, ERC721 {
    using Strings for uint256;

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    struct AuthorNFT {
        uint256 articleId;
        address owner;

        string title;
        string author;
        uint256 articleData;
        string ipfsImageHash;
    }

    AuthorNFT[] public authorNFTs;
    mapping(uint256 => AuthorNFT) decenterJournalTokenId;
    string public baseTokenURI ;

    constructor() ERC721("Published article Token", "DCJ") {
        baseTokenURI = "https://ipfs.io/ipfs/";
    }

    function setBaseTokenURI(string memory baseURI) public onlyOwner {
        baseTokenURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function getAuthorNFTData(uint256 tokenId) external view returns(string memory, string memory, uint256, string memory) {
        require(_exists(tokenId), "token not minted");
        return(
            authorNFTs[tokenId].title,
            authorNFTs[tokenId].author,
            authorNFTs[tokenId].articleData,
            authorNFTs[tokenId].ipfsImageHash
        );
    }

    function authorMint(string memory title, string memory author, uint256 articleData, string memory ipfsImageHash)
        external payable returns (uint256 tokenId){
        // require(msg.value == 0.0001 ether, "claiming a token costs 0.01 ether");
        uint256 currentTokenId = authorNFTs.length;
        authorNFTs.push(
            AuthorNFT(
                currentTokenId,
                msg.sender,
                title,
                author,
                articleData,
                ipfsImageHash
            )
        );

        _safeMint(msg.sender, currentTokenId);
        return currentTokenId;
    }

    function getNumberOfAuthorNFTS() public view returns (uint256) {
        return authorNFTs.length;
    }
}