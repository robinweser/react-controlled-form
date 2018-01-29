import mapDataToValues from '../mapDataToValues'

describe('Mapping data to values', () => {
  it('should return a fieldId:value Mapping', () => {
    expect(
      mapDataToValues({
        foo: { value: 'test', isValid: true },
        bar: { value: true, isRequired: false },
      })
    ).toEqual({ foo: 'test', bar: true })
  })
})
