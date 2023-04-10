import ActionTypes from "./actionType";

export const doRequestGetCategoryGroup = () => {
  return {
    type: ActionTypes.REQ_GET_CATEGORYGROUP,
  };
};

export const doGetCategoryGroupResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_CATEGORYGROUP_RESPONSE,
    payload,
  };
};

export const doAddCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.ADD_CATEGORYGROUP,
    payload,
  };
};

export const doAddCategoryGroupResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_CATEGORYGROUP_RESPONSE,
    payload,
  };
};
export const doUpdateCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_CATEGORYGROUP,
    payload,
  };
};
export const doUpdateCategoryGroupResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_CATEGORYGROUP_RESPONSE,
    payload,
  };
};
export const doDeleteCategoryGroup = (payload: any) => {
  return {
    type: ActionTypes.DEL_CATEGORYGROUP,
    payload,
  };
};
export const doDeleteCategoryGroupResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_CATEGORYGROUP_RESPONSE,
    payload,
  };
};
