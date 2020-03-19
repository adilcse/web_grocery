import React from 'react';
import { NavLink } from 'react-router-dom';

const Signout = ()=>{

    return(
        <li className="nav-item">
        <NavLink className="nav-link" to="/Logout">Logout </NavLink>
      </li>
    )
}
export default Signout;