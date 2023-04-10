import ApiMethodHotel from '@/api/hotel/apiMethodHotel'
import { call, put } from 'redux-saga/effects'
import { doGetCityResponse } from '../action/actionReducer'

function* handleGetAllCityHotels(): any {
  try {
    const result = yield call(ApiMethodHotel.getAllCity)
    yield put(doGetCityResponse(result.data))
  } catch (error) {
    yield put(doGetCityResponse({ message: error }))
  }
}

export { handleGetAllCityHotels }
