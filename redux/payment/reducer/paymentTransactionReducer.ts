import actionType from "../action/actionType";

const initialState={
    payTrans:[],
    message:'',
    refresh:''
}

export function paymentTransactionReducers(state = initialState, action: any){
    const {type, payload} = action;
    
    switch(type){
        case actionType.GET_PAYMENT_TRANSACTION_RESPONSE:
            return{state, payTrans:payload, refresh:true}
        case actionType.POST_TOPUP_RESPONSE:
            return{message: payload.message, refresh:false}
            default:
                 return state
    }
}


