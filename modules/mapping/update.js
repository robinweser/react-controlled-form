/* @flow */
import {
  updateField as updateFieldAction,
  updateState as updateStateAction,
} from '../model/actions'

import type { Field } from '../../types/Field'

export function mapDispatchToProps(dispatch: Function, { formId }: Object) {
  return {
    updateField: (fieldId: string, fieldData: Field) =>
      dispatch(
        updateFieldAction({
          formId,
          fieldId,
          ...fieldData,
        })
      ),
    updateState: (newState: any) =>
      dispatch(
        updateStateAction({
          formId,
          newState,
        })
      ),
  }
}
