import ApiMethodVendor from "@/api/purchasing/apiMethodVendor";
import { call, put } from "redux-saga/effects";
import { doAddProdVendorResponse, doAddVendorResponse, doDeleteVendor, doDeleteVendorResponse, doGetVendorResponse, doSearchResponse, doUpdateVendorResponse } from "../action/vendorActionReducer";

// GET ALL VENDOR
function* handleGetAllVendor(action: any): any {
  try {
    const { search, page, limit } = action.payload;
    const result = yield call(ApiMethodVendor.getAll, search, page, limit);
    yield put(doGetVendorResponse(result.data));
  } catch (error) {
    yield put(doGetVendorResponse({ message: error }));
  }
}

// UPDATE VENDOR
function* handleUpdateVendor(action: any): any {
  try {
    const result = yield call(ApiMethodVendor.update, action.payload[0], action.payload[1]);
    yield put(doUpdateVendorResponse(result.data));
  } catch (error) {
    yield put(doUpdateVendorResponse({ message: error }));
  }
}

// DELETE VENDOR
function* handleDeleteVendor(action: any): any {
  try {
    const result = yield call(ApiMethodVendor.remove, action.payload);
    yield put(doDeleteVendorResponse(result.data));
  } catch (error) {
    yield put(doDeleteVendorResponse({ message: error }));
  }
}

// ADD VENDOR
function* handleAddVendor(action: any): any {
  try {
    const result = yield call(ApiMethodVendor.create, action.payload);
    yield put(doAddVendorResponse(result.data));
  } catch (error) {
    yield put(doAddVendorResponse({ message: error }));
  }
}

// GET VENDOR PRODUCT

function* handleGetProdVendor(action: any): any {
  try {
    const result = yield call(ApiMethodVendor.getVendorProd, action.payload);
    yield put(doAddProdVendorResponse(result.data));
  } catch (error) {
    yield put(doAddProdVendorResponse({ message: error }));
  }
}

function* handleSearchVendor(action: any): any {
  try {
    const result = yield call(ApiMethodVendor.search, action.payload);
    yield put(doSearchResponse(result.data));
    console.log(result.data);
  } catch (error) {
    yield put(doSearchResponse({ message: error }));
  }
}

export { handleGetAllVendor, handleAddVendor, handleDeleteVendor, handleUpdateVendor, handleSearchVendor, handleGetProdVendor };
