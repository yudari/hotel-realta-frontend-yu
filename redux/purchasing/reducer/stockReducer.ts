import ActionTypes from "../action/actionType";

const initialState = {
  stock: [],
  message: "",
  refresh: "",
};

export function stockReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_STOCK_RESPONSE:
      return { state, stock: payload.data, refresh: true };
    case ActionTypes.ADD_STOCK_RESPONSE:
      return { state, stock: payload.data, refresh: true };
    case ActionTypes.UPDATE_STOCK_RESPONSE:
      return { state, stock: payload.data, refresh: true };

    case ActionTypes.GET_LIST_STOCK_RESPONSE:
      return { state, stock: payload.data, refresh: true };

    case ActionTypes.GET_STOCK_RESPONSE:
      return { state, stock: payload.data, refresh: true };


    case ActionTypes.GET_STOD_RESPONSE:
      return { state, stock: payload.data, refresh: true };
    default:
      return state;
  }
}

export default stockReducers;
