'use client'

import { useState } from 'react'

export function LiquidationCalculator() {
  const [collateralValue, setCollateralValue] = useState<string>('')
  const [debtAmount, setDebtAmount] = useState<string>('')

  const collat = parseFloat(collateralValue) || 0
  const debt = parseFloat(debtAmount) || 0

  // Health factor formula: (collateralValue * 0.5) / debtAmount
  const healthFactor = debt > 0 ? (collat * 0.5) / debt : 0
  const rewardBonus = debt > 0 ? (debt * 1.10) : 0

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg p-5 border border-border shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Liquidation Simulator</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">User Collateral Value ($)</label>
          <input
            type="number"
            value={collateralValue}
            onChange={(e) => setCollateralValue(e.target.value)}
            placeholder="e.g. 2000"
            className="w-full px-3 py-2 rounded bg-background border border-input text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">Total Debt Minted (DSC)</label>
          <input
            type="number"
            value={debtAmount}
            onChange={(e) => setDebtAmount(e.target.value)}
            placeholder="e.g. 1200"
            className="w-full px-3 py-2 rounded bg-background border border-input text-sm"
          />
        </div>

        {debt > 0 && (
          <div className="p-3 bg-secondary/20 rounded border border-border text-xs space-y-1">
            <div className="flex justify-between">
              <span>Estimated Health Factor:</span>
              <span className={`font-bold ${healthFactor < 1.0 ? 'text-red-500' : 'text-green-500'}`}>
                {healthFactor.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Liquidator Reward (10% Bonus):</span>
              <span className="font-semibold text-foreground">${rewardBonus.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
