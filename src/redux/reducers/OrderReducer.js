import { GET_ORDERS_PENDING, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED, ORDER_PLACE_SUCCESS } from "../../app/ActionConstants"

const initialState={
    orders:[],
    loading:false,
    loaded:false,
    isError:false
}
export const getOrders=(state=initialState,action={})=>{
switch(action.type){
   case GET_ORDERS_PENDING:
       return{...state,loading:true,loaded:false}
    case GET_ORDERS_SUCCESS:
        return{...state,loading:false,loaded:true,orders:action.payload}
    case GET_ORDERS_FAILED:
        return{...state,isError:true,error:action.payload,loaded:false,loading:false}
    case ORDER_PLACE_SUCCESS:
        return{...state,loaded:false}
    default:
        return {...state}
}
}