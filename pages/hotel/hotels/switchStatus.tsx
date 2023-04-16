import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { doAddHotels } from '@/redux/hotel/action/actionReducer'
import { doSwitchHotels } from '@/redux/hotel/action/actionReducer'

export default function SwitchStatus(props: any) {
  let { hotels, message, refresh } = useSelector(
    (state: any) => state.hotelsReducers
  )
  const dispatch = useDispatch()

  //======================Status Var=================
  const [hotel, setHotels] = useState<any>([])
  // const status = hotel.hotel_status
  const [selectedStatus, setSelectedStatus] = useState(hotel.hotel_status)

  // console.log(status)
  console.log(selectedStatus)

  //===Switch===
  const handleSwitch = async (data: any) => {
    console.log(data)
    const formData = {
      hotel_status: selectedStatus,
      hotel_reason: data.hotel_reason,
    }
    dispatch(doSwitchHotels(props.isSwitch.hotel_id, formData))
    props.closeModal()
  }

  //===Registration===
  type FormValues = {
    hotel_status: string
    hotel_reason: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const handleError = (errors: any) => {}

  useEffect(() => {
    setSelectedStatus(hotel.hotel_status)
  }, [hotel.hotel_status])

  useEffect(() => {
    setHotels(
      hotels.data.filter(
        (hotel: any) => hotel.hotel_id === props.isSwitch.hotel_id
      )[0]
    )
  }, [refresh])

  return (
    <div>
      <Transition appear show={true} as={Fragment}>
        <Dialog as='div' className='relative z-40' onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-bold leading-6 text-primary'
                  >
                    Switch Status
                  </Dialog.Title>
                  <hr className='border-b border-t border-black h-1 my-4' />
                  <div className='mt-2'>
                    <form onSubmit={handleSubmit(handleSwitch, handleError)}>
                      <div className='flex items-center mb-6 group space-x-4'>
                        <label className='peer-focus:font-medium text-sm text-gray-500 '>
                          Status
                        </label>
                        <select
                          value={selectedStatus}
                          onChange={(event) =>
                            setSelectedStatus(event.target.value)
                          }
                          className='w-full px-2 py-2 border rounded-md text-sm focus:outline-none focus:shadow-outline-primary'
                        >
                          <option value='Active'>Active</option>
                          <option value='Disactive'>Disactive</option>
                        </select>
                      </div>
                      <div className='relative z-0 w-full mb-6 group'>
                        <input
                          type='text'
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer `}
                          defaultValue={
                            selectedStatus === 'Active'
                              ? null
                              : hotel?.hotel_reason ?? ''
                          }
                          style={{
                            display:
                              selectedStatus === 'Active' ? 'none' : 'block',
                          }}
                          {...register('hotel_reason')}
                        />

                        <label
                          className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          style={{
                            display:
                              selectedStatus === 'Active' ? 'none' : 'block',
                          }}
                        >
                          Reason
                        </label>
                      </div>
                      <div className=' flex-row space-x-6 mt-4'>
                        <button className='text-[#2563EB] border-2 border-[#2563EB] hover:text-white hover:bg-[#2563EB] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                          Submit
                        </button>
                        <button
                          className='text-[#D51A52] border-2 border-[#D51A52] hover:text-white hover:bg-[#D51A52] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                          onClick={props.closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
