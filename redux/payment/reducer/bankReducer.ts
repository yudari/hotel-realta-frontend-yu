import actionType from "../action/actionType";

const initialState={
    banks:[],
    message:'',
    refresh:''
}

export function bankReducers(state = initialState, action: any){
    const {type, payload} = action;
    switch(type){
        case actionType.GET_BANK_RESPONSE:
            return{state, banks:payload, refresh:true}
        case actionType.ADD_BANK_RESPONSE:
            return{message: payload.message, refresh:false}
        case actionType.UPDATE_BANK_RESPONSE:
            return { message: payload.message, refresh: false }
          case actionType.DEL_BANK_RESPONSE:
            return { message: payload, refresh: false }
            default:
                 return state
    }
}


