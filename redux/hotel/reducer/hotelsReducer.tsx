import ActionTypeHotel from '../action/actionTypeHotel'

const initialState = {
  hotels: [],
  message: '',
  refresh: '',
}

function hotelsReducers(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case ActionTypeHotel.GET_HOTELS_RESPONSE:
      return { ...state, hotels: payload, refresh: true }
    case ActionTypeHotel.ADD_HOTELS_RESPONSE:
      return { ...state, message: payload.message, refresh: false }
    case ActionTypeHotel.UPDATE_HOTELS_RESPONSE:
      return { ...state, message: payload.message, refresh: false }
    case ActionTypeHotel.SWITCH_STATUS_HOTELS_RESPONSE:
      return { ...state, message: payload.message, refresh: false }
    case ActionTypeHotel.DEL_HOTELS_RESPONSE:
      return { ...state, message: payload.message, refresh: false }

    //FACILITY SUPPORT HOTEL
    case ActionTypeHotel.GET_FACILITY_SUPPORT_HOTEL_RESPONSE:
      return { state, hotels: payload, refresh: true }
    case ActionTypeHotel.ADD_FACILITY_SUPPORT_HOTEL_RESPONSE:
      return { ...state, message: payload.message, refresh: false } //[id] support_hotel
    case ActionTypeHotel.DEL_FACILITY_SUPPORT_HOTEL_RESPONSE:
      return { ...state, message: payload.message, refresh: false } //[id] support_hotel

    //============FACILITIES
    case ActionTypeHotel.ADD_FACILITIES_RESPONSE:
      return { ...state, message: payload.message, refresh: false }
    case ActionTypeHotel.UPDATE_FACILITIES_RESPONSE:
      return { ...state, message: payload.message, refresh: false } //[id] facilities
    case ActionTypeHotel.DEL_FACILITIES_RESPONSE:
      return { ...state, message: payload.message, refresh: false }

    //========FACILITY PHOTOS
    case ActionTypeHotel.ADD_FACILITY_PHOTOS_RESPONSE:
      return { ...state, message: payload.message, refresh: false } //Upload Photos

    default:
      return state
  }
}

export default hotelsReducers
