import ActionTypes from "./actionType";

export const doGetDepartmentHistory = () => {
  return {
    type: ActionTypes.REQUEST_GET_EMPOLYEEDEPARTMENTHISTORY,
  };
};

export const doGetDepartmentHistoryResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_EMPOLYEEDEPARTMENTHISTORY_RESPONSE,
    payload,
  };
};

export const doAddDepartmentHistory = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_ADD_EMPOLYEEDEPARTMENTHISTORY,
    payload,
  };
};

export const doAddDepartmentHistoryResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_EMPOLYEEDEPARTMENTHISTORY_RESPONSE,
    payload,
  };
};

export const doUpdateDepartmentHistory = (...payload: any) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_EMPOLYEEDEPARTMENTHISTORY,
    payload,
  };
};

export const doUpdateDepartmentHistoryResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_EMPOLYEEDEPARTMENTHISTORY_RESPONSE,
    payload,
  };
};

export const doDeleteDepartmentHistory = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_EMPOLYEEDEPARTMENTHISTORY,
    payload,
  };
};

export const doDeleteDepartmentHistoryResponse = (payload: any) => {
  return {
    type: ActionTypes.DELETE_EMPOLYEEDEPARTMENTHISTORY_RESPONSE,
    payload,
  };
};
