import React from 'react';
import './App.css';
import ProductCards from './components/productCard/ProductCards';
import Nav from './sections/header/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './containers/Home';
import SearchPage from './containers/SearchPage';
import Signin from './containers/Signin';
import Start from './app/Start';
import Product from './containers/Product';
function App() {
  const Logout=()=>{
    return <Redirect to='/Home'/>
  }
  return (
    <Start>
    <Router>
      <div className="App text-center">
        <Nav/>
          <Switch>
            <Route path='/Home'>
                <Home/>
            </Route>
            <Route path='/About'>
              <h2>about</h2>
            </Route>
            <Route path='/Search/:id'>
             <SearchPage/>
            </Route>
            <Route path='/signin'>
              <Signin/>
            </Route>
            <Route path='/Logout'>
              <Logout/>
            </Route>
            <Route path='/Product/:id'>
              <Product/>
            </Route>
          </Switch>    
      </div>
    </Router>
    </Start>
  );
}

export default App
