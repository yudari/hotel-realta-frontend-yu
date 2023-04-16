import {
  doDeleteHotels,
  doRequestGetCity,
  doRequestGetHotels,
} from '../../../redux/hotel/action/actionReducer'
import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import { MdAddBox, MdDelete, MdEdit } from 'react-icons/md'
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaTrashAlt,
  FaRegEdit,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import AddHotels from './addHotels'
import EditHotels from './editHotels'
import SwitchStatus from './switchStatus'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlinePlus } from 'react-icons/ai'

const Hotels = () => {
  let { hotels, message, refresh } = useSelector(
    (state: any) => state.hotelsReducers
  )
  console.log(hotels)
  const dispatch = useDispatch()

  //===Pagination===
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const totalArr = Array.apply(null, Array(hotels?.totalPage)).map(function (
    x,
    i
  ) {
    return i
  })
  const handleIncPage = () => {
    if (pageNumber >= totalArr.length) {
      setPageNumber(pageNumber)
    } else {
      setPageNumber(pageNumber + 1)
    }
  }

  const handleDecPage = () => {
    if (pageNumber <= 1) {
      setPageNumber(1)
    } else {
      setPageNumber(pageNumber - 1)
    }
  }
  //======Open, Edit, Switch========
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState({
    status: false,
    hotel_id: 0,
  })
  const [isSwitch, setIsSwitch] = useState({
    status: false,
    hotel_id: 0,
  })
  const editOpen = (hotel_id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, hotel_id: hotel_id }
    })
  }
  const switchOpen = (hotel_id: number) => {
    setIsSwitch((prev) => {
      return { ...prev, status: true, hotel_id: hotel_id }
    })
  }

  const deleteOpen = async (hotel_id: number) => {
    const confirmed = window.confirm(
      `Are you sure, you want to delete this hotel ?`
    )
    if (confirmed) {
      dispatch(doDeleteHotels(hotel_id))

      toast.success(`Successfully removed`)
    }
  }

  //===========ICON Star========================
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
    { name: 'NO' },
    { name: 'Hotel Name' },
    { name: 'Rating Star' },
    { name: 'Phone Number' },
    { name: 'Modified Date' },
  ]
  //============Search================
  const [search, setSearch] = useState('')
  const handleSearch = (event: any): void => {
    setSearch(event.target.value)
  }

  //===============================
  useEffect(() => {
    dispatch(doRequestGetHotels(pageNumber, pageSize, search))
    dispatch(doRequestGetCity())
    localStorage.removeItem('hotels')
  }, [refresh, pageNumber, pageSize, search])

  return (
    <div className='relative overflow-x-auto  shadow-md mt-5 rounded-xl bg-white p-4'>
      <div className='pb-4 bg-white flex items-center gap-4 justify-between'>
        <div className='flex items-center gap-4'>
          <div>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                id='table-search'
                className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded w-80 bg-gray-50'
                placeholder='Search for items'
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <button
          className='bg-primary hover:bg-primary-hover transition-colors ease-in duration-100 p-2 rounded text-white flex items-center gap-2 border border-primary'
          onClick={() => setIsOpen(true)}
        >
          <AiOutlinePlus className='text-xl' />
          Add
        </button>
      </div>
      {/* Table */}
      <table className='w-full text-sm text-left text-black'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
          <tr>
            {(columns || []).map((col) => (
              <th scope='col' className='px-6 py-3' key={col.name}>
                {col.name}
              </th>
            ))}
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {(hotels.data || []).map((dt: any, index: number) => (
            <tr className='bg-white border-b border-gray-200' key={dt.hotel_id}>
              <td className='px-6 py-4'>{index + 1}</td>
              <td className='px-6 py-4'>{dt.hotel_name}</td>
              <td className='px-6 py-4 display flex'>
                {renderStars(dt.hotel_rating_star)}
              </td>
              <td className='px-6 py-4'>{dt.hotel_phonenumber}</td>
              <td className='px-6 py-4'>
                {new Date(dt.hotel_modified_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className='px-6 py-4'>
                <Menu as='div' className='relative inline-block text-left'>
                  <div>
                    <Menu.Button className='inline-flex w-full justify-center rounded-md bg-none px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none ml-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                      <BsThreeDotsVertical
                        className='ml-2 -mr-1 h-5 w-5 text-primary'
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
                              onClick={() => editOpen(dt.hotel_id)}
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
                      <div className='px-1 py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? 'bg-danger text-white'
                                  : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              onClick={() => deleteOpen(dt.hotel_id)}
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
                            <Link
                              href={`/hotel/hotels/facilities/${dt.hotel_id}`}
                            >
                              <button
                                className={`${
                                  active
                                    ? 'bg-primary text-white'
                                    : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <MdAddBox
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <MdAddBox
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                )}
                                Add Facilities
                              </button>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>

                      <div className='px-1 py-1 '>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={`/hotel/hotels/facility-support/${dt.hotel_id}`}
                            >
                              <button
                                className={`${
                                  active
                                    ? 'bg-primary text-white'
                                    : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <MdAddBox
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <MdAddBox
                                    className='mr-2 h-5 w-5'
                                    aria-hidden='true'
                                  />
                                )}
                                Add Facility Support
                              </button>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className='px-1 py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? 'bg-primary text-white'
                                  : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              onClick={() => switchOpen(dt.hotel_id)}
                            >
                              {active ? (
                                <HiOutlineSwitchHorizontal
                                  className='mr-2 h-5 w-5'
                                  aria-hidden='true'
                                />
                              ) : (
                                <HiOutlineSwitchHorizontal
                                  className='mr-2 h-5 w-5'
                                  aria-hidden='true'
                                />
                              )}
                              Swict Status
                            </button>
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
      <nav
        aria-label='Page navigation example'
        className='flex items-center justify-end pt-4'
      >
        <ul className='inline-flex items-center -space-x-px'>
          <li>
            <button
              className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={handleDecPage}
            >
              <span className='sr-only'>Previous</span>
              <svg
                aria-hidden='true'
                className='w-5 h-5'
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
            </button>
          </li>
          {totalArr.map((total, index) => (
            <li key={index}>
              <button
                className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                onClick={() => setPageNumber(total + 1)}
              >
                {total + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              className='block px-3 py-2 leading-tight text-gray-500 bg-white border 
            border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              onClick={handleIncPage}
            >
              <span className='sr-only'>Next</span>
              <svg
                aria-hidden='true'
                className='w-5 h-5'
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
            </button>
          </li>
        </ul>
      </nav>
      <ToastContainer autoClose={5000} />
      {isOpen ? (
        <AddHotels isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}
      {isEdit.status ? (
        <EditHotels
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null}
      {isSwitch.status ? (
        <SwitchStatus
          isSwitch={isSwitch}
          closeModal={() =>
            setIsSwitch((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null}
    </div>
  )
}

export default Hotels
