import ActionTypes from "./actionType";

export const doGetEmployeePayHistory = () => {
  return {
    type: ActionTypes.REQUEST_GET_EMPOLYEEPAYHISTORY,
  };
};

export const doGetEmployeePayHistoryResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_EMPLOYEEPAYHISTORY_RESPONSE,
    payload,
  };
};

export const doAddEmployeePayHistory = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_ADD_EMPOLYEEPAYHISTORY,
    payload,
  };
};

export const doAddEmployeePayHistoryResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_EMPLOYEEPAYHISTORY_RESPONSE,
    payload,
  };
};

export const doUpdateEmployeePayHistory = (...payload: any) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_EMPOLYEEPAYHISTORY,
    payload,
  };
};

export const doUpdateEmployeePayHistoryResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEEPAYHISTORY_RESPONSE,
    payload,
  };
};

export const doDeleteEmployeePayHistory = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_EMPOLYEEPAYHISTORY,
    payload,
  };
};

export const doDeleteEmployeePayHistoryResponse = (payload: any) => {
  return {
    type: ActionTypes.DELETE_EMPLOYEEPAYHISTORY_RESPONSE,
    payload,
  };
};
