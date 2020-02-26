import React from 'react';
import './EditAddress.css'
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
const EnterAddress=()=>{
    const handleSubmit=()=>{
        console.log('submited');
    }
    const handleChange=(target)=>{
console.log(target)
    }
    let values=0;
   let errors=false;
    let touched={
        name:false,
        MobileNumber:false,
        pin:false,
        locality:false,
        address:false,
        city:false,
        state:false,
        landmark:false,
        alternate:false

    };
return(
<div class="address">
    <div>
    <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="InputName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId="InputNumber">
              <Form.Label>Mobile Number</Form.Label>
              <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="MobileNumber"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Mobile Number
            </Form.Control.Feedback>
          </InputGroup>
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="InputPin">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                placeholder='PIN'
                value={values.pin}
                onChange={handleChange}
                isValid={touched.pin && !errors.pin}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId="InputLocality">
              <Form.Label>Locality</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Locality"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
         
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} md='12' controlId="InputAddress">
            <Form.Label>Address (Area and Street)</Form.Label>
            <Form.Control as="textarea" rows="3" />
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} md="6" controlId="InputCity">
            <Form.Label>City/District/Town</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your City
            </Form.Control.Feedback>
            </Form.Group>  
            <Form.Group as={Col} md='6' controlId="Input State">
            <Form.Label>State</Form.Label>
            <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            </Form.Control>
        </Form.Group>        
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="6" controlId="InputLandmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                placeholder='Landmark'
                value={values.landmark}
                onChange={handleChange}
                isValid={touched.landmark && !errors.landmark}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" controlId="InputAlternate">
              <Form.Label>Alternate Number</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Alternate Number"
              aria-describedby="inputGroupPrepend"
              required
            />
            
            </Form.Group>
          </Form.Row>
          <Button variant="warning" size='lg'>Delever to this Address</Button>
          </Form>     
    </div>
</div>     
          
)
}
export default EnterAddress;