import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  MapPin,
  Star,
  MessageCircle,
  LogOut,
} from "lucide-react";
import "./Client_dashboard.css";

const API_BASE = "http://localhost:3000";

const CATEGORIES = [
  "All",
  "Photography",
  "Catering",
  "Decoration",
  "Venue",
  "Makeup",
  "Other",
];

const Client_dashboard = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isChatOpen, setIsChatOpen] = useState(false);

  // logout
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
      navigate("/");
    }
  };

  // fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${API_BASE}/api/services`, {
          withCredentials: true,
        });

        console.log("Services from backend:", res.data);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load services. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // filtered services (frontend filtering)
  const filteredServices = services.filter((service) => {
    const matchesSearch = searchTerm
      ? (service.title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (service.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      : true;

    const matchesCity = cityFilter
      ? (service.city || "")
          .toLowerCase()
          .includes(cityFilter.toLowerCase())
      : true;

    const matchesCategory =
      selectedCategory === "All"
        ? true
        : (service.title || "").toLowerCase() ===
          selectedCategory.toLowerCase();

    return matchesSearch && matchesCity && matchesCategory;
  });

  return (
    <div className="client-dashboard">
      {/* NAVBAR */}
      <header className="cd-navbar">
        <div className="cd-navbar-left">
          <span className="cd-logo">EventOrbit</span>
          <nav className="cd-nav-links">
            <button className="cd-nav-link active">Discover</button>
            <button className="cd-nav-link" onClick={()=> navigate("/MyBookings")}>My Bookings</button>
            <button className="cd-nav-link">Favourites</button>
          </nav>
        </div>

        <div className="cd-navbar-right">
          <span className="cd-user-chip">Client</span>
          <button className="cd-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* HERO / SEARCH SECTION */}
      <section className="cd-hero">
        <div className="cd-hero-text">
          <h1>Find the perfect vendor for a service</h1>
          <p>
            Browse trusted vendors for weddings, parties, corporate events
            and more. 
          </p>
        </div>

        <div className="cd-search-panel">
          <div className="cd-search-group">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search services (e.g. photographer, catering)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="cd-search-group">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="City (e.g. Indore, Bhopal)"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="cd-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cd-category-pill ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* MAIN CONTENT */}
      <main className="cd-main">
        {loading && <p className="cd-status">Loading services...</p>}
        {error && <p className="cd-status cd-error">{error}</p>}

        {!loading && !error && filteredServices.length === 0 && (
          <p className="cd-status">No services found. Try changing filters.</p>
        )}

        <div className="cd-service-grid">
          {filteredServices.map((service) => (
            <div key={service._id} className="cd-service-card">
              <div className="cd-service-header">
                <h3>{service.title}</h3>
                <span className="cd-category-tag">
                  {service.category || "Service"}
                </span>
              </div>

              <p className="cd-service-description">
                {service.description || "No description provided."}
              </p>

              <div className="cd-service-meta">
                <span>
                  <MapPin size={14} /> {service.city || "NA"}
                </span>
                <span>
                  <Star size={14} /> {service.rating}
                </span>
              </div>

              <div className="cd-service-footer">
                <div>
                  <p className="cd-price">
                    {service.price
                      ? `₹${service.price.toLocaleString()}`
                      : "Price on request"}
                  </p>
                  <p className="cd-vendor">
                    By {service.vendorName || "Vendor"}
                  </p>
                </div>

                <button className="cd-contact-btn">
                  Contact Vendor
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FLOATING CHAT BUTTON */}
      <button
        className="cd-chat-fab"
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        <MessageCircle size={22} />
      </button>

      {/* SIMPLE CHAT PANEL (placeholder) */}
      {isChatOpen && (
        <div className="cd-chat-panel">
          <div className="cd-chat-header">
            <span>Support Chat</span>
            <button onClick={() => setIsChatOpen(false)}>×</button>
          </div>
          <div className="cd-chat-body">
            <p>
              This is for chat.
            </p>
          </div>
          <div className="cd-chat-input-row">
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Client_dashboard;
