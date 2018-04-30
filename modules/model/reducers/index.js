import { handleActions } from 'redux-actions'

import initField from './initField'
import updateField from './updateField'
import initForm from './initForm'
import resetForm from './resetForm'
import updateState from './updateState'

import {
  INIT_FIELD,
  UPDATE_FIELD,
  INIT_FORM,
  RESET_FORM,
  UPDATE_STATE,
} from '../actionTypes'

const actions = {
  [INIT_FIELD]: initField,
  [UPDATE_FIELD]: updateField,
  [INIT_FORM]: initForm,
  [RESET_FORM]: resetForm,
  [UPDATE_STATE]: updateState,
}

export default handleActions(actions, {})
