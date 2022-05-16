import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const stripePromise = loadStripe(
  "pk_test_51Kz9LUIRMmgzZo78COUBUeHbnscU4kYdQXtYGLkCZOpFXBeI5veH3BhUrQ5TExk5xaKrGJRO550WIZp11HLuEHuh00cmKMBw2x"
);

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Auth0Provider>,
  document.getElementById("root")
);
