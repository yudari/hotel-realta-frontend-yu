import ActionTypes from '../action/actionType'

const initialState = {
  city: [],
  message: 'Menampilkan City',
  refresh: '',
}

function cityReducer(state = initialState, action: any) {
  const { type, payload } = action
  // console.log("Payload province reducer", action.type);

  switch (type) {
    case ActionTypes.GET_CITY_RESPONSE:
      return { city: payload, refresh: true }
    case ActionTypes.GET_CITYBYPROVINCE_RESPONSE:
      return { ...state, city: payload.city, refresh: true }
    case ActionTypes.ADD_CITY_RESPONSE:
      return { message: payload.message, refresh: false }
    case ActionTypes.UPDATE_CITY_RESPONSE:
      return { message: payload.message, refresh: false }
    case ActionTypes.DEL_CITY_RESPONSE:
      return { message: payload, refresh: false }

    default:
      return state
  }
}

export default cityReducer
