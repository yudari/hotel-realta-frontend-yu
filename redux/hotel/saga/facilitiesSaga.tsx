import ApiMethodHotel from '@/api/hotel/apiMethodHotel'
import { call, put } from 'redux-saga/effects'
import {
  doAddFacilitiesResponse,
  doGetFacilitiesResponse,
} from '../action/actionReducer'

function* handleGetAllFacilities(): any {
  try {
    const result = yield call(ApiMethodHotel.getAllFacilities)
    yield put(doGetFacilitiesResponse(result.data))
  } catch (error) {
    yield put(doGetFacilitiesResponse({ message: error }))
  }
}
function* handleAddFacilities(action: any): any {
  console.log(action)
  try {
    const result = yield call(ApiMethodHotel.createFacilities, action.payload)
    yield put(doAddFacilitiesResponse(result.data))
  } catch (error) {
    yield put(doAddFacilitiesResponse({ message: error }))
  }
}
export { handleGetAllFacilities, handleAddFacilities }
