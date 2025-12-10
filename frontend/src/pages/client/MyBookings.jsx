import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  LogOut,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import "./MyBookings.css";

const API_BASE = "http://localhost:3000";

const statusLabel = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch bookings for current client
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_BASE}/api/bookings/my`, {
          withCredentials: true,
        });

        console.log("Bookings from backend:", res.data);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load bookings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      navigate("/login");
    }
  };

  const openWhatsApp = (phone) => {
    if (!phone) return;
    const normalized = phone.replace(/\D/g, ""); // keep digits only
    window.open(`https://wa.me/91${normalized}`, "_blank");
  };

  return (
    <div className="cb-root">
      {/* NAVBAR (similar style to dashboard) */}
      <header className="cb-navbar">
        <div className="cb-navbar-left">
          <button
            className="cb-back-btn"
            onClick={() => navigate("/client/dashboard")}
          >
            <ArrowLeft size={16} />
            <span>Back to Discover</span>
          </button>

          <span className="cb-logo">EventOrbit</span>
        </div>

        <div className="cb-navbar-right">
          <span className="cb-user-chip">Client</span>
          <button className="cb-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section className="cb-header">
        <div>
          <h1>My Bookings</h1>
          <p>
            View and manage all your event bookings. Contact vendors directly
            from here.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="cb-main">
        {loading && <p className="cb-status">Loading bookings...</p>}
        {error && <p className="cb-status cb-error">{error}</p>}

        {!loading && !error && bookings.length === 0 && (
          <p className="cb-status">
            You don&apos;t have any bookings yet. Explore services and make
            your first booking.
          </p>
        )}

        <div className="cb-bookings-grid">
          {bookings.map((booking) => {
            const status = booking.status || "pending";
            const label = statusLabel[status] || status;
            const dateText = booking.date
              ? new Date(booking.date).toLocaleDateString()
              : "Date not set";

            return (
              <div key={booking._id} className="cb-card">
                {/* Top: Service + Status */}
                <div className="cb-card-header">
                  <div>
                    <h3>{booking.serviceTitle || "Service"}</h3>
                    <p className="cb-card-sub">
                      {booking.category || "Category not specified"}
                    </p>
                  </div>
                  <span className={`cb-status-pill cb-status-${status}`}>
                    {label}
                  </span>
                </div>

                {/* Middle: Date, Time, City */}
                <div className="cb-card-row">
                  <span>
                    <Calendar size={14} /> {dateText}
                  </span>
                  {booking.timeSlot && (
                    <span className="cb-time-slot">
                      {booking.timeSlot}
                    </span>
                  )}
                </div>

                <div className="cb-card-row">
                  <span>
                    <MapPin size={14} /> {booking.city || "City not set"}
                  </span>
                  {booking.price && (
                    <span className="cb-price">
                      ₹{booking.price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Vendor info */}
                <div className="cb-vendor-block">
                  <div>
                    <p className="cb-vendor-name">
                      {booking.vendorName || "Vendor"}
                    </p>
                    {booking.vendorRating && (
                      <p className="cb-vendor-rating">
                        <Star size={14} /> {booking.vendorRating} / 5
                      </p>
                    )}
                  </div>
                  <div className="cb-vendor-contact">
                    {booking.vendorPhone && (
                      <button
                        className="cb-contact-btn"
                        onClick={() =>
                          (window.location.href = `tel:${booking.vendorPhone}`)
                        }
                      >
                        <Phone size={14} />
                        Call
                      </button>
                    )}
                    {booking.vendorEmail && (
                      <button
                        className="cb-contact-btn"
                        onClick={() =>
                          (window.location.href = `mailto:${booking.vendorEmail}`)
                        }
                      >
                        <Mail size={14} />
                        Email
                      </button>
                    )}
                    {booking.vendorPhone && (
                      <button
                        className="cb-contact-btn cb-contact-wa"
                        onClick={() => openWhatsApp(booking.vendorPhone)}
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </button>
                    )}
                  </div>
                </div>

                {/* Notes or extra info */}
                {booking.notes && (
                  <p className="cb-notes">
                    <strong>Notes:</strong> {booking.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;
