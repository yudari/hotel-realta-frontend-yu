import { all } from "redux-saga/effects";

import paymentSaga from "../payment/paymentSaga/index";


export default function* rootSaga() {
  yield all([
    paymentSaga()
  ]);
}