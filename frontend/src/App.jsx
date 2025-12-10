import React from 'react'
import { Route,Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Vendor_dashboard from './pages/vendor/Vendor_dashboard';
import Client_dashboard from './pages/client/Client_dashboard';
import MyBookings from './pages/client/MyBookings';

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/vendor/dashboard" element = {<Vendor_dashboard />}/>
      <Route path="/client/dashboard" element = {<Client_dashboard />}/>
      <Route path="/MyBookings" element= {<MyBookings />} />
      </Routes>
    </div>
  )
}

export default App 