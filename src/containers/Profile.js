import React from 'react';
import ProductCards from '../components/productCard/ProductCards';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
const Profile=()=>{
  return (
    <Form style={{margin:'10px 20px 10px 20px'}} noValidate >
          <Form.Row>
            <Form.Group as={Col} md="6" >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Name"
                // value={name}
                // onChange={handleChange}
                // isValid={touched.name && !errors.name}
                // isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type='invalid'>Please Enter valid Name</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" >
              <Form.Label>Mobile Number</Form.Label>
              <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="MobileNumber"
              // value={number}
              // onChange={handleChange}
              aria-describedby="inputGroupPrepend"
              // isValid={touched.mobile && !errors.mobile}
              // isInvalid={touched.mobile && errors.mobile}
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
            <Form.Group as={Col} md="6" >
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                placeholder='PIN'
                // value={pin}
                // onChange={handleChange}
                // isValid={touched.pin && !errors.pin}
                // isInvalid={touched.pin && errors.pin}
                maxLength={6}
              />
              <Form.Control.Feedback type='invalid'>Please Enter correct pin code</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" >
              <Form.Label>Locality</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Locality"
              aria-describedby="inputGroupPrepend"
              // value={locality}
              // onChange={handleChange}
              // isValid={touched.locality && !errors.locality}
              // isInvalid={touched.locality && errors.locality}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
         
            </Form.Group>
           
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} md='12' >
            <Form.Label>Address (Area and Street)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows="3"
              // value={address}
              // onChange={handleChange}
              // isValid={touched.address && !errors.address}
              // isInvalid={touched.address && errors.address}
               />
            <Form.Control.Feedback type="invalid">
              Please Enter Your Locality
            </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col} md="6" >
            <Form.Label>City/District/Town</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              // value={city}
              // onChange={handleChange}
              // isValid={touched.city && !errors.city}
              // isInvalid={touched.city && errors.city}
              
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Your City
            </Form.Control.Feedback>
            </Form.Group>  
            <Form.Group as={Col} md='6' >
            <Form.Label>State</Form.Label>
            <Form.Control as="select" 
              // value={state}
              // onChange={handleChange}
              // isValid={touched.state && !errors.state}
              // isInvalid={touched.state && errors.state}
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
            <Form.Group as={Col} md="6" >
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                placeholder='Landmark (Optional)'
                // value={landmark}
                // onChange={handleChange}
                // isValid={touched.landmark && !errors.landmark}
                // isInvalid={touched.landmark && errors.landmark}
                maxLength={20}
              />
              <Form.Control.Feedback type='invalid'>Enter valid landmark</Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group as={Col} md="6" >
              <Form.Label>Alternate Number</Form.Label>
              
            <Form.Control
              type="text"
              placeholder="Alternate Number"
              aria-describedby="inputGroupPrepend"
              // value={alternate}
              // onChange={handleChange}
              // isValid={touched.alternate && !errors.alternate}
              // isInvalid={touched.alternate && errors.alternate}
              maxLength={10}
            
            />
             <Form.Control.Feedback type='invalid'>Enter valid number (Optional)</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button variant="secondary" size='lg' onClick>Edit Address</Button>
          </Form>
  )
}
export default Profile;