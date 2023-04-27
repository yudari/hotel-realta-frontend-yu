import apiMethodBooking from "@/api/booking/apiMethodBooking";
import { call, put } from "redux-saga/effects";
import { doResponseGetBookingyQuery, doResponseGetListBooking } from "../action/bookingActionReducer";



function* handleGetOneBooking(action: any): Generator {
    try {
        console.log(action.payload)
        const result: any = yield call(
            apiMethodBooking.getBookingByQuery,
            action.payload
        );



        yield put(doResponseGetBookingyQuery(result.data))

        // console.log(result)
        // if (result.data.statusCode >= 400) {
        //     return yield put(doLoginFailed(result.data));
        // }

        // yield put(doLoginSuccess(result.data));
    } catch (e: any) {
        console.log(e)
        // yield put(
        //     doLoginFailed({
        //         message: e,
        //     })
        // );
    }
}


export { handleGetOneBooking };

