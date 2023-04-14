import { doAddProdVendor, doDeleteVendor, doGetVendor, doGetVendorResponse } from "@/redux/purchasing/action/vendorActionReducer";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPencilFill, BsThreeDotsVertical, BsTrashFill, BsFillCloudUploadFill } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { doGetStock } from "@/redux/purchasing/action/stockActionReducer";
import { doGetProdVendor } from "@/redux/purchasing/action/prodVendorActionReducer";
import { useRouter } from "next/router";
// import { toast, ToastContainer } from 'react-toastify';

export default function AddProdVendor() {
  const router = useRouter();
  const vendorEntityId = router.query.vendor_entity_id;
  const vendorName = router.query.vendor_name;

  const { vendorProd = [], refresh } = useSelector((state: any) => state.vendorReducers);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();
  const [selectedVendorEntityId, setSelectedEntityId] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
    data: [{}],
  });

  const columns = [{ name: "Stock" }, { name: "Qty Stocked" }, { name: "Qty" }, { name: "Qty Remaining" }, { name: "Price" }];

  const editOpen = (id: number, data: any[]) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id, data: data };
    });
  };

  const deleteOpen = async (id: number) => {
    const confirmed = window.window.confirm(`Hapus data id ${id} ?`);
    if (confirmed) {
      dispatch(doAddProdVendor(id));
    }
  };

  useEffect(() => {
    dispatch(doAddProdVendor(vendorEntityId));
  }, [refresh, currentPage, limit]);
  console.log("entityid:", vendorEntityId);

  // Calculate Total Pages
  const totalData = vendorProd ? vendorProd.length : 0;

  const totalPages = Math.ceil(vendorProd.length / limit);

  // Fungsi Pagination
  //   const handlePageChange = (type: string) => {
  //     if (type === "prev" && page > 1) {
  //       setPage((prev) => prev - 1);
  //       handleGetData();
  //     } else if (type === "next" && page < totalPages) {
  //       setPage((prev) => prev + 1);
  //       handleGetData();
  //     }
  //   };

  // Untuk buat array ke display pagination button
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  console.log("stockkks:", vendorProd);

  return (
    <div className="bg-white">
      <>
        {/* component */}
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">Data Product Vendor</h2>
              <span className="text-xs">{vendorName}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex bg-gray-50 items-center p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                {/* <input
                  className="bg-gray-50 outline-none ml-1 block "
                  type="text"
                  name=""
                  id=""
                  placeholder="search..."
                  // value={searchTerm}
                  onChange={handleSearchChange}
                /> */}
              </div>
              <div className="lg:ml-40 ml-10 space-x-8">
                {/* <button className='bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer'>
                  New Report
                </button> */}
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md
            bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
            sm:order-1">
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      {((columns && columns) || []).map((col) => (
                        <th key={col.name} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <span className="lg:pl-2">{col.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(vendorProd || []).map((prodData: any) => (
                      <>
                        <tr key={prodData.stock_id}>
                          {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img src="https://media.istockphoto.com/id/1258873084/id/vektor/logo-abstrak-kafe-atau-restoran-sendok-dan-garpu-di-piring-desain-logo-makanan-ilustrasi.jpg?s=612x612&w=0&k=20&c=v3MkYEDgB09kn_NAJbekqA2M3zQ9SDjpqo6IbLeDwF0=" alt="waw" width={1000} height={1000} className="w-full h-full rounded-full" />
                              </div>
                            </div>
                          </td> */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{prodData.vepro_stock_id}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{prodData.vepro_qty_stocked}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{prodData.vepro_qty_remaining}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{prodData.vepro_price}</p>
                          </td>
                          {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(parseInt(restoMenu.reme_price.replace(/\D/g, "")))}
                            </p>
                          </td> */}
                          {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className={`absolute insert-0 ${restoMenu.reme_status === "empty" ? "relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight" : "relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"}`}>
                              <span className={`absolute inset-0 ${restoMenu.reme_status === "empty" ? "bg-red-200" : "bg-green-200"} opacity-50 rounded-full`} />
                              <span className="relative">{restoMenu.reme_status}</span>
                            </span>
                          </td> */}
                          <td className="px-6 py-3 text-sm text-gray-900">
                            <Menu as="div" className="relative inline-block text-left">
                              <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-none px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <BsThreeDotsVertical className="ml-2 -mr-1 h-5 w-5 text-blue-900 hover:text-violet-300" aria-hidden="true" />
                                </Menu.Button>
                              </div>
                              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                  {/* EDIT */}
                                  <div className="px-1 py-1 ">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={() => editOpen(prodData.stock_id, prodData)}>
                                          {active ? <BsFillPencilFill className="mr-2 h-5 w-5" aria-hidden="true" /> : <BsFillPencilFill className="mr-2 h-5 w-5" aria-hidden="true" />}
                                          Edit
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                  {/* DELETE */}
                                  <div className="px-1 py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={() => deleteOpen(prodData.stock_id)}>
                                          {active ? <BsTrashFill className="mr-2 h-5 w-5 " aria-hidden="true" /> : <BsTrashFill className="mr-2 h-5 w-5 " aria-hidden="true" />}
                                          Delete
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                  {/* UPLOAD PHOTO */}
                                  <div className="px-1 py-1">
                                    {/* <Menu.Item>
                                      {({ active }) => (
                                        <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={() => deleteOpen(vendorData.reme_id)}>
                                          {active ? <BsFillCloudUploadFill className="mr-2 h-5 w-5 " aria-hidden="true" /> : <BsFillCloudUploadFill className="mr-2 h-5 w-5 " aria-hidden="true" />}
                                          Upload Image
                                        </button>
                                      )}
                                    </Menu.Item> */}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <span className="text-xs xs:text-sm text-gray-900">Showing Page {currentPage}</span>

                  <div className="inline-flex mt-2 xs:mt-0">
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                      Prev
                    </button>
                    &nbsp; &nbsp;
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r" onClick={() => setCurrentPage(currentPage + 1)} disabled={vendorProd.length === 0}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* <ToastContainer autoClose={5000} />
      {isOpen ? (
        <AddRestoMenu isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}
      {isEdit.status ? (
        <EditRestoMenu
          dataResto={isEdit.data}
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false }
            })
          }
        />
      ) : null} */}
    </div>
  );
}
