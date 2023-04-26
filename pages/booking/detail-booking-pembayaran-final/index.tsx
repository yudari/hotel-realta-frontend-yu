import type { NextPage } from "next";
import Head from "next/head";
import { useState, useCallback, CSSProperties, useEffect, Fragment, useRef } from "react";
import { useRouter } from "next/router";
import HeaderNavbar from "../../../components/ComponentsYudha/header-navbar";
import SectionOrderSuccess from "../../../components/ComponentsYudha/section-order-success";
import ModalAddItem from "../../../components/ComponentsYudha/modal-add-item";
import PortalPopup from "../../../components/ComponentsYudha/portal-popup";
import PaymentForm from "../../../components/ComponentsYudha/payment-form";
import CardDetailsOrderPayment from "../../../components/ComponentsYudha/card-details-order-payment";
import FooterContainer from "../../../components/ComponentsYudha/footer-container";
import PhoneInput from 'react-phone-input-2'
import Select from "react-tailwindcss-select";
import 'react-phone-input-2/lib/style.css'
import { useDispatch, useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";
import { slide as Menu } from 'react-burger-menu'
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import apiMethodBooking from "@/api/booking/apiMethodBooking";
import { useFormik } from "formik";
import secureLocalStorage from "react-secure-storage";
import SectionFooter from "@/components/ComponentsYudha/section-footer";
import { doRequestGetOneDetailPembayaran } from "@/redux/booking/action/bookingActionReducer";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const DetailBookingPembayaranFina: NextPage = () => {
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "rgb(19 41 61 / var(--tw-bg-opacity))",
    };

    const router = useRouter();
    const { bookingBayar, status: statusBookingBayar, message: messageBookingBayar } = useSelector((state: any) => state.bookingDetailPembayaranReducers)
    let [color, setColor] = useState("#ffffff");
    let [loading, setLoading] = useState(true);
    let [showCoupons, setShowCoupons] = useState(false)
    const [isModalAddItemOpen, setModalAddItemOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [selectedOption, setSelectedOption] = useState<any>(null)
    const [dataExtraItems, setDataExtraItems] = useState<any>(null)
    const [dataExtraItemsFinal, setDataExtraItemsFinal] = useState<any>({
        nameItem: '',
        hargaItem: '',
        quantityItem: 0,
        subTotalItems: ''
    })
    const [dataAllExtraItemsFinal, setDataAllExtraItemsFinal] = useState<any>([])
    const [totalExtraItemFinalPrice, setTotalExtraItemFinalPrice] = useState<any>(0)
    const [selectedExtraItems, setSelectedExtraItems] = useState<any>({})
    const [userLogin, setUserLogin] = useState<any>({})
    const [getAllPaymentMetodeUser, setGetAllPaymentMetodeUser] = useState<any>([{}])
    const [getAllPaymentMetodeRealta, setGetAllPaymentMetodeRealta] = useState<any>([{}])
    const [selectedPaymentRealta, setSelectedPaymentRealta] = useState<any>({})
    const [selectedPaymentUser, setSelectedPaymentUser] = useState<any>({})


    const [openItem, setOpenItem] = useState(false)
    const [userDetailDiri, setUserDetailDiri] = useState<any>({})
    const [validasiUser, setValidasiUser] = useState<boolean>(false)
    const [validasiUserSalah, setValidasiUserSalah] = useState<boolean>(false)
    const [validasiPayment, setValidasiPayment] = useState<boolean>(false)
    const [validasiPaymentSalah, setValidasiPaymentSalah] = useState<boolean>(false)
    const [validasiPaymentDetails, setValidasiPaymentDetails] = useState<any>([])
    const cancelButtonRef = useRef(null)

    const dispatch = useDispatch()
    const onFrameButtonClick = useCallback(async (IdBoor: any) => {
        secureLocalStorage.removeItem("yu_vo")
        const removeBookingOrder = await apiMethodBooking.removeBookingOrders(IdBoor)
        router.push(`/booking/list-booking-final`)
    }, []);

    const onFrameButtonClickRestaurant = useCallback(async (IdBoor: any) => {
        secureLocalStorage.removeItem("yu_vo")
        const removeBookingOrder = await apiMethodBooking.removeBookingOrders(IdBoor)
        router.push("/resto/restoMenuPhotos");

    }, []);


    const onFrameContainer4Click = useCallback(async (IdBoor: any) => {
        secureLocalStorage.removeItem("yu_vo")
        const removeBookingOrder = await apiMethodBooking.removeBookingOrders(IdBoor)
        console.log(removeBookingOrder)
        router.back();
    }, [router]);

    const getAllExtraItems = async () => {
        try {
            const dataResponse = await apiMethodBooking.getAllExtraItems()
            let dataItems = dataResponse.data.data
            dataItems = dataItems.map((data: any) => {
                return {
                    value: data,
                    label: data.prit_name
                }
            })
            setDataExtraItems(dataItems)

            console.log(dataItems)

        } catch (error) {
            console.log(error)
        }
    }
    const openModalAddItem = useCallback(() => {
        setModalAddItemOpen(true);
    }, []);

    const closeModalAddItem = useCallback(() => {
        setModalAddItemOpen(false);
    }, []);

    const changeShowCoupons = (data: any) => {
        setShowCoupons(data)
    }

    const handleExtraItems = (value: any) => {
        setSelectedExtraItems(value)
        console.log(selectedExtraItems)
    }


    const submitExtraItems = (e: any) => {
        e.preventDefault()
        let subTotalPrice = 0

        let dataSubmitItems: any = {
            namaItem: selectedExtraItems,
            jumlahHargaPerItem: parseInt(e.target.hargaItem.value.replace(/\D/g, '')) / 100,
            jumlahItem: Number(e.target.jumlahItem.value),
            jumlahSubTotal: 0
        }
        dataSubmitItems.jumlahSubTotal = dataSubmitItems.jumlahHargaPerItem * dataSubmitItems.jumlahItem
        setTotalExtraItemFinalPrice((prevValue: any) => prevValue = prevValue + dataSubmitItems.jumlahSubTotal)
        setDataAllExtraItemsFinal((prevData: string | any[]) => [...prevData, { ...dataSubmitItems }])

        setSelectedExtraItems({})
        e.target.hargaItem.value = '',
            e.target.jumlahItem.value = ''


        setOpenItem(false)
    }

    const deleteExtraItemsFinal = (idItem: any) => {
        let subTotal = 0

        const dataHitungItems = dataAllExtraItemsFinal.filter((data: any) => {
            if (data.namaItem.value.prit_id !== idItem) {
                return data
            }
        })

        dataHitungItems.forEach((item: any) => {
            subTotal = subTotal + item.jumlahSubTotal
        })

        console.log(dataHitungItems)
        setTotalExtraItemFinalPrice(subTotal)
        setDataAllExtraItemsFinal(dataHitungItems)
    }

    const submitValidasiDetailDiriUser = async (e: any) => {
        e.preventDefault()
        const userDetail = {
            userName: e.target.nameUser.value,
            userPhoneNumber: phoneNumber,
            userEmail: e.target.emailUser.value
        }

        try {
            const dataResponse = await apiMethodBooking.getUserByIdentities(userDetail)
            const dataUser = dataResponse.data.data
            if (dataUser.length > 0) {
                const userEmailFinal = dataUser.find((item: any) => {
                    if (item.user_id === userLogin.user_id) {
                        setValidasiUser(true)
                        return item
                    }
                })

            } else {
                setValidasiUserSalah(true)
            }

            e.target.nameUser.value = ''
            setPhoneNumber('')
            e.target.emailUser.value = ''


        } catch (error) {
            console.log(error)
        }
        // console.log(userDetail)
    }

    const getAllMetodePembayaranUserPelanggan = async (IdUser: any) => {
        try {
            if (IdUser) {
                const dataResponse = await apiMethodBooking.getAllPaymentUser(IdUser)

                setGetAllPaymentMetodeUser(dataResponse.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getAllMetodePembayaranRealta = async (IdRealta: any) => {
        try {
            if (IdRealta) {
                const dataResponse = await apiMethodBooking.getAllPaymentUser(IdRealta)
                setGetAllPaymentMetodeRealta(dataResponse.data)
            }

        } catch (error) {

        }
    }
    const changeSelectInputMetodePembayaranRealta = (rekeningRealta: any) => {
        function isJSON(str: string): boolean {
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
        }

        if (isJSON(rekeningRealta.target.value)) {
            const dataRekening = JSON.parse(rekeningRealta.target.value)
            setSelectedPaymentRealta(dataRekening)
        } else {
            console.log(`Data Bukan JSON`)
        }


    }

    const changeSelectInputMetodePembayaranUser = (rekeningUser: any) => {

        function isJSON(str: string): boolean {
            try {
                JSON.parse(str);
                return true;
            } catch (error) {
                return false;
            }
        }

        if (isJSON(rekeningUser.target.value)) {

            const dataRekening = JSON.parse(rekeningUser.target.value)
            console.log(dataRekening)
            setSelectedPaymentUser(dataRekening)

        } else {
            console.log(`Data bukan JSON`)
        }
    }

    const submitValidasiRekeningUserdanRealta = async (e: any) => {
        e.preventDefault()
        const dataRekening = {
            metodePembayaranUser: selectedPaymentUser.entity_name,
            rekeningUser: e.target.elements.rekening_user.value,
            metodePembayaranRealta: selectedPaymentRealta.entity_name,
            rekeningRealta: e.target.elements.rekening_realta.value
        }

        try {
            const dataUserPaymentDetails: any = await apiMethodBooking.getUserPaymentDetail(dataRekening.metodePembayaranUser, dataRekening.rekeningUser)
            const dataUserFinalPaymentDetails = dataUserPaymentDetails.data[0]

            const dataRealtaPaymentDetails: any = await apiMethodBooking.getUserPaymentDetail(dataRekening.metodePembayaranRealta, dataRekening.rekeningRealta)
            const dataRealtaFinalPaymentDetails = dataRealtaPaymentDetails.data[0]
            if (dataUserPaymentDetails && dataUserFinalPaymentDetails) {
                setValidasiPaymentDetails([{ ...dataUserFinalPaymentDetails }, { ...dataRealtaFinalPaymentDetails }])
                setValidasiPayment(true)
            } else {
                setValidasiPaymentSalah(true)
            }



        } catch (error) {
            console.log(error)
        }

    }

    const getUserDetailDiri = async (iduser: any) => {
        try {
            const userData = await apiMethodBooking.userBookingInfoDetail(iduser)
            const userDataResponse = userData.data

            setUserDetailDiri(userDataResponse)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            const userLogin = JSON.parse(localStorage.getItem("loginData") || "{}");
            secureLocalStorage.removeItem('yu_date')
            setUserLogin(userLogin)
            getUserDetailDiri(userLogin?.user_id)
            dispatch(doRequestGetOneDetailPembayaran(router.query.IdOrderDetail, router.query.IdUser, router.query.CheckIn, router.query.CheckOut, router.query.TotalGuest, router.query.totalRooms))
            console.log(router)
            getAllExtraItems()
            getAllMetodePembayaranUserPelanggan(userLogin?.user_id); getAllMetodePembayaranRealta(21);
        }
    }, [router.isReady]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)

        }, 2000)
    }, [loading])




    return (
        <>
            <Head>
                <title>Halaman Detail Booking Pembayaran</title>
            </Head>
            <div className="relative bg-gray-100 w-full  overflow-hidden flex flex-col items-start justify-start gap-[10px] text-left text-[16px] text-darkslategray-300 font-body-txt-body-m-regular">
                <HeaderNavbar
                    vector="/vector17.svg"
                    vector1="/vector18.svg"
                    vector2="/vector19.svg"
                    vector3="/vector20.svg"
                    vector4="/vector21.svg"
                    vector5="/vector22.svg"
                    vector6="/vector23.svg"
                    vector7="/vector24.svg"
                    vector8="/vector25.svg"
                    vector9="/vector26.svg"
                    idboor={router.query.IdOrderDetail && router.query.IdOrderDetail}
                    onFrameButtonClickRestaurant={() => {
                        onFrameButtonClickRestaurant(router.query.IdOrderDetail)
                    }}
                    onFrameButtonClick={() => {
                        onFrameButtonClick(router.query.IdOrderDetail)
                    }}
                />
                {loading ? <ClipLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading"
                    data-testid="loader"
                /> : <><SectionOrderSuccess
                    confirmationMessage="Back"
                    onFrameContainer4Click={() => {
                        onFrameContainer4Click(router.query.IdOrderDetail)
                    }}
                />
                    <div className="self-stretch flex flex-col py-0 px-[92px] items-start justify-start">
                        <div className="w-[1232px] flex flex-row pt-0 px-0 pb-20 box-border items-start justify-start gap-[30px]">
                            <div className="flex-1 flex flex-col items-start justify-start">
                                <div className="self-stretch flex flex-col items-start justify-start gap-[40px]">
                                    <div className="self-stretch rounded-[18px] bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col p-4 items-start justify-start gap-[16px]">
                                        <div className="self-stretch rounded-[18px] bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                                            <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
                                                <b className="self-stretch relative">
                                                    1. Enter Your Information Details
                                                </b>
                                                <div className="self-stretch relative text-[14px]">
                                                    We will use these details to share your booking information.
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={submitValidasiDetailDiriUser} className="self-stretch overflow-hidden flex flex-col items-start justify-start gap-[18px]">
                                            <div className="w-[398px] flex flex-col items-start justify-start gap-[12px]">
                                                <div className="self-stretch flex flex-row items-start justify-start">
                                                    <div className="relative leading-[148%]">
                                                        Full Name
                                                    </div>
                                                </div>
                                                <input type="text" id="name_user" name="nameUser" className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Yudha" required />
                                            </div>
                                            <div className="w-[398px] flex flex-col items-start justify-start gap-[6px]">
                                                <div className="self-stretch flex flex-row items-start justify-start">
                                                    <div className="flex-1 relative  leading-[148%]">
                                                        No. Handphone
                                                    </div>
                                                </div>

                                                <PhoneInput
                                                    country={'id'}
                                                    value={phoneNumber}
                                                    onChange={phone => setPhoneNumber(phone)}
                                                    containerStyle={{
                                                        width: '100%',

                                                    }}
                                                    inputStyle={{
                                                        width: '100%'
                                                    }}
                                                    placeholder="+62"

                                                />

                                                {/* <PhoneInput
                                                    country={'id'}
                                                    value={phoneNumber}
                                                    onChange={(value) => setPhoneNumber(value)}
                                                    inputProps={{ name: 'phone_number' }}
                                                    inputClass="w-full py-6 rounded-md"
                                                    buttonStyle={{ width: '100%' }}

                                                /> */}
                                            </div>
                                            <div className="w-[398px] flex flex-col items-start justify-start gap-[6px]">
                                                <div className="self-stretch flex flex-row items-start justify-start">
                                                    <div className="flex-1 relative leading-[148%]">
                                                        Email
                                                    </div>
                                                </div>
                                                <input type="email" id="email_user" className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user@gmail.com" required name="emailUser" />
                                            </div>
                                            <button className="rounded bg-darkslategray-300 w-[398px] cursor-pointer hover:bg-darkslategray-100  flex flex-row py-2 px-4 box-border items-center justify-center text-center text-[14px] text-neutrals font-montserrat-regular-14">
                                                <div className="flex-1 relative font-semibold">
                                                    Check Booking Details
                                                </div>
                                            </button>
                                        </form>
                                    </div>
                                    <div className="self-stretch rounded-[18px] bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col p-4 items-start justify-start gap-[16px]">
                                        <div className="self-stretch rounded-[18px] bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                                            <div className="flex-1 flex flex-col items-start justify-start">
                                                <b className="relative">{`2.  Select item `}</b>
                                            </div>
                                        </div>
                                        <div className="self-stretch overflow-hidden flex flex-col items-start justify-start text-[14px] text-gray-500 font-text-[14px]-normal">
                                            <div className="self-stretch rounded-lg bg-neutrals shadow-[0px_4px_8px_-2px_rgba(16,_24,_40,_0.1),_0px_2px_4px_-2px_rgba(16,_24,_40,_0.06)] overflow-hidden flex flex-col items-start justify-start border-[1px] border-solid border-gray-200">
                                                <div className="self-stretch bg-neutrals flex flex-col items-start justify-start">
                                                    <div className="self-stretch flex flex-row pt-5 px-6 pb-[19px] items-start justify-start">
                                                        <div className="flex-1 flex flex-col items-start justify-start">
                                                            <div className="self-stretch relative leading-[20px]">
                                                                You can choose additional services that we will provide to you.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="relative overflow-x-auto w-full">
                                                    <table className="w-full text-[14px] text-left text-gray-500 dark:text-gray-400">
                                                        <thead className="text-[10px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                            <tr>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Item Name
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Price
                                                                </th>
                                                                <th scope="col" className="px-6 py-3">
                                                                    Quantity
                                                                </th>
                                                                <th scope="col" className="px-6 py-3 text-center">
                                                                    Sub Total
                                                                </th>
                                                                <th scope="col" className="py-3  text-right">
                                                                    <button onClick={() => setOpenItem(true)} type="button" className="text-white bg-darkslategray-300 hover:bg-darkslategray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dataAllExtraItemsFinal.map((item: any) => {
                                                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                                    <th scope="row" className="px-6 py-4">
                                                                        {item.namaItem.value.prit_name}
                                                                    </th>
                                                                    <td className="px-6 py-4">
                                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.jumlahHargaPerItem)}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {item.jumlahItem} Unit
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.jumlahSubTotal)}
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <button onClick={() => {
                                                                            deleteExtraItemsFinal(item.namaItem.value.prit_id)
                                                                        }} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
                                                                    </td>
                                                                </tr>
                                                            })}

                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="self-stretch bg-gray-200 flex flex-col items-start justify-start text-right text-darkslategray-300 font-body-txt-body-m-regular">
                                                    <div className="self-stretch flex flex-row pt-5 px-6 pb-[19px] items-center justify-end gap-[16px]">
                                                        <div className="flex-1 flex flex-col items-start justify-start">
                                                            <div className="self-stretch relative leading-[20px]">
                                                                Total :  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalExtraItemFinalPrice)}
                                                            </div>
                                                        </div>
                                                        <button className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded w-[118px] h-12 shrink-0 flex flex-row box-border items-center justify-center">
                                                            <div className="relative text-[14px] font-semibold font-montserrat-regular-14 text-neutrals text-left">
                                                                Save
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={submitValidasiRekeningUserdanRealta} className="self-stretch rounded-[18px] gap-5 bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col p-4 items-start justify-start">
                                        <div className="self-stretch rounded-[18px] bg-gainsboro-200 flex flex-row p-4 items-start justify-start text-[inherit] font-inherit">
                                            <div className="flex-1 flex flex-col items-start justify-start">
                                                <b className="self-stretch relative">
                                                    <ul className="m-0">3. Payment</ul>
                                                </b>
                                            </div>
                                        </div>
                                        <div className="self-stretch overflow-hidden flex flex-col items-start justify-start gap-[18px]">
                                            <div className="self-stretch flex flex-row items-start justify-start">
                                                <div className="flex-1 relative leading-[148%] font-semibold">
                                                    Choose Your Payment
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-row items-start justify-start gap-[18px] text-grayscale-black">

                                                <div className="flex-1 h-[146px] flex flex-col items-start justify-start gap-[6px] text-left text-[16px] text-grayscale-black font-body-txt-body-s-regular">
                                                    <label htmlFor=" " className="block relative leading-[148%]">Choose Payment</label>
                                                    <select id="tipePembayaran" className="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-[14px] rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={changeSelectInputMetodePembayaranUser}>
                                                        <option selected>Select Payment</option>
                                                        {getAllPaymentMetodeUser && getAllPaymentMetodeUser.map((item: any, index: any) => (
                                                            <option key={index} value={JSON.stringify(item)}>{item?.entity_name}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                                <div className="flex-1 flex flex-col items-start justify-start gap-[6px]">
                                                    <div className="self-stretch flex flex-row items-start justify-start">
                                                        <div className="relative leading-[148%]">
                                                            Account Number
                                                        </div>
                                                    </div>
                                                    <input type="text" id="rekening_user" name="rekening_user" className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="111-111-111-111" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch overflow-hidden flex flex-col items-start justify-start gap-[18px]">
                                            <div className="self-stretch flex flex-row items-start justify-start">
                                                <div className="flex-1 relative leading-[148%] font-semibold">
                                                    Realta Bank Accounts
                                                </div>
                                            </div>
                                            <div className="self-stretch flex flex-row items-start justify-start gap-[18px] text-grayscale-black">

                                                <div className="flex-1 h-[146px] flex flex-col items-start justify-start gap-[6px] text-left text-[16px] text-grayscale-black font-body-txt-body-s-regular">
                                                    <label htmlFor=" " className="block relative leading-[148%]">Choose Payment</label>
                                                    <select id="tipePembayaran" className="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-[14px] rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={changeSelectInputMetodePembayaranRealta} name="option_rekening_realta">
                                                        <option selected>Select Payment</option>
                                                        {getAllPaymentMetodeRealta && getAllPaymentMetodeRealta?.map((item: any, index: any) => (
                                                            <option key={index} value={JSON.stringify(item)}>{item?.entity_name}</option>
                                                        ))}

                                                    </select>

                                                </div>
                                                <div className="flex-1 flex flex-col items-start justify-start gap-[6px]">
                                                    <div className="self-stretch flex flex-row items-start justify-start">
                                                        <div className="relative leading-[148%]">
                                                            Account Number
                                                        </div>
                                                    </div>
                                                    <input type="text" id="rekening_realta" name="rekening_realta" className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="111-111-111-111" required value={selectedPaymentRealta?.usac_account_number} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                                            <div className="self-stretch flex flex-row items-center justify-end">
                                                <button type="submit" className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded w-[118px] hover:bg-darkslategray-100 h-12 shrink-0 flex flex-row box-border items-center justify-center">
                                                    <div className="relative text-[14px] font-semibold font-montserrat-regular-14 text-neutrals text-left">
                                                        Validation
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="self-stretch overflow-hidden" />
                                    </form>
                                </div>
                            </div>
                            <CardDetailsOrderPayment validasiPaymentDetails={validasiPaymentDetails} userDetailDiri={userDetailDiri} dataAllExtraItemsFinal={dataAllExtraItemsFinal} finalExtraPrice={totalExtraItemFinalPrice} user={userLogin} dataBookingBayar={bookingBayar} />
                        </div>
                    </div>
                    <SectionFooter /></>}

            </div>


            {/* Modal Add Items */}
            <Transition appear show={openItem} as={Fragment}>
                <Dialog as="div" className="relative z-10 font-body-txt-body-s-regular" onClose={() => setOpenItem(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-semibold  text-darkslategray-300 "
                                    >
                                        Add Extra Booking Items
                                    </Dialog.Title>
                                    <div className="h-[1px] mt-2 bg-darkslategray-100"></div>
                                    <form onSubmit={submitExtraItems} className="mt-3">
                                        <div className="mb-6">
                                            <label htmlFor="nama-item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                                            <Select primaryColor="indigo"
                                                value={selectedExtraItems}
                                                onChange={handleExtraItems}
                                                options={dataExtraItems}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price Per Item</label>
                                            <input type="input" id="input-harga" name="hargaItem" disabled value={selectedExtraItems?.value?.prit_price !== undefined ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedExtraItems?.value?.prit_price) : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="jumlah-item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                            <input type="input" id="input-quantity" name="jumlahItem" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        </div>

                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </form>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Modal Confirmation User Ada */}

            <Transition appear show={validasiUser} as={Fragment}>
                <Dialog as="div" className="relative z-10 font-body-txt-body-s-regular" onClose={() => setValidasiUser(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-semibold  text-darkslategray-300 cursor-pointer text-center"
                                    >
                                        Your Information has been Verified
                                    </Dialog.Title>

                                    <div className="w-full flex flex-row justify-center mt-3">
                                        <img src="/icons8-verified-account-50.png" alt="" width={`50px`} height={`50px`} />
                                    </div>



                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Modal Confirmation User Tidak Ada */}

            <Transition appear show={validasiUserSalah} as={Fragment}>
                <Dialog as="div" className="relative z-10 font-body-txt-body-s-regular" onClose={() => setValidasiUserSalah(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-semibold  text-darkslategray-300 cursor-pointer text-center"
                                    >
                                        Maaf User Anda Tidak Terverifikasi
                                    </Dialog.Title>

                                    <div className="w-full flex flex-row justify-center mt-3">
                                        <img src="/icons8-user-not-found-50.png" alt="" width={`50px`} height={`50px`} />
                                    </div>



                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Modal Validasi Payment */}
            <Transition appear show={validasiPayment} as={Fragment}>
                <Dialog as="div" className="relative z-10 font-body-txt-body-s-regular" onClose={() => setValidasiPayment(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-semibold  text-darkslategray-300 cursor-pointer text-center"
                                    >
                                        Your Account Number has been Verified
                                    </Dialog.Title>

                                    <div className="w-full flex flex-row justify-center mt-3">
                                        <img src="/icons8-verified-account-50.png" alt="" width={`50px`} height={`50px`} />
                                    </div>



                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Modal Validasi Payment Jika Salah*/}
            <Transition appear show={validasiPaymentSalah} as={Fragment}>
                <Dialog as="div" className="relative z-10 font-body-txt-body-s-regular" onClose={() => setValidasiPaymentSalah(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-semibold  text-darkslategray-300 cursor-pointer text-center"
                                    >
                                        Rekening Anda Salah
                                    </Dialog.Title>

                                    <div className="w-full flex flex-row justify-center mt-3">
                                        <img src="/icons8-wrong-pincode-50.png" alt="" width={`50px`} height={`50px`} />
                                    </div>



                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default DetailBookingPembayaranFina;
