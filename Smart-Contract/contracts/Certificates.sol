// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Issuer.sol";
import "./Holder.sol";
import "./VerifySignature.sol";

contract Certificates {
    Issuer private issuer;
    Holder private holder;

    struct Certificate {
        address holder;
        address issuer;
        string data;
        bytes4 signature;
        bool isRevoked;
    }

    mapping(address => mapping(bytes32 => Certificate)) public certificates;
    mapping(address => uint256) public certificateCounts;

    constructor(
        address _issuerContractAddress,
        address _holderContractAddress
    ) payable {
        issuer = Issuer(_issuerContractAddress);
        holder = Holder(_holderContractAddress);
    }

    modifier onlyAuthorizedIssuer() {
        require(
            issuer.authorizedIssuers(msg.sender),
            "Only authorized issuers can call this function"
        );
        _;
    }

    function issueCertificate(
        address _holder,
        string memory information
    ) public onlyAuthorizedIssuer returns (bytes32) {
        bytes4 sign = msg.sig; // Get the transaction signature from MetaMask
        bytes32 hash = keccak256(abi.encode(_holder, information, sign));
        certificates[_holder][hash] = Certificate(
            _holder,
            msg.sender,
            information,
            sign,
            false
        );
        certificateCounts[_holder]++;
        return hash;
    }

    function getCertificate(
        address _holder,
        bytes32 _certi
    ) external view returns (address, address, string memory, bool) {
        Certificate memory cert = certificates[_holder][_certi];
        return (cert.holder, cert.issuer, cert.data, cert.isRevoked);
    }

    function getCertificateCount(
        address _holder
    ) public view returns (uint256) {
        return certificateCounts[_holder];
    }

    function getCertificatesByAddress(
        address _holder
    ) public view returns (Certificate[] memory) {}

    function revokeCertificate(
        address _holder,
        bytes32 _certi
    ) external onlyAuthorizedIssuer {
        require(
            certificates[_holder][_certi].isRevoked == false,
            "Certificate is not active"
        );
        certificates[_holder][_certi].isRevoked = true;
    }

    function verifyCertificate(
        address _holder,
        bytes32 _certi
    ) external view returns (bool) {
        return (!certificates[_holder][_certi].isRevoked &&
            VerifySignature.verify(
                certificates[_holder][_certi].issuer,
                certificates[_holder][_certi].data,
                certificates[_holder][_certi].signature
            ));
    }
}
