// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Issuer is Ownable {
    mapping(address => bool) public authorizedIssuers;

    constructor() {
        authorizedIssuers[msg.sender] = true;
    }

    function authorizeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    function revokeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = false;
    }
}
