import { call, put } from "redux-saga/effects";
import apiMethodMaster from "../../../api/masterSchema/masterApiMethod";
import {
  doAddProvinceResponse,
  doDeleteProvinceResponse,
  doGetProvinceResponse,
  doRequestGetProvinceByCountryByIdResponse,
  doUpdateProvinceResponse,
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

function* handleAddProvince(action: any): any {
  try {
    const result = yield call(apiMethodMaster.createProvince, action.payload);
    yield put(doAddProvinceResponse(result.data));
  } catch (error) {
    yield put(doAddProvinceResponse({ message: error }));
  }
}

function* handleUpdateProvince(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.updateProvince,
      action.payload.id,
      action.payload.dataEdit
    );
    yield put(doUpdateProvinceResponse(result.data));
  } catch (error) {
    yield put(doUpdateProvinceResponse({ message: error }));
  }
}

function* handleDeleteProvince(action: any): any {
  try {
    const result = yield call(apiMethodMaster.deleteProvince, action.payload);
    yield put(doDeleteProvinceResponse(result.data));
  } catch (error) {
    yield put(doDeleteProvinceResponse({ message: error }));
  }
}

export {
  handleGetAllProvince,
  handleGetProvinceByCountryById,
  handleAddProvince,
  handleUpdateProvince,
  handleDeleteProvince,
};
