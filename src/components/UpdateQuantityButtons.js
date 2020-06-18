import React, { useState } from 'react';
import { MAX_ITEM_ALLOWED } from '../app/constants';
const UpdateQuantitybutton=(props)=>{
    const {quant,setQuant,stock}=props;
    const [allowAdd,setAllowAdd]=useState(true);
    const updateQuant=(value)=>{
        let newQuant=quant+value;
        if(newQuant>0 && newQuant<=MAX_ITEM_ALLOWED){
            if(isNaN(stock) || (!isNaN(stock) && stock>=newQuant) || value < 0){
                setQuant(newQuant);
                setAllowAdd(true);
            } else if(parseInt(stock)<=newQuant){
                setAllowAdd(false);
            } else {
                setAllowAdd(true);
            }
        }
    }
return(
    <div className={props.className}>
        <button className="btn btn-success" style={{borderRadius: '50%'}} disabled={(5 === quant) || !(allowAdd)?true:false} onClick={(element)=>updateQuant(1)} >+</button> 
        <input className="ct text-center border-0"  type="text" value={quant} readOnly  maxLength={1} style={{width:'24px'}}/>
        <button className="btn btn-danger" style={{borderRadius: '50%'}}  disabled={1 === quant?true:false} onClick={(element)=>updateQuant(-1)}>-</button>
        {props.children}
    </div>
)
}
export default UpdateQuantitybutton;