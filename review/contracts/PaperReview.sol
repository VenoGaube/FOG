pragma solidity >=0.6.0 <0.9.0;

contract PaperReview {
    uint constant REQUIRED_VOTERS = 1;

    enum VoteStatus { none, accept, reject }
    enum ArticleStatus { none, inReview, finished }

    struct Vote {
        VoteStatus vote;
        string reviewIpfsHash;
    }

    struct Article {
        string ipfsHash;
        ArticleStatus status;
        mapping(address => Vote) votes;
        uint8 numberOfVotes;
    }

    mapping(bytes32 => Article) submittedArticles;


    // all actions after the article is submitted
    event ArticleSubmitted(bytes32 articleId, string articleIpfsHash);
    event ArticleAccepted(bytes32 articleId, string articleIpfsHash);
    event ArticleRejected(bytes32 articleId, string articleIpfsHash);

    // functions
/*     function PaperReview() {
        
    } */

    function submitArticleForReview(string articleIpfsHash) {
        
    }
}