/* @flow */
import objectReduce from './objectReduce'
import cloneObject from './cloneObject'

import type Field from '../../types/Field'

export default function composeFieldData(
  previousData: Field,
  newData: Field
): Field {
  return objectReduce(
    newData,
    (data, value, property) => {
      if (value !== undefined) {
        data[property] = value
      }

      return data
    },
    // we clone the previous data to ensure
    // immutable data structures for Redux
    cloneObject(previousData)
  )
}
