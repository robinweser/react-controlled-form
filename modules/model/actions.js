import { createAction } from 'redux-actions'
import {
  UPDATE_FORM,
  INIT_FORM,
  CLEAR_FORM,
  INIT_FIELD
} from '../constants/actionTypes'

export const initForm = createAction(INIT_FORM)
export const updateForm = createAction(UPDATE_FORM)
export const clearForm = createAction(CLEAR_FORM)

export const initField = createAction(INIT_FIELD)
