import axios from '../../config/endpoint'

const findAll = (id: number) => {
  return axios.get(`/accounts?id=${id}`)
}

const create = (data: any) => {
  return axios.post(`/accounts`, data)
}

const update = (id: number, data: any) => {
  return axios.put(`/accounts/${id}`, data)
}

const remove = (id: number) => {
  return axios.delete(`/accounts/${id}`)
}

const findBKData = () => {
  return axios.get('/accounts/data')
}

const apiMethodUserAcc = {
  findAll,
  create,
  update,
  remove,
  findBKData
}

export default apiMethodUserAcc
