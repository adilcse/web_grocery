import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    REMOVE_FROM_CART_PENDING,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILED,
    ADD_TO_GUEST_CART,
    REMOVE_FROM_GUEST_CART,
    LOAD_CART,
    LOAD_CART_FAILED,
    UPDATE_CART_SUCCESS,
    UPDATE_CART_PENDING
    } from '../../app/ActionConstants';
import { getUserCartFromAPI, addItemToCartAPI, removeFromCartAPI, updateQuantityAPI } from '../../app/helper/laravelAPI';
/**
 * add cart detils to database
 * @param {*} itemId id of item to be loaded in cart
 * @param {*} item details of item
 * @param {*} user user 
 * @param {*} quantity quantity of item to be loaded
 */
export const addToCart = (dispatch,itemId,item,user,quantity=1)=>{
    dispatch({ type: ADD_TO_CART_PENDING});
    if(user.id){
        let items={
            item_id:itemId,
            quantity:quantity,
        }
    addItemToCartAPI(user.user,items)
    .then(res=> {
        console.log(res);
        dispatch({ type: ADD_TO_CART_SUCCESS,payload:itemId,item:{...item,item_id:item.id,...res,quantity:quantity}});
       
    })
    .catch(function(error) {
        dispatch({ type: ADD_TO_CART_FAILED});
        console.error("Error adding document: ", error);
    });
}
    
}
export const removeFromCart=(dispatch,user,item_id)=>{
    dispatch({type: REMOVE_FROM_CART_PENDING});
  //   db.collection("user").doc(userId).collection('cart').doc(itemId).delete()
  removeFromCartAPI(user,item_id)
     .then(res=> {
        if(res.status===1)
            dispatch({type: REMOVE_FROM_CART_SUCCESS,payload:item_id});
        else
            dispatch({type: REMOVE_FROM_CART_FAILED});
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        dispatch({type: REMOVE_FROM_CART_FAILED});
    });
    
}
//guest cart
export const addToGuestCart=(dispatch,itemId,item,quantity=1)=>{
    dispatch(
        {type:ADD_TO_GUEST_CART,
            payload:itemId,
            item:{...item,quantity:quantity}
        }
    )
}
//remove from guest cart
export const removeFromGuestCart=(itemId)=>({
    type:REMOVE_FROM_GUEST_CART,
    payload:itemId
})


export const getUserCart=(dispatch,user)=>{
    getUserCartFromAPI(user).then(res=>{
        dispatch({})
        dispatch({type:LOAD_CART,payload:res.cart,item:res.item}) 
    })
    .catch(err=>{
        console.log(err);
        dispatch({type:LOAD_CART_FAILED});
    })
}

export const updateQuantityInDB=(dispatch,user,item_id,quantity)=>{
    dispatch({type:UPDATE_CART_PENDING});
    updateQuantityAPI(user,{item_id:item_id,quantity:quantity})
  .then(res=> {
  
      console.log("Document successfully written!");
      dispatch({type:UPDATE_CART_SUCCESS,payload:{item_id:item_id,quantity:quantity}})
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  
       
  });
   }