import apiMethodUsers from "@/api/users/apiMethodUsers";
import { call, put } from "redux-saga/effects";
import {
  doUpdatePasswordFailed,
  doUpdatePasswordSuccess,
  doUpdateProfileFailed,
  doUpdateProfileSuccess,
} from "../action/usersActionReducer";

function* handleUpdateProfile(action: any): Generator {
  try {
    const result: any = yield call(
      apiMethodUsers.updateProfile,
      action.payload.id,
      action.payload.data
    );

    if (result.data.statusCode >= 400) {
      return yield put(doUpdateProfileFailed(result.data));
    }

    yield put(doUpdateProfileSuccess(result.data));
  } catch (e) {
    yield put(
      doUpdateProfileFailed({
        message: e,
      })
    );
  }
}

function* handleUpdatePassword(action: any): Generator {
  try {
    const result: any = yield call(
      apiMethodUsers.updatePassword,
      action.payload.id,
      action.payload.data
    );

    if (result.data.statusCode >= 400) {
      return yield put(doUpdatePasswordFailed(result.data));
    }

    yield put(doUpdatePasswordSuccess(result.data));
  } catch (e) {
    yield put(
      doUpdatePasswordFailed({
        message: e,
      })
    );
  }
}
export { handleUpdateProfile, handleUpdatePassword };

// import apiMethodUsers from "@/api/users/apiMethodUsers";
// import { call, put } from "redux-saga/effects";
// import {
//   doLoginEmployee,
//   doLoginFailed,
//   doLoginSuccess,
// } from "../action/usersActionReducer";

// function* handleLoginEmployee(action: any): Generator {
//   try {
//     const result: any = yield call(
//       apiMethodUsers.loginEmployee,
//       action.payload
//     );

//     if (result.data.statusCode >= 400) {
//       return yield put(doLoginFailed(result.data));
//     }

//     yield put(doLoginSuccess(result.data));
//   } catch (e: any) {
//     yield put(
//       doLoginFailed({
//         message: e,
//       })
//     );
//   }
// }

// export { handleLoginEmployee };
