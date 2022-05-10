import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Box from "./Box";
import { useAuth0 } from "@auth0/auth0-react";

function Listings() {
  const { isAuthenticated, user } = useAuth0();
  const [userId, setId] = useState("");

  useEffect(() => {
    let id = user?.sub?.split("|")[1];

    setId(id);
  }, [user?.sub, userId]);

  if (!isAuthenticated) {
    window.location.href = "/";
  } else {
    return (
      <div>
        <NavBar />
        <div className="pages listings-page">
          <Box userId={userId} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Listings;
