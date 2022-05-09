import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateListing from "./components/CreateListing";
import Shop from "./components/Shop";
import Cart from "./components/Cart";

export default (
    <Router>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/createListing' element={<CreateListing />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
        </Routes>
    </Router>
)