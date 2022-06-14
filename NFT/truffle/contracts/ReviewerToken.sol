//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Base64.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ReviewerToken is ERC721URIStorage {
  using Strings for uint256;
  using Counters for Counters.Counter;
  Counters.Counter private tokenCounter;

  struct ReviewerNFT {
    uint256 reviewerId;
    address owner;

    string title;
    string reviewer;
    uint256 rating;
    string articleData;
    string articleImage;
  }

  mapping(address=>mapping(uint=>uint)) private _ownedTokens;
  ReviewerNFT[] public reviewerNFTs;

  string private imageURI = "https://gateway.pinata.cloud/ipfs/QmXUgFJkWnXwazMG5jqA9HKwa6DU1ZWfzTwfbNJCEU3ddd/";
  string private imageMetadataURI = "https://gateway.pinata.cloud/ipfs/QmTiy2J5ArzRDeJdjraDVLVogqHaZyGHVYnvWA1Y4jdXGa/";

  constructor() ERC721("Reviewer Token", "RT") {
  }


  function getReviewerNFTData(uint256 tokenId) external view returns(string memory, string memory, string memory, string memory) {
    require(_exists(tokenId), "token not minted");
    return(
    reviewerNFTs[tokenId].title,
    reviewerNFTs[tokenId].reviewer,
    reviewerNFTs[tokenId].articleData,
    reviewerNFTs[tokenId].articleImage
    );
  }

  function getOwnedReviewerNFTs() public view returns(ReviewerNFT[] memory){
    uint ownedItemsCount = ERC721.balanceOf(msg.sender);
    ReviewerNFT[] memory items = new ReviewerNFT[](ownedItemsCount);
    for (uint i = 0; i < ownedItemsCount; i++){
      uint tokenId = _ownedTokens[msg.sender][i];
      ReviewerNFT storage item = reviewerNFTs[tokenId];
      items[i]=item;
    }
    return items;
  }

  function reviewerMint(string memory title, string memory reviewer, uint256 rating, string memory ipfsArticleLink) external payable returns (uint256 tokenId){
    uint256 currentTokenId = tokenCounter.current();
    uint256 numOfUserTokens = ERC721.balanceOf(msg.sender);

    string memory image = string(abi.encodePacked(imageURI, Strings.toString((currentTokenId + 50) % 100), ".png"));
    string memory imageMetadata = string(abi.encodePacked(imageMetadataURI, Strings.toString((currentTokenId + 50) % 100), ".json"));
    string memory tokenUri = createTokenUri(imageMetadata);

    reviewerNFTs.push(
      ReviewerNFT(
        currentTokenId,
        msg.sender,
        title,
        reviewer,
        rating,
        ipfsArticleLink,
        image
      )
    );

    _ownedTokens[msg.sender][numOfUserTokens] = currentTokenId;

    _safeMint(msg.sender, currentTokenId);
    _setTokenURI(currentTokenId, tokenUri);

    tokenCounter.increment();

    return currentTokenId;
  }

  function getNumberOfReviewerNFTS() public view returns (uint256) {
    return reviewerNFTs.length;
  }

  function createTokenUri(string memory imageMetadata) internal pure returns(string memory tokenUri) {
    string memory json = Base64.encode(bytes(string(abi.encodePacked(imageMetadata))));

    tokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
  }
}
