import ActionTypes from "../action/actionType";

const initialState = {
  orders: [],
  message: "",
  refresh: "",
};

export function orderReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_LIST_ORDER_RESPONSE:
      return { ...state, orders: payload.data, refresh: true };
    case ActionTypes.UPDATE_LIST_ORDER_RESPONSE:
      return { ...state, orders: payload.data, refresh: true };
    case ActionTypes.DEL_LIST_ORDER_RESPONSE:
      return { ...state, orders: payload.data, refresh: true };
    case ActionTypes.GET_ORDER_DETAIL_RESPONSE:
      return { ...state, orders: payload.data, refresh: true };

    default:
      return state;
  }
}

export default orderReducers;
