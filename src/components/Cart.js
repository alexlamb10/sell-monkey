import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./CSS/Cart.css";

function Cart() {
  const { isAuthenticated, user } = useAuth0();
  const [price, setPrice] = useState([]);
  const [items, setItems] = useState([]);
  let id = user?.sub?.split("|")[1];

  let arr = [];
  let priceArr = [];
  async function fetchData() {
    // Get ids for all the items in the cart_items table
    const res = await axios.get(`/getIds/${id}`);

    // Get the item info from ids received above
    for (let i = 0; i < res.data.length; i++) {
      let id = res.data[i]["item_id"];
      const results = await axios.get(`/getCartItem/${id}`);
      arr.push(results.data[0]);
      priceArr.push(results.data[0].price);
    }
    setPrice(priceArr);
    await setItems(arr);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function deleteCartItem(e) {
    let id = e.target.value;
    await axios.delete(`/deleteCartItem/${id}`).then((res) => {
      alert(res.data);
    });
    await fetchData();
  }

  let total = price.reduce((a, b) => {
    return a + b;
  }, 0);

  if (!isAuthenticated) {
    window.location.href = "/";
  } else {
    return (
      <div>
        <NavBar />
        <div className="pages ">
          <h1 className="cart">Your Cart:</h1>
          <div className="cart-page-div">
            <div className="cart-items">
              {items.map((item) => {
                return (
                  <div key={item.item_id} className="single-cart-item">
                    <div className="cart-div">
                      <img src={item.picture} alt="item-pic" />
                      <p>{item.product_name}</p>
                    </div>
                    <div className="cart-div">
                      <p>{item.price}</p>
                      <p>{item.description}</p>
                      <p>{item.category}</p>
                      <button
                        value={item.item_id}
                        className="btn remove"
                        onClick={deleteCartItem}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="payment">
              <p>
                <strong>Total: </strong> {total}
              </p>
              <button>Pay Now</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Cart;
