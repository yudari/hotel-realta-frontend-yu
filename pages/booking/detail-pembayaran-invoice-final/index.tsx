import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ls from 'localstorage-slim';
import HeaderNavbar from "../../../components/ComponentsYudha/header-navbar";
import SectionOrderSuccess from "../../../components/ComponentsYudha/section-order-success";
import SectionDetailDiri from "../../../components/ComponentsYudha/section-detail-diri";
import SectionInvoice from "../../../components/ComponentsYudha/section-invoice";
import FooterContainer from "../../../components/ComponentsYudha/footer-container";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import secureLocalStorage from "react-secure-storage";
import apiMethodBooking from "@/api/booking/apiMethodBooking";
import SectionFooter from "@/components/ComponentsYudha/section-footer";
import { ComponentToPrint } from "./InvoicePrint";



const DetailPembayaranInvoiceFinal: NextPage = () => {
    const [dataDetailDiri, setDataDetailDiri] = useState<any>({})
    const [dataInvoice, setDataInvoice] = useState<any>({})
    const [dataTransaction, setDataTransaction] = useState<any>([])
    const componentRef = useRef(null);
    let router = useRouter();

    const onFrameButtonClick = useCallback(async (IdBoor: any) => {
        // Please sync "Landing Page Hotel" to the project

        secureLocalStorage.removeItem("yu_vo")
        const removeDataBookingOrder = await apiMethodBooking.removeBookingOrders(IdBoor)
        router.push(`/`)
    }, []);

    const onFrameContainer4Click = useCallback(async (IdBoor: any) => {
        const removeDataBookingOrder = await apiMethodBooking.removeBookingOrders(IdBoor)
        secureLocalStorage.removeItem("yu_vo")
        router.back();
    }, [router]);


    const handlePrint = () => {
        window.print();
    };
    useEffect(() => {
        const dataInvoice = secureLocalStorage.getItem("yu_vo");
        const dataTransaction = secureLocalStorage.getItem('yu_tr')
        console.log(dataInvoice);

        setDataDetailDiri(dataInvoice)
        setDataInvoice(dataInvoice)
        setDataTransaction(dataTransaction)
    }, [router.isReady])


    return (
        <>

            <Head>
                <title>Halaman Detail Pembayaran Invoice</title>
            </Head>
            <div className="relative  bg-gray-100 w-full overflow-hidden flex flex-col items-start justify-start gap-[10px]">
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
                    onFrameButtonClick={() => {
                        onFrameButtonClick(dataDetailDiri.booking_order_id)
                    }}
                />


                <SectionOrderSuccess
                    confirmationMessage="Great, your booking has been successfully completed."
                // onFrameContainer4Click={() => {
                //     onFrameContainer4Click(dataDetailDiri.booking_order_id)
                // }}
                />




                {Object.keys(dataDetailDiri).length > 0 && <SectionDetailDiri onComponentRef={componentRef} dataDetailDiri={dataDetailDiri} />}

                {Object.keys(dataInvoice).length > 0 && <SectionInvoice onComponentRef={componentRef} onHandlePrint={handlePrint} dataInvoice={dataInvoice} />}
                <SectionFooter />

            </div >


        </>
    );
};

export default DetailPembayaranInvoiceFinal;
