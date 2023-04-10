import ActionTypes from "../action/actionType";

const initialState = {
  servicetask: [],
  message: "Menampilkan Servicetask",
  refresh: "",
};

function servicetaskReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_SERVICETASK_RESPONSE:
      return { state, servicetask: payload, refresh: true };
    case ActionTypes.ADD_SERVICETASK_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_SERVICETASK_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_SERVICETASK_RESPONSE:
      return { message: payload, refresh: false };

    default:
      return state;
  }
}

export default servicetaskReducer;
