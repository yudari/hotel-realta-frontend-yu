import { doRequestGetBookingByQuery } from "@/redux/booking/action/bookingActionReducer";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import secureLocalStorage from "react-secure-storage";


interface InterfaceSectionRooms {
  dataOtherRooms: any;
  startDateFinal: any;
  endDateFinal: any;

}

const SectionRooms: NextPage<InterfaceSectionRooms> = (props) => {

  const router = useRouter()
  const dispatch = useDispatch()
  let dataRooms = props.dataOtherRooms.data.map((room: any) => {
    const priceRate = parseFloat(room.faci_rate_price.replace(/[$,]/g, ''));

    let priceDiscount = priceRate - room.faci_discount * priceRate;
    let subTotal = priceDiscount + room.faci_tax_rate * priceDiscount;

    return {
      ...room, faci_subtotal: subTotal
    }
  })

  const onLihatDetail = (idRooms: any, idHotel: any, startDate: any, endDate: any, dataRooms: any, guestRooms: any) => {
    secureLocalStorage.setItem('yu_id_room', {
      idHotel: idHotel,
      idRooms: idRooms,
      startDate: startDate,
      endDate: endDate,
      dataRooms: `[${dataRooms}]`,
      guestRooms: `[${guestRooms}]`
    })
    // dispatch(doRequestGetBookingByQuery(idHotel, idRooms, startDate, endDate, dataRooms, guestRooms))

    router.push({
      pathname: `/booking/detail-booking-final`,
      query: {
        idHotel: idHotel,
        idRooms: idRooms,
        startDate: startDate,
        endDate: endDate,
        dataRooms: `[${dataRooms}]`,
        guestRooms: `[${guestRooms}]`
      }
    })

  }
  console.log(dataRooms)
  return (
    <div className="self-stretch flex flex-col py-0 px-[92px] items-start justify-start text-left text-[18px] text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
        <div className="self-stretch relative bg-blackish-green h-[0.5px] shrink-0 opacity-[0.25]" />
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px]">
          <b className="self-stretch relative">Other Rooms</b>
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-[16px] text-darkslategray-100">
            {dataRooms.length > 0 ? dataRooms.map((data: any) => {
              return <div className="self-stretch flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-between">
                  <img
                    className="relative rounded w-12 h-12 shrink-0 object-cover"
                    alt=""
                    src={data.facility_photos[0].fapho_url}
                  />
                  <div className="relative font-medium ml-3">
                    {data.faci_name}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between text-right text-[12px]">
                  <div className="relative font-semibold mr-3">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(data.faci_subtotal)}/night
                  </div>
                  <button onClick={() => {
                    onLihatDetail(data.faci_id, data.hotel.hotel_id, props.startDateFinal, props.endDateFinal, data.faci_id, 1)
                  }} className="cursor-pointer py-3 px-9 bg-neutrals rounded flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-300 group hover:bg-darkslategray-200">
                    <div className="relative text-[14px] group-hover:text-white leading-[132%] font-semibold font-body-txt-body-s-regular text-darkslategray-300 text-center">
                      View Detail
                    </div>
                  </button>
                </div>
              </div>
            }) : <p className="text-[16px] text-darkslategray-100">No Other Rooms Available</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionRooms;
