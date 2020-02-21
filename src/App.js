import React from 'react';
import './App.css';
import ProductCards from './components/productCard/ProductCards';
import Nav from './sections/header/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './containers/Home';
import SearchPage from './containers/SearchPage';
import Signin from './containers/Signin';
function App() {
  return (
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
          </Switch>    
      </div>
    </Router>
  );
}

export default App
