import apiMethodStock from "@/api/purchasing/apiMethodStock";
import { doAddStockResponse, doDeleteStock, doDeleteStockResponse, doGetStockResponse, doGetStodResponse, doStockListResponse, doUpdateStockResponse } from "../action/stockActionReducer";
import { call, put } from "redux-saga/effects";

// GET ALL STOCK
function* handleGetAllStock(action: any): any {
  try {
    const { search, page, limit } = action.payload;
    const result = yield call(apiMethodStock.getAll, search, page, limit);
    yield put(doGetStockResponse(result.data));
  } catch (error) {
    yield put(doGetStockResponse({ message: error }));
  }
}

// ADD STOCK
function* handleAddStock(action: any): any {
  try {
    const result = yield call(apiMethodStock.create, action.payload);
    yield put(doAddStockResponse(result.data));
  } catch (error) {
    yield put(doAddStockResponse({ message: error }));
  }
}

// UPDATE STOCK
function* handleUpdateStock(action: any): any {
  try {
    const result = yield call(apiMethodStock.update, action.payload[0], action.payload[1]);
    yield put(doUpdateStockResponse(result.data));
  } catch (error) {
    yield put(doUpdateStockResponse({ message: error }));
  }
}

// DELETE STOCK
function* handleDeleteStock(action: any): any {
  try {
    const result = yield call(apiMethodStock.remove, action.payload);
    yield put(doDeleteStockResponse(result.data));
  } catch (error) {
    yield put(doDeleteStockResponse({ message: error }));
  }
}

// GET STOCK PROD VENDOR
function* handleStocVendor(): any {
  try {
    const result = yield call(apiMethodStock.getStocksList);
    yield put(doStockListResponse(result.data));
  } catch (error) {
    yield put(doStockListResponse({ message: error }));
  }
}

// function* handleGetAllStod(action: any): any {
//   try {
//     const result = yield call(apiMethodStock.getStockDetail, action.payload);
//     yield put(doGetStodResponse(result.data));
//   } catch (error) {
//     yield put(doGetStodResponse({ message: error }));
//   }
// }

export { handleGetAllStock, handleAddStock, handleUpdateStock, handleDeleteStock, handleStocVendor };
