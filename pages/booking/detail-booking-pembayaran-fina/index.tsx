import type { NextPage } from "next";
import Head from "next/head";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import HeaderNavbar from "../../../components/ComponentsYudha/header-navbar";
import SectionOrderSuccess from "../../../components/ComponentsYudha/section-order-success";
import ModalAddItem from "../../../components/ComponentsYudha/modal-add-item";
import PortalPopup from "../../../components/ComponentsYudha/portal-popup";
import PaymentForm from "../../../components/ComponentsYudha/payment-form";
import CardDetailsOrderPayment from "../../../components/ComponentsYudha/card-details-order-payment";
import FooterContainer from "../../../components/ComponentsYudha/footer-container";
import PhoneInput from 'react-phone-input-2'
import Select from 'react-select';
import 'react-phone-input-2/lib/style.css'


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const DetailBookingPembayaranFina: NextPage = () => {
    const router = useRouter();
    const [isModalAddItemOpen, setModalAddItemOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const onFrameButtonClick = useCallback(() => {
        // Please sync "Landing Page Hotel" to the project
    }, []);

    const onFrameContainer4Click = useCallback(() => {
        router.push("/booking/detail-booking-final");
    }, [router]);

    const openModalAddItem = useCallback(() => {
        setModalAddItemOpen(true);
    }, []);

    const closeModalAddItem = useCallback(() => {
        setModalAddItemOpen(false);
    }, []);
    console.log(phoneNumber)
    return (
        <>
            <Head>
                <title>Halaman Detail Booking Pembayaran</title>
            </Head>
            <div className="relative bg-gray-100 w-full overflow-hidden flex flex-col items-start justify-start gap-[10px] text-left text-base text-darkslategray-300 font-body-txt-body-m-regular">
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
                    onFrameButtonClick={onFrameButtonClick}
                />
                <SectionOrderSuccess
                    confirmationMessage="Kembali"
                    onFrameContainer4Click={onFrameContainer4Click}
                />
                <div className="self-stretch flex flex-col py-0 px-[92px] items-start justify-start">
                    <div className="w-[1232px] flex flex-row pt-0 px-0 pb-20 box-border items-start justify-start gap-[30px]">
                        <div className="flex-1 flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-col items-start justify-start gap-[40px]">
                                <div className="self-stretch rounded-xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col p-4 items-start justify-start gap-[16px]">
                                    <div className="self-stretch rounded-xl bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                                        <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
                                            <b className="self-stretch relative">
                                                1. Masukkan Detail Informasi Anda
                                            </b>
                                            <div className="self-stretch relative text-sm">
                                                Kami akan menggunakan rincian ini untuk berbagi
                                                informasi pemesanan Anda.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="self-stretch overflow-hidden flex flex-col items-start justify-start gap-[18px]">
                                        <div className="w-[398px] flex flex-col items-start justify-start gap-[12px]">
                                            <div className="self-stretch flex flex-row items-start justify-start">
                                                <div className="relative leading-[148%]">
                                                    Nama Lengkap
                                                </div>
                                            </div>
                                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Yudha" required />
                                        </div>
                                        <div className="w-[398px] flex flex-col items-start justify-start gap-[6px]">
                                            <div className="self-stretch flex flex-row items-start justify-start">
                                                <div className="flex-1 relative leading-[148%]">
                                                    Nomor Handhone
                                                </div>
                                            </div>

                                            <PhoneInput
                                                country={'id'}
                                                value={phoneNumber}
                                                onChange={(value) => setPhoneNumber(value)}
                                                inputProps={{ name: 'phone_number' }}
                                                inputClass="w-full py-6 rounded-sm"


                                            />
                                        </div>
                                        <div className="w-[398px] flex flex-col items-start justify-start gap-[6px]">
                                            <div className="self-stretch flex flex-row items-start justify-start">
                                                <div className="flex-1 relative leading-[148%]">
                                                    Email
                                                </div>
                                            </div>
                                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user@gmail.com" required />
                                        </div>
                                        <button className="rounded bg-darkslategray-300 w-[398px] cursor-pointer hover:bg-darkslategray-100  flex flex-row py-2 px-4 box-border items-center justify-center text-center text-sm text-neutrals font-montserrat-regular-14">
                                            <div className="flex-1 relative font-semibold">
                                                Kirim Passcode
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div className="self-stretch rounded-xl bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col p-4 items-start justify-start gap-[16px]">
                                    <div className="self-stretch rounded-xl bg-gainsboro-200 flex flex-row p-4 items-start justify-start">
                                        <div className="flex-1 flex flex-col items-start justify-start">
                                            <b className="relative">{`2.  Pilih Item `}</b>
                                        </div>
                                    </div>
                                    <div className="self-stretch overflow-hidden flex flex-col items-start justify-start text-sm text-gray-500 font-text-sm-normal">
                                        <div className="self-stretch rounded-lg bg-neutrals shadow-[0px_4px_8px_-2px_rgba(16,_24,_40,_0.1),_0px_2px_4px_-2px_rgba(16,_24,_40,_0.06)] overflow-hidden flex flex-col items-start justify-start border-[1px] border-solid border-gray-200">
                                            <div className="self-stretch bg-neutrals flex flex-col items-start justify-start">
                                                <div className="self-stretch flex flex-row pt-5 px-6 pb-[19px] items-start justify-start">
                                                    <div className="flex-1 flex flex-col items-start justify-start">
                                                        <div className="self-stretch relative leading-[20px]">
                                                            Anda bisa memilih pelayanan tambahan yang akan
                                                            kami berikan kepada anda
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                Nama Item
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Harga
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Jumlah Item
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                <button className="text-gray-400 ">
                                                                    <p>ADD</p>
                                                                </button>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th scope="row" className="px-6 py-4">
                                                                Cola-cola
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                Rp 20.000,00
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                2 Unit
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Rp 40.000,00
                                                            </td>
                                                        </tr>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th scope="row" className="px-6 py-4">
                                                                Extra Bed
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                Rp 70.000,00
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                3 Unit
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Rp. 210.000,00
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="self-stretch bg-gray-200 flex flex-col items-start justify-start text-right text-darkslategray-300 font-body-txt-body-m-regular">
                                                <div className="self-stretch flex flex-row pt-5 px-6 pb-[19px] items-center justify-end gap-[16px]">
                                                    <div className="flex-1 flex flex-col items-start justify-start">
                                                        <div className="self-stretch relative leading-[20px]">
                                                            Total : Rp 250.000,00
                                                        </div>
                                                    </div>
                                                    <button className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded w-[118px] h-12 shrink-0 flex flex-row box-border items-center justify-center">
                                                        <div className="relative text-sm font-semibold font-montserrat-regular-14 text-neutrals text-left">
                                                            Simpan
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch rounded-xl gap-5 bg-neutrals shadow-[0px_4px_16px_rgba(17,_34,_17,_0.05)] flex flex-col p-4 items-start justify-start">
                                    <div className="self-stretch rounded-xl bg-gainsboro-200 flex flex-row p-4 items-start justify-start text-[inherit] font-inherit">
                                        <div className="flex-1 flex flex-col items-start justify-start">
                                            <b className="self-stretch relative">
                                                <ul className="m-0 pl-[21px]">Pembayaran</ul>
                                            </b>
                                        </div>
                                    </div>
                                    <div className="self-stretch overflow-hidden flex flex-col items-start justify-start gap-[18px]">
                                        <div className="self-stretch flex flex-row items-start justify-start">
                                            <div className="flex-1 relative leading-[148%] font-semibold">
                                                Pilih Pembayaran Anda
                                            </div>
                                        </div>
                                        <div className="self-stretch flex flex-row items-start justify-start gap-[18px] text-grayscale-black">

                                            <div className="flex-1 h-[146px] flex flex-col items-start justify-start gap-[6px] text-left text-base text-grayscale-black font-body-txt-body-s-regular">
                                                <label htmlFor=" " className="block relative leading-[148%]">Tipe Pembayaran</label>
                                                <select id="tipePembayaran" className="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>Pilih Tipe Pembayaran</option>
                                                    <option value="BCA">BCA</option>
                                                    <option value="Go To">GoTo</option>

                                                </select>

                                            </div>
                                            <div className="flex-1 flex flex-col items-start justify-start gap-[6px]">
                                                <div className="self-stretch flex flex-row items-start justify-start">
                                                    <div className="relative leading-[148%]">
                                                        Account Number
                                                    </div>
                                                </div>
                                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="111-111-111-111" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="self-stretch overflow-hidden flex flex-col items-start justify-start gap-[18px]">
                                        <div className="self-stretch flex flex-row items-start justify-start">
                                            <div className="flex-1 relative leading-[148%] font-semibold">
                                                Rekening dan Akun Realta
                                            </div>
                                        </div>
                                        <div className="self-stretch flex flex-row items-start justify-start gap-[18px] text-grayscale-black">

                                            <div className="flex-1 h-[146px] flex flex-col items-start justify-start gap-[6px] text-left text-base text-grayscale-black font-body-txt-body-s-regular">
                                                <label htmlFor=" " className="block relative leading-[148%]">Tipe Pembayaran</label>
                                                <select id="tipePembayaran" className="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>Pilih Tipe Pembayaran</option>
                                                    <option value="BCA">BCA</option>
                                                    <option value="Go To">GoTo</option>

                                                </select>

                                            </div>
                                            <div className="flex-1 flex flex-col items-start justify-start gap-[6px]">
                                                <div className="self-stretch flex flex-row items-start justify-start">
                                                    <div className="relative leading-[148%]">
                                                        Account Number
                                                    </div>
                                                </div>
                                                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="111-111-111-111" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="self-stretch overflow-hidden flex flex-col items-start justify-start">
                                        <div className="self-stretch flex flex-row items-center justify-end">
                                            <button className="cursor-pointer [border:none] py-2 px-4 bg-darkslategray-300 rounded w-[118px] hover:bg-darkslategray-100 h-12 shrink-0 flex flex-row box-border items-center justify-center">
                                                <div className="relative text-sm font-semibold font-montserrat-regular-14 text-neutrals text-left">
                                                    Validasi
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="self-stretch overflow-hidden" />
                                </div>
                            </div>
                        </div>
                        <CardDetailsOrderPayment />
                    </div>
                </div>
                <FooterContainer />
            </div>
            {isModalAddItemOpen && (
                <PortalPopup
                    overlayColor="rgba(58, 58, 58, 0.3)"
                    placement="Centered"
                    onOutsideClick={closeModalAddItem}
                >
                    <ModalAddItem onClose={closeModalAddItem} />
                </PortalPopup>
            )}
        </>
    );
};

export default DetailBookingPembayaranFina;
