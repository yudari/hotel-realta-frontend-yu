import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Select from "react-tailwindcss-select";
import apiMethodBooking from "@/api/booking/apiMethodBooking";
import ls from 'localstorage-slim';

import 'rodal/lib/rodal.css';
import secureLocalStorage from "react-secure-storage";
const options = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" }
]
interface CardDetailsOrderPaymentProps {
  dataBookingBayar: any;
  user: any;
  finalExtraPrice: any;
  dataAllExtraItemsFinal: any;
  userDetailDiri: any;
  validasiPaymentDetails: any;
}

const CardDetailsOrderPayment: NextPage<CardDetailsOrderPaymentProps> = (props) => {
  const [selectedKupon, setSelectedKupon] = useState(null);
  const [optionsKupon, setOptionKupon] = useState<any>([{}])
  const [userMember, setUserMember] = useState<any>({})
  const [detailBonus, setDetailBonus] = useState<any>({
    id_kupon: 0,
    name_kupon: '',
    subTotalDiscount: 0
  })

  const router = useRouter();


  const getAllSpecialRoomByBoor = async () => {
    try {
      console.log(props.dataBookingBayar.data.boor_id)
      const dataResponse = await apiMethodBooking.getAllSpecialRoomByBoorId(props.dataBookingBayar?.data?.boor_id)
      console.log(dataResponse)
      const dataAllResponse = dataResponse.data.data.map((item: any) => {
        return {
          value: {
            ...item
          },
          label: item.spof_name
        }
      })
      console.log(dataAllResponse)
      setOptionKupon(dataAllResponse)
    } catch (error) {
      console.log(error)
    }
  }

  const getUsermember = async () => {
    try {
      let totalDiskonMember = 0
      let pointRpPakaiSILVERPerPoints = 50
      let pointRpPakaiGOLDPerPoints = 100
      let pointRpPakaiVIPPerPoints = 150
      let pointRpPakaiWIZARDPerPoints = 200
      let pointRpTidakPakai = 0
      let pointNominalPakai = 100
      let pointSisaPakai = 0

      const dataResponse = await apiMethodBooking.getUserMembersAPI(props.user.user_id)
      const memberDiskon = dataResponse.data.data

      const faciMember = memberDiskon?.find((item_booking: any) => {
        if (item_booking.usme_memb_name === props.dataBookingBayar?.data_proses[0]?.facility?.faci_memb_name) {
          return item_booking
        }

      })

      if (typeof faciMember === 'undefined') {
        const today: Date = new Date();
        const year: number = today.getFullYear();
        const month: number = today.getMonth() + 1;
        const day: number = today.getDate();
        const hours: number = today.getHours();
        const minutes: number = today.getMinutes();
        const seconds: number = today.getSeconds();
        const timezoneOffset: number = -(today.getTimezoneOffset() / 60);
        const timezoneOffsetFormatted: string = timezoneOffset < 0 ? '-' + ('0' + (-timezoneOffset)).slice(-2) : '+' + ('0' + timezoneOffset).slice(-2);

        const formattedDate: string = `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)} ${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}${timezoneOffsetFormatted}`;
        console.log(formattedDate)
        pointRpTidakPakai = pointRpTidakPakai * props.dataBookingBayar?.data_proses?.length;
        pointSisaPakai = 0
        totalDiskonMember = pointRpTidakPakai * pointNominalPakai


        setUserMember({
          subTotalBonusMember: totalDiskonMember,
          pointSisaPakai,
          user_members: {
            usme_user_id: props.user.user_id,
            usme_memb_name: 'Tidak Ada',
            usme_promote_date: formattedDate,
            usme_points: pointSisaPakai,
            usme_type: 'default'

          }
        })
      }


      else if (faciMember.usme_memb_name === 'SILVER') {
        pointRpPakaiSILVERPerPoints = pointRpPakaiSILVERPerPoints * props.dataBookingBayar?.data_proses?.length
        pointSisaPakai = faciMember.usme_points - pointRpPakaiSILVERPerPoints
        totalDiskonMember = pointRpPakaiSILVERPerPoints * pointNominalPakai
        setUserMember({
          subTotalBonusMember: totalDiskonMember,
          jumlahPointPakai: pointRpPakaiSILVERPerPoints,
          user_members: {
            ...faciMember,
            usme_points: pointSisaPakai
          }
        })
      }
      else if (faciMember.usme_memb_name === 'GOLD') {
        pointRpPakaiGOLDPerPoints = pointRpPakaiGOLDPerPoints * props.dataBookingBayar?.data_proses?.length
        pointSisaPakai = faciMember.usme_points - pointRpPakaiGOLDPerPoints
        totalDiskonMember = pointRpPakaiGOLDPerPoints * pointNominalPakai
        setUserMember({
          subTotalBonusMember: totalDiskonMember,
          jumlahPointPakai: pointRpPakaiGOLDPerPoints,
          user_members: {
            ...faciMember,
            usme_points: pointSisaPakai
          }
        })
      }
      else if (faciMember.usme_memb_name === 'VIP') {
        pointRpPakaiVIPPerPoints = pointRpPakaiVIPPerPoints * props.dataBookingBayar?.data_proses?.length
        pointSisaPakai = faciMember.usme_points - pointRpPakaiVIPPerPoints
        totalDiskonMember = pointRpPakaiVIPPerPoints * pointNominalPakai
        setUserMember({
          subTotalBonusMember: totalDiskonMember,
          jumlahPointPakai: pointRpPakaiVIPPerPoints,
          user_members: {
            ...faciMember,
            usme_points: pointSisaPakai
          }
        })
      }
      else if (faciMember.usme_memb_name === 'WIZARD') {
        pointRpPakaiWIZARDPerPoints = pointRpPakaiWIZARDPerPoints * props.dataBookingBayar?.data_proses?.length
        pointSisaPakai = faciMember.usme_points - pointRpPakaiWIZARDPerPoints
        totalDiskonMember = pointRpPakaiWIZARDPerPoints * pointNominalPakai
        setUserMember({
          subTotalBonusMember: totalDiskonMember,
          jumlahPointPakai: pointRpPakaiWIZARDPerPoints,
          user_members: {
            ...faciMember,
            usme_points: pointSisaPakai
          }
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = async (values: any) => {
    console.log("value:", values);
    setSelectedKupon(values);
    let loopKupon = 0
    props.dataBookingBayar.data_proses.forEach((item: any) => {
      loopKupon = loopKupon + values.value.spof_discount
    })

    setDetailBonus({
      id_kupon: values.value.spof_id,
      name_kupon: values.value.spof_name,
      subTotalDiscount: loopKupon
    })

    // const pickingSubmitKupon = {
    //   special_offers: pickBookingBayarKupon
    // }
    // const paramSubmitKupon = {
    //   IdUser: props.user.user_id,
    //   TotalGuest: props.dataBookingBayar.data.boor_border_hotel_rooms_total_guest,
    //   TotalRooms: props.dataBookingBayar.data.boor_border_hotel_rooms_total_rooms
    // }
    // try {
    //   const dataResponse = await apiMethodBooking.pickKuponBooking({ paramSubmitKupon, pickingSubmitKupon })
    //   setDetailBonus(dataResponse.data)


    // } catch (error) {
    //   console.log(error)
    // }
  };

  const priceTotal = parseFloat(props.dataBookingBayar?.data?.boor_border_rooms_price_total);
  const discountPercent = parseFloat(props.dataBookingBayar?.data?.boor_border_rooms_percent_discount.replace("%", ""));
  const taxPercent = parseFloat(props.dataBookingBayar?.data?.boor_border_rooms_percent_tax.replace("%", ""));

  const jumlahDiskon = priceTotal * (discountPercent / 100);
  const jumlahPajak = (priceTotal - jumlahDiskon) * (taxPercent / 100);

  let totalPrice = priceTotal - jumlahDiskon + jumlahPajak;

  if (userMember) {
    console.log(userMember?.subTotalBonusMember)
    totalPrice = totalPrice - userMember?.subTotalBonusMember
  }

  if (detailBonus?.name_kupon.length > 0) {
    totalPrice = totalPrice - detailBonus.subTotalDiscount

  }
  if (props.finalExtraPrice > 0) {
    totalPrice = totalPrice + props.finalExtraPrice
  }

  const fotoPrimary = props.dataBookingBayar?.data_proses?.map((data: any) => {
    const primaryPhoto = data.facility.facility_photos.find((data2: any) => {
      return Number(data2.fapho_primary) === 1;
    });

    return primaryPhoto || null;
  }).find((data3: any) => {
    return data3 !== null
  });


  const createOrderBooking = async () => {

    // Create Data Pada Tabel Booking Order Details Extra Yang 
    try {
      // console.log(props.userDetailDiri)
      // console.log(props.validasiPaymentDetails)

      if (props.userDetailDiri.data.user_id !== undefined && props.validasiPaymentDetails.length > 0) {
        console.log(props.dataAllExtraItemsFinal)
        let dataSumExtraItems = 0
        let dataAllExtraItem = {
          booking_order_detail_extra: props.dataAllExtraItemsFinal.map((data: any) => {
            return {
              boex_price: data.jumlahHargaPerItem,
              boex_qty: data.jumlahItem,
              boex_subtotal: data.jumlahSubTotal,
              boex_measure_unit: 'unit',
              boex_borde_id: props.dataBookingBayar.data_proses[0].borde_id,
              boex_prit_id: data.namaItem.value.prit_id
            }
          })
        }


        console.log(detailBonus)
        const dataAllExtraItems = await apiMethodBooking.createExtraItemPrice(dataAllExtraItem, props.user.user_id, props.dataBookingBayar.data.boor_border_hotel_rooms_total_guest, props.dataBookingBayar.data.boor_border_hotel_rooms_total_rooms)
        const dataAllExtraResponse = dataAllExtraItems.data


        // Diambil dari data price item berdasarkan 1 ID yang jadi perwakilan
        // Create Data Pada Tabel Kupon atau special_offers_coupon
        let all_special_offers = {
          special_offers: props.dataBookingBayar.data_proses.map((book: any) => {
            return {
              soco_borde_id: book.borde_id,
              soco_spof_id: detailBonus.id_kupon
            }
          }),


        }

        const idiKupon = {
          paramSubmitKupon: {
            IdUser: props.user.user_id,
            TotalGuest: props.dataBookingBayar.data.boor_border_hotel_rooms_total_guest,
            TotalRooms: props.dataBookingBayar.data.boor_border_hotel_rooms_total_rooms
          },
          pickingSubmitKupon: all_special_offers
        }
        const dataResponseKupon = await apiMethodBooking.pickKuponBooking(idiKupon)
        console.log(dataResponseKupon)

        // //   // Create Data Pada Tabel user_breakfeast

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const date = currentDate.getDate().toString().padStart(2, '0');
        const hour = currentDate.getHours().toString().padStart(2, '0');
        const minute = currentDate.getMinutes().toString().padStart(2, '0');
        const second = currentDate.getSeconds().toString().padStart(2, '0');
        const timezoneOffset = (currentDate.getTimezoneOffset() / 60) * -1;
        const timezoneOffsetString = timezoneOffset >= 0 ? `+${timezoneOffset}`.padStart(2, '0') : `-${Math.abs(timezoneOffset)}`.padStart(2, '0');
        const formattedDate = `${year}-${month}-${date} ${hour}:${minute}:${second}${timezoneOffsetString}:00`;


        const IdBoor = props.dataBookingBayar.data.boor_id
        const dataInputBreakFeast = props.dataBookingBayar.data_proses.map((data: any) => {
          return {
            usbr_borde_id: data.borde_id,
            usbr_modified_date: formattedDate,
            usbr_total_vacant: data.borde_adults + data.borde_kids
          }
        })

        const dataResponseInputBreakFeast = await apiMethodBooking.createBreakFeast(IdBoor, dataInputBreakFeast)
        console.log(dataResponseInputBreakFeast)

        // Update Data Poin User Members dan kurangkan penggunaannya

        let dataParamMemberUserId = userMember.user_members.usme_user_id
        let dataParamMemberUserName = userMember.user_members.usme_memb_name
        let dataUpdateUserMemberPoints = {
          usme_points: userMember.user_members.usme_points,
          usme_type: userMember.user_members.usme_type
        }
        console.log(dataUpdateUserMemberPoints)
        let dataItemsUserMemberPoints: any;
        let dataItemsUserMemberPointsResponse: any;
        if (dataUpdateUserMemberPoints.usme_points > 0) {
          dataItemsUserMemberPoints = await apiMethodBooking.updateUserMemberPointsBooking(dataParamMemberUserId, dataParamMemberUserName, dataUpdateUserMemberPoints)
          dataItemsUserMemberPointsResponse = dataItemsUserMemberPoints.data.data[0]

        }


        // Update dua data atau dinamis kedalam tabel masing-masing berdasrkan
        // Borde_id nya
        let paramBordeId = props.dataBookingBayar.data_proses.map((data: any) => {
          return data.borde_id.toString()
        }).join(', ')
        let dataUpdateCreateBookingOrderDetails = props.dataBookingBayar.data_proses.map((data: any) => {
          return {
            border_boor_id: IdBoor,
            borde_checkin: data.borde_checkin,
            borde_checkout: data.borde_checkout,
            borde_adults: data.borde_adults,
            borde_kids: data.borde_kids,
            borde_price: parseInt(data.borde_price.replace(/[$,]/g, "")),
            borde_extra: (detailBonus.subTotalDiscount + userMember?.subTotalBonusMember + props.finalExtraPrice) / props.dataBookingBayar.data_proses.length,
            borde_discount: jumlahDiskon / props.dataBookingBayar.data_proses.length,
            borde_tax: jumlahPajak / props.dataBookingBayar.data_proses.length,
            borde_subtotal: totalPrice / props.dataBookingBayar.data_proses.length,
            borde_faci_id: data.borde_faci_id
          }
        })


        const dataApiCreateBookingOrdersDetail = await apiMethodBooking.createBookingOrdersDetail(IdBoor, paramBordeId, dataUpdateCreateBookingOrderDetails)
        const dataResponseCreateBookingOrdersDetail = dataApiCreateBookingOrdersDetail.data

        const now = new Date();
        const year2 = now.getFullYear().toString().padStart(4, '0');
        const month2 = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = '09';
        const minutes = '00';
        const seconds = '00';
        const formattedDate2 = `${year2}-${month2}-${day} ${hours}:${minutes}:${seconds}`;

        const dataInputOrderFinal = {
          boor_arrival_date: props.dataBookingBayar.data_proses[0].borde_checkin,
          boor_cardnumber: props.validasiPaymentDetails[0]?.usac_account_number,
          boor_discount: jumlahDiskon,
          boor_down_payment: 0,
          boor_order_date: formattedDate2,
          boor_is_paid: 'P',
          boor_member_type: userMember?.user_members?.usme_memb_name,
          boor_pay_type: props.validasiPaymentDetails[1].usac_type === 'Debit' ? 'D' : 'P',
          boor_status: "BOOKING",
          boor_total_amount: totalPrice,
          boor_total_guest: props.dataBookingBayar?.data?.boor_border_hotel_rooms_total_guest,
          boor_total_room: props.dataBookingBayar?.data?.boor_border_hotel_rooms_total_rooms,
          boor_total_tax: jumlahPajak,
          boor_type: props.userDetailDiri.data.user_type,
          boor_user_id: props.user.user_id
        };

        const dataBookingOrders = await apiMethodBooking.createBookingOrderFinal(IdBoor, dataInputOrderFinal)
        const dataBookingOrdersResponse = dataBookingOrders.data
        console.log(dataBookingOrdersResponse)


        const dataOrderBookingTransaction = {
          boorOrderNumber: dataBookingOrdersResponse.data.boor_order_number,
          debit: totalPrice,
          sourceId: dataBookingOrdersResponse.data.boor_cardnumber,
          targetId: props.validasiPaymentDetails[1]?.usac_account_number,
          userId: props.user.user_id
        }

        // Create data kedalam payment transactions menggunakan key booking number
        const dataCreatePaymentBooking = await apiMethodBooking.transactionBookingPayment(dataOrderBookingTransaction)
        console.log(dataCreatePaymentBooking)

        console.log(props.validasiPaymentDetails)
        const dataFinalInvoice = {
          booking_order_id: dataBookingOrdersResponse.data.boor_id,
          name_hotel: props.dataBookingBayar.data.boor_border_hotel_book_name,
          alamat_hotel: props.dataBookingBayar.data.boor_border_rooms_address1,
          name_order_booking: props.userDetailDiri.data.user_full_name,
          user_handphone: props.userDetailDiri.data.user_phone_number,
          user_email: props.userDetailDiri.data.user_email,
          user_book_checkIn: props.dataBookingBayar?.data?.boor_border_hotel_checkin_checkout.split(' ')[0],
          user_book_checkOut: props.dataBookingBayar?.data?.boor_border_hotel_checkin_checkout.split(' ')[1],
          user_book_total_guest: props.dataBookingBayar?.data?.boor_border_hotel_rooms_total_guest,
          user_book_total_rooms: props.dataBookingBayar?.data?.boor_border_hotel_rooms_total_rooms,
          user_room_type: props.dataBookingBayar?.data?.boor_border_rooms_name,
          user_booking_order_number: dataBookingOrdersResponse.data.boor_order_number,
          user_booking_order_date: formattedDate2,
          user_booking_invoice_number: dataCreatePaymentBooking.data[0].patr_trx_number,
          user_booking_invoice_date: dataCreatePaymentBooking.data[0].patr_modified_date,
          user_booking_status_is_paid: dataBookingOrdersResponse.data.boor_is_paid,
          user_booking_payment_type: props.validasiPaymentDetails[0].entity_name,
          user_booking_full_name: props.userDetailDiri.data.user_full_name,
          user_booking_contact_number: props.userDetailDiri.data.user_phone_number,
          user_booking_member: userMember?.user_members?.usme_memb_name,
          user_booking_member_date: userMember?.user_members?.usme_promote_date,
          user_booking_member_remaining_points: userMember?.user_members?.usme_points,
          user_booking_facilities_list: [props.dataBookingBayar?.data?.boor_border_rooms_name, ...props.dataAllExtraItemsFinal.map((itExtra: any) => {
            return itExtra.namaItem.value.prit_name
          })],
          user_booking_facilities_qty_list: [props.dataBookingBayar?.data?.boor_border_hotel_rooms_total_rooms, ...props.dataAllExtraItemsFinal.map((itExtra: any) => {
            return itExtra.jumlahItem
          })],
          user_booking_facilities_total_vacant: props.dataBookingBayar?.data?.boor_border_hotel_rooms_total_guest,
          user_booking_price_list: [priceTotal, ...props.dataAllExtraItemsFinal.map((itExtra: any) => {
            return itExtra.namaItem.value.prit_price
          })],
          user_booking_discount_price: jumlahDiskon,
          user_booking_discount_price_bonus: detailBonus.subTotalDiscount,
          user_booking_point_member_price: userMember?.subTotalBonusMember,
          user_booking_point_member: userMember?.jumlahPointPakai,
          user_subtotal_booking_list: [(priceTotal - jumlahDiskon - detailBonus.subTotalDiscount - userMember?.subTotalBonusMember), ...props.dataAllExtraItemsFinal.map((itExtra: any) => {
            return itExtra.jumlahSubTotal
          })],
          user_booking_tax_percent: taxPercent,
          user_booking_total_payment: totalPrice
        }
        console.log(dataFinalInvoice)
        secureLocalStorage.setItem('yu_vo', dataFinalInvoice)
        secureLocalStorage.setItem('yu_tr', dataCreatePaymentBooking.data)
        router.push({
          pathname: "/booking/detail-pembayaran-invoice-final",
          query: dataFinalInvoice
        }, '/booking/detail-pembayaran-invoice-final');

      } else {
        console.log(`Data Salah`)
      }



    } catch (error) {
      console.log(error)
    }



  }


  useEffect(() => {
    getAllSpecialRoomByBoor()
    getUsermember()
  }, [])

  console.log(props.dataBookingBayar.data_proses)
  return (
    <div className="flex-1 rounded-[18px] bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] overflow-hidden flex flex-col p-6 items-start justify-start gap-[16px] text-left text-[12px] text-blackish-green font-montserrat-semibold-14">
      <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
        <img
          className="rounded-[18px] w-[121px] h-[120px] shrink-0 object-cover"
          alt=""
          src={`${fotoPrimary?.fapho_url}`}
        />
        <div className="self-stretch w-[257px] shrink-0 flex flex-col items-start justify-center gap-[16px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
            <div className="self-stretch relative font-medium opacity-[0.75]">
              {props.dataBookingBayar?.data?.boor_border_rooms_name}
            </div>
            <div className="self-stretch relative text-[14px] font-semibold text-darkslategray-300">
              {props.dataBookingBayar?.data?.boor_border_hotel_book_name}
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-3">
            <div className="w-10 shrink-0 flex flex-col items-start justify-start">
              <div className="self-stretch rounded box-border h-8 shrink-0 flex flex-row py-2 px-4 items-center justify-center border-[1px] border-solid border-mint-green">
                <div className="relative font-medium">{props.dataBookingBayar?.data?.boor_border_hotel_rating}</div>
              </div>
            </div>
            <div className="relative flex flex-row gap-2">
              <b>{props.dataBookingBayar?.data?.boor_border_hotel_rating_status}</b>
              <span className="font-medium"> {props.dataBookingBayar?.data_proses[0].facility?.hotel?.hotel_reviews.length} reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-row py-4 px-0 items-start justify-between text-center text-seagreen border-t-[1px] border-solid border-beige border-b-[1px]">
        <div className="rounded bg-neutrals w-[95px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center gap-[2px]">
          <img
            className="relative w-5 h-[19px] shrink-0 overflow-hidden"
            alt=""
            src="/claritydatesolid.svg"
          />
          <div className="flex-1 relative font-semibold">{props.dataBookingBayar?.data?.boor_border_hotel_checkin_checkout.split(' ')[0]}</div>
        </div>
        <div className="rounded bg-neutrals w-[95px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center gap-[2px] text-crimson">
          <img
            className="relative w-5 h-[19px] shrink-0 overflow-hidden"
            alt=""
            src="/claritydatesolid1.svg"
          />
          <div className="flex-1 relative font-semibold">{props.dataBookingBayar?.data?.boor_border_hotel_checkin_checkout.split(' ')[1]}</div>
        </div>
        <div className="self-stretch rounded bg-neutrals w-[115px] shrink-0 flex flex-row py-1 px-0.5 box-border items-center justify-center text-slamon">
          <div className="flex-1 relative font-semibold">{props.dataBookingBayar?.data?.boor_border_hotel_rooms_total_rooms} Room, {props.dataBookingBayar?.data?.boor_border_hotel_rooms_total_guest} Guest</div>
        </div>
      </div>

      <div className="self-stretch flex flex-col gap-3 py-4 px-0 items-start justify-between border-beige border-b-[1px]">
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
          value={selectedKupon} placeholder="Choose Your Coupon"
          onChange={handleChange}
          options={optionsKupon} primaryColor={"indigo"} />
        <div className="self-stretch rounded cursor-pointer bg-darkslategray-300 flex flex-row py-2.5 px-1.5 items-center justify-start gap-[16px] text-left text-neutrals">
          <div className="flex-1 relative leading-[132%] font-semibold">
            Bonus Member {userMember?.user_members?.usme_memb_name}
          </div>
          <div className="relative leading-[132%] text-right  w-[78px] shrink-0">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(userMember?.subTotalBonusMember)}
          </div>
        </div>

      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-[16px]">
        <b className="relative font-body-txt-body-s-regular">Price Details</b>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Room Price</div>
          <div className="relative font-semibold">{parseFloat(props.dataBookingBayar.data.boor_border_rooms_price.replace(/\$|,/g, "")).toLocaleString("id-ID", { style: "currency", currency: "IDR" })} x {props.dataBookingBayar.data.boor_border_hotel_rooms_total_rooms} = {props.dataBookingBayar.data.boor_border_rooms_price_total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Discount {props.dataBookingBayar.data.boor_border_rooms_percent_discount}</div>
          <div className="relative font-semibold">-{jumlahDiskon.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Tax {props.dataBookingBayar.data.boor_border_rooms_percent_tax}</div>
          <div className="relative font-semibold">+{jumlahPajak.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Discount Coupons-{detailBonus.name_kupon}</div>
          <div className="relative font-semibold">-{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(detailBonus.subTotalDiscount)}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Member {userMember?.user_members?.usme_memb_name}</div>
          <div className="relative font-semibold">-{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(userMember?.subTotalBonusMember)}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Items</div>
          <div className="relative font-semibold">+{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.finalExtraPrice)}</div>
        </div>
      </div>
      <div className="self-stretch relative bg-blackish-green h-[0.5px] shrink-0 opacity-[0.25]" />
      <div className="self-stretch flex flex-row items-start justify-between text-[16px]">
        <div className="relative font-medium">{`Total `}</div>
        <div className="relative font-semibold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}</div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start">
        <button
          className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 flex-1 rounded flex flex-row items-center justify-center"
          onClick={() => {
            createOrderBooking()
          }}
        >
          <div className="flex-1 relative text-[14px] font-semibold font-montserrat-semibold-14 text-neutrals text-center">
            Create Booking Order
          </div>
        </button>
      </div>
    </div>
  );
};

export default CardDetailsOrderPayment;
