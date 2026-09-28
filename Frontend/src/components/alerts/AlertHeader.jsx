import React, { useState } from "react";
import { MapPin, Bell, RefreshCw, CheckCircle2 } from "lucide-react";
import { ALERT_LOCATIONS } from "../../data/alertData";
import "./AlertHeader.css";

export default function AlertHeader({
  selectedLocation,
  onLocationChange,
  onRefresh,
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 700);
  };

  return (
    <div className="alert-header">
      {/* Left: Title & Subtitle */}
      <div className="ah-text-group">
        <div className="ah-title-row">
          <h1 className="ah-title">Weather Alerts</h1>
          <span className="ah-demo-badge" title="Illustrative demonstration dashboard for SIH 2026">
            <span className="ah-badge-dot" />
            <span>Demo Monitoring</span>
          </span>
        </div>
        <p className="ah-subtitle">
          AI-powered early-warning insights from rainfall, storm, lightning and weather intelligence.
        </p>
      </div>

      {/* Right: Controls (Location, Notifications, Refresh) */}
      <div className="ah-controls-group">
        {/* Location Selector */}
        <div className="ah-select-wrapper">
          <MapPin size={15} className="ah-select-icon" />
          <select
            className="ah-select"
            value={selectedLocation}
            onChange={(e) => onLocationChange && onLocationChange(e.target.value)}
          >
            {ALERT_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Notification Icon Button */}
        <button
          className="ah-btn-icon"
          title="Notification Center (Active)"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="ah-bell-dot" />
        </button>

        {/* Refresh Button */}
        <button
          className={`ah-btn-refresh ${isRefreshing ? "spin" : ""}`}
          onClick={handleRefreshClick}
          title="Refresh Alert Analysis Feed"
        >
          <RefreshCw size={15} />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}
