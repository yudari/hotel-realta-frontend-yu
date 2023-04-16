import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  doAddHotels,
  doRequestGetCity,
} from '@/redux/hotel/action/actionReducer'
import Select from 'react-select'
import { toast } from 'react-toastify'

export default function AddHotels(props: any) {
  //================Data Redux Saga================
  let { cityHotel, message, refresh } = useSelector(
    (state: any) => state.cityHotelReducers
  )

  //=====================City Var===================
  const [options, setOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState('')
  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOptions(selectedOptions)
  }

  //======================Status Var=================
  const [selectedStatus, setSelectedStatus] = useState('Active')
  // console.log(selectedStatus)
  function handleSatusChange(e: any) {
    setSelectedStatus(e.target.value)
  }

  //===============For Registration==================
  type FormValues = {
    hotel_name: string
    hotel_phonenumber: string
    hotel_status: any
    city_name: any
    addr_line1: string
    addr_line2: string
    hotel_description: string
  }
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const dispatch = useDispatch()

  const handleRegistration = async (data: any) => {
    const formData = {
      hotel_name: data.hotel_name,
      hotel_phonenumber: data.hotel_phonenumber,
      addr_line1: data.addr_line1,
      addr_line2: data.addr_line2,
      hotel_description: data.hotel_description,
      hotel_status: selectedStatus,
      city_name: data.city_name.value,
    }
    dispatch(doAddHotels(formData))
    props.closeModal()
    toast.success(`Berhasil Menambahkan Data ${data.hotel_name}`)
  }
  const handleError = (errors: any) => {}

  const registerOptions = {
    hotel_name: { required: 'Name is required' },
    hotel_phonenumber: { required: 'Name is required' },
    hotel_status: { required: 'Name is required' },
    city_name: { required: 'Name is required' },
    addr_line1: { required: 'Name is required' },
    addr_line2: { required: 'Name is required' },
    hotel_description: { required: 'Name is required' },
  }

  useEffect(() => {
    dispatch(doRequestGetCity())
    const dataOptions = (cityHotel || []).map((data: any) => ({
      value: data.city_name,
      label: `${data.city_name}, ${data.provinces.prov_name} | ${data.provinces.country.country_name}`,
    }))
    setOptions(dataOptions)
  }, [dispatch, refresh])

  return (
    <div>
      <Transition appear show={props.isOpen} as={Fragment}>
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
                    ADD HOTELS
                  </Dialog.Title>
                  <hr className='border-b border-t border-black h-1 my-4' />
                  <div className='mt-2'>
                    <form
                      onSubmit={handleSubmit(handleRegistration, handleError)}
                    >
                      <div className='relative z-0 w-full mb-6 group'>
                        <input
                          type='text'
                          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                          {...register(
                            'hotel_name',
                            registerOptions.hotel_name
                          )}
                        />
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                          Hotel Name
                        </label>
                      </div>
                      <div className='relative z-0 w-full mb-4 group'>
                        <input
                          type='text'
                          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                          {...register(
                            'hotel_phonenumber',
                            registerOptions.hotel_phonenumber
                          )}
                        />
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                          Phone Number
                        </label>
                      </div>
                      <div className='items-center mb-4 group'>
                        <label className='peer-focus:font-medium text-xs text-gray-500'>
                          Status
                        </label>
                        <select
                          value={selectedStatus}
                          onChange={handleSatusChange}
                          className='w-full px-2 py-2 mt-2 border rounded-md text-sm focus:outline-none focus:shadow-outline-primary'
                        >
                          <option value='Active'>Active</option>
                          <option value='Disactive'>Disactive</option>
                        </select>
                      </div>

                      <div className='items-center mb-6 group'>
                        <label className='peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400'>
                          City
                        </label>
                        <div className='w-full text-sm mt-2'>
                          <Controller
                            name='city_name'
                            control={control}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <Select
                                options={options}
                                onChange={(selectedOptions) =>
                                  onChange(selectedOptions)
                                }
                                value={value}
                                onBlur={onBlur}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className='grid md:grid-cols-2 md:gap-6 '>
                        <div className='relative w-full mb-6 group'>
                          <input
                            type='text'
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer -z-10'
                            {...register(
                              'addr_line1',
                              registerOptions.addr_line1
                            )}
                          />
                          <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                            Address (Street)
                          </label>
                        </div>
                        <div className='relative w-full mb-6 group'>
                          <input
                            type='text'
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            {...register(
                              'addr_line2',
                              registerOptions.addr_line2
                            )}
                          />
                          <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                            Address (sub-district)
                          </label>
                        </div>
                      </div>
                      <div className='relative w-full mb-6 group'>
                        <input
                          type='text'
                          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                          {...register(
                            'hotel_description',
                            registerOptions.hotel_description
                          )}
                        />
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                          Description
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
