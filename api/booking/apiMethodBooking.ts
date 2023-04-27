import axios from "@/config/endpoint";

const getAllBookingApi = ({ page, minSubTotal, maxSubTotal, cityName, provName, countryName, regionName, startDate, endDate, facilities_support_filter }: any) => {
    console.log(page, minSubTotal, maxSubTotal, cityName, provName, countryName, regionName, startDate, endDate, facilities_support_filter)
    return axios.get(`/booking/?page=${page}&minSubtotal=${minSubTotal}&maxSubTotal=${maxSubTotal}&cityName=${cityName}&provName=${provName}&countryName=${countryName}&regionName=${regionName}&startDate=${startDate}&endDate=${endDate}&facilities_support_filter=[${facilities_support_filter.join(', ')}]`);
};

const getBookingByQuery = ({ idRooms, idHotel, startDate, endDate, dataRooms, guestRooms }: any) => {
    return axios.get(`/booking/hotel/${idHotel}/room/${idRooms}?startDate=${startDate}&endDate=${endDate}&dataRooms=${dataRooms}&guestRooms=${guestRooms}`)
}

const getAllFacilitiesSupport = () => {
    return axios.get('/facilities-support')
}

const getListOtherRooms = ({ IdRoomNow, NotRoomName, IdCagro }: any) => {
    return axios.get(`/booking/hotel/${IdRoomNow}/room/?NotRoomName=${NotRoomName}&IdCagro=${IdCagro}`)
}
const getListSameRoom = ({ IdHotel, IdRooms, nameRoom }: any) => {
    return axios.get(`/booking/hotel/${IdHotel}/room/${IdRooms}/${nameRoom}`)
}

const createTempoBorde = (isiBordeTempo: any) => {
    return axios.post(`/booking/hotel/rooms/order_booking/`, isiBordeTempo)
}

const getDetailPembayaran = ({ IdOrderDetail, IdUser, CheckIn, CheckOut, TotalGuest, TotalRooms }: any) => {
    return axios.get(`/booking/hotel/rooms/order_booking_final/${IdOrderDetail}/${IdUser}?CheckIn=${CheckIn}&CheckOut=${CheckOut}&TotalGuest=${TotalGuest}&TotalRooms=${TotalRooms}`)
}

const getAllSpecialRoomByBoorId = (IdBoor: any) => {
    return axios.get(`/booking/hotel/rooms/coupons/${IdBoor}`)
}

const pickKuponBooking = ({ paramSubmitKupon, pickingSubmitKupon }: any) => {
    return axios.post(`/booking/hotel/rooms/coupons/?IdUser=${paramSubmitKupon.IdUser}&TotalGuest=${paramSubmitKupon.TotalGuest}&TotalRooms=${paramSubmitKupon.TotalRooms}`, pickingSubmitKupon)
}

const getUserMembersAPI = (IdUser: any) => {
    return axios.get(`users/userMembers/${IdUser}`)
}
const getAllExtraItems = () => {
    return axios.get(`/booking/price-items/`)
}

const getUserByIdentities = ({ userName }: any) => {
    return axios.get(`/users/usersByName?search=${userName}`)
}

const getUserById = (IdUser: any) => {
    return axios.get(`/users/${IdUser}`)
}

const getAllPaymentUser = (IdUser: any) => {
    return axios.get(`/accounts?id=${IdUser}`)
}

const getUserPaymentDetail = (metPemUser: any, rekeningUser: any) => {
    return axios.get(`/accounts?metPemUser=${metPemUser}&rekeningUser=${rekeningUser}`)
}

const createExtraItemPrice = (dataExtraItems: any, IdUser: any, TotalGuest: any, TotalRooms: any) => {
    return axios.post(`booking/hotel/rooms/extra/?IdUser=${IdUser}&TotalGuest=${TotalGuest}&TotalRooms=${TotalRooms}`, dataExtraItems)
}

const createBreakFeast = (ParamBoorId: any, DataInputBreakFeast: any) => {
    return axios.post(`booking/hotel/breakfeast/${ParamBoorId}`, DataInputBreakFeast)
}

const updateUserMemberPointsBooking = (UserMemberId: any, UserMemberName: any, dataUpdateUserMemberPoints: any) => {
    return axios.put(`booking/user_points?UserMemberId=${UserMemberId}&UserMemberName=${UserMemberName}`, dataUpdateUserMemberPoints)
}

const createBookingOrdersDetail = (IdBoor: any, BordeIdAll: any, dataUpdate: any) => {
    console.log(`booking/booking_orders_detail/${IdBoor}?Borde_Id_All=[${BordeIdAll}]`)
    return axios.put(`booking/booking_orders_detail/${IdBoor}?Borde_Id_All=[${BordeIdAll}]`, dataUpdate)
}

const createBookingOrderFinal = (IdBoor: any, dataOrder: any) => {
    return axios.put(`booking/booking_orders/${IdBoor}`, dataOrder)
}

const userBookingInfoDetail = (IdUser: any) => {
    return axios.get(`http://localhost:5000/users/${IdUser}`)
}

const transactionBookingPayment = (dataPayment: any) => {
    return axios.post(`${process.env.BACKEND_URL}/transaction/payment`, dataPayment)
}

const removeBookingOrders = (IdBoor: any) => {
    return axios.delete(`booking/booking_orders/${IdBoor}`)
}


export default {
    getAllBookingApi,
    getAllFacilitiesSupport,
    getBookingByQuery,
    getListOtherRooms,
    getListSameRoom,
    createTempoBorde,
    getDetailPembayaran,
    getAllSpecialRoomByBoorId,
    pickKuponBooking,
    getUserMembersAPI,
    getAllExtraItems,
    getUserByIdentities,
    getUserById,
    getAllPaymentUser,
    getUserPaymentDetail,
    createExtraItemPrice,
    createBreakFeast,
    updateUserMemberPointsBooking,
    createBookingOrdersDetail,
    createBookingOrderFinal,
    userBookingInfoDetail,
    transactionBookingPayment,
    removeBookingOrders
}