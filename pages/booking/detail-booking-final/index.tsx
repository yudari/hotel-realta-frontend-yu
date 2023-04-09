import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState, CSSProperties } from "react";
import HeaderNavbar from "../../../components/ComponentsYudha/header-navbar";
import SectionCardSearchBooking from "../../../components/ComponentsYudha/section-card-search-booking";
import SectionDetailsOrder from "../../../components/ComponentsYudha/section-details-order";
import SectionRooms from "../../../components/ComponentsYudha/section-rooms";
import ContainerRating from "../../../components/ComponentsYudha/container-rating";
import ContainerReviewsUsers from "../../../components/ComponentsYudha/container-reviews-users";
import SectionHotelPolicy from "../../../components/ComponentsYudha/section-hotel-policy";
import FooterContainer from "../../../components/ComponentsYudha/footer-container";
import SectionCardSearchBook from "@/components/ComponentsYudha/section-card-search-book";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { doRequestGetBookingByQuery, doRequestGetOtherRooms } from "@/redux/booking/action/bookingActionReducer";
import { Carousel } from '@trendyol-js/react-carousel';

import ClipLoader from "react-spinners/ClipLoader";
import apiMethodBooking from "@/api/booking/apiMethodBooking";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgb(19 41 61 / var(--tw-bg-opacity))",
};
const DetailBookingFinal: NextPage = (props) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    let dataAllPhotos: any[] = []
    const { bookings, message, status } = useSelector((state: any) => state.bookingReducers)
    const { otherRooms, message: messageOtherRooms, status: statusOtherRooms } = useSelector((state: any) => state.otherRoomsReducers)
    const router = useRouter()

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const [searchData, setSearchData] = useState({
        page: 1,
        cityName: '',
        provName: '',
        countryName: '',
        regionName: '',
        startDate: today,
        endDate: tomorrow,
        facilities_support_filter: ['24-Hour Front Desk']
    })
    const dispatch = useDispatch();
    const onFrameButtonClick = useCallback(() => {
        router.replace('/booking/list-booking-final')
    }, []);

    useEffect(() => {
        if (router.isReady) {
            dispatch(doRequestGetBookingByQuery(router.query.idRooms, router.query.idHotel, router.query.startDate, router.query.endDate, router.query.dataRooms, router.query.guestRooms))
        }
    }, [router.isReady]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [loading])

    useEffect(() => {
        if (bookings.data?.data_rooms) {
            dispatch(doRequestGetOtherRooms(bookings.data?.data_rooms[0].faci_id, bookings.data?.data_rooms[0].faci_name, bookings.data?.data_rooms[0]?.category_group?.cagro_id))
        }
    }, [bookings.data?.data_rooms])


    console.log(bookings)
    return (
        <>
            <Head>
                <title>Halaman Detail Booking</title>
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
                {loading ? <ClipLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading"
                    data-testid="loader"
                /> : <>
                    <SectionCardSearchBook changeSearchData={setSearchData} />

                    <div className="self-stretch flex flex-col pt-[45px] px-[92px] pb-0 items-start justify-start">

                        <Carousel responsive show={2.5} slide={2} transition={0.5} swiping className="w-full overflow-hidden flex flex-row items-start justify-start">

                            {bookings && bookings?.data?.data_rooms[0]?.facility_photos?.map((img: any) => {
                                return <img key={img.fapho_id}
                                    className="relative w-[302px] h-full shrink-0 object-cover"
                                    alt={img.fapho_thumbnail_filename}
                                    src={`${img.fapho_url}`}
                                />
                            })}

                        </Carousel>
                    </div>
                    {bookings && <SectionDetailsOrder startDateFinal={router.query.startDate} endDateFinal={router.query.endDate} dataBookings={bookings} />}

                    <SectionRooms dataOtherRooms={otherRooms} />
                    <div className="self-stretch flex flex-col pt-[26px] px-[92px] pb-0 items-start justify-start">
                        <div className="w-full flex flex-col items-start justify-start gap-[49px]">
                            <ContainerRating dataRatings={bookings.data.data_rooms[0].hotel} />
                            <ContainerReviewsUsers dataReviews={bookings.data.data_rooms[0].hotel} />
                        </div>
                    </div>
                    <SectionHotelPolicy />
                    <FooterContainer /></>}


            </div>
        </>
    );
};

export default DetailBookingFinal;
