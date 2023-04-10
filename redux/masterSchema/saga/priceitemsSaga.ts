import { call, put } from "redux-saga/effects";
import apiMethodMaster from "@/api/masterSchema/masterApiMethod";
import {
  doAddPriceItemsResponse,
  doDeletePriceItemsResponse,
  doGetPriceItemsResponse,
  doUpdatePriceItemsResponse,
} from "../action/priceitemAction";
import { error } from "console";

function* handleGetAllPriceItems(action: any): any {
  try {
    const { searchQuery, searchType, page, limit } = action.payload;
    const result = yield call(
      apiMethodMaster.getAllPriceitems,
      searchQuery,
      searchType,
      page,
      limit
    );
    // console.log("result",result.data.data)
    yield put(doGetPriceItemsResponse(result.data.data));
  } catch (error) {
    yield put(doGetPriceItemsResponse({ message: error }));
  }
}

function* handleAddPriceItems(action: any): any {
  try {
    const result = yield call(apiMethodMaster.createPriceItems, action.payload);
    yield put(doAddPriceItemsResponse(result.data));
  } catch (error) {
    yield put(doAddPriceItemsResponse({ message: error }));
  }
}

function* handleUpdatePriceItems(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.updatePriceItems,
      action.payload.id,
      action.payload.data
    );
    yield put(doUpdatePriceItemsResponse(result.data));
  } catch (error) {
    yield put(doUpdatePriceItemsResponse({ message: error }));
  }
}

function* handleDeletePriceItems(action: any): any {
  try {
    const result = yield call(apiMethodMaster.deletePriceItems, action.payload);
    yield put(doDeletePriceItemsResponse(result.data));
  } catch (error) {
    yield put(doDeletePriceItemsResponse({ message: error }));
  }
}
export { handleGetAllPriceItems,handleAddPriceItems,handleDeletePriceItems,handleUpdatePriceItems };
