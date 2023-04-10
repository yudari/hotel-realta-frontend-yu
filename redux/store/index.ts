import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "@redux-saga/core";

import { createLogger } from "redux-logger";

import rootSaga from '../saga'
import { bankReducers } from "../payment/reducer/bankReducer";
import { fintechReducers } from "../payment/reducer/fintechReducer";
import { paymentTransactionReducers } from "../payment/reducer/paymentTransactionReducer";
import { userAccountReducers } from "../payment/reducer/userAccountReducer";

const logger = createLogger();
const saga = createSagaMiddleware();


const reducer = combineReducers({
  bankReducers,
  fintechReducers,
  paymentTransactionReducers,
  userAccountReducers,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga)
export default store;
