import ActionTypes from "../action/actionType";

const initialState = {
  workorderdetails: [],
  message: "",
  refresh: "",
};

function workOrderDetailReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_WORKORDERDETAIL_RESPONSE:
      return { ...state, workorderdetails: payload, refresh: true };
    case ActionTypes.ADD_WORKORDERDETAIL_RESPONSE:
      return { ...state, workorderdetails: payload, refresh: false };
    case ActionTypes.UPDATE_WORKORDERDETAIL_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DELETE_WORKORDERDETAIL_RESPONSE:
      return { message: payload, refresh: false };
    default:
      return state;
  }
}

export default workOrderDetailReducers;
