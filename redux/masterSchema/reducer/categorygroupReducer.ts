import ActionTypes from "../action/actionType";

const initialState = {
  categorygroup: [],
  message: "Menampilkan CategoryGroup",
  refresh: "",
};

function categorygroupReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_CATEGORYGROUP_RESPONSE:
      return { state, categorygroup: payload, refresh: true };
    case ActionTypes.ADD_CATEGORYGROUP_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_CATEGORYGROUP_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_CATEGORYGROUP_RESPONSE:
      return { message: payload, refresh: false };

    default:
      return state;
  }
}

export default categorygroupReducer;