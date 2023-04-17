import ActionTypesBooking from './actionTypeBooking'

export const doRequestGetListBooking = (...payload: any[]) => {
  return {
    type: ActionTypesBooking.REQ_GET_ALL_LIST_BOOKING,
    payload: {
      page: payload[0],
      minSubTotal: payload[1],
      maxSubTotal: payload[2],
      cityName: payload[3],
      provName: payload[4],
      countryName: payload[5],
      regionName: payload[6],
      startDate: payload[7],
      endDate: payload[8],
      facilities_support_filter: payload[9],
    },
  }
}

export const doResponseGetListBooking = (payload: any) => {
  return {
    type: ActionTypesBooking.RES_GET_ALL_LIST_BOOKING,
    payload,
  }
}

export const doRequestGetAllFacilitiesSupport = (): any => {
  return {
    type: ActionTypesBooking.REQ_GET_ALL_FACILITIES_SUPPORT,
  }
}

export const doResponseGetAllFacilitiesSupport = (payload: any) => {
  return {
    type: ActionTypesBooking.RES_GET_ALL_FACILITIES_SUPPORT,
    payload: payload,
  }
}

export const doRequestGetBookingByQuery = (...payload: any[]) => {
  console.log(payload)
  return {
    type: ActionTypesBooking.REQ_GET_ONE_BOOKING,
    payload: {
      idHotel: payload[0],
      idRooms: payload[1],
      startDate: payload[2],
      endDate: payload[3],
      dataRooms: payload[4],
      guestRooms: payload[5],
    },
  }
}

export const doResponseGetBookingyQuery = (payload: any) => {
  console.log(payload)
  return {
    type: ActionTypesBooking.RES_GET_ONE_BOOKING,
    payload: payload,
  }
}

export const doRequestGetOtherRooms = (...payload: any[]) => {
  console.log(payload)
  return {
    type: ActionTypesBooking.REQ_GET_OTHER_ROOMS,
    payload: {
      IdRoomNow: payload[0],
      NotRoomName: payload[1],
      IdCagro: payload[2],
    },
  }
}

export const doResponseGetOtherRooms = (payload: any) => {
  console.log(payload)
  return {
    type: ActionTypesBooking.RES_GET_OTHER_ROOMS,
    payload: payload,
  }
}

export const doResponseGetOneDetailPembayaran = (payload: any) => {
  return {
    type: ActionTypesBooking.RES_GET_ONE_DETAIL_PEMBAYARAN_BOOKING,
    payload: payload
  }
}

export const doRequestGetOneDetailPembayaran = (...payload: any) => {
  return {
    type: ActionTypesBooking.REQ_GET_ONE_DETAIL_PEMBAYARAN_BOOKING,
    payload: { IdOrderDetail: payload[0], IdUser: payload[1], CheckIn: payload[2], CheckOut: payload[3], TotalGuest: payload[4], TotalRooms: payload[5] }
  }
}
export const doResponseCreateBookingsTemporary = (payload: any) => {
  return {
    type: ActionTypesBooking.RES_CREATE_TEMPORARY_BORDE,
    payload: payload
  }
}