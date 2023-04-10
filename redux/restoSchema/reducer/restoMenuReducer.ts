import actionTypes from '../action/actionType'

const initialState = {
  restoMenus: [],
  message: '',
  refresh: '',
}

function remeReducers(
  state = initialState,
  action: { type: any; payload: any }
) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_REME_RESPONSE:
      return { state, restoMenus: payload, refresh: true }
    case actionTypes.SEARCH_REME_RESPONSE:
      return { ...state, restoMenus: payload, refresh: true }
    case actionTypes.SORT_REME_RESPONSE:
      return { ...state, restoMenus: payload, refresh: true }
    case actionTypes.ADD_REME_RESPONSE:
      return { message: payload.message, refresh: false }
    case actionTypes.UPDATE_REME_RESPONSE:
      return { message: payload.message, refresh: false }
    case actionTypes.DEL_REME_RESPONSE:
      return { message: payload, refresh: false }

    default:
      return state
  }
}

export default remeReducers
