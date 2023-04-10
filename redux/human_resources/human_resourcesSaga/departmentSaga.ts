import { call, put } from "redux-saga/effects";
import ApiMethodDept from "@/api/human_resources/apiMethodDepartment";
import { doAddDepartmentResponse, doDeleteDepartmentResponse, doGetDepartmentResponse, doUpdateDepartmentResponse } from "../action/departmentActionReducer";

// fungsi untuk menampilkan data department
function* handleGetAllDepartment(action: any): any {
  try {
    const result = yield call(ApiMethodDept.getAll, action.payload);
    yield put(doGetDepartmentResponse(result.data));
    console.log(result.data)
  } catch (error) {
    yield put(doGetDepartmentResponse({ message: error }));
  }
}

// fungsi untuk menambahkan data department
function* handleAddDepartment(action: any): any {
  try {
    const result = yield call(ApiMethodDept.create, action.payload);
    // console.log(result)
    yield put(doAddDepartmentResponse(result.data));
  } catch (error) {
    yield put(doAddDepartmentResponse({ message: error }));
  }
}

// fungsi untuk mengedit data department
function* handleUpdateDepartment(action: any): any {
  try {
    const result = yield call(ApiMethodDept.update, action.payload[0], action.payload[1]);
    yield put(doUpdateDepartmentResponse(result.data));
    // console.log(result.data)
  } catch (error) {
    yield put(doUpdateDepartmentResponse({ message: error }));
  }
}

// fungsi untuk delete data department
function* handleDeleteDepartment(action: any): any {
  try {
    const result = yield call(ApiMethodDept.remove, action.payload);
    yield put(doDeleteDepartmentResponse(result.data));
  } catch (error) {
    yield put(doDeleteDepartmentResponse({ message: error }));
  }
}

export { handleGetAllDepartment, handleAddDepartment, handleUpdateDepartment, handleDeleteDepartment };
