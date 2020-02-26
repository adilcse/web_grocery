import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Register as RegisterWithFirebase } from '../../redux/actions/UserAction'
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
const Register = (props)=>{
   const dispatch=useDispatch();
   const [showMessage,setShowMessage]=useState(false);
   const user=useSelector(state=>state.userLogin);
      const validateField=()=>{

   }
   if(user.userId){
      return <Redirect to='/'/>
   }
   const handelSubmit=()=>{
      let name=document.getElementById('firstname').value;
      let email=document.getElementById('email').value;
      let password=document.getElementById('password').value;
      let cpassword=document.getElementById('cpassword').value;
      if(password===cpassword){
         dispatch(RegisterWithFirebase(name,email,password))
      }
     
   //   dispatch(RegisterWithFirebase())
   }
   const ErrorMessage=(message)=>{
      if(showMessage)
      return(
      <Alert variant='danger' onClose={()=>setShowMessage(false)} dismissible >
          <Alert.Heading>{message}</Alert.Heading>
     </Alert>
      )
      else 
         return <></>
   }
    return(

        <div id="second">
           <ErrorMessage/>
			      <div className="myform form ">
                        <div className="logo mb-3">
                           <div className="col-md-12 text-center">
                              <h1 >Signup</h1>
                           </div>
                        </div>
                        <form action="#" name="registration">
                           <div className="form-group">
                              <label htmlFor="firstname">Name</label>
                              <input type="text"  name="firstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter Firstname"/>
                           </div>
                           <div className="form-group">
                              <label htmlFor="email">Email address</label>
                              <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                           </div>
                           <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                           </div>
                           <div className="form-group">
                              <label htmlFor="cpassword">Confirm Password</label>
                              <input type="password" name="cpassword" id="cpassword"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Confirm Password"/>
                           </div>
                           <div className="col-md-12 text-center mb-3">
                              <button type='button' className=" btn btn-block mybtn btn-primary tx-tfm" onClick={handelSubmit}>Get Started</button>
                           </div>
                           <div className="col-md-12 ">
                              <div className="form-group">
                                 <p className="text-center"><button className="btn bg-warning" onClick={()=>props.change('login')}>Already have an account?</button></p>
                              </div>
                           </div>
                     
                        </form>
                    </div>
			</div>
    )
}
export default Register;