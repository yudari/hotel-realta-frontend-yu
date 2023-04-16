import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Avatar from '@/public/avatar.svg'
import Button from '@/components/Button/button'
import TabUser from '@/components/TabUser'
import { useRouter } from 'next/router'
import axios from 'axios'
import EditProfile from './editProfile'
import EditPassword from './editPassword'
import Head from 'next/head'

export default function UserProfile({ userData, bonus, members }: any) {
  const imageUrl = `${process.env.BACKEND_URL}/image/users`
  const router = useRouter()
  const [redirected, setRedirected] = useState(false)
  const [isEditProfile, setIsEditProfile] = useState({
    status: false,
    id: 0,
  })

  const [isEditPassword, setIsEditPassword] = useState({
    status: false,
    id: 0,
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('loginData') || '{}')

    const { user_id } = router.query

    if (!redirected && userLogin.user_id !== user_id) {
      router.push(`/users/profile/${userLogin.user_id}`)
      setRedirected(true)
    }
  }, [router, router.query, redirected])

  useEffect(() => {
    setIsRefreshing(false)
  }, [userData])

  const refreshData = () => {
    router.replace(router.asPath)
    setIsRefreshing(true)
  }

  return (
    <>
      <Head>
        <title>Hotel Realta - {userData.user_full_name} Profile</title>
      </Head>
      <div className='w-full'>
        <section className='relative general shadow-md overflow-auto bg-white'>
          <div className="h-60 w-full bg-[url('https://source.unsplash.com/random/900%C3%97700/?abstract')] bg-no-repeat bg-center bg-cover rounded-tl-lg rounded-tr-lg"></div>

          <div className='p-4'>
            <div className='relative grid grid-cols-1 md:grid-rows-2 md:grid-cols-4 p-6'>
              <div className='relative md:row-span-2'>
                <div className='absolute -top-48 md:left-0 left-1/2 transform md:translate-x-0 -translate-x-1/2 bg-white p-4 rounded-lg shadow-md'>
                  {userData.user_photo_profile ? (
                    <Image
                      src={`${imageUrl}/${userData.user_photo_profile}`}
                      alt='Hotel Realta Logo'
                      width={150}
                      height={150}
                      className='rounded-sm w-36 h-36 object-cover mx-auto'
                    />
                  ) : (
                    <Image
                      src={Avatar}
                      alt='Hotel Realta Logo'
                      width={150}
                      height={150}
                      className='rounded-sm w-36 h-36 object-cover mx-auto'
                    />
                  )}

                  <div className='my-4'>
                    <p className='text-sm text-gray-400'>Email</p>
                    <p className='text-base md:tex-sm font-semibold mt-1 text-danger-secondary'>
                      {userData.user_email ? userData.user_email : '-'}
                    </p>
                  </div>

                  <div className='my-4'>
                    <p className='text-sm text-gray-400'>Phone Number</p>
                    <p className='text-base md:tex-sm font-semibold mt-1 text-danger-secondary'>
                      {userData.user_phone_number}
                    </p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 col-span-3 justify-between gap-2 mt-32 md:mt-0'>
                <div className='my-1'>
                  <p className='text-sm text-gray-400'>Name</p>
                  <p className='text-base md:text-2xl font-semibold mt-1 text-primary'>
                    {userData.user_full_name}
                  </p>
                </div>

                <div className='my-1'>
                  <p className='text-sm text-gray-400'>Member Type</p>
                  <p className='text-base md:text-2xl font-semibold mt-1 text-danger-secondary'>
                    {userData.usme_memb_name
                      ? `${userData.usme_memb_name} Member`
                      : '-'}
                  </p>
                </div>

                <div className='my-1'>
                  <p className='text-sm text-gray-400'>User Type</p>
                  <p className='text-base md:text-2xl font-semibold mt-1 text-primary'>
                    {userData.user_type === 'T'
                      ? 'Travel Agent'
                      : userData.user_type === 'C'
                      ? 'Corporate'
                      : 'Individual'}
                  </p>
                </div>

                <div className='my-1'>
                  <p className='text-sm text-gray-400'>User Gender</p>
                  <p className='text-base md:text-2xl font-semibold mt-1 text-primary'>
                    {userData.uspro_gender === 'M' ? 'Male' : 'Female'}
                  </p>
                </div>
              </div>

              <div className='absolute bottom-0 right-0 flex gap-4 items-end justify-end'>
                <Button
                  label='Edit Profile'
                  size='small'
                  type='main'
                  variant='danger-secondary'
                  onClick={() =>
                    setIsEditProfile((prev) => {
                      return { ...prev, status: true, id: userData.user_id }
                    })
                  }
                />

                <Button
                  label='Edit Password'
                  size='small'
                  type='main'
                  variant='variant'
                  onClick={() =>
                    setIsEditPassword((prev) => {
                      return { ...prev, status: true, id: userData.user_id }
                    })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id='points-member'
          className='mt-10 p-4 rounded-lg shadow-xl bg-white'
        >
          <div id='security-header'>
            <h1 className='text-2xl text-primary font-bold'>Points & Member</h1>
            <hr className='mt-1' />
          </div>

          <div className='security-card flex justify-between'>
            <TabUser bonusPoints={bonus} historyMembers={members} />
          </div>
        </section>

        {isEditProfile.status ? (
          <EditProfile
            data={userData}
            isEdit={isEditProfile}
            refreshData={refreshData}
            closeModal={() =>
              setIsEditProfile((prev) => {
                return { ...prev, status: false }
              })
            }
          />
        ) : null}

        {isEditPassword.status ? (
          <EditPassword
            data={userData}
            isEdit={isEditPassword}
            closeModal={() =>
              setIsEditPassword((prev) => {
                return { ...prev, status: false }
              })
            }
          />
        ) : null}
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { req } = context
  const { id } = context.params

  if (!req.cookies['loginData'] && !req.cookies['token']) {
    return {
      redirect: {
        destination: '/users/loginEmployee',
      },
    }
  }

  const loginData = JSON.parse(req.cookies['loginData'])

  if (Number(loginData.user_id) !== Number(id)) {
    return {
      redirect: {
        statusCode: 301,
        destination: `/users/profile/${loginData.user_id}`,
      },
    }
  }

  // Fetch user by ID
  const resUser = await axios.get(`${process.env.BACKEND_URL}/users/${id}`)
  const userData = await resUser.data.data

  if (userData.statusCode === 404) {
    return {
      notFound: true,
    }
  }

  // fetch user bonus point
  const resBonus = await axios.get(
    `${process.env.BACKEND_URL}/users/bonusPoints/${id}`
  )
  const bonus = await resBonus.data.data

  // fetch user
  const resMembers = await axios.get(
    `${process.env.BACKEND_URL}/users/userMembers/${id}`
  )
  const members = await resMembers.data.data

  return { props: { userData, bonus, members } }
}
