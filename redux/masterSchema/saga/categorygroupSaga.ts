import { call, put } from "redux-saga/effects";
import apiMethodMaster from "@/api/masterSchema/masterApiMethod";
import {
  doAddCategoryGroupResponse,
  doDeleteCategoryGroupResponse,
  doGetCategoryGroupResponse,
  doUpdateCategoryGroup,
  doUpdateCategoryGroupResponse,
} from "../action/categorygroupAction";

function* handleGetAllCategoryGroup(): any {
  try {
    const result = yield call(apiMethodMaster.getAllCategorygroup);
    yield put(doGetCategoryGroupResponse(result.data));
  } catch (error) {
    yield put(doGetCategoryGroupResponse({ message: error }));
  }
}

function* handleAddCategoryGroup(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.createCategorygroup,
      action.payload
    );
    console.log("data",result.data)
    yield put(doAddCategoryGroupResponse(result.data));
  } catch (error) {
    yield put(doAddCategoryGroupResponse({ message: error }));
  }
}

function* handleUpdateCategoryGroup(action: any): any {
  try {
    const result = yield call(
      apiMethodMaster.updateCategorygroup,
      action.payload.id,
      action.payload.data
    );
    yield put(doUpdateCategoryGroupResponse(result.data));
  } catch (error) {
    yield put(doUpdateCategoryGroupResponse({ message: error }));
  }
}

function* handleDeleteCategoryGroup(action:any):any {

  try {
      const result = yield call (apiMethodMaster.deleteCategorygroup,action.payload)
      yield put (doDeleteCategoryGroupResponse(result.data))
  } catch (error) {
      yield put( doDeleteCategoryGroupResponse({message:error}))
  }
}

export {
  handleGetAllCategoryGroup,
  handleAddCategoryGroup,
  handleUpdateCategoryGroup,
  handleDeleteCategoryGroup,
};
