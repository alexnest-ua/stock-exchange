import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";
import ConnectionButton from "./Connection.jsx";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
        
          <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" />
            Stock-exchange
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Portfolio">
                  Portfolio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Contacts">
                  Contacts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/About">
                  About us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/SignUp">
                  Sign up
                </NavLink>
              </li>
              <li className="nav-item">
                <ConnectionButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;