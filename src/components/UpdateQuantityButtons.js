import React from 'react';
import { Row, Col } from 'react-bootstrap';
const UpdateQuantitybutton=(props)=>{
    const {quant,updateQuant}=props;
return(
    <Row className={props.className}>
       <Col> <button className="btn btn-success" onClick={(element)=>updateQuant(element.target,1)} >+</button> </Col>
       <Col> <input className="ct text-center" type="text" value={quant} readOnly  maxLength={1} style={{width:'24px'}}/> </Col>
       <Col> <button className="btn btn-danger" onClick={(element)=>updateQuant(element.target,-1)}>-</button> </Col>
           {props.children}
    </Row>
)
}
export default UpdateQuantitybutton;