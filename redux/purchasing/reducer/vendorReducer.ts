import ActionTypes from "../action/actionType";

const initialState = {
  vendors: [],
  message: "",
  refresh: "",
};

export function vendorReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_VENDOR_RESPONSE:
      return { ...state, vendors: payload.data, refresh: true };

    case ActionTypes.GET_UPDATE_VENDOR_RESPONSE:
      return { state, vendors: payload.data, refresh: false };

    case ActionTypes.GET_DELETE_VENDOR_RESPONSE:
      return { state, vendors: payload.data, refresh: false };
    case ActionTypes.GET_ADD_VENDOR_RESPONSE:
      return { state, vendors: payload.data, refresh: false };

    case ActionTypes.GET_VENDOR_PROD:
      return { state, vendors: payload.data, refresh: true };
    case ActionTypes.SEARCH_VENDOR_RESPONSE:
      return { state, vendors: payload.data, refresh: true };

    default:
      return state;
  }
}

export default vendorReducers;
