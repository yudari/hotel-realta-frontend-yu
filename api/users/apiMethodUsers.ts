import axios from "@/config/endpoint";

type LoginEmployee = {
  email: string;
  password: string;
};

const loginEmployee = (data: LoginEmployee) => {
  return axios.post("/auth/loginEmployee", data);
};

const apiMethodUsers = {
  loginEmployee,
};

export default apiMethodUsers;
