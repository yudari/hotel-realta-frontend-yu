import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "@redux-saga/core";

import { createLogger } from "redux-logger";

const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(logger)
      .concat(saga),
});

export default store;
