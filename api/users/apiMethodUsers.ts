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

const loginEmployee = (data: LoginEmployeeType) => {
  return axios.post("/auth/loginEmployee", data);
};

const registerEmployee = (data: RegisterEmployeeType) => {
  return axios.post("/users/signupEmployee", data);
};

const loginGuest = (data: LoginEmployeeType) => {
  return axios.post("/auth/loginGuest", data);
};

const apiMethodUsers = {
  loginEmployee,
  registerEmployee,
  loginGuest,
};

export default apiMethodUsers;
