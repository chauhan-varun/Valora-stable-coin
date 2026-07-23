// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title OracleStalenessLib
 * @notice Helper library to detect and revert on stale Chainlink oracle prices
 */
library OracleStalenessLib {
    error OracleStalenessLib__StalePrice();
    error OracleStalenessLib__InvalidPrice();

    uint256 private constant TIMEOUT = 3600 seconds; // 1 hour

    function checkForStalePrice(
        int256 answer,
        uint256 updatedAt
    ) internal view returns (int256) {
        if (answer <= 0) {
            revert OracleStalenessLib__InvalidPrice();
        }
        if (block.timestamp - updatedAt > TIMEOUT) {
            revert OracleStalenessLib__StalePrice();
        }
        return answer;
    }
}
