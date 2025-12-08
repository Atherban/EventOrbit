import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClientDashboard = () => {
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
      <h1>Client Dashboard</h1>
      <p>Here client can browse services (you can add cards later).</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ClientDashboard;
