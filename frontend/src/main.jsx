import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
      <App />
      <Toaster/>
  </StrictMode>
  </BrowserRouter>
);
