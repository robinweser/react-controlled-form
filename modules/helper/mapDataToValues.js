/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import type { Field } from '../../types/Field'

type DataType = { [fieldId: string]: Field }

export default function mapDataToValues(data: DataType) {
  return objectReduce(
    data,
    (values, { value }, fieldId) => {
      values[fieldId] = value
      return values
    },
    {}
  )
}
