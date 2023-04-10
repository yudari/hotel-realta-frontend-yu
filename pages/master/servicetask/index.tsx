import Button from "@/components/Button/button";

import {
  doDeleteServiceTask,
  doRequestGetServiceTask,
} from "@/redux/masterSchema/action/servicetaskAction";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddServiceTask from "./addServiceTask";
import EditServiceMaster from "./editServiceTask";

export default function ServiceMaster() {
  let { servicetask, refresh } = useSelector(
    (state: any) => state.servicetaskReducer
  );
  // console.log(servicetask);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
  });

  const columns = [
    { name: "ID" },
    { name: "Task Name" },
    { name: "Sequence Order" },
  ];

  const editOpen = (id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id };
    });
  };

  const deleteOpen =  (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeleteServiceTask(id));
    }
  };

  useEffect(() => {
    dispatch(doRequestGetServiceTask());
  }, [dispatch, refresh]);

  return (
    <div className="relative overflow-y-auto  shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {(columns || []).map((col) => (
              <>
                <td key={col.name} className="px-6 py-3">
                  <span className="lg:pl-1 font-bold">{col.name}</span>
                </td>
              </>
            ))}
            <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
              <Button
                variant="variant"
                label="Add"
                size="small"
                type="secondary"
                className="ml-0"
                onClick={() => setIsOpen(true)}
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {(servicetask?.data || []).map((dt: any, index: number) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={dt.id}
            >
              {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></td> */}
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {dt.seta_name}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white pl-[5rem]">
                {dt.seta_seq}
              </td>
              <td className="flex items-center px-6 py-4 space-x-3">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => editOpen(dt.seta_id)}
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  onClick={() => deleteOpen(dt.seta_id)}
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen ? (
        <AddServiceTask isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      ) : null}
      {isEdit.status ? (
        <EditServiceMaster
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
