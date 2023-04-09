import { all } from "redux-saga/effects";

import usersSaga from "../users/userSaga/index";
import bookingSaga from "../booking/bookingSaga/index";

export default function* rootSaga() {
  yield all([usersSaga(), bookingSaga()]);
}
