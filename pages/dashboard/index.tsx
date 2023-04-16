import Button from '@/components/Button/button'
import Head from 'next/head'
import { FaUser } from 'react-icons/fa'
import { MdDelete, MdEdit } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Hotel Realta - Dashboard</title>
      </Head>

      <div className='w-full mx-auto'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <div className='bg-white shadow-xl rounded-xl p-4'>
            <div className='flex justify-between'>
              <div>
                <p className='mb-0 font-sans text-sm font-semibold leading-normal uppercase'>
                  Example
                </p>
                <h5 className='mb-2 font-bold'>$10000</h5>
                <p className='mb-0'>
                  <span className='text-sm font-bold leading-normal text-emerald-500'>
                    +55%{' '}
                  </span>
                  <span className='text-sm'>since yesterday</span>
                </p>
              </div>

              <div className='px-3 text-right'>
                <div className='flex justify-center items-center w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500 text-white'>
                  <FaUser className='text-xl' />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-xl rounded-xl p-4'>
            <div className='flex justify-between'>
              <div>
                <p className='mb-0 font-sans text-sm font-semibold leading-normal uppercase'>
                  Example
                </p>
                <h5 className='mb-2 font-bold'>$10000</h5>
                <p className='mb-0'>
                  <span className='text-sm font-bold leading-normal text-emerald-500'>
                    +55%{' '}
                  </span>
                  <span className='text-sm'>since yesterday</span>
                </p>
              </div>

              <div className='px-3 text-right'>
                <div className='flex justify-center items-center w-12 h-12 text-center rounded-full bg-gradient-to-tl from-emerald-500 to-teal-400 text-white'>
                  <FaUser className='text-xl' />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-xl rounded-xl p-4'>
            <div className='flex justify-between'>
              <div>
                <p className='mb-0 font-sans text-sm font-semibold leading-normal uppercase'>
                  Example
                </p>
                <h5 className='mb-2 font-bold'>$10000</h5>
                <p className='mb-0'>
                  <span className='text-sm font-bold leading-normal text-emerald-500'>
                    +55%{' '}
                  </span>
                  <span className='text-sm'>since yesterday</span>
                </p>
              </div>

              <div className='px-3 text-right'>
                <div className='flex justify-center items-center w-12 h-12 text-center rounded-full bg-gradient-to-tl from-orange-500 to-yellow-500 text-white'>
                  <FaUser className='text-xl' />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-xl rounded-xl p-4'>
            <div className='flex justify-between'>
              <div>
                <p className='mb-0 font-sans text-sm font-semibold leading-normal uppercase'>
                  Example
                </p>
                <h5 className='mb-2 font-bold'>$10000</h5>
                <p className='mb-0'>
                  <span className='text-sm font-bold leading-normal text-emerald-500'>
                    +55%{' '}
                  </span>
                  <span className='text-sm'>since yesterday</span>
                </p>
              </div>

              <div className='px-3 text-right'>
                <div className='flex justify-center items-center w-12 h-12 text-center rounded-full bg-gradient-to-tl from-red-600 to-orange-600 text-white'>
                  <FaUser className='text-xl' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative overflow-x-auto shadow-md mt-5 rounded-xl bg-white p-4'>
        <div className='pb-4 bg-white flex items-center gap-4 justify-between'>
          <div className='flex items-center gap-4'>
            <div>
              <label htmlFor='table-search' className='sr-only'>
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                </div>
                <input
                  type='text'
                  id='table-search'
                  className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded w-80 bg-gray-50'
                  placeholder='Search for items'
                />
              </div>
            </div>

            <div>
              <label htmlFor='countries' className=' sr-only'>
                Select an option
              </label>
              <select
                id='countries'
                className='block p-2  text-sm text-gray-900 border border-gray-300 rounded bg-gray-50'
              >
                <option selected>Choose a country</option>
                <option value='US'>United States</option>
                <option value='CA'>Canada</option>
                <option value='FR'>France</option>
                <option value='DE'>Germany</option>
              </select>
            </div>
          </div>

          <button className='bg-primary hover:bg-primary-hover transition-colors ease-in duration-100 p-2 rounded text-white flex items-center gap-2 border border-primary'>
            <AiOutlinePlus className='text-xl' />
            Add
          </button>
        </div>

        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Product name
              </th>
              <th scope='col' className='px-6 py-3'>
                Color
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white border-b border-gray-200'>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
              >
                Apple MacBook Pro 17``
              </th>
              <td className='px-6 py-4'>Silver</td>
              <td className='px-6 py-4'>Laptop</td>
              <td className='px-6 py-4'>$2999</td>
              <td className='px-6 py-4 flex gap-2'>
                <button className='border-2 border-primary hover:bg-primary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-primary'>
                  <MdEdit className='text-xl' />
                </button>

                <button className='border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary'>
                  <MdDelete className='text-xl' />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <nav
          className='flex items-center justify-between pt-4'
          aria-label='Table navigation'
        >
          <span className='text-sm font-normal text-gray-500'>
            Showing <span className='font-semibold text-gray-900'>1-10</span> of{' '}
            <span className='font-semibold text-gray-900'>1000</span>
          </span>
          <ul className='inline-flex items-center -space-x-px'>
            <li>
              <a
                href='#'
                className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l hover:bg-gray-100 hover:text-gray-700 '
              >
                <span className='sr-only'>Previous</span>
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              >
                1
              </a>
            </li>
            <li>
              <a
                href='#'
                className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                2
              </a>
            </li>

            <li>
              <a
                href='#'
                className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'
              >
                <span className='sr-only'>Next</span>
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
