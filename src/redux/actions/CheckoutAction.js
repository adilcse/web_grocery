import {  CHECKOUT,ORDER_PLACE_PENDING,ORDER_PLACE_FAILED,ORDER_PLACE_SUCCESS, EMPTY_CART,ADDRESS_UPDATED } from "../../app/ActionConstants";
import { PENDING, NOT_AVAILABLE } from "../../app/constants";
import { placeOrderAPI} from "../../app/helper/laravelAPI";
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
export const PlaceOrder=(dispatch,address,order,from,user,cartIds,payMode)=>{
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
        //const batch=db.batch();
        const myOrders=[];
        sellerOrders.forEach(ord=>{
            ord.total=sellerTotal(ord.items);
            // ord.address=address;
            ord.paymentMode=payMode;
            ord.status=PENDING;
            // ord.from=from;
            myOrders.push(ord);
        });

        //batch.commit()
        placeOrderAPI(user,{order:myOrders,address:address,from:from})
        .then(res=>{
            dispatch({type:ORDER_PLACE_SUCCESS,payload:res});
             if(address.updateAddress)
                updateAddress(dispatch,address);
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
           console.log(value);
           const it={
            id:value.id,
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
export const updateAddress=(dispatch,address)=>{
            dispatch({type:ADDRESS_UPDATED,payload:address})
}

const emptyCart=(dispatch)=>{
       dispatch({type:EMPTY_CART})
}