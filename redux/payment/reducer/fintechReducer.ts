import actionType from "../action/actionType";

const initialState={
    fintechs:[],
    message:'',
    refresh:''
}

export function fintechReducers(state = initialState, action: any){
    const {type, payload} = action;
    switch(type){
        case actionType.GET_FINTECH_RESPONSE:
            return{state, fintechs:payload, refresh:true}
        case actionType.ADD_FINTECH_RESPONSE:
            return{message: payload.message, refresh:false}
        case actionType.UPDATE_FINTECH_RESPONSE:
            return { message: payload.message, refresh: false }
        case actionType.DEL_FINTECH_RESPONSE:
            return { message: payload, refresh: false }
            default:
                return state
    }
}

