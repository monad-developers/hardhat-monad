// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MessageBoard {
    struct Message {
        uint256 id;
        address author;
        address recipient;
        string text;
        uint256 timestamp;
    }

    uint256 private nextId = 0;
    mapping(uint256 => Message) public messages;
    
    event MessageSent(
        uint256 id,
        address indexed author,
        address indexed recipient,
        string text,
        uint256 timestamp
    );

    function sendMessage(address _recipient, string calldata _text) public {
        require(bytes(_text).length > 0, "Message text cannot be empty");

        messages[nextId] = Message({
            id: nextId,
            author: msg.sender,
            recipient: _recipient,
            text: _text,
            timestamp: block.timestamp
        });

        emit MessageSent(nextId, msg.sender, _recipient, _text, block.timestamp);

        nextId++;
    }

    function getMessageCount() public view returns (uint256) {
        return nextId;
    }
}
