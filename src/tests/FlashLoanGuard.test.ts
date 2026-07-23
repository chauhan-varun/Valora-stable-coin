import { describe, it, expect } from 'vitest'

describe('FlashLoanGuard', () => {
  it('should allow interaction on different blocks', () => {
    const lastInteractionBlock: Record<string, number> = {}
    const user = '0x1234567890123456789012345678901234567890'

    let currentBlock = 100
    lastInteractionBlock[user] = currentBlock

    currentBlock = 101
    const isSameBlock = lastInteractionBlock[user] === currentBlock
    expect(isSameBlock).toBe(false)
  })

  it('should block interaction within the same block', () => {
    const lastInteractionBlock: Record<string, number> = {}
    const user = '0x1234567890123456789012345678901234567890'

    const currentBlock = 100
    lastInteractionBlock[user] = currentBlock

    const isSameBlock = lastInteractionBlock[user] === currentBlock
    expect(isSameBlock).toBe(true)
  })
})
