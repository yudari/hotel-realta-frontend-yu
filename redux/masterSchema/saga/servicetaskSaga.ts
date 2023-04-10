import { call, put } from "redux-saga/effects";
import apiMethodMaster from "../../../api/masterSchema/masterApiMethod";
import {
  doAddServiceTaskResponse,
  doDeleteServiceTaskResponse,
  doGetServiceTaskResponse,
  doUpdateServiceTaskResponse,
} from "../action/servicetaskAction";

function* handleGetAllServiceTask(): any {
  try {
    const result = yield call(apiMethodMaster.getAllServicetask);
    yield put(doGetServiceTaskResponse(result.data));
  } catch (error) {
    yield put(doGetServiceTaskResponse({ message: error }));
  }
}

function* handleAddServiceTask(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.createServicetask,
      action.payload
    );

    yield put(doAddServiceTaskResponse(result.data));
  } catch (error) {
    yield put(doAddServiceTaskResponse({ message: error }));
  }
}
function* handleUpdateServiceTask(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.updateServicetask,
      action.payload.id,
      action.payload.data
    );
    yield put(doUpdateServiceTaskResponse(result.data));
  } catch (error) {
    yield put(doUpdateServiceTaskResponse({ message: error }));
  }
}
function* handleDeleteServiceTask(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.deleteServicetask,
      action.payload,
    );
    yield put(doDeleteServiceTaskResponse(result.data));
  } catch (error) {
    yield put(doDeleteServiceTaskResponse({ message: error }));
  }
}

export {
  handleAddServiceTask,
  handleDeleteServiceTask,
  handleUpdateServiceTask,
  handleGetAllServiceTask,
};
