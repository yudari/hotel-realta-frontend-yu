import {call, put} from 'redux-saga/effects'
import apiMethodPayTrans from '@/api/payment/apiMethodPaymentTransaction'
import { doGetPayTransResponse, doTopupResponse } from '../action/payTransActionReducer'

function* handleGetPayTrans(action:any):any{
    try{
      
        const { searchTerm, page, limit, type } = action.payload
        const result = yield call(apiMethodPayTrans.finAll, searchTerm, page, limit, type)
        yield put(doGetPayTransResponse(result.data))
        console.log('he',action.payload)
    }
    catch(error){
        yield put(doGetPayTransResponse({message:error}))
    }
}

function* handleTopup(action:any):any{
    try {
        const result = yield call(apiMethodPayTrans.topup, action.payload)
        yield put(doTopupResponse(result.data))
    } 
    catch (error) {
        yield put(doTopupResponse({message:error}))
    }
}

export{
    handleGetPayTrans,
    handleTopup,
}