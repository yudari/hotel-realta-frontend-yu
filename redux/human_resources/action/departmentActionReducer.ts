import ActionTypes from "./actionType";

export const doGetDepartment = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_GET_DEPARTMENT,
    payload,
  };
};

export const doGetDepartmentResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_DEPARTMENT_RESPONSE,
    payload,
  };
};

export const doAddDepartment = (payload: any) => {
  // console.log(payload)
  return {
    type: ActionTypes.REQUEST_ADD_DEPARTMENT,
    payload,
  };
};

export const doAddDepartmentResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_DEPARTMENT_RESPONSE,
    payload,
  };
};

export const doUpdateDepartment = (...payload: any) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_DEPARTMENT,
    payload,
  };
};

export const doUpdateDepartmentResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_DEPARTMENT_RESPONSE,
    payload,
  };
};

export const doDeleteDepartment = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_DEPARTMENT,
    payload,
  };
};

export const doDeleteDepartmentResponse = (payload: any) => {
  return {
    type: ActionTypes.DELETE_DEPARTMENT_RESPONSE,
    payload,
  };
};
