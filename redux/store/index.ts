import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import { createLogger } from 'redux-logger'
import hotelsReducers from '../hotel/reducer/hotelsReducer'
import rootSaga from '../saga'
import facilitiesSupportReducers from '../hotel/reducer/facilitiesSupportReducer'
import hotelReviewsReducers from '../hotel/reducer/hotelReviewsReducer'
import facilitiesReducers from '../hotel/reducer/facilitiesReducer'
import cityHotelReducers from '../hotel/reducer/cityHotelReducer'
import categoryFaciReducers from '../hotel/reducer/categoryReducer'
import membersFaciReducers from '../hotel/reducer/membersReducer'

const logger = createLogger()
const saga = createSagaMiddleware()

const reducer = combineReducers({
  //===Reducers Hotel===
  hotelsReducers,
  facilitiesReducers,
  cityHotelReducers,
  categoryFaciReducers,
  membersFaciReducers,
  facilitiesSupportReducers,
  hotelReviewsReducers,
  ///========================
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(logger)
      .concat(saga),
})

saga.run(rootSaga)

export default store
