import React,{Suspense,lazy} from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoginStatus } from './redux/actions/UserAction';
import {
  BrowserRouter as Router
} from "react-router-dom";

import HomeUserRoutes from './app/routes/HomeUserRoutes';
import SellerUserRoutes from './app/routes/SellerUserRoutes';


function App() {
  let dispatch = useDispatch();
  LoginStatus(dispatch);
  const userType=useSelector(state=>state.userLogin.userType);
  return (
  <Router>
    {userType!=='2'?<HomeUserRoutes/>:<SellerUserRoutes/>}
  </Router>
            
       
  );
}

export default App
