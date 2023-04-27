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
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      `Are you sure you want to delete this fintech?`
    )
    if (confirmed) {
      dispatch(doDeleteFintech(id))
      toast.success(`
      Successfully Deleted`)
    }
  }

  useEffect(() => {
    dispatch(doGetFintech(searchTerm))
  }, [refresh, searchTerm])


return(
<div className='bg-white'>
    <>
      {/* component */}
      <div className='bg-white p-4 rounded-md w-full'>
        <div className=' flex items-center justify-between pb-6'>
        <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded w-80 bg-gray-50"
                  placeholder="Search for bank"
                  onChange={handleSearchChange}
                />
              </div>
            </div>

          
          
       
            <div className='lg:ml-40 ml-10 space-x-8'>
              <button
                onClick={() => setOpen(true)}
                type='button'
                className='bg-primary hover:bg-primary-hover transition-colors ease-in duration-100 p-2 rounded text-white flex items-center gap-2 border border-primary'
              >
                <AiOutlinePlus className="text-xl" />
                Add
              </button>
            </div>
          
        </div>
        <div>
          
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <tr>
                    {((column && column) || []).map((col) => (
                      <th
                        key={col.name}
                        className='px-6 py-3'
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
                        <tr key={fintechs.fint_code} className="bg-white border-b border-gray-200">
                          <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
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
                                              ? 'bg-primary text-white'
                                              : 'text-primary'
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
                                              ? 'bg-danger-secondary text-white'
                                              : 'text-primary'
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                          onClick={() =>
                                            deleteOpen(fintechs.fint_entity_id)
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
    </>
    <ToastContainer autoClose={5000} />
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
