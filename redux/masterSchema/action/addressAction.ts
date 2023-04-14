import ActionTypes from "./actionType";

export const doRequestGetAddress = () => {
  return {
    type: ActionTypes.REQ_GET_ADDRESS,
  };
};

export const doGetAddressResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_ADDRESS_RESPONSE,
    payload,
  };
};

export const doAddAddress = (payload: any) => {
  return {
    type: ActionTypes.ADD_ADDRESS,
    payload,
  };
};

export const doAddAddressResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_ADDRESS_RESPONSE,
    payload,
  };
};

export const doUpdateAddress = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_ADDRESS,
    payload,
  };
};

export const doUpdateAddressResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_ADDRESS_RESPONSE,
    payload,
  };
};

export const doDeleteAddress = (payload: any) => {
  return {
    type: ActionTypes.DEL_ADDRESS,
    payload,
  };
};

export const doDeleteAddressResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_ADDRESS_RESPONSE,
    payload,
  };
};

export const doRequestGetAddressByCityById = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_ADDRESSBYCITY,
    payload,
  };
};

export const doRequestGetAddressByCityByIdResponse  = (payload: any) => {
  return {
    type: ActionTypes.GET_ADDRESSBYCITY_RESPONSE,
    payload,
  };
};
