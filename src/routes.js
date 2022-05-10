import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import Listings from "./components/Listings";
import Shop from "./components/Home";
import Cart from "./components/Cart";

export default (
  <Router>
    <Routes>
      {/* <Route path='/' element={<Login />} /> */}
      <Route path="/listings" element={<Listings />} />
      <Route path="/" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>
);
