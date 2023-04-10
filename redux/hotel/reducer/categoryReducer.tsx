import ActionTypeHotel from '../action/actionTypeHotel'

const initialState = {
  categoryFaci: [],
  messageCate: '',
  refreshCate: '',
}

function categoryFaciReducers(state = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case ActionTypeHotel.GET_CATEGORY_RESPONSE:
      return { state, categoryFaci: payload.data, refreshCate: true }
    default:
      return state
  }
}

export default categoryFaciReducers
