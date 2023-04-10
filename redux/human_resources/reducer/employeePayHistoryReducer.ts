import ActionTypes from "../action/actionType";

const initialState = {
  employeepayhistorys: [],
  message: "",
  refresh: "",
};

function employeePayHistoryReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_EMPLOYEEPAYHISTORY_RESPONSE:
      return { ...state, employeepayhistorys: payload, refresh: true };
    case ActionTypes.ADD_EMPLOYEEPAYHISTORY_RESPONSE:
      return { ...state, employeepayhistorys: payload, refresh: false };
    case ActionTypes.UPDATE_EMPLOYEEPAYHISTORY_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DELETE_EMPLOYEEPAYHISTORY_RESPONSE:
      return { message: payload, refresh: false };
    default:
      return state;
  }
}

export default employeePayHistoryReducers;
