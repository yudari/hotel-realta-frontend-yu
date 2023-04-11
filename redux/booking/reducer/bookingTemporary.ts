import ActionTypesBooking from "../action/actionTypeBooking";

const initialState = {
    bookingsTemporary: {},
    status: false,
    message: '',
};

function bookingsTemporaryReducers(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case ActionTypesBooking.RES_CREATE_TEMPORARY_BORDE:
            console.log(payload)
            return {
                bookingsTemporary: payload,
                status: true,
                message: 'Data temporary orde detail telah dibuat',
            };
        default:
            return state;
    }
}

export default bookingsTemporaryReducers