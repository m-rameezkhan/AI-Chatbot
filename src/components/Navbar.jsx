import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar({ type }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect to login
  };

  return (
    <nav className={`navbar ${type === "chat" ? "chat-navbar" : ""}`}>
      <h1 className="logo">PitchGen AI</h1>

      <div className="nav-links">
        {user && (
          <span className="user-email">
            {user.email}
          </span>
        )}

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/chat/1">Chat</Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
