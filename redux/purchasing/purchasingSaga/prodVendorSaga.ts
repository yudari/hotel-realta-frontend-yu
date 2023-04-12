import apiMethodVendorProd from "@/api/purchasing/apiMethodVendorProd";
import { call, put } from "redux-saga/effects";
import { doAddProdVendorResponse } from "../action/vendorActionReducer";
import { doDeleteProdVendorResponse, doUpdateProdVendorResponse } from "../action/prodVendorActionReducer";

// GET ALL VENDOR PRODUCT
function* handleAddProdVendor(action: any): any {
  try {
    const result = yield call(apiMethodVendorProd.create, action.payload);
    yield put(doAddProdVendorResponse(result.data));
  } catch (error) {
    yield put(doAddProdVendorResponse({ message: error }));
  }
}

// UPDATE VENDOR PRODUCT
function* handleUpdateProdVendor(action: any): any {
  try {
    const result = yield call(apiMethodVendorProd.update, action.payload[0], action.payload[1]);
    yield put(doUpdateProdVendorResponse(result.data));
  } catch (error) {
    yield put(doUpdateProdVendorResponse({ message: error }));
  }
}

// DELETE VENDOR PRODUCT
function* handleDeleteProdVendor(action: any): any {
  try {
    const result = yield call(apiMethodVendorProd.remove, action.payload);
    yield put(doDeleteProdVendorResponse(result.data));
  } catch (error) {
    yield put(doDeleteProdVendorResponse({ message: error }));
  }
}

export { handleAddProdVendor, handleUpdateProdVendor, handleDeleteProdVendor };
