import validateWithRequired from '../validateWithRequired'

describe('Validating required fields', () => {
  it('should return true', () => {
    expect(validateWithRequired({ isRequired: false, value: '' })).toBe(true)
    expect(validateWithRequired({ isRequired: true, value: 'test' })).toBe(true)
    expect(validateWithRequired({ isRequired: true, value: true })).toBe(true)
    expect(validateWithRequired({ isRequired: true, value: 12 })).toBe(true)
  })

  it('should return false', () => {
    expect(validateWithRequired({ isRequired: true, value: '' })).toBe(false)
    expect(validateWithRequired({ isRequired: true, value: false })).toBe(false)
  })
})
