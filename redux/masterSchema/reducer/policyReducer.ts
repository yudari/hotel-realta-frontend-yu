import ActionTypes from "../action/actionType";

const initialState = {
  policy: [],
  message: "Menampilkan Policy",
  refresh: "",
};

function policyReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_POLICY_RESPONSE:
      return { state, policy: payload, refresh: true };
    case ActionTypes.ADD_POLICY_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_POLICY_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_POLICY_RESPONSE:
      return { message: payload, refresh: false };

    default:
      return state;
  }
}

export default policyReducer;
