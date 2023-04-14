import { doDeleteEmployee, doGetEmployee } from "@/redux/human_resources/action/employeeActionReducer";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/button";
import { Menu, Transition } from "@headlessui/react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Link from "next/link";

export default function Employee() {
  let { employees, refresh } = useSelector((state: any) => state.empReducers);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
    isShow: false,
  });

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const columns = [{ name: "Employee Id" }, { name: "National Id" }, { name: "Full Name" }, { name: "Birth Date" }, { name: "Hire Date" }, { name: "Status" }];

  const updateOpen = (id: number) => {
    setIsEdit((prev: any) => {
      return { ...prev, status: true, id: id };
    });
  };

  const deleteOpen = async (id: number) => {
    dispatch(doDeleteEmployee(id))
  }

  useEffect(() => {
    dispatch(doGetEmployee(page, limit)); // tambahkan parameter untuk page dan limit
  }, [dispatch, page, limit, refresh]); // tambahkan page, limit
  return (
    <div className="relative overflow-hidden">
      <form className="flex items-center">
      <div className="relative w-10"></div>
        {/* batas atas search name */}
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Employee Name"
            required
          />
        </div>
        {/* batas bawah search name */}

        {/* batas atas search status */}
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
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
        {/* batas bawah search status */}
      </form>
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
                <Button variant="variant" label="Add" size="small" type="secondary" className="ml-0" />
              </td>
            </tr>
          </thead>
          <tbody>
            {(employees.data || []).map((dt: any, index: number) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={dt.id}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.emp_national_id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.user.user_full_name}</td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {new Date(dt.emp_birth_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {new Date(dt.emp_hire_date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.emp_current_flag == "0" ? "INACTIVE" : "ACTIVE"}</td>
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
                                      <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={() => updateOpen(dt.emp_id)}>
                                        Edit
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`} onClick={() => deleteOpen(dt.emp_id)}>
                                        Remove
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link href={`/hr/employee/pay_history/${dt.emp_id}`}>
                                        <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Salary History</button>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link href={`/hr/employee/department_history/${dt.emp_id}`}>
                                        <button className={`${active ? "bg-violet-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>Department History</button>
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                  </div>

                  {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </a>
                  <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
                    Remove
                  </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
}

/* <ToastContainer autoClose={5000} />
{isOpen ? <AddUser isOpen={isOpen} closeModal={() => setIsOpen(false)} /> : null}

{isEdit.status ? (
<EditUser
isEdit={isEdit}
closeModal={() =>
  setIsEdit((prev) => {
    return { ...prev, status: false };
  })
}
/>
) : null} */
