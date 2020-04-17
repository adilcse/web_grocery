import { GET_SELLERS_PENDING, GET_SELLERS_SUCCESS, GET_ALL_PRODUCT_PENDING, GET_ALL_PRODUCT_SUCCESS } from "../../app/ActionConstants"
import { getSellerAndItemsAPI } from "../../app/helper/laravelAPI";

export const getNearbySeller=(dispatch,location)=>{
dispatch({type:GET_SELLERS_PENDING});
dispatch({type:GET_ALL_PRODUCT_PENDING});
getSellerAndItemsAPI(location).then(res=>{

    dispatch({type:GET_SELLERS_SUCCESS,payload:res.sellers});
    dispatch({type:GET_ALL_PRODUCT_SUCCESS,payload:res.products});
 
})
}
