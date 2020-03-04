import React from 'react';
import {  Container } from 'react-bootstrap';
import EnterAddress from '../components/checkout/EnterAddress';
import { useSelector } from 'react-redux';
const Profile=()=>{
  const userAddress=useSelector(state=>state.userLogin.address);
  return (
   <Container>
    <EnterAddress fullAddress={userAddress} />
   </Container>
  )
}
export default Profile;