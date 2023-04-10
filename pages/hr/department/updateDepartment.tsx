import apiMethodDepartment from "@/api/human_resources/apiMethodDepartment";
import { doUpdateDepartment } from "@/redux/human_resources/action/departmentActionReducer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateDepartment(props: any) {
  type FormValues = {
    dept_name: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { departments } = useSelector((state: any) => state.deptReducers);
  const [department, setDepartment] = useState({});
  const dispatch = useDispatch();

  const handleError = (errors: any) => [];

  const handleEdit = async (data: any) => {
    const dataAll = {
      dept_name: data.dept_name,
    };
    console.log("test", dataAll);
    console.log('tes',props.isEdit.dept_id)
    dispatch(doUpdateDepartment(props.isEdit.dept_id, dataAll));
    props.closeModal();
  };

  useEffect(() => {
    setDepartment(departments);
  }, [departments]);

  // useEffect(() => {
  //   setDepartment(departments.filter((department: any) => department.id === props.isEdit.id)[0]);
  //   const getData = async () => {
  //       const result = await apiMethodDepartment.get(props.isEdit.id)
  //       setData(result.data)
  //   }
  // }, []);

  const registerOptions = {
    dept_name: { required: "update department!" },
  };

  return (
    <div>
      <Transition appear show={props.isEdit.status} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Edit Department
                  </Dialog.Title>
                  <div className="mt-3 space-x-7">
                    <form onSubmit={handleSubmit(handleEdit, handleError)}>
                      <div className="mb-3 space-x-7">
                        <label>Department</label>
                        <input type="text" {...register("dept_name", registerOptions.dept_name)} />
                      </div>
                      <button>Submit</button>
                      <button onClick={props.closeModal}>Close</button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
