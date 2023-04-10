import ActionTypes from "../action/actionType";

const initialState = {
  vendorProd: [],
  message: "",
  refresh: "",
};

export function vendorProdReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_VENDOR_PROD:
      return { state, vendorProd: payload.data, refresh: true };
    case ActionTypes.GET_VENDOR_PROD_RESPONSE:
      return { state, vendorProd: payload.data, refresh: false };
    case ActionTypes.UPDATE_VENDOR_PROD_RESPONSE:
      return { state, vendorProd: payload.data, refresh: false };
    case ActionTypes.DELETE_VENDOR_PROD_RESPONSE:
      return { state, vendors: payload.data, refresh: false };
    default:
      return state;
  }
}

export default vendorProdReducers;
