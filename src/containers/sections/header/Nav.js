import React from 'react';
import './Nav.css';
import { IoIosArrowDown,IoIosHome,IoIosList,IoMdPeople,IoIosCart } from "react-icons/io";
import { IconContext } from "react-icons";
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
  <div className="nav-depart ">
    <div className="depart-btn row">
        
        
        <span>All Catagories</span>                    
          <ul className="depart-hover text-center">
              <li className="active"><a href="#">Grosary</a></li>
              <li><a href="#">Vegitable</a></li>
              <li><a href="#">Fruit</a></li>
              <li><a href="#">Snacks</a></li>
          
          </ul>
          <IconContext.Provider  value={{ style: {marginLeft:'10px' },size : '1.1em' }}>
              <IoIosArrowDown/>
          </IconContext.Provider>
      </div>
  </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={toggle} data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <IoIosHome/> <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">My Order  <IoIosList/></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Profile <IoMdPeople/></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Cart <IoIosCart/> </a>
      </li>
    
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
    )
}
export default MyNavbar;