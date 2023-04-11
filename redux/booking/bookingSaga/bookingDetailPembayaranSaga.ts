import apiMethodBooking from "@/api/booking/apiMethodBooking";
import { call, put } from "redux-saga/effects";
import { doResponseGetOneDetailPembayaran } from "../action/bookingActionReducer";




function* handleGetOneDetailPembayaran(action: any): Generator {
    try {
        console.log(action.payload)
        const result: any = yield call(
            apiMethodBooking.getDetailPembayaran,
            action.payload
        );

        console.log(result)

        yield put(doResponseGetOneDetailPembayaran(result.data))

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


export { handleGetOneDetailPembayaran };

