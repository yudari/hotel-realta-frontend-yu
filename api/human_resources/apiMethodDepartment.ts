import axios from "../../config/endpoint";

const getAll = (name: any) => {
  return axios.get(`/hr/department/?search=${name}`);
};

const create = (data: any) => {
  return axios.post("/hr/department", data);
};

const update = (id: number, data: any) => {
  return axios.put(`/hr/department/${id}`, data);
};

const remove = (id: number) => {
  return axios.delete(`/hr/department/${id}`);
};

const apiMethodDepartment = {
  getAll,
  create,
  update,
  remove,
};

export default apiMethodDepartment;
