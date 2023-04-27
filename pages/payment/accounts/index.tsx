import {
  doDeleteUserAcc,
  doGetUserAccount,
} from "@/redux/payment/action/userAccActionReducer";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  BsFillPencilFill,
  BsThreeDotsVertical,
  BsTrashFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import AddUserAccount from "./addUserAccount";
import EditUserAccount from "./editUserAccount";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function userAccount() {
  const loginData: any = localStorage.getItem("loginData");
  const objLoginData = JSON.parse(loginData);
  const user_id = objLoginData.user_id;

  let { accounts, message, refresh } = useSelector(
    (state: any) => state.userAccountReducers
  );
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    status: false,
    id: 0,
    data: [{}],
  });

  const column = [
    { name: "Account Number" },
    { name: "Desc" },
    { name: "Saldo" },
    { name: "Type" },
    { name: "Action" },
  ];

  const editOpen = (id: number, data: any[]) => {
    setIsEdit((prev) => {
      return { ...prev, status: true, id: id, data: data };
    });
  };

  const deleteOpen = async (id: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this account?`
    );
    if (confirmed) {
      dispatch(doDeleteUserAcc(id));
      toast.success(`
      Successfully Deleted`)
    }
  };

  useEffect(() => {
    dispatch(doGetUserAccount(user_id));
  }, [refresh]);

  return (
    <div className="bg-white">
      <>
        {/* component */}
        <div className="bg-white p-4 rounded-md w-full">
          <div className=" flex items-center justify-end pb-6">
            
            <div className="flex items-center justify-between">
              <div className="lg:ml-40 ml-10 space-x-8">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="bg-primary hover:bg-primary-hover transition-colors ease-in duration-100 p-2 rounded text-white flex items-center gap-2 border border-primary"
                >
                  <AiOutlinePlus className="text-xl" />
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            {/* div bawah hilangkan overflow-x-auto */}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
              {/*hilangkan overflow-hidden  */}
              <div className="inline-block min-w-full shadow rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <tr>
                      {((column && column) || []).map((col) => (
                        <th
                          key={col.name}
                          className="px-6 py-3"
                        >
                          <span className="lg:pl-2">{col.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(accounts || []).map((data: any) => (
                      <>
                        <tr key={data.usac_account_number} className="bg-white border-b border-gray-200">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {data.usac_account_number}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {data.entity_name}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {data.usac_saldo}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {data.usac_type}
                          </td>

                          <td className="px-6 py-3 text-sm border-b border-gray-200 text-gray-900">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-none px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <BsThreeDotsVertical
                                    className="ml-2 -mr-1 h-5 w-5 text-blue-900 hover:text-violet-300"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                  {/* EDIT */}
                                  <div className="px-1 py-1 ">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active
                                              ? "bg-primary text-white"
                                              : "text-primary"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                          onClick={() =>
                                            editOpen(
                                              data.usac_account_number,
                                              data
                                            )
                                          }
                                        >
                                          {active ? (
                                            <BsFillPencilFill
                                              className="mr-2 h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <BsFillPencilFill
                                              className="mr-2 h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          )}
                                          Edit
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                  {/* DELETE */}
                                  <div className="px-1 py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active
                                              ? "bg-danger-secondary text-white"
                                              : "text-primary"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                          onClick={() =>
                                            deleteOpen(data.usac_account_number)
                                          }
                                        >
                                          {active ? (
                                            <BsTrashFill
                                              className="mr-2 h-5 w-5 "
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <BsTrashFill
                                              className="mr-2 h-5 w-5 "
                                              aria-hidden="true"
                                            />
                                          )}
                                          Delete
                                        </button>
                                      )}
                                    </Menu.Item>
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
              </div>
            </div>
          </div>
        </div>
      </>
      <ToastContainer autoClose={5000} />
      {isOpen ? (
        <AddUserAccount isOpen={isOpen} closeModal={() => setOpen(false)} />
      ) : null}
      {isEdit.status ? (
        <EditUserAccount
          dataUserAcc={isEdit.data}
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
