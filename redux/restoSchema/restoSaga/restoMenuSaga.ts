import { call, put } from 'redux-saga/effects'
import apiMethodReme from '../../../api/restoSchema/apiMethodResto'
import {
  doAddResponse,
  doDeleteResponse,
  doGetRemeResponse,
  doSearchResponse,
  doSort,
  doSortResponse,
  doUpdateResponse,
} from '../action/actionReme'

function* handleGetAllReme(action: any): any {
  try {
    const { searchTerm, page, limit, sort } = action.payload
    const result = yield call(
      apiMethodReme.getAll,
      searchTerm,
      page,
      limit,
      sort
    )
    yield put(doGetRemeResponse(result.data))
  } catch (error) {
    yield put(doGetRemeResponse({ message: error }))
  }
}

function* handleAddReme(action: any): any {
  try {
    const result = yield call(apiMethodReme.create, action.payload)
    yield put(doAddResponse(result.data))
  } catch (error) {
    yield put(doAddResponse({ message: error }))
  }
}

function* handleUpdateReme(action: any): any {
  try {
    const result = yield call(
      apiMethodReme.update,
      action.payload[0],
      action.payload[1]
    )
    yield put(doUpdateResponse(result.data))
  } catch (error) {
    yield put(doUpdateResponse({ message: error }))
  }
}

function* handleDelReme(action: any): any {
  try {
    const result = yield call(apiMethodReme.remove, action.payload)
    yield put(doDeleteResponse(result.data))
  } catch (error) {
    yield put(doDeleteResponse({ message: error }))
  }
}

function* handleSearchReme(action: any): any {
  try {
    const result = yield call(apiMethodReme.search, action.payload)
    yield put(doSearchResponse(result.data))
  } catch (error) {
    yield put(doSearchResponse({ message: error }))
  }
}

function* handleSortReme(action: any): any {
  try {
    const result = yield call(apiMethodReme.sort, action.payload)
    yield put(doSortResponse(result.data))
  } catch (error) {
    yield put(doSortResponse({ message: error }))
  }
}

export {
  handleGetAllReme,
  handleAddReme,
  handleUpdateReme,
  handleDelReme,
  handleSearchReme,
  handleSortReme,
}
