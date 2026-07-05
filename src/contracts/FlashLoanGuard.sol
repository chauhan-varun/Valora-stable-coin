// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FlashLoanGuard
 * @notice Reentrancy and single-block flash loan attack prevention guard
 */
abstract contract FlashLoanGuard {
    mapping(address => uint256) private _lastInteractionBlock;

    error FlashLoanGuard__SameBlockInteraction();

    modifier nonSameBlock(address account) {
        if (_lastInteractionBlock[account] == block.number) {
            revert FlashLoanGuard__SameBlockInteraction();
        }
        _lastInteractionBlock[account] = block.number;
        _;
    }

    function getLastInteractionBlock(address account) external view returns (uint256) {
        return _lastInteractionBlock[account];
    }
}
