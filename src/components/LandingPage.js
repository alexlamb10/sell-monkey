import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import storeLogo from './storeLogo.png'
import IsLoading from "./IsLoading";


function LandingPage() {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className="landing-page pages">
      <div className="landing-page-company">
        <img src={storeLogo} alt="store" />
        <h1>Welcome to Sell Monkey</h1>
      </div>

      <div className="landing-page-info">
        <p>
          A great place to sell anything that you no longer want or need, as
          well as buy items from other users. It's an easy way to buy and sell
          without a subscription.
        </p>
        <button className="btn main-auth" onClick={() => loginWithRedirect()}>
          Begin your experience!
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
