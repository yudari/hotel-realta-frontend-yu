import { doDeleteDepartment, doGetDepartment } from "@/redux/human_resources/action/departmentActionReducer";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button/button";
import UpdateDepartment from "./updateDepartment";
import CreateDepartment from "./createDepartment";

export default function Department() {
  let { departments, refresh } = useSelector((state: any) => state.deptReducers);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [isEdit, setIsEdit] = useState({
    status: false,
    dept_id: 0,
  });

  const editOpen = (dept_id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, dept_id: dept_id };
    });
  };

  const deleteOpen = async (dept_id: number) => {
    dispatch(doDeleteDepartment(dept_id));
  };

  const columns = [{ name: "Department Id" }, { name: "Department" }];

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };
// console.log("tess", search)

  useEffect(() => {
    dispatch(doGetDepartment(search));
  }, [dispatch, search, refresh]);

  return (
    <div>
      <div className="relative overflow-hidden">
        {/* search */}
        <div>
          <form className="flex items-center">
            <div className="relative w-10"></div>
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
                id="dept_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Department Name"
                required
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
        {/* search */}

        {/* tabel */}
        <div>
          <div className="relative overflow-y-auto max-h-[600px] shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {(columns || []).map((col, index) => (
                    <td key={index} className="px-6 py-3">
                      <span className="lg:pl-1 font-bold">{col.name}</span>
                    </td>
                  ))}

                  <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                    <Button onClick={() => setIsOpen(true)} variant="variant" label="Add" size="small" type="secondary" className="ml-0" />
                  </td>
                </tr>
              </thead>
              <tbody>
                {(departments && departments.data ? departments.data : []).map((dt: any, index: number) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={dt.dept_id}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.dept_name}</td>
                    <td className="flex items-center px-6 py-4 space-x-3">
                      <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editOpen(dt.dept_id)}>
                        Edit
                      </a>
                      <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deleteOpen(dt.dept_id)}>
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* tabel */}
      </div>
      {isOpen ? <CreateDepartment isOpen={isOpen} closeModal={() => setIsOpen(false)} /> : null}

      {isEdit.status ? (
        <UpdateDepartment
          isEdit={isEdit}
          closeModal={() =>
            setIsEdit((prev) => {
              return { ...prev, status: false };
            })
          }
        />
      ) : null}
    </div>
  );
}
