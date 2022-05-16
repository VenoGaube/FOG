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

    string[] private emojis = [
        unicode"😁",
        unicode"😂",
        unicode"😍",
        unicode"😭",
        unicode"😴",
        unicode"😎",
        unicode"🤑",
        unicode"🥳",
        unicode"😱",
        unicode"🙄"
    ];

    struct AuthorNFT {
        uint256 authorId;
        address owner;

        string title;
        string author;
        string articleData;
    }

    struct ReviewerNFT {
        uint256 reviewerId;
        address owner;

        string reviewer;
        string articleData;
        uint256 rating;
    }

    AuthorNFT[] public authorNFTs;
    ReviewerNFT[] public reviewerNFTs;

    constructor() ERC721("Decenter Journal Token", "DJT") {
    }

    function getAuthorNFTData(uint256 tokenId) external view returns(string memory, string memory, string memory) {
        require(_exists(tokenId), "token not minted");
        return(
            authorNFTs[tokenId].title,
            authorNFTs[tokenId].author,
            authorNFTs[tokenId].articleData
        );
    }

    function authorMint(string memory title, string memory author, string memory ipfsArticleLink, uint256 emojiIndex) external payable returns (uint256 tokenId){
        // require(msg.value == 0.0001 ether, "claiming a token costs 0.01 ether");
        uint256 currentTokenId = tokenCounter.current();
        authorNFTs.push(
            AuthorNFT(
                currentTokenId,
                msg.sender,
                title,
                author,
                ipfsArticleLink
            )
        );

        string memory color = pickRandomColor(15, 200, 150);
        string memory emoji = emojis[emojiIndex];
        string memory svg = createOnChainSvg(emoji, color);
        string memory tokenUri = createTokenUri(emoji, svg);

        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenUri);

        tokenCounter.increment();

        return currentTokenId;
    }

    function reviewerMint(string memory ipfsArticleLink, string memory reviewer, uint256 rating,uint256 emojiIndex) external payable returns (uint256 tokenId){
        // require(msg.value == 0.0001 ether, "claiming a token costs 0.01 ether");
        uint256 currentTokenId = tokenCounter.current();
        reviewerNFTs.push(
            ReviewerNFT(
                currentTokenId,
                msg.sender,
                ipfsArticleLink,
                reviewer,
                rating
            )
        );

        string memory color = pickRandomColor(200, 125, 50);
        string memory emoji = emojis[emojiIndex];
        string memory svg = createOnChainSvg(emoji, color);
        string memory tokenUri = createTokenUri(emoji, svg);

        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenUri);

        tokenCounter.increment();

        return currentTokenId;
    }

    function getNumberOfReviwerNFTS() public view returns (uint256) {
        return reviewerNFTs.length;
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

    function createTokenUri(string memory title, string memory svg) internal pure returns(string memory tokenUri) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        title,
                        '", "description": "Article author NFT", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
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