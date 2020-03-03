import React from 'react';
import Signout from './NavSignout';
import NavSignin  from "./NavSignin";
import {  useSelector} from 'react-redux';
const LoginLogout = ()=>{
    const user = useSelector((state)=>state.userLogin);
    if(user.loggedIn){
        return(
        <Signout/>
            )
    }else{
        return(<NavSignin/>)
    }  
}
export default LoginLogout;