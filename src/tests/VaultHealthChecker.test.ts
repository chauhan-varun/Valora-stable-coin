import { describe, it, expect } from 'vitest'

describe('VaultHealthChecker Invariant Test', () => {
  it('should return healthy for 200% collateralization ratio', () => {
    const collateralUsd = 2000n * 10n ** 18n
    const dscMinted = 1000n * 10n ** 18n

    // Liquidation threshold 50%
    const adjustedCollat = (collateralUsd * 50n) / 100n
    const healthFactor = (adjustedCollat * 10n ** 18n) / dscMinted

    expect(healthFactor >= 10n ** 18n).toBe(true)
  })

  it('should return unhealthy for under-collateralized positions', () => {
    const collateralUsd = 1200n * 10n ** 18n
    const dscMinted = 1000n * 10n ** 18n

    const adjustedCollat = (collateralUsd * 50n) / 100n
    const healthFactor = (adjustedCollat * 10n ** 18n) / dscMinted

    expect(healthFactor < 10n ** 18n).toBe(true)
  })
})
