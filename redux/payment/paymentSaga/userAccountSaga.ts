import { call, put } from 'redux-saga/effects'
import {
  doAddUserAcc,
  doAddUserAccResponse,
  doDeleteUserAccResponse,
  doGetBankFintechResponse,
  doGetUserAccResponse,
  doUpadateUserAccResponse,
} from '../action/userAccActionReducer'
import apiMethodUserAcc from '@/api/payment/apiMethodUserAccount'
import { doUpdateFintechResponse } from '../action/fintechActionReducer'

function* handleGetUserAcc(action: any): any {
  try {
    const result = yield call(apiMethodUserAcc.findAll, action.payload)
    yield put(doGetUserAccResponse(result.data))
  } catch (error) {
    yield put(doGetUserAccResponse({ message: error }))
  }
}

function* hanleAddUserAcc(action:any):any{
    try{
      const result = yield call (apiMethodUserAcc.create, action.payload)
      yield put(doAddUserAccResponse(result.data))
    }
    catch(error){
        yield put(doAddUserAccResponse({message:error}))
    }
}

function* handleUpdateUserAcc(action: any): any {
  try {
    const result = yield call(
      apiMethodUserAcc.update,
      action.payload[0],
      action.payload[1]
    )
    yield put(doUpadateUserAccResponse(result.data))
  } catch (error) {
    yield put(doUpadateUserAccResponse({ message: error }))
  }
}

function* handleDeleteUserAcc(action: any): any {
  try {
    const result = yield call(apiMethodUserAcc.remove, action.payload)
    yield put(doDeleteUserAccResponse(result.data))
  } catch (error) {
    yield put(doDeleteUserAccResponse({ message: error }))
  }
}

function* handleGetBankFintech(): any {
  try {
    const result = yield call(apiMethodUserAcc.findBKData)
    yield put(doGetBankFintechResponse(result.data))
  } catch (error) {
    yield put(doGetBankFintechResponse({ message: error }))
  }
}

export {
  handleGetUserAcc,
  hanleAddUserAcc,
  handleUpdateUserAcc,
  handleDeleteUserAcc,
  handleGetBankFintech,
}
