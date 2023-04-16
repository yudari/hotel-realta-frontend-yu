import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { doAddFacilitySupportHotel } from '@/redux/hotel/action/actionReducer'
import { useRouter } from 'next/router'

export default function AddSupportHotel(props: any) {
  let { fasupp, message, refresh } = useSelector(
    (state: any) => state.facilitiesSupportReducers
  )
  //===============For Registration==================
  type FormValues = {
    fsh_hotel_id: number //id dari hotels
    fsh_fs_id: string //id dari facilities Support
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const dispatch = useDispatch()
  const router = useRouter().query

  const handleRegistration = async (data: any) => {
    const formData = {
      fsh_hotel_id: router.id,
      fsh_fs_id: data.fsh_fs_id,
    }
    // console.log(formData)
    dispatch(doAddFacilitySupportHotel(formData))
    props.closeModal()
  }
  const handleError = (errors: any) => {}

  const registerOptions = {
    fsh_hotel_id: { required: 'Name is required' },
    fsh_fs_id: { required: 'Name is required' },
  }
  // useEffect(() => {
  //   dispatch(doRequestGetFacilitiesSupport())
  // }, [dispatch, refresh])

  return (
    <div>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-20' onClose={props.closeModal}>
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
                    className='text-lg font-semibold leading-6 text-primary'
                  >
                    ADD FACILITY SUPPORT
                  </Dialog.Title>
                  <hr className='border-b border-t border-black h-1 my-4' />
                  <div className='mt-2'>
                    <form
                      onSubmit={handleSubmit(handleRegistration, handleError)}
                    >
                      <div className='flex items-center mb-6 group space-x-4'>
                        <label className='peer-focus:font-medium text-sm text-gray-500 '>
                          Members
                        </label>
                        <select
                          className='w-full px-2 py-2 border rounded-md text-sm focus:outline-none focus:shadow-outline-primary'
                          {...register('fsh_fs_id', registerOptions.fsh_fs_id)}
                        >
                          <option selected>Select Facility Support</option>
                          {fasupp.map((data: any) => (
                            <option value={data.fs_id} key={data.fs_id}>
                              {data.fs_name}
                            </option>
                          ))}
                        </select>
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
