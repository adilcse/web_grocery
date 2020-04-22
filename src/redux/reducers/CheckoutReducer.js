import {CHECKOUT,ORDER_PLACE_SUCCESS, ORDER_PLACE_PENDING, ORDER_PLACE_FAILED } from "../../app/ActionConstants"

const inititalState={
    items:[],
    total:{},
    loading:false,
    orderPlaced:false,
    isError:false,
    errorMessage:''
}
/**
 * chackout reducer handle checkout action
 * @param {*} state 
 * @param {*} action 
 */
export const CheckoutReducer=(state=inititalState,action={})=>{
    switch (action.type){
        case CHECKOUT:
            return{...state,
                items:action.payload,
                total:action.total,
                orderPlaced:false,
                loading:false}
        case ORDER_PLACE_PENDING:
            return {...state,loading:true}
        case ORDER_PLACE_SUCCESS:
            return {...state,
                orderPlaced:true,
                items:[],
                total:{},
                loading:false};
        case ORDER_PLACE_FAILED:
            return {...state,
                isError:true,
                errorMessage:action.payload,
                loading:false,
                orderPlaced:false}
        default:
            return  {...state}
    }
}