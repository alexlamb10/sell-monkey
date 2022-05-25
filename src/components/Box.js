import React, { useState, useEffect } from "react";
import axios from "axios";
import CompleteModal from "./CompleteModal";
import "./CSS/Box.css";
import { useAuth0 } from "@auth0/auth0-react";

function Box() {
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const baseURL = "";
  const { user } = useAuth0();

  useEffect(() => {
    let userId = user?.sub?.split("|")[1];
    // Get items that are active by the user
    function getItems() {
      axios
        .get(`${baseURL}/getListings/${userId}`)
        .then((res) => {
          console.log(res.data);
          setListings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getItems();
  }, [showModal, user?.sub]);

  async function deleteListing(e) {
    let userId = user?.sub?.split("|")[1];
    //Delete the item that is clicked
    let id = e.target.value;
    await axios.delete(`${baseURL}/deleteListing/${id}`).then((res) => {
      alert(res.data);
    });
    // Re-render listings that are active
    await axios
      .get(`${baseURL}/getListings/${userId}`)
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (listings.length === 0) {
    return (
      <div className="box-div">
        <h3>No Active Listings</h3>
        <CompleteModal setShowModal={setShowModal} showModal={showModal} />
      </div>
    );
  } else {
    return (
      <div className="box-div">
        <h1 className="box-h1">Your Listings</h1>
        <CompleteModal setShowModal={setShowModal} showModal={showModal} />
        {listings.map((item) => {
          return (
            <div key={item.item_id} className="listing">
              <div className="box-item-div">
                <img src={item.picture} alt="item" className="box-item-pic" />
                <h3>{item.product_name}</h3>
              </div>
              <div className="box-info-div">
                <p>${item.price}</p>
                <p>{item.description}</p>
                <p>{item.shipping}</p>
                <p>{item.category}</p>
                <button
                  className="btn"
                  value={item.item_id}
                  onClick={deleteListing}
                >
                  Delete
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
