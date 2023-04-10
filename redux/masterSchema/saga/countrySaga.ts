import { call, put } from "redux-saga/effects";
import apiMethodMaster from "../../../api/masterSchema/masterApiMethod";
import {
  doAddCountryResponse,
  doDeleteCountryResponse,
  doGetCountryResponse,
  doRequestGetCountryByRegionByIdResponse,
  doUpdateCountryResponse,
} from "../action/countryAction";

function* handleGetAllCountry(): any {
  try {
    const result = yield call(apiMethodMaster.getAllCountry);
    // console.log("tes data=>", result.data);

    yield put(doGetCountryResponse(result.data));
  } catch (error) {
    yield put(doGetCountryResponse({ message: error }));
  }
}
function* handleGetCountryByRegionById(action: any): any {
  // console.log("tes data=>", action.payload);
  try {
    const result = yield call(
      apiMethodMaster.getAllIncludeRegion,
      action.payload
    );

    yield put(doRequestGetCountryByRegionByIdResponse(result.data.data));
  } catch (error) {
    yield put(doRequestGetCountryByRegionByIdResponse({ message: error }));
  }
}

function* handleAddCountry(action: any): any {
  try {
    const result = yield call(apiMethodMaster.createCountry, action.payload);
    yield put(doAddCountryResponse(result.data));
  } catch (error) {
    yield put(doAddCountryResponse({ message: error }));
  }
}

function* handleUpdateCountry(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.updateCountry,
      action.payload.id,
      action.payload.data
    );
    yield put(doUpdateCountryResponse(result.data));
  } catch (error) {
    yield put(doUpdateCountryResponse({ message: error }));
  }
}

function* handleDeleteCountry(action: any): any {
  try {
    const result = yield call(apiMethodMaster.removeCountry, action.payload);
    yield put(doDeleteCountryResponse(result.data));
  } catch (error) {
    yield put(doDeleteCountryResponse({ message: error }));
  }
}

export {
  handleGetAllCountry,
  handleGetCountryByRegionById,
  handleAddCountry,
  handleUpdateCountry,
  handleDeleteCountry,
};
