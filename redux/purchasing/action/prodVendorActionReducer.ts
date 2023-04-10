import ActionTypes from "./actionType";


export const doAddProdVendor = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_ADD_VENDOR_PROD,
    payload,
  };
};

export const doAddProdVendorResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_VENDOR_PROD_RESPONSE,
    payload,
  };
};

export const doUpdateProdVendor = (...payload: any[]) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_VENDOR_PROD,
    payload,
  };
};

export const doUpdateProdVendorResponse = (...payload: any[]) => {
  return {
    type: ActionTypes.UPDATE_VENDOR_PROD_RESPONSE,
    payload,
  };
};

export const doDeleteProdVendor = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_VENDOR_PROD,
    payload,
  };
};

export const doDeleteProdVendorResponse = (payload: any) => {
  return {
    type: ActionTypes.DELETE_VENDOR_PROD_RESPONSE,
    payload,
  };
};
