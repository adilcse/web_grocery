import React,{useState} from 'react';
import { Card } from 'semantic-ui-react';
import Login from '../components/signin/Login';
import Register from '../components/signin/Register';

const Signin=()=>{
    const [page,setPage]=useState('login');
    let current;
    if(page==='login'){
        current =<Login change={setPage}/> 
    }else{
        current =  <Register change={setPage}/>
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