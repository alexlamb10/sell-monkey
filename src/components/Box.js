import React, { useState, useEffect } from "react";
import axios from "axios";
import './CSS/Box.css'

function Box({ userId }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
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


  if (listings.length === 0) {
    return <h3>No Active Listings</h3>;
  } else {
    return (
      <div>
        <h1>Your Listings</h1>
        {listings.map((item) => {
          return (
            <div key={item.item_id} className='listing'>
              <img src={item.picture} alt="item" />
              <h3>{item.product_name}</h3>
              <p>{item.price}</p>
              <p>{item.description}</p>
              <p>{item.shipping}</p>
              <p>{item.category}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Box;
