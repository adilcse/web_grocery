import React from 'react';
const Register = (props)=>{
    return(
        <div id="second">
			      <div className="myform form ">
                        <div className="logo mb-3">
                           <div className="col-md-12 text-center">
                              <h1 >Signup</h1>
                           </div>
                        </div>
                        <form action="#" name="registration">
                           <div className="form-group">
                              <label for="exampleInputEmail1">First Name</label>
                              <input type="text"  name="firstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter Firstname"/>
                           </div>
                           <div className="form-group">
                              <label for="exampleInputEmail1">Last Name</label>
                              <input type="text"  name="lastname" className="form-control" id="lastname" aria-describedby="emailHelp" placeholder="Enter Lastname"/>
                           </div>
                           <div className="form-group">
                              <label for="exampleInputEmail1">Email address</label>
                              <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                           </div>
                           <div className="form-group">
                              <label for="exampleInputEmail1">Password</label>
                              <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                           </div>
                           <div className="col-md-12 text-center mb-3">
                              <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Get Started</button>
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