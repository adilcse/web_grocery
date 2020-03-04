import {  CHECKOUT,ORDER_PLACE_PENDING,ORDER_PLACE_FAILED,ORDER_PLACE_SUCCESS, EMPTY_CART } from "../../app/ActionConstants";
import { db } from "../../firebaseConnect";
import firebase from 'firebase';
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
 * @param {'cart','item'} from from where the user is checking out
 */
export const PlaceOrder=(address,order,from,userId,dispatch,cartIds,payMode)=>{
    dispatch({type:ORDER_PLACE_PENDING});
    let items=[];
    order.items.forEach(value=>{
        items.push({id:value.id,
        quantity:value.quantity,
        price:value.item.price
        })
    })
    db.collection("orders").add({
        uid:userId,
        item:items,
        total:order.total,
        address:address,
        paymentMode:payMode,
        orderedOn:firebase.firestore.FieldValue.serverTimestamp(),
        status:'pending'
    })
    .then(function() {
        updateAddress(userId,address,dispatch);
        if(from==='cart')
            emptyCart(userId,cartIds,dispatch);
        console.log("Document written");
    })
    .catch(function(error) {
        dispatch({ type: ORDER_PLACE_FAILED,payload:error.message});
        console.error("Error adding document: ", error);
    });
}
const updateAddress=(id,address,dispatch)=>{
    db.collection('user').doc(id).set({
        address:address
    })
    .then(()=>{
         dispatch({type:ORDER_PLACE_SUCCESS})
    }).catch((err)=>{
        console.log(err)
    })
}
/**
 * empty the cart
 * @param {*} id 
 */
const emptyCart=(userId,cartIds,dispatch)=>{
    var writeBatch = db.batch();
    cartIds.forEach(id=>{
        let documentReference = db.collection("user").doc(userId).collection('cart').doc(id);
        writeBatch.delete(documentReference);
    });
    writeBatch.commit().then(function () {
       dispatch({type:EMPTY_CART})
    });
}