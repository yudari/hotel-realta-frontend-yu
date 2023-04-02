import { all, takeEvery } from "redux-saga/effects";
import ActionTypesUsers from "../action/actionTypeUsers";
import {
  handleLoginEmployee,
  handleLoginGuest,
  handleLogoutEmployee,
} from "./loginSaga";
import { handleRegisterEmployee } from "./registerSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionTypesUsers.REQ_GET_LOGIN, handleLoginEmployee),
    takeEvery(ActionTypesUsers.REQ_LOGIN_GUEST, handleLoginGuest),
    takeEvery(ActionTypesUsers.REQ_LOGOUT, handleLogoutEmployee),
    takeEvery(ActionTypesUsers.REQ_REGISTER, handleRegisterEmployee),
  ]);
}

export default watchAll;
