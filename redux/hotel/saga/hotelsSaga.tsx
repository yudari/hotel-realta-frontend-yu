import ApiMethodHotel from '@/api/hotel/apiMethodHotel'
import { call, put } from 'redux-saga/effects'
import {
  doAddFacilityPhotosResponse,
  doAddFacilitySupportHotelResponse,
  doDeleteFacilitySupportHotelResponse,
  doGetFacilitySupportHotelResponse,
  doAddHotelsResponse,
  doDeleteHotelsResponse,
  doGetHotelsResponse,
  doSwitchHotelsResponse,
  doUpdateHotelsResponse,
} from '../action/actionReducer'

function* handleGetAllHotels(action: any): any {
  try {
    const { pageNumber, pageSize, search } = action.payload
    const result = yield call(
      ApiMethodHotel.getAllHotels,
      pageNumber,
      pageSize,
      search
    )
    yield put(doGetHotelsResponse(result.data))
  } catch (error) {
    yield put(doGetHotelsResponse({ message: error }))
  }
}

function* handleAddHotels(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.createHotels,
      action.payload.city_name,
      action.payload
    )
    yield put(doAddHotelsResponse(result.data))
  } catch (error) {
    yield put(doAddHotelsResponse({ message: error }))
  }
}

function* handleUpdateHotels(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.updateHotels,
      action.payload[0],
      action.payload[1].city_name,
      action.payload[1]
    )
    yield put(doUpdateHotelsResponse(result.data))
  } catch (error) {
    yield put(doUpdateHotelsResponse({ message: error }))
  }
}

function* handleSwitchHotels(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.updateStatusHotels,
      action.payload[0],
      action.payload[1]
    )
    yield put(doSwitchHotelsResponse(result.data))
  } catch (error) {
    yield put(doSwitchHotelsResponse({ message: error }))
  }
}

function* handleDeleteHotels(action: any): any {
  try {
    const result = yield call(ApiMethodHotel.removeHotels, action.payload)
    yield put(doDeleteHotelsResponse(result.data))
  } catch (error) {
    yield put(
      doDeleteHotelsResponse({
        message: error,
      })
    )
  }
}

//FACILITY SUPPORT HOTEL

function* handleGetFacilitiesSupportHotels(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.getAllHotelsWhereSupport,
      action.payload
    )
    yield put(doGetFacilitySupportHotelResponse(result.data))
  } catch (error) {
    yield put(doGetFacilitySupportHotelResponse({ message: error }))
  }
}

function* handleAddFacilitiesSupportHotel(action: any): any {
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

function* handleDeleteFacilitiesSupportHotel(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.removeFacilitySupportHotel,
      action.payload
    )
    yield put(doDeleteFacilitySupportHotelResponse(result.data))
  } catch (error) {
    yield put(
      doDeleteFacilitySupportHotelResponse({
        message: error,
      })
    )
  }
}

//====FACILITY PHOTOS===
function* handleAddFacilityPhotos(action: any): any {
  try {
    const result = yield call(
      ApiMethodHotel.createFacilityPhotos,
      action.payload
    )
    yield put(doAddFacilityPhotosResponse(result.data))
  } catch (error) {
    yield put(doAddFacilityPhotosResponse({ message: error }))
  }
}

export {
  handleGetAllHotels,
  handleAddHotels,
  handleUpdateHotels,
  handleSwitchHotels,
  handleDeleteHotels,
  //===FACILITY SUPPORT HOTELS===
  handleGetFacilitiesSupportHotels,
  handleAddFacilitiesSupportHotel,
  handleDeleteFacilitiesSupportHotel,
  //===FACILITY PHOTOS===
  handleAddFacilityPhotos,
}
