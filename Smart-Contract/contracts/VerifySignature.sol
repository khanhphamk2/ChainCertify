// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library VerifySignature {
    function verify(
        address holder,
        string memory information,
        bytes4 signature
    ) public pure returns (bool) {
        bytes32 messageHash = getMessageHash(holder, information);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        address signer = recoverSigner(ethSignedMessageHash, signature);
        return signer == holder;
    }

    function getMessageHash(
        address _to,
        string memory _message
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_to, _message));
    }

    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    _messageHash
                )
            );
    }

    function recoverSigner(
        bytes32 _ethSignedMessageHash,
        bytes4 _signature
    ) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(
        bytes4 sig
    ) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
