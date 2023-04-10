import { call, put } from "redux-saga/effects";
import { doAddWorkOrdersResponse, doDeleteWorkOrdersResponse, doGetWorkOrdersResponse, doUpdateWorkOrdersResponse } from "../action/workordersActionReducer";
import ApiMethodWorkOrders from "@/api/human_resources/apiMethodWorkOrders";

// fungsi untuk menampilkan data Work Orders
function* handleGetAllWorkOrders(action: any): any {
  try {
    const result = yield call(ApiMethodWorkOrders.getAll, action.payload);

    yield put(doGetWorkOrdersResponse(result.data));
  } catch (error) {
    yield put(doGetWorkOrdersResponse({ message: error }));
  }
}

// fungsi untuk menambahkan data Work Orders
function* handleAddWorkOrders(action: any): any {
  try {
    const result = yield call(ApiMethodWorkOrders.create, action.payload);
    yield put(doAddWorkOrdersResponse(result.data));
  } catch (error) {
    yield put(doAddWorkOrdersResponse({ message: error }));
  }
}

// fungsi untuk mengedit data Work Orders
function* handleUpdateWorkOrders(action: any): any {
  try {
    const result = yield call(ApiMethodWorkOrders.update, action.payload[0], action.payload[1]);
    yield put(doUpdateWorkOrdersResponse(result.data));
  } catch (error) {
    yield put(doUpdateWorkOrdersResponse({ message: error }));
  }
}

// fungsi untuk delete data Work Orders
function* handleDeleteWorkOrders(action: any): any {
  try {
    const result = yield call(ApiMethodWorkOrders.remove, action.payload);
    yield put(doDeleteWorkOrdersResponse(result.data));
  } catch (error) {
    yield put(doDeleteWorkOrdersResponse({ message: error }));
  }
}

export { handleGetAllWorkOrders, handleAddWorkOrders, handleUpdateWorkOrders, handleDeleteWorkOrders };
