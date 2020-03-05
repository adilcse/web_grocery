import React,{useState} from 'react';
import {  Container, Row, Col,Nav, Image,Form, Button} from 'react-bootstrap';
import EnterAddress from '../components/checkout/EnterAddress';
import { useSelector, useDispatch } from 'react-redux';
import {updateAddress} from '../redux/actions/CheckoutAction';
import { AiFillCaretRight } from "react-icons/ai";

const Profile=()=>{
  const [showTab, setShowTab] = useState(false);
  const user=useSelector(state=>state.userLogin);
  const dispatch=useDispatch();
  const setValidAddress=(type,address)=>{
    console.log(address)
    updateAddress(user.userId,address,dispatch);
  }
  console.log(user.address)
  return (
      <Container>
        <Row>
        <Nav variant="pills" defaultActiveKey="#home">
  <Nav.Item>
    {showTab && <Nav.Link href="#home" onClick={() => setShowTab(!showTab)}>Go back to your Profile</Nav.Link>}
  </Nav.Item>
  <Nav.Item>
    {!showTab && <Nav.Link onClick={() => setShowTab(!showTab)}>Want to edit Profile</Nav.Link>}
  </Nav.Item>
</Nav>
    </Row>
    {showTab && <Row>
    <EnterAddress fullAddress={user.address} setValidAddress={setValidAddress} buttonText='Update Address' />
    </Row>}
      {!showTab && <Row>
        <Container className="border">
          <Row >
            <Col className="border" lg="3">
              <Row className="justify-content-center">
            <Image  src="https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg" style={{ height:"100px", width: "100px"}} alt="Image" roundedCircle />
            </Row>
            <Row className="justify-content-center"><h3>UserName</h3></Row>
            <Row className="justify-content-center"><h4>UserName@mailid.com</h4></Row>
            </Col>
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
              <Button variant="secondary" size="lg" block>Payment Option <AiFillCaretRight/></Button>
              </Row>
            </Col>
            <Col className="border" lg="4">
              
            </Col>
          </Row>
        </Container>
        </Row>}
    </Container>
   
  )
}
export default Profile;