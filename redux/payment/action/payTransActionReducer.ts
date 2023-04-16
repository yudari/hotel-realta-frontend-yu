import actionType from './actionType'

export const doGetPayTrans = (
  searchTerm: any,
  page: any,
  limit: any,
  type: any,
  id: any
) => {
  const payload = {
    searchTerm,
    page,
    limit,
    type,
    id,
  }
  return {
    type: actionType.GET_PAYMENT_TRANSACTION,
    payload,
  }
}

export const doGetPayTransResponse = (payload: any) => {
  return {
    type: actionType.GET_PAYMENT_TRANSACTION_RESPONSE,
    payload,
  }
}

export const doTopup = (payload: any) => {
  return {
    type: actionType.POST_TOPUP,
    payload,
  }
}

export const doTopupResponse = (payload: any) => {
  return {
    type: actionType.POST_TOPUP_RESPONSE,
    payload,
  }
}
