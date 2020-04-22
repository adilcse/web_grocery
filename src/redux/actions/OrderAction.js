import { GET_ORDERS_PENDING, GET_ORDERS_SUCCESS, GET_ORDERS_FAILED } from "../../app/ActionConstants";
import { getOrdersAPI } from "../../app/helper/laravelAPI";
/**
 * get user's order and store in redux store
 * @param {*} dispatch 
 * @param {*} user 
 * @param {*} page 
 */
export const getOrder=(dispatch,user,page=1)=>{
    dispatch({type:GET_ORDERS_PENDING});
    getOrdersAPI(user,page)
    .then(order=>{
        dispatch({type:GET_ORDERS_SUCCESS,payload:order});
    }).catch(err=>{
        dispatch({type:GET_ORDERS_FAILED,payload:err});
    })
}