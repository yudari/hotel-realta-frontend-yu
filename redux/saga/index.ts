import hotelSaga from '../hotel/saga/index'
import restoSaga from '../restoSchema/restoSaga/index'
import usersSaga from '../users/userSaga/index'
import bookingSaga from '../booking/bookingSaga/index'
import hrSaga from '../human_resources/human_resourcesSaga/index'
import masterSaga from '../masterSchema/saga/index'
import paymentSaga from '../payment/paymentSaga/index'
import purchasingSaga from '../purchasing/purchasingSaga/index'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    usersSaga(),
    bookingSaga(),
    restoSaga(),
    hrSaga(),
    hotelSaga(),
    purchasingSaga(),
    masterSaga(),
    paymentSaga(),
  ])
}
