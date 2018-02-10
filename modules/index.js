import Field from './components/Field'
import Form from './components/Form'

import validateWithRequired from './helper/validateWithRequired'
import mapDataToValues from './helper/mapDataToValues'

import { REDUCER_NAMESPACE } from './model/reducers/_namespace'
import reducer from './model/reducers'

const formReducer = {
  [REDUCER_NAMESPACE]: reducer,
}

export {
  // components
  Field,
  Form,
  // reducer
  formReducer,
  // helper
  validateWithRequired,
  mapDataToValues,
}
