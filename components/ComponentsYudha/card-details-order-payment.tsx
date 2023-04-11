import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Select from "react-tailwindcss-select";
import apiMethodBooking from "@/api/booking/apiMethodBooking";

import 'rodal/lib/rodal.css';
const options = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" }
]
interface CardDetailsOrderPaymentProps {
  dataBookingBayar: any;
  user: any;
  finalExtraPrice: any;
}

const CardDetailsOrderPayment: NextPage<CardDetailsOrderPaymentProps> = (props) => {
  const [selectedKupon, setSelectedKupon] = useState(null);
  const [optionsKupon, setOptionKupon] = useState<any>([{}])
  const [userMember, setUserMember] = useState<any>({})
  const [detailBonus, setDetailBonus] = useState<any>({
    name_kupon: '',
    subTotalDiscount: 0
  })

  const router = useRouter();

  const onButton3Click = useCallback(() => {
    router.push("/booking/detail-pembayaran-invoice-final");
  }, [router]);

  const getAllSpecialRoomByBoor = async () => {
    try {
      const dataResponse = await apiMethodBooking.getAllSpecialRoomByBoorId(props.dataBookingBayar.data.boor_id)
      console.log(dataResponse)
      const dataAllResponse = dataResponse.data.data.map((item: any) => {
        return {
          value: {
            ...item
          },
          label: item.spof_name
        }
      })
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
      let pointNominalPakai = 100
      let pointSisaPakai = 0

      const dataResponse = await apiMethodBooking.getUserMembersAPI(props.user.user_id)
      const memberDiskon = dataResponse.data.data

      const faciMember = memberDiskon?.find((item_booking: any) => {
        if (item_booking.usme_memb_name === props.dataBookingBayar?.data_proses[0]?.facility?.faci_memb_name) {
          return item_booking
        }

      })
      if (faciMember.usme_memb_name === 'SILVER') {
        pointRpPakaiSILVERPerPoints = pointRpPakaiSILVERPerPoints * props.dataBookingBayar?.data_proses?.length
        pointSisaPakai = faciMember.usme_points - pointRpPakaiSILVERPerPoints
        totalDiskonMember = pointRpPakaiSILVERPerPoints * pointNominalPakai
        setUserMember({
          subTotalBonusMember: totalDiskonMember,
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

  let jumlahDiskon = props.dataBookingBayar?.data?.boor_border_rooms_price_total * (parseFloat(props.dataBookingBayar?.data?.boor_border_rooms_percent_discount.replace("%", "")
  ) / 100)
  let jumlahPajak = props.dataBookingBayar?.data?.boor_border_rooms_price_total * (parseFloat(props.dataBookingBayar?.data?.boor_border_rooms_percent_tax.replace("%", "")
  ) / 100)

  let totalPrice = props.dataBookingBayar?.data?.boor_border_rooms_price_total - jumlahDiskon
  totalPrice = totalPrice + jumlahPajak

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




  const fotoPrimary = props.dataBookingBayar.data_proses.map((data: any) => {
    const primaryPhoto = data.facility.facility_photos.find((data2: any) => {
      return Number(data2.fapho_primary) === 1;
    });

    return primaryPhoto || null;
  }).find((data3: any) => {
    return data3 !== null
  });
  useEffect(() => {
    getAllSpecialRoomByBoor()
    getUsermember()
  }, [])

  console.log(jumlahDiskon)
  console.log(detailBonus)
  console.log(optionsKupon)
  console.log(userMember)

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
          value={selectedKupon} placeholder="Pilih Kupon Anda"
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
        <b className="relative font-body-txt-body-s-regular">Detail Harga</b>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Harga Ruangan</div>
          <div className="relative font-semibold">{parseFloat(props.dataBookingBayar.data.boor_border_rooms_price.replace(/\$|,/g, "")).toLocaleString("id-ID", { style: "currency", currency: "IDR" })} x {props.dataBookingBayar.data.boor_border_hotel_rooms_total_rooms} = {props.dataBookingBayar.data.boor_border_rooms_price_total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Diskon {props.dataBookingBayar.data.boor_border_rooms_percent_discount}</div>
          <div className="relative font-semibold">-{jumlahDiskon.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Pajak {props.dataBookingBayar.data.boor_border_rooms_percent_tax}</div>
          <div className="relative font-semibold">+{jumlahPajak.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between">
          <div className="relative font-medium">Kupon Diskon-{detailBonus.name_kupon}</div>
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
          onClick={onButton3Click}
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
