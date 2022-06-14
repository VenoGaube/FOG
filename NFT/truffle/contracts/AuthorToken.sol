//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Base64.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AuthorToken is ERC721URIStorage {
  using Strings for uint256;
  using Counters for Counters.Counter;
  Counters.Counter private tokenCounter;

  struct AuthorNFT {
    uint256 authorId;
    address owner;

    string title;
    string author;
    string articleData;
    string articleImage;
  }

  mapping(address=>mapping(uint=>uint)) private _ownedTokens;
  AuthorNFT[] public authorNFTs;

  string private imageURI = "https://gateway.pinata.cloud/ipfs/QmXUgFJkWnXwazMG5jqA9HKwa6DU1ZWfzTwfbNJCEU3ddd/";
  string private imageMetadataURI = "https://gateway.pinata.cloud/ipfs/QmTiy2J5ArzRDeJdjraDVLVogqHaZyGHVYnvWA1Y4jdXGa/";

  constructor() ERC721("Author Token", "AT") {
  }

  function getAuthorNFTData(uint256 tokenId) external view returns(string memory, string memory, string memory, string memory) {
    require(_exists(tokenId), "token not minted");
    return(
    authorNFTs[tokenId].title,
    authorNFTs[tokenId].author,
    authorNFTs[tokenId].articleData,
    authorNFTs[tokenId].articleImage
    );
  }

  function getOwnedNfts() public view returns(AuthorNFT[] memory){
    uint ownedItemsCount = ERC721.balanceOf(msg.sender);
    AuthorNFT[] memory items = new AuthorNFT[](ownedItemsCount);
    for (uint i = 0; i < ownedItemsCount; i++){
      uint tokenId = _ownedTokens[msg.sender][i];
      AuthorNFT storage item = authorNFTs[tokenId];
      items[i]=item;
    }
    return items;
  }

  function authorMint(string memory title, string memory author, string memory ipfsArticleLink) external payable returns (uint256 tokenId){
    uint256 currentTokenId = tokenCounter.current();
    uint256 numOfUserTokens = ERC721.balanceOf(msg.sender);

    string memory image = string(abi.encodePacked(imageURI, Strings.toString(currentTokenId % 100), ".png"));
    string memory imageMetadata = string(abi.encodePacked(imageMetadataURI, Strings.toString(currentTokenId % 100), ".json"));
    string memory tokenUri = createTokenUri(imageMetadata);

    authorNFTs.push(
      AuthorNFT(
        currentTokenId,
        msg.sender,
        title,
        author,
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

  function getNumberOfAuthorNFTS() public view returns (uint256) {
    return authorNFTs.length;
  }

  function createTokenUri(string memory imageMetadata) internal pure returns(string memory tokenUri) {
    string memory json = Base64.encode(bytes(string(abi.encodePacked(imageMetadata))));

    tokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
  }
}
