import { handleActions } from 'redux-actions'

export default function handleReducer(actions, initialState) {
  const actionHandler = Object.keys(actions).reduce(
    (handler, type) => {
      handler[type] = (state, action) => {
        if (action.payload && action.payload.errors) {
          console.log(
            action.payload.message,
            null,
            'Something went wrong',
            'Ok'
          )
          return state
        }
        return actions[type](state, action)
      }

      return handler
    },
    {}
  )

  return handleActions(actionHandler, initialState)
}
