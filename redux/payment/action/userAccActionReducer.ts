import actionType from './actionType'

export const doGetUserAccount = (payload: any) => {
  return {
    type: actionType.GET_USER_ACCOUNT,
    payload,
  }
}

export const doGetUserAccResponse = (payload: any) => {
  return {
    type: actionType.GET_USER_ACCOUNT_RESPONSE,
    payload,
  }
}

export const doAddUserAcc = (payload:any) => {
    return{
        type:actionType.ADD_USER_ACCOUNT,
        payload
    }
}

export const doAddUserAccResponse = (payload:any) => {
    return{
        type:actionType.ADD_USER_ACCOUNT_RESPONSE,
        payload
    }
}

export const doUpadateUserAcc = (...payload: any[]) => {
  return {
    type: actionType.UPDATE_USER_ACCOUNT,
    payload,
  }
}

export const doUpadateUserAccResponse = (...payload: any[]) => {
  return {
    type: actionType.UPDATE_USER_ACCOUNT_RESPONSE,
    payload,
  }
}

export const doDeleteUserAcc = (payload: any) => {
  return {
    type: actionType.DEL_USER_ACCOUNT,
    payload,
  }
}

export const doDeleteUserAccResponse = (payload: any) => {
  return {
    type: actionType.DEL_USER_ACCOUNT_RESPONSE,
    payload,
  }
}

export const doGetBankFintech = () => {
  return {
    type: actionType.GET_BANK_FINTECH,
  }
}

export const doGetBankFintechResponse = (payload: any) => {
  return {
    type: actionType.GET_BANK_FINTECH_RESPONSE,
    payload,
  }
}
