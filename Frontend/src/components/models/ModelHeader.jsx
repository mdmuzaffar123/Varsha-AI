import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  ChevronDown,
  Layers,
  Box,
  Network,
  BarChart2,
} from "lucide-react";
import { MODEL_TABS } from "../../data/modelData";
import "./ModelHeader.css";

const TAB_ICONS = {
  Layers: Layers,
  Box: Box,
  Network: Network,
  BarChart2: BarChart2,
};

export default function ModelHeader({
  activeTab = "earthformer",
  onTabChange,
  selectedRegion = "Jharkhand",
  selectedDistrict = "Ranchi",
  onDistrictChange,
}) {
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const districts = ["Ranchi", "Hazaribagh", "Dhanbad", "Bokaro", "Deoghar", "Jamshedpur"];

  return (
    <div className="model-header-container">
      {/* ── Top Bar: Title & Selectors ── */}
      <div className="model-header-top">
        {/* Title Block */}
        <div className="model-header-titles">
          <h1 className="model-main-title">AI Models</h1>
          <p className="model-sub-title">
            Advanced deep learning models for accurate rainfall forecasting using satellite and DNR radar data.
          </p>
        </div>

        {/* Right Selectors */}
        <div className="model-selectors-group">
          {/* Select Region */}
          <div className="mhead-select-wrap">
            <span className="mhead-select-label">Select Region</span>
            <div className="mhead-selector-pill">
              <span>{selectedRegion}</span>
              <ChevronDown size={14} className="mhead-chevron" />
            </div>
          </div>

          {/* Select District Dropdown */}
          <div className="mhead-select-wrap">
            <span className="mhead-select-label">Select District</span>
            <div className="mhead-dropdown-rel">
              <button
                className="mhead-selector-btn primary"
                onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
              >
                <MapPin size={14} className="mhead-icon-accent" />
                <span>{selectedDistrict}</span>
                <ChevronDown size={14} className="mhead-chevron" />
              </button>

              {showDistrictDropdown && (
                <div className="mhead-dropdown-menu">
                  {districts.map((d) => (
                    <button
                      key={d}
                      className={`mhead-dd-item ${d === selectedDistrict ? "active" : ""}`}
                      onClick={() => {
                        if (onDistrictChange) onDistrictChange(d);
                        setShowDistrictDropdown(false);
                      }}
                    >
                      <span>{d}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Select Date */}
          <div className="mhead-select-wrap">
            <span className="mhead-select-label">Select Date</span>
            <div className="mhead-dropdown-rel">
              <button
                className="mhead-selector-btn"
                onClick={() => setShowDateDropdown(!showDateDropdown)}
              >
                <Calendar size={14} className="mhead-icon-muted" />
                <span>Mon, 22 Sep 2026</span>
                <ChevronDown size={14} className="mhead-chevron" />
              </button>

              {showDateDropdown && (
                <div className="mhead-dropdown-menu right-aligned">
                  <div className="mhead-dd-item active">Mon, 22 Sep 2026 (Latest)</div>
                  <div className="mhead-dd-item">Sun, 21 Sep 2026 (Archive)</div>
                  <div className="mhead-dd-item">Sat, 20 Sep 2026 (Archive)</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4 Top Model Tabs Row (Matching Screenshot Exactly) ── */}
      <div className="model-tabs-cards-row">
        {MODEL_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = TAB_ICONS[tab.icon] || Layers;

          return (
            <button
              key={tab.id}
              className={`model-tab-card ${isActive ? "active" : ""}`}
              onClick={() => onTabChange && onTabChange(tab.id)}
            >
              <div className={`model-tab-icon-wrap ${isActive ? "active" : ""}`}>
                <Icon size={18} />
              </div>
              <div className="model-tab-text">
                <span className="model-tab-name">{tab.name}</span>
                <span className="model-tab-sub">({tab.sub})</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
