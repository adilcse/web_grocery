import React from 'react';
import './Nav.css';
import { IoIosHome,IoIosList,IoMdPeople } from "react-icons/io";
import {NavLink} from 'react-router-dom';
import Search from '../../components/Search';
import LoginLogout from '../../components/nav/LoginLogout';
import NavCart from '../../components/nav/NavCart';
import NavCatagory from '../../components/nav/NavCatagory';
const MyNavbar = ()=>{

  let collapse = true;
    const toggle=()=>{
      if(collapse){
        document.getElementById("navbarSupportedContent").style.display = 'block';        
      }else{
        document.getElementById("navbarSupportedContent").style.display = 'none';
      }
      collapse = !collapse;

    }
    return(    
<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  <NavCatagory/>
  <Search/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={toggle} data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
     
      <li className="nav-item">
        <NavLink className="nav-link" to="/Home">Home <IoIosHome/></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/myOrder">My Order  <IoIosList/></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile">Profile <IoMdPeople/></NavLink>
      </li>
      <NavCart/>
      <LoginLogout/>
      
    </ul>
  </div>
</nav>
    )
   
}
export default MyNavbar;