import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function MyBooking({ userData }: any) {
    const router = useRouter()
    const [redirected, setRedirected] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [riwayatBooking, setRiwayatBooking] = useState<any>([])
    const getRiwayatBooking = async (userId: any) => {
        const dataUserBookingResponse = await axios.get(`${process.env.BACKEND_URL}/booking/mybooking/${userId}`)
        let bookingRiwayat = dataUserBookingResponse.data
        let dataBookingRiwayat = bookingRiwayat.data.filter((data: any, index: number, self: any[]) => {
            // Filter data yang memiliki nilai sama pada hotel_name dan faci_name
            return (
                data.fapho_primary === "1" &&
                data.hotel_name &&
                data.faci_name &&
                self.findIndex((item) => item.hotel_name === data.hotel_name && item.faci_name === data.faci_name) === index
            );
        });
        setRiwayatBooking(dataBookingRiwayat);
    }
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('loginData') || '{}')
        console.log(userLogin)


        if (!redirected && userLogin.user_id !== userData?.user_id) {
            router.push(`/users/profile/${userData.user_id}`)
            setRedirected(true)
        }
        getRiwayatBooking(userLogin.user_id)

    }, [router, router.query, redirected])

    useEffect(() => {
        setIsRefreshing(false)
    }, [userData])

    console.log(riwayatBooking)



    return (

        <> <Head>
            <title>Hotel Realta - {userData.user_full_name} My Booking</title>
        </Head>


            <div className="w-full  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <h3 className='font-semibold text-darkslategray-100'>Booking History List</h3>
            </div>

            <div className="w-full mt-8 flex flex-col gap-10  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {riwayatBooking && riwayatBooking.map((data: any, index: any) => {
                    const checkin = new Date(data.borde_checkin);
                    const checkout = new Date(data.borde_checkout);

                    const checkinOptions: any = { month: 'short', day: 'numeric', year: 'numeric' };
                    const checkinFormatted: any = new Intl.DateTimeFormat('en-US', checkinOptions).format(checkin);

                    const checkoutOptions: any = { month: 'short', day: 'numeric', year: 'numeric' };
                    const checkoutFormatted = new Intl.DateTimeFormat('en-US', checkoutOptions).format(checkout);

                    let formattedRpHargaBooking = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(data.patr_debet));
                    return <div key={index} className='item-booking flex flex-row gap-6'>
                        <img height={124} width={135} src={`${data.fapho_url}`} className='rounded-md' alt="" />

                        <div className='kotak-foto-isi flex flex-col w-full max-w-[420px] gap-2'>
                            <h1 className='text-lg font-semibold text-darkslategray-300'>{data.faci_name}</h1>

                            <div className='w-full'>
                                <p className='text-md font-medium text-darkslategray-200'>{data.hotel_name}</p>
                                <div className='kotak-checkout-checkin text-sm text-darkslategray-100 flex flex-row gap-1'>
                                    <p className='tgl-check-in'>{checkinFormatted}</p>
                                    <p>-</p>
                                    <p className='tgl-check-out'>{checkoutFormatted}</p>

                                </div>
                            </div>
                            <p className='font-medium text-darkslategray-200'>{data.boor_total_guest} Guests, {data.boor_total_room} Room</p>

                        </div>
                        <h2 className='text-darkslategray-100 font-semibold'>{data.spof_name}</h2>
                        <div className='kotak-isi-harga flex flex-col gap-2 w-full items-end'>
                            <p className='text-darkslategray-100 font-semibold'>Booking</p>
                            <p className='text-sm text-darkslategray-100'>{formattedRpHargaBooking}</p>

                            <button className={`text-sm text-slamon hover:text-red-800`}>Detail</button>


                        </div>
                    </div>
                })}




            </div>

        </>
    )
}

export default MyBooking



export async function getServerSideProps(context: any) {
    const { req } = context


    if (!req.cookies['loginData'] && !req.cookies['token']) {
        return {
            redirect: {
                destination: '/users/loginEmployee',
            },
        }
    }

    const loginData = JSON.parse(req.cookies['loginData'])

    if (!loginData) {
        return {
            redirect: {
                statusCode: 301,
                destination: `/users/profile/${loginData.user_id}`,
            },
        }
    }


    // Fetch user by ID
    const resUser = await axios.get(`${process.env.BACKEND_URL}/users/${loginData.user_id}`)
    const userData = await resUser.data.data

    if (userData.statusCode === 404) {
        return {
            notFound: true,
        }
    }
    console.log(userData)




    return { props: { userData } }
}
