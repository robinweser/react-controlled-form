/* @flow */
import { createStore, combineReducers } from 'redux'
import { formReducer } from 'react-controlled-form'

export default createStore(combineReducers({ form: formReducer }))
