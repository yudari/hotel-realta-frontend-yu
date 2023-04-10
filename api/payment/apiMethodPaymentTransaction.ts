import axios from '../../config/endpoint';

const finAll = (searchTerm: any, page: number, limit: number, type:any) => {
    return axios.get(`/payment-transaction?search=${searchTerm}&page=${page}&limit=${limit}&type=${type}`)
}

const topup = (data:any) => {
    return axios.post('/payment-transaction/topup', data)
}

const apiMethodPayTrans = {
    finAll,
    topup,
}

export default apiMethodPayTrans;