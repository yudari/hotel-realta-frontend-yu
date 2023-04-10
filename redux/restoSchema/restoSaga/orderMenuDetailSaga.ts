import { call, put } from 'redux-saga/effects'
import apiMethodReme from '../../../api/restoSchema/apiMethodResto'

import {
  doAddOrdetResponse,
  doDeleteOrdetResponse,
  doGetOrdetResponse,
  doUpdateOrdetResponse,
} from '../action/actionOrdet'

function* handleGetAllOrdet(): any {
  try {
    const result = yield call(apiMethodReme.getAllOrdet)
    yield put(doGetOrdetResponse(result.data))
  } catch (error) {
    yield put(doGetOrdetResponse({ message: error }))
  }
}

function* handleAddOrdet(action: any): any {
  try {
    const result = yield call(apiMethodReme.createOrdet, action.payload)
    yield put(doAddOrdetResponse(result.data))
  } catch (error) {
    yield put(doAddOrdetResponse({ message: error }))
  }
}

function* handleUpdateOrdet(action: any): any {
  try {
    const result = yield call(
      apiMethodReme.updateOrme,
      action.payload[0],
      action.payload[1]
    )
    yield put(doUpdateOrdetResponse(result.data))
  } catch (error) {
    yield put(doUpdateOrdetResponse({ message: error }))
  }
}

function* handleDelOrdet(action: any): any {
  try {
    const result = yield call(apiMethodReme.deleteOrdet, action.payload)
    yield put(doDeleteOrdetResponse(result.data))
  } catch (error) {
    yield put(doDeleteOrdetResponse({ message: error }))
  }
}

export { handleGetAllOrdet, handleAddOrdet, handleUpdateOrdet, handleDelOrdet }
