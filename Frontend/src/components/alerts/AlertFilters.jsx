import React from "react";
import { Filter, SlidersHorizontal, MapPin, Clock, CloudRain } from "lucide-react";
import "./AlertFilters.css";

const SEVERITIES = ["ALL", "CRITICAL", "HIGH", "MODERATE", "LOW"];
const WEATHER_TYPES = [
  "ALL",
  "Heavy Rain",
  "Thunderstorm",
  "Lightning",
  "Flood Risk",
  "Strong Wind",
];
const LOCATIONS = [
  "ALL",
  "Ranchi",
  "Raipur",
  "Patna",
  "Kolkata",
  "Delhi",
  "Mumbai",
];
const TIME_WINDOWS = ["Now", "Next 3 Hours", "Next 6 Hours", "Next 24 Hours"];

export default function AlertFilters({
  activeSeverity,
  onSeverityChange,
  activeWeather,
  onWeatherChange,
  activeLocation,
  onLocationChange,
  activeTime,
  onTimeChange,
}) {
  return (
    <div className="alert-filters-card">
      <div className="af-header-row">
        <div className="af-title-group">
          <SlidersHorizontal size={16} className="af-icon" />
          <span className="af-title">Alert Priority & Hazard Filters</span>
        </div>
        <button
          className="af-reset-btn"
          onClick={() => {
            onSeverityChange("ALL");
            onWeatherChange("ALL");
            onLocationChange("ALL");
            onTimeChange("Now");
          }}
        >
          Reset Filters
        </button>
      </div>

      <div className="af-grid">
        {/* Row 1: Priority Severity Pills */}
        <div className="af-filter-group">
          <label className="af-label">Severity Level:</label>
          <div className="af-pills-row">
            {SEVERITIES.map((sev) => (
              <button
                key={sev}
                className={`af-pill ${sev.toLowerCase()} ${
                  activeSeverity === sev ? "active" : ""
                }`}
                onClick={() => onSeverityChange(sev)}
              >
                {sev === "ALL" ? "All Priorities" : sev}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Weather Hazard Dropdown/Pills */}
        <div className="af-filter-group">
          <label className="af-label">Weather Hazard:</label>
          <div className="af-pills-row">
            {WEATHER_TYPES.map((wt) => (
              <button
                key={wt}
                className={`af-pill ${activeWeather === wt ? "active" : ""}`}
                onClick={() => onWeatherChange(wt)}
              >
                {wt === "ALL" ? "All Events" : wt}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Location Select */}
        <div className="af-filter-group flex-row-group">
          <div className="af-sub-group">
            <label className="af-label">Location:</label>
            <div className="af-select-wrap">
              <MapPin size={14} className="af-sel-icon" />
              <select
                className="af-select"
                value={activeLocation}
                onChange={(e) => onLocationChange(e.target.value)}
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "ALL" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="af-sub-group">
            <label className="af-label">Forecast Horizon:</label>
            <div className="af-select-wrap">
              <Clock size={14} className="af-sel-icon" />
              <select
                className="af-select"
                value={activeTime}
                onChange={(e) => onTimeChange(e.target.value)}
              >
                {TIME_WINDOWS.map((tw) => (
                  <option key={tw} value={tw}>
                    {tw}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
