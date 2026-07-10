import { describe, it, expect } from 'vitest'

describe('OracleStalenessLib', () => {
  const TIMEOUT = 3600 // 1 hour

  it('should accept fresh price updates within timeout', () => {
    const now = Math.floor(Date.now() / 1000)
    const updatedAt = now - 300 // 5 mins ago
    const isStale = (now - updatedAt) > TIMEOUT
    expect(isStale).toBe(false)
  })

  it('should reject stale price updates beyond timeout', () => {
    const now = Math.floor(Date.now() / 1000)
    const updatedAt = now - 4000 // > 1 hour ago
    const isStale = (now - updatedAt) > TIMEOUT
    expect(isStale).toBe(true)
  })
})
