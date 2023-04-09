import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import bookingReducers from "../booking/reducer/bookingReducer";
import facilitiesSupportBookingReducers from "../booking/reducer/facilitiesSupportReducer";
import rootSaga from "../saga";
import loginReducers from "../users/reducer/loginReducers";
import registerReducers from "../users/reducer/registerReducers";
import otherRoomsReducers from "../booking/reducer/OtherRoomsReducer";




const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({
  loginReducers,
  registerReducers,
  bookingReducers,
  facilitiesSupportBookingReducers,
  otherRoomsReducers
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga);

export default store;
