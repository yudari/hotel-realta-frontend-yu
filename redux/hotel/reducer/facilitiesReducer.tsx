import ActionTypeHotel from '../action/actionTypeHotel'

const initialState = {
  facilities: [],
  message: '',
  refresh: '',
}

function facilitiesReducers(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case ActionTypeHotel.GET_FACILITIES_RESPONSE:
      return { state, facilities: payload.data, refresh: true }

    default:
      return state
  }
}

export default facilitiesReducers
