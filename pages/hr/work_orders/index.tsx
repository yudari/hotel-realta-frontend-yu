import Button from "@/components/Button/button";
import { doDeleteWorkOrders, doGetWorkOrders } from "@/redux/human_resources/action/workordersActionReducer";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CreateWorkOrders from "./createWorkOrders";
import UpdateWorkOrders from "./updateWorkOrders";
import Link from "next/link";

export default function Workorders(props: any) {
  const { workorders, refresh } = useSelector((state: any) => state.workOrdersReducers);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [isEdit, setIsEdit] = useState({
    status: false,
    woro_id: 0,
  });

  const editOpen = (woro_id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, woro_id: woro_id };
    });
  };

  const deleteOpen = async (woro_id: number) => {
    dispatch(doDeleteWorkOrders(woro_id));
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = workorders ? Math.ceil(workorders.data / itemsPerPage) : 0;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const columns = [{ name: "Work Order Date" }, { name: "Status" }, { name: "Created By" }];

  const handleFromDateChange = (e: any) => {
    setFrom(e.target.value);
  };

  const handleToDateChange = (e: any) => {
    setTo(e.target.value);
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    dispatch(doGetWorkOrders({ page: page, limit: limit, from: from, to: to, status: status }));
  }, [dispatch, page, limit, from, to, status, refresh]);

  return (
    <div>
      <div className="relative overflow-hidden">
        <div>
          {/* batas atas search From */}
          <div>
            <form className="flex items-center">
              <div className="relative w-80"></div>
              <label htmlFor="start-date" className="sr-only">
                Start Date
              </label>
              <div className="relative w-80">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Start Date"
                  required
                  onChange={handleFromDateChange}
                />
              </div>
              {/* batas bawah search From */}

              {/* batas atas search To */}
              <label htmlFor="end-date" className="sr-only">
                End Date
              </label>
              <div className="relative w-80 ml-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="date"
                  id="end-date"
                  name="end-date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="End Date"
                  required
                  onChange={handleToDateChange}
                />
              </div>
              {/* batas bawah search To */}

              {/* batas atas search Status */}
              <label htmlFor="status" className="sr-only">
                Status
              </label>
              <div className="relative w-44 ml-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <select id="status" name="status" className="block w-full py-2.5 px-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="">ALL STATUS</option>
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </form>
          </div>

          {/* batas atas tampilan tabel */}
          <div className="relative overflow-y-auto max-h-[600px] shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {(columns || []).map((col) => (
                    <td key={col.name} className="px-6 py-3">
                      <span className="lg:pl-1 font-bold">{col.name}</span>
                    </td>
                  ))}
                  <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                    <Button onClick={() => setIsOpen(true)} variant="variant" label="Add" size="small" type="secondary" className="ml-0" />
                  </td>
                </tr>
              </thead>
              <tbody>
                {(workorders && workorders.data ? workorders.data : []).map((dt: any, index: number) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={dt.woro_id}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {new Date(dt.woro_start_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.woro_id}</td> */}
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.woro_status}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.user && dt.user.user_full_name}</td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <div className="w-full text-right">
                        <Menu as="div" className="relative inline-block text-left z">
                          <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                              <BiDotsVerticalRounded className="h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="px-1 py-1 ">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={() => editOpen(dt.woro_id)}>
                                      Edit
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={() => deleteOpen(dt.woro_id)}>
                                      Remove
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link href={`/hr/work_orders/order_detail/${dt.woro_id}`}>
                                      <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Order Detail</button>
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isOpen ? <CreateWorkOrders isOpen={isOpen} closeModal={() => setIsOpen(false)} /> : null}

            {isEdit.status ? (
              <UpdateWorkOrders
                isEdit={isEdit}
                closeModal={() =>
                  setIsEdit((prev) => {
                    return { ...prev, status: false };
                  })
                }
              />
            ) : null}
          </div>
          {/* batas bawah tampilan tabel */}

          {/* batas atas pagination */}
          <div className="flex justify-between mt-4">
            <div className="flex">
              <button onClick={handlePreviousPage} disabled={currentPage === 1} className="p-2.5 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none">
                Previous
              </button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2.5 ml-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none">
                Next
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          {/* batas atas pagination */}
        </div>
      </div>
    </div>
  );
}
