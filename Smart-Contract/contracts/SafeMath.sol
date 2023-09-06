// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library SafeMath {
    function modPow(
        uint256 base,
        uint256 exponent,
        uint256 modulo
    ) internal pure returns (uint256 result) {
        result = 1;
        while (exponent > 0) {
            if (exponent % 2 == 1) {
                result = (result * base) % modulo;
            }
            base = (base * base) % modulo;
            exponent /= 2;
        }
    }

    function modExp(
        uint256 base,
        uint256 exponent,
        uint256 modulus
    ) internal view returns (uint256) {
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

    function modInverse(uint256 a, uint256 n) internal pure returns (uint256) {
        uint256[2] memory vals;
        extendedEuclidean(a, n, vals);
        return vals[0];
    }

    function extendedEuclidean(
        uint256 a,
        uint256 b,
        uint256[2] memory vals
    ) internal pure {
        if (b == 0) {
            vals[0] = 1;
            vals[1] = 0;
            return;
        }
        extendedEuclidean(b, a % b, vals);
        uint256 x1 = vals[1];
        uint256 y1 = vals[0] - (a / b) * vals[1];
        vals[0] = x1;
        vals[1] = y1;
    }

    function evenHex(uint256 num) internal pure returns (bytes memory) {
        bytes memory hexNum = abi.encodePacked(num);
        if (hexNum.length % 2 != 0) {
            return abi.encodePacked("0", hexNum);
        }
        return hexNum;
    }
}
