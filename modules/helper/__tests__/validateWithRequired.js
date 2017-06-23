import validateWithRequired from '../validateWithRequired'

describe('Validating required fields', () => {
  it('should return true', () => {
    expect(validateWithRequired('', false)).toBe(true)
    expect(validateWithRequired('test', true)).toBe(true)
    expect(validateWithRequired(true, true)).toBe(true)
    expect(validateWithRequired(12, true)).toBe(true)
  })

  it('should return false', () => {
    expect(validateWithRequired('', true)).toBe(false)
    expect(validateWithRequired(' ', true)).toBe(false)
    expect(validateWithRequired(false, true)).toBe(false)
  })
})
