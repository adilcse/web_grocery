import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { AiFillCaretRight } from 'react-icons/ai';
/**
 * display profile of the user
 * @param {*} props 
 */
const ViewProfile=(props)=>{

    const {address,city,locality,number,state,pin}=props.fullAddress;

return(
    <Col className="border" lg="5">
    <Row>
    <Form className="text-left pl-3">
      <Form.Label>Mobile no.</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly value={number?number:'Uknown'} ></Form.Control>
      <Form.Label>Pincode</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly value={pin?pin:'unknown'} ></Form.Control>
      <Form.Label>Locality</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly value={locality?locality:'unknown'} ></Form.Control>
      <Form.Label>City/Distict/Town</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly value={city?city:'unknown'}></Form.Control>
      <Form.Label>State</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly value={state?state:'unkmown'} ></Form.Control>
      <Form.Label>Address</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly value={address?address:'unknown'} ></Form.Control>
    </Form>
    </Row>
    <Row className="text-left" style={{marginBottom:"20px"}}>
    <Button variant="secondary" size="lg" block onClick={()=>props.showPayment(!props.status)}>Payment Option <AiFillCaretRight/></Button>
    </Row>
  </Col>
)
}
export default ViewProfile;
