import { all } from "redux-saga/effects";

import usersSaga from "../users/userSaga/index";

export default function* rootSaga() {
  yield all([usersSaga()]);
}
