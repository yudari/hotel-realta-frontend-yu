import actionType from "../action/actionType";

const initialState={
    accounts:[],
    message:'',
    refresh:'',
    bankFintech:[]
}

export function userAccountReducers(state = initialState, action: any){
    const {type, payload} = action;
    switch(type){
        case actionType.GET_USER_ACCOUNT_RESPONSE:
            return{...state, accounts:payload, refresh:true}
        case actionType.ADD_USER_ACCOUNT_RESPONSE:
            return{message: payload.message, refresh:false}
        case actionType.UPDATE_USER_ACCOUNT_RESPONSE:
            return { message: payload.message, refresh: false }
        case actionType.DEL_USER_ACCOUNT_RESPONSE:
            return { message: payload, refresh: false }
        case actionType.GET_BANK_FINTECH_RESPONSE:
            return {...state, bankFintech: payload, refresh: true }
            default:
                 return state
    }
}