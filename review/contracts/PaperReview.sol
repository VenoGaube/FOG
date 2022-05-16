pragma solidity >=0.6.0 <0.9.0;

import "./User.sol";

contract PaperReview {
    uint constant REQUIRED_VOTERS = 1;

    User userContract;

    enum VoteStatus { none, accept, reject }
    enum ArticleStatus { none, waiting, inReview, finished }

    struct Vote {
        VoteStatus vote;
        string reviewIpfsHash;
    }

    struct Article {
        string ipfsHash;
        address author;
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
        // check if user with role writer submitted the article
        User.Role role = userContact.getUserRole(msg.sender);
        
        if (role != User.Role.author) {
            throw;
        }

        bytes32 articleId = sha3(articleIpfsHash);

        // create new aricle
        Article memory newArticle;
        newArticle.ipfsHash = articleIpfsHash;
        newArticle.status = ArticleStatus.waiting;
        newArticle.author = msg.sender;

        // add article
        submittedArticles[articleId] = newArticle;

        ArticleSubmitted(articleId, articleIpfsHash);

    }

    // assign reviewers to a submitted article
    function assignReviewers(bytes32 articleId) internal {
        Article article = submittedArticles[articleId];


        // assign reviewers to the article
        for (uint i = 0; i < REQUIRED_VOTERS; i++) {
             // TODO: assign reviewers
        }

        article.status = ArticleStatus.inReview;

    }

    function vote(string articleIpfsHash, VoteStatus vote, string feedbackIpfsHash) {
        User.Role role = userContact.getUserRole(msg.sender);

        if (role != User.Role.reviewer){
            throw;
        }

        bytes32 articleId = sha3(articleIpfsHash);

        Article article = submittedArticles[articleId];

        if (article.status != ArticleStatus.inReview) {
            throw;
        }

        Vote memory newVote;
        newVote.vote = vote;
        newVote.feedbackIpfsHash = feedbackIpfsHash;

        article.votes[msg.sender] = newVote;
        article.numberOfVotes++;

        if (article.numberOfVotes == REQUIRED_VOTERS) {
            BroadcastMessage("All reviewers have submitted their vote");
            reviewDecision(articleId);
        }
        
    }

    function reviewDecision(bytes32 articleId) internal {
        Article article = submittedArticles[articleId];

        // check for all votes and determine the final decision; to accept or reject the article
        // currently all votes must be accepted to accept the paper
        VoteStatus decision = VoteStatus.accept;
        for (uint i = 0; i < REQUIRED_VOTERS; i++) {
            // TODO: change indexing to specific reviewer
            if (article.votes[i].vote == VoteStatus.reject) {
                decision = VoteStatus.reject;
                break;
            }
        }

        if (decision == VoteStatus.accept){
            ArticleAccepted(articleId, article.ipfsHash);
        }
        else if (decision == VoteStatus.reject) {
            ArticleRejected(articleId, article.ipfsHash);
        }

        article.status = ArticleStatus.finished;
    }
}