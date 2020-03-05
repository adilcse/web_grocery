import React from "react";
import { IconContext } from "react-icons/lib/cjs";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";


const NavCatagory=()=>{
   
    const catagories=useSelector(state=>state.CatagoryReducer.item);
console.log(catagories);
return(
    <div className="nav-depart ">
    <div className="depart-btn row">
        
        
        <span>All Catagories</span>                    
          <ul className="depart-hover text-center">
              {catagories.map((item,index)=>{
                  return  <li key={index}><NavLink to={`/catagories/${item.data.id}`}>{item.data.name}</NavLink></li>
              })}
          </ul>
          <IconContext.Provider  value={{ style: {marginLeft:'10px' },size : '1.1em' }}>
              <IoIosArrowDown/>
          </IconContext.Provider>
      </div>
  </div>
)
}
export default NavCatagory;
