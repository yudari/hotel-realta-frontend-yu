import ActionTypes from "./actionType";


export const doRequestGetServiceTask=()=> {
    return {

        type: ActionTypes.REQ_GET_SERVICETASK,

    }
}

export const doGetServiceTaskResponse=(payload:any)=> {
    return {

        type: ActionTypes.GET_SERVICETASK_RESPONSE,
        payload,
    }
}

export const doAddServiceTask=(payload:any)=> {
    
    return {
        type: ActionTypes.ADD_SERVICETASK,
        payload

    }
}


export const doAddServiceTaskResponse=(payload:any)=> {
    return {

        type: ActionTypes.ADD_SERVICETASK_RESPONSE,
        payload

    }
}

export const doUpdateServiceTask=(payload:any)=> {
    return {

        type: ActionTypes.UPDATE_SERVICETASK,
        payload

    }
}

export const doUpdateServiceTaskResponse=(payload:any)=> {
    return {

        type: ActionTypes.UPDATE_SERVICETASK_RESPONSE,
        payload

    }
}

export const doDeleteServiceTask=(payload:any)=> {
    return {

        type: ActionTypes.DEL_SERVICETASK,
        payload

    }
}

export const doDeleteServiceTaskResponse=(payload:any)=> {
    return {

        type: ActionTypes.DEL_SERVICETASK_RESPONSE,
        payload

    }
}

