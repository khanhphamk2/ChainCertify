// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./RandomKey.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract RSAAccumulator is Ownable {
    uint256 public accumulator;
    uint256 public n; // Modulus
    uint256 public e; // Public exponent
    uint256 public d; // Private exponent
    // using RandomKey for uint256;

    struct RevocationProof {
        uint256 revokedElement;
        uint256 accumulatorSnapshot;
        bytes32[] proof; // Use bytes32 for simplicity
    }

    constructor() {
        n = RandomKey.generateRandomNumber();
        d = RandomKey.generateRandomNumber();
        e = RandomKey.generateRandomNumber(d);
        accumulator = 1;
    }

    function addElement(bytes32 element) public returns (uint256) {
        accumulator = (accumulator * modExp((uint256(element)), e, n)) % n;
        return accumulator;
    }

    function verifyMembership(uint256 element) public view returns (bool) {
        uint256 h = modExp(element, e, n);
        return accumulator == h;
    }

    function proveNonMembership(uint256 element) public view returns (bool) {
        uint256 h = modExp(element, e, n);
        return accumulator != h;
    }

    function generateRevocationProof(
        uint256 revokedElement
    ) public view returns (RevocationProof memory) {
        require(verifyMembership(revokedElement), "Element not in accumulator");
        bytes32[] memory proof;
        uint256 accumulatorSnapshot = accumulator;

        // Generate cryptographic proof
        // For simplicity, let's just hash the revokedElement
        proof = new bytes32[](1);
        proof[0] = keccak256(abi.encodePacked(revokedElement));

        return RevocationProof(revokedElement, accumulatorSnapshot, proof);
    }

    function verifyRevocationProof(
        RevocationProof memory proof
    ) public view returns (bool) {
        require(
            proof.revokedElement > 0 && proof.revokedElement <= n,
            "Invalid revoked element"
        );

        require(
            verifyMembership(proof.revokedElement),
            "Element not in accumulator"
        );

        // Verify the cryptographic proof
        // For simplicity, we'll just compare the hash
        return
            proof.proof[0] == keccak256(abi.encodePacked(proof.revokedElement));
    }

    function revokeElement(uint256 element) public {
        // Calculate the modular inverse of the element
        uint256 invElement = modInverse(element, n);

        // Calculate the accumulator value without the revoked element
        accumulator = (accumulator * invElement) % n;
    }

    // Modular exponentiation function to prevent potential overflow/underflow
    function modExp(
        uint256 base,
        uint256 exponent,
        uint256 modulus
    ) internal pure returns (uint256) {
        if (modulus == 1) return 0;
        uint256 result = 1;
        base = base % modulus;
        while (exponent > 0) {
            if (exponent % 2 == 1) result = (result * base) % modulus;
            exponent = exponent >> 1;
            base = (base * base) % modulus;
        }
        return result;
    }

    // Modular inverse function
    function modInverse(uint256 a, uint256 m) internal pure returns (uint256) {
        require(m > 0, "Modulus must be positive");
        require(gcd(a, m) == 1, "Inverse does not exist");
        return power(a, m - 2, m);
    }

    // Calculate greatest common divisor (GCD) of two numbers
    function gcd(uint256 a, uint256 b) internal pure returns (uint256) {
        while (b != 0) {
            uint256 temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // Calculate (base ^ exponent) % modulus
    function power(
        uint256 base,
        uint256 exponent,
        uint256 modulus
    ) internal pure returns (uint256) {
        uint256 result = 1;
        while (exponent > 0) {
            if (exponent % 2 == 1) {
                result = (result * base) % modulus;
            }
            base = (base * base) % modulus;
            exponent /= 2;
        }
        return result;
    }
}
