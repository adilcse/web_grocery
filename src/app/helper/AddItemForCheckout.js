import { CheckoutCart } from "../../redux/actions/CheckoutAction";
/**
 * takes the item and create a cart containing single item and dispatches to checkout action
 * @param {pass the dispatch for action} dispatch 
 * @param {item for checkout} source 
 */
export const AddItemForCheckout=(dispatch,source,quant)=>{
    let total={
      deliveryCharges:0,
      countItems:quant,
    }
    let MRP=(source.MRP*quant)+total.deliveryCharges;
    total.total=(source.price*quant)+total.deliveryCharges;
     total.discount=MRP-total.total;
   CheckoutCart(dispatch,[{...source,quantity:quant}],total);
  }
  