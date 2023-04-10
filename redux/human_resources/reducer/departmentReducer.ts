import ActionTypes from "../action/actionType";

const initialState = {
  departments: [],
  message: "",
  refresh: "",
};

function deptReducers(state = initialState, action: any) {
  const { type, payload } = action;
  // console.log(type);
  switch (type) {
    case ActionTypes.GET_DEPARTMENT_RESPONSE:
      return { ...state, departments: payload, refresh: true };
    case ActionTypes.ADD_DEPARTMENT_RESPONSE:
      return { ...state, departments: payload, refresh: false };
    case ActionTypes.UPDATE_DEPARTMENT_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DELETE_DEPARTMENT_RESPONSE:
      return {
        message: payload,
        refresh: false,
      };
    default:
      return state;
  }
}

export default deptReducers;
