import React from "react";
import AuthenticationButton from "./authentication-button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  return (
    <div className="header">
      <Link to="/" className="logo-header">
        <img src="../storeLogo.jpg" alt="logo" />
      </Link>
      <div className="links">
        <Link to="/" className="link-tag">
          <h4>Home</h4>
        </Link>
        <Link to="/createListing" className="link-tag">
          <h4>Create Listing</h4>
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
