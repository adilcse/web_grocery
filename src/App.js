import React,{Suspense,lazy} from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { LoginStatus } from './redux/actions/UserAction';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Loading from './components/Loading';
import Nav from './sections/header/Nav';
const Home = lazy(() => import('./containers/Home'));
const SearchPage=lazy(()=>import('./containers/SearchPage'));

const Signin=lazy(()=>import('./containers/Signin'));
const Product=lazy(()=>import('./containers/Product'));
const Cart=lazy(()=>import('./containers/Cart'));
const Checkout=lazy(()=>import('./containers/Checkout'));
const MyOrders=lazy(()=>import('./containers/MyOrders'));
const Profile=lazy(()=>import('./containers/Profile'));

function App() {


  let dispatch = useDispatch();
  dispatch(LoginStatus());
  const Logout=()=>{
    return <Redirect to='/Home'/>
  }
  return (
    <Router>
    
      <div className="App text-center">
      <Suspense fallback={<Loading size={100}/>}>
        <Nav/>
      </Suspense>
          <Switch>
            <Suspense fallback={<Loading size={100}/>}>
              <Route path='/Home' component={Home} />
           
            <Route path='/About'>
              <h2>about</h2>
            </Route>
          
             <Route path='/Search/:id' component={SearchPage}/>
           
           
            <Route path='/signin' component={Signin}/>
            
           
              <Route path='/cart' component={Cart}/>
          
          
            <Route path='/myOrder' component={MyOrders}/>
            <Route path='/Profile' component={Profile}/>
            
            <Route path='/Checkout/:from' component={Checkout}/>
              
            <Route path='/Logout'>
              <Logout/>
            </Route>
          
            <Route path='/Product/:id' component={Product}/>
          
            <Route path='/' exact={true}>
          
                <Home/>
           
            </Route>
          </Suspense>
          </Switch>  
       
      </div>
 
    </Router>
  );
}

export default App
