import ActionTypes from "./actionType";

export const doRequestGetPriceItems = (
  searchQuery: string,
  searchType: string,
  page: number,
  limit: number
) => {
  const payload = { searchQuery, searchType, page, limit };
  //   console.log("ppayload",payload)
  return {
    type: ActionTypes.REQ_GET_PRICEITEMS,
    payload,
  };
};

export const doGetPriceItemsResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_PRICEITEMS_RESPONSE,
    payload,
  };
};

export const doAddPriceItems = (payload: any) => {
  return {
    type: ActionTypes.ADD_PRICEITEMS,
    payload,
  };
};

export const doAddPriceItemsResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_PRICEITEMS_RESPONSE,
    payload,
  };
};

export const doUpdatePriceItems = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PRICEITEMS,
    payload,
  };
};

export const doUpdatePriceItemsResponse = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_PRICEITEMS_RESPONSE,
    payload,
  };
};

export const doDeletePriceItems = (payload: any) => {
  return {
    type: ActionTypes.DEL_PRICEITEMS,
    payload,
  };
};

export const doDeletePriceItemsResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_PRICEITEMS_RESPONSE,
    payload,
  };
};
