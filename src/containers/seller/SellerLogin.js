import React from 'react';
import Login from '../../components/signin/Login';
import { useSelector } from 'react-redux';
import { USER_TYPE_MARCHANT } from '../../app/constants';
import { Redirect } from 'react-router';
const SellerLogin=()=>{
    const user=useSelector(state=>state.userLogin);
    if(user.loggedIn && user.userType!==USER_TYPE_MARCHANT){
        return(
        <div className='text-center'>
       <h1> Sorry!!! you are not a seller...</h1>
            <Login hideSignup={true}/> 
        </div> 
        )
    }else if(!user.loggedIn){
        return(
            <div className='mt-3'>
                <Login hideSignup={true}/>
            </div>
        )
    }else{
        return <Redirect to='/seller/dashbord'/>
    }
}
export default SellerLogin;