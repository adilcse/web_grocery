import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import { Redirect } from 'react-router';
import Login from './Login';
import Register from './Register';
const LoginRegister=(props)=>{
    const [page,setPage]=useState('login');
    let current;
    
    const user = useSelector((state)=>state.userLogin);
    if(page==='login'){
        current =<Login change={setPage}/> 
    }else{
        current =  <Register change={setPage}/>
    }
    if(user.loggedIn){
        if(props.from==='home')
             return <Redirect to="/Home"/>
    }
    
return( 
         <div className='text-center'>
		    {current}	 
		</div>
  
)
}
export default LoginRegister;