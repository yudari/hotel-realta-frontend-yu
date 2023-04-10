import apiMethodUsers from "@/api/users/apiMethodUsers";
import { call, put } from "redux-saga/effects";
import {
  doRegisterFailed,
  doRegisterSuccess,
} from "../action/registerActionReducers";

function* handleRegisterEmployee(action: any): Generator {
  try {
    const result: any = yield call(
      apiMethodUsers.registerEmployee,
      action.payload
    );

    if (result.data.statusCode >= 400) {
      return yield put(doRegisterFailed(result.data));
    }

    yield put(doRegisterSuccess(result.data));
  } catch (e: any) {
    yield put(
      doRegisterFailed({
        message: e,
      })
    );
  }
}

function* handleRegisterGuest(action: any): Generator {
  try {
    const result: any = yield call(
      apiMethodUsers.registerGuest,
      action.payload
    );

    if (result.data.statusCode >= 400) {
      return yield put(doRegisterFailed(result.data));
    }

    yield put(doRegisterSuccess(result.data));
  } catch (e) {
    yield put(
      doRegisterFailed({
        message: e,
      })
    );
  }
}

export { handleRegisterEmployee, handleRegisterGuest };
