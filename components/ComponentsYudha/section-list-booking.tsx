import type { NextPage } from "next";
import { CSSProperties, useCallback, useEffect, useState } from "react";

import { doRequestGetAllFacilitiesSupport, doRequestGetListBooking } from "@/redux/booking/action/bookingActionReducer";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Carousel from 'react-gallery-carousel';
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import secureLocalStorage from "react-secure-storage";
import ReactPaginate from 'react-paginate';
import moment from 'moment'
import apiMethodBooking from "@/api/booking/apiMethodBooking";
import Select from "react-tailwindcss-select";
interface DataListBooking {
  data: any[] // replace `any` with the type of data that `dataListBooking` contains
}
interface DataSearch {
  page: number;
  minSubTotal: number;
  maxSubTotal: number;
  cityName: string;
  provName: string;
  regionName: string;
  startDate: string;
  endDate: string;
  countryName: string
  facilities_support_filter: any[]
}

interface PropsInterfaceListBookingProps {
  dataListBooking: DataListBooking;
  searchDataBooking: DataSearch;
  loadingListBook: any;
  users: any
}
const override: CSSProperties = {
  display: "block",
  margin: "20px auto",
  borderColor: "rgb(19 41 61 / var(--tw-bg-opacity))",
};
const SectionListBooking: NextPage<PropsInterfaceListBookingProps> = (props) => {
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
  const { faci_supports, message: fasuppmessage, refresh } = useSelector((state: any) => state.facilitiesSupportBookingReducers)
  const { bookings: bookingsFaci, message, status } = useSelector((state: any) => state.bookingReducers)
  const [showIconAll, setShowIconAll] = useState(4)
  const [showFaciSupportAll, setShowFaciSupportAll] = useState(4)
  let [userLogin, setUserLogin] = useState<any>({})
  let startDateObj = new Date()
  let startDateStr = startDateObj.toISOString().substring(0, 10)
  const [selectedAdults, setSelectedAdults] = useState<any>(optionsAdult[0])
  const [selectedKids, setSelectedKids] = useState<any>(optionsKids[0])
  let startDate = new Date(startDateStr)
  let [color, setColor] = useState("#ffffff");
  let endDateObj = new Date()
  endDateObj.setDate(endDateObj.getDate() + 1)
  let endDateStr = endDateObj.toISOString().substring(0, 10)
  let endDate = new Date(endDateStr)
  let [loadingFilter, setLoadingFilter] = useState(false)
  // let startDateFinal = startDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })
  // let endDateFinal = endDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })

  const [startDateFinal, setStartDateFinal] = useState(props.searchDataBooking.startDate)
  const [endDatFinal, setEndDateFinal] = useState(props.searchDataBooking.endDate)
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 3;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = props.dataListBooking.data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(props.dataListBooking.data.length / 3);

  const router = useRouter();
  const dispatch = useDispatch()
  const onButtonDetailClick = useCallback((idRooms: any, idHotel: any) => {
    console.log(idRooms);
    let dataDate: any = secureLocalStorage.getItem('yu_date');

    console.log({
      idRooms: idRooms,
      idHotel: idHotel,
      startDate: dataDate && dataDate.startDate ? dataDate.startDate : props.searchDataBooking.startDate,
      endDate: dataDate && dataDate.endDate ? dataDate.endDate : props.searchDataBooking.endDate,
      dataRooms: `[${idRooms}]`,
      guestRooms: `[${1}]`
    })
    router.push({
      pathname: '/booking/detail-booking-final',
      query: {
        idHotel: idHotel,
        idRooms: idRooms,
        startDate: dataDate && dataDate.startDate ? dataDate.startDate : props.searchDataBooking.startDate,
        endDate: dataDate && dataDate.endDate ? dataDate.endDate : props.searchDataBooking.endDate,
        dataRooms: `[${idRooms}]`,
        guestRooms: `[${1}]`
      }
    });
  }, [router, props.searchDataBooking.startDate, props.searchDataBooking.endDate]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 3) % props.dataListBooking.data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };



  const formik = useFormik({
    initialValues: {
      hargaAwal: '',
      hargaAkhir: '',
      checkedMainFacilities: [],
      checkedSupportFacilities: []
    },
    onSubmit: (values) => {

      console.log(values)
      const dataFilter = {
        filterHargaAwal: values.hargaAwal,
        filterHargaAkhir: values.hargaAkhir,
        filterFaciSupport: values.checkedSupportFacilities.length === 0 ? ['24-Hour Front Desk'] : [...values.checkedSupportFacilities]
      }

      let FaciSupportFinal = dataFilter.filterFaciSupport.filter((data, index) => {
        return dataFilter.filterFaciSupport.indexOf(data) === index
      })
      // const faciSupportArray = FaciSupportFinal.join(', ');
      // const faciSupportArray = dataFilter.filterFaciSupport.map((item, index) => {
      //   if (index === 0) {
      //     return item;
      //   } else if (index > 0) {
      //     return ` ${item}`;
      //   }
      // })
      // dispatch(doRequestGetListBooking(1, dataFilter.filterHargaAwal, dataFilter.filterHargaAkhir, bookingsFaci.data[0].hotel.address.city.city_name, bookingsFaci.data[0].hotel.address.city.provinces.prov_name, bookingsFaci.data[0].hotel.address.city.provinces.country.country_name, bookingsFaci.data[0].hotel.address.city.provinces.country.region.region_name, props.searchDataBooking?.startDate, props.searchDataBooking?.endDate, faciSupportArray))
      console.log(1, dataFilter.filterHargaAwal, dataFilter.filterHargaAkhir, props.searchDataBooking.cityName.length > 0 ? props.searchDataBooking.cityName : '', props.searchDataBooking.provName.length > 0 ? props.searchDataBooking.provName : '', props.searchDataBooking.countryName.length > 0 ? props.searchDataBooking.countryName : 'Indonesia', props.searchDataBooking.regionName.length > 0 ? props.searchDataBooking.regionName : 'Asia', props.searchDataBooking?.startDate, props.searchDataBooking?.endDate, FaciSupportFinal)

      setLoadingFilter(true)
      dispatch(doRequestGetListBooking(1, dataFilter.filterHargaAwal, dataFilter.filterHargaAkhir, props.searchDataBooking.cityName.length > 0 ? props.searchDataBooking.cityName : '', props.searchDataBooking.provName.length > 0 ? props.searchDataBooking.provName : '', props.searchDataBooking.countryName.length > 0 ? props.searchDataBooking.countryName : 'Indonesia', props.searchDataBooking.regionName.length > 0 ? props.searchDataBooking.regionName : 'Asia', props.searchDataBooking?.startDate, props.searchDataBooking?.endDate, FaciSupportFinal))
    }
  })

  const handleChangeAdult = (values: any) => {
    console.log('Value : ' + values)
    setSelectedAdults(values)
  }
  const handleChangeKids = (values: any) => {
    console.log(`Values : ${values}`)
    setSelectedKids(values)
  }

  const onBookNow = async (dataBookItem: any) => {
    const checkIn = moment(props.searchDataBooking?.startDate).format('MM/DD/YYYY')
    const checkOut = moment(props.searchDataBooking?.endDate).format('MM/DD/YYYY')
    // const converseFaciRatePrice = parseInt(room.faci_rate_price.replace(/[^\d]/g, "").slice(0, -2))
    // let priceDiscount = converseFaciRatePrice - Number(room.faci_discount) * converseFaciRatePrice;
    // let subTotal = priceDiscount + Number(room.faci_tax_rate) * priceDiscount;
    let priceDiscount = dataBookItem.faci_rate_price - Number(dataBookItem.faci_discount) * dataBookItem.faci_rate_price
    let subTotal = priceDiscount + Number(dataBookItem.faci_tax_rate) * priceDiscount;
    console.log(dataBookItem)

    const dataInsertBookTemp = {
      borde_checkin: checkIn,
      borde_checkout: checkOut,
      borde_adults: Number(selectedAdults.value),
      borde_kids: Number(selectedKids.value),
      borde_price: dataBookItem.faci_rate_price,
      borde_extra: 0,
      borde_discount: Number(dataBookItem.faci_discount) * dataBookItem.faci_rate_price,
      borde_tax: Number(dataBookItem.faci_tax_rate) * dataBookItem.faci_rate_price,
      borde_subtotal: subTotal,
      borde_faci_id: dataBookItem.faci_id
    }


    if (Object.keys(userLogin).length > 0) {
      const dataInsertTemporaryBooking: any = {
        booking_orders: {
          boor_hotel_id: dataBookItem.hotel.hotel_id,
          boor_user_id: userLogin.user_id,
          booking_order_detail: [dataInsertBookTemp]
        }

      }
      try {
        const dataCreateBookingTempo = await apiMethodBooking.createTempoBorde(dataInsertTemporaryBooking)
        const dataResponseCreateBookingTempo = dataCreateBookingTempo.data

        let totalGuest = 0;
        let totalRooms = dataResponseCreateBookingTempo?.data?.length;

        console.log(dataResponseCreateBookingTempo)
        dataResponseCreateBookingTempo?.data?.forEach((data: any) => {
          totalGuest = totalGuest + Number(data?.borde_adults) + Number(data?.borde_kids)
        })


        console.log({
          IdOrderDetail: dataResponseCreateBookingTempo?.data[0]?.border_boor_id,
          IdUser: userLogin.user_id,
          CheckIn: checkIn,
          CheckOut: checkOut,
          TotalGuest: totalGuest,
          totalRooms: totalRooms
        })

        router.push({
          pathname: '/booking/detail-booking-pembayaran-final',
          query: {
            IdOrderDetail: dataResponseCreateBookingTempo?.data[0]?.border_boor_id,
            IdUser: userLogin.user_id,
            CheckIn: checkIn,
            CheckOut: checkOut,
            TotalGuest: totalGuest,
            totalRooms: totalRooms
          }
        })


      } catch (error) {
        console.log(error)
      }
    }

  }

  useEffect(() => {
    dispatch(doRequestGetAllFacilitiesSupport())
    const dataUser: any = JSON.parse(localStorage.getItem('loginData')!)
    setUserLogin(dataUser)
  }, [])

  if (props.dataListBooking.data[0] !== undefined && loadingFilter) {
    setTimeout(() => {
      setLoadingFilter(false)
    }, 2000)
  }

  return (
    <div className="self-stretch flex flex-col pt-[54px] px-[92px] pb-[58px] items-start justify-start text-left text-[16px] text-darkslategray-300 font-montserrat-semibold-14 yu_lg:self-stretch yu_lg:w-auto yu_lg:h-auto yu_lg:pl-3 yu_lg:pr-3 yu_lg:box-border">
      <div className="self-stretch flex flex-row items-start justify-between text-[14px] font-body-txt-body-s-regular w-full yu_lg:h-auto">
        <div className="relative font-semibold inline-block w-[408px] shrink-0 mb-4">
          <span>Showing  {props.dataListBooking.data?.length}</span>
          <span className="text-slamon"> rooms</span>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start yu_lg:self-stretch yu_lg:w-auto yu_lg:h-auto">

        <div className="flex-1 flex flex-row items-start justify-start gap-[33px] yu_lg:flex-1 yu_lg:h-auto">

          <form onSubmit={formik.handleSubmit} className="self-stretch rounded-2xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex h-fit flex-col py-8 px-6 items-start justify-start">
            <div className="self-stretch flex flex-col items-start justify-start gap-[32px]">
              <div className="self-stretch flex flex-col items-start justify-center text-[18px]">
                <div className="relative font-semibold">Filter Booking</div>
              </div>
              <div className="w-fit shrink-0 flex flex-col items-start justify-start ">
                <div className="self-stretch flex flex-row items-start justify-between font-body-txt-body-s-regular">
                  <p className="m-0 flex-1 relative font-semibold">
                    Price Range
                  </p>
                </div>
                <div className="input-price mt-2">
                  <label htmlFor="input-group-1" className="block mb-2 text-[14px] font-medium text-gray-900 dark:text-white">Lowest Price.</label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 13C16.6667 14.3735 16.4223 15.7161 15.9645 16.8581C15.5066 18.0001 14.8559 18.8902 14.0945 19.4158C13.3332 19.9414 12.4954 20.079 11.6871 19.811C10.8789 19.5431 10.1364 18.8817 9.55372 17.9105C8.971 16.9393 8.57417 15.7019 8.41339 14.3548C8.25262 13.0077 8.33514 11.6114 8.6505 10.3425C8.96587 9.07355 9.49992 7.98897 10.1851 7.22591C10.8703 6.46284 11.6759 6.05556 12.5 6.05556C13.6051 6.05556 14.6649 6.7872 15.4463 8.08954C16.2277 9.39187 16.6667 11.1582 16.6667 13ZM25 1.88889V24.1111C25 24.4795 24.9122 24.8327 24.7559 25.0932C24.5996 25.3537 24.3877 25.5 24.1667 25.5H0.833333C0.61232 25.5 0.400358 25.3537 0.244078 25.0932C0.0877973 24.8327 0 24.4795 0 24.1111V1.88889C0 1.52053 0.0877973 1.16726 0.244078 0.906796C0.400358 0.646329 0.61232 0.5 0.833333 0.5H24.1667C24.3877 0.5 24.5996 0.646329 24.7559 0.906796C24.9122 1.16726 25 1.52053 25 1.88889ZM23.3333 9.93576C22.3871 9.46945 21.5259 8.61599 20.8281 7.4531C20.1304 6.29021 19.6183 4.85486 19.3385 3.27778H5.66146C5.38167 4.85486 4.86959 6.29021 4.17186 7.4531C3.47412 8.61599 2.61291 9.46945 1.66667 9.93576V16.0642C2.61291 16.5305 3.47412 17.384 4.17186 18.5469C4.86959 19.7098 5.38167 21.1451 5.66146 22.7222H19.3385C19.6183 21.1451 20.1304 19.7098 20.8281 18.5469C21.5259 17.384 22.3871 16.5305 23.3333 16.0642V9.93576Z" fill="#13293D" />
                      </svg>
                    </div>
                    <input type="number" name="hargaAwal" id="input-group-1" className="bg-gray-50 border-[1px] border-solid border-gray-300 text-gray-900 dark:text-white text-[14px] rounded-sm focus:ring-darkslategray-100-500 focus:border-darkslategray-200 block  pl-10 p-2.5 dark:bg-darkslategray-100 dark:border-darkslategray-200 dark:placeholder-gray-400 dark:focus:ring-darkslategray-300 dark:focus:border-blue-500" placeholder="0"
                      value={formik.values.hargaAwal} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                  </div>
                </div>


                <div className="input-price mt-2">
                  <label htmlFor="input-group-1" className="block mb-2 text-[14px] font-medium text-gray-900 dark:text-white">Highest Price</label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 13C16.6667 14.3735 16.4223 15.7161 15.9645 16.8581C15.5066 18.0001 14.8559 18.8902 14.0945 19.4158C13.3332 19.9414 12.4954 20.079 11.6871 19.811C10.8789 19.5431 10.1364 18.8817 9.55372 17.9105C8.971 16.9393 8.57417 15.7019 8.41339 14.3548C8.25262 13.0077 8.33514 11.6114 8.6505 10.3425C8.96587 9.07355 9.49992 7.98897 10.1851 7.22591C10.8703 6.46284 11.6759 6.05556 12.5 6.05556C13.6051 6.05556 14.6649 6.7872 15.4463 8.08954C16.2277 9.39187 16.6667 11.1582 16.6667 13ZM25 1.88889V24.1111C25 24.4795 24.9122 24.8327 24.7559 25.0932C24.5996 25.3537 24.3877 25.5 24.1667 25.5H0.833333C0.61232 25.5 0.400358 25.3537 0.244078 25.0932C0.0877973 24.8327 0 24.4795 0 24.1111V1.88889C0 1.52053 0.0877973 1.16726 0.244078 0.906796C0.400358 0.646329 0.61232 0.5 0.833333 0.5H24.1667C24.3877 0.5 24.5996 0.646329 24.7559 0.906796C24.9122 1.16726 25 1.52053 25 1.88889ZM23.3333 9.93576C22.3871 9.46945 21.5259 8.61599 20.8281 7.4531C20.1304 6.29021 19.6183 4.85486 19.3385 3.27778H5.66146C5.38167 4.85486 4.86959 6.29021 4.17186 7.4531C3.47412 8.61599 2.61291 9.46945 1.66667 9.93576V16.0642C2.61291 16.5305 3.47412 17.384 4.17186 18.5469C4.86959 19.7098 5.38167 21.1451 5.66146 22.7222H19.3385C19.6183 21.1451 20.1304 19.7098 20.8281 18.5469C21.5259 17.384 22.3871 16.5305 23.3333 16.0642V9.93576Z" fill="#13293D" />
                      </svg>
                    </div>
                    <input type="number" name="hargaAkhir" id="input-group-1" className="bg-gray-50 border-[1px] border-solid border-gray-300 text-gray-900 dark:text-white text-[14px] rounded-sm focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000000" required onChange={formik.handleChange} value={formik.values.hargaAkhir} onBlur={formik.handleBlur} />
                  </div>
                </div>
              </div>
              <div className="w-[273px] hidden shrink-0 flex flex-col items-start justify-start gap-[16px] font-body-txt-body-s-regular">
                <div className="self-stretch flex flex-row items-start justify-between">
                  <p className="m-0 flex-1 relative font-semibold">
                    Fasilitas Booking Utama
                  </p>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-[14px]">
                  <div className="flex items-center" id="checkbox-group">
                    <input id="default-checkbox" type="checkbox" onChange={formik.handleChange} name="checkedMainFacilities" value="Room" className="w-4 h-4 text-darkslategray-300 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ml-2 text-[14px] font-medium text-gray-900 dark:text-gray-300">Ruang Kamar</label>
                  </div>
                  <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox" name="checkedMainFacilities" value="Restaurant" onChange={formik.handleChange} className="w-4 h-4 text-darkslategray-300 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ml-2 text-[14px] font-medium text-gray-900 dark:text-gray-300">Ruang Restaurant</label>
                  </div>
                  <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox" onChange={formik.handleChange} name="checkedMainFacilities" value="Meeting Room" className="w-4 h-4 text-darkslategray-300 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ml-2 text-[14px] font-medium text-gray-900 dark:text-gray-300">Ruang Meeting Room</label>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[8px] font-body-txt-body-s-regular">
                <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                  <div className="self-stretch flex flex-row items-start justify-between">
                    <p className="m-0 flex-1 relative font-semibold">
                      Facilities Support
                    </p>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-[14px]">
                    {faci_supports && faci_supports.slice(0, showFaciSupportAll).map((data_faci_support: any) => {
                      return <div className="flex items-center">
                        <input id="default-checkbox" type="checkbox" value={data_faci_support.fs_name} name="checkedSupportFacilities" onChange={formik.handleChange} className="w-4 h-4 text-darkslategray-300 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ml-2 text-[14px] font-medium text-gray-900 dark:text-gray-300">{data_faci_support.fs_name}</label>
                      </div>
                    })}

                  </div>
                </div>
                <b className="relative text-[14px] font-montserrat-semibold-14 text-slamon cursor-pointer" onClick={() => {
                  if (showFaciSupportAll === 4) {
                    setShowFaciSupportAll(faci_supports.length)
                  } else {
                    setShowFaciSupportAll(4)
                  }

                }}>
                  View All
                </b>
              </div>
              <div className="flex-1 flex flex-col items-end justify-start">
                <button type="submit" className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded w-[69px] h-12 shrink-0 flex flex-row box-border items-center justify-center hover:bg-gray-700 active:bg-gray-700">
                  <div className="flex-1 relative text-[14px] font-medium font-montserrat-semibold-14 text-neutrals text-left">
                    Filter
                  </div>
                </button>
              </div>
            </div>
          </form>


          <div className="self-stretch flex flex-col items-start justify-start text-[12px] yu_lg:self-stretch yu_lg:w-auto gap-8">
            <div className="flex flex-row items-start justify-start gap-[14px] text-neutrals">
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

            <ClipLoader
              color={color}
              loading={loadingFilter}
              cssOverride={override}
              size={150}
              aria-label="Loading"
              data-testid="loader"
            />


            {(props.dataListBooking.data && loadingFilter === false) && currentItems.map((item: any) => {
              return <div className="self-stretch shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-row items-start justify-start">
                <div className="relative rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl w-[312px] h-[397px] overflow-hidden ">
                  {/* Ini tempat gambarnya */}
                  <Carousel hasMediaButton={false} hasTransition={true} shouldLazyLoad={true} isLoop={true} className="w-full h-full bg-gray-500" images={item.facility_photos.map((it: any) => {
                    return {
                      src: it.fapho_url,

                    }
                  })} />


                </div>

                <div className="flex-1 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-neutrals flex flex-col p-6 items-start justify-start gap-[24px] text-[12px] font-body-txt-body-s-regular">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
                    <div className="min-w-[416px]  shrink-0 flex flex-col items-start justify-start gap-[16px] ">
                      <b className="self-stretch relative text-lg">
                        {item.hotel.hotel_name}
                      </b>

                      <div className="self-stretch flex flex-col items-start justify-start gap-[12px] text-[12px] text-black">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[2px] text-darkslategray-100">
                          <img
                            className="relative w-4 h-4 shrink-0 overflow-hidden"
                            alt=""
                            src="/location1.svg"
                          />
                          <div className="flex-1 relative font-medium opacity-[0.75]">{`${item.hotel.address.city.city_name}, ${item.hotel.address.city.provinces.prov_name}, ${item.hotel.address.city.provinces.country.country_name}`}</div>
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-start gap-[32px]">
                          <div className="flex-1 flex flex-row items-start justify-start gap-[16px]">
                            {item.hotel.facilities_support.slice(0, showIconAll).map((faci_support: any) => {
                              return <div className="flex flex-row items-start justify-start gap-[2px]">
                                <img
                                  className="relative w-4 h-4 shrink-0 overflow-hidden"
                                  alt={faci_support.fs_name}
                                  src={faci_support.fs_icon_url}
                                />
                                <div className="relative font-medium">{faci_support.fs_name}</div>
                              </div>
                            })}
                          </div>
                          {item.hotel.facilities_support.length > 4 ? <div className="bg-neutrals w-[82px] flex-wrap shrink-0 flex flex-row py-0 px-3 box-border items-start justify-start text-slamon">
                            <div className="relative font-medium cursor-pointer" onClick={() => {
                              setShowIconAll(item.hotel.facilities_support.length)
                            }}>
                              Lainnya
                            </div>
                          </div> : ''}

                        </div>
                        <b className="relative">{item.faci_name} | Room <span>{item.faci_room_number}</span> </b>
                        <div className="self-stretch flex flex-row items-center justify-start gap-[10px]">
                          <div className="relative font-medium">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(item.faci_subtotal)}/night
                          </div>
                          <div className="relative [text-decoration:line-through] font-medium">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(item.faci_rate_price)}
                          </div>
                          <div className="rounded-sm bg-slamon flex flex-row py-0.5 px-3 items-center justify-center text-5xs text-neutrals w-fit">
                            <div className="relative font-medium">{item.faci_discount * 100}% Discount</div>
                          </div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start gap-[4px] text-blackish-green">
                          <div className="w-10 shrink-0 flex flex-col items-start justify-start">
                            <div className="self-stretch rounded box-border h-8 shrink-0 flex flex-row py-2 px-4 items-center justify-center border-[1px] border-solid border-darkslategray-300">
                              <div className="relative font-medium">{item.hotel.hotel_rating_star}</div>
                            </div>
                          </div>
                          <div className="relative font-medium">
                            {item.hotel.hotel_rating_status} {item.hotel.hotel_reviews_count} reviews
                          </div>
                          <p className="m-0 self-stretch text-center rounded-sm px-1  justify-center bg-darkslategray-300 text-white  relative font-bold flex flex-row items-center opacity-[0.75] min-w-[100px]">
                            {item.faci_memb_name} MEMBER
                          </p>
                        </div>

                      </div>
                    </div>

                  </div>
                  <div className="self-stretch relative bg-blackish-green h-[0.5px] shrink-0 opacity-[0.25]" />
                  <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                    <button
                      className="cursor-pointer py-5 px-4 bg-neutrals flex-1 rounded flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-300 hover:bg-darkslategray-300 hover:box-border hover:border-[1px] group hover:border-solid hover:border-black"
                      onClick={() => {
                        onButtonDetailClick(item.faci_id, item.hotel.hotel_id)
                      }}
                    >
                      <p
                        className="m-0 flex-1 relative text-[14px] font-semibold font-body-txt-body-s-regular group-hover:text-white text-darkslategray-300 text-center"
                        id="text-button"
                      >
                        View Detail
                      </p>
                    </button>
                    <button onClick={() => {
                      onBookNow(item)
                    }} className="cursor-pointer [border:none] py-5 px-4 bg-darkslategray-300 flex-1 rounded flex flex-row items-center justify-center hover:mix-blend-normal hover:bg-gray-600 hover:text-darkorchid">
                      <p className="m-0 flex-1 relative text-[14px] font-semibold font-body-txt-body-s-regular text-neutrals text-center">
                        Book Now
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            })}

            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SectionListBooking;
