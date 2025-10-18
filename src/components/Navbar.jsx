import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ type = "dashboard" }) {
  return (
    <nav className={`navbar ${type === "chat" ? "chat-navbar" : ""}`}>
      <h1 className="logo">PitchGen AI</h1>
      <div className="nav-links">
        {type === "dashboard" ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/chat/1">Chat</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Back to Dashboard</Link>
          </>
        )}
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
