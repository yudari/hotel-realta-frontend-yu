import { call, put } from 'redux-saga/effects'
import apiMethodPayTrans from '@/api/payment/apiMethodPaymentTransaction'
import { doGetPayTransResponse, doTopupResponse } from '../action/payTransActionReducer'
import Swal from 'sweetalert2'
import router from 'next/router'
import { useEffect } from 'react'

function* handleGetPayTrans(action:any):any{
    try{
        const { searchTerm, page, limit, type, id } = action.payload
        const result = yield call(apiMethodPayTrans.finAll, searchTerm, page, limit, type, id)
        yield put(doGetPayTransResponse(result.data))
    }
    catch(error){
        yield put(doGetPayTransResponse({message:error}))
}
}

function* handleTopup(action: any): any {
  try {
    const result = yield call(apiMethodPayTrans.topup, action.payload)
    if(result.data.status >= 400){
      Swal.fire({
          title: 'Gagal',
          text: `${result.data.message}`,
          icon: 'error',
        });

    yield put(doTopupResponse(result.data))
  } else{
    Swal.fire({
        title: 'Sukses',
        text: `Top-up has been successfully completed!`,
        icon: 'success',
      });
      yield put(doTopupResponse(result.data))
        setTimeout(() => {
          router.push('/payment/transaction')
        }, 3000);
}
  }
catch (error) {
    yield put(doTopupResponse({ message: error }))
  }
}

export { handleGetPayTrans, handleTopup }
