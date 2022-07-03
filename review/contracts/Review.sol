pragma solidity ^0.4.0;

import "./User.sol";

contract Review {
    uint constant REQUIRED_REVIEWERS = 3;
    uint constant VOTING_PERIOD_DURATION = 45 days;

    // address of the user (could be a reviewer/editor/...)
    address public userContractAddress;
    User userContract;

    enum VoteStatus { none, accept, reject, revise }
    enum ArticleStatus { none, waitingForReviewers, voting, revise, done}

    struct Vote {
        VoteStatus vote;
        int8 grade;
//        string feedbackIpfsHash;
    }

    // should articles be stored in a seperate database (temporary database)
    // if so then this is not needed
    struct Article {
        string ipfsHash;
        ArticleStatus status;
        address submittedBy;
        uint256 submissionTime;
        address[] reviewers;
        mapping (address => bool) reviewers_bool;
        mapping(address => Vote) votes;
        uint8 voteCount;

        address[] voteRequests;
        uint32 collateralTotal;
        mapping(address => uint256) requestTimes;
        mapping(address => uint32) collateralAmounts;
        mapping(address => bool) votingRights;
    }

    mapping(bytes32 => Article) submittedArticles;

    // events triggered by specific actions (article submitted, accepted/rejected)
    event ArticleSubmitted(bytes32 articleId, string articleIpfsHash);
    event VotingStarted(bytes32 articleId, string articleIpfsHash);
    event ArticleAccepted(bytes32 articleId, string articleIpfsHash);
    event ArticleRejected(bytes32 articleId, string articleIpfsHash);
    event VotingPeriodExpired(bytes32 articleId);

    constructor() {
        userContractAddress = msg.sender();
    }

    function Review(){
        userContract = User(userContractAddress);
    }

    // functions

    function submitArticleForReview(string articleIpfsHash) {
        //TODO: check if article is already in the submited articles and if it can be re-submitted

        require(
            userContract.retrieveUserType(msg.sender) == User.UserType.author,
            "Only an author can submit an article for a review."
        );

        bytes articleId = sha3(articleIpfsHash);

        Article memory newArticle;
        newArticle.ipfsHash = articleIpfsHash;
        newArticle.status = ArticleStatus.waitingForReviewers;
        newArticle.submittedBy = msg.sender;
        newArticle.submissionTime = now;

        submittedArticles[articleId] = newArticle;

        ArticleSubmitted(articleId, articleIpfsHash);
    }

    function assignReviewers(string articleIpfsHash, address[] assigned_reviewers) {
        require(
            userContract.retrieveUserType(msg.sender) == User.UserType.editor,
            "Only an editor can assign reviewers."
        );

        bytes articleId = sha3(articleIpfsHash);
        Article article = submittedArticles[articleId];

        require(
            article.status == ArticleStatus.waitingForReviewers,
            "The article must be in status waitingForReviewers."
        );

        require(
            assigned_reviewers.length == REQUIRED_REVIEWERS,
            "There must be at least 3 reviewers per article."
        );

//        article.reviewers_bool = assigned_reviewers;
        for (uint i = 0; i < assigned_reviewers.length; i++) {
            article.reviewers_bool[assigned_reviewers[i]] = true;
            article.reviewers = assigned_reviewers;
        }

        article.status = ArticleStatus.voting;

        VotingStarted(articleId, article.ipfsHash);
    }

    function vote(string articleIpfsHash, VoteStatus _vote, int8 _grade) {
        require(
            userContract.retrieveUserType(msg.sender) == User.UserType.reviewer,
            "You must be a reviewer to review an article."
        );

        bytes articleId = sha3(articleIpfsHash);
        Article article = submittedArticles[articleId];

        require(
            article.reviewers_bool[msg.sender] == true,
            "You must be a reviewer assigned to this article to review the article."
        );

        require(
            article.status == ArticleStatus.voting,
            "You must be a reviewer assigned to this article to review the article."
        );

        require(
            article.votes[msg.sender].vote == VoteStatus.none,
            "You already casted a vote for this article"
        );

        // check if the voting period has expired
        if (now > article.submissionTime + VOTING_PERIOD_DURATION) {
            VotingPeriodExpired(articleId);
            throw;
        }

        // make a new vote
        Vote memory newVote;
        newVote.vote = _vote;
        newVote.grade = _grade;
        article.votes[msg.sender] = newVote;
        article.voteCount++;

        // check if all the reviewers voted
        //if (article.voteCount == article.reviewers_bool.length)
        if (article.voteCount == REQUIRED_REVIEWERS) {
            makeDecision(articleId);
        }
    }

    function makeDecision(bytes32 articleId) internal {
        Article article = submittedArticles[articleId];
        VoteStatus decision;

        // calculate combined votes
        int8 full_rejects = 0;
        int8 full_accepts = 0;
        int8 full_grade = 0;
        for (uint i = 0; i < article.reviewers.length; i++) {
            int8 currGrade = article.votes[article.reviewers[i]].grade;

            if (currGrade == 1) {
                full_rejects++;
            }
            else if (currGrade == 5) {
                full_accepts++;
            }
            full_grade += currGrade;
        }

        // make final decision based on the votes
        // reject the article if 2 full rejects
        if (full_rejects >= 2) {
            decision = VoteStatus.reject;
        }
        // if 3 full accepts accept the article
        else if (full_accepts >= 3) {
            decision = VoteStatus.accept;
        }
        // else decide based on the combined grade
        else {
            if (full_grade >= 4 * REQUIRED_REVIEWERS) {
                decision = VoteStatus.accept;
            }
            else {
                decision = VoteStatus.reject;
            }
        }

        // trigger events based on the final decision
        if (decision == VoteStatus.accept) {
            article.status = ArticleStatus.done;
            ArticleAccepted(articleId, article.ipfsHash);
        }
        else {
            if (article.status == ArticleStatus.revise) {
                article.status = ArticleStatus.done;
            }
            else {
                article.status = ArticleStatus.revise;
            }
            ArticleRejected(articleId, article.ipfsHash);
        }

    }

}
