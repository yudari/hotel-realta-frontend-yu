import axios from '../../config/endpoint';

const findAll = () => {
    return axios.get('/user-accounts')
}


const create = (data:any) =>{
  return axios.post(`/user-accounts`, data)
}

const update = (id: number, data: any) => {
  return axios.put(`/user-accounts/${id}`, data)
}

const remove = (id: number) => {
  return axios.delete(`/user-accounts/${id}`)
}

const findBKData = () => {
  return axios.get('/user-accounts/data')
}

const apiMethodUserAcc ={
    findAll,
    create,
    update,
    remove,
    findBKData
}

export default apiMethodUserAcc