import ActionTypes from "./actionType";

export const doGetOrderList = (searchPo: string, page: number, limit: number) => {
  const payload = {
    searchPo,
    page,
    limit,
  };
  return {
    type: ActionTypes.REQUEST_GET_LIST_ORDER,
    payload,
  };
};

export const doGetOrderListResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_LIST_ORDER_RESPONSE,
    payload,
  };
};

export const doUpdateOrderList = (...payload: any[]) => {
  return {
    type: ActionTypes.REQUEST_UPDATE_LIST_ORDER,
    payload,
  };
};

export const doUpdateOrderListResponse = (...payload: any[]) => {
  return {
    type: ActionTypes.UPDATE_LIST_ORDER_RESPONSE,
    payload,
  };
};

export const doDeleteOrderList = (payload: any) => {
  return {
    type: ActionTypes.REQUEST_DEL_LIST_ORDER,
    payload,
  };
};

export const doDeleteOrderListResponse = (payload: any) => {
  return {
    type: ActionTypes.DEL_LIST_ORDER_RESPONSE,
    payload,
  };
};

// ORDER DETAIL

export const doRequestGetOrderDetail = () => {
  return { type: ActionTypes.REQUEST_GET_ORDER_DETAIL };
};

export const doGetOrderDetailResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_ORDER_DETAIL_RESPONSE,
    payload,
  };
};
