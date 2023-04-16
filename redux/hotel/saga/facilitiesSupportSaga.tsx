import ApiMethodHotel from '@/api/hotel/apiMethodHotel'
import { call, put } from 'redux-saga/effects'
import {
  doAddFacilitiesSupportResponse,
  doDeleteFacilitiesSupportResponse,
  doGetFacilitiesSupportResponse,
  doUpdateFacilitiesSupportResponse,
} from '../action/actionReducer'

function* handleGetAllFacilitiesSupport(): any {
  try {
    const result = yield call(ApiMethodHotel.getAllFacilitiesSupport)
    yield put(doGetFacilitiesSupportResponse(result.data))
  } catch (error) {
    yield put(doGetFacilitiesSupportResponse({ message: error }))
  }
}

function* handleAddFacilitiesSupport(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.createFacilitiesSupport,
      action.payload
    )
    yield put(doAddFacilitiesSupportResponse(result.data))
  } catch (error) {
    yield put(doAddFacilitiesSupportResponse({ message: error }))
  }
}

function* handleUpdateFacilitiesSupport(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.updateFacilitiesSupport,
      action.payload[0],
      action.payload[1]
    )
    yield put(doUpdateFacilitiesSupportResponse(result.data))
  } catch (error) {
    yield put(doUpdateFacilitiesSupportResponse({ message: error }))
  }
}

function* handleDeleteFacilitiesSupport(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.removeFacilitiesSupport,
      action.payload
    )
    yield put(doDeleteFacilitiesSupportResponse(result.data))
  } catch (error) {
    yield put(doDeleteFacilitiesSupportResponse({ message: error }))
  }
}

export {
  handleGetAllFacilitiesSupport,
  handleAddFacilitiesSupport,
  handleUpdateFacilitiesSupport,
  handleDeleteFacilitiesSupport,
}
