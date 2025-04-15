import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QRCodeProvider } from './context/QRCodeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QRCodeProvider>
      <App />
    </QRCodeProvider>
  </React.StrictMode>
);
