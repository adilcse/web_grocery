import { GET_SELLERS_PENDING,GET_SELLERS_SUCCESS,GET_SELLERS_FAILED, GET_ALL_PRODUCT_PENDING, GET_ALL_PRODUCT_SUCCESS, GET_ALL_PRODUCT_FAILED } from "../../app/ActionConstants"

const initialState={
    ids:[],
    loading:false,
    loaded:false,
    error:false,
    products:[],
    productLoading:false,
    productLoaded:false
}
export const sellers=(state=initialState,action={})=>{
switch(action.type){
    case GET_SELLERS_PENDING:
        return{...state,loading:true,loaded:false}
    case GET_SELLERS_SUCCESS:
        return{...state,loading:false,loaded:true,ids:action.payload}
    case GET_SELLERS_FAILED:
        return{...state,loading:false,loaded:false,error:action.payload}
    case GET_ALL_PRODUCT_PENDING:
        return{...state,productLoading:true,productLoaded:false}
    case GET_ALL_PRODUCT_SUCCESS:
        return{...state,products:action.payload,productLoading:false,productLoaded:true}
    case GET_ALL_PRODUCT_FAILED:
        return{...state,productLoading:false,productLoaded:true}
    default:
        return state
}
}
