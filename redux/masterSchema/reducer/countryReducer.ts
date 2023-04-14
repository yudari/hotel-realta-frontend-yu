import ActionTypes from "../action/actionType";

const initialState = {
  country: [],
  message: "Menampilkan Country",
  refresh: "",
};

function countryReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_COUNTRY_RESPONSE:
      return { country: payload, refresh: true };
    case ActionTypes.GET_COUNTRYBYREGION_RESPONSE:
      return { ...state, country: payload.country, refresh: true };
    case ActionTypes.ADD_COUNTRY_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_COUNTRY_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_COUNTRY_RESPONSE:
      return { message: payload, refresh: false };

    default:
      return state;
  }
}

export default countryReducer;
