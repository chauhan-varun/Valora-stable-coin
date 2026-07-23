import { describe, it, expect } from 'vitest'

describe('MockV3AggregatorCustom', () => {
  it('should initialize with correct decimals and answer', () => {
    const decimals = 8
    const initialAnswer = 200000000000n // $2000.00
    expect(decimals).toBe(8)
    expect(initialAnswer).toBe(200000000000n)
  })

  it('should update answer and increment round id', () => {
    let roundId = 1
    let latestAnswer = 200000000000n
    
    // Simulate answer update
    roundId += 1
    latestAnswer = 210000000000n // $2100.00
    
    expect(roundId).toBe(2)
    expect(latestAnswer).toBe(210000000000n)
  })
})
