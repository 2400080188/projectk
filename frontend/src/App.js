import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

// SVG icons
const ShieldIcon = () => (
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
    <path d="M10 15v-3.3c0-.9.7-1.7 1.6-1.9l7.2-2c.6-.2 1.3-.2 1.9 0l7.2 2c.9.2 1.6 1 1.6 1.9V15c0 7.2-4.8 13.5-11.2 15.4" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 21l3 3 6-6" stroke="#E63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
    <rect x="10" y="10" width="20" height="20" rx="3" fill="#1D8348"/>
    <rect x="14" y="22" width="4" height="8" rx="1" fill="#fff"/>
    <rect x="22" y="22" width="4" height="8" rx="1" fill="#fff"/>
    <rect x="14" y="14" width="12" height="6" rx="1" fill="#fff"/>
  </svg>
);
const WifiIcon = () => (
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
    <path d="M10 20c5-5 15-5 20 0" stroke="#3689E6" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 25c2.5-2.5 7.5-2.5 10 0" stroke="#3689E6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="31" r="2" fill="#3689E6"/>
  </svg>
);

export default function App() {
  // Authentication state
  const [users, setUsers] = useState([
    { username: "admin", password: "admin", role: "admin" }
  ]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [page, setPage] = useState("login");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogin = (username, password) => {
    const found = users.find((u) => u.username === username && u.password === password);
    if (found) {
      setToken(username);
      setRole(found.role);
      localStorage.setItem("token", username);
      localStorage.setItem("role", found.role);
      setPage("home");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = (username, password) => {
    if (users.some((u) => u.username === username)) {
      alert("User already exists");
      return;
    }
    setUsers([...users, { username, password, role: "user" }]);
    alert("Registered! You can now login.");
    setPage("login");
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setPage("login");
  };

  function Navbar() {
    return (
      <nav className="navbar" style={{ display: "flex", alignItems: "center", padding: "1rem", background: "#f7faff" }}>
        <span className="navbar-title" style={{ fontWeight: 700, fontSize: "1.3rem" }}>Smart City Vijayawada</span>
        <div style={{ flex: 1 }}></div>
        <button className="btn secondary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ marginRight: 8 }}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        {token && <button className="btn" onClick={() => setPage("home")} style={{ marginRight: 8 }}>Home</button>}
        {!token && <button className="btn" onClick={() => setPage("login")} style={{ marginRight: 8 }}>Login</button>}
        {!token && <button className="btn secondary" onClick={() => setPage("register")} style={{ marginRight: 8 }}>Register</button>}
        {role === "admin" && token && (
          <button className="btn" onClick={() => setPage("admin")} style={{ marginRight: 8 }}>Admin</button>
        )}
        {token && <button className="btn secondary" onClick={handleLogout}>Logout</button>}
      </nav>
    );
  }

  function VijayawadaMainPage() {
    return (
      <div className="app-landing" style={{ background: "#f7faff", minHeight: "100vh" }}>
        <header style={{ padding: "2rem 0 1rem 0", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.3rem", margin: 0, fontWeight: 700 }}>Smart City Vijayawada</h1>
          <div style={{ fontSize: "1.15rem", color: "#7687a0", marginTop: 12, marginBottom: 26 }}>
            Your Gateway to Vijayawada's Digital Infrastructure &amp; Public Services
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, margin: "2.4rem 0" }}>
            <div className="stat-card">
              <span style={{ color: "#3689E6", fontSize: 20 }}>👥</span>
              <div style={{ fontWeight: 700, fontSize: "1.3rem" }}>14.2 Lakhs</div>
              <div style={{ color: "#7687a0" }}>Population</div>
            </div>
            <div className="stat-card">
              <span style={{ color: "#3689E6", fontSize: 20 }}>📏</span>
              <div style={{ fontWeight: 700, fontSize: "1.3rem" }}>61.88 km²</div>
              <div style={{ color: "#7687a0" }}>Area</div>
            </div>
            <div className="stat-card">
              <BuildingIcon />
              <div style={{ fontWeight: 700, fontSize: "1.3rem" }}>150+</div>
              <div style={{ color: "#7687a0" }}>Public Services</div>
            </div>
            <div className="stat-card">
              <WifiIcon />
              <div style={{ fontWeight: 700, fontSize: "1.3rem" }}>50+</div>
              <div style={{ color: "#7687a0" }}>WiFi Zones</div>
            </div>
          </div>
        </header>

        <section style={{ textAlign: "center", margin: "3rem 0 2rem 0" }}>
          <h2 style={{ fontWeight: 700, fontSize: "2rem" }}>Smart City Services</h2>
          <div style={{ color: "#7687a0", maxWidth: 420, margin: "0 auto" }}>
            Discover the innovative services making Vijayawada a smart city
          </div>
        </section>
        <section style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24, maxWidth: 720, margin: "0 auto 2.5rem"
        }}>
          <div className="feature-card">
            <ShieldIcon />
            <div className="feature-title">Safety & Security</div>
            <div style={{ color: "#7687a0", margin: "10px 0" }}>
              CCTV surveillance and emergency response systems
            </div>
            <button className="link-btn">Learn More</button>
          </div>
          <div className="feature-card">
            <BuildingIcon />
            <div className="feature-title">Smart Buildings</div>
            <div style={{ color: "#7687a0", margin: "10px 0" }}>
              Energy-efficient infrastructure with automated systems
            </div>
            <button className="link-btn">Learn More</button>
          </div>
          <div className="feature-card">
            <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><rect x="9" y="14" width="22" height="10" rx="5" fill="#3689E6"/><rect x="12" y="18" width="16" height="4" rx="2" fill="#fff"/></svg>
            <div className="feature-title">Public Transport</div>
            <div style={{ color: "#7687a0", margin: "10px 0" }}>
              Real-time bus tracking and metro services across the city
            </div>
            <button className="link-btn">Learn More</button>
          </div>
          <div className="feature-card">
            <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" stroke="#F3C600" strokeWidth="4"/><path d="M20 12v8" stroke="#F3C600" strokeWidth="3" strokeLinecap="round"/><circle cx="20" cy="24" r="2" fill="#F3C600"/></svg>
            <div className="feature-title">Smart Lighting</div>
            <div style={{ color: "#7687a0", margin: "10px 0" }}>
              Energy-efficient LED street lights with automated control
            </div>
            <button className="link-btn">Learn More</button>
          </div>
          <div className="feature-card">
            <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="16" ry="10" stroke="#26A69A" strokeWidth="3"/><path d="M12 14c3.5 2 12.5 2 16 0" stroke="#26A69A" strokeWidth="2"/></svg>
            <div className="feature-title">Water Management</div>
            <div style={{ color: "#7687a0", margin: "10px 0" }}>
              24/7 water supply monitoring and quality control systems
            </div>
            <button className="link-btn">Learn More</button>
          </div>
          <div className="feature-card">
            <WifiIcon />
            <div className="feature-title">Free WiFi Zones</div>
            <div style={{ color: "#7687a0", margin: "10px 0" }}>
              Public WiFi hotspots in key areas and tourist locations
            </div>
            <button className="link-btn">Learn More</button>
          </div>
        </section>
        <section style={{
          background: "#f4f8fd",
          padding: "3rem 1rem 2.5rem 1rem",
          textAlign: "center"
        }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: 12
          }}>About Vijayawada Smart City</h2>
          <div style={{
            color: "#7687a0",
            maxWidth: 700,
            margin: "0 auto",
            fontSize: "1.12rem",
            marginBottom: 18,
            lineHeight: 1.6
          }}>
            Vijayawada, the commercial capital of Andhra Pradesh, is rapidly transforming into a smart city with cutting-edge technology and infrastructure. Our platform provides citizens with easy access to city services, real-time information, and tools to actively participate in making our city better. From smart transportation to efficient waste management, we're building a sustainable and connected urban ecosystem.
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 18 }}>
            {/* UPDATED BUTTON AND LINK */}
            <a
              className="btn secondary"
              href="https://www.google.com/maps/place/Vijayawada,+Andhra+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
            >
              View City Map
            </a>
            <button
              className="btn secondary"
              onClick={() => setPage("contact")}
            >
              Contact Support
            </button>
          </div>
        </section>
        <footer style={{
          background: "none",
          textAlign: "center",
          color: "#939fbb",
          fontSize: "1rem",
          padding: "1.2rem 0"
        }}>
          © 2025 Smart City Vijayawada. All rights reserved. <br />
          Building a better tomorrow today
        </footer>
      </div>
    );
  }

  function ContactPage() {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Contact Support</h2>
        <p>Email: support@smartvijayawada.com<br />Phone: +91 12345 67890</p>
        <button className="btn" onClick={() => setPage("home")}>Back to Home</button>
      </div>
    );
  }

  // Final render route switching
  return (
    <div className="app-main">
      <Navbar />
      {page === "login" && <Login onLogin={handleLogin} />}
      {page === "register" && <Register onRegister={handleRegister} />}
      {page === "home" && token && <VijayawadaMainPage />}
      {page === "contact" && token && <ContactPage />}
      {page === "admin" && role === "admin" && token && <AdminDashboard />}
    </div>
  );
}
