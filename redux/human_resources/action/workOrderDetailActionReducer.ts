import ActionTypes from "./actionType";

export const doGetWorkOrderDetail = () => {
  return {
    type: ActionTypes.REQUEST_GET_WORKORDERDETAIL,
  };
};

export const doGetWorkOrderDetailResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_WORKORDERDETAIL_RESPONSE,
    payload,
  };
};

export const doAddWorkOrderDetail = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_ADD_WORKORDERDETAIL,
    payload,
  };
};

export const doAddWorkOrderDetailResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_WORKORDERDETAIL_RESPONSE,
    payload,
  };
};

export const doUpdateWorkOrderDetail = (...payload: any) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_WORKORDERDETAIL,
    payload,
  };
};

export const doUpdateWorkOrderDetailResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_WORKORDERDETAIL_RESPONSE,
    payload,
  };
};

export const doDeleteWorkOrderDetail = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_WORKORDERDETAIL,
    payload,
  };
};

export const doDeleteWorkOrderDetailResponse = (payload: any) => {
  return {
    type: ActionTypes.DELETE_WORKORDERDETAIL_RESPONSE,
    payload,
  };
};
