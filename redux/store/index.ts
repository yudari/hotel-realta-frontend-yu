import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { createLogger } from "redux-logger";
import orderReducers from "../purchasing/reducer/orderReducer";
import vendorProdReducers from "../purchasing/reducer/prodVendorReducer";
import stockReducers from "../purchasing/reducer/stockReducer";
import vendorReducers from "../purchasing/reducer/vendorReducer";

import rootSaga from "../saga";
import { bankReducers } from "../payment/reducer/bankReducer";
import { fintechReducers } from "../payment/reducer/fintechReducer";
import { paymentTransactionReducers } from "../payment/reducer/paymentTransactionReducer";
import { userAccountReducers } from "../payment/reducer/userAccountReducer";
import hotelsReducers from "../hotel/reducer/hotelsReducer";

import facilitiesSupportReducers from "../hotel/reducer/facilitiesSupportReducer";
import hotelReviewsReducers from "../hotel/reducer/hotelReviewsReducer";
import facilitiesReducers from "../hotel/reducer/facilitiesReducer";
import cityHotelReducers from "../hotel/reducer/cityHotelReducer";
import categoryFaciReducers from "../hotel/reducer/categoryReducer";
import membersFaciReducers from "../hotel/reducer/membersReducer";

import remeReducers from "../restoSchema/reducer/restoMenuReducer";
import rephoReducers from "../restoSchema/reducer/restoMenuPhotoReducer";
import ormeReducers from "../restoSchema/reducer/orderMenuReducer";
import ordetReducers from "../restoSchema/reducer/orderMenuDetailReducer";
import bookingReducers from "../booking/reducer/bookingReducer";
import facilitiesSupportBookingReducers from "../booking/reducer/facilitiesSupportReducer";
import loginReducers from "../users/reducer/loginReducers";
import registerReducers from "../users/reducer/registerReducers";
import otherRoomsReducers from "../booking/reducer/OtherRoomsReducer";
import usersReducers from "../users/reducer/userReducers";
import deptReducers from "../human_resources/reducer/departmentReducer";
import empReducers from "../human_resources/reducer/employeeReducer";
import workOrdersReducers from "../human_resources/reducer/workOrdersReducer";
import workOrderDetailReducers from "../human_resources/reducer/workOrderDetailReducer";
import employeePayHistoryReducers from "../human_resources/reducer/employeePayHistoryReducer";
import departmentHistoryReducers from "../human_resources/reducer/employeeDepartmentHistoryReducer";

import regionReducer from "../masterSchema/reducer/regionReducer";
import servicetaskReducer from "../masterSchema/reducer/servicetaskReducer";
import countryReducer from "../masterSchema/reducer/countryReducer";
import provinceReducer from "../masterSchema/reducer/provinceReducer";
import policyReducer from "../masterSchema/reducer/policyReducer";
import categorygroupReducer from "../masterSchema/reducer/categorygroupReducer";
import priceitemsReducer from "../masterSchema/reducer/priceitemsReducer";
import cityReducer from "../masterSchema/reducer/cityReducer";
import addressReducer from "../masterSchema/reducer/addressReducer";

const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({
  vendorReducers,
  stockReducers,
  vendorProdReducers,
  orderReducers,

  bankReducers,
  fintechReducers,
  paymentTransactionReducers,
  userAccountReducers,

  //===Reducers Hotel===
  hotelsReducers,
  facilitiesReducers,
  cityHotelReducers,
  categoryFaciReducers,
  membersFaciReducers,
  facilitiesSupportReducers,
  hotelReviewsReducers,
  ///========================
  deptReducers,
  empReducers,
  workOrdersReducers,
  workOrderDetailReducers,
  employeePayHistoryReducers,
  departmentHistoryReducers,
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

  regionReducer,
  servicetaskReducer,
  countryReducer,
  provinceReducer,
  policyReducer,
  categorygroupReducer,
  priceitemsReducer,
  cityReducer,
  addressReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger).concat(saga),
});

saga.run(rootSaga);

export default store;