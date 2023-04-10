import ActionTypes from "./actionType";

export const doRequestGetCity = () => {
  return {
    type: ActionTypes.REQ_GET_CITY,
  };
};

export const doGetCityResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_CITY_RESPONSE,
    payload,
  };
};

export const doAddCity = (payload: any) => {
  return {
    type: ActionTypes.ADD_CITY,
    payload,
  };
};

export const doAddCityResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_CITY_RESPONSE,
    payload,
  };
};

export const doUpdateCity = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_CITY,
    payload,
  };
};

export const doUpdateCityResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_CITY_RESPONSE,
    payload,
  };
};

export const doDeleteCity = (payload: any) => {
  return {
    type: ActionTypes.DEL_CITY,
    payload,
  };
};

export const doDeleteCityResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_CITY_RESPONSE,
    payload,
  };
};

export const doRequestGetCityByProvinceById = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_CITYBYPROVINCE,
    payload,
  };
};

export const doRequestGetCityByProvinceByIdResponse  = (payload: any) => {
  return {
    type: ActionTypes.GET_CITYBYPROVINCE_RESPONSE,
    payload,
  };
};
