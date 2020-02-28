import { CheckoutCart } from "../../redux/actions/CheckoutAction";
/**
 * takes the item and create a cart containing single item and dispatches to checkout action
 * @param {pass the dispatch for action} dispatch 
 * @param {item for checkout} source 
 */
export const AddItemForCheckout=(dispatch,source)=>{
    let cart = {
      id:source.id,
      item:source,
      quantity:1
    };
    let total={
      deleveryCharges:0,
      countItems:1,
    }
    total.total=source.price+total.deleveryCharges;
   dispatch(CheckoutCart([cart],total));
   
  }
  