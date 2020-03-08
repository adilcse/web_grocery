import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SellerHome from "../../containers/seller/SellerHome";
import SellerNav from "../../sections/header/SellerNav";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions/UserAction";
 const SellerUserRoutes=()=>{
    const dispatch=useDispatch();
    const LogoutButton=()=>{
        Logout(dispatch);
        return <Redirect to='/Home'/>
      }
  return(
      <div>
          <SellerNav/>
          <Switch>
          <Route path='/Logout' component={LogoutButton}/>
              <Route path='/dashbord' component={SellerHome}/>
          </Switch>
      </div>
  )  
}
export default SellerUserRoutes;