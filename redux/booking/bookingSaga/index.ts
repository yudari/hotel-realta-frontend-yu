import { all, takeEvery } from "redux-saga/effects";
import ActionTypesUsers from "../action/actionTypeBooking";
import { handleGetAllListBooking, handleGetOneBooking } from "./bookingSaga";
import handleGetAllFacilitiesSupport from "./facilitiesSupportSaga";
import { handleGetOtherRooms } from "./otherRoomsSaga";




function* watchAll() {
    yield all([
        takeEvery(ActionTypesUsers.REQ_GET_ALL_LIST_BOOKING, handleGetAllListBooking),
        takeEvery(ActionTypesUsers.REQ_GET_ALL_FACILITIES_SUPPORT, handleGetAllFacilitiesSupport),
        takeEvery(ActionTypesUsers.REQ_GET_ONE_BOOKING, handleGetOneBooking),
        takeEvery(ActionTypesUsers.REQ_GET_OTHER_ROOMS, handleGetOtherRooms),
    ]);
}

export default watchAll;
