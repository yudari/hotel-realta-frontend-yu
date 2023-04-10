import { call, put } from "redux-saga/effects";
import apiMethodMaster from "@/api/masterSchema/masterApiMethod";
import {
  doAddPolicyResponse,
  doDeletePolicyResponse,
  doGetPolicyResponse,
  doUpdatePolicyResponse,
} from "../action/policyAction";

function* handleGetAllPolicy(): any {
  try {
    const result = yield call(apiMethodMaster.getAllPolicy);
    yield put(doGetPolicyResponse(result.data));
  } catch (error) {
    yield put(doGetPolicyResponse({ message: error }));
  }
}

function* handleAddPolicy(action: any): any {
    console.log('action',action)
  try {
    const result = yield call(apiMethodMaster.createPolicy, action.payload);
    yield put(doAddPolicyResponse(result.data));
  } catch (error) {
    yield put(doAddPolicyResponse({ message: error }));
  }
}

function* handleUpdatePolicy(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.updatePolicy,
      action.payload.id,
      action.payload.data
    );
    yield put(doUpdatePolicyResponse(result.data));
  } catch (error) {
    yield put(doUpdatePolicyResponse({ message: error }));
  }
}

function* handleDeletePolicy(action: any): any {
  try {
    const result = yield call(apiMethodMaster.deletePolicy, action.payload);
    yield put(doDeletePolicyResponse(result.data));
  } catch (error) {
    yield put(doDeletePolicyResponse({ message: error }));
  }
}

export {
  handleGetAllPolicy,
  handleAddPolicy,
  handleDeletePolicy,
  handleUpdatePolicy,
};
