// SPDX-License-Identifier: MIT

pragma solidity ^0.4.8;

import "./User.sol";

contract Review {
    int8 constant REQUIRED_REVIEWERS = 3;
    uint constant VOTING_PERIOD_DURATION = 45 days;

    // address of the user (could be a reviewer/editor/...)
    address public userContractAddress;
//    User userContract;
    enum UserType { none, reader, reviewer, author, editor }
    mapping (address => UserType) userType;

    enum VoteStatus { none, accept, reject, revise }
    enum ArticleStatus { none, waitingForReviewers, voting, revise, accepted, rejected}

    struct Vote {
        bool voted;
        int8 grade;
//        string feedbackIpfsHash;
    }

    struct Article {
        string ipfsHash;
        ArticleStatus status;
        address submittedBy;
        uint256 submissionTime;
        address[] reviewers;
        mapping (address => bool) reviewers_bool;
        mapping(address => Vote) votes;
        int8 voteCount;

//        address[] voteRequests;
//        uint32 collateralTotal;
//        mapping(address => uint256) requestTimes;
//        mapping(address => uint32) collateralAmounts;
//        mapping(address => bool) votingRights;
    }

    mapping(bytes32 => Article) submittedArticles;

    // events triggered by specific actions (article submitted, accepted/rejected)
    event ArticleSubmitted(string event_name, bytes32 articleId, string articleIpfsHash);
    event VotingStarted(string event_name, bytes32 articleId, string articleIpfsHash);
    event ArticleAccepted(string event_name, bytes32 articleId, string articleIpfsHash);
    event ArticleRejected(string event_name, bytes32 articleId, string articleIpfsHash);
    event ArticleForRevision(string event_name, bytes32 articleId, string articleIpfsHAsh);
    event VotingPeriodExpired(string event_name, bytes32 articleId);

//    constructor() public {
//        userContractAddress = msg.sender;
//        userContract = User(userContractAddress);
//    }

    constructor(int editor) public {
        userContractAddress = msg.sender;
        if (editor == 0){
            userType[msg.sender] = UserType.editor;
        }
    }


    // functions for setting and retrieving the type of user
    // can only be set by the editor role
    function setAnyUserType(int t, address userAddress) public {
        require(
            userType[msg.sender] == UserType.editor,
            "Only an editor can change types"
        );

        if (t == 1){
            userType[userAddress] = UserType.reader;
        } else if (t == 2){
            userType[userAddress] = UserType.reviewer;
        } else if (t == 3){
            userType[userAddress] = UserType.author;
        } else if (t == 4){
            userType[userAddress] = UserType.editor;
        } else {
            userType[userAddress] = UserType.none;
        }
    }

    function setUserType(UserType newType, address userAddress) public {
        require(
            userType[msg.sender] == UserType.editor,
            "Only an editor can change types"
        );

        userType[userAddress] = newType;
    }

    function getUserType(address userAddress) public view returns (UserType) {
        return userType[userAddress];
    }

    function getArticleStatus(string memory articleIpfsHash) public view returns (ArticleStatus) {
        bytes32 articleId = sha256(abi.encodePacked(articleIpfsHash));
        Article storage article = submittedArticles[articleId];

        return article.status;
    }

    function getAssignedReviewer(string memory articleIpfsHash, address a) public view returns (bool) {
        bytes32 articleId = sha256(abi.encodePacked(articleIpfsHash));
        Article storage article = submittedArticles[articleId];

        return article.reviewers_bool[a];
    }


    // functions for review process
    function submitArticleForReview(string memory articleIpfsHash) public {
        require(
            getUserType(msg.sender) == UserType.author,
            "Only an author can submit an article for a review."
        );

        bytes32 articleId = sha256(abi.encodePacked(articleIpfsHash));

        Article memory newArticle;
        newArticle.ipfsHash = articleIpfsHash;
        newArticle.status = ArticleStatus.waitingForReviewers;
        newArticle.submittedBy = msg.sender;
        newArticle.submissionTime = now;

        submittedArticles[articleId] = newArticle;

        emit ArticleSubmitted('ArticleSubmitted', articleId, articleIpfsHash);
    }

    function assignReviewers(string memory articleIpfsHash, address[] assigned_reviewers) public {
        require(
            getUserType(msg.sender) == UserType.editor,
            "Only an editor can assign reviewers."
        );

        bytes32 articleId = sha256(abi.encodePacked(articleIpfsHash));
        Article storage article = submittedArticles[articleId];

        require(
            article.status == ArticleStatus.waitingForReviewers,
            "The article must be in status waitingForReviewers."
        );

        require(
            int8(assigned_reviewers.length) == REQUIRED_REVIEWERS,
            "There must be at least 3 reviewers per article."
        );

//        article.reviewers_bool = assigned_reviewers;
        for (uint i = 0; i < assigned_reviewers.length; i++) {
            // make assigned_reviewers type reviewer
            // this is part of ID management
            setUserType(UserType.reviewer, assigned_reviewers[i]);

            article.reviewers_bool[assigned_reviewers[i]] = true;
            article.reviewers = assigned_reviewers;
        }

        article.status = ArticleStatus.voting;

        emit VotingStarted('VotingStarted', articleId, article.ipfsHash);
    }

    function vote(string memory articleIpfsHash, int8 _grade) public {
        require(
            getUserType(msg.sender) == UserType.reviewer,
            "You must be a reviewer to review an article."
        );

        bytes32 articleId = sha256(abi.encodePacked(articleIpfsHash));
        Article storage article = submittedArticles[articleId];

        require(
            article.reviewers_bool[msg.sender] == true,
            "You must be a reviewer assigned to this article to review the article."
        );

        require(
            article.status == ArticleStatus.voting || article.status == ArticleStatus.revise,
            "The article must be in status voting or revise."
        );

        require(
            article.votes[msg.sender].voted == false,
            "You already casted a vote for this article"
        );

        // check if the voting period has expired
        if (now > article.submissionTime + VOTING_PERIOD_DURATION) {
            emit VotingPeriodExpired('VotingPeriodExpired', articleId);
            assert(false);
        }

        // make a new vote
        Vote memory newVote;
        newVote.voted = true;
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
        Article storage article = submittedArticles[articleId];
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
                decision = VoteStatus.revise;
            }
        }

        // trigger events based on the final decision
        if (decision == VoteStatus.accept) {
            article.status = ArticleStatus.accepted;
            emit ArticleAccepted('ArticleAccepted', articleId, article.ipfsHash);
        }
        else if (decision == VoteStatus.revise) {
            // the article can only be revised once, so it is rejected
            if (article.status == ArticleStatus.revise) {
                article.status = ArticleStatus.rejected;
                emit ArticleRejected('ArticleRejected', articleId, article.ipfsHash);
            }
            // the article needs to be revised
            else {
                // reset the needed values
                article.status = ArticleStatus.revise;
                article.voteCount = 0;
                for (uint j = 0; j < article.reviewers.length; j++) {
                    article.votes[article.reviewers[j]].voted = false;
                }
                emit ArticleForRevision('ArticleForRevision', articleId, article.ipfsHash);
            }
        }
        else if (decision == VoteStatus.reject) {
            emit ArticleRejected('ArticleRejected', articleId, article.ipfsHash);
        }
        else {
            assert(false);
        }

    }

}