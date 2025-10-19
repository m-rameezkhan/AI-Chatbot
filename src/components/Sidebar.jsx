import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ type = "dashboard", onSelectPitch }) {
  const { user } = useAuth();
  const [pitches, setPitches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || type !== "chat") return;

    const fetchPitches = async () => {
      const { data, error } = await supabase
        .from("pitches")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setPitches(data);
    };

    fetchPitches();
  }, [user, type]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this pitch?");
    if (!confirmed) return;

    const { error } = await supabase.from("pitches").delete().eq("id", id);
    if (error) console.error("Delete error:", error);
    else setPitches((prev) => prev.filter((p) => p.id !== id));
  };

  if (type === "chat") {
    return (
      <div className="sidebar chat-sidebar">
        <button className="new-pitch-btn" onClick={() => onSelectPitch("new")}>
          + New Pitch
        </button>
        <h3>My Pitches</h3>
        <ul className="pitch-list">
          {pitches.length === 0 && <li className="empty">No pitches yet.</li>}
          {pitches.map((p) => (
            <li key={p.id} className="pitch-item">
              <span
                className="pitch-name"
                onClick={() => onSelectPitch(p.id)}
              >
                {p.ai_response?.startupName || p.user_message}
              </span>
              <span
                className="delete-icon"
                onClick={() => handleDelete(p.id)}
                title="Delete pitch"
              >
                🗑️
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Dashboard Sidebar
  return (
    <div className="sidebar dashboard-sidebar">
      <h3>Menu</h3>
      <ul className="menu-list">
        <li>All Pitches</li>
        <li>New Pitch</li>
        <li>Export</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
