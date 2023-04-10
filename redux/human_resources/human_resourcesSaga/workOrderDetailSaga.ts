import ApiMethodWorkOrderDetail from "@/api/human_resources/apiMethodWorkOrderDetail";
import { call, put } from "redux-saga/effects";
import { doAddWorkOrderDetailResponse, doDeleteWorkOrderDetailResponse, doGetWorkOrderDetailResponse, doUpdateWorkOrderDetailResponse } from "../action/workOrderDetailActionReducer";

// funsi untuk menampilkan data work order detail
function* handleGetAllWorkOrderDetail(): any {
  try {
    const result = yield call(ApiMethodWorkOrderDetail.getAll);
    yield put(doGetWorkOrderDetailResponse(result.data));
  } catch (error) {
    yield put(doGetWorkOrderDetailResponse({ message: error }));
  }
}

// funsi untuk mengcreate data work order detail
function* handleAddWorkOrderDetail(action: any): any {
  try {
    const result = yield call(ApiMethodWorkOrderDetail.create, action.payload);
    yield put(doAddWorkOrderDetailResponse(result.data));
  } catch (error) {
    yield put(doAddWorkOrderDetailResponse({ message: error }));
  }
}

// funsi untuk mengupdate data work order detail
function* handleUpdateWorkOrderDetail(action: any): any {
  try {
    const result = yield call(ApiMethodWorkOrderDetail.update, action.payload[0], action.payload[1]);
    yield put(doUpdateWorkOrderDetailResponse(result.data));
  } catch (error) {
    yield put(doUpdateWorkOrderDetailResponse({ message: error }));
  }
}

// funsi untuk menghapus data work order detail
function* handleDeleteWorkOrderDetail(action: any): any {
  try {
    const result = yield call(ApiMethodWorkOrderDetail.remove, action.payload);
    yield put(doDeleteWorkOrderDetailResponse(result.data));
  } catch (error) {
    yield put(doDeleteWorkOrderDetailResponse({ message: error }));
  }
}

export { handleGetAllWorkOrderDetail, handleAddWorkOrderDetail, handleUpdateWorkOrderDetail, handleDeleteWorkOrderDetail };
