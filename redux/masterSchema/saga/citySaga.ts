import { call, put } from "redux-saga/effects";
import apiMethodMaster from "../../../api/masterSchema/masterApiMethod";

import {
  doGetCityResponse,
  doRequestGetCityByProvinceByIdResponse,
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

export { handleGetAllCity, handleGetCityByProvinceById };
