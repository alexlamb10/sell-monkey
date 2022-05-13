import React, { useState, useEffect } from "react";
import axios from "axios";
import AddListing from "./button/AddListing";
import Modal from "./modal/Modal";
import { ModalHeader, ModalFooter, ModalBody } from "./modal/Modal";
import "./CSS/Box.css";

function Box({ userId }) {
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Get items that are active by the user
    axios
      .get(`/getListings/${userId}`)
      .then((res) => {
        console.log(res.data);
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  async function deleteListing(e) {
    //Delete the item that is clicked
    let id = e.target.value;
    await axios.delete(`/deleteListing/${id}`).then((res) => {
      alert(res.data);
    });
    // Re-render listings that are active
    await axios
      .get(`/getListings/${userId}`)
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (listings.length === 0) {
    return (
      <div>
        <h3>No Active Listings</h3>
        <AddListing onClick={() => setShowModal(true)}>
          Add Item for sale
        </AddListing>
        <Modal setShow={setShowModal} show={showModal}>
          <ModalHeader>
            <h2>Modal Header</h2>
          </ModalHeader>
          <ModalBody style={{ textAlign: "justify" }}>
            This is some filler text
          </ModalBody>
          <ModalFooter>
            <AddListing onClick={() => setShowModal(false)}>
              Add Item
            </AddListing>
          </ModalFooter>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="box-div">
        <h1 className="box-h1">Your Listings</h1>
        <AddListing onClick={() => setShowModal(true)}>
          Add Item for sale
        </AddListing>
        <Modal setShow={setShowModal} show={showModal}>
          <ModalHeader>
            <h2>Modal Header</h2>
          </ModalHeader>
          <ModalBody style={{ textAlign: "justify" }}>
            This is some filler text
          </ModalBody>
          <ModalFooter>
            <AddListing onClick={() => setShowModal(false)}>
              Add Item
            </AddListing>
          </ModalFooter>
        </Modal>
        {listings.map((item) => {
          return (
            <div key={item.item_id} className="listing">
              <div className="box-item-div">
                <img src={item.picture} alt="item" />
                <h3>{item.product_name}</h3>
              </div>
              <div className="box-info-div">
                <p>{item.price}</p>
                <p>{item.description}</p>
                <p>{item.shipping}</p>
                <p>{item.category}</p>
                <button value={item.item_id} onClick={deleteListing}>
                  Delete Listing
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Box;
