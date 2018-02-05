/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import type { Field } from '../../types/Field'

type DataType = { [fieldId: string]: Field }

export default function mapDataToValues(data: DataType) {
  return objectReduce(
    data,
    (values, fieldData, fieldId) => {
      values[fieldId] = fieldData.value
      return values
    },
    {}
  )
}
