import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./CSS/Box.css";

function Shop() {
  const [listings, setListings] = useState([]);
  const [cat, setCat] = useState("");
  const [tempCat, setTempCat] = useState("");
  const { user } = useAuth0();
  const baseURL = "";

  useEffect(() => {
    // If the category is empty return all the listings
    if (cat === "") {
      axios
        .get(`${baseURL}/listings`)
        .then((res) => {
          setListings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If category is not empty only return listings for that category
      axios
        .get(`${baseURL}/getFilteredListings/${cat}`)
        .then((res) => {
          setListings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [cat]);

  // On Submit change category to category from Select Tag
  function filterItems() {
    setCat(tempCat);
  }

  //On button click add item to cart using the userId from auth0 and the item_id on the button
  function addToCart(e) {
    let item = e.target.value;
    let id = user?.sub?.split("|")[1];

    axios
      .post(`${baseURL}/addToCart`, { item: item, id: id })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="all-listings-page">
      <div className="filter">
        {/* On Select tag change hold category on state */}
        <select onChange={(e) => setTempCat(e.target.value)}>
          <option value="select">Select</option>
          <option value="Electronics">Electronics</option>
          <option value="Sporting Goods">Sporting Goods</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={filterItems}>Submit</button>
      </div>
      <div className="all-listings">
        {/* When Listings are returned display in boxes */}
        {listings.map((item) => {
          return (
            <div key={item.item_id} className="single-listing-home">
              <img src={item.picture} alt="item" className="item-pic" />
              <h3>{item.product_name}</h3>
              <p>Description: {item.description}</p>
              <p>{item.shipping}</p>
              <div className="add-cart-div">
                <p>${item.price}</p>
                <button
                  onClick={addToCart}
                  value={item.item_id}
                  className="add-cart-btn btn"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;
