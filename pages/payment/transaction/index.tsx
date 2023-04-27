import { doGetPayTrans } from "@/redux/payment/action/payTransActionReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";



export default function paymentTransaction(){
  const loginData: any = localStorage.getItem("loginData")
  const objLoginData = JSON.parse(loginData)
  const user_id = objLoginData.user_id
    let{ payTrans, message, refresh } = useSelector((state:any) => state.paymentTransactionReducers);
    
  console.log("data tidak",payTrans)
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [type, settype] = useState('')
  
    const [isOpen, setOpen] =useState(false)
    const column = [
        {name: 'Transaction Number'},
        {name: 'Transaction Date'},
        {name: 'Debet'},
        {name: 'Type'},
        {name: 'Credit'},
        {name: 'Source'},
        {name: 'Order Number'},
        {name: 'Target'},
        {name: 'Transaction Ref'},
        {name: 'Note'},
        {name: 'Username'},
    ]

    
  const handleGetData = (searchTerm?:any, currentPage?:any, limit?:any, type?:any, id?:any) => {
    dispatch(doGetPayTrans(searchTerm, currentPage, limit, type, id))
  }

  const handleSearchChange = (e: any): void => {
    const data = e.target.value;
    
    const slice = data.match(/(.*)#/)?.[1]
    switch (slice) {
      case "TRX":
        const transactionCode = data.replace("TRX#", "")
        setSearchTerm(transactionCode)
        break
      case "trx":
        const transaction = data.replace("trx#", "")
        setSearchTerm(transaction)
        break
      default:
        break
}
  
    setCurrentPage(1) // reset currentPage only when search term changes
    handleGetData(searchTerm, currentPage, limit, type,user_id) // call handleGetData to fetch data again
  }
  const totalData = payTrans ? payTrans : 0

  let totalPages = Math.ceil(payTrans / limit)


  useEffect(() => {
    handleGetData(searchTerm, currentPage, limit, type,user_id)
  }, [dispatch,refresh, searchTerm, currentPage, limit, type,user_id, totalPages])

  // Calculate total pages
 
  // Pagination function
  const handlePageChange = (type: string) => {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      handleGetData() // call handleGetData to fetch data again
    } else if (type === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
      handleGetData() // call handleGetData to fetch data again
    }
  }

  // Create array of pages to display in pagination buttons
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }


return (
  <div className='bg-white'>
    <>
      {/* component */}
      <div className='bg-white p-8 rounded-md w-full'>
        <div className=' flex items-center justify-between pb-6'>
          <div>
            <h1 style={{ fontSize: "1.5em" }} className='text-gray-600 font-semibold'>History Payment</h1>
          </div>
          <div className='flex items-center justify-between'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
              <input
                className='bg-gray-50 outline-none ml-1 block rounded-2xl'
                type='text'
                name=''
                id=''
                placeholder='search...'
                value={searchTerm}
                onChange={handleSearchChange}
              />
          </div>
        </div>
        <div>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    {((column && column) || []).map((col) => (
                      <th
                        key={col.name}
                        className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'
                      >
                        <span className='lg:pl-2'>{col.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {((payTrans && payTrans.data) || []).map(
                    (payTrans: any) => (
                      <>
                        <tr key={payTrans.patr_trx_number}>
                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.patr_trx_number}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                            {moment(payTrans.patr_modified_date).format("dddd, MMMM Do YYYY, h:mm a")}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.patr_debet}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.patr_type}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.patr_credit}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.patr_source_id}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.order_number}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.patr_target_id}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.patr_trx_number_ref}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.patr_note}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {payTrans.user_full_name}
                            </p>
                          </td>
                         
                       
                        </tr>
                      </>
                    )
                  )}
                </tbody>
              </table>
              <div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between'>
                <span className='text-xs xs:text-sm text-gray-900'>
                  Showing Page {currentPage}
                </span>

                <div className='inline-flex mt-2 xs:mt-0'>
                  <button
                    className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-blue-900 font-semibold py-2 px-4 rounded-l'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-blue-900 font-semibold py-2 px-4 rounded-r'
                    disabled={currentPage * limit >= payTrans}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  </div>
)

}


