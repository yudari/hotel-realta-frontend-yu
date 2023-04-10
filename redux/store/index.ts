import remeReducers from '../restoSchema/reducer/restoMenuReducer'
import rephoReducers from '../restoSchema/reducer/restoMenuPhotoReducer'
import ormeReducers from '../restoSchema/reducer/orderMenuReducer'
import ordetReducers from '../restoSchema/reducer/orderMenuDetailReducer'
import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import bookingReducers from '../booking/reducer/bookingReducer'
import facilitiesSupportBookingReducers from '../booking/reducer/facilitiesSupportReducer'
import rootSaga from '../saga'
import loginReducers from '../users/reducer/loginReducers'
import registerReducers from '../users/reducer/registerReducers'
import otherRoomsReducers from '../booking/reducer/OtherRoomsReducer'
import usersReducers from '../users/reducer/userReducers'

const logger = createLogger()
const saga = createSagaMiddleware()

const reducer = combineReducers({
  loginReducers,
  registerReducers,
  bookingReducers,
  facilitiesSupportBookingReducers,
  otherRoomsReducers,
  usersReducers,
  remeReducers,
  rephoReducers,
  ormeReducers,
  ordetReducers,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(logger)
      .concat(saga),
})

saga.run(rootSaga)

saga.run(rootSaga)

export default store
