import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  ChevronDown,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  Cloud,
  Zap,
} from "lucide-react";
import { weatherTabs, timeFilterButtons, statesList, districtsList } from "../../data/forecastData";
import "./ForecastHeader.css";

const tabIconMap = {
  "cloud-rain": CloudRain,
  thermometer: Thermometer,
  wind: Wind,
  droplets: Droplets,
  cloud: Cloud,
  zap: Zap,
};

export default function ForecastHeader({
  activeTab,
  onTabChange,
  activeTimeFilter,
  onTimeFilterChange,
  selectedState,
  onStateChange,
  selectedDistrict,
  onDistrictChange,
  selectedDate,
  onDateChange,
}) {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  return (
    <div className="forecast-header-card">
      {/* Top row: Title + Selectors */}
      <div className="fheader-top">
        <div className="fheader-titles">
          <h1 className="fheader-main-title">
            {activeTab === "thunderstorm"
              ? "Thunderstorm Forecast"
              : activeTab === "lightning"
              ? "Lightning Activity Analysis"
              : activeTab === "temperature"
              ? "Temperature Forecast"
              : activeTab === "wind"
              ? "Wind Speed Forecast"
              : activeTab === "humidity"
              ? "Humidity Forecast"
              : activeTab === "cloudCover"
              ? "Cloud Cover Forecast"
              : "Rainfall Forecast"}
          </h1>
          <p className="fheader-subtitle">
            AI-powered predictions using DNR radar, satellite data and deep learning models
          </p>
        </div>

        {/* Right selector dropdowns */}
        <div className="fheader-selectors">
          {/* State selector */}
          <div className="fheader-dropdown-wrap">
            <button
              className="fheader-select-btn"
              onClick={() => {
                setShowStateDropdown(!showStateDropdown);
                setShowDistrictDropdown(false);
              }}
            >
              <span>{selectedState || "Jharkhand"}</span>
              <ChevronDown size={14} className="fheader-chevron" />
            </button>
            {showStateDropdown && (
              <div className="fheader-dropdown-menu">
                {statesList.map((st) => (
                  <button
                    key={st.id}
                    className={`fheader-dropdown-item ${selectedState === st.name ? "active" : ""}`}
                    onClick={() => {
                      onStateChange(st.name);
                      setShowStateDropdown(false);
                    }}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* District / City selector */}
          <div className="fheader-dropdown-wrap">
            <button
              className="fheader-select-btn"
              onClick={() => {
                setShowDistrictDropdown(!showDistrictDropdown);
                setShowStateDropdown(false);
              }}
            >
              <MapPin size={14} className="fheader-pin-icon" />
              <span>{selectedDistrict || "Ranchi"}</span>
              <ChevronDown size={14} className="fheader-chevron" />
            </button>
            {showDistrictDropdown && (
              <div className="fheader-dropdown-menu">
                {districtsList.map((d) => (
                  <button
                    key={d.id}
                    className={`fheader-dropdown-item ${selectedDistrict === d.name ? "active" : ""}`}
                    onClick={() => {
                      onDistrictChange(d.name);
                      setShowDistrictDropdown(false);
                    }}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date picker display */}
          <div className="fheader-date-badge">
            <Calendar size={14} className="fheader-cal-icon" />
            <span>{selectedDate || "Mon, 22 Sep 2026"}</span>
          </div>
        </div>
      </div>

      {/* Bottom row: Weather Type Tabs (Left) + Time Range Filters (Right) */}
      <div className="fheader-nav-row">
        {/* Weather Type Tabs */}
        <div className="fheader-weather-tabs">
          {weatherTabs.map((tab) => {
            const Icon = tabIconMap[tab.icon] || CloudRain;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`fheader-wtab ${isActive ? "active" : ""}`}
                onClick={() => onTabChange(tab.id)}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Time Filters */}
        <div className="fheader-time-filters">
          {timeFilterButtons.map((tf) => {
            const isActive = activeTimeFilter === tf.id;
            return (
              <button
                key={tf.id}
                className={`fheader-tbtn ${isActive ? "active" : ""}`}
                onClick={() => onTimeFilterChange(tf.id)}
              >
                {tf.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
