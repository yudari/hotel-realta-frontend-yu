import ActionTypeHotel from '../action/actionTypeHotel'

const initialState = {
  hotels: [],
  message: '',
  refresh: '',
}

function hotelsReducers(state = initialState, action: any) {
  const { type, payload } = action
  // console.log(payload)
  switch (type) {
    case ActionTypeHotel.GET_HOTELS_RESPONSE:
      return { ...state, hotels: payload, refresh: true }
    case ActionTypeHotel.GET_HOTELS_SUPPORT_RESPONSE:
      return { state, hotels: payload, refresh: true }
    case ActionTypeHotel.ADD_HOTELS_RESPONSE:
      return { ...state, message: payload.message, refresh: false }
    case ActionTypeHotel.ADD_FACILITY_SUPPORT_HOTEL_RESPONSE:
      return { ...state, message: payload.message, refresh: false } //[id] support_hotel
    case ActionTypeHotel.UPDATE_HOTELS_RESPONSE:
      return { ...state, message: payload.message, refresh: false }
    case ActionTypeHotel.SWITCH_STATUS_HOTELS_RESPONSE:
      return { ...state, message: payload.message, refresh: false }

    //============
    case ActionTypeHotel.ADD_FACILITIES_RESPONSE:
      return { ...state, message: payload.message, refresh: false }
    default:
      return state
  }
}

export default hotelsReducers
