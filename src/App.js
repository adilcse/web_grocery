import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductCards from './components/productCard/ProductCards';
import Nav from './containers/sections/header/Nav';
function App() {
  return (
    <div className="App text-center">
      <Nav/>
     <ProductCards/>
    </div>
  );
}

export default App;
