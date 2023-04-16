import { call, put } from "redux-saga/effects";
import apiMethodMaster from "../../../api/masterSchema/masterApiMethod";

import {
  doAddCityResponse,
  doDeleteCityResponse,
  doGetCityResponse,
  doRequestGetCityByProvinceByIdResponse,
  doUpdateCityResponse,
} from "../action/city";

function* handleGetAllCity(): any {
  try {
    const result = yield call(apiMethodMaster.getAllCity);
    // console.log("tes data=>", result.data);

    yield put(doGetCityResponse(result.data));
  } catch (error) {
    yield put(doGetCityResponse({ message: error }));
  }
}
function* handleGetCityByProvinceById(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.getAllIncludeProvince,
      action.payload
    );

    console.log(result);

    yield put(doRequestGetCityByProvinceByIdResponse(result.data.data));
  } catch (error) {
    yield put(doRequestGetCityByProvinceByIdResponse({ message: error }));
  }
}
function* handleAddCity(action: any): any {
  try {
    const result = yield call(apiMethodMaster.createCity, action.payload);
    yield put(doAddCityResponse(result.data));
  } catch (error) {
    yield put(doAddCityResponse({ message: error }));
  }
}

function* handleUpdateCity(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.updateCity,
      action.payload.id,
      action.payload.dataEdit
    );
    yield put(doUpdateCityResponse(result.data));
  } catch (error) {
    yield put(doUpdateCityResponse({ message: error }));
  }
}

function* handleDeleteCity(action: any): any {
  try {
    const result = yield call(apiMethodMaster.deleteCity, action.payload);
    yield put(doDeleteCityResponse(result.data));
  } catch (error) {
    yield put(doDeleteCityResponse({ message: error }));
  }
}

export {
  handleGetAllCity,
  handleGetCityByProvinceById,
  handleAddCity,
  handleUpdateCity,
  handleDeleteCity,
};
