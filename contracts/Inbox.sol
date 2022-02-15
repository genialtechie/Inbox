//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 < 0.9.0;

contract Inbox {
    string public message;
    constructor(string memory initMessage) public {
        message = initMessage;
    }

    function setMessage(string calldata newMessage) external {
        message = newMessage;
    }
}