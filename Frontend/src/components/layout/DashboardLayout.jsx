import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import HomeFooter from "../home/HomeFooter";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-shell">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="dashboard-main">
        <TopHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="dashboard-content">
          <Outlet />
          <HomeFooter />
        </main>
      </div>
    </div>
  );
}
