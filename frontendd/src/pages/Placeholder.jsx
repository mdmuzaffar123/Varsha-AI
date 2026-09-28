import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import "./Placeholder.css";

export default function Placeholder() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.pathname
    .replace("/", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase()) || "Page";

  return (
    <div className="placeholder-page">
      <div className="placeholder-card">
        <div className="placeholder-icon">
          <Construction size={40} color="#1677FF" />
        </div>
        <h1 className="placeholder-title">{name}</h1>
        <p className="placeholder-desc">
          This page is coming soon in the next development phase.
        </p>
        <button className="btn btn-primary placeholder-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    </div>
  );
}
