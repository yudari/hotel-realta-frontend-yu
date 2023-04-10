import ActionTypes from "./actionType";

// == doGetEmployee menggunakan pagination
export const doGetEmployee = (page: number, limit: number) => {
  const payload = {
    page, limit
  }
  return {
    type: ActionTypes.REQUEST_GET_EMPLOYEE,
    payload,
  };
};

// == doGetEmployee tanpa pagination

// export const doGetEmployee = () => {
//   return {
//     type: ActionTypes.REQUEST_GET_EMPLOYEE,
//   };
// };

export const doGetEmployeeResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_EMPLOYEE_RESPONSE,
    payload,
  };
};

export const doAddEmployee = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_ADD_EMPLOYEE,
    payload,
  };
};

export const doAddEmployeeResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_RESPONSE,
    payload,
  };
};

export const doUpdateEmployee = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_EMPLOYEE,
    payload,
  };
};

export const doUpdateEmployeeResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE_RESPONSE,
    payload,
  };
};

export const doDeleteEmployee = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_EMPLOYEE,
    payload,
  };
};

export const doDeleteEmployeeResponse = (payload: any) => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE_RESPONSE,
    payload,
  };
};
