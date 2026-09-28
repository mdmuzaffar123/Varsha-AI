import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, CloudRain, Radio, Cpu, Bell,
  BarChart2, FileText, BookOpen, Settings,
  Droplets, ChevronLeft, ChevronRight, X
} from "lucide-react";
import heroBg from "../../assets/images/hero_bg.jpg";
import "./Sidebar.css";

const navItems = [
  { label: "Home",      route: "/",          icon: Home       },
  { label: "Forecast",  route: "/forecast",  icon: CloudRain  },
  { label: "DNR Radar", route: "/dnr-radar", icon: Radio      },
  { label: "AI Models", route: "/ai-models", icon: Cpu        },
  { label: "Alerts",    route: "/alerts",    icon: Bell       },
  { label: "Compare",   route: "/compare",   icon: BarChart2  },
  { label: "Reports",   route: "/reports",   icon: FileText   },
  { label: "Learn",     route: "/learn",     icon: BookOpen   },
  { label: "Settings",  route: "/settings",  icon: Settings   },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route) =>
    route === "/" ? location.pathname === "/" : location.pathname.startsWith(route);

  const handleNav = (route) => {
    navigate(route);
    if (onMobileClose) onMobileClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={onMobileClose} />
      )}

      <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${mobileOpen ? "sidebar--mobile-open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Droplets size={20} color="#20C7D9" />
          </div>
          {!collapsed && (
            <div className="sidebar-logo-text">
              <span className="slg-name">Varsha</span>
              <span className="slg-ai">AI</span>
            </div>
          )}

          {/* Mobile close */}
          <button className="sidebar-mobile-close" onClick={onMobileClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {navItems.map(({ label, route, icon: Icon }) => {
            const active = isActive(route);
            return (
              <button
                key={route}
                className={`sidebar-item ${active ? "sidebar-item--active" : ""}`}
                onClick={() => handleNav(route)}
                title={collapsed ? label : undefined}
              >
                <span className="sidebar-item-icon"><Icon size={18} /></span>
                {!collapsed && <span className="sidebar-item-label">{label}</span>}
                {collapsed && <span className="sidebar-tooltip">{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop) */}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>

        {/* Scenic image card */}
        {!collapsed && (
          <div className="sidebar-scenic" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="sidebar-scenic-overlay" />
            <p className="sidebar-scenic-text">
              Data for a<br />
              Stronger &<br />
              Safer India
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
