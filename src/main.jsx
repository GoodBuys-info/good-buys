// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/styles/custom-bootstrap.scss';
import 'aos/dist/aos.css';
import AOS from 'aos';

// AOS.init();

AOS.init({
  duration: 800,
  once: true,
  easing: "ease-in-out",
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
