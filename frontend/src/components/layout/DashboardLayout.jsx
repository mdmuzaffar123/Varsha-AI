import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import HomeFooter from "../home/HomeFooter";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true); // Default collapsed (showing logo icon)

  // Clicking on main website screen or content automatically collapses sidebar
  const handleContentClick = () => {
    if (!collapsed) {
      setCollapsed(true);
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(!collapsed)}
        onExpandSidebar={() => setCollapsed(false)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="dashboard-main" onClick={handleContentClick}>
        <TopHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="dashboard-content">
          <Outlet />
          <HomeFooter />
        </main>
      </div>
    </div>
  );
}
