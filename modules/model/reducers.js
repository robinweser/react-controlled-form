import 'whatwg-fetch'

import handleReducer from '../utils/handleReducer'
import {
  UPDATE_FORM,
  INIT_FORM,
  CLEAR_FORM,
  INIT_FIELD
} from '../constants/actionTypes'

export default handleReducer(
  {
    [INIT_FORM]: (state, action) => ({
      ...state,
      [action.payload]: state[action.payload] || {}
    }),
    [CLEAR_FORM]: (state, action) => ({
      ...state,
      [action.payload]: {}
    }),
    [UPDATE_FORM]: (state, action) => ({
      ...state,
      [action.payload.formId]: {
        ...state[action.payload.formId],
        [action.payload.fieldId]: {
          ...state[action.payload.formId][action.payload.fieldId],
          value: action.payload.value,
          isValid: action.payload.isValid,
          isTouched: true
        }
      }
    }),
    [INIT_FIELD]: (state, action) => ({
      ...state,
      [action.payload.formId]: {
        ...state[action.payload.formId],
        [action.payload.fieldId]: {
          value: action.payload.defaultValue !== undefined
            ? action.payload.defaultValue
            : '',
          isValid: action.payload.isValid || !action.payload.isRequired,
          isRequired: action.payload.isRequired || false,
          isTouched: false,
          ...state[action.payload.formId][action.payload.fieldId]
        }
      }
    })
  },
  {}
)
