import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PayButton from "./button/PayButton";
import PayModal from "./modal/PayModal";
import { PayModalHeader, PayModalBody, PayModalFooter } from "./modal/PayModal";

function CompletePayModal({ setShowModal, showModal, total, ids }) {
  const elements = useElements();
  const stripe = useStripe();
  const [paid, setPaid] = useState(false);
  const baseURL = ''

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paid === true) {
      return;
    } else if (paid === false) {
      setPaid(true)
      if (!stripe || !elements) {
        return;
      }
      const clientSecretResponse = await axios.post(`${baseURL}/create-payment-intent`, {
        total,
      });

      const clientSecret = clientSecretResponse.data.client_secret;

      const cardElement = elements.getElement(CardElement);
      console.log({ clientSecretResponse, clientSecret });
      console.log("card", cardElement);
      console.log("stripe", stripe);

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log("payment intent", paymentIntent);

      if (paymentIntent === undefined) {
        alert("Sorry, we were unable to process your payment.");
      } else if (paymentIntent.status === "succeeded") {
        // Update item as purchased
        ids.forEach((id) => {
          let { item_id } = id;
          axios.put(`${baseURL}/itemBought/${item_id}`);
        });

        ids.forEach((id) => {
          let { item_id } = id;
          axios.delete(`${baseURL}/deleteBought/${item_id}`);
        });

        alert(`Your payment for $${total} was successful.`);
      }
      setPaid(false)
      setShowModal(false);
      window.location.href = "/";
    }
  };

  return (
    <div>
      <PayButton onClick={() => setShowModal(true)}>Pay</PayButton>
      <PayModal show={showModal} setShow={setShowModal}>
        <PayModalHeader>
          <h2>Pay Now</h2>
        </PayModalHeader>
        <PayModalBody>
          <p style={{ textAlign: "justify" }}>
            <CheckoutForm />
          </p>
        </PayModalBody>
        <PayModalFooter>
          <PayButton paid={paid} onClick={handleSubmit}>
            Pay
          </PayButton>
        </PayModalFooter>
      </PayModal>
    </div>
  );
}

export default CompletePayModal;
