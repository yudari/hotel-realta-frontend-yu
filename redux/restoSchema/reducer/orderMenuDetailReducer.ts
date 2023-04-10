import actionTypes from '../action/actionType'

const initialState = {
  ordetMenus: [],
  message: '',
  refresh: '',
}

function ordetReducers(
  state = initialState,
  action: { type: any; payload: any }
) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_ORDET_RESPONSE:
      return { state, ordetMenus: payload, refresh: true }
    case actionTypes.ADD_ORDET_RESPONSE:
      return { message: payload.message, refresh: false }
    case actionTypes.UPDATE_ORDET_RESPONSE:
      return { message: payload.message, refresh: false }
    case actionTypes.DEL_ORDET_RESPONSE:
      return { message: payload, refresh: false }

    default:
      return state
  }
}

export default ordetReducers
