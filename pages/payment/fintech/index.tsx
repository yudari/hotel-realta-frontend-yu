import {
  doDeleteFintech,
  doGetFintech,
} from '@/redux/payment/action/fintechActionReducer'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddFintech from './addFintech'
import { Menu, Transition } from '@headlessui/react'
import {
  BsFillPencilFill,
  BsThreeDotsVertical,
  BsTrashFill,
} from 'react-icons/bs'
import EditFintech from './editFintech'

export default function fintech() {
  let { fintechs, message, refresh } = useSelector(
    (state: any) => state.fintechReducers
  )
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
    data: [{}],
  })

  const column = [
    { name: 'Fintech Code' },
    { name: 'Fintech Name' },
    { name: 'Action' },
  ]
  const editOpen = (id: number, data: any[]) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id, data: data }
    })
  }

  const handleSearchChange = (e: any): void => {
    setSearchTerm(e.target.value)
  }

  const deleteOpen = async (id: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the fintech data with ID ${id} ?`
    )
    if (confirmed) {
      dispatch(doDeleteFintech(id))
    }
  }

  useEffect(() => {
    dispatch(doGetFintech(searchTerm))
  }, [refresh, searchTerm])

  return (
    <div className='bg-white'>
      <>
        {/* component */}
        <div className='bg-white p-8 rounded-md w-full'>
          <div className=' flex items-center justify-between pb-6'>
            <div>
              <h2
                style={{ fontSize: '1.5em' }}
                className='text-gray-600 font-semibold'
              >
                Fintech
              </h2>
            </div>
            <div className='flex items-center justify-between'>
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
                className='bg-gray-50 outline-none ml-1 block rounded-2xl'
                type='text'
                name=''
                id=''
                placeholder='search...'
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <div className='lg:ml-40 ml-10 space-x-8'>
                <button
                  onClick={() => setOpen(true)}
                  type='button'
                  className='order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md
                bg-blue-900 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
          sm:order-1'
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4'>
              <div className='inline-block min-w-full shadow rounded-lg'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      {((column && column) || []).map((col) => (
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
                    {((fintechs && fintechs.data) || []).map(
                      (fintechs: any) => (
                        <>
                          <tr key={fintechs.fint_code}>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <div className='flex items-center'>
                                <div className='flex-shrink-0 w-10 h-10'>
                                  {fintechs.fint_code}
                                </div>
                              </div>
                            </td>
                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                              <p className='text-gray-900 whitespace-no-wrap'>
                                {fintechs.fint_name}
                              </p>
                            </td>

                            <td className='px-6 py-3 text-sm border-b border-gray-200 text-gray-900'>
                              <Menu
                                as='div'
                                className='relative inline-block text-left'
                              >
                                <div>
                                  <Menu.Button className='inline-flex w-full justify-center rounded-md bg-none px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
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
                                  <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10'>
                                    {/* EDIT */}
                                    <div className='px-1 py-1 '>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            className={`${
                                              active
                                                ? 'bg-blue-900 text-white'
                                                : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={() =>
                                              editOpen(
                                                fintechs.fint_entity_id,
                                                fintechs
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
                                                ? 'bg-red-600 text-white'
                                                : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={() =>
                                              deleteOpen(
                                                fintechs.fint_entity_id
                                              )
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
              </div>
            </div>
          </div>
        </div>
      </>
      {/* <ToastContainer autoClose={5000} /> */}
      {isOpen ? (
        <AddFintech isOpen={isOpen} closeModal={() => setOpen(false)} />
      ) : null}
      {isEdit.status ? (
        <EditFintech
          dataFintech={isEdit.data}
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null}
    </div>
  )
}
