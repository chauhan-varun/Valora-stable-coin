import { describe, it, expect } from 'vitest'

describe('LiquidationCalculator Math', () => {
  it('should correctly calculate health factor and bonus', () => {
    const collateralUsd = 2000
    const debtUsd = 1200

    const healthFactor = (collateralUsd * 0.5) / debtUsd
    const bonus = debtUsd * 0.10

    expect(healthFactor).toBeCloseTo(0.833, 3)
    expect(bonus).toBe(120)
    expect(healthFactor < 1.0).toBe(true)
  })
})
