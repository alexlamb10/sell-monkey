import React from "react";
import PayButton from "./button/PayButton";
import PayModal from "./modal/PayModal";
import { PayModalHeader, PayModalBody, PayModalFooter } from "./modal/PayModal";

function CompletePayModal({ setShowModal, showModal }) {
  return (
    <div>
      <PayButton onClick={() => setShowModal(true)}>Pay</PayButton>
      <PayModal show={showModal} setShow={setShowModal}>
        <PayModalHeader>
          <h2>Pay Now</h2>
        </PayModalHeader>
        <PayModalBody>
          <p style={{ textAlign: "justify" }}>This is some text</p>
        </PayModalBody>
        <PayModalFooter>
          <PayButton onClick={() => setShowModal(false)}>Pay</PayButton>
        </PayModalFooter>
      </PayModal>
    </div>
  );
}

export default CompletePayModal;
