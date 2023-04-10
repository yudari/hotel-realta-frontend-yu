import axios from "../../config/endpoint";

const getAll = () => {
  return axios.get("/hr/employee-pay-history/");
};

const create = (data: any) => {
  return axios.post("/hr/employee-pay-history/", data);
};

const update = (id: number, data: any) => {
  return axios.put(`/hr/employee-pay-history/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`/hr/employee-pay-history/${id}`);
};

const apiMethodEmployeePayHistory = {
  getAll,
  create,
  update,
  remove,
};

export default apiMethodEmployeePayHistory;
