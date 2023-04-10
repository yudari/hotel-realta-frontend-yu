import ActionTypes from "../action/actionType";

const initialState = {
  region: [],
  message: "Menampilkan Region",
  refresh: "",
};

function regionReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_REGION_RESPONSE:
      return { state,region: payload, refresh: true };
    case ActionTypes.ADD_REGION_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_REGION_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_REGION_RESPONSE:
      return { message: payload, refresh: false };

    default:
      return state;
  }
}

export default regionReducer;
