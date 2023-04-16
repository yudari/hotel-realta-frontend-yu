import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { MdDelete, MdEdit } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Facilities = () => {
  let { facilities, message, refresh } = useSelector(
    (state: any) => state.facilitiesReducers
  )
  const [faci, setFaci] = useState<any>({})
  console.log('faci', faci)
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState({
    status: false,
    hotel_id: 0,
  })

  const editOpen = (faci_id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, faci_id: faci_id }
    })
  }
  const columns = [
    { name: 'NO' },
    { name: 'Username' },
    { name: 'Modified Date' },
    { name: 'Start End Date' },
    { name: 'Range Price' },
    { name: 'Discount' },
    { name: 'Rate Price' },
    { name: 'Tax' },
  ]
  const router = useRouter().query

  useEffect(() => {
    const filter = facilities.filter((data: any) => {
      if (data.faci_id === Number(router.id)) {
        return data
      }
    })[0]
    setFaci(filter)
  }, [refresh])

  return (
    <div className='relative overflow-x-auto sm:rounded-lg shadow-md mt-5 rounded-xl bg-white p-4 '>
      <div className='pb-4 bg-white flex items-center gap-4 justify-between'>
        <div className='flex items-center gap-4'>
          <div className='min-h-60  aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[10rem] lg:w-[20rem]'>
            <Carousel autoPlay={true} interval={2000} infiniteLoop={true}>
              {faci?.facility_photos?.map((photo: any) => (
                <Fragment key={photo.fapho_id}>
                  <img
                    className='w-full object-fit object-center'
                    src={photo.fapho_url}
                    alt={photo.fapho_url}
                  />
                </Fragment>
              ))}
            </Carousel>
          </div>
          <div className='mb-4 mt-4 ml-10'>
            <span
              className='text-3xl font-bold'
              style={{ whiteSpace: 'nowrap' }}
            >
              {faci.faci_name}
            </span>
            <br />
            <span className='text-sm font-semibold mr-16'>
              {`Room Number :   
              ${faci.faci_room_number && faci.faci_room_number.split('-')[1]}`}
            </span>
            <br />
            <span className='text-sm font-semibold'>
              {faci.faci_description}
            </span>
            <span className='text-xs font-semibold col-span-2'></span>
            <div className='text-xl font-bold text-red-600'>
              {faci.faci_memb_name}
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-4 mt-4 mb-4'>
        <span className='text-base font-bold ml-6'>{`${faci.faci_name} History Price`}</span>
      </div>

      <table className='w-full text-sm text-left text-black'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
          <tr>
            {(columns || []).map((col) => (
              <th
                scope='col'
                className='px-6 py-3'
                key={col.name}
                style={{ whiteSpace: 'nowrap' }}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(faci.facility_price_history || []).map((dt: any, index: number) => (
            <tr className='bg-white border-b border-gray-200' key={dt.faph_id}>
              <td className='px-6 py-4'>{index + 1}</td>
              <td className='px-6 py-4'>{dt.users.user_full_name}</td>
              <td className='px-6 py-4'>
                {new Date(dt.faph_modified_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className='px-6 py-4'>
                {new Date(dt.faph_startdate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
                <br />
                {new Date(dt.faph_enddate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className='px-6 py-4'>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(
                  Math.round(
                    parseFloat(dt.faph_low_price.replace(/[^\d.-]/g, ''))
                  )
                )}
                <br />
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(
                  Math.round(
                    parseFloat(dt.faph_high_price.replace(/[^\d.-]/g, ''))
                  )
                )}
              </td>
              <td className='px-6 py-4'>
                {(dt.faph_discount * 100).toFixed(0)}%
              </td>
              <td className='px-6 py-4'>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(
                  Math.round(
                    parseFloat(dt.faph_rate_price.replace(/[^\d.-]/g, ''))
                  )
                )}
              </td>
              <td className='px-6 py-4'>
                {(dt.faph_tax_rate * 100).toFixed(0)}%
              </td>
            </tr>
          ))}
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
  )
}

export default Facilities
