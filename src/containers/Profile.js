import React,{useState} from 'react';
import {  Container, Row, Col, Image, Tabs, Tab} from 'react-bootstrap';
import EnterAddress from '../components/checkout/EnterAddress';
import { useSelector, useDispatch } from 'react-redux';
import {updateAddress} from '../redux/actions/CheckoutAction';
import ViewProfile from '../components/profile/ViewProfile';
import ErrorMessage from '../app/helper/ErrorMessage';
document.title='Profile';
const Profile=()=>{

  const [showPayment, setShowPayment] = useState(false);
  const [currentTab,setCurrentTab]=useState('viewAddress')
  const user=useSelector(state=>state.userLogin);
  const emptyAddress={
    address:'',
    city:'',
    mobile:'',
    locality:'',
    state:'',
    pin:''
  }
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
  
  if(user.loggingIn){
    return(
      <div className='text-center'>
        <h2>
          Please Login First...
        </h2>
      </div>
    )
  }
  else if(!user.loggedIn){
    return(
      <div>
        <ErrorMessage isError={true} message='Please Login First'></ErrorMessage>
      </div>
    )
  }
  return (
      <Container>
         <Tabs defaultActiveKey="viewAdress" id="addressTab" activeKey={currentTab} onSelect={k=>setCurrentTab(k)}>
            <Tab eventKey="viewAddress" title="View Address">
             
            <Row >
              <Col className="border" lg="3">
                <Row className="justify-content-center">
              <Image  src="https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg" style={{ height:"100px", width: "100px"}} alt="Image" roundedCircle />
              </Row>
              <Row className="justify-content-center"><h3>{user.name}</h3></Row>
  <Row className="justify-content-center"><h4>{user.userName}</h4></Row>
              </Col>
            <ViewProfile showPayment={setShowPayment} status={showPayment} fullAddress={user.address?user.address:emptyAddress}/>
              <Col className="border" lg="4">
                {viewPayment()}
              </Col>
            </Row>
         
            </Tab>
            <Tab eventKey="enterAddress" title="Enter Address">
            <EnterAddress fullAddress={user.address} setValidAddress={setValidAddress} buttonText='Update Address' />
            </Tab>
            
        </Tabs>
        </Container>
  )}
export default Profile;