import React, {useContext, useMemo, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import HomePage from "./screens/HomePage";
import ShopPage from "./screens/ShopPage";
import PaymentsPage from "./screens/PaymentsPage";
import CartPage from "./screens/CartPage";
import LogIn from "./screens/LogIn";
import UserScreen from "./screens/UserScreen";
import PaymentDetails from "./screens/PaymentDetails";
// import {CartProvider} from "./components/contextComponents/Cart";


function App() {

    const [cart, setCart] = useState(null);
    const value = useMemo(() => ({ cart, setCart }), [cart, setCart]);

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
                      <Route path="/user/info" element={<UserScreen />} />
                        <Route path="/payments-details" element={<PaymentDetails />} />
              </Routes>
      </Router>
          </div>

  );
}

export default App;
