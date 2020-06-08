import React from 'react';
import { MAX_ITEM_ALLOWED } from '../app/constants';
const UpdateQuantitybutton=(props)=>{
    const {quant,setQuant,stock}=props;
    const updateQuant=(target,value)=>{
        let newQuant=quant+value;
        if(newQuant>0 && newQuant<=MAX_ITEM_ALLOWED){
            if(isNaN(stock) || (!isNaN(stock) && stock>newQuant)){
                setQuant(newQuant);
            }
        }
    }
return(
    <div className={props.className}>
        <button className="btn btn-success" disabled={5 === quant?true:false} onClick={(element)=>updateQuant(element.target,1)} >+</button> 
        <input className="ct text-center" type="text" value={quant} readOnly  maxLength={1} style={{width:'24px'}}/>
        <button className="btn btn-danger"  disabled={1 === quant?true:false} onClick={(element)=>updateQuant(element.target,-1)}>-</button>
        {props.children}
    </div>
)
}
export default UpdateQuantitybutton;