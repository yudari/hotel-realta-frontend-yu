import {call, put} from 'redux-saga/effects'
import { doAddBankResponse, doDeleteResponse, doGetBankResponse, doUpdateResponse } from '../action/bankActionReducer'
import apiMethodBank from '@/api/payment/apiMethodBank'

function* handleGetBank(action: any):any{
    try{
        const { searchTerm } = action.payload
        const result = yield call(apiMethodBank.findAll, searchTerm)
        yield put(doGetBankResponse(result.data))
    }
    catch(error){
        yield put(doGetBankResponse({message:error}))
    }
}

function* handleAddBank(action:any):any{
    try {
        const result = yield call(apiMethodBank.create, action.payload)
        yield put(doAddBankResponse(result.data))
    } 
    catch (error) {
        yield put(doAddBankResponse({message:error}))
    }
}

function* handleUpdateBank(action: any): any {
    try {
      const result = yield call(
        apiMethodBank.update,
        action.payload[0],
        action.payload[1]
      )
      yield put(doUpdateResponse(result.data))
    } catch (error) {
      yield put(doUpdateResponse({ message: error }))
    }
  }
  
  function* handleDeleteBank(action: any): any {
    try {
      const result = yield call(apiMethodBank.remove, action.payload)
      yield put(doDeleteResponse(result.data))
    } catch (error) {
      yield put(doDeleteResponse({ message: error }))
    }
}

export{
    handleGetBank,
    handleAddBank,
    handleUpdateBank,
    handleDeleteBank
}