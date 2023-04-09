import axios from "@/config/endpoint";

const getAllBookingApi = ({ page, minSubTotal, maxSubTotal, cityName, provName, countryName, regionName, startDate, endDate, facilities_support_filter }: any) => {

    return axios.get(`/booking/?page=${page}&minSubtotal=${minSubTotal}&maxSubTotal=${maxSubTotal}&cityName=${cityName}&provName=${provName}&countryName=${countryName}&regionName=${regionName}&startDate=${startDate}&endDate=${endDate}&facilities_support_filter=[${facilities_support_filter.join(',')}]`);
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

export default {
    getAllBookingApi,
    getAllFacilitiesSupport,
    getBookingByQuery,
    getListOtherRooms
}