import ApiMethodHotel from '@/api/hotel/apiMethodHotel'
import { call, put } from 'redux-saga/effects'
import { doGetMembersResponse } from '../action/actionReducer'

function* handleGetAllMembersFaci(): any {
  try {
    const result = yield call(ApiMethodHotel.getAllMembers)
    yield put(doGetMembersResponse(result.data))
  } catch (error) {
    yield put(doGetMembersResponse({ message: error }))
  }
}

export { handleGetAllMembersFaci }
