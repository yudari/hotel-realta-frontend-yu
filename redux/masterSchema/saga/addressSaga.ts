import { call, put } from "redux-saga/effects";
import apiMethodMaster from "../../../api/masterSchema/masterApiMethod";

import {
  doGetCityResponse,
  doRequestGetCityByProvinceByIdResponse,
} from "../action/city";
import {
  doGetAddressResponse,
  doRequestGetAddressByCityByIdResponse,
} from "../action/addressAction";

function* handleGetAllAddress(): any {
  try {
    const result = yield call(apiMethodMaster.getAllAddress);
    // console.log("tes data=>", result.data);

    yield put(doGetAddressResponse(result.data));
  } catch (error) {
    yield put(doGetAddressResponse({ message: error }));
  }
}
function* handleGetAddressByCityById(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.getAllIncludeCity,
      action.payload
    );

    console.log(result);

    yield put(doRequestGetAddressByCityByIdResponse(result.data.data));
  } catch (error) {
    yield put(doRequestGetAddressByCityByIdResponse({ message: error }));
  }
}

export { handleGetAllAddress, handleGetAddressByCityById };
