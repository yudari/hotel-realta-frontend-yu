import ActionTypes from "./actionType";

export const doGetWorkOrders = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_GET_WORKORDERS,
    payload,
  };
};

export const doGetWorkOrdersResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_WORKORDERS_RESPONSE,
    payload,
  };
};

export const doAddWorkOrders = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_ADD_WORKORDERS,
    payload,
  };
};

export const doAddWorkOrdersResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_WORKORDERS_RESPONSE,
    payload,
  };
};

export const doUpdateWorkOrders = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_WORKORDERS,
    payload,
  };
};

export const doUpdateWorkOrdersResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_WORKORDERS_RESPONSE,
    payload,
  };
};

export const doDeleteWorkOrders = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_WORKORDERS,
    payload,
  };
};

export const doDeleteWorkOrdersResponse = (payload: any) => {
  return {
    type: ActionTypes.DELETE_WORKORDERS_RESPONSE,
    payload,
  };
};
