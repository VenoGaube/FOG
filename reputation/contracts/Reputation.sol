// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract Reputation {
    // we have an array of reviews

    struct Review {
        uint8 score;
        uint256 time;
        uint32 id;
        bytes32 hash;
    }

    event ReviewReveivedEvent(
        uint32 id,
        uint8 score,
        address entity,
        string text
    );

    uint32 reviewCount = 0;

    address public owner;
    mapping(address => Review[]) entity_reviews;

    constructor() {
        owner = msg.sender;
    }

    function store(
        uint8 _score,
        address _entity,
        string memory _text
    ) public {
        require(_score >= 1, "The score cannot be below 1");
        require(_score <= 5, "The score cannot be above 5");
        bytes32 hash = sha256(abi.encodePacked(_text));
        entity_reviews[_entity].push(
            Review(_score, block.timestamp, reviewCount, hash)
        );
        emit ReviewReveivedEvent(reviewCount, _score, _entity, _text);
        reviewCount += 1;
    }

    function entity_reviews_length(address _entity)
        public
        view
        returns (uint256)
    {
        return entity_reviews[_entity].length;
    }

    function retrieve_entity_reviews(address _entity)
        public
        view
        returns (Review[] memory)
    {
        return entity_reviews[_entity];
    }
}
