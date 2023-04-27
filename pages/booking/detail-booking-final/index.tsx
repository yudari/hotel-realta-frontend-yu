import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState, CSSProperties, Fragment, useRef } from "react";
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
import secureLocalStorage from "react-secure-storage";
import { Dialog, Transition } from "@headlessui/react";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import ApiMethodHotel from "@/api/hotel/apiMethodHotel";
import SectionFooter from "@/components/ComponentsYudha/section-footer";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgb(19 41 61 / var(--tw-bg-opacity))",
};
const DetailBookingFinal: NextPage = (props) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    let [openModalComment, setOpenModalComment] = useState(false)
    let [ratingReview, setRatingReview] = useState(3)
    let [user, setUser] = useState<any>({})
    const ratingRef = useRef<HTMLDivElement>(null);
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
        router.push('/booking/list-booking-final')
    }, []);

    const onFrameButtonClickRestaurant = useCallback(() => {
        router.push('/resto/restoMenuPhotos')
    }, []);

    const onStartModal = () => {
        setOpenModalComment(true)
    }

    const handleRating = (rate: number) => {
        setRatingReview(rate)
    }

    const onSubmitComment = async (e: any) => {
        e.preventDefault()
        const dataInputComment = {
            hore_user_review: e.target.user_comment.value,
            hore_rating: ratingReview,
            hore_user_id: Number(e.target.user_id.value),
            hore_hotel_id: Number(e.target.hotel_id.value)
        }

        console.log(dataInputComment)
        try {
            const dataResponseInputComment = await ApiMethodHotel.createHotelReviews(dataInputComment)
            if (dataResponseInputComment) {
                e.target.user_comment.value = '';
                setRatingReview(0)
                e.target.user_id.value = "";
                e.target.hotel_id.value = ""
                setOpenModalComment(false)
            } else {
                throw 'Gagal Input'
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            secureLocalStorage.removeItem('yu_date')
            const dataUser = JSON.parse(localStorage.getItem('loginData')!)
            setUser(dataUser)
            dispatch(doRequestGetBookingByQuery(router.query.idHotel, router.query.idRooms, router.query.startDate, router.query.endDate, router.query.dataRooms, router.query.guestRooms))
        }
    }, [router, openModalComment]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [loading])

    useEffect(() => {
        if (bookings.data?.data_rooms?.length > 0) {
            dispatch(doRequestGetOtherRooms(bookings.data?.data_rooms[0]?.faci_id, bookings.data?.data_rooms[0]?.faci_name, bookings.data?.data_rooms[0]?.category_group?.cagro_id))
        }
    }, [bookings.data?.data_rooms])

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (!ratingRef?.current?.contains(event.target)) {
                setRatingReview(0);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


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
                    onFrameButtonClickRestaurant={onFrameButtonClickRestaurant}
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
                    <SectionCardSearchBook classNames={`hidden`} changeSearchData={setSearchData} />

                    <div className="self-stretch flex flex-col pt-[45px] px-[92px] pb-0 items-start justify-start">

                        <Carousel responsive show={3.5} slide={2} transition={0.5} swiping className="w-full overflow-hidden flex flex-row items-start justify-start">

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

                    <SectionRooms startDateFinal={router.query.startDate} endDateFinal={router.query.endDate} dataOtherRooms={otherRooms} />
                    <div className="self-stretch flex flex-col pt-[26px] px-[92px] pb-0 items-start justify-start">
                        <div className="w-full flex flex-col items-start justify-start gap-[49px]">
                            <ContainerRating onOpenModalComment={onStartModal} dataRatings={bookings.data?.data_rooms[0]?.hotel} />
                            <ContainerReviewsUsers dataReviews={bookings.data?.data_rooms[0]?.hotel} />
                        </div>
                    </div>
                    <SectionHotelPolicy />
                    <SectionFooter /></>}


            </div>
            {/* Modal Add Comment User */}
            {!loading && <Transition appear show={openModalComment} as={Fragment}>
                <Dialog as="div" className="relative z-10 font-body-txt-body-s-regular" onClose={() => setOpenModalComment(false)}>
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
                                        className="text-lg font-semibold mb-2  text-darkslategray-300 "
                                    >
                                        Add Your Review
                                    </Dialog.Title>
                                    <p className="text-sm text-darkslategray-100">Give us your feedback</p>
                                    <div className="h-[1px] mt-2 mb-4 bg-gray-300"></div>
                                    <form onSubmit={onSubmitComment} className="mt-3">
                                        <div className="mb-6">
                                            <label htmlFor="nama-item" className="block mb-2 text-md  font-semibold font-body-txt-body-s-regular text-gray-900 dark:text-white">Comment</label>

                                            <textarea required placeholder="Insert your comment" name="user_comment" id="user-comment" className="w-full rounded-sm focus:border-darkslategray-300 focus:bg-white" cols={30} rows={3} />
                                        </div>

                                        <div className="mb-6 w-full">
                                            <label htmlFor="nama-item" className="block mb-2 text-md  font-semibold font-body-txt-body-s-regular text-gray-900 dark:text-white">Rating</label>

                                            <Rating ref={ratingRef} style={{ maxWidth: 250 }} value={ratingReview} onChange={handleRating} />
                                        </div>


                                        <div className="mb-6 w-full hidden">
                                            <label htmlFor="nama-item" className="block mb-2 text-md  font-semibold font-body-txt-body-s-regular text-gray-900 dark:text-white">Hotel</label>

                                            <input type="number" disabled value={bookings.data?.data_rooms[0]?.hotel.hotel_id} name='hotel_id' />
                                        </div>

                                        <div className="mb-6 w-full hidden">
                                            <label htmlFor="nama-item" className="block mb-2 text-md  font-semibold font-body-txt-body-s-regular text-gray-900 dark:text-white">Users</label>

                                            <input type="text" disabled value={user?.user_id} name='user_id' />
                                        </div>
                                        <div className="h-[1px] mt-2 mb-4 bg-gray-300"></div>
                                        <div className="button-container w-full flex flex-row-reverse justify-start gap-5">
                                            <button type="submit" className="text-white bg-darkslategray-300 hover:bg-darkslategray-100 focus:ring-4 focus:outline-none focus:ring-darkslategray-100 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-darkslategray-200 dark:hover:bg-darkslategray-200 dark:focus:ring-darkslategray-100">Submit</button>

                                            <button type="submit" className="text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-darkslategray-200 dark:hover:bg-darkslategray-200 dark:focus:ring-darkslategray-100">Cancel</button>
                                        </div>


                                    </form>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>}



        </>
    );
};

export default DetailBookingFinal;
