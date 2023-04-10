import ActionTypes from "../action/actionType";

const initialState = {
  departmenthistorys: [],
  message: "",
  refresh: "",
};

function departmentHistoryReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_EMPOLYEEDEPARTMENTHISTORY_RESPONSE:
      return { ...state, departmenthistorys: payload, refresh: true };
    case ActionTypes.ADD_EMPOLYEEDEPARTMENTHISTORY_RESPONSE:
      return { ...state, departmenthistorys: payload, refresh: false };
    case ActionTypes.UPDATE_EMPOLYEEDEPARTMENTHISTORY_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DELETE_EMPOLYEEDEPARTMENTHISTORY_RESPONSE:
      return { message: payload, refresh: false };
    default:
      return state;
  }
}

export default departmentHistoryReducers;
