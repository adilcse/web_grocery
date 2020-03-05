import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { AiFillCaretRight } from 'react-icons/ai';
const ViewProfile=(props)=>{

return(
    <Col className="border" lg="5">
    <Row>
    <Form className="text-left">
      <Form.Label>Mobile no.</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly placeholder="Mobile no." ></Form.Control>
      <Form.Label>Pincode</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly placeholder="Pincode" ></Form.Control>
      <Form.Label>Locality</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly placeholder="Locality" ></Form.Control>
      <Form.Label>City/Distict/Town</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly placeholder="City/Distic/Town" ></Form.Control>
      <Form.Label>State</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly placeholder="State" ></Form.Control>
      <Form.Label>Address</Form.Label>
      <Form.Control style={{marginBottom:"20px"}} className="border-bottom" plaintext readOnly placeholder="Address" ></Form.Control>
    </Form>
    </Row>
    <Row className="text-left" style={{marginBottom:"20px"}}>
    <Button variant="secondary" size="lg" block onClick={()=>props.showPayment(!props.status)}>Payment Option <AiFillCaretRight/></Button>
    </Row>
  </Col>
)
}
export default ViewProfile;
