import { all, takeEvery } from "redux-saga/effects";
import ActionTypesUsers from "../action/actionTypeUsers";
import {
  handleLoginEmployee,
  handleLoginGuest,
  handleLogoutEmployee,
} from "./loginSaga";
import { handleRegisterEmployee, handleRegisterGuest } from "./registerSaga";
import { handleUpdatePassword, handleUpdateProfile } from "./usersSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionTypesUsers.REQ_GET_LOGIN, handleLoginEmployee),
    takeEvery(ActionTypesUsers.REQ_LOGIN_GUEST, handleLoginGuest),
    takeEvery(ActionTypesUsers.REQ_LOGOUT, handleLogoutEmployee),
    takeEvery(ActionTypesUsers.REQ_REGISTER, handleRegisterEmployee),
    takeEvery(ActionTypesUsers.REQ_REGISTER_GUEST, handleRegisterGuest),
    takeEvery(ActionTypesUsers.UPDATE_PROFILE, handleUpdateProfile),
    takeEvery(ActionTypesUsers.UPDATE_PASSWORD, handleUpdatePassword),
  ]);
}

export default watchAll;
