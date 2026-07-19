// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VaultHealthChecker
 * @notice Validates collateralization ratio invariants for vault accounts
 */
contract VaultHealthChecker {
    uint256 public constant MIN_HEALTH_FACTOR = 1e18;
    uint256 public constant LIQUIDATION_THRESHOLD = 50;

    function checkVaultHealth(uint256 totalDscMinted, uint256 collateralValueInUsd)
        public
        pure
        returns (bool isHealthy, uint256 healthFactor)
    {
        if (totalDscMinted == 0) return (true, type(uint256).max);
        
        uint256 collateralAdjustedForThreshold = (collateralValueInUsd * LIQUIDATION_THRESHOLD) / 100;
        healthFactor = (collateralAdjustedForThreshold * 1e18) / totalDscMinted;
        isHealthy = healthFactor >= MIN_HEALTH_FACTOR;
    }
}
