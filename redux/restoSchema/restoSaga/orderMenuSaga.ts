import { call, put } from "redux-saga/effects";
import apiMethodReme from "../../../api/restoSchema/apiMethodResto";

import {
  doAddOrmeResponse,
  doDeleteOrmeResponse,
  doGetOrmeResponse,
  doUpdateOrmeResponse,
} from "../action/actionOrme";

function* handleGetAllOrme(): any {
  try {
    const result = yield call(apiMethodReme.getAllOrme);

    yield put(doGetOrmeResponse(result.data));
  } catch (error) {
    yield put(doGetOrmeResponse({ message: error }));
  }
}

function* handleAddOrme(action: any): any {
  try {
    const result = yield call(apiMethodReme.createOrme, action.payload);
    yield put(doAddOrmeResponse(result.data));
  } catch (error) {
    yield put(doAddOrmeResponse({ message: error }));
  }
}

function* handleUpdateOrme(action: any): any {
  try {
    const result = yield call(
      apiMethodReme.updateOrme,
      action.payload[0],
      action.payload[1]
    );
    yield put(doUpdateOrmeResponse(result.data));
  } catch (error) {
    yield put(doUpdateOrmeResponse({ message: error }));
  }
}

function* handleDelOrme(action: any): any {
  try {
    const result = yield call(apiMethodReme.deleteOrme, action.payload);
    yield put(doDeleteOrmeResponse(result.data));
  } catch (error) {
    yield put(doDeleteOrmeResponse({ message: error }));
  }
}

export { handleGetAllOrme, handleAddOrme, handleUpdateOrme, handleDelOrme };
