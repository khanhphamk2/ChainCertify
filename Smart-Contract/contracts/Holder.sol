// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Issuer.sol";

contract Holder {
    Issuer private issuer;

    mapping(address => bool) public holders;

    constructor(address _issuer) {
        issuer = Issuer(_issuer);
    }

    modifier onlyAuthorizedIssuer() {
        require(
            issuer.authorizedIssuers(msg.sender),
            "Only authorized issuers can call this function"
        );
        _;
    }

    function addHolder(address _holder) public onlyAuthorizedIssuer {
        holders[_holder] = true;
    }

    function delHolder(address _holder) public onlyAuthorizedIssuer {
        holders[_holder] = false;
    }

    function requestCertificate() public {
        //
    }

    function shareCertificate(address user) public {
        // Logic to share the certificate with another user
    }

    function requestCertificateVerification() public returns (bool) {}
}
