import { all, takeEvery } from "redux-saga/effects";
import ActionTypesBooking from "../action/actionTypeBooking";
import { handleCreateBookingsTemporary, handleGetAllListBooking, handleGetOneBooking } from "./bookingSaga";
import handleGetAllFacilitiesSupport from "./facilitiesSupportSaga";
import { handleGetOtherRooms } from "./otherRoomsSaga";
import { handleGetOneDetailPembayaran } from "./bookingDetailPembayaranSaga";




function* watchAll() {
    yield all([
        takeEvery(ActionTypesBooking.REQ_GET_ALL_LIST_BOOKING, handleGetAllListBooking),
        takeEvery(ActionTypesBooking.REQ_GET_ALL_FACILITIES_SUPPORT, handleGetAllFacilitiesSupport),
        takeEvery(ActionTypesBooking.REQ_GET_ONE_BOOKING, handleGetOneBooking),
        takeEvery(ActionTypesBooking.REQ_GET_OTHER_ROOMS, handleGetOtherRooms),
        takeEvery(ActionTypesBooking.REQ_CREATE_TEMPORARY_BORDE, handleCreateBookingsTemporary),
        takeEvery(ActionTypesBooking.REQ_GET_ONE_DETAIL_PEMBAYARAN_BOOKING, handleGetOneDetailPembayaran),
    ]);
}

export default watchAll;
