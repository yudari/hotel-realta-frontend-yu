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
