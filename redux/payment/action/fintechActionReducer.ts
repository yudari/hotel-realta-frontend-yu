import actionType from "./actionType"

export const doGetFintech = (searchTerm: any) => {
  const payload = {
    searchTerm
  }
    return{
        type:actionType.GET_FINTECH,
        payload
    }
}

export const doGetFintechResponse = (payload:any) => {
    return{
        type: actionType.GET_FINTECH_RESPONSE,
        payload
    }
}

export const doAddFintech = (payload:any) => {
    return{
        type:actionType.ADD_FINTECH,
        payload
    }
}

export const doAddFintechResponse = (payload:any) => {
    return{
        type:actionType.ADD_FINTECH_RESPONSE,
        payload
    }
}

export const doUpdateFintech = (...payload: any[]) => {
    return {
      type: actionType.UPDATE_FINTECH,
      payload,
    }
  }
  export const doUpdateFintechResponse = (...payload: any[]) => {
    return {
      type: actionType.UPDATE_FINTECH_RESPONSE,
      payload,
    }
  }

  export const doDeleteFintech = (payload: any) => {
    return {
      type: actionType.DEL_FINTECH,
      payload,
    }
  }
  export const doDeleteFintechResponse = (payload: any) => {
    return {
      type: actionType.DEL_FINTECH_RESPONSE,
      payload,
    }
  }