// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract HelpFunctions {
    uint256[] lowPrimes = [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        41,
        43,
        47,
        53,
        59,
        61,
        67,
        71,
        73,
        79,
        83,
        89,
        97,
        101,
        103,
        107,
        109,
        113,
        127,
        131,
        137,
        139,
        149,
        151,
        157,
        163,
        167,
        173,
        179,
        181,
        191,
        193,
        197,
        199,
        211,
        223,
        227,
        229,
        233,
        239,
        241,
        251,
        257,
        263,
        269,
        271,
        277,
        281,
        283,
        293,
        307,
        311,
        313,
        317,
        331,
        337,
        347,
        349,
        353,
        359,
        367,
        373,
        379,
        383,
        389,
        397,
        401,
        409,
        419,
        421,
        431,
        433,
        439,
        443,
        449,
        457,
        461,
        463,
        467,
        479,
        487,
        491,
        499,
        503,
        509,
        521,
        523,
        541,
        547,
        557,
        563,
        569,
        571,
        577,
        587,
        593,
        599,
        601,
        607,
        613,
        617,
        619,
        631,
        641,
        643,
        647,
        653,
        659,
        661,
        673,
        677,
        683,
        691,
        701,
        709,
        719,
        727,
        733,
        739,
        743,
        751,
        757,
        761,
        769,
        773,
        787,
        797,
        809,
        811,
        821,
        823,
        827,
        829,
        839,
        853,
        857,
        859,
        863,
        877,
        881,
        883,
        887,
        907,
        911,
        919,
        929,
        937,
        941,
        947,
        953,
        967,
        971,
        977,
        983,
        991,
        997
    ];

    function rabinMiller(uint256 num) public view returns (bool) {
        uint256 s = num - 1;
        uint256 t = 0;

        while (s % 2 == 0) {
            s = s / 2;
            t += 1;
        }

        for (uint256 trials = 0; trials < 5; trials++) {
            uint256 a = uint256(
                uint256(keccak256(abi.encodePacked(block.timestamp, trials))) %
                    (num - 1)
            ) + 2;
            uint256 v = modExp(a, s, num);
            if (v != 1) {
                uint256 i = 0;
                while (v != num - 1) {
                    if (i == t - 1) {
                        revert("Rabin-Miller test failed: i == t - 1");
                    } else {
                        i = i + 1;
                        v = (v * v) % num;
                    }
                }
            }
        }
        return true;
    }

    function modExp(
        uint256 base,
        uint256 exponent,
        uint256 modulus
    ) public pure returns (uint256) {
        uint256 result = 1;
        base = base % modulus;
        while (exponent > 0) {
            if (exponent % 2 == 1) {
                result = (result * base) % modulus;
            }
            exponent = exponent >> 1;
            base = (base * base) % modulus;
        }
        return result;
    }

    function isPrime(uint256 num) public view returns (bool) {
        if (num < 2) {
            return false; // 0, 1, and negative numbers are not prime
        }

        for (uint256 i = 0; i < lowPrimes.length; i++) {
            if (num == lowPrimes[i]) {
                return true;
            }
            if (num % lowPrimes[i] == 0) {
                return false;
            }
        }
        return rabinMiller(num);
    }

    function generateLargePrime(
        uint256 num_of_bits
    ) internal view returns (uint256) {
        uint256 attempts = 0;
        while (attempts < 100) {
            // Limit the number of attempts to prevent an infinite loop
            uint256 num = uint256(
                keccak256(abi.encodePacked(block.timestamp, block.difficulty))
            ) % (2 ** num_of_bits);
            if (isPrime(num)) {
                return num;
            }
            attempts++;
        }
        revert("Failed to generate a prime number");
    }

    function generateTwoLargeDistinctPrimes(
        uint256 num_of_bits
    ) public view returns (uint256, uint256) {
        uint256 p = generateLargePrime(num_of_bits);
        while (true) {
            uint256 q = generateLargePrime(num_of_bits);
            if (q != p) {
                return (p, q);
            }
        }
    }

    function hashToPrime(
        uint256 x,
        uint256 num_of_bits,
        uint256 nonce
    ) public view returns (uint256, uint256) {
        while (true) {
            uint256 num = hashToLength(x + nonce, num_of_bits);
            if (isPrime(num)) {
                return (num, nonce);
            }
            nonce = nonce + 1;
        }
    }

    function hashToLength(
        uint256 x,
        uint256 num_of_bits
    ) public pure returns (uint256) {
        uint256 pseudoRandomHexString = 0;
        uint256 num_of_blocks = (num_of_bits + 255) / 256;
        for (uint256 i = 0; i < num_of_blocks; i++) {
            pseudoRandomHexString ^= uint256(
                keccak256(abi.encodePacked(x + i))
            );
        }
        return pseudoRandomHexString & ((1 << num_of_bits) - 1);
    }

    function xgcd(
        uint256 b,
        uint256 a
    ) public pure returns (uint256, int256, int256) {
        int256 x0 = 1;
        int256 x1 = 0;
        int256 y0 = 0;
        int256 y1 = 1;

        while (a != 0) {
            (uint256 q, uint256 b1, uint256 a1) = (b / a, a, b % a);
            (x0, x1) = (x1, x0 - int256(q) * x1);
            (y0, y1) = (y1, y0 - int256(q) * y1);
            (b, a) = (a1, b1);
        }

        return (b, x0, y0);
    }

    function mulInv(uint256 b, uint256 n) public pure returns (uint256) {
        (, int256 x, ) = xgcd(b, uint256(n));
        return uint256((x % int256(n)) + int256(n)) % n;
    }

    function concat(uint256[] memory values) public pure returns (uint256) {
        uint256 res = 0;
        for (uint256 i = 0; i < values.length; i++) {
            res = res * 10 ** getDigitsCount(values[i]) + values[i];
        }
        return res;
    }

    function getDigitsCount(uint256 num) public pure returns (uint256) {
        uint256 count = 0;
        while (num > 0) {
            num /= 10;
            count++;
        }
        return count;
    }

    function bezouteCoefficients(
        uint256 a,
        uint256 b
    ) public pure returns (int256, int256) {
        (, int256 x, int256 y) = xgcd(a, b);
        return (x, y);
    }

    function shamirTrick(
        uint256 pi1,
        uint256 pi2,
        uint256 x1,
        uint256 x2,
        uint256 n
    ) internal pure returns (uint256) {
        (int256 a, int256 b) = bezouteCoefficients(x1, x2);

        bool negativeIsA = a < 0;
        uint256 pi;
        if (negativeIsA) {
            uint256 positiveA = uint256(-a);
            uint256 inversePi2 = mulInv(pi2, n);
            uint256 power1 = modExp(pi1, uint256(b), n);
            uint256 power2 = modExp(inversePi2, positiveA, n);
            pi = mulMod(power1, power2, n);
        } else if (b < 0) {
            uint256 positiveB = uint256(-b);
            uint256 inversePi1 = mulInv(pi1, n);
            uint256 power1 = modExp(inversePi1, positiveB, n);
            uint256 power2 = modExp(pi2, uint256(a), n);
            pi = mulMod(power1, power2, n);
        } else {
            uint256 power1 = modExp(pi1, uint256(b), n);
            uint256 power2 = modExp(pi2, uint256(a), n);
            pi = mulMod(power1, power2, n);
        }

        return pi;
    }

    function calculateProduct(
        uint256[] memory lst
    ) internal pure returns (uint256) {
        uint256 r = 1;
        for (uint256 i = 0; i < lst.length; i++) {
            r = mulMod(r, lst[i], type(uint256).max);
        }
        return r;
    }

    function mulMod(
        uint256 a,
        uint256 b,
        uint256 modulus
    ) internal pure returns (uint256) {
        return (a * b) % modulus;
    }
}
