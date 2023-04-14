import ActionTypes from "../action/actionType";

const initialState = {
  workorders: [],
  message: "",
  refresh: false,
};

function workOrdersReducers(state = initialState, action: any) {
  const { type, payload } = action;
  // console.log(type);
  switch (type) {
    case ActionTypes.GET_WORKORDERS_RESPONSE:
      return { ...state, workorders: payload, refresh: true };
    case ActionTypes.ADD_WORKORDERS_RESPONSE:
      return { ...state, workorders: payload, refresh: false };
    case ActionTypes.UPDATE_WORKORDERS_RESPONSE:
      return { message: payload, refresh: false };
    case ActionTypes.DELETE_WORKORDERS_RESPONSE:
      return {
        message: payload,
        refresh: false,
      };
    default:
      return state;
  }
}

export default workOrdersReducers;
