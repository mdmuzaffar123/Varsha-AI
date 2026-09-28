import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, Menu, X, ChevronDown, Droplets } from "lucide-react";
import { navLinks, searchSuggestions } from "../../data/homeData";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Ranchi, Jharkhand");
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const filtered = searchSuggestions.filter(s =>
    s.label.toLowerCase().includes(searchVal.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <div className="header-logo" onClick={() => navigate("/")}>
          <div className="logo-icon">
            <Droplets size={22} color="#20C7D9" />
          </div>
          <div className="logo-text">
            <span className="logo-name">Varsha</span>
            <span className="logo-ai">AI</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {navLinks.map(link => (
            <button
              key={link.label}
              className={`nav-link ${location.pathname === link.route ? "active" : ""}`}
              onClick={() => handleNav(link.route)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div className="header-right">
          <div className="search-wrap" ref={searchRef}>
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search location..."
              value={searchVal}
              onChange={e => { setSearchVal(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && searchVal && (
              <div className="search-dropdown">
                {filtered.length > 0 ? filtered.map(s => (
                  <button
                    key={s.value}
                    className="search-item"
                    onClick={() => {
                      setSelectedLocation(s.label);
                      setSearchVal(s.label);
                      setShowSuggestions(false);
                    }}
                  >
                    {s.label}
                  </button>
                )) : <div className="search-no-result">No locations found</div>}
              </div>
            )}
          </div>

          <button className="icon-btn" aria-label="Notifications">
            <Bell size={18} />
            <span className="notif-dot" />
          </button>

          <div className="user-avatar">M</div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-search">
            <Search size={16} />
            <input placeholder="Search location..." value={searchVal} onChange={e => setSearchVal(e.target.value)} />
          </div>
          {navLinks.map(link => (
            <button
              key={link.label}
              className={`mobile-nav-link ${location.pathname === link.route ? "active" : ""}`}
              onClick={() => handleNav(link.route)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
