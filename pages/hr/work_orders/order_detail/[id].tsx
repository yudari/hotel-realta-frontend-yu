import Button from "@/components/Button/button";
import { doDeleteWorkOrderDetail, doGetWorkOrderDetail } from "@/redux/human_resources/action/workOrderDetailActionReducer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderDetail() {
  let { workorders, refresh } = useSelector((state: any) => state.workOrdersReducers);
  console.log("tes1", workorders);
  const dispatch = useDispatch();
  const [orderdetail, setIsOrderDetail] = useState<any>({});
  console.log("od", orderdetail);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    wode_id: 0,
  });

  const editOpen = (woro_id: number) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, woro_id: woro_id };
    });
  };

  const deleteOpen = async (woro_id: number) => {
    dispatch(doDeleteWorkOrderDetail(woro_id));
  };

  const columns = [{ name: "WorkOrder Id" }, { name: "Task Name" }, { name: "Notes" }, { name: "Status" }, { name: "Assign To" }];

  const router = useRouter().query;
  useEffect(() => {
    const filterdetail = workorders.data.filter((data: any) => {
      if (data.woro_id === Number(router.id)) {
        return data;
      }
    })[0];
    setIsOrderDetail(filterdetail);
  }, [refresh]);
  console.log("cekID ", router.id);

  return (
    <div>
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
              {(orderdetail.work_order_details|| []).map((dt: any, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={dt.woro_id}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                  {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.woro_id}</td> */}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.service_task.seta_name}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.wode_notes}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.wode_status}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.users && dt.users.users.user_full_name}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editOpen(dt.woro_id)}>
                      Edit
                    </a>
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deleteOpen(dt.woro_id)}>
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
  );
}
