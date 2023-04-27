import {
  doDeleteUserAcc,
  doGetBankFintech,
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
import { toast } from "react-toastify";

export default function userAccount() {
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
      `Are you sure you want to delete a user account with ID ${id} ?`
    );
    if (confirmed) {
      dispatch(doDeleteUserAcc(id));
      toast.success(`
      Successfully Deleted`)
    }
  };

  useEffect(() => {
    dispatch(doGetUserAccount(id));
  }, [refresh]);

  return (
    <div className="bg-white">
      <>
        {/* component */}
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
            <h1 style={{ fontSize: "1.5em" }} className="text-gray-600 font-semibold">
  User Account
</h1>

            </div>
            <div className="flex items-center justify-between">
              <div className="flex bg-gray-50 items-center p-2 rounded-md"></div>
              <div className="lg:ml-40 ml-10 space-x-8">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md
            bg-blue-900 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
            sm:order-1"
                >
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
                      {((column && column) || []).map((col) => (
                        <th
                          key={col.name}
                          className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          <span className="lg:pl-2">{col.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(accounts || []).map((data: any) => (
                      <>
                        <tr key={data.usac_account_number}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 border-b-2 border-gray-200">
                            {data.usac_account_number}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 border-b-2 border-gray-200">
                            {data.entity_name}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 border-b-2 border-gray-200">
                            {data.usac_saldo}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 border-b-2 border-gray-200">
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
                                              ? "bg-blue-900 text-white"
                                              : "text-gray-900"
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
                                              ? "bg-red-600 text-white"
                                              : "text-gray-900"
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
      {/* <ToastContainer autoClose={5000} /> */}
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
