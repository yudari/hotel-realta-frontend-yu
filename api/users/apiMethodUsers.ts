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

type RegisterOrLoginGuest = {
  phone_number: string;
};

const loginEmployee = (data: LoginEmployeeType) => {
  return axios.post("/auth/loginEmployee", data);
};

const registerEmployee = (data: RegisterEmployeeType) => {
  return axios.post("/users/signupEmployee", data);
};

const loginGuest = (data: RegisterOrLoginGuest) => {
  return axios.post("/auth/loginGuest", data);
};

const registerGuest = (data: RegisterOrLoginGuest) => {
  return axios.post("/users/signupGuest", data);
};

const apiMethodUsers = {
  loginEmployee,
  registerEmployee,
  loginGuest,
  registerGuest,
};

export default apiMethodUsers;
