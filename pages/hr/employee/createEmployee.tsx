// import { doAddDepartment } from "@/redux/human_resources/action/departmentActionReducer";
// import { doAddEmployee } from "@/redux/human_resources/action/employeeActionReducer";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";

// export default function createEmployee(props: any) {
//   type FromValues = {
//     emp_national_id: number;
//     user_full_name: string;
//     emp_photo: string;
//     emp_birth_date: Date;
//     emp_hire_date: Date;
//     emp_marital_status: string;
//     emp_gender: string;
//     emp_salaried_flag: string;
//     emp_current_flag: number;
//     emp_vacation_hours: number;
//     emp_sickleave_hours: number;
//     joro_name: string;
//     ephi_rate_salary: string;
//     ephi_pay_frequence: number;
//     dept_name: string;
//     edhi_start_date: Date;
//     edhi_end_date: Date;
//     shift_name: string;
//     shift_start_time: Date;
//     shift_end_time: Date;
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//   } = useForm<FromValues>();
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const dispatch = useDispatch();

//   const handleRegistration = async (data: any) => {
//     dispatch(doAddEmployee(data));
//     props.closeModal();
//   };
//   const handleError = (errors: any) => [];

//   const registerOptions = {
//     dept_name: { required: "create department!" },
//   };

// }

//   return (

// <section class="bg-white dark:bg-gray-900">
//   <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
//       <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
//       <form action="#">
//           <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
//               <div class="sm:col-span-2">
//                   <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
//                   <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
//               </div>
//               <div class="w-full">
//                   <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
//                   <input type="text" name="brand" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="">
//               </div>
//               <div class="w-full">
//                   <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
//                   <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
//               </div>
//               <div>
//                   <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
//                   <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
//                       <option selected="">Select category</option>
//                       <option value="TV">TV/Monitors</option>
//                       <option value="PC">PC</option>
//                       <option value="GA">Gaming/Console</option>
//                       <option value="PH">Phones</option>
//                   </select>
//               </div>
//               <div>
//                   <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
//                   <input type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required="">
//               </div> 
//           </div>
//           <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
//               Add product
//           </button>
//       </form>
//   </div>
// </section>  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
//       <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
//       <form action="#">
//           <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
//               <div class="sm:col-span-2">
//                   <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
//                   <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
//               </div>
//               <div class="w-full">
//                   <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
//                   <input type="text" name="brand" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="">
//               </div>
//               <div class="w-full">
//                   <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
//                   <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
//               </div>
//               <div>
//                   <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
//                   <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
//                       <option selected="">Select category</option>
//                       <option value="TV">TV/Monitors</option>
//                       <option value="PC">PC</option>
//                       <option value="GA">Gaming/Console</option>
//                       <option value="PH">Phones</option>
//                   </select>
//               </div>
//               <div>
//                   <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
//                   <input type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required="">
//               </div> 
//               <div class="sm:col-span-2">
//                   <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
//                   <textarea id="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
//               </div>
//           </div>
//           <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
//               Add product
//           </button>
//       </form>
//   </div>
// </section>
// )