import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from '@/assets/context/UserContext'; // Ispravan put do UserProvider-a

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>  {/* Omotaj App u UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
