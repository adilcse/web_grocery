import React,{useState} from 'react';
import {  Container, Row, Col,Nav, Image,Form, Button, Tabs, Tab} from 'react-bootstrap';
import EnterAddress from '../components/checkout/EnterAddress';
import { useSelector, useDispatch } from 'react-redux';
import {updateAddress} from '../redux/actions/CheckoutAction';
import { AiFillCaretRight } from "react-icons/ai";
import ViewProfile from '../components/profile/ViewProfile';

const Profile=()=>{
  const [showPayment, setShowPayment] = useState(false);
  const user=useSelector(state=>state.userLogin);
  const dispatch=useDispatch();
  const setValidAddress=(type,address)=>{
    updateAddress(user.userId,address,dispatch);
  }
  const viewPayment=()=>{
    if(showPayment){
      return(
        <>
        This is Payment
        </>
      )}
      else{
        return(
          <></>
        )
      }
    
  }
  return (
      <Container>
         <Tabs defaultActiveKey="gpsAddress" id="addressTab">
            <Tab eventKey="gpsAddress" title="Use my Location">
              <Container>
            <Row >
              <Col className="border" lg="3">
                <Row className="justify-content-center">
              <Image  src="https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg" style={{ height:"100px", width: "100px"}} alt="Image" roundedCircle />
              </Row>
              <Row className="justify-content-center"><h3>UserName</h3></Row>
              <Row className="justify-content-center"><h4>UserName@mailid.com</h4></Row>
              </Col>
            <ViewProfile showPayment={setShowPayment} status={showPayment}/>
              <Col className="border" lg="4">
                {viewPayment()}
              </Col>
            </Row>
          </Container>
            </Tab>
            <Tab eventKey="enterAddress" title="Enter Address">
            <EnterAddress fullAddress={user.address} setValidAddress={setValidAddress} buttonText='Update Address' />
            </Tab>
            
        </Tabs>
        </Container>
  )}
export default Profile;