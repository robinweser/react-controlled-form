/* @flow */
import objectReduce from './objectReduce'

import type Field from '../../types/Field'

export default function composeFieldData(
  previousData: Field,
  newData: Field
): Field {
  const prevData = { ...previousData }

  return objectReduce(
    newData,
    (data, value, property) => {
      if (value !== undefined) {
        data[property] = value
      }

      return data
    },
    prevData
  )
}
