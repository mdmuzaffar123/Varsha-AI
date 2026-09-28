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

export default function Sidebar({
  collapsed,
  onToggleCollapsed,
  onExpandSidebar,
  mobileOpen,
  onMobileClose,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (route) =>
    route === "/" ? location.pathname === "/" : location.pathname.startsWith(route);

  const handleNav = (route, e) => {
    e.stopPropagation(); // prevent collapsing event
    if (collapsed && onExpandSidebar) {
      onExpandSidebar(); // Expand sidebar full when clicking an option
    }
    navigate(route);
    if (onMobileClose) onMobileClose();
  };

  const handleSidebarClick = (e) => {
    e.stopPropagation(); // keep click inside sidebar from propagating to main content
    if (collapsed && onExpandSidebar) {
      onExpandSidebar(); // Expand when clicking anywhere on collapsed sidebar
    }
  };

  const handleLogoClick = (e) => {
    e.stopPropagation();
    if (onToggleCollapsed) {
      onToggleCollapsed();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={onMobileClose} />
      )}

      <aside
        className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${mobileOpen ? "sidebar--mobile-open" : ""}`}
        onClick={handleSidebarClick}
      >
        {/* Logo */}
        <div className="sidebar-logo" onClick={handleLogoClick} title={collapsed ? "Click to expand VarshaAI menu" : "Click to collapse"}>
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
                onClick={(e) => handleNav(route, e)}
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
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleCollapsed) onToggleCollapsed();
          }}
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
