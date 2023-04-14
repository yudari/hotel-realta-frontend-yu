import { call, put } from "redux-saga/effects";
import apiMethodMaster from "../../../api/masterSchema/masterApiMethod";
import {
  doGetProvinceResponse,
  doRequestGetProvinceByCountryByIdResponse,
} from "../action/provinceAction";
import {
  doAddCountryResponse,
  doUpdateCountryResponse,
} from "../action/countryAction";

function* handleGetAllProvince(): any {
  try {
    const result = yield call(apiMethodMaster.getAllProvince);
    // console.log("tes data=>", result.data);

    yield put(doGetProvinceResponse(result.data));
  } catch (error) {
    yield put(doGetProvinceResponse({ message: error }));
  }
}
function* handleGetProvinceByCountryById(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.getAllIncludeCountry,
      action.payload
    );

    yield put(doRequestGetProvinceByCountryByIdResponse(result.data.data));
  } catch (error) {
    yield put(doRequestGetProvinceByCountryByIdResponse({ message: error }));
  }
}


export {
  handleGetAllProvince,
  handleGetProvinceByCountryById,
  
};
