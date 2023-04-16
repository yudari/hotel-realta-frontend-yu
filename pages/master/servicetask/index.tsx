import Button from "@/components/Button/button";

import {
  doDeleteServiceTask,
  doRequestGetServiceTask,
} from "@/redux/masterSchema/action/servicetaskAction";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddServiceTask from "./addServiceTask";
import EditServiceMaster from "./editServiceTask";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";

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
    { name: "Action" },
  ];

  const editOpen = (id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id };
    });
  };

  const deleteOpen = (id: number) => {
    const confirmDelete = window.confirm(`Anda yakin ingin mengahpus data ini`);
    if (confirmDelete) {
      dispatch(doDeleteServiceTask(id));
    }
  };

  useEffect(() => {
    dispatch(doRequestGetServiceTask());
  }, [dispatch, refresh]);

  return (
    <div className="relative overflow-y-auto  shadow-md sm:rounded-lg bg-white p-4">
      <div className="flex justify-end pb-4">
        <Button
          variant="variant"
          label="Add"
          size="small"
          type="secondary"
          className="ml-0"
          onClick={() => setIsOpen(true)}
          icon={AiOutlinePlus}
        />
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {(columns || []).map((col) => (
              <>
                <td key={col.name} className="px-6 py-3">
                  <span className="lg:pl-1 font-bold">{col.name}</span>
                </td>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {(servicetask?.data || []).map((dt: any, index: number) => (
            <tr
              className="bg-white border-b border-gray-200 hover:bg-gray-50"
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
                  className="border-2 border-primary hover:bg-primary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-primary"
                  onClick={() => editOpen(dt.seta_id)}
                >
                  <MdEdit className="text-xl" />
                </a>
                <a
                  href="#"
                  className="border-2 border-danger-secondary hover:bg-danger-secondary hover:text-white transition-colors ease-in duration-100 p-2 rounded text-danger-secondary"
                  onClick={() => deleteOpen(dt.seta_id)}
                >
                  <MdDelete className="text-xl" />
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
