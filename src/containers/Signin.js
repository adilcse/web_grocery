import React,{useState} from 'react';
import { Card } from 'semantic-ui-react';
import Login from '../components/signin/Login';
import Register from '../components/signin/Register';
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router';
const Signin=()=>{
    const [page,setPage]=useState('login');
    let current;
    const user = useSelector((state)=>state.userLogin);
    if(page==='login'){
        current =<Login change={setPage}/> 
    }else{
        current =  <Register change={setPage}/>
    }
    if(user.loggedIn){
        return <Redirect to="/Home"/>
    }
    
return(
    
       <div className="container">
        <div className="row">
			<div className="col-md-5 mx-auto mt-5">
			{current}
			 
		</div>
      </div> 
      </div> 
  
)
}
export default Signin;