import ApiMethodHotel from '@/api/hotel/apiMethodHotel'
import { call, put } from 'redux-saga/effects'
import {
  doGetFacilitiesSupportResponse,
  doGetHotelReviewsResponse,
} from '../action/actionReducer'

function* handleGetAllHotelReviews(): any {
  try {
    const result = yield call(ApiMethodHotel.getAllHotelReviews)
    // console.log(result.data)
    yield put(doGetHotelReviewsResponse(result.data))
  } catch (error) {
    yield put(doGetHotelReviewsResponse({ message: error }))
  }
}
export { handleGetAllHotelReviews }
