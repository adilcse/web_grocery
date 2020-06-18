import React from 'react';
import './Cart.css';
/**
 * displays the price of the item
 * @param {*} props item's price
 */
const CartTotal=(props)=>{
    if(!props){
        return(<></>);
    }
    const{countItems,total,deliveryCharges,discount}=props.item;

const inRupee=(amount)=>{
    return new Intl.NumberFormat('en-IN').format(amount)
}
return(
    <div className="_3CKRe3">
        <div className="_13wOiu">
            <span className="_2huYiT">Price details</span>
            <div className="_2twTWD"><div className="hJYgKM">
            <div>Price ({countItems} {countItems===1?' item':' items'})</div><span> ₹{inRupee(total)}</span></div>
                <div className="hJYgKM">
                    <div>Delivery Fee</div>
                <span><span className="_27kB8M _3Oa-sk">{deliveryCharges===0?'Free':inRupee(deliveryCharges)}</span></span>
                </div>
                <div className="_3xFQAD">
                    <div className="hJYgKM">
                        <div>Total Payable</div>
                        <span> ₹{inRupee(total)}</span>
                    </div>
                </div>
            </div>
            <div className="_22vQVX">You will save ₹{discount} on this order</div>
        </div>
    </div>
)

}
export default CartTotal;