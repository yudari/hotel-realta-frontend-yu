import ActionTypes from "./actionType";

export const doGetVendor = (search: string,page: number, limit: number) => {
  const payload = {
    search,
    page,
    limit,
  };
  return {
    type: ActionTypes.REQUEST_GET_VENDOR,
    payload,
  };
};

export const doGetVendorResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_VENDOR_RESPONSE,
    payload,
  };
};

export const doAddVendor = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_ADD_VENDOR,
    payload,
  };
};

export const doAddVendorResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_ADD_VENDOR_RESPONSE,
    payload,
  };
};

export const doUpdateVendor = (...payload: any[]) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_VENDOR,
    payload,
  };
};

export const doUpdateVendorResponse = (...payload: any[]) => {
  return {
    type: ActionTypes.GET_UPDATE_VENDOR_RESPONSE,
    payload,
  };
};

export const doDeleteVendor = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_VENDOR,
    payload,
  };
};

export const doDeleteVendorResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_DELETE_VENDOR_RESPONSE,
    payload,
  };
};

export const doSearch = (payload: any) => {
  return {
    type: ActionTypes.SEARCH_VENDOR_REQUEST,
    payload,
  };
};

export const doSearchResponse = (payload: any) => {
  return {
    type: ActionTypes.SEARCH_VENDOR_RESPONSE,
    payload,
  };
};

export const doAddProdVendor = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_GET_VENDOR_PROD,
    payload,
  };
};

export const doAddProdVendorResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_VENDOR_PROD_RESPONSE,
    payload,
  };
};
