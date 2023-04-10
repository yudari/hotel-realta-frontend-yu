/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react'
import {
  BsFillPencilFill,
  BsThreeDotsVertical,
  BsTrashFill,
  BsFillCloudUploadFill,
  BsFillCheckCircleFill,
} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { doRequestGetOrme } from '../../../redux/restoSchema/action/actionOrme'
import 'react-toastify/dist/ReactToastify.css'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineSend } from 'react-icons/ai'

const orderMenu = () => {
  // REDUCER
  const { orderMenus = [], refresh } = useSelector(
    (state: any) => state.ormeReducers
  )
  // REDUCER

  // render logic ...
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(doRequestGetOrme())
  }, [refresh])

  return (
    <div className='bg-white'>
      <>
        <>
          {/* Component Start */}
          <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg'>
            <div className='lg:col-span-2'>
              {/* <h2 className='text-sm font-medium'>Payment Method</h2> */}
              <div className='bg-white rounded mt-4 shadow-lg'>
                <div className='flex items-center px-8 py-5 bg-slate-200'>
                  {/* <input
                    className='appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100'
                    type='radio'
                  /> */}
                  <label className='text-sm font-medium ml-4'>
                    1. Enter Your Detail
                  </label>
                </div>
                <div className='border-t'>
                  <div className='flex items-center px-8 py-5'>
                    {/* <input
                      className='appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 bg-blue-600'
                      type='radio'
                    /> */}
                    <label className='text-sm font-medium ml-4'>
                      We will use these details to share your booking
                      information
                    </label>
                  </div>
                  <div className='grid grid-cols-2 gap-4 px-8 pb-8'>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Fullname
                      </label>
                      <input
                        className='flex items-center h-10 border mt-1 rounded px-4 w-full text-sm'
                        type='text'
                        placeholder='Enter Your Name'
                      />
                    </div>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Email
                      </label>
                      <input
                        className='flex items-center h-10 border mt-1 rounded px-4 w-full text-sm'
                        type='text'
                        placeholder='Enter your email'
                      />
                    </div>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Mobile Number
                      </label>
                      <div className='flex'>
                        <select
                          className='block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-2'
                          id='grid-state'
                        >
                          <option value={+62}>+62</option>
                        </select>
                        <input
                          className='flex items-center h-10 border mt-1 rounded px-4 w-full text-sm'
                          type='text'
                          placeholder='Enter your number'
                        />
                      </div>
                    </div>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Send Passcode
                      </label>
                      <button className='flex items-center justify-center h-10 px-4 mt-1 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>
                        <AiOutlineSend />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CARD CHECKOUT */}
            <div>
              <h2 className='text-sm font-medium'>Checkout Card</h2>
              <div className='bg-white rounded mt-4 shadow-lg py-6'>
                <div className='px-8'>
                  <div className='flex items-end'>
                    <p>Bubur Ayam</p>
                    <span className='text-sm ml-auto font-semibold'>$20</span>
                  </div>
                </div>
                <div className='px-8 mt-4'>
                  <div className='flex items-end justify-between'>
                    <span className='text-sm font-semibold'>Tax</span>
                    <span className='text-sm text-gray-500 mb-px'>10%</span>
                  </div>
                </div>
                <div className='px-8 mt-4 border-t pt-4'>
                  <div className='flex items-end justify-between'>
                    <span className='font-semibold'>Total</span>
                    <span className='font-semibold'>$22</span>
                  </div>
                </div>
                <div className='flex items-center px-8 mt-8'></div>
                <div className='flex flex-col px-8 pt-4'>
                  <button className='flex items-center justify-center bg-gray-200 text-sm font-medium w-full h-10 rounded text-gray-700 hover:bg-gray-300'>
                    Get Coupons
                  </button>
                  <button className='flex items-center justify-center bg-blue-600 text-sm font-medium w-full h-10 rounded text-blue-50 hover:bg-blue-700 mt-2'>
                    Complete Your Request
                  </button>
                </div>
              </div>
            </div>
            {/* CARD CHECKOUT */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded mt-4 shadow-lg'>
                <div className='flex items-center px-8 py-5 bg-slate-200'>
                  <label className='text-sm font-medium ml-4'>3. Payment</label>
                </div>
                <div className='border-t'>
                  <div className='flex items-center px-8 py-5'>
                    <label className='text-sm font-medium ml-4'>
                      We will use these details to share your booking
                      information
                    </label>
                  </div>
                  <div className='grid grid-cols-2 gap-4 px-8 pb-8'>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Pay Type
                      </label>
                      <select
                        className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='grid-state'
                      >
                        <option>Cash</option>
                        <option>Debit</option>
                        <option>Goto</option>
                      </select>
                    </div>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Account Number
                      </label>
                      <input
                        className='flex items-center h-10 border mt-1 rounded px-4 w-full text-sm'
                        type='text'
                        placeholder='Enter your number'
                      />
                    </div>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Pay Type
                      </label>
                      <select
                        className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                        id='grid-state'
                      >
                        <option>Cash</option>
                        <option>Debit</option>
                        <option>Goto</option>
                      </select>
                    </div>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Account Number Realta
                      </label>
                      <input
                        className='flex items-center h-10 border mt-1 rounded px-4 w-full text-sm'
                        type='text'
                        placeholder='Enter your number'
                      />
                    </div>
                    <div className=''>
                      <label
                        className='text-xs font-semibold'
                        htmlFor='cardNumber'
                      >
                        Validate
                      </label>
                      <button className='flex items-center justify-center h-10 px-4 mt-1 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>
                        <BsFillCheckCircleFill />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CARD CHECKOUT */}
            {/* CARD CHECKOUT */}
          </div>
          {/* Component End  */}
        </>
      </>
    </div>
  )
}
export default orderMenu
