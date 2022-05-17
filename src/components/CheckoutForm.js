import React from "react";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function CheckoutForm() {
  // const elements = useElements();
  // const stripe = useStripe();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   const clientSecretResponse = await axios.post("/create-payment-intent", {});

  //   const clientSecret = clientSecretResponse.data.client_secret;

  //   const cardElement = elements.getElement(CardElement);
  //   console.log({ clientSecretResponse, clientSecret });
  //   console.log("card", cardElement);
  //   console.log("stripe", stripe);

  //   const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement),
  //     },
  //   });

  //   console.log("payment intent", paymentIntent);
  // };

  return (
    <form >
      <CardElement />
      {/* <button>Pay</button> */}
    </form>
  );
}

export default CheckoutForm;
