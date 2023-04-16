import ActionTypes from "../action/actionType";

const initialState = {
  address: [],
  message: "Menampilkan Address",
  refresh: "",
};

function addressReducer(state = initialState, action: any) {
  const { type, payload } = action;
  // console.log("Payload province reducer", action.type);

  switch (type) {
    case ActionTypes.GET_ADDRESS_RESPONSE:
      return { address: payload, refresh: true };
    case ActionTypes.GET_ADDRESSBYCITY_RESPONSE:
      return { ...state, address: payload.addresses, refresh: true };
    case ActionTypes.ADD_ADDRESS_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_CITY_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_CITY_RESPONSE:
      return { message: payload, refresh: false };

    default:
      return state;
  }
}

export default addressReducer;
