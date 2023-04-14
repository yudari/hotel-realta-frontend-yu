import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { doUpdateFacilitiesSupport } from '@/redux/hotel/action/actionReducer'
import Select from 'react-select'

export default function EditSupport(props: any) {
  let { fasupp, message, refresh } = useSelector(
    (state: any) => state.facilitiesSupportReducers
  ) //===============For Registration==================
  type FormValues = {
    fs_name: string
    fs_description: string
    fs_icon: File
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const dispatch = useDispatch()
  const [data, setData] = useState<any>(props.dataSupport)
  //Gambar
  const [imagePriview, setImagerPriview] = useState<string | null>(null)
  const [support, setSupport] = useState<any>({})
  // console.log(support)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0]
    if (file) {
      const reader: FileReader = new FileReader()
      reader.onload = (): void => {
        setImagerPriview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRegistration = async (data: any) => {
    // console.log(data)
    const formData = {
      fs_name: data.fs_name,
      fs_description: data.fs_description,
      icons: data.fs_icon[0],
    }
    dispatch(doUpdateFacilitiesSupport(props.isEdit.fs_id, formData))
    props.closeModal()
  }
  const handleError = (errors: any) => {}

  const registerOptions = {
    fs_name: { required: 'Name is required' },
    fs_description: { required: 'Name is required' },
  }

  useEffect(() => {
    setSupport(
      fasupp.filter((data: any) => data.fs_id === props.isEdit.fs_id)[0]
    )
  })

  return (
    <div>
      <Transition appear show={props.isEdit.status} as={Fragment}>
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
                    className='text-lg font-medium leading-6 text-primary'
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
                          defaultValue={support?.fs_name ?? ''}
                          {...register('fs_name', registerOptions.fs_name)}
                        />
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                          Facility Name
                        </label>
                      </div>
                      <div className='relative z-0 w-full mb-6 group'>
                        <input
                          type='text'
                          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                          defaultValue={support?.fs_description ?? ''}
                          {...register(
                            'fs_description',
                            registerOptions.fs_description
                          )}
                        />
                        <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                          Description
                        </label>
                      </div>
                      <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                        <label className='font-medium absolute text-sm text-gray-500 peer-focus:left-0 '>
                          Image
                        </label>
                        <br />
                        <input
                          className='justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-sm
                           text-black hover:bg-white '
                          type='file'
                          // defaultValue={support?.fs_icon??''}
                          {...register('fs_icon')}
                          onChange={handleImageChange}
                        />
                      </div>
                      {imagePriview && (
                        <img
                          className='mt-2 ml-8 rounded w-[5rem] h-[5rem]'
                          src={imagePriview}
                          alt='Product Priview'
                        />
                      )}
                      <div className=' flex-row space-x-4 mt-4'>
                        <button className='text-white bg-secondary  hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800'>
                          Submit
                        </button>

                        <button
                          className='text-white bg-danger  hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
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
