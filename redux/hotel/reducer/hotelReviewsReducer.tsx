import ActionTypeHotel from '../action/actionTypeHotel'

const initialState = {
  hore: [],
  message: '',
  refresh: '',
}

function hotelReviewsReducers(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case ActionTypeHotel.GET_HOTEL_REVIEWS_RESPONSE:
      console.log(payload.data)
      return { state, hore: payload.data, refresh: true }
    default:
      return state
  }
}

export default hotelReviewsReducers
