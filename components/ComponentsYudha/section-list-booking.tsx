import type { NextPage } from "next";
import { MutableRefObject, useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Carousel from 'react-gallery-carousel';
import formatCurrency from "@/config/converse_number_to_rupiah";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetAllFacilitiesSupport, doRequestGetListBooking } from "@/redux/booking/action/bookingActionReducer";



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
  facilities_support_filter: any[]
}

interface PropsInterfaceListBookingProps {
  dataListBooking: DataListBooking;
  searchDataBooking: DataSearch;
}
const SectionListBooking: NextPage<PropsInterfaceListBookingProps> = (props) => {
  const { faci_supports, message: fasuppmessage, refresh } = useSelector((state: any) => state.facilitiesSupportBookingReducers)
  const { bookings: bookingsFaci, message, status } = useSelector((state: any) => state.bookingReducers)
  const [showIconAll, setShowIconAll] = useState(4)
  const [showFaciSupportAll, setShowFaciSupportAll] = useState(4)
  let startDateObj = new Date()
  let startDateStr = startDateObj.toISOString().substring(0, 10)
  let startDate = new Date(startDateStr)

  let endDateObj = new Date()
  endDateObj.setDate(endDateObj.getDate() + 1)
  let endDateStr = endDateObj.toISOString().substring(0, 10)
  let endDate = new Date(endDateStr)

  let startDateFinal = startDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })
  let endDateFinal = endDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })



  const router = useRouter();
  const dispatch = useDispatch()
  const onButtonDetailClick = useCallback((idRooms: any, idHotel: any) => {
    console.log(idRooms)
    router.push({
      pathname: '/booking/detail-booking-final',
      query: {
        idRooms: idRooms,
        idHotel: idHotel,
        startDate: props.searchDataBooking.startDate,
        endDate: props.searchDataBooking.endDate,
        dataRooms: `[${idRooms}]`,
        guestRooms: `[${2}]`
      }
    });
  }, [router]);


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
        filterFaciSupport: values.checkedSupportFacilities.length === 0 ? ['24-Hour Front Desk'] : values.checkedSupportFacilities
      }
      const faciSupportArray = dataFilter.filterFaciSupport.map((item, index) => {
        if (index === 0) {
          return item;
        } else if (index > 0) {
          return ` ${item}`;
        }
      })
      dispatch(doRequestGetListBooking(1, dataFilter.filterHargaAwal, dataFilter.filterHargaAkhir, bookingsFaci.data[0].hotel.address.city.city_name, bookingsFaci.data[0].hotel.address.city.provinces.prov_name, bookingsFaci.data[0].hotel.address.city.provinces.country.country_name, bookingsFaci.data[0].hotel.address.city.provinces.country.region.region_name, props.searchDataBooking?.startDate, props.searchDataBooking?.endDate, faciSupportArray))
    }
  })

  useEffect(() => {
    dispatch(doRequestGetAllFacilitiesSupport())
  }, [])
  console.log(props.searchDataBooking)

  return (
    <div className="self-stretch flex flex-col pt-[54px] px-16 pb-[58px] items-start justify-start text-left text-base text-darkslategray-300 font-montserrat-semibold-14 lg:self-stretch lg:w-auto lg:h-auto lg:pl-3 lg:pr-3 lg:box-border">
      <div className="self-stretch flex flex-row items-start justify-start lg:self-stretch lg:w-auto lg:h-auto">
        <div className="flex-1 flex flex-col items-start justify-start gap-[33px] lg:flex-1 lg:h-auto">

          <form onSubmit={formik.handleSubmit} className="self-stretch rounded-2xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col py-8 px-6 items-start justify-start">
            <div className="self-stretch flex flex-row items-start justify-start gap-[32px]">
              <div className="self-stretch flex flex-col items-start justify-center text-xl">
                <div className="relative font-semibold">Filter Booking</div>
              </div>
              <div className="w-fit shrink-0 flex flex-col items-start justify-start ">
                <div className="self-stretch flex flex-row items-start justify-between font-body-txt-body-s-regular">
                  <p className="m-0 flex-1 relative font-semibold">
                    Harga Range
                  </p>
                </div>
                <div className="input-price mt-2">
                  <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Awal</label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 13C16.6667 14.3735 16.4223 15.7161 15.9645 16.8581C15.5066 18.0001 14.8559 18.8902 14.0945 19.4158C13.3332 19.9414 12.4954 20.079 11.6871 19.811C10.8789 19.5431 10.1364 18.8817 9.55372 17.9105C8.971 16.9393 8.57417 15.7019 8.41339 14.3548C8.25262 13.0077 8.33514 11.6114 8.6505 10.3425C8.96587 9.07355 9.49992 7.98897 10.1851 7.22591C10.8703 6.46284 11.6759 6.05556 12.5 6.05556C13.6051 6.05556 14.6649 6.7872 15.4463 8.08954C16.2277 9.39187 16.6667 11.1582 16.6667 13ZM25 1.88889V24.1111C25 24.4795 24.9122 24.8327 24.7559 25.0932C24.5996 25.3537 24.3877 25.5 24.1667 25.5H0.833333C0.61232 25.5 0.400358 25.3537 0.244078 25.0932C0.0877973 24.8327 0 24.4795 0 24.1111V1.88889C0 1.52053 0.0877973 1.16726 0.244078 0.906796C0.400358 0.646329 0.61232 0.5 0.833333 0.5H24.1667C24.3877 0.5 24.5996 0.646329 24.7559 0.906796C24.9122 1.16726 25 1.52053 25 1.88889ZM23.3333 9.93576C22.3871 9.46945 21.5259 8.61599 20.8281 7.4531C20.1304 6.29021 19.6183 4.85486 19.3385 3.27778H5.66146C5.38167 4.85486 4.86959 6.29021 4.17186 7.4531C3.47412 8.61599 2.61291 9.46945 1.66667 9.93576V16.0642C2.61291 16.5305 3.47412 17.384 4.17186 18.5469C4.86959 19.7098 5.38167 21.1451 5.66146 22.7222H19.3385C19.6183 21.1451 20.1304 19.7098 20.8281 18.5469C21.5259 17.384 22.3871 16.5305 23.3333 16.0642V9.93576Z" fill="#13293D" />
                      </svg>
                    </div>
                    <input type="number" name="hargaAwal" id="input-group-1" className="bg-gray-50border-[1px] border-solid border-gray-300 text-gray-900 dark:text-white text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0"
                      value={formik.values.hargaAwal} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                  </div>
                </div>


                <div className="input-price mt-2">
                  <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Akhir</label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 13C16.6667 14.3735 16.4223 15.7161 15.9645 16.8581C15.5066 18.0001 14.8559 18.8902 14.0945 19.4158C13.3332 19.9414 12.4954 20.079 11.6871 19.811C10.8789 19.5431 10.1364 18.8817 9.55372 17.9105C8.971 16.9393 8.57417 15.7019 8.41339 14.3548C8.25262 13.0077 8.33514 11.6114 8.6505 10.3425C8.96587 9.07355 9.49992 7.98897 10.1851 7.22591C10.8703 6.46284 11.6759 6.05556 12.5 6.05556C13.6051 6.05556 14.6649 6.7872 15.4463 8.08954C16.2277 9.39187 16.6667 11.1582 16.6667 13ZM25 1.88889V24.1111C25 24.4795 24.9122 24.8327 24.7559 25.0932C24.5996 25.3537 24.3877 25.5 24.1667 25.5H0.833333C0.61232 25.5 0.400358 25.3537 0.244078 25.0932C0.0877973 24.8327 0 24.4795 0 24.1111V1.88889C0 1.52053 0.0877973 1.16726 0.244078 0.906796C0.400358 0.646329 0.61232 0.5 0.833333 0.5H24.1667C24.3877 0.5 24.5996 0.646329 24.7559 0.906796C24.9122 1.16726 25 1.52053 25 1.88889ZM23.3333 9.93576C22.3871 9.46945 21.5259 8.61599 20.8281 7.4531C20.1304 6.29021 19.6183 4.85486 19.3385 3.27778H5.66146C5.38167 4.85486 4.86959 6.29021 4.17186 7.4531C3.47412 8.61599 2.61291 9.46945 1.66667 9.93576V16.0642C2.61291 16.5305 3.47412 17.384 4.17186 18.5469C4.86959 19.7098 5.38167 21.1451 5.66146 22.7222H19.3385C19.6183 21.1451 20.1304 19.7098 20.8281 18.5469C21.5259 17.384 22.3871 16.5305 23.3333 16.0642V9.93576Z" fill="#13293D" />
                      </svg>
                    </div>
                    <input type="number" name="hargaAkhir" id="input-group-1" className="bg-gray-50border-[1px] border-solid border-gray-300 text-gray-900 dark:text-white text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000000" required onChange={formik.handleChange} value={formik.values.hargaAkhir} onBlur={formik.handleBlur} />
                  </div>
                </div>
              </div>
              <div className="w-[273px] shrink-0 flex flex-col items-start justify-start gap-[16px] font-body-txt-body-s-regular">
                <div className="self-stretch flex flex-row items-start justify-between">
                  <p className="m-0 flex-1 relative font-semibold">
                    Fasilitas Booking Utama
                  </p>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-sm">
                  <div className="flex items-center" id="checkbox-group">
                    <input id="default-checkbox" type="checkbox" onChange={formik.handleChange} name="checkedMainFacilities" value="Room" className="w-4 h-4 text-darkslategray-300 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ruang Kamar</label>
                  </div>
                  <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox" name="checkedMainFacilities" value="Restaurant" onChange={formik.handleChange} className="w-4 h-4 text-darkslategray-300 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ruang Restaurant</label>
                  </div>
                  <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox" onChange={formik.handleChange} name="checkedMainFacilities" value="Meeting Room" className="w-4 h-4 text-darkslategray-300 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ruang Meeting Room</label>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[8px] font-body-txt-body-s-regular">
                <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                  <div className="self-stretch flex flex-row items-start justify-between">
                    <p className="m-0 flex-1 relative font-semibold">
                      Fasilitas Support
                    </p>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-sm">
                    {faci_supports && faci_supports.slice(0, showFaciSupportAll).map((data_faci_support: any) => {
                      return <div className="flex items-center">
                        <input id="default-checkbox" type="checkbox" value={data_faci_support.fs_name} name="checkedSupportFacilities" onChange={formik.handleChange} className="w-4 h-4 text-darkslategray-300 bg-gray-300 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{data_faci_support.fs_name}</label>
                      </div>
                    })}

                  </div>
                </div>
                <b className="relative text-sm font-montserrat-semibold-14 text-slamon cursor-pointer" onClick={() => {
                  if (showFaciSupportAll === 4) {
                    setShowFaciSupportAll(faci_supports.length)
                  } else {
                    setShowFaciSupportAll(4)
                  }

                }}>
                  Lihat Semua
                </b>
              </div>
              <div className="flex-1 flex flex-col items-end justify-start">
                <button type="submit" className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded w-[69px] h-12 shrink-0 flex flex-row box-border items-center justify-center hover:bg-gray-700 active:bg-gray-700">
                  <div className="flex-1 relative text-sm font-medium font-montserrat-semibold-14 text-neutrals text-left">
                    Filter
                  </div>
                </button>
              </div>
            </div>
          </form>



          <div className="self-stretch flex flex-row items-start justify-between text-sm font-body-txt-body-s-regular lg:self-stretch lg:w-auto lg:h-auto">
            <div className="relative font-semibold inline-block w-[408px] shrink-0">
              <span>Menampilkan {props.dataListBooking.data?.length}</span>
              <span className="text-slamon"> tempat</span>
            </div>
            <div className="w-[584px] shrink-0 flex flex-row items-start justify-end gap-[4px] text-right">
              <div className="relative font-semibold">
                Urutkan berdasarkan Rekomendasi
              </div>
              <img
                className="relative w-[18px] h-[18px] shrink-0 overflow-hidden"
                alt=""
                src="/chevron-down1.svg"
              />
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start text-xs lg:self-stretch lg:w-auto gap-8">
            {props.dataListBooking.data && props.dataListBooking?.data?.map((item: any) => {
              return <div className="self-stretch shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-row items-start justify-start">
                <div className="relative rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl w-[312px] h-[397px] overflow-hidden ">
                  {/* Ini tempat gambarnya */}
                  <Carousel className="w-full h-full bg-gray-500" images={item.facility_photos.map((it: any) => {
                    return {
                      src: it.fapho_url,

                    }
                  })} />


                </div>

                <div className="flex-1 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-neutrals flex flex-col p-6 items-start justify-start gap-[24px] text-3xl font-body-txt-body-s-regular">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
                    <div className="w-[416px] shrink-0 flex flex-col items-start justify-start gap-[16px] max-w-[60%]">
                      <b className="self-stretch relative">
                        {item.hotel.hotel_name}
                      </b>
                      <div className="self-stretch flex flex-col items-start justify-start gap-[12px] text-xs text-black">
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
                              return <div className="flex-1 flex flex-row items-start justify-start gap-[4px]">
                                <img
                                  className="relative w-4 h-4 shrink-0 overflow-hidden"
                                  alt={faci_support.fs_name}
                                  src={faci_support.fs_icon_url}
                                />
                                <div className="relative font-medium">{faci_support.fs_name}</div>
                              </div>
                            })}
                          </div>
                          {item.hotel.facilities_support.length > 4 ? <div className="bg-neutrals w-[82px] shrink-0 flex flex-row py-0 px-3 box-border items-start justify-start text-slamon">
                            <div className="relative font-medium cursor-pointer" onClick={() => {
                              setShowIconAll(item.hotel.facilities_support.length)
                            }}>
                              Lainnya
                            </div>
                          </div> : ''}

                        </div>
                        <b className="relative">{item.faci_name}</b>
                        <div className="self-stretch flex flex-row items-center justify-start gap-[10px]">
                          <div className="relative font-medium">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(item.faci_subtotal)}/malam
                          </div>
                          <div className="relative [text-decoration:line-through] font-medium">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            }).format(item.faci_rate_price)}
                          </div>
                          <div className="rounded-sm bg-slamon flex flex-row py-0.5 px-3 items-center justify-center text-5xs text-neutrals">
                            <div className="relative font-medium">{item.faci_discount * 100}% Diskon</div>
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
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-end justify-start text-right text-xs">
                      <p className="m-0 self-stretch relative font-bold inline-block opacity-[0.75] min-w-[10%]">
                        {item.faci_memb_name} MEMBER
                      </p>
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
                        className="m-0 flex-1 relative text-sm font-semibold font-body-txt-body-s-regular group-hover:text-white text-darkslategray-300 text-center"
                        id="text-button"
                      >
                        Lihat Detail
                      </p>
                    </button>
                    <button className="cursor-pointer [border:none] py-5 px-4 bg-darkslategray-300 flex-1 rounded flex flex-row items-center justify-center hover:mix-blend-normal hover:bg-gray-600 hover:text-darkorchid">
                      <p className="m-0 flex-1 relative text-sm font-semibold font-body-txt-body-s-regular text-neutrals text-center">
                        Book
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            })}

          </div>
          <div className="self-stretch flex flex-row pt-3 px-6 pb-4 items-center justify-center text-sm text-gray-700 font-text-sm-normal border-t-[1px] border-solid border-gray-200">
            <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] flex flex-row items-start justify-start">
              <button className="cursor-pointer py-2.5 px-4 bg-neutrals flex-1 rounded-tl-lg rounded-tr-none rounded-br-none rounded-bl-lg overflow-hidden flex flex-row items-center justify-center gap-[8px] border-[1px] border-solid border-gray-300">
                <img
                  className="relative w-5 h-5 shrink-0 overflow-hidden"
                  alt=""
                  src="/arrowleft.svg"
                />
                <div className="relative text-sm leading-[20px] font-medium font-text-sm-normal text-gray-800 text-left">
                  Previous
                </div>
              </button>
              <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center text-gray-800">
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
                <div className="flex flex-row py-[9px] px-2 items-center justify-center">
                  <div className="relative leading-[20px] font-medium">1</div>
                </div>
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
              </div>
              <div className="flex-1 bg-neutrals flex flex-col items-center justify-center">
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
                <div className="flex flex-row py-[9px] px-2 items-center justify-center">
                  <div className="relative leading-[20px] font-medium">2</div>
                </div>
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
              </div>
              <div className="flex-1 bg-neutrals flex flex-col items-center justify-center">
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
                <div className="flex flex-row py-[9px] px-2 items-center justify-center">
                  <div className="relative leading-[20px] font-medium">3</div>
                </div>
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
              </div>
              <div className="flex-1 bg-neutrals flex flex-col items-center justify-center">
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
                <div className="flex flex-row py-[9px] px-2 items-center justify-center">
                  <div className="relative leading-[20px] font-medium">...</div>
                </div>
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
              </div>
              <div className="flex-1 bg-neutrals flex flex-col items-center justify-center">
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
                <div className="flex flex-row py-[9px] px-2 items-center justify-center">
                  <div className="relative leading-[20px] font-medium">8</div>
                </div>
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
              </div>
              <div className="flex-1 bg-neutrals flex flex-col items-center justify-center">
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
                <div className="flex flex-row py-[9px] px-2 items-center justify-center">
                  <div className="relative leading-[20px] font-medium">9</div>
                </div>
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
              </div>
              <div className="flex-1 bg-neutrals flex flex-col items-center justify-center">
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
                <div className="flex flex-row py-[9px] px-2 items-center justify-center">
                  <div className="relative leading-[20px] font-medium">10</div>
                </div>
                <div className="self-stretch relative bg-gray-300 h-px shrink-0" />
              </div>
              <button className="cursor-pointer py-2.5 px-4 bg-neutrals flex-1 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-none overflow-hidden flex flex-row items-center justify-center gap-[8px] border-[1px] border-solid border-gray-300">
                <div className="relative text-sm leading-[20px] font-medium font-text-sm-normal text-gray-800 text-left">
                  Next
                </div>
                <img
                  className="relative w-5 h-5 shrink-0 overflow-hidden"
                  alt=""
                  src="/arrowright.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionListBooking;
