import axios from "../../config/endpoint";

const getAll = () => {
  return axios.get("/hr/employee-depatment-history/");
};

const create = (data: any) => {
  return axios.post("/hr/employee-depatment-history/", data);
};

const update = (id: number, data: any) => {
  return axios.put(`/hr/employee-depatment-history/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`/hr/employee-depatment-history/${id}`);
};

const apiMethodEmployeeDepartmentHistory = {
  getAll,
  create,
  update,
  remove,
};

export default apiMethodEmployeeDepartmentHistory;
