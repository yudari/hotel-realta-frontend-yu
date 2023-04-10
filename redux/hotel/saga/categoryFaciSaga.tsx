import ApiMethodHotel from '@/api/hotel/apiMethodHotel'
import { call, put } from 'redux-saga/effects'
import { doGetCategoryResponse } from '../action/actionReducer'

function* handleGetAllCategoryFaci(): any {
  try {
    const result = yield call(ApiMethodHotel.getAllCategory)
    yield put(doGetCategoryResponse(result.data))
  } catch (error) {
    yield put(doGetCategoryResponse({ message: error }))
  }
}

export { handleGetAllCategoryFaci }
