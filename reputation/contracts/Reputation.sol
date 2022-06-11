// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract Reputation {
    address public owner;

    struct BlockchainReview {
        uint8 value;
        bytes32 hash;
        uint32 id;
    }

    event ReviewReveivedEvent(
        uint256 id,
        address targetEntity,
        uint8 value,
        string text
    );
    mapping(address => BlockchainReview[]) entityReviews;
    mapping(address => uint256) entityValueSum;
    mapping(address => mapping(address => bool)) alreadyInsertedReviews;
    uint32 reviewCount = 0;

    constructor() {
        owner = msg.sender;
    }

    function getReputationCount(address _targetEntity)
        public
        view
        returns (uint256)
    {
        return entityReviews[_targetEntity].length;
    }

    function storeReview(
        address _targetEntity,
        uint8 _value,
        string memory _text
    ) public {
        require(
            _value >= 1 && _value <= 5,
            "The value should be between 1 and 5"
        );
        require(
            _targetEntity != msg.sender,
            "You cannot insert reviews for yourself!"
        );
        require(
            alreadyInsertedReviews[msg.sender][_targetEntity] == false,
            "You already inserted a review for the entity!"
        );
        bytes32 hash = sha256(abi.encodePacked(_text));
        entityReviews[_targetEntity].push(
            BlockchainReview(_value, hash, reviewCount)
        );
        emit ReviewReveivedEvent(reviewCount, _targetEntity, _value, _text);
        entityValueSum[_targetEntity] += _value;
        alreadyInsertedReviews[msg.sender][_targetEntity] = true;
        reviewCount += 1;
    }

    function retrieveEntityReviews(address _targetEntity)
        public
        view
        returns (BlockchainReview[] memory)
    {
        return entityReviews[_targetEntity];
    }

    function checkEntityReviews(
        uint8[] memory _assertedScores,
        bytes32[] memory _assertedHashes,
        address _targetEntity
    ) public view returns (bool) {
        for (uint256 i = 0; i < getReputationCount(_targetEntity); i++) {
            if (_assertedHashes[i] != entityReviews[_targetEntity][i].hash)
                return false;
            if (_assertedScores[i] != entityReviews[_targetEntity][i].value)
                return false;
        }
        return true;
    }

    function getAverageScore(address _targetEntity)
        public
        view
        returns (uint256, uint256)
    {
        uint256 integerDivision = entityValueSum[_targetEntity] /
            getReputationCount(_targetEntity);
        uint256 modulo = entityValueSum[_targetEntity] %
            getReputationCount(_targetEntity);
        return (
            integerDivision,
            (modulo * 10) / getReputationCount(_targetEntity)
        );
    }
}
