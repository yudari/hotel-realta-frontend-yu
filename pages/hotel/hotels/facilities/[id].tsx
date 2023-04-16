import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa'
import { BsFillCloudUploadFill, BsThreeDotsVertical } from 'react-icons/bs'
import { MdAddBox, MdDelete, MdEdit } from 'react-icons/md'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import AddFacilities from './addFacilities'
import EditFacilities from './editFacilities'
import Link from 'next/link'
import {
  doDeleteFacilities,
  doRequestGetFacilities,
  doRequestGetHotels,
} from '@/redux/hotel/action/actionReducer'
import UploadPhotosFacilities from './uploadPhotosFacilities'
import { ImPriceTags } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlinePlus } from 'react-icons/ai'

const Facilities = (props: any) => {
  let { hotels, refresh } = useSelector((state: any) => state.hotelsReducers)
  const [hotel, setHotels] = useState<any>({})

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
  const [isUpload, setIsUpload] = useState({
    status: false,
    faci_id: 0,
  })
  const [isEdit, setIsEdit] = useState({
    status: false,
    faci_id: 0,
  })

  const editOpen = (faci_id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, faci_id: faci_id }
    })
  }
  const UploadOpen = (faci_id: number) => {
    setIsUpload((prev) => {
      return { ...prev, status: true, faci_id: faci_id }
    })
  }

  const deleteOpen = async (faci_id: number) => {
    const confirmed = window.confirm(
      `Are you sure, you want to delete this facilities hotel ?`
    )
    if (confirmed) {
      dispatch(doDeleteFacilities(faci_id))
      toast.success(`Successfully removed`)
    }
  }

  const columns = [
    { name: 'NO' },
    { name: '       ' },
    { name: 'Facility Name' },
    { name: 'Room Number' },
    { name: 'Max Vacant' },
    { name: 'Start End Date' },
    { name: 'Range Price' },
    { name: 'Discount' },
    { name: 'Rate Price' },
    { name: 'Tax' },
  ]
  const dispatch = useDispatch()

  //===Pagination===
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(7)

  //============Search================
  const [search, setSearch] = useState('')
  const handleSearch = (event: any): void => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    dispatch(doRequestGetFacilities())
  })

  useEffect(() => {
    dispatch(doRequestGetHotels(pageNumber, pageSize, search))
    localStorage.setItem('hotels', JSON.stringify(hotels))
  }, [refresh, dispatch])

  // Mengambil data hotels dari localStorage saat halaman direfresh
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
    <div className='relative overflow-x-auto sm:rounded-lg shadow-md mt-5 rounded-xl bg-white p-4 '>
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
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg h-80'>
        <table className='w-full text-sm text-left text-black'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
            <tr>
              {(columns || []).map((col) => (
                <th
                  scope='col'
                  className='px-6 py-3'
                  key={col.name}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {col.name}
                </th>
              ))}
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {(hotel.facilitiesHotels || []).map((dt: any, index: number) => (
              <tr
                className='bg-white border-b border-gray-200'
                key={dt.faci_id}
              >
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='px-6 py-4'>
                  <div className='flex items-center'>
                    {dt.facility_photos
                      .filter((photo: any) => photo.fapho_primary === '1')
                      .map((photo: any) => (
                        <div
                          className='flex-shrink-0 w-20 h-20'
                          key={photo.fapho_id}
                        >
                          <Image
                            src={photo.fapho_url}
                            alt={photo.fapho_thumbnail_filename}
                            width={500}
                            height={500}
                            className='w-full h-full rounded-full shadow-2xl'
                          />
                        </div>
                      ))}
                  </div>
                </td>
                <td className='px-6 py-4'>
                  {dt.faci_name}
                  <br />
                  {dt.category_group.cagro_name}
                </td>
                <td className='px-6 py-4'>
                  {dt.faci_room_number.split('-')[1]}
                </td>
                <td className='px-6 py-4'>
                  {`${dt.faci_max_number} `}
                  {dt.faci_measure_unit}
                </td>
                <td className='px-6 py-4'>
                  {new Date(dt.faci_startdate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  <br />
                  {new Date(dt.faci_enddate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className='px-6 py-4'>
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(
                    Math.round(
                      parseFloat(dt.faci_low_price.replace(/[^\d.-]/g, ''))
                    )
                  )}
                  <br />
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(
                    Math.round(
                      parseFloat(dt.faci_high_price.replace(/[^\d.-]/g, ''))
                    )
                  )}
                </td>
                <td className='px-6 py-4'>
                  {(dt.faci_discount * 100).toFixed(0)}%
                </td>
                <td className='px-6 py-4'>
                  {' '}
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  }).format(
                    Math.round(
                      parseFloat(dt.faci_rate_price.replace(/[^\d.-]/g, ''))
                    )
                  )}
                </td>
                <td className='px-6 py-4'>
                  {' '}
                  {(dt.faci_tax_rate * 100).toFixed(0)}%
                </td>
                <td className='px-6 py-4'>
                  <Menu as='div' className='relative inline-block text-left'>
                    <div>
                      <Menu.Button className='inline-flex w-full justify-center rounded-md bg-none px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                        <BsThreeDotsVertical
                          className='ml-2 -mr-1 h-5 w-5 text-gray-700'
                          aria-hidden='true'
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 mt-2 z-50 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='px-1 py-1 '>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? 'bg-primary text-white'
                                    : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => editOpen(dt.faci_id)}
                              >
                                {active ? (
                                  <FaRegEdit
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <FaRegEdit
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                )}
                                Edit
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='px-1 py-1 '>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? 'bg-danger text-white'
                                    : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => deleteOpen(dt.faci_id)}
                              >
                                {active ? (
                                  <FaTrashAlt
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <FaTrashAlt
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                )}
                                Delete
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='px-1 py-1 '>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? 'bg-primary text-white'
                                    : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={() => UploadOpen(dt.faci_id)}
                              >
                                {active ? (
                                  <BsFillCloudUploadFill
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <BsFillCloudUploadFill
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                )}
                                Upload Photos
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='px-1 py-1 '>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/hotel/hotels/facilities/facility-price-history/${dt.faci_id}`}
                              >
                                <button
                                  className={`${
                                    active
                                      ? 'bg-primary text-white'
                                      : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  {active ? (
                                    <ImPriceTags
                                      className='mr-2 h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  ) : (
                                    <ImPriceTags
                                      className='mr-2 h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  )}
                                  Price History
                                </button>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        <AddFacilities isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}
      {isEdit.status ? (
        <EditFacilities
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null}
      {isUpload.status ? (
        <UploadPhotosFacilities
          isUpload={isUpload}
          closeModal={() =>
            setIsUpload((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null}
    </div>
  )
}

export default Facilities
