import apiMethodFintech from '@/api/payment/apiMethotFintech'
import {call, put} from 'redux-saga/effects'
import {doAddFintechResponse, doDeleteFintechResponse, doGetFintech, doGetFintechResponse } from '../action/fintechActionReducer'

function* handleGetFintech(action: any):any{
    try{
        const { searchTerm } = action.payload
        const result = yield call(apiMethodFintech.findAll, searchTerm)
        yield put(doGetFintechResponse(result.data))
    }
    catch(error){
        yield put(doGetFintechResponse({message:error}))
    }
}

function* handleAddFintech(action:any):any{
    try {
        const result = yield call(apiMethodFintech.create, action.payload)
        yield put(doAddFintechResponse(result.data))
    } 
    catch (error) {
        yield put(doAddFintechResponse({message:error}))
    }
}

function* handleUpdateFintech(action: any): any {
    try {
      const result = yield call(
        apiMethodFintech.update,
        action.payload[0],
        action.payload[1]
      )
      yield put(doAddFintechResponse(result.data))
    } catch (error) {
      yield put(doAddFintechResponse({ message: error }))
    }
  }
  
  function* handleDeleteFintech(action: any): any {
    try {
      const result = yield call(apiMethodFintech.remove, action.payload)
      yield put(doDeleteFintechResponse(result.data))
    } catch (error) {
      yield put(doDeleteFintechResponse({ message: error }))
    }
}

export {
    handleGetFintech,
    handleAddFintech,
    handleUpdateFintech,
    handleDeleteFintech,
}