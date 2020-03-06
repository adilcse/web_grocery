import React, { lazy, Suspense } from "react";
import Loading from "../../components/Loading";
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Nav from "../../sections/header/Nav";
import Catagory from '../../containers/Catagory';
import SellerLogin from "../../containers/seller/SellerLogin";
import { useDispatch } from "react-redux";
import { Logout as LogoutAction} from "../../redux/actions/UserAction";
const Home = lazy(() => import('../../containers/Home'));
const SearchPage=lazy(()=>import('../../containers/SearchPage'));
const Signin=lazy(()=>import('../../containers/Signin'));
const Product=lazy(()=>import('../../containers/Product'));
const Cart=lazy(()=>import('../../containers/Cart'));
const Checkout=lazy(()=>import('../../containers/Checkout'));
const MyOrders=lazy(()=>import('../../containers/MyOrders'));
const Profile=lazy(()=>import('../../containers/Profile'));

const HomeUserRoutes=()=>{
    const dispatch=useDispatch();
    const Logout=()=>{
        LogoutAction(dispatch);
        return <Redirect to='/Home'/>
      }
return(

      <div className="App text-center">
        <Nav/>
          <Switch>
            <Suspense fallback={<Loading size={100}/>}>
                <Route path='./seller' component={SellerLogin}/>
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
 
)
}
export default HomeUserRoutes;