import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LandingPage from "./LandingPage";
import Shop from "./Shop";
import IsLoading from "./IsLoading";

const HomePage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isAuthenticated) {
    return (
      <div className="pages">
        <Shop />
      </div>
    );
  } else {
    return <LandingPage />;
  }
};

export default HomePage;
