import { call, put } from "redux-saga/effects";
import apiMethodMaster from "../../../api/masterSchema/masterApiMethod";
import {
  doAddRegionResponse,
  doDeleteRegionResponse,
  doGetRegionResponse,
  doUpdateRegionResponse,
} from "../action/regionAction";

function* handleGetAllRegion(): any {
  try {
    const result = yield call(apiMethodMaster.getAllRegion);
    // console.log("tes data=>", result.data);

    yield put(doGetRegionResponse(result.data));
  } catch (error) {
    yield put(doGetRegionResponse({ message: error }));
  }
}

function* handleAddRegion(action: any): any {
  try {
    const result = yield call(apiMethodMaster.createRegion, action.payload);
    yield put(doAddRegionResponse(result.data));
  } catch (error) {
    yield put(doAddRegionResponse({ message: error }));
  }
}

function* handleUpdateRegion(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.updateRegion,
      action.payload.id,
      action.payload.data
    );
    yield put(doUpdateRegionResponse(result.data));
  } catch (error) {
    yield put(doUpdateRegionResponse({ message: error }));
  }
}

function* handleDelRegion(action: any): any {
  try {
    const result = yield call(apiMethodMaster.removeRegion, action.payload);
    yield put(doDeleteRegionResponse(result.data));
  } catch (error) {
    yield put(doDeleteRegionResponse({ message: error }));
  }
}

export {
  handleGetAllRegion,
  handleAddRegion,
  handleUpdateRegion,
  handleDelRegion,
};
