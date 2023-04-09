import axios from "@/config/endpoint";

type LoginEmployeeType = {
  email: string;
  password: string;
};

type RegisterEmployeeType = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
};

type RegisterOrLoginGuestType = {
  phone_number: string;
};

type UpdateProfileType = {
  user_full_name?: string;
  user_type?: "T" | "I" | "C";
  user_phone_number?: string;
  user_photo_profile?: string;
  user_email?: string;
  user_company_name?: string;
  uspro_nationa_id?: string;
  uspro_job_title?: string;
  uspro_gender?: "M" | "F";
  uspro_birt_date?: Date | string;
  uspro_marital_status?: "M" | "S";
};

type UpdatePasswordType = {
  current_password: string;
  new_password: string;
  retype_password: string;
};

const loginEmployee = (data: LoginEmployeeType) => {
  return axios.post("/auth/loginEmployee", data);
};

const registerEmployee = (data: RegisterEmployeeType) => {
  return axios.post("/users/signupEmployee", data);
};

const loginGuest = (data: RegisterOrLoginGuestType) => {
  return axios.post("/auth/loginGuest", data);
};

const registerGuest = (data: RegisterOrLoginGuestType) => {
  return axios.post("/users/signupGuest", data);
};

const updateProfile = (id: number, data: UpdateProfileType) => {
  return axios.put(`/users/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updatePassword = (id: number, data: UpdatePasswordType) => {
  return axios.put(`/users/password/${id}`, data);
};

const apiMethodUsers = {
  loginEmployee,
  registerEmployee,
  loginGuest,
  registerGuest,
  updateProfile,
  updatePassword,
};

export default apiMethodUsers;
