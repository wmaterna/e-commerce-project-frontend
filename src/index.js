import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from "./components/contextComponents/Cart";
import {UserContextProvider} from "./components/contextComponents/userContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <UserContextProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </UserContextProvider>
    </div>

);

reportWebVitals();
