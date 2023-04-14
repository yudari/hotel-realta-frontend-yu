import axios from "../../config/endpoint";

// == getAll menggunakan Pagination
const getAll = (page: any, limit: any) => {
  return axios.get(`/hr/employee/?page=${page}&limit=${limit}`);
};

const create = (data: any) => {
  return axios.post("/hr/employee", data);
};

const update = (id: number, data: any) => {
  return axios.put(`/hr/employee/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`/hr/employee/${id}`);
};

const ApiMethodEmployee = {
  getAll,
  create,
  update,
  remove,
};

export default ApiMethodEmployee;
