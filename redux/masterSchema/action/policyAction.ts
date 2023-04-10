import ActionTypes from "./actionType";

export const doRequestGetPolicy=()=> {
    return {

        type: ActionTypes.REQ_GET_POLICY,
    }
}

export const doGetPolicyResponse=(payload:any)=> {
    return {

        type: ActionTypes.GET_POLICY_RESPONSE,
        payload
    }
}

export const doAddPolicy=(payload:any)=> {
    return {

        type: ActionTypes.ADD_POLICY,
        payload
    }
}

export const doAddPolicyResponse=(payload:any)=> {
    return {

        type: ActionTypes.ADD_POLICY_RESPONSE,
        payload
    }
}

export const doUpdatePolicy=(payload:any)=> {
    return {

        type: ActionTypes.UPDATE_POLICY,
        payload
    }
}


export const doUpdatePolicyResponse=(payload:any)=> {
    return {

        type: ActionTypes.UPDATE_POLICY_RESPONSE,
        payload
    }
}


export const doDeletePolicy=(payload:any)=> {
    return {

        type: ActionTypes.DEL_POLICY,
        payload
    }
}

export const doDeletePolicyResponse=(payload:any)=> {
    return {

        type: ActionTypes.DEL_POLICY_RESPONSE,
        payload
    }
}