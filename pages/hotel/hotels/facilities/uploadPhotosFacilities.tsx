import { doAddFacilityPhotos } from '@/redux/hotel/action/actionReducer'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const UploadPhotosFacilities = (props: any) => {
  const dispatch = useDispatch()

  type FormValues = {
    photos: FileList
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  //=============
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([])

  console.log('selectedPhotos', selectedPhotos)

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (files) {
      const selectedPhotosArray: File[] = Array.from(files)
      setSelectedPhotos(selectedPhotosArray)
    }
  }
  //=============

  const handleRegistration = () => {
    const dataForm = new FormData()

    dataForm.append('fapho_faci_id', props.isUpload.faci_id)

    selectedPhotos.map((photo) => {
      dataForm.append('photos', photo)
    })

    // const formData = {
    //   fapho_faci_id: props.isUpload.faci_id,
    //   photos: selectedPhotos,
    // }

    dispatch(doAddFacilityPhotos(dataForm))
    props.closeModal()
  }

  const handleError = (errors: any) => {}

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
                <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-bold leading-6 text-primary'
                  >
                    UPLOADS PHOTOS
                  </Dialog.Title>
                  <hr className='border-b border-t border-black h-1 my-4' />
                  <div className='mt-2'>
                    <form
                      onSubmit={handleSubmit(handleRegistration, handleError)}
                    >
                      <div className='flex items-center justify-center w-full'>
                        <label
                          htmlFor='dropzone-file'
                          className='flex flex-col items-center justify-center w-full h-64 border-2 border-[#2563EB] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                        >
                          {selectedPhotos.length === 0 ? (
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                              <svg
                                aria-hidden='true'
                                className='w-10 h-10 mb-3 text-gray-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                                ></path>
                              </svg>
                              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                <span className='font-semibold'>
                                  Click to upload
                                </span>{' '}
                                or drag and drop
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-400'>
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                          ) : null}
                          <div className='grid-rows-2 p-8'>
                            {selectedPhotos.map((photo, index) => (
                              <img
                                className='w-[7rem] h-[7rem] rounded-lg mx-2 my-2 ml-4 bg-cover inline-block'
                                key={index}
                                src={URL.createObjectURL(photo)}
                                alt={`Selected photo ${index}`}
                              />
                            ))}
                          </div>

                          <input
                            id='dropzone-file'
                            type='file'
                            className='hidden'
                            multiple
                            onChange={handleFileInputChange}
                          />
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

export default UploadPhotosFacilities
