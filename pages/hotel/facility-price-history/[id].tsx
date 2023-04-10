import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdAddBox } from 'react-icons/md'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { doRequestGetFacilities } from '@/redux/hotel/action/actionReducer'

const Facilities = () => {
  let { facilities, message, refresh } = useSelector(
    (state: any) => state.facilitiesReducers
  )
  const [faci, setFaci] = useState<any>({})
  console.log(facilities)
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
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState({
    status: false,
    hotel_id: 0,
  })

  const editOpen = (faci_id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, faci_id: faci_id }
    })
  }
  const columns = [
    { name: 'NO' },
    { name: 'Username' },
    { name: 'Modified Date' },
    { name: 'Start End Date' },
    { name: 'Range Price' },
    { name: 'Discount' },
    { name: 'Rate Price' },
    { name: 'Tax' },
  ]
  const dispatch = useDispatch()
  const router = useRouter().query

  useEffect(() => {
    const filter = facilities.filter((data: any) => {
      if (data.faci_id === Number(router.id)) {
        return data
      }
    })[0]
    setFaci(filter)
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
                  Facilities
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {/* Header */}
      <div className='bg-white text-black py-2 px-6 flex border-2 items-center justify-between'>
        <div className='mb-4 mt-4 ml-10'>
          <div className='text-xl font-bold'>{faci.faci_name}</div>
          <div className='text-xs font-semibold'>{faci.faci_description}</div>
        </div>

        <div className='mr-52'>
          <div className='text-sm font-bold'>Room Number</div>
          <div className='text-xs font-semibold'>
            {faci.faci_room_number && faci.faci_room_number.substring(3)}
          </div>
        </div>
      </div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg h-screen'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-sm text-white uppercase bg-primary dark:bg-black dark:text-black'>
            {(columns || []).map((col) => (
              <th key={col.name} style={{ whiteSpace: 'nowrap' }}>
                <span className='px-4 py-3'>{col.name}</span>
              </th>
            ))}
          </thead>
          <tbody>
            {(faci.facility_price_history || []).map(
              (dt: any, index: number) => (
                <tr
                  key={dt.faph_id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <td className='px-4 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white'>
                    {index + 1}
                  </td>
                  <td className='px-4 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white'>
                    {dt.users.user_full_name}
                  </td>
                  <td className='px-4 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white text-center'>
                    {new Date(dt.faph_modified_date).toLocaleDateString(
                      'en-GB',
                      {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </td>
                  <td className='px-4 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white text-center'>
                    {new Date(dt.faph_startdate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    <br />
                    {new Date(dt.faph_enddate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className='px-4 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white'>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(
                      Math.round(
                        parseFloat(dt.faph_low_price.replace(/[^\d.-]/g, ''))
                      )
                    )}
                    <br />
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(
                      Math.round(
                        parseFloat(dt.faph_high_price.replace(/[^\d.-]/g, ''))
                      )
                    )}
                  </td>

                  <td className='px-4 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white text-center'>
                    {(dt.faph_discount * 100).toFixed(0)}%
                  </td>
                  <td className='px-4 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white text-center'>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(
                      Math.round(
                        parseFloat(dt.faph_rate_price.replace(/[^\d.-]/g, ''))
                      )
                    )}
                  </td>
                  <td className='px-4 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white'>
                    {(dt.faph_tax_rate * 100).toFixed(0)}%
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Facilities
