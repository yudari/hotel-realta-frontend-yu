import { doUpdateFintech } from "@/redux/payment/action/fintechActionReducer"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

export default function EditFintech(props:any) {
    type FormValues = {
      fint_code: number
      fint_name: string
    }
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>()
    const dispatch = useDispatch()
    const [data, setData] = useState<any>(props.dataFintech)
    const handleError = (errors: any) => {}
    const handleSave = async (data: FormValues) => {
      try {
        const dataAll = {
            fint_code: data.fint_code,
            fint_name: data.fint_name,
        }
        dispatch(doUpdateFintech(props.isEdit.id, data))
        toast.success(`Successfully Edited  Fintech ${data.fint_name}`)
        props.closeModal()
      } catch (error) {
        console.error(error)
      }
    }
  
    const registerOptions = {
        fint_code: { required: 'Fintech code is required' },
        fint_name: { required: 'Fintech name is required' },
    }

    return (
        <div>
          <Transition appear show={props.isEdit.status} as={Fragment}>
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
                    <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                      <Dialog.Title className='text-lg font-medium leading-6 text-gray-900'>
                        Edit Fintech
                      </Dialog.Title>
                      <div className='mt-4'>
                        <form onSubmit={handleSubmit(handleSave, handleError)}>
                          <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                              Code
                            </label>
                            <input
                              className='shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-100'
                              id='name'
                              type='text'
                              defaultValue={data?.fint_code ?? ''}
                              {...register('fint_code', registerOptions.fint_code)}
                            />
                            {errors?.fint_code && (
                              <p className='text-red-500 text-xs italic'>
                                {errors.fint_code.message}
                              </p>
                            )}
                          </div>
    
                          <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                              Fintech Name
                            </label>
                            <input
                              className='shadow appearance-none border rounded w-full py-3 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-100'
                              id='description'
                              type='text'
                              defaultValue={data?.fint_name ?? ''}
                              {...register(
                                'fint_name',
                                registerOptions.fint_name
                              )}
                            />
                            {errors?.fint_name && (
                              <p className='text-red-500 text-xs italic'>
                                {errors.fint_name.message}
                              </p>
                            )}
                          </div>
    
                          <div className='flex justify-between'>
                            <button
                              type='submit'
                              className='text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                            >
                              Submit
                            </button>
    
                            <button
                              className='text-white bg-danger-secondary hover:bg-danger-secondary-hover focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800'
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