import type { NextPage } from "next";
import Head from "next/head";
import HeaderNavbarListBooking from "../../../components/ComponentsYudha/header-navbar-list-booking";
import SectionCardSearchBook from "../../../components/ComponentsYudha/section-card-search-book";
import SectionListBooking from "../../../components/ComponentsYudha/section-list-booking";
import SectionFooter from "../../../components/ComponentsYudha/section-footer";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useState, CSSProperties } from "react";
import HeaderNavbar from "@/components/ComponentsYudha/header-navbar";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetListBooking } from "@/redux/booking/action/bookingActionReducer";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgb(19 41 61 / var(--tw-bg-opacity))",
};

const ListBookingFinal: NextPage = () => {
    let startDateObj = new Date()
    let startDateStr = startDateObj.toISOString().substring(0, 10)
    let startDate = new Date(startDateStr)

    let endDateObj = new Date()
    endDateObj.setDate(endDateObj.getDate() + 1)
    let endDateStr = endDateObj.toISOString().substring(0, 10)
    let endDate = new Date(endDateStr)

    let startDateFinal = startDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })
    let endDateFinal = endDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', timeZone: 'Asia/Jakarta' })

    const { bookings, message, status } = useSelector((state: any) => state.bookingReducers)

    const [searchData, setSearchData] = useState({
        page: 1,
        minSubTotal: 0,
        maxSubTotal: 0,
        cityName: '',
        provName: '',
        countryName: '',
        regionName: '',
        startDate: startDateFinal,
        endDate: endDateFinal,
        facilities_support_filter: ['24-Hour Front Desk']
    })
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const router = useRouter()
    const dispatch = useDispatch()

    const onFrameButtonClick = useCallback(() => {
        router.push("/booking/list-booking-final");
    }, [router]);

    useEffect(() => {
        console.log(startDateFinal)

        if (router.pathname === '/booking/list-booking-final') {

            dispatch(doRequestGetListBooking(1, 0, 1000000000, '', '', 'Indonesia', 'Asia', searchData.startDate, searchData.endDate, ['24-Hour Front Desk']))
        }
        // else (router.pathname === `/booking/list-booking-final?page=1&minSubtotal=0&maxSubTotal=900000&cityName=&provName=&countryName=Indonesia&regionName=Asia&startDate=${startDate}&endDate=${endDateFinal}&facilities_support_filter=[24-Hour Front Desk]`)


    }, [dispatch])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [loading])



    return (
        <>
            <Head>
                <title>Halaman List Booking</title>
            </Head>
            <div className="relative bg-gray-100 w-full overflow-hidden flex flex-col items-start justify-start">
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
                {loading ? <ClipLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading"
                    data-testid="loader"
                /> : <>  {bookings && <SectionCardSearchBook changeSearchData={setSearchData} />}

                    {bookings && <SectionListBooking searchDataBooking={searchData} dataListBooking={bookings} />
                    }

                    <SectionFooter footerSectionSectionFooteHeight="338px" />
                </>}


            </div>
        </>
    );
};

export default ListBookingFinal;