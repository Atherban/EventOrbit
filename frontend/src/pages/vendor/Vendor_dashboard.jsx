import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Vendor Dashboard</h1>
      <p>Here vendor can manage services (add, edit, delete).</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default VendorDashboard;
