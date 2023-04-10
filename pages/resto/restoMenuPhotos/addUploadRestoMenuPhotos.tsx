import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Switch, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  doRequestGetReme,
  doUpdate,
} from '../../../redux/restoSchema/action/actionReme'
import {
  doAddRepho,
  doUpdateRepho,
} from '@/redux/restoSchema/action/actionRepho'
import { FaTrash } from 'react-icons/fa'
// import { Switch } from '@headlessui/react'

export default function UploadPhotos(props: any) {
  type FormValues = {
    remp_photo_filename: string
    remp_primary: string
    remp_reme_id: number
    reme_id: string
    reme_name: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    dataRepho: props.dataRepho,
    dataResto: props.dataResto,
  })

  // * Toggle
  const [status, setStatus] = useState(false)

  const handleError = (errors: any) => {}

  // Baru
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  // const handleImageChange = (selectedFiles: File[]) => {
  //   setSelectedFiles((prevSelectedFiles) => [
  //     ...prevSelectedFiles,
  //     ...selectedFiles,
  //   ])
  // }
  // Baru

  const handleSave = async (data: FormValues) => {
    const formData = new FormData()

    formData.append('remp_reme_id', data.remp_reme_id.toString())
    formData.append('remp_primary', data.remp_primary)

    if (data.remp_photo_filename && data.remp_photo_filename.length > 0) {
      for (let i = 0; i < data.remp_photo_filename.length; i++) {
        formData.append('remp_photo_filename', data.remp_photo_filename[i])
      }
    }

    dispatch(doAddRepho(formData))
    props.closeModal()
  }

  // !

  // GAMBAR PREVIEW BARU

  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const filesArray = Array.from(e.target.files)
    setSelectedImages((prevImages) => [...prevImages, ...filesArray])
    // ... continue with existing code to set image preview
  }

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages]
      newImages.splice(index, 1)
      return newImages
    })
  }

  const registerOptions = {
    remp_photo_filename: { required: 'Name is required' },
  }

  console.log(props.dataResto)
  return (
    <div>
      <Transition appear show={props.isUpload.status} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={props.closeModal}>
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
                <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title className='text-lg font-medium leading-6 text-gray-900'>
                    Upload Image
                  </Dialog.Title>
                  <div className='mt-4'>
                    <form onSubmit={handleSubmit(handleSave, handleError)}>
                      <div className='mb-4'>
                        {/* jadul */}
                        <label className='block text-gray-700 font-bold mb-2 text-center'>
                          ID : {data.dataResto.reme_id}
                        </label>
                        <input
                          className='shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  text-center read-only: hidden'
                          id='name'
                          type='text'
                          value={data.dataResto.reme_id}
                          {...register('remp_reme_id')}
                        />
                        {errors?.remp_reme_id && (
                          <p className='text-red-500 text-xs italic'>
                            {errors.remp_reme_id.message}
                          </p>
                        )}
                        {/* jadul */}
                      </div>

                      <div className='mb-4'>
                        {/* <label className='block text-gray-700 font-bold mb-2'>
                          Primary
                        </label> */}
                        {/* jadul */}
                        {/* <input
                          className='shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  text-center'
                          id='name'
                          type='text'
                          defaultValue={data?.dataRepho?.remp_primary ?? ''}
                          {...register('remp_primary')}
                        />
                        {errors?.remp_primary && (
                          <p className='text-red-500 text-xs italic'>
                            {errors.remp_primary.message}
                          </p>
                        )} */}
                        {/* jadul */}
                        <div className='relative z-0 w-full mb-6 group'>
                          <input
                            type='text'
                            id='name'
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            defaultValue={data?.dataRepho?.remp_primary ?? ''}
                            {...register('remp_primary')}
                          />
                          {errors?.remp_primary && (
                            <p className='text-red-500 text-xs italic'>
                              {errors.remp_primary.message}
                            </p>
                          )}
                          <label
                            htmlFor='name'
                            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Primary
                          </label>
                        </div>
                      </div>

                      <div className='mb-4'>
                        <input
                          className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                          placeholder=' '
                          id='reme_name'
                          disabled
                          type='text'
                          defaultValue={data.dataResto.reme_name}
                        />
                      </div>

                      <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2'>
                          Gambar
                        </label>
                        <div className='rounded-md border border-gray-100 bg-white p-4 shadow-md'>
                          <label
                            htmlFor='upload'
                            className='flex flex-col items-center gap-2 cursor-pointer'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-10 w-10 fill-white stroke-indigo-500'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                              />
                            </svg>
                            <span className='text-gray-600 font-medium'>
                              Upload file
                            </span>
                          </label>
                          <input
                            className='shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                            id='image'
                            type='file'
                            multiple
                            {...register('remp_photo_filename')}
                            onChange={handleImageChange}
                          />
                        </div>

                        {errors?.remp_photo_filename && (
                          <p className='text-red-500 text-xs italic'>
                            {errors.remp_photo_filename.message}
                          </p>
                        )}
                        <div className='flex flex-wrap'>
                          {selectedImages.map((image, index) => (
                            <div
                              key={index}
                              className='relative block mr-2.5 mb-2.5'
                            >
                              <button
                                className='absolute top-0 right-0 text-red-500 hover:text-red-700'
                                onClick={() => handleRemoveImage(index)}
                              >
                                <FaTrash className='w-6 h-6' />
                              </button>
                              <img
                                className='mt-2 rounded'
                                src={URL.createObjectURL(image)}
                                alt='Product Preview'
                                width='100'
                                height='100'
                              />
                              <div className='text-sm text-gray-700'>
                                {image.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className='flex justify-between'>
                        <button
                          type='submit'
                          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                        >
                          Submit
                        </button>

                        <button
                          className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800'
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
