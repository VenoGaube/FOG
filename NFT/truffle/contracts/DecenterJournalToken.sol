//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Base64.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DecenterJournalToken is ERC721URIStorage {
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

  struct ReviewerNFT {
    uint256 reviewerId;
    address owner;

    string reviewer;
    string articleData;
    uint256 rating;
  }

  mapping(address=>mapping(uint=>uint)) private _ownedTokens;
  AuthorNFT[] public authorNFTs;
  ReviewerNFT[] public reviewerNFTs;

  string private imageURI = "https://ipfs.io/ipfs/QmPAMgqYKUU1myDm3EDHtPykapao4C2dFP2AtHA2wEoHJp?filename=";
  string private imageMetadataURI = "https://ipfs.io/ipfs/QmRqHRgMjnqobfF3NR3nKPpSx2j5puwjJJc7fSSXke8ysL?filename=";

  constructor() ERC721("Decenter Journal Token", "DJT") {
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
    // require(msg.value == 0.0001 ether, "claiming a token costs 0.01 ether");
    uint256 currentTokenId = tokenCounter.current();
    uint256 numOfUserTokens = ERC721.balanceOf(msg.sender);

    string memory image = string(abi.encodePacked(imageURI, Strings.toString(currentTokenId % 30), ".png"));
    string memory imageMetadata = string(abi.encodePacked(imageMetadataURI, Strings.toString(currentTokenId % 30)));
    string memory tokenUri = createTokenUri(title, imageMetadata);

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

  function pickRandomColor(uint256 firstRandomNumber, uint256 secondRandomNumber, uint256 thirdRandomNumber) internal pure returns (string memory)
  {
    uint256 r = firstRandomNumber % 256;
    uint256 g = secondRandomNumber % 256;
    uint256 b = thirdRandomNumber % 256;

    return
    string(
      abi.encodePacked(
        "rgb(",
        Strings.toString(r),
        ", ",
        Strings.toString(g),
        ", ",
        Strings.toString(b),
        ");"
      )
    );
  }

  function createOnChainSvg(string memory emoji, string memory color) internal pure returns(string memory svg) {
    string memory baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { font-size: 100px; }</style><rect width='100%' height='100%' style='fill:";
    string memory afterColorSvg = "' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    svg = string(abi.encodePacked(baseSvg, color, afterColorSvg, emoji, "</text></svg>"));
  }

  function createTokenUri(string memory title, string memory imageMetadata) internal pure returns(string memory tokenUri) {
    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            title,
            '", "description": "Article author NFT", "image": ',
            imageMetadata,
            '"}'
          )
        )
      )
    );

    tokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
  }
}
