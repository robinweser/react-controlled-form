/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import type Field from '../../types/Field'

export default function composeData(
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
    {
      ...previousData,
    }
  )
}
