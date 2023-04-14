import ActionTypeHotel from '../action/actionTypeHotel'

const initialState = {
  cityHotel: [],
  message: '',
  refresh: '',
}

function cityHotelReducers(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case ActionTypeHotel.GET_CITY_RESPONSE:
      return { state, cityHotel: payload.data, refresh: true }
    default:
      return state
  }
}

export default cityHotelReducers
