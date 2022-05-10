import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";

function Cart() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    window.location.href = "/";
  } else {
    return (
      <div>
        <NavBar />
        <Footer />
      </div>
    );
  }
}

export default Cart;
