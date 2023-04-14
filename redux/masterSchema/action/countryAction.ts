import ActionTypes from "./actionType";

export const doRequestGetCountry = () => {
  return {
    type: ActionTypes.REQ_GET_COUNTRY,
  };
};

export const doGetCountryResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_COUNTRY_RESPONSE,
    payload,
  };
};

export const doAddCountry = (payload: any) => {
  return {
    type: ActionTypes.ADD_COUNTRY,
    payload,
  };
};

export const doAddCountryResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_COUNTRY_RESPONSE,
    payload,
  };
};

export const doUpdateCountry = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_COUNTRY,
    payload,
  };
};

export const doUpdateCountryResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_COUNTRY_RESPONSE,
    payload,
  };
};

export const doDeleteCountry = (payload: any) => {
  return {
    type: ActionTypes.DEL_COUNTRY,
    payload,
  };
};

export const doDeleteCountryResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_COUNTRY_RESPONSE,
    payload,
  };
};

export const doRequestGetCountryByRegionById = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_COUNTRYBYREGION,
    payload,
  };
};

export const doRequestGetCountryByRegionByIdResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_COUNTRYBYREGION_RESPONSE,
    payload,
  };
};
