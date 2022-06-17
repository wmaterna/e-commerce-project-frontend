import React, { useContext } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./screens/HomePage";
import ShopPage from "./screens/ShopPage";
import PaymentsPage from "./screens/PaymentsPage";
import CartPage from "./screens/CartPage";
import LogIn from "./screens/LogIn";


function App() {


  return (
          <div>
              <Router>
              <Navbar />
              <Routes path="/" >
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/shop" element={<ShopPage/>} />
                  <Route path="/payments" element={<PaymentsPage/>} />
                  <Route path="/card" element={<CartPage/>} />
              </Routes>
      </Router>
          </div>

  );
}

export default App;
