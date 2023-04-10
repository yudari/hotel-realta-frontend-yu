import apiMethodUsers from "@/api/users/apiMethodUsers";
import { call, put } from "redux-saga/effects";
import {
  doLoginFailed,
  doLoginSuccess,
  doLogoutSuccess,
} from "../action/loginActionReducers";

function* handleLoginEmployee(action: any): Generator {
  try {
    const result: any = yield call(
      apiMethodUsers.loginEmployee,
      action.payload
    );

    if (result.data.statusCode >= 400) {
      return yield put(doLoginFailed(result.data));
    }

    yield put(doLoginSuccess(result.data));
  } catch (e: any) {
    yield put(
      doLoginFailed({
        message: e,
      })
    );
  }
}

function* handleLoginGuest(action: any): Generator {
  try {
    const result: any = yield call(apiMethodUsers.loginGuest, action.payload);

    if (result.data.statusCode >= 400) {
      return yield put(doLoginFailed(result.data));
    }

    yield put(doLoginSuccess(result.data));
  } catch (e: any) {
    yield put(
      doLoginFailed({
        message: e,
      })
    );
  }
}

function* handleLogoutEmployee(action: any): Generator {
  try {
    yield put(doLogoutSuccess());
  } catch (e) {
    return e;
  }
}

export { handleLoginEmployee, handleLogoutEmployee, handleLoginGuest };
