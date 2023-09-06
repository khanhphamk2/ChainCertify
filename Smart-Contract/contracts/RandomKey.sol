// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library RandomKey {
    // Hàm để cập nhật seed
    function updateSeed(bytes32 _seed) private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(_seed, blockhash(block.number - 1)))
            );
    }

    // Hàm để sinh số ngẫu nhiên uint256
    function generateRandomNumber() public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        updateSeed(blockhash(block.number - 1)),
                        block.difficulty,
                        block.timestamp
                    )
                )
            );
    }

    // Hàm để sinh số ngẫu nhiên từ một số nguyên đã cho
    function generateRandomNumber(
        uint256 inputInteger
    ) public view returns (uint256) {
        // Sử dụng hàm băm keccak256 để chuyển số nguyên thành số ngẫu nhiên
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(
                    inputInteger,
                    block.timestamp,
                    block.difficulty
                )
            )
        );

        return randomNumber;
    }
}
