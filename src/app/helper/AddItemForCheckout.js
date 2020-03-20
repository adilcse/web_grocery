import { CheckoutCart } from "../../redux/actions/CheckoutAction";
/**
 * takes the item and create a cart containing single item and dispatches to checkout action
 * @param {pass the dispatch for action} dispatch 
 * @param {item for checkout} source 
 */
export const AddItemForCheckout=(dispatch,source,quant)=>{
    let total={
      deleveryCharges:0,
      countItems:quant,
    }
    total.total=(source.price*quant)+total.deleveryCharges;
   dispatch(CheckoutCart([{...source,quantity:quant}],total));
  }
  