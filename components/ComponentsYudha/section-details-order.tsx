import type { NextPage } from "next";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactDatePicker from "react-datepicker";
import apiMethodBooking from "@/api/booking/apiMethodBooking";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetBookingByQuery } from "@/redux/booking/action/bookingActionReducer";
import Select from "react-tailwindcss-select";

interface SectionDetailsOrderInterface {
  dataBookings: any;
  startDateFinal: any;
  endDateFinal: any;
}

const SectionDetailsOrder: NextPage<SectionDetailsOrderInterface> = (props) => {
  const optionsAdult = [
    { value: '1', label: "Adult 1" },
    { value: '2', label: "Adult 2" },
    { value: '3', label: "Adult 3" }
  ];
  const optionsKids = [
    { value: '0', label: "Kids 0" },
    { value: '1', label: "Kids 1" },
    { value: '2', label: "Kids 2" }

  ];
  const [startDateOpen, setStartDateOpen] = useState<Date>(new Date(props.startDateFinal));
  const [startDateClose, setStartDateClose] = useState<Date>(new Date(props.endDateFinal));
  const { bookings, message, status } = useSelector((state: any) => state.bookingReducers)
  const { bookingsTemporary, status: statusBookingsTemporary, message: messageBookingsTemporary } = useSelector((state: any) => state.bookingsTemporaryReducers)
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<any>({})
  const [dataPickRooms, setDataPickRooms] = useState([])
  const [getDataAllRooms, setGetDataAllRooms] = useState([props.dataBookings.data.data_rooms[0]])
  const [selectedRooms, setSelectedRooms] = useState<any>([props.dataBookings.data.data_rooms[0]]);
  const [selectedAdults, setSelectedAdults] = useState<any>(optionsAdult[0])
  const [selectedKids, setSelectedKids] = useState<any>(optionsKids[0])
  const router = useRouter();
  const dispatch = useDispatch()

  const onButtonLanjutBookingClick = async () => {
    const dataBookingRooms = bookings.data.data_rooms.map((room: any) => {
      const startDateConverse = new Date(startDateOpen)
      const startCloseConverse = new Date(startDateClose)
      startDateConverse.setDate(startDateOpen.getDate())
      const startDateConverseFinal = startDateConverse.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })

      startCloseConverse.setDate(startCloseConverse.getDate())
      const startCloseConverseFinal = startCloseConverse.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })



      const converseFaciRatePrice = parseInt(room.faci_rate_price.replace(/[^\d]/g, "").slice(0, -2))
      let priceDiscount = converseFaciRatePrice - Number(room.faci_discount) * converseFaciRatePrice;
      let subTotal = priceDiscount + Number(room.faci_tax_rate) * priceDiscount;
      console.log(selectedAdults)
      return {
        borde_checkin: startDateConverseFinal,
        borde_checkout: startCloseConverseFinal,
        borde_adults: Number(selectedAdults.value),
        borde_kids: Number(selectedKids.value),
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

      const dataCreateBookingTempo = await apiMethodBooking.createTempoBorde(dataInsertTemporaryBooking)
      const dataResponseCreateBookingTempo = dataCreateBookingTempo.data

      // dispatch(doRequestCreateBookingTemporary(dataInsertTemporaryBooking))

      let totalGuest = 0;
      let totalRooms = dataResponseCreateBookingTempo?.data?.length;

      console.log(dataCreateBookingTempo)
      dataResponseCreateBookingTempo?.data?.forEach((data: any) => {
        totalGuest = totalGuest + Number(data?.borde_adults) + Number(data?.borde_kids)
      })
      console.log(totalGuest)
      console.log(dataResponseCreateBookingTempo)
      const startDateConverse = new Date(startDateOpen)
      const startCloseConverse = new Date(startDateClose)
      startDateConverse.setDate(startDateOpen.getDate())
      const startDateConverseFinal = startDateConverse.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })

      startCloseConverse.setDate(startCloseConverse.getDate())
      const startCloseConverseFinal = startCloseConverse.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })

      console.log({
        IdOrderDetail: dataResponseCreateBookingTempo?.data[0]?.border_boor_id,
        IdUser: users.user_id,
        CheckIn: startDateConverseFinal,
        CheckOut: startCloseConverseFinal,
        TotalGuest: totalGuest,
        totalRooms: totalRooms
      })

      router.push({
        pathname: '/booking/detail-booking-pembayaran-final',
        query: {
          IdOrderDetail: dataResponseCreateBookingTempo?.data[0]?.border_boor_id,
          IdUser: users.user_id,
          CheckIn: startDateConverseFinal,
          CheckOut: startCloseConverseFinal,
          TotalGuest: totalGuest,
          totalRooms: totalRooms
        }
      })



    } catch (error) {
      console.error(error);
    }
    // router.push("/booking/detail-booking-pembayaran-fina");
  }


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
  let discountPrice = totalPriceReal * (Number(selectedRooms[0].faci_discount))
  let taxPrice = (totalPriceReal - discountPrice) * (Number(selectedRooms[0].faci_tax_rate))

  let finalTotalPrice = totalPriceReal - discountPrice + taxPrice
  console.log(selectedRooms[0].faci_tax_rate)
  const dataPickPiihOpsiBooking = () => {
    const startDateConverse = new Date(startDateOpen)
    const startCloseConverse = new Date(startDateClose)
    startDateConverse.setDate(startDateOpen.getDate())
    const startDateConverseFinal = startDateConverse.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })

    startCloseConverse.setDate(startCloseConverse.getDate())
    const startCloseConverseFinal = startCloseConverse.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })


    const AllRoomsFinal = {
      IdHotel: selectedRooms[0].hotel.hotel_id,
      IdRooms: selectedRooms[0].faci_id,
      startDate: startDateConverseFinal,
      endDate: startCloseConverseFinal,
      dataRooms: `[${selectedRooms.map((data: any) => data.faci_id).join(', ')}]`,
      guestRooms: `[${selectedRooms.map((data: any) => data.faci_max_number).join(', ')}]`,
    }
    console.log(AllRoomsFinal)
    dispatch(doRequestGetBookingByQuery(AllRoomsFinal.IdHotel, AllRoomsFinal.IdRooms, AllRoomsFinal.startDate, AllRoomsFinal.endDate, AllRoomsFinal.dataRooms, AllRoomsFinal.guestRooms))

    setIsOpen(false)
  }

  const handleChangeAdult = (values: any) => {
    console.log('Value : ' + values)
    setSelectedAdults(values)
  }
  const handleChangeKids = (values: any) => {
    console.log(`Values : ${values}`)
    setSelectedKids(values)
  }


  // Output: Hasil pengurangan uang dalam bentuk number

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("loginData") || "{}");

    setUsers(userLogin)
  }, [])


  // useEffect(() => {
  //   if (Object.keys(bookingsTemporary).length > 0) {
  //     console.log(bookingsTemporary)
  //     let totalGuest = 0;
  //     let totalRooms = bookingsTemporary?.data?.length;

  //     bookingsTemporary?.data?.forEach((data: any) => {
  //       totalGuest = totalGuest + data.borde_adults
  //     })
  //     const startDateConverse = new Date(startDateOpen)
  //     const startCloseConverse = new Date(startDateClose)
  //     startDateConverse.setDate(startDateOpen.getDate())
  //     const startDateConverseFinal = startDateConverse.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })

  //     startCloseConverse.setDate(startCloseConverse.getDate())
  //     const startCloseConverseFinal = startCloseConverse.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })


  //     router.push({
  //       pathname: '/booking/detail-booking-pembayaran-final',
  //       query: {
  //         IdOrderDetail: bookingsTemporary?.data[0]?.border_boor_id,
  //         IdUser: users.user_id,
  //         CheckIn: startDateConverseFinal,
  //         CheckOut: startCloseConverseFinal,
  //         TotalGuest: totalGuest,
  //         totalRooms: totalRooms
  //       }
  //     })
  //   }
  // }, [statusBookingsTemporary])

  console.log(startDateOpen)

  return (
    <div className="self-stretch body-txt-body-s-regular flex flex-col py-[42px] px-[92px] items-start justify-start text-left text-[18px] text-darkslategray-300 font-body-txt-body-s-regular">
      <div className="rounded-t rounded-b-none w-full flex flex-row py-1 pr-4 pl-0 box-border items-start justify-start gap-[30px]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[16px]">
          <div className="w-[498px] flex flex-row items-center justify-start text-lg">
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
            <div className="rounded-sm bg-slamon shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] max-w-[160px] flex flex-col py-1 px-3 box-border items-center justify-center text-sm text-neutrals">
              <div className="self-stretch relative font-semibold te w-full">
                {props.dataBookings.data.data_rooms[0].faci_memb_name} MEMBER
              </div>
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col py-[25px] px-0 items-start justify-start gap-[10px]">
            <b className="self-stretch relative">Description</b>
            <div className="self-stretch relative text-[16px] font-medium text-darkslategray-100 opacity-[0.75]">
              {props.dataBookings.data.data_rooms[0].hotel.hotel_description}
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col pt-0 px-0 pb-[25px] items-start justify-start text-blackish-green">
            <div className="self-stretch flex flex-col items-start justify-start gap-[32px]">
              <b className="self-stretch relative text-darkslategray-300">Facilities Support</b>
              <div className="self-stretch flex flex-row items-start justify-between text-[16px] font-montserrat-semibold-14">
                <div className="w-full  shrink-0 flex flex-row gap-4 justify-start ">
                  {props.dataBookings.data.data_rooms[0].hotel.facilities_support.map((dataFaciSupport: any) => {
                    return <div className="self-stretch flex-wrap flex flex-row items-center justify-start gap-[8px]">
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
        <div className="rounded-2xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] w-[410px] max-w-[600px] shrink-0 flex flex-col py-8 px-6 box-border items-center justify-start text-center text-[12px]">
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
            <div className="self-stretch flex flex-row items-start justify-start gap-[14px] text-neutrals">
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
                    Room {props.dataBookings.data.data_rooms[0].faci_room_number}
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
                              Room {room.faci_room_number}
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
            <div className="self-stretch flex flex-row items-start justify-start gap-[14px] text-neutrals">
              <Select classNames={{

                menuButton: ({ isDisabled }: any) => (
                  `flex text-sm text-gray-500 border  leading-[132%] font-semibold text-sm cursor-pointer border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${isDisabled
                    ? "bg-gray-200"
                    : "bg-darkslategray-200 text-white hover:bg-darkslategray-200"
                  }`
                ),
                menu: "absolute z-10 w-full bg-white shadow-lg border  rounded py-1 mt-1.5 text-sm text-gray-700",
                listItem: ({ isSelected }: any) => (
                  `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected
                    ? `text-white bg-blue-500`
                    : `text-gray-500 hover:bg-darkslategray-200 hover:text-white`
                  }`
                )
              }}
                value={selectedAdults} placeholder="Jumlah Adult"
                onChange={handleChangeAdult}
                options={optionsAdult} primaryColor={"indigo"} />

              <Select classNames={{

                menuButton: ({ isDisabled }: any) => (
                  `flex text-sm text-gray-500 border  leading-[132%] font-semibold text-sm cursor-pointer border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${isDisabled
                    ? "bg-gray-200"
                    : "bg-darkslategray-200 text-white hover:bg-darkslategray-200"
                  }`
                ),
                menu: "absolute z-10 w-full bg-white shadow-lg border  rounded py-1 mt-1.5 text-sm text-gray-700",
                listItem: ({ isSelected }: any) => (
                  `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected
                    ? `text-white bg-blue-500`
                    : `text-gray-500 hover:bg-darkslategray-200 hover:text-white`
                  }`
                )
              }}
                value={selectedKids} placeholder="Jumlah Kids"
                onChange={handleChangeKids}
                options={optionsKids} primaryColor={"indigo"} />
            </div>
            <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row items-start justify-between">
                  <div className="relative font-medium text-left">
                    {props.dataBookings.data.total_price}/night
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
                  <div className="flex-1 relative">Include Tax</div>
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
                  }).format(discountPrice)}</div>
                </div>
              </div>
              <div className="self-stretch flex flex-col pt-3 px-0 pb-0 items-start justify-start gap-[16px]">
                <div className="self-stretch relative bg-darkslategray-300 h-[0.5px] shrink-0 opacity-[0.25]" />
                <div className="self-stretch flex flex-row items-start justify-between">
                  <div className="flex flex-col items-start justify-start gap-[2px]">
                    <div className="relative leading-[132%]">Total Price</div>
                    <div className="relative leading-[132%]">
                      (*including tax*)
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
                  Continue
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
