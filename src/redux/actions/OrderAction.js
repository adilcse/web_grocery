import { GET_ORDERS_PENDING, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED } from "../../app/ActionConstants";
import { getOrdersAPI } from "../../app/helper/laravelAPI";

export const getOrder=(dispatch,user,page=1)=>{
    dispatch({type:GET_ORDERS_PENDING});
    getOrdersAPI(user,page)
    .then(order=>{
        dispatch({type:GET_ORDERS_SUCCESS,payload:order});
    }).catch(err=>{
        dispatch({type:GET_ORDERS_FAILED,payload:err});
    })
}