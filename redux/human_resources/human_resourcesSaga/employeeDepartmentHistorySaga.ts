import ApiMethodDepartmentHistory from "@/api/human_resources/apiMethodEmployeeDepartmentHistory";
import { call, put } from "redux-saga/effects";
import { doAddDepartmentHistoryResponse, doDeleteDepartmentHistoryResponse, doGetDepartmentHistoryResponse, doUpdateDepartmentHistoryResponse } from "../action/employeeDepartmentHistoryActionReducer";

// funsi untuk menampilkan data employee department history
function* handleGetAllDepartmentHistory(): any {
  try {
    const result = yield call(ApiMethodDepartmentHistory.getAll);
    yield put(doGetDepartmentHistoryResponse(result.data));
  } catch (error) {
    yield put(doGetDepartmentHistoryResponse({ message: error }));
  }
}

// funsi untuk mengcreate data employee department history
function* handleAddDepartmentHistory(action: any): any {
  try {
    const result = yield call(ApiMethodDepartmentHistory.create, action.payload);
    yield put(doAddDepartmentHistoryResponse(result.data));
  } catch (error) {
    yield put(doAddDepartmentHistoryResponse({ message: error }));
  }
}

// funsi untuk mengupdate data employee department history
function* handleUpdateDepartmentHistory(action: any): any {
  try {
    const result = yield call(ApiMethodDepartmentHistory.update, action.payload[0], action.payload[1]);
    yield put(doUpdateDepartmentHistoryResponse(result.data));
  } catch (error) {
    yield put(doUpdateDepartmentHistoryResponse({ message: error }));
  }
}

// funsi untuk menghapus data employee department history
function* handleDeleteDepartmentHistory(action: any): any {
  try {
    const result = yield call(ApiMethodDepartmentHistory.remove, action.payload);
    yield put(doDeleteDepartmentHistoryResponse(result.data));
  } catch (error) {
    yield put(doDeleteDepartmentHistoryResponse({ message: error }));
  }
}

export { handleGetAllDepartmentHistory, handleAddDepartmentHistory, handleUpdateDepartmentHistory, handleDeleteDepartmentHistory };
