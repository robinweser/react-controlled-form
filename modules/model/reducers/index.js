import { handleActions } from 'redux-actions'

import initField from './initField'
import updateField from './updateField'
import initForm from './initForm'

import { INIT_FIELD, UPDATE_FIELD, INIT_FORM, RESET_FORM } from '../actionTypes'

const actions = {
  [INIT_FIELD]: initField,
  [UPDATE_FIELD]: updateField,
  [INIT_FORM]: initForm,
  [RESET_FORM]: initForm
}

export default handleActions(actions, {})
