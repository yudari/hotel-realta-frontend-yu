import React, { useEffect, useState } from 'react'
import { MdAddBox, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  doDeleteFacilitySupportHotel,
  doRequestGetFacilitiesSupport,
  doRequestGetHotels,
} from '@/redux/hotel/action/actionReducer'
import Image from 'next/image'
import { FaStar, FaRegStar, FaStarHalfAlt, FaTrashAlt } from 'react-icons/fa'
import AddSupportHotel from './addSupportHotel'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlinePlus } from 'react-icons/ai'

const Facilities = () => {
  let { hotels, refresh } = useSelector((state: any) => state.hotelsReducers)
  const [hotel, setHotels] = useState<any>({})

  const dispatch = useDispatch()

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
    const confirmed = window.confirm(
      `Are you sure, you want to delete this facilities support hotel ?`
    )
    if (confirmed) {
      dispatch(doDeleteFacilitySupportHotel(fsh_id))
      toast.success(`Successfully removed`)
    }
  }

  //===Pagination===
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(7)

  //====Search======
  const [search, setSearch] = useState('')
  const handleSearch = (event: any): void => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    dispatch(doRequestGetFacilitiesSupport())
  })

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
    <div className='relative overflow-x-auto shadow-md mt-5 rounded-xl bg-white p-4'>
      <div className='pb-4 bg-white flex items-center gap-4 justify-between'>
        <div className='flex items-center gap-4'>
          <div className='mb-4 mt-4 ml-10'>
            <div className='text-2xl font-bold'>{hotel.hotel_name}</div>
            <div className='text-xs text-gray-500'>
              {` ${hotel.address && hotel.address.addr_line1}, ${
                hotel.address && hotel.address.addr_line2
              }`}
            </div>
            <div className='text-xs font-semibold'>
              {hotel.hotel_description}
            </div>
          </div>
          <div className='ml-96'>
            <div className='mr-4'>{hotel.hotel_phonenumber}</div>
            <div className='display flex'>
              {renderStars(hotel.hotel_rating_star)}
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='text-base font-bold ml-6'>{`${hotel.hotel_name} Facilities`}</div>
        <button
          className='bg-primary hover:bg-primary-hover transition-colors ease-in duration-100 p-2 rounded text-white flex items-center gap-2 border border-primary ml-auto mb-4'
          onClick={() => setIsOpen(true)}
        >
          <AiOutlinePlus className='text-xl' />
          Add
        </button>
      </div>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
          <tr className=''>
            {(columns || []).map((col) => (
              <th key={col.name}>
                <span className='px-8'>{col.name}</span>
              </th>
            ))}
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {(hotel.facilities_support || []).map((dt: any, index: number) => (
            <tr className='bg-white border-b border-gray-200' key={dt.fs_id}>
              <td className='px-6 py-4'>{index + 1}</td>
              <td className='flex px-6 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white text-center'>
                <Image
                  src={dt.fs_icon_url}
                  alt={dt.fs_icon}
                  width={50}
                  height={50}
                />
                <span className='mt-4 ml-3'>{dt.fs_name}</span>
              </td>
              <td className='px-6 py-4'>{dt.fs_description}</td>
              <td className='px-6 py-4 flex gap-2'>
                <button
                  className='border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary'
                  onClick={() =>
                    deleteOpen(dt?.facility_support_hotels?.fsh_id)
                  }
                >
                  <MdDelete className='text-xl' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className='flex items-center justify-between pt-4'
        aria-label='Table navigation'
      >
        <span className='text-sm font-normal text-gray-500'>
          Showing <span className='font-semibold text-gray-900'>1-10</span> of{' '}
          <span className='font-semibold text-gray-900'>1000</span>
        </span>
        <ul className='inline-flex items-center -space-x-px'>
          <li>
            <a
              href='#'
              className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l hover:bg-gray-100 hover:text-gray-700 '
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            >
              1
            </a>
          </li>
          <li>
            <a
              href='#'
              className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              2
            </a>
          </li>

          <li>
            <a
              href='#'
              className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'
            >
              <span className='sr-only'>Next</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
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
            </a>
          </li>
        </ul>
      </nav>
      <ToastContainer autoClose={5000} />
      {isOpen ? (
        <AddSupportHotel isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}
    </div>
  )
}

export default Facilities
