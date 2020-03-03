import React, { useState } from 'react';
import './EditAddress.css'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import {INPUT_NUMBER, INPUT_NAME, INPUT_PIN, INPUT_LANDMARK, INPUT_LOCALITY, INPUT_ADDRESS, INPUT_CITY, INPUT_STATE, INPUT_ALTERNATE} from '../../app/constants';
//keeps track of thee field touched
let touched={
  name:false,
  mobile:false,
  pin:false,
  locality:false,
  address:false,
  city:false,
  state:false,
  landmark:false,
  alternate:false

};
//keeps track of the feilds having error
let errors={
  name:true,
  mobile:true,
  pin:true,
  locality:true,
  address:true,
  city:true,
  state:true,
  landmark:false,
  alternate:false

};
//rex for all fields
const regex={
  name:/^[a-zA-Z ]{3,}$/,
  mobile:/^[0-9]{10}$/,
  address:/^[0-9a-zA-Z\-, \n]{3,}$/,
  pin:/^[0-9]{6}$/,
  locality:/^[0-9a-zA-Z\-, ]{3,}$/,
  city:/^[a-zA-Z\-, ]{3,}$/,
  alternate:/^[ ]{1}|[0-9]{10}$/

}
const EnterAddress=(props)=>{
  const {fullAddress}=props;
  const [name,setName]=useState(fullAddress?fullAddress.name:'');
  const [number,setNumber]=useState(fullAddress?fullAddress.mobile:'')
  const [pin,setPin]=useState(fullAddress?fullAddress.pin:'')
  const [locality,setLocality]=useState(fullAddress?fullAddress.locality:'')
  const [address,setAddress]=useState(fullAddress?fullAddress.address:'')
  const [city,setCity]=useState(fullAddress?fullAddress.city:'')
  const [state,setState]=useState(fullAddress?fullAddress.state:'1')
  const [landmark,setLandmark]=useState(fullAddress?fullAddress.lsndmark:'')
  const [alternate,setAlternate]=useState(fullAddress?fullAddress.alternate:' ')
  const [updated,setUpdated]=useState(true);
  const [changed,setChanged]=useState(false);
  
  //when submit button is clicked it handles
    const handleSubmit=()=>{
      let correct=true;
     Object.keys(errors).forEach((key,index)=>{
        touched[key]=true;
        if(errors[key])
          correct=false;
     });
     if(correct)
        deleverToThisAddress();
     setUpdated(!updated);
    }
    //if entered data is correct it send user to next page
    const deleverToThisAddress=()=>{
      let fullAddress={
        name:name,
        mobile:number,
        locality:locality,
        pin:pin,
        address:address,
        city:city,
        state:state,
        landmark:landmark,
        alternate:alternate
      }
      console.log(fullAddress);
      props.setValidAddress(true,fullAddress);
    }
    const validate=(id,val,setFun)=>{
    touched[id]=true;
    if(id==='state'){
      if(val!==1)
      errors[id]=false;
    else
      errors[id]=true;
    }else{
      if(regex[id].test(val))
      errors[id]=false;
    else
      errors[id]=true;

    }
    setFun(val);
    }
   
    //when user types something it checks for input validation
    const handleChange=(element)=>{
      let val=element.target.value;
      switch(element.target.id){
        case INPUT_NAME:
          validate('name',val,setName);
          break;
        case INPUT_NUMBER:
          validate('mobile',val,setNumber)
          break;
        case INPUT_PIN:
          validate('pin',val,setPin)
          break;  
        case INPUT_LOCALITY:
          validate('locality',val,setLocality)
          break;    
        case INPUT_ADDRESS:
          validate('address',val,setAddress)
          break;  
        case INPUT_CITY:
          validate('city',val,setCity)
          break;            
        case INPUT_STATE:
          validate('state',val,setState)
          break;         
        case INPUT_LANDMARK:
          touched.landmark=true;
          errors.landmark=false;
            setLandmark(val);
          break;
        case INPUT_ALTERNATE:
          validate('alternate',val,setAlternate)
          break;   
          default:
            return;            
          
      }
    }
    if(!changed && fullAddress){
      validate('name',fullAddress.name,setName);
      validate('address',fullAddress.address,setAddress);
      validate('mobile',fullAddress.mobile,setNumber);
      validate('pin',fullAddress.pin,setPin);
      validate('locality',fullAddress.locality,setLocality);
      validate('city',fullAddress.city,setCity);
      validate('alternate',fullAddress.alternate,setAlternate);
      validate('state',fullAddress.state,setState)
      setChanged(true);
    }
  
return(
<div className="address">
    <div>
    <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId={INPUT_NAME}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Name"
                value={name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type='invalid'>Please Enter valid Name</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId={INPUT_NUMBER}>
              <Form.Label>Mobile Number</Form.Label>
              <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="MobileNumber"
              value={number}
              onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              isValid={touched.mobile && !errors.mobile}
              isInvalid={touched.mobile && errors.mobile}
              maxLength={10}
            
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Mobile Number
            </Form.Control.Feedback>
          </InputGroup>
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId={INPUT_PIN}>
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                placeholder='PIN'
                value={pin}
                onChange={handleChange}
                isValid={touched.pin && !errors.pin}
                isInvalid={touched.pin && errors.pin}
                maxLength={6}
              />
              <Form.Control.Feedback type='invalid'>Please Enter correct pin code</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId={INPUT_LOCALITY}>
              <Form.Label>Locality</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Locality"
              aria-describedby="inputGroupPrepend"
              value={locality}
              onChange={handleChange}
              isValid={touched.locality && !errors.locality}
              isInvalid={touched.locality && errors.locality}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
         
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} md='12' controlId={INPUT_ADDRESS}>
            <Form.Label>Address (Area and Street)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows="3"
              value={address}
              onChange={handleChange}
              isValid={touched.address && !errors.address}
              isInvalid={touched.address && errors.address}
               />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} md="6" controlId={INPUT_CITY}>
            <Form.Label>City/District/Town</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={handleChange}
              isValid={touched.city && !errors.city}
              isInvalid={touched.city && errors.city}
              
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your City
            </Form.Control.Feedback>
            </Form.Group>  
            <Form.Group as={Col} md='6' controlId={INPUT_STATE}>
            <Form.Label>State</Form.Label>
            <Form.Control as="select" 
              value={state}
              onChange={handleChange}
              isValid={touched.state && !errors.state}
              isInvalid={touched.state && errors.state}
              >
            <option value='1'>---SELECT STATE---</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
        </Form.Group>        
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="6" controlId={INPUT_LANDMARK}>
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                placeholder='Landmark (Optional)'
                value={landmark}
                onChange={handleChange}
                isValid={touched.landmark && !errors.landmark}
                isInvalid={touched.landmark && errors.landmark}
                maxLength={20}
              />
              <Form.Control.Feedback type='invalid'>Enter valid landmark</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId={INPUT_ALTERNATE}>
              <Form.Label>Alternate Number</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Alternate Number"
              aria-describedby="inputGroupPrepend"
              value={alternate}
              onChange={handleChange}
              isValid={touched.alternate && !errors.alternate}
              isInvalid={touched.alternate && errors.alternate}
              maxLength={10}
            
            />
             <Form.Control.Feedback type='invalid'>Enter valid number (Optional)</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button variant="warning" size='lg' onClick={handleSubmit}>Delever to this Address</Button>
          </Form>     
    </div>
</div>     
          
)
}
export default EnterAddress;