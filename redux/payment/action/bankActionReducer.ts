    import actionType from "./actionType";

export const doGetBank = (searchTerm: any) => {
    const payload = {
        searchTerm
    }
    return{
        type: actionType.GET_BANK,
        payload
    }
}

export const doGetBankResponse = (payload: any) => {
    return{
        type: actionType.GET_BANK_RESPONSE,
        payload
    }
}

export const doAddBank = (payload:any) => {
    return{
        type:actionType.ADD_BANK,
        payload
    }
}

export const doAddBankResponse = (payload:any) => {
    return{
        type:actionType.ADD_BANK_RESPONSE,
        payload
    }
}

export const doUpdateBank = (...payload: any[]) => {
    return {
      type: actionType.UPDATE_BANK,
      payload,
    }
  }
  export const doUpdateResponse = (...payload: any[]) => {
    return {
      type: actionType.UPDATE_BANK_RESPONSE,
      payload,
    }
  }

  export const doDeleteBank = (payload: any) => {
    return {
      type: actionType.DEL_BANK,
      payload,
    }
  }
  export const doDeleteResponse = (payload: any) => {
    return {
      type: actionType.DEL_BANK_RESPONSE,
      payload,
    }
  }