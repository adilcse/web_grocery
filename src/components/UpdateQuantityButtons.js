import React from 'react';
import { Row } from 'react-bootstrap';
const UpdateQuantitybutton=(props)=>{
    const {quant,updateQuant}=props;
return(
    <Row className={props.className}>
        <button className="btn btn-success" onClick={(element)=>updateQuant(element.target,1)} >+</button> 
          <input className="ct text-center" type="text" value={quant} readOnly  maxLength={1} style={{width:'24px'}}/>
           <button className="btn btn-danger" onClick={(element)=>updateQuant(element.target,-1)}>-</button>
           {props.children}
    </Row>
)
}
export default UpdateQuantitybutton;