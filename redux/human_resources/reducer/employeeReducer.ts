import ActionTypes from "../action/actionType";

const initialState = {
  employees: [],
  message: "",
  refresh: false,
};

function empReducers(state = initialState, action: any) {
  const { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    case ActionTypes.GET_EMPLOYEE_RESPONSE:
      return { ...state, employees: payload, refresh: true };
    case ActionTypes.ADD_EMPLOYEE_RESPONSE:
      return { ...state, employees: payload, refresh: false };
    case ActionTypes.UPDATE_EMPLOYEE_RESPONSE:
      return { ...state, employees: payload, refresh: false };
    case ActionTypes.DELETE_EMPLOYEE_RESPONSE:
      return {
        message: payload,
        refresh: false,
      };
    default:
      return state;
  }
}

export default empReducers;
