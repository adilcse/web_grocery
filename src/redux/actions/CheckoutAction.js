import {  CHECKOUT,ORDER_PLACE_PENDING,ORDER_PLACE_FAILED,ORDER_PLACE_SUCCESS, EMPTY_CART } from "../../app/ActionConstants";
import { db } from "../../firebaseConnect";

export const CheckoutCart=(cart,total)=>({
type:CHECKOUT,
payload:cart,
total:total
})
/**
 * Place order action places the user's order after confirming all the details
 * @param {*} address 
 * @param {*} order 
 * @param {*} dispatch 
 * @param {*} from
 */
export const PlaceOrder=(address,order,from,userId)=>dispatch=>{
    dispatch({type:ORDER_PLACE_PENDING});
    db.collection("orders").add({
        uid:userId,
        item:order.items,
        total:order.total,
        address:address
    })
    .then(function() {
        updateAddress(userId,address,from,dispatch);
        console.log("Document written");
    })
    .catch(function(error) {
        dispatch({ type: ORDER_PLACE_FAILED});
        console.error("Error adding document: ", error);
    });
}
const updateAddress=(id,address,from,dispatch)=>{
    db.collection('user').doc(id).set({
        address:address
    })
    .then(()=>{
        console.log(ORDER_PLACE_SUCCESS);
        if(from==='cart')
            emptyCart(id);
        dispatch({type:ORDER_PLACE_SUCCESS,payload:from})
    }).catch((err)=>{
        console.log(err)
    })
}
/**
 * empty the cart
 * @param {*} id 
 */
const emptyCart=(id)=>{
    //
}