import {  CHECKOUT,ORDER_PLACE_PENDING,ORDER_PLACE_FAILED,ORDER_PLACE_SUCCESS, EMPTY_CART,ADDRESS_UPDATED } from "../../app/ActionConstants";
import { PENDING, NOT_AVAILABLE } from "../../app/constants";
import { placeOrderAPI, updateAddressAPI} from "../../app/helper/laravelAPI";
/**
 * add items from cart to checkout
 * @param {*} dispatch 
 * @param {*} cart 
 * @param {*} total 
 */
export const CheckoutCart=(dispatch,cart,total)=>{
    dispatch({  
        type:CHECKOUT,
        payload:cart,
        total:total,
        })
    }
/**
 * Place order action places the user's order after confirming all the details
 * @param {*} address 
 * @param {*} order 
 * @param {*} dispatch 
 * @param {'cart','item'} from from where the user is checking out
 */
export const PlaceOrder=(dispatch,address,order,from,user,payMode)=>{
    console.log(order,address);
    dispatch({type:ORDER_PLACE_PENDING});
    const sellerOrders=getSellerOrders(order);
    const sellerTotal=(item)=>{
        let tot=0;
        item.forEach(el=>{
            tot+=(el.quantity*el.price)
        });
        return {
            total:tot,
            itemCount:item.length,
            deliveryCharges:0
            };
    }
    if(sellerOrders){
        const myOrders=[];
        sellerOrders.forEach(ord=>{
            ord.total=sellerTotal(ord.items);
            ord.paymentMode=payMode;
            ord.status=PENDING;
            myOrders.push(ord);
        });
        placeOrderAPI(user,{order:myOrders,address:address,from:from})
        .then(res=>{
            dispatch({type:ORDER_PLACE_SUCCESS,payload:res});
            if(address.updateAddress)
                updateAddress(dispatch,user,address);
            if(from==='cart')
                emptyCart(dispatch);
        }).catch(error=>{
            dispatch({ type: ORDER_PLACE_FAILED,payload:error.message});
        })

    }else{
        dispatch({type:ORDER_PLACE_FAILED,payload:'out of stock'});
    }
}
/**
 * convert order to seller wise order and return seller orders
 * @param {*} order 
 */
const getSellerOrders=(order)=>{
    let sellers=[];
    let sellerOrders=[];
    for(let i=0;i<order.items.length;i++){
        const value=order.items[i];
        if(value.stock===NOT_AVAILABLE){
            return false;
            } 
            const it={
            id:value.id?value.id:value.item_id,
            quantity:value.quantity,
            price:value.price,
            confirmed:true
        }
        if(sellers.includes(value.seller_id)){
            let index=sellerOrders.findIndex(element=>element.seller_id===value.seller_id);
            sellerOrders[index].items.push(it);
        }else{
            let ord={
                seller_id:value.seller_id,   
                items:[it]
            }
            sellers.push(value.seller_id);
            sellerOrders.push(ord);
        }
    }
    return sellerOrders;
}
/**
 * update address in redux store
 * @param {*} dispatch 
 * @param {*} address 
 */
export const updateAddress=(dispatch,user,address)=>{
    updateAddressAPI(user,address)
    .then(res=>{
        if(res.status)
            dispatch({type:ADDRESS_UPDATED,payload:address})
        })
}
/**
 * when order is placed empty cart in redux store
 * @param {*} dispatch 
 */
const emptyCart=(dispatch)=>{
       dispatch({type:EMPTY_CART})
}