import actionTypes from '../action/actionType'

const initialState = {
  restoPhotos: [],
  message: '',
  refresh: '',
}

function rephoReducers(
  state = initialState,
  action: { type: any; payload: any }
) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_REPHO_RESPONSE:
      return { ...state, restoPhotos: payload, refresh: true }
    case actionTypes.ADD_REPHO_RESPONSE:
      return { message: payload.message, refresh: false }
    case actionTypes.UPDATE_REPHO_RESPONSE:
      return { message: payload.message, refresh: false }
    case actionTypes.DEL_REPHO_RESPONSE:
      return { message: payload, refresh: false }

    default:
      return state
  }
}

export default rephoReducers
