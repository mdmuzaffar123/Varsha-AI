import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell, Menu } from "lucide-react";
import { searchSuggestions } from "../../data/homeData";
import "./TopHeader.css";

const pageTitles = {
  "/":          { title: "Home",      subtitle: "Welcome to VarshaAI" },
  "/forecast":  { title: "Forecast",  subtitle: "Rainfall Forecast" },
  "/dnr-radar": { title: "DNR Radar", subtitle: "Live Doppler Radar" },
  "/ai-models": { title: "AI Models", subtitle: "EarthFormer & ConvNeXt-3D" },
  "/alerts":    { title: "Alerts",    subtitle: "Weather Risk Alerts" },
  "/compare":   { title: "Compare",   subtitle: "Location Comparison" },
  "/reports":   { title: "Reports",   subtitle: "Reports & Insights" },
  "/learn":     { title: "Learn",     subtitle: "Learning Resources" },
  "/settings":  { title: "Settings",  subtitle: "Platform Settings" },
};

export default function TopHeader({ onMenuClick }) {
  const location = useLocation();
  const [searchVal, setSearchVal] = useState("");
  const [showSugg, setShowSugg]   = useState(false);
  const searchRef = useRef(null);

  const page = pageTitles[location.pathname] || { title: "VarshaAI", subtitle: "" };

  const filtered = searchSuggestions.filter(s =>
    s.label.toLowerCase().includes(searchVal.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSugg(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="topheader">
      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="topheader-left">
        <button className="topheader-hamburger" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div className="topheader-breadcrumb">
          <span className="th-title">{page.title}</span>
          <span className="th-sub">{page.subtitle}</span>
        </div>
      </div>

      {/* Right: search + notif + avatar */}
      <div className="topheader-right">
        <div className="th-search-wrap" ref={searchRef}>
          <Search size={15} className="th-search-icon" />
          <input
            className="th-search-input"
            placeholder="Search location (e.g. Ranchi, Delhi)"
            value={searchVal}
            onChange={e => { setSearchVal(e.target.value); setShowSugg(true); }}
            onFocus={() => setShowSugg(true)}
          />
          {showSugg && searchVal && (
            <div className="th-search-dropdown">
              {filtered.length > 0 ? filtered.map(s => (
                <button
                  key={s.value}
                  className="th-search-item"
                  onClick={() => { setSearchVal(s.label); setShowSugg(false); }}
                >
                  {s.label}
                </button>
              )) : <div className="th-search-none">No locations found</div>}
            </div>
          )}
        </div>

        <button className="th-icon-btn" aria-label="Notifications">
          <Bell size={17} />
          <span className="th-notif-dot" />
        </button>

        <div className="th-avatar" title="Profile">M</div>
      </div>
    </header>
  );
}
