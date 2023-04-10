/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react'
import {
  BsFillPencilFill,
  BsThreeDotsVertical,
  BsTrashFill,
  BsFillCloudUploadFill,
} from 'react-icons/bs'
import AddRestoMenu from './addRestoMenu'
import UploadPhotos from '../restoMenuPhotos/addUploadRestoMenuPhotos'
import { useDispatch, useSelector } from 'react-redux'
import {
  doDelete,
  doRequestGetReme,
} from '../../../redux/restoSchema/action/actionReme'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Menu, Transition } from '@headlessui/react'
import EditRestoMenu from './editRestoMenu'
import Image from 'next/image'
import { doDeleteRepho } from '@/redux/restoSchema/action/actionRepho'

// import { SearchInput } from '../../../components/searchInput'

const restoMenu = () => {
  const { restoMenus = [], refresh } = useSelector(
    (state: any) => state.remeReducers
  )

  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(5)

  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
    data: [{}],
  })
  const [isUpload, setIsUpload] = useState({
    status: false,
    id: 0,
    data: [{}],
  })
  const dispatch = useDispatch()

  const columns = [
    { name: 'Icon' },
    { name: 'ID' },
    { name: 'Menu Name' },
    { name: 'Price' },
    { name: 'Status' },
    { name: 'Action' },
  ]

  const handleSearchChange = (e: any): void => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // reset currentPage only when search term changes
    handleGetData() // call handleGetData to fetch data again
  }

  const editOpen = (id: number, data: any[]) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id, data: data }
    })
  }

  const uploadOpen = (id: number, data: any[]) => {
    setIsUpload((prev) => {
      return { ...prev, status: true, id: id, data: data }
    })
  }

  const deleteOpen = async (id: number) => {
    const confirmed = window.confirm(
      `Apakah anda Yakin akan menghapus Menu dengan ID - ${id} ?`
    )
    if (confirmed) {
      try {
        // First, delete related data in resto_menu_photos table
        dispatch(doDeleteRepho(id))

        // Next, delete the data in the resto_menu table
        dispatch(doDelete(id))
      } catch (error) {
        console.error(error)
        // Handle any errors that occur during the delete process
      }
    }
  }

  const handleGetData = () => {
    dispatch(doRequestGetReme(searchTerm, currentPage, limit, sort))
  }

  useEffect(() => {
    handleGetData()
  }, [refresh, currentPage, limit])

  useEffect(() => {
    handleGetData()
  }, [searchTerm])

  useEffect(() => {
    handleGetData()
  }, [sort])

  const totalPages = Math.ceil(restoMenus.length / limit)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  // SORT
  const handleSortChange = (e: any): void => {
    setSort(e.target.value)
    setCurrentPage(1) // reset currentPage only when search term changes
    handleGetData() // call handleGetData to fetch data again
  }
  // SORT

  return (
    <div className='bg-white'>
      <>
        {/* component */}
        <div className='bg-white p-8 rounded-md w-full'>
          <div className=' flex items-center justify-between pb-6'>
            <div>
              <h2 className='text-gray-600 font-semibold'>Resto Menu Tabel</h2>
              <span className='text-xs'>All products item</span>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex bg-gray-50 items-center p-2 rounded-md'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-gray-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
                <input
                  className='bg-gray-50 outline-none ml-1 block '
                  type='text'
                  name=''
                  id=''
                  placeholder='search...'
                  // value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              {/* FILTER HIGH TO LOW AND LOW TO HIGH */}
              {/* component */}
              <div className='lg:ml-40 ml-10 space-x-8'>
                <div className='pt-2 relative mx-auto text-gray-600 flex ml-4'>
                  <select
                    id='categories'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    // value={sort}
                    onChange={handleSortChange}
                  >
                    <option value='' className='text-center'>
                      FILTER
                    </option>
                    <option value='low-to-high'>Price Low To High</option>
                    <option value='high-to-low'>Price High To Low</option>
                  </select>
                </div>
              </div>
              {/* </> */}

              <div className='lg:ml-40 ml-10 space-x-8'>
                {/* <button className='bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'>
                  New Report
                </button> */}
                <button
                  onClick={() => setIsOpen(true)}
                  type='button'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      {((columns && columns) || []).map((col) => (
                        <th
                          key={col.name}
                          className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'
                        >
                          <span className='lg:pl-2'>{col.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {((restoMenus && restoMenus.data) || []).map(
                      (restoMenu: any) => (
                        <>
                          <tr key={restoMenu.reme_id}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <div className='flex items-center'>
                                {restoMenu.resto_menu_photos.map(
                                  (photo: any) => (
                                    <div
                                      className='flex-shrink-0 w-10 h-10'
                                      key={photo.remp_id}
                                    >
                                      <Image
                                        src={photo.remp_url}
                                        alt={photo.remp_photo_filename}
                                        width={500}
                                        height={500}
                                        className='w-full h-full rounded-full'
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <p className='text-gray-900 whitespace-no-wrap'>
                                {restoMenu.reme_id}
                              </p>
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <p className='text-gray-900 whitespace-no-wrap'>
                                {restoMenu.reme_name}
                              </p>
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <p className='text-gray-900 whitespace-no-wrap'>
                                {new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                }).format(
                                  parseInt(
                                    restoMenu.reme_price.replace(/\D/g, '')
                                  )
                                )}
                              </p>
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <span
                                className={`absolute insert-0 ${
                                  restoMenu.reme_status === 'empty'
                                    ? 'relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight'
                                    : 'relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                                }`}
                              >
                                <span
                                  className={`absolute inset-0 ${
                                    restoMenu.reme_status === 'empty'
                                      ? 'bg-red-200'
                                      : 'bg-green-200'
                                  } opacity-50 rounded-full`}
                                />
                                <span className='relative'>
                                  {restoMenu.reme_status}
                                </span>
                              </span>
                            </td>
                            <td className='px-6 py-3 text-sm text-gray-900'>
                              <Menu
                                as='div'
                                className='relative inline-block  text-left'
                              >
                                <div>
                                  <Menu.Button className='inline-flex  w-full justify-center rounded-md bg-none px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                                    <BsThreeDotsVertical
                                      className='ml-2 -mr-1 h-5 w-5 text-blue-900 hover:text-violet-300'
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
                                  <Menu.Items className='absolute  right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
                                    {/* EDIT */}
                                    <div className='px-1 py-1 '>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            className={`${
                                              active
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={() =>
                                              editOpen(
                                                restoMenu.reme_id,
                                                restoMenu
                                              )
                                            }
                                          >
                                            {active ? (
                                              <BsFillPencilFill
                                                className='mr-2 h-5 w-5'
                                                aria-hidden='true'
                                              />
                                            ) : (
                                              <BsFillPencilFill
                                                className='mr-2 h-5 w-5'
                                                aria-hidden='true'
                                              />
                                            )}
                                            Edit
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                    {/* DELETE */}
                                    <div className='px-1 py-1'>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            className={`${
                                              active
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={() =>
                                              deleteOpen(restoMenu.reme_id)
                                            }
                                          >
                                            {active ? (
                                              <BsTrashFill
                                                className='mr-2 h-5 w-5 '
                                                aria-hidden='true'
                                              />
                                            ) : (
                                              <BsTrashFill
                                                className='mr-2 h-5 w-5 '
                                                aria-hidden='true'
                                              />
                                            )}
                                            Delete
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                    {/* UPLOAD PHOTO */}
                                    <div className='px-1 py-1'>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            className={`${
                                              active
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={() =>
                                              uploadOpen(
                                                restoMenu.reme_id,
                                                restoMenu
                                              )
                                            }
                                          >
                                            {active ? (
                                              <BsFillCloudUploadFill
                                                className='mr-2 h-5 w-5 '
                                                aria-hidden='true'
                                              />
                                            ) : (
                                              <BsFillCloudUploadFill
                                                className='mr-2 h-5 w-5 '
                                                aria-hidden='true'
                                              />
                                            )}
                                            Upload Image
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </td>
                          </tr>
                        </>
                      )
                    )}
                  </tbody>
                </table>
                <div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between'>
                  <span className='text-xs xs:text-sm text-gray-900'>
                    Showing Page{' '}
                    <input
                      type='number'
                      value={currentPage}
                      onChange={(event) =>
                        setCurrentPage(event.target.valueAsNumber)
                      }
                      min={1}
                      max={totalPages}
                    />{' '}
                  </span>

                  <div className='inline-flex mt-2 xs:mt-0'>
                    <button
                      className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Prev
                    </button>
                    &nbsp; &nbsp;
                    {currentPage !== totalPages && (
                      <button
                        className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                        hidden={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <ToastContainer autoClose={5000} />
      {isOpen ? (
        <AddRestoMenu isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}
      {isEdit.status ? (
        <EditRestoMenu
          dataResto={isEdit.data}
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null}
      {isUpload.status ? (
        <UploadPhotos
          dataResto={isUpload.data}
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
export default restoMenu
