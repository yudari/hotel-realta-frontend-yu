import { all } from 'redux-saga/effects'

import hotelSaga from '../hotel/saga/index'
import restoSaga from '../restoSchema/restoSaga/index'
import usersSaga from '../users/userSaga/index'
import bookingSaga from '../booking/bookingSaga/index'

export default function* rootSaga() {
  yield all([usersSaga(), bookingSaga(), restoSaga(), hotelSaga()])
}
