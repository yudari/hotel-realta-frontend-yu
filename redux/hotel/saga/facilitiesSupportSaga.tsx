import ApiMethodHotel from '@/api/hotel/apiMethodHotel'
import { call, put } from 'redux-saga/effects'
import {
  doAddFacilitiesSupportResponse,
  doAddFacilitySupportHotelResponse,
  doDeleteFacilitiesSupport,
  doDeleteFacilitiesSupportResponse,
  doGetFacilitiesSupportResponse,
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
    yield put(doAddFacilitiesSupportResponse(result.data))
  } catch (error) {
    yield put(doAddFacilitiesSupportResponse({ message: error }))
  }
}
function* handleDeleteFacilitiesSupport(action: any): any {
  console.log(action.payload)
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

//FACILITY SUPPORT HOTEL
function* handleAddFacilitiesSupportHotel(action: any): any {
  // console.log(action.payload)
  try {
    const result = yield call(
      ApiMethodHotel.createFacilitySupportHotel,
      action.payload
    )
    yield put(doAddFacilitySupportHotelResponse(result.data))
  } catch (error) {
    yield put(
      doAddFacilitySupportHotelResponse({
        message: error,
      })
    )
  }
}

export {
  handleGetAllFacilitiesSupport,
  handleAddFacilitiesSupport,
  handleUpdateFacilitiesSupport,
  handleDeleteFacilitiesSupport,
  handleAddFacilitiesSupportHotel,
}
