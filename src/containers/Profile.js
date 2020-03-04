import React from 'react';
import {  Container } from 'react-bootstrap';
import EnterAddress from '../components/checkout/EnterAddress';
import { useSelector, useDispatch } from 'react-redux';
import {updateAddress} from '../redux/actions/CheckoutAction';
const Profile=()=>{
  const user=useSelector(state=>state.userLogin);
  const dispatch=useDispatch();
  const setValidAddress=(type,address)=>{
    console.log(address)
    updateAddress(user.userId,address,dispatch);
  }
  console.log(user.address)
  return (
   <Container>
    <EnterAddress fullAddress={user.address} setValidAddress={setValidAddress} buttonText='Update Address' />
   </Container>
  )
}
export default Profile;