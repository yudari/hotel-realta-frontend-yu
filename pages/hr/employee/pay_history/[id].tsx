import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SalaryHistory() {
  let { employees, refresh } = useSelector((state: any) => state.empReducers);
  console.log("testPH", employees);
  const dispatch = useDispatch();
  const [payHistory, setIsPayHistory] = useState<any>({});
  const columns = [{ name: "Employee ID" }, { name: "Full Name" }, { name: "Salary" }, { name: "Salary Frequence" }];

  const router = useRouter().query;
  // const employeesArr = Object.values(employees);
  useEffect(() => {
    const filterEmployee = employees.data.filter((data: any) => {
      if (data.emp_id === Number(router.id)) {
        return data;
      }
    })[0];
    setIsPayHistory(filterEmployee);
  }, [refresh]);
  console.log("cekEMP", router.id);

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
                {/* <td className="py-2 flex pl-6 border-black bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider ">
                  <Button onClick={() => setIsOpen(true)} variant="variant" label="Add" size="small" type="secondary" className="ml-0" />
                </td> */}
              </tr>
            </thead>
            <tbody>
              {(payHistory.employee_pay_histories || []).map((dt: any, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={dt.emp_id}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.woro_id}</td>
                  {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.users.user_full_name}</td> */}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.ephi_rate_salary}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dt.ephi_pay_frequence}</td>
                  {/* <td className="flex items-center px-6 py-4 space-x-3">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editOpen(dt.woro_id)}>
                      Edit
                    </a>
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deleteOpen(dt.woro_id)}>
                      Remove
                    </a>
                  </td> */}
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
