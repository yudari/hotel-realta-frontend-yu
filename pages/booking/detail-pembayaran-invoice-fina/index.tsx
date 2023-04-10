import type { NextPage } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { useRouter } from "next/router";
import HeaderNavbar from "../../../components/ComponentsYudha/header-navbar";
import SectionOrderSuccess from "../../../components/ComponentsYudha/section-order-success";
import SectionDetailDiri from "../../../components/ComponentsYudha/section-detail-diri";
import SectionInvoice from "../../../components/ComponentsYudha/section-invoice";
import FooterContainer from "../../../components/ComponentsYudha/footer-container";

const DetailPembayaranInvoiceFina: NextPage = () => {
    const router = useRouter();

    const onFrameButtonClick = useCallback(() => {
        // Please sync "Landing Page Hotel" to the project
    }, []);

    const onFrameContainer4Click = useCallback(() => {
        router.push("/booking//detail-booking-pembayaran-fina");
    }, [router]);

    return (
        <>
            <Head>
                <title>Halaman Detail Pembayaran Invoice</title>
            </Head>
            <div className="relative bg-gray-100 w-full overflow-hidden flex flex-col items-start justify-start gap-[10px]">
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
                    confirmationMessage="Bagus pemesanan anda telah berhasil"
                    onFrameContainer4Click={onFrameContainer4Click}
                />
                <SectionDetailDiri />
                <SectionInvoice />
                <FooterContainer />
            </div>
        </>
    );
};

export default DetailPembayaranInvoiceFina;
