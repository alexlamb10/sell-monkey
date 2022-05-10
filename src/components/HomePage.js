import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LandingPage from "./LandingPage";
import Shop from "./Shop";

const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const id = user?.sub?.split("|")[1];

  if (isAuthenticated) {
    return (
      <div className="pages">
        <Shop />
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{id}</p>
        <h1>This worked!</h1>
      </div>
    );
  } else {
    return <LandingPage />;
  }
};

export default HomePage;
