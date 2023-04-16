import ActionTypesBooking from "../action/actionTypeBooking";

const initialState = {
    bookings: {},
    status: false,
    message: '',
};

function bookingReducers(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case ActionTypesBooking.RES_GET_ALL_LIST_BOOKING:
            return {

                bookings: payload,
                status: true,
                message: 'Data berhasil didapatkan',
            };
        case ActionTypesBooking.RES_GET_ONE_BOOKING:
            return {

                bookings: payload,
                status: true,
                message: `Data telah berhasil didapatkan`
            }
        default:
            return state;
    }
}

export default bookingReducers