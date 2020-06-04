import React from 'react';
const UpdateQuantitybutton=(props)=>{
    const {quant,updateQuant}=props;
return(
    <div className={props.className}>
        <button className="btn btn-success" onClick={(element)=>updateQuant(element.target,1)} >+</button> 
          <input className="ct text-center" type="text" value={quant} readOnly  maxLength={1} style={{width:'24px'}}/>
           <button className="btn btn-danger" onClick={(element)=>updateQuant(element.target,-1)}>-</button>
           {props.children}
    </div>
)
}
export default UpdateQuantitybutton;