import apiMethodOrder from "@/api/purchasing/apiMethodOrder";
import { doDeleteOrderList, doDeleteOrderListResponse, doGetOrderDetailResponse, doGetOrderListResponse, doUpdateOrderListResponse } from "../action/orderActionReducer";
import { call, put } from "redux-saga/effects";

// GET ALL ORDER
function* handleGetAllOrderList(action: any): any {
  try {
    const { searchPo, page, limit } = action.payload;
    const result = yield call(apiMethodOrder.getAll, searchPo, page, limit);
    yield put(doGetOrderListResponse(result.data));
  } catch (error) {
    yield put(doGetOrderListResponse({ message: error }));
  }
}

// UPDATE ALL ORDER
function* handleUpdateOrderList(action: any): any {
  try {
    const result = yield call(apiMethodOrder.update, action.payload[0], action.payload[1]);
    yield put(doUpdateOrderListResponse(result.data));
  } catch (error) {
    yield put(doUpdateOrderListResponse({ message: error }));
  }
}

// DELETE ALL ORDER
function* handleDeleteOrderList(action: any): any {
  try {
    const result = yield call(apiMethodOrder.remove, action.payload);
    yield put(doDeleteOrderListResponse(result.data));
  } catch (error) {
    yield put(doDeleteOrderListResponse({ message: error }));
  }
}

// GET ORDER DETAIL
function* handleGetAllOrderDetail(): any {
  try {
    const result = yield call(apiMethodOrder.getOrderDetail);
    yield put(doGetOrderDetailResponse(result.data));
  } catch (error) {
    yield put(doGetOrderDetailResponse({ message: error }));
  }
}

export { handleGetAllOrderList, handleUpdateOrderList, handleDeleteOrderList, handleGetAllOrderDetail };
