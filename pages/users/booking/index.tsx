import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function MyBooking({ userData }: any) {
    const router = useRouter()
    const [redirected, setRedirected] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem('loginData') || '{}')
        console.log(userLogin)

        if (!redirected && userLogin.user_id !== userData?.user_id) {
            router.push(`/users/profile/${userData.user_id}`)
            setRedirected(true)
        }
    }, [router, router.query, redirected])

    useEffect(() => {
        setIsRefreshing(false)
    }, [userData])



    return (

        <> <Head>
            <title>Hotel Realta - {userData.user_full_name} My Booking</title>
        </Head>


            <div className="w-full  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <h3 className='font-semibold text-darkslategray-100'>My Booking</h3>
            </div>

            <div className="w-full mt-8 flex flex-col gap-2  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className='item-booking flex flex-row gap-6'>
                    <img height={124} width={86} src="/pexels-jonathan-borba-3144580.jpg" className='rounded-md' alt="" />

                    <div className='kotak-foto-isi flex flex-col w-full max-w-[420px] gap-2'>
                        <h1 className='text-lg font-semibold text-darkslategray-300'>OYO 91862 Hotel Hayani</h1>

                        <div className='w-full'>
                            <div className='kotak-checkout-checkin text-sm text-darkslategray-100 flex flex-row gap-1'>
                                <p className='tgl-check-in'>Mar 22, 2023</p>
                                <p>-</p>
                                <p className='tgl-check-out'>Mar 24, 2023</p>

                            </div>
                        </div>
                        <p className='font-medium text-darkslategray-200'>2 Guests, 1 Room</p>

                    </div>
                    <h2 className='text-darkslategray-100 font-semibold'>GTFO2055</h2>
                    <div className='kotak-isi-harga flex flex-col gap-2 w-full items-end'>
                        <p className='text-darkslategray-100 font-semibold'>Booking</p>
                        <p className='text-sm text-darkslategray-100'>Rp 3.750.000,00</p>
                    </div>
                </div>

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



    return { props: { userData } }
}
