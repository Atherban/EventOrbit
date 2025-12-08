import React from 'react'
import { Route,Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Vendor_dashboard from './pages/vendor/Vendor_dashboard';
import Client_dashboard from './pages/client/client_dashboard';

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/vendor/dashboard" element = {<Vendor_dashboard />}/>
      <Route path="/client/dashboard" element = {<Client_dashboard />}/>
      </Routes>
    </div>
  )
}

export default App