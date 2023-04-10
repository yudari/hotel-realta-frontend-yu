import ActionTypes from "./actionType";

export const doRequestGetRegion = () => {
  return {
    type: ActionTypes.REQ_GET_REGION,
  };
};

export const doGetRegionResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_REGION_RESPONSE,
    payload,
  };
};

export const doAddRegion = (payload: any) => {
  return {
    type: ActionTypes.ADD_REGION,
    payload,
  };
};

export const doAddRegionResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_REGION_RESPONSE,
    payload,
  };
};

export const doUpdateRegion = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_REGION,
    payload,
  };
};

export const doUpdateRegionResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_REGION_RESPONSE,
    payload,
  };
};

export const doDeleteRegion = (payload: any) => {
  return {
    type: ActionTypes.DEL_REGION,
    payload,
  };
};

export const doDeleteRegionResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_REGION_RESPONSE,
    payload,
  };
};
