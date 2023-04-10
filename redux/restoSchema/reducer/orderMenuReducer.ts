import actionTypes from '../action/actionType'

const initialState = {
  orderMenus: [],
  message: '',
  refresh: '',
}

function ormeReducers(
  state = initialState,
  action: { type: any; payload: any }
) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_ORME_RESPONSE:
      return { state, orderMenus: payload, refresh: true }
    case actionTypes.ADD_ORME_RESPONSE:
      return { message: payload.message, refresh: false }
    case actionTypes.UPDATE_ORME_RESPONSE:
      return { message: payload.message, refresh: false }
    case actionTypes.DEL_ORME_RESPONSE:
      return { message: payload, refresh: false }

    default:
      return state
  }
}

export default ormeReducers
