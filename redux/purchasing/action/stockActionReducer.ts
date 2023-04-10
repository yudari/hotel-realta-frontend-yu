import ActionTypes from "./actionType";

export const doGetStock = (search: string, page: number, limit: number) => {
  const payload = {
    search,
    page,
    limit,
  };
  return {
    type: ActionTypes.REQUEST_GET_STOCK,
    payload,
  };
};

export const doGetStockResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_STOCK_RESPONSE,
    payload,
  };
};

export const doAddStock = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_ADD_STOCK,
    payload,
  };
};

export const doAddStockResponse = (payload: any) => {
  return {
    type: ActionTypes.ADD_STOCK_RESPONSE,
    payload,
  };
};

export const doUpdateStock = (...payload: any[]) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_STOCK,
    payload,
  };
};

export const doUpdateStockResponse = (...payload: any[]) => {
  return {
    type: ActionTypes.UPDATE_STOCK_RESPONSE,
    payload,
  };
};

export const doDeleteStock = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DELETE_STOCK,
    payload,
  };
};

export const doDeleteStockResponse = (payload: any) => {
  return {
    type: ActionTypes.DELETE_STOCK_RESPONSE,
    payload,
  };
};

export const doStockList = () => {
  return {
    type: ActionTypes.REQUEST_GET_LIST_STOCK,
  };
};

export const doStockListResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_LIST_STOCK_RESPONSE,
    payload,
  };
};

export const doGetStod = (payload: any) => {
  return {
    type: ActionTypes.GET_STOD_RESPONSE,
    payload,
  };
};

export const doGetStodResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_STOD_RESPONSE,
    payload,
  };
};
