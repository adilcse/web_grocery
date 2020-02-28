import {CHECKOUT,ORDER_PLACE_SUCCESS, ORDER_PLACE_PENDING } from "../../app/ActionConstants"

const inititalState={
    items:[],
    total:{},
    loading:false,
    orderPlaced:false
}
export const CheckoutReducer=(state=inititalState,action={})=>{
    switch (action.type){
        case CHECKOUT:
            return{...state,items:action.payload,total:action.total}
        default:
            return state;
        case ORDER_PLACE_PENDING:
            return {...state,loading:true}
        case ORDER_PLACE_SUCCESS:
            return {...state,items:[],total:{},loading:false,orderPlaced:true}
    }
}