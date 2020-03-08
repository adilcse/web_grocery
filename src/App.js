import React,{Suspense,lazy, useState} from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoginStatus } from './redux/actions/UserAction';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Loading from './components/Loading';
const SellerLogin = lazy(()=>import('./containers/seller/SellerLogin'));
const HomeUserRoutes=lazy(()=>import('./app/routes/HomeUserRoutes'));
const SellerUserRoutes=lazy(()=>import('./app/routes/SellerUserRoutes'));
/**
 * main component which contain all route
 */
function App() {
  let dispatch = useDispatch();
  const [statusLoaded,setStatusLoaded]=useState(false)
  const userType=useSelector(state=>state.userLogin.userType);
  if(!statusLoaded){
    LoginStatus(dispatch);
    setStatusLoaded(true)
  }
  return (
  <Router>
    
     <Suspense fallback={<Loading size={100}/>}>
    {userType!=='2'?<HomeUserRoutes/>:<SellerUserRoutes/>}
    <Switch>
      <Route path='/seller' component={SellerLogin}/>
    </Switch>
    </Suspense>
  
  </Router>
            
       
  );
}

export default App
