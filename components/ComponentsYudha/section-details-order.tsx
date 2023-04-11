import type { NextPage } from "next";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactDatePicker from "react-datepicker";
import apiMethodBooking from "@/api/booking/apiMethodBooking";
import { useDispatch, useSelector } from "react-redux";
import { doRequestCreateBookingTemporary, doRequestGetBookingByQuery } from "@/redux/booking/action/bookingActionReducer";

interface SectionDetailsOrderInterface {
  dataBookings: any;
  startDateFinal: any;
  endDateFinal: any;
}

const SectionDetailsOrder: NextPage<SectionDetailsOrderInterface> = (props) => {
  const [startDateOpen, setStartDateOpen] = useState<Date>(new Date());
  const [startDateClose, setStartDateClose] = useState<Date>(new Date());
  const { bookings, message, status } = useSelector((state: any) => state.bookingReducers)
  const { bookingsTemporary, status: statusBookingsTemporary, message: messageBookingsTemporary } = useSelector((state: any) => state.bookingsTemporaryReducers)
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<any>({})
  const [dataPickRooms, setDataPickRooms] = useState([])
  const [getDataAllRooms, setGetDataAllRooms] = useState([props.dataBookings.data.data_rooms[0]])
  const [selectedRooms, setSelectedRooms] = useState<any>([props.dataBookings.data.data_rooms[0]]);
  const router = useRouter();
  const dispatch = useDispatch()
  const onButtonLanjutBookingClick = async () => {
    const dataBookingRooms = bookings.data.data_rooms.map((room: any) => {
      const converseFaciRatePrice = parseInt(room.faci_rate_price.replace(/[^\d]/g, "").slice(0, -2))
      let priceDiscount = converseFaciRatePrice - Number(room.faci_discount) * converseFaciRatePrice;
      let subTotal = priceDiscount + Number(room.faci_tax_rate) * priceDiscount;
      return {
        borde_checkin: new Date(startDateOpen.toISOString().substring(0, 10)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' }),
        borde_checkout: new Date(startDateClose.toISOString().substring(0, 10)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' }),
        borde_adults: room.faci_max_number,
        borde_kids: 0,
        borde_price: converseFaciRatePrice,
        borde_extra: 0,
        borde_discount: Number(room.faci_discount) * converseFaciRatePrice,
        borde_tax: Number(room.faci_tax_rate) * converseFaciRatePrice,
        borde_subtotal: subTotal,
        borde_faci_id: room.faci_id
      }
    })

    const dataInsertTemporaryBooking: any = {
      booking_orders: {
        boor_hotel_id: props.dataBookings?.data?.data_rooms[0]?.hotel?.hotel_id,
        boor_user_id: users.user_id,
        booking_order_detail: dataBookingRooms
      }
    }

    try {
      // const response = await apiMethodBooking.createTempoBorde(dataInsertTemporaryBooking);
      // const newData = response.data
      // console.log(newData)
      dispatch(doRequestCreateBookingTemporary(dataInsertTemporaryBooking))

    } catch (error) {
      console.error(error);
    }
    // router.push("/booking/detail-booking-pembayaran-fina");
  };

  const ButtonPickDateCheckIn = forwardRef<HTMLButtonElement, { value: string; onClick: () => void }>((props, ref) => (
    <button onClick={props.onClick} ref={ref} className="cursor-pointer border-none py-1 px-0.5 bg-seagreen rounded w-full shrink-0 flex flex-row box-border items-center justify-center gap-[2px]">
      <img
        className="relative w-5 h-19 shrink-0 overflow-hidden"
        alt=""
        src="/claritydatesolid2.svg"
      />
      <div className="flex-1 relative text-[12px] font-semibold font-montserrat-semibold-14 text-neutrals text-center">
        {props.value}
      </div>
    </button>
  ));

  const ButtonPickDateCheckOut = forwardRef<HTMLButtonElement, { value: string; onClick: () => void }>((props, ref) => (
    <div onClick={props.onClick} className="rounded bg-crimson cursor-pointer w-full shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center gap-[2px]">
      <img
        className="relative w-5 h-[19px] shrink-0 overflow-hidden"
        alt=""
        src="/claritydatesolid2.svg"
      />
      <div className="flex-1 relative font-semibold">{props.value}</div>
    </div>
  ));




  if (!(props.startDateFinal instanceof Date && !isNaN(props.startDateFinal.getTime()))) {
    console.error("Invalid start date", props.startDateFinal);
    // Handle the error as appropriate
  } else {
    setStartDateOpen(props.startDateFinal);
  }

  if (!(props.endDateFinal instanceof Date && !isNaN(props.endDateFinal.getTime()))) {
    console.error("Invalid end date", props.endDateFinal);
    // Handle the error as appropriate
  } else {
    setStartDateClose(props.endDateFinal);
  }
  const formattedStartDate = startDateOpen.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });


  const toggleDropdown = async () => {

    const dataAllRooms = {
      hotel_id: props.dataBookings.data?.data_rooms[0]?.hotel.hotel_id,
      room_id: props.dataBookings.data?.data_rooms[0]?.faci_id,
      room_name: props.dataBookings.data?.data_rooms[0]?.faci_name
    }
    try {
      const response = await apiMethodBooking.getListSameRoom({ IdHotel: dataAllRooms.hotel_id, IdRooms: dataAllRooms.room_id, nameRoom: dataAllRooms.room_name });
      const newData = response.data.data.filter((room: any) => {
        return !getDataAllRooms.some((existingRoom) => existingRoom.faci_id === room.faci_id);
      });
      setGetDataAllRooms((prevValue) => [...prevValue, ...newData]);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRoom = getDataAllRooms.find((room) => room.faci_id === parseInt(event.target.id));
    if (event.target.checked) {
      setSelectedRooms((prev: any) => [...prev, selectedRoom]);
    } else {
      setSelectedRooms((prev: any) => prev.filter((room: any) => room.faci_id !== selectedRoom.faci_id));
    }
  };
  const totalPrice: number = parseInt(props.dataBookings.data.total_price.replace(/[^\d]/g, '').slice(0, -2));
  const totalPriceReal: number = parseInt(props.dataBookings.data.total_price_real.replace(/[^\d]/g, '').slice(0, -2));
  const JumlahPenguranganPrice = totalPriceReal - totalPrice
  const finalTotalPrice = totalPriceReal - JumlahPenguranganPrice

  const dataPickPiihOpsiBooking = () => {
    const AllRoomsFinal = {
      IdRooms: selectedRooms[0].faci_id,
      IdHotel: selectedRooms[0].hotel.hotel_id,
      startDate: new Date(startDateOpen.toISOString().substring(0, 10)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' }),
      endDate: new Date(startDateClose.toISOString().substring(0, 10)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' }),
      dataRooms: `[${selectedRooms.map((data: any) => data.faci_id).join(', ')}]`,
      guestRooms: `[${selectedRooms.map((data: any) => data.faci_max_number).join(', ')}]`,
    }
    console.log(AllRoomsFinal)
    dispatch(doRequestGetBookingByQuery(AllRoomsFinal.IdRooms, AllRoomsFinal.IdHotel, AllRoomsFinal.startDate, AllRoomsFinal.endDate, AllRoomsFinal.dataRooms, AllRoomsFinal.guestRooms))

    setIsOpen(false)
  }



  // Output: Hasil pengurangan uang dalam bentuk number

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("loginData") || "{}");

    setUsers(userLogin)
  }, [])


  useEffect(() => {
    if (Object.keys(bookingsTemporary).length > 0) {
      let totalGuest = 0;
      let totalRooms = bookingsTemporary?.data?.length;

      bookingsTemporary?.data?.forEach((data: any) => {
        totalGuest = totalGuest + data.borde_adults
      })


      router.push({
        pathname: '/booking/detail-booking-pembayaran-final',
        query: {
          IdOrderDetail: bookingsTemporary?.data[0]?.border_boor_id,
          IdUser: users.user_id,
          CheckIn: new Date(startDateOpen.toISOString().substring(0, 10)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' }),
          CheckOut: new Date(startDateClose.toISOString().substring(0, 10)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' }),
          TotalGuest: totalGuest,
          totalRooms: totalRooms
        }
      })
    }
  }, [statusBookingsTemporary])
  return (
    <div className="self-stretch body-txt-body-s-regular flex flex-col py-[42px] px-[92px] items-start justify-start text-left text-[18px] text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="rounded-t rounded-b-none w-[1232px] flex flex-row py-1 pr-4 pl-0 box-border items-center justify-start gap-[30px]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
          <div className="w-[498px] flex flex-row items-center justify-start text-[12px]">
            <b className="flex-1 relative">
              {props.dataBookings.data.data_rooms[0].hotel.hotel_name}
            </b>
          </div>
          <div className="flex flex-col items-start justify-start gap-[8px] text-[14px] text-darkslategray-100">
            <div className="self-stretch flex flex-row items-start justify-between">
              <img
                className="relative w-[18px] h-[18px] shrink-0 overflow-hidden"
                alt=""
                src="/location.svg"
              />
              <div className="relative font-medium opacity-[0.75]">{`${props.dataBookings.data.data_rooms[0].hotel.address.addr_line1}, ${props.dataBookings.data.data_rooms[0].hotel.address.city.city_name}, ${props.dataBookings.data.data_rooms[0].hotel.address.city.provinces.prov_name}, ${props.dataBookings.data.data_rooms[0].hotel.address.city.provinces.country.country_name}`} </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[4px] text-[12px] text-darkslategray-300 font-montserrat-semibold-14">
              <div className="w-10 shrink-0 flex flex-col items-start justify-start">
                <div className="self-stretch rounded box-border h-8 shrink-0 flex flex-row py-2 px-4 items-center justify-center border-[1px] border-solid border-darkslategray-300">
                  <div className="relative font-medium">{props.dataBookings.data.data_rooms[0].hotel.hotel_rating_final_star}</div>
                </div>
              </div>
              <div className="relative font-medium text-darkslategray-100 opacity-[0.75]">
                {props.dataBookings.data.data_rooms[0].hotel.hotel_rating_status} {props.dataBookings.data.data_rooms[0].hotel.hotel_reviews.length} reviews
              </div>
            </div>
            <div className="rounded-sm bg-slamon shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] w-[88px] flex flex-col py-1 px-3 box-border items-center justify-center text-5xs text-neutrals">
              <div className="self-stretch relative font-medium ">
                {props.dataBookings.data.data_rooms[0].faci_memb_name} MEMBER
              </div>
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col py-[25px] px-0 items-start justify-start gap-[10px]">
            <b className="self-stretch relative">Deskripsi</b>
            <div className="self-stretch relative text-[16px] font-medium text-darkslategray-100 opacity-[0.75]">
              {props.dataBookings.data.data_rooms[0].hotel.hotel_description}
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col pt-0 px-0 pb-[25px] items-start justify-start text-blackish-green">
            <div className="self-stretch flex flex-col items-start justify-start gap-[32px]">
              <b className="self-stretch relative text-darkslategray-300">Fasilitas</b>
              <div className="self-stretch flex flex-row items-start justify-between text-[16px] font-montserrat-semibold-14">
                <div className="w-[229px] shrink-0 flex flex-col items-start justify-start gap-[24px]">
                  {props.dataBookings.data.data_rooms[0].hotel.facilities_support.map((dataFaciSupport: any) => {
                    return <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                      <img
                        className="relative w-6 h-6 shrink-0 overflow-hidden"
                        alt={dataFaciSupport.fs_name}
                        src={dataFaciSupport.fs_icon_url}
                      />
                      <div className="relative font-medium text-darkslategray-100 opacity-[0.75]">{dataFaciSupport.fs_name}</div>
                    </div>
                  })}

                </div>
                {/* <div className="flex flex-col items-start justify-start gap-[24px]">
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/makifitnesscentre.svg"
                    />
                    <div className="relative font-medium">Fitness center</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/ionwine.svg"
                    />
                    <div className="relative font-medium">Bar/Lounge</div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[8px]">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/wifi.svg"
                    />
                    <div className="relative font-medium">Free Wi-Fi</div>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-between">
                    <img
                      className="relative w-6 h-6 shrink-0 overflow-hidden"
                      alt=""
                      src="/breakfast.svg"
                    />
                    <div className="relative font-medium">
                      Tea/coffee machine
                    </div>
                  </div>
                  <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch relative text-[16px] font-semibold font-montserrat-semibold-14 text-slamon text-left inline-block">
                    +24 more
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] w-[410px] shrink-0 flex flex-col py-8 px-6 box-border items-center justify-start text-center text-[12px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-center justify-start gap-[32px] text-left text-[16px]">
              <div className="flex-1 relative font-semibold">
                {users.user_id ? users.user_full_name : 'Login untuk booking'}
              </div>
              {!users && <button className="cursor-pointer [border:none] py-2 px-7 bg-darkslategray-300 rounded w-[110px] h-10 shrink-0 flex flex-row box-border items-center justify-center">
                <div className="relative text-[16px] leading-[148%] font-body-txt-body-s-regular text-neutrals text-center">
                  Login
                </div>
              </button>}
            </div>
            <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
            <div className="self-stretch flex flex-row items-start justify-start gap-[14px] text-neutrals font-montserrat-semibold-14">
              <ReactDatePicker className="z-50"
                selected={startDateOpen}
                onChange={(date: Date) => setStartDateOpen(date)}
                dateFormat="MM/dd/yyyy"
                customInput={<ButtonPickDateCheckIn value={startDateOpen.toLocaleDateString()} onClick={function (): void {
                }} />}
              />
              {/* <button className="cursor-pointer [border:none] py-1 px-0.5 bg-seagreen rounded w-[95px] shrink-0 flex flex-row box-border items-center justify-center gap-[2px]">
                <img
                  className="relative w-5 h-[19px] shrink-0 overflow-hidden"
                  alt=""
                  src="/claritydatesolid2.svg"
                />
                <div className="flex-1 relative text-[12px] font-semibold font-montserrat-semibold-14 text-neutrals text-center">
                  {props.startDateFinal}
                </div>
              </button> */}
              <ReactDatePicker
                selected={startDateClose}
                onChange={(date: Date) => setStartDateClose(date)}
                dateFormat="MM/dd/yyyy"
                customInput={<ButtonPickDateCheckOut value={startDateClose.toLocaleDateString()} onClick={function (): void {
                }} />}
              />
              <div className="relative">
                <button
                  className="self-stretch rounded bg-slamon w-[140px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center"
                  onClick={toggleDropdown}
                >
                  <div className="flex-1 relative font-semibold">
                    {props.dataBookings.data.data_rooms[0].faci_room_number} Room, 2 Guest
                  </div>
                  <svg
                    className="h-4 w-4 fill-current text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute z-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden">
                    <ul className="border border-gray-200 divide-y divide-gray-200">
                      {getDataAllRooms.map((room) => {
                        return (
                          <li key={room.faci_id} className="px-4 py-2 flex items-center">
                            <input
                              type="checkbox"
                              checked={room.faci_id === props.dataBookings.data.data_rooms[0].faci_id || selectedRooms.some((selectedRoom: any) => selectedRoom.faci_id === room.faci_id)}
                              disabled={room.faci_id === props.dataBookings.data.data_rooms[0].faci_id}
                              id={room.faci_id}
                              name="checkbox1"
                              value={room}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="checkbox1" className="ml-3 text-[14px] font-semibold text-slamon">
                              {room.faci_room_number} Room, {room.faci_max_number} Guest
                            </label>
                          </li>
                        );
                      })}
                      <button
                        className="self-stretch rounded bg-slamon w-full hover:cursor-pointer hover:bg-red-700  shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center"
                        onClick={dataPickPiihOpsiBooking}
                      >Pilih</button>
                    </ul>
                  </div>
                )}
              </div>

            </div>
            <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row items-start justify-between">
                  <div className="relative font-medium text-left">
                    {props.dataBookings.data.total_price}/malam
                  </div>
                  <div className="relative [text-decoration:line-through] font-medium inline-block w-[96.5px] shrink-0">
                    {props.dataBookings.data.total_price_real}
                  </div>
                  <div className="relative text-slamon inline-block w-[96.5px] shrink-0">
                    {parseFloat(props.dataBookings.data.data_rooms[0].faci_discount) * 100}% Off
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-left">
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="flex-1 relative">Include Pajak</div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-left">
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="flex-1 relative font-semibold">
                    {props.dataBookings.data.data_rooms[0].faci_name}
                  </div>
                </div>
              </div>

              <div className="self-stretch flex flex-col pt-3 px-0 pb-0 items-start justify-start gap-[16px]">
                <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
                <div className="self-stretch flex flex-row items-start justify-between">
                  <div className="relative leading-[132%]">Your Savings</div>
                  <div className="relative leading-[132%]">-{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(JumlahPenguranganPrice)}</div>
                </div>
              </div>
              <div className="self-stretch flex flex-col pt-3 px-0 pb-0 items-start justify-start gap-[16px]">
                <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
                <div className="self-stretch flex flex-row items-start justify-between">
                  <div className="flex flex-col items-start justify-start gap-[2px]">
                    <div className="relative leading-[132%]">Total Price</div>
                    <div className="relative leading-[132%]">
                      (*termasuk pajak*)
                    </div>
                  </div>
                  <div className="relative leading-[132%]">{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(finalTotalPrice)}</div>
                </div>
              </div>
              <button
                className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 self-stretch rounded flex flex-row items-center justify-center"
                onClick={onButtonLanjutBookingClick}
              >
                <div className="flex-1 relative text-[14px] font-semibold font-montserrat-semibold-14 text-neutrals text-center">
                  Lanjut Booking
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetailsOrder;
