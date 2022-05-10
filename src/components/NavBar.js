import React from "react";
import AuthenticationButton from "./button/authentication-button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import storeLogo from './storeLogo.png'

function NavBar() {
  return (
    <div className="header">
      <Link to="/" className="logo-header">
        <img src={storeLogo} alt="logo" className="nav-logo" />
      </Link>
      <div className="links">
        <Link to="/" className="link-tag">
          <h4>Home</h4>
        </Link>
        <Link to="/listings" className="link-tag">
          <h4>Your Listings</h4>
        </Link>
        <Link to="/cart" className="link-tag">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>

        <AuthenticationButton />
      </div>
    </div>
  );
}

export default NavBar;
