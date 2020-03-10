import React,{Suspense,lazy, useState} from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { LoginStatus } from './redux/actions/UserAction';
import {
  BrowserRouter as Router
} from "react-router-dom";
import Loading from './components/Loading';
import GpsAddress from './components/checkout/GpsAddress';

const HomeUserRoutes=lazy(()=>import('./app/routes/HomeUserRoutes'));

/**
 * main component which contain all route
 */
function App() {
  let dispatch = useDispatch();
  const [statusLoaded,setStatusLoaded]=useState(false)
  if(!statusLoaded){
    LoginStatus(dispatch);
    setStatusLoaded(true)
  }
  return (
  <Router>
      <Suspense fallback={<Loading size={100}/>}>
       <HomeUserRoutes/>
      </Suspense>
    </Router>
  );
}

export default App
