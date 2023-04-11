import apiMethodBooking from "@/api/booking/apiMethodBooking";
import { call, put } from "redux-saga/effects";
import { doResponseCreateBookingsTemporary, doResponseGetBookingyQuery, doResponseGetListBooking, doResponseGetOtherRooms } from "../action/bookingActionReducer";


function* handleGetAllListBooking(action: any): Generator {
    try {

        const result: any = yield call(
            apiMethodBooking.getAllBookingApi,
            action.payload
        );
        console.log(result.data)
        if (result.data.statusCode === 200) {
            yield put(doResponseGetListBooking(result.data))
        }
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

function* handleGetOneBooking(action: any): Generator {
    try {

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

function* handleCreateBookingsTemporary(action: any): Generator {
    try {

        const result: any = yield call(
            apiMethodBooking.createTempoBorde,
            action.payload
        );

        yield put(doResponseCreateBookingsTemporary(result.data))

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






export { handleGetAllListBooking, handleGetOneBooking, handleCreateBookingsTemporary };

