import ActionTypesBooking from "../action/actionTypeBooking";

const initialState = {
    bookingBayar: {},
    status: false,
    message: '',
};

function bookingDetailPembayaranReducers(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case ActionTypesBooking.RES_GET_ONE_DETAIL_PEMBAYARAN_BOOKING:
            return {
                bookingBayar: payload,
                status: true,
                message: `Data telah berhasil didapatkan`
            }
        default:
            return state;
    }
}

export default bookingDetailPembayaranReducers