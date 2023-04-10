import ApiMethodEmployeePayHistory from "@/api/human_resources/apiMethodEmployeePayHistory";
import { call, put } from "redux-saga/effects";
import { doAddEmployeePayHistoryResponse, doDeleteEmployeePayHistoryResponse, doGetEmployeePayHistoryResponse, doUpdateEmployeePayHistoryResponse } from "../action/employeePayHistoryActionReducer";

// funsi untuk menampilkan data employee pay history
function* handleGetAllEmployeePayHistory(): any {
  try {
    const result = yield call(ApiMethodEmployeePayHistory.getAll);
    yield put(doGetEmployeePayHistoryResponse(result.data));
  } catch (error) {
    yield put(doGetEmployeePayHistoryResponse({ message: error }));
  }
}

// funsi untuk mengcreate data employee pay history
function* handleAddEmployeePayHistory(action: any): any {
  try {
    const result = yield call(ApiMethodEmployeePayHistory.create, action.payload);
    yield put(doAddEmployeePayHistoryResponse(result.data));
  } catch (error) {
    yield put(doAddEmployeePayHistoryResponse({ message: error }));
  }
}

// funsi untuk mengupdate data employee pay history
function* handleUpdateEmployeePayHistory(action: any): any {
  try {
    const result = yield call(ApiMethodEmployeePayHistory.update, action.payload[0], action.payload[1]);
    yield put(doUpdateEmployeePayHistoryResponse(result.data));
  } catch (error) {
    yield put(doUpdateEmployeePayHistoryResponse({ message: error }));
  }
}

// funsi untuk menghapus data employee pay history
function* handleDeleteEmployeePayHistory(action: any): any {
  try {
    const result = yield call(ApiMethodEmployeePayHistory.remove, action.payload);
    yield put(doDeleteEmployeePayHistoryResponse(result.data));
  } catch (error) {
    yield put(doDeleteEmployeePayHistoryResponse({ message: error }));
  }
}

export { handleGetAllEmployeePayHistory, handleAddEmployeePayHistory, handleUpdateEmployeePayHistory, handleDeleteEmployeePayHistory };
