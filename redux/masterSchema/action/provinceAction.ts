import ActionTypes from "./actionType";

export const doRequestGetProvince = () => {
  return {
    type: ActionTypes.REQ_GET_PROVINCE,
  };
};

export const doGetProvinceResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_PROVINCE_RESPONSE,
    payload,
  };
};

export const doAddProvince = (payload: any) => {
  return {
    type: ActionTypes.ADD_PROVINCE,
    payload,
  };
};

export const doAddProvinceResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_PROVINCE_RESPONSE,
    payload,
  };
};

export const doUpdateProvince = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PROVINCE,
    payload,
  };
};

export const doUpdateProvinceResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PROVINCE_RESPONSE,
    payload,
  };
};

export const doDeleteProvince = (payload: any) => {
  return {
    type: ActionTypes.DEL_PROVINCE,
    payload,
  };
};

export const doDeleteProvinceResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_PROVINCE_RESPONSE,
    payload,
  };
};

export const doRequestGetProvinceByCountryById = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_PROVINCEBYCOUNTRY,
    payload,
  };
};

export const doRequestGetProvinceByCountryByIdResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_PROVINCEBYCOUNTRY_RESPONSE,
    payload,
  };
};
