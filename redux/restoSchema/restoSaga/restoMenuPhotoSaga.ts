import { call, put } from 'redux-saga/effects'
import apiMethodReme from '../../../api/restoSchema/apiMethodResto'

import {
  doAddRephoResponse,
  doDeleteRephoResponse,
  doGetRephoResponse,
  doUpdateRephoResponse,
} from '../action/actionRepho'

function* handleGetAllRepho(): any {
  try {
    const result = yield call(apiMethodReme.getAllPhotos)
    yield put(doGetRephoResponse(result.data))
  } catch (error) {
    yield put(doGetRephoResponse({ message: error }))
  }
}

function* handleAddRepho(action: any): any {
  try {
    const result = yield call(apiMethodReme.uploadPhotos, action.payload)
    yield put(doAddRephoResponse(result.data))
  } catch (error) {
    yield put(doAddRephoResponse({ message: error }))
  }
}

function* handleUpdateRepho(action: any): any {
  try {
    const result = yield call(
      apiMethodReme.updatePhotos,
      action.payload[0],
      action.payload[1]
    )
    yield put(doUpdateRephoResponse(result.data))
  } catch (error) {
    yield put(doUpdateRephoResponse({ message: error }))
  }
}

function* handleDelRepho(action: any): any {
  try {
    const result = yield call(apiMethodReme.removePhotos, action.payload)
    yield put(doDeleteRephoResponse(result.data))
  } catch (error) {
    yield put(doDeleteRephoResponse({ message: error }))
  }
}

export { handleGetAllRepho, handleAddRepho, handleUpdateRepho, handleDelRepho }
