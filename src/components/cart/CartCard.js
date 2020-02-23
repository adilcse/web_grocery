import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
const CartCard=()=>{
return(        
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={'https://www.bigbasket.com/media/uploads/p/l/40141776_4-jk-poppy-seed.jpg'} className="card-img" alt={'image'}/>
      </div>
      <div className="col-md-8">
        <div className="card-body" align="left">
        <Link to={`/Product/`}>  <h4 className="card-title">product 1  </h4> </Link>
          <h4> ₹ {'100'}  only   </h4> 
          Quantity : <button className="btn btn-success" >+</button> <input className="ct" type="text" value={5}/>
           <button className="btn btn-danger" >-</button> <button className="btn btn-warning" >Remove</button> 
        </div>
      </div> 
    </div>
  
)
}
export default CartCard;