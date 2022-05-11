import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./CSS/Box.css";

function Shop() {
  const [listings, setListings] = useState([]);
  const [cat, setCat] = useState("");

  useEffect(() => {
    if (cat === "") {
      axios
        .get(`/getListings`)
        .then((res) => {
          console.log(res.data);
          setListings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`/getFilteredListings/${cat}`)
        .then((res) => {
          console.log(res.data);
          setListings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cat]);

  return (
    <div className="all-listings">
      {listings.map((item) => {
        return (
          <div key={item.item_id} className="single-listing-home">
            <img src={item.picture} alt="item" />
            <h3>{item.product_name}</h3>
            <p>{item.description}</p>
            <p>{item.shipping}</p>
            <p>{item.category}</p>
            <div className="add-cart-div">
              <p>{item.price}</p>
              <FontAwesomeIcon icon={faCartPlus} className="add-cart" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Shop;
