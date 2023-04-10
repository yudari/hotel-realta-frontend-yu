import ActionTypeHotel from '../action/actionTypeHotel'

const initialState = {
  membersFaci: [],
  messageMemb: '',
  refreshMemb: '',
}

function membersFaciReducers(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case ActionTypeHotel.GET_MEMBERS_RESPONSE:
      return { state, membersFaci: payload.data, refreshMemb: true }
    default:
      return state
  }
}

export default membersFaciReducers
