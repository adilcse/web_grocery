import React, { lazy, Suspense } from "react";
import Loading from "../../components/Loading";
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import { useDispatch } from "react-redux";
import { Logout as LogoutAction} from "../../redux/actions/UserAction";
import Nav from "../../sections/header/Nav";
import { getUserLocation } from "../../redux/actions/LocationAction";

 import Footer from "../../sections/footer/Footer";

import 'rc-footer/assets/index.css'; 
const Catagory=lazy(()=>import('../../containers/Catagory'));
const Home = lazy(() => import('../../containers/Home'));
const SearchPage=lazy(()=>import('../../containers/SearchPage'));
const Signin=lazy(()=>import('../../containers/Signin'));
const Product=lazy(()=>import('../../containers/Product'));
const Cart=lazy(()=>import('../../containers/Cart'));
const Checkout=lazy(()=>import('../../containers/Checkout'));
const MyOrders=lazy(()=>import('../../containers/MyOrders'));
const Profile=lazy(()=>import('../../containers/Profile'));
let loaded=false;
/**
 * router component loaded add the container which is needed
 * it user lazy loader for loading the components
 */
const HomeUserRoutes=()=>{
    const dispatch=useDispatch();
    document.title='welcome';
    if(!loaded){
        loaded=true;
    getUserLocation(dispatch);
    
  }


    const Logout=()=>{
        LogoutAction(dispatch);
        return <Redirect to='/Home'/>
      }
      
return(

      <div className="App text-center">
     
        <Nav/>
        <div style={{minHeight:'600px'}}>
          <Switch>
            <Suspense fallback={<Loading size={100}/>}>
                <Route path='/Home' component={Home} />
                <Route path='/Search/:id' component={SearchPage}/>
                <Route path='/signin' component={Signin}/>
                <Route path='/cart' component={Cart}/>
                <Route path='/myOrder' component={MyOrders}/>
                <Route path='/Profile' component={Profile}/>
                <Route path='/Checkout/:from' component={Checkout}/> 
                <Route path='/Logout' component={Logout}/>
                <Route path='/Product/:id' component={Product}/>
                <Route path='/catagories/:cat' component={Catagory}/>
                <Route path='/' exact={true} component={Home}/>
            </Suspense>
        </Switch> 
        </div>
        <Footer/>
      </div>
 
)
}
export default HomeUserRoutes;