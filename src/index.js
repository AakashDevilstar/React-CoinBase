import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Context_crypto from './Context_crypto';
import "react-alice-carousel/lib/alice-carousel.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Context_crypto>
      <App />
    </Context_crypto>
  // </React.StrictMode>
);
