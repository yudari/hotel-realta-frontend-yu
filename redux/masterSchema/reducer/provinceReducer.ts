import ActionTypes from "../action/actionType";

const initialState = {
  province: [],
  message: "Menampilkan Province",
  refresh: "",
};

function provinceReducer(state = initialState, action: any) {
  const { type, payload } = action;
  // console.log("Payload province reducer", action.type);

  switch (type) {
    case ActionTypes.GET_PROVINCE_RESPONSE:
      return { province: payload, refresh: true };
    case ActionTypes.GET_PROVINCEBYCOUNTRY_RESPONSE:
      return { ...state, province: payload.provinces, refresh: true };
    case ActionTypes.ADD_PROVINCE_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_PROVINCE_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_PROVINCE_RESPONSE:
      return { message: payload, refresh: false };

    default:
      return state;
  }
}

export default provinceReducer;
