import { all, takeEvery } from "redux-saga/effects";
import ActionTypesUsers from "../action/actionTypeUsers";
import { handleLoginEmployee, handleLogoutEmployee } from "./loginSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionTypesUsers.REQ_GET_LOGIN, handleLoginEmployee),
    takeEvery(ActionTypesUsers.REQ_LOGOUT, handleLogoutEmployee),
  ]);
}

export default watchAll;
