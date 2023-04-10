import ActionTypes from "../action/actionType";

const initialState = {
  priceitems: [],
  message: "Menampilkan PriceItems",
  refresh: "",
};

function priceitemsReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_PRICEITEMS_RESPONSE:
      return { state, priceitems: payload, refresh: true };
    case ActionTypes.ADD_PRICEITEMS_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_PRICEITEMS_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_PRICEITEMS_RESPONSE:
      return { message: payload, refresh: false };

    default:
      return state;
  }
}

export default priceitemsReducer;
