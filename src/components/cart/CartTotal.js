import React from 'react';
const CartTotal=(props)=>{
    const{item}=props;
  const countItem=item.length;
    let total=0;
    item.forEach(element => {
        total+=(element.item.price*element.quantity);
    });
const inRupee=(amount)=>{
    return new Intl.NumberFormat('en-IN').format(amount)
}
return(
    <div className="_3CKRe3">
        <div className="_13wOiu">
            <span className="_2huYiT">Price details</span>
            <div className="_2twTWD"><div className="hJYgKM">
            <div>Price ({countItem} items)</div><span> ₹{inRupee(total)}</span></div>
                <div className="hJYgKM">
                    <div>Delivery Fee</div>
                <span><span className="_27kB8M _3Oa-sk">Free</span></span>
                </div>
                <div className="_3xFQAD">
                    <div className="hJYgKM">
                        <div>Total Payable</div>
                        <span> ₹{inRupee(total)}</span>
                    </div>
                </div>
            </div>
            <div className="_22vQVX">You will save ₹{inRupee(total*0.1)} on this order</div>
        </div>
    </div>
)

}
export default CartTotal;