import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdAddBox } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {
  doDeleteFacilitySupportHotel,
  doRequestGetFacilitiesSupport,
  doRequestGetHotels,
} from '@/redux/hotel/action/actionReducer'
import Image from 'next/image'
import { FaStar, FaRegStar, FaStarHalfAlt, FaTrashAlt } from 'react-icons/fa'
import AddSupportHotel from './addSupportHotel'

const Facilities = () => {
  let { hotels, refresh } = useSelector((state: any) => state.hotelsReducers)

  const [hotel, setHotels] = useState<any>({})

  console.log(hotel)
  const dispatch = useDispatch()
  const router = useRouter().query

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const halfStar = rating - fullStars >= 0.5 ? true : false

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar className='text-amber-400' key={i} />)
      } else if (halfStar && i === fullStars + 1) {
        stars.push(<FaStarHalfAlt className='text-amber-400' key={i} />)
      } else {
        stars.push(<FaRegStar className='text-amber-400' key={i} />)
      }
    }

    return stars
  }

  const columns = [
    { name: 'ID' },
    { name: 'Facilities Support Name' },
    { name: 'Description' },
  ]
  const [isOpen, setIsOpen] = useState(false)

  const deleteOpen = async (fsh_id: number) => {
    // console.log('id_facility', fsh_id)
    dispatch(doDeleteFacilitySupportHotel(fsh_id))
  }
  //===Pagination===
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(7)
  //============Search================
  const [search, setSearch] = useState('')
  const handleSearch = (event: any): void => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    dispatch(doRequestGetFacilitiesSupport())
  }, [refresh])

  useEffect(() => {
    dispatch(doRequestGetHotels(pageNumber, pageSize, search))
    localStorage.setItem('hotels', JSON.stringify(hotels))
  }, [refresh, dispatch])

  useEffect(() => {
    const routerId = window.location.pathname
    const id = routerId.split('/').pop()
    const cachedHotels = JSON.parse(localStorage.getItem('hotels') || '[]')
    cachedHotels?.data?.filter((data: any) => {
      if (data.hotel_id === Number(id)) {
        setHotels(data)
      }
    })
  }, [refresh])

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg h-screen'>
      {/* breadcrumb */}
      <div className='bg-white text-black py-2 px-6 flex font-bold border-t-2 border-r-2 border-l-2 items-center justify-between'>
        <nav className='flex' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='inline-flex items-center'>
              <a
                href='/'
                className='inline-flex items-center font-bold text-black text-medium hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
              >
                <svg
                  aria-hidden='true'
                  className='w-4 h-4 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'></path>
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className='flex items-center'>
                <svg
                  aria-hidden='true'
                  className='w-6 h-6 text-gray-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <a
                  href='/hotel/hotels'
                  className='ml-1 text-sm text-black font-bold hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white'
                >
                  Hotels
                </a>
              </div>
            </li>
            <li>
              <div className='flex items-center'>
                <svg
                  aria-hidden='true'
                  className='w-6 h-6 text-gray-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <a
                  href={`/hotel/facilities/${router.id}`}
                  className='ml-1 text-sm text-black font-bold hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white'
                >
                  Facility Support
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Header */}
      <div className='bg-white text-black py-2 px-6 flex border-2 items-center justify-between'>
        <div className='mb-4 mt-4 ml-10'>
          <div className='text-xl font-bold'>{hotel.hotel_name}</div>
          <div className='text-xs font-semibold'>
            {` ${hotel.address && hotel.address.addr_line1}, ${
              hotel.address && hotel.address.addr_line2
            }`}
          </div>
        </div>

        <div className='mr-52'>
          <div className='mr-4'>{hotel.hotel_phonenumber}</div>
          <div className='display flex'>
            {renderStars(hotel.hotel_rating_star)}
          </div>
        </div>
      </div>
      {/* Columns */}
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg h-screen'>
        <table className='w-full tex-xs text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-sm text-white uppercase bg-primary dark:bg-black dark:text-black '>
            <tr className=''>
              {(columns || []).map((col) => (
                <th key={col.name}>
                  <span className='px-8'>{col.name}</span>
                </th>
              ))}

              <th className='px- py-3 '>
                <button
                  className='flex items-center'
                  onClick={() => setIsOpen(true)}
                >
                  <MdAddBox className='mr-1' />
                  <span className='mr-2 whitespace-nowrap'>
                    Add Facility Support
                  </span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {(hotel.facilities_support || []).map((dt: any, index: number) => (
              <tr
                key={dt.fs_id}
                className='bg-white border-b hover:bg-primary/5'
              >
                <td className='px-8 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white'>
                  {index + 1}
                </td>
                <td className='flex px-8 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white text-center'>
                  <Image
                    src={dt.fs_icon_url}
                    alt={dt.fs_icon}
                    width={50}
                    height={50}
                  />
                  <span className='mt-4 ml-3'>{dt.fs_name}</span>
                </td>
                <td className='px-8 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white items-center'>
                  {dt.fs_description}
                </td>
                <td className='px-20 py-3 text-sm text-gray-900 '>
                  <button
                    onClick={() =>
                      deleteOpen(dt.facility_support_hotels.fsh_id)
                    }
                  >
                    <FaTrashAlt className='mr-2 h-5 w5 hover:text-danger' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Pagination
          pagination={{ totalPage: hotels?.totalPage, page: hotels?.page }}
          setPage={setPageNumber}
        /> */}
      </div>
      {isOpen ? (
        <AddSupportHotel isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}
      {/* {isEdit.status ? (
        <EditSupport
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null} */}
    </div>
  )
}

export default Facilities
