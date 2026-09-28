import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  ChevronDown,
  Play,
  Pause,
  Radio,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import { RADAR_LOCATIONS, RADAR_MINI_PLAYBACK_STEPS } from "../../data/radarData";
import "./RadarHeader.css";

const RADAR_MODES = [
  { id: "reflectivity", label: "Reflectivity" },
  { id: "velocity",     label: "Velocity" },
  { id: "precipitation",label: "Precipitation" },
  { id: "composite",    label: "Composite" },
  { id: "rainfall",     label: "Rainfall Estimate" },
  { id: "tracking",     label: "Storm Tracking" },
];

export default function RadarHeader({
  activeMode = "reflectivity",
  onModeChange,
  selectedLocation = "ranchi",
  onLocationChange,
  isPlaying = false,
  onTogglePlay,
  currentMiniStep = "m-now",
  onMiniStepChange,
}) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const currentLocationObj =
    RADAR_LOCATIONS.find((loc) => loc.id === selectedLocation) || RADAR_LOCATIONS[0];

  return (
    <div className="radar-header-container">
      {/* ── Top Bar: Title & Selectors ── */}
      <div className="radar-header-top">
        {/* Title Block */}
        <div className="radar-header-titles">
          <div className="radar-title-row">
            <h1 className="radar-main-title">Live DNR Radar</h1>
            <span className="radar-live-badge">
              <span className="rlb-pulse-dot" />
              <span>Live</span>
            </span>
            <span className="radar-demo-tag" title="Demo frontend mode until Python backend connection">
              Demo / Frontend
            </span>
          </div>
          <p className="radar-sub-title">
            Real-time Doppler Weather Radar (DNR) data for rainfall estimation and nowcasting
          </p>
        </div>

        {/* Right Selectors */}
        <div className="radar-selectors-group">
          {/* State selector */}
          <div className="rhead-selector-pill">
            <span className="rhead-selector-label">{currentLocationObj.state}</span>
            <ChevronDown size={14} className="rhead-chevron" />
          </div>

          {/* City / District Selector with Dropdown */}
          <div className="rhead-dropdown-wrapper">
            <button
              className="rhead-selector-btn primary"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              <MapPin size={14} className="rhead-icon-accent" />
              <span>{currentLocationObj.city}</span>
              <ChevronDown size={14} className="rhead-chevron" />
            </button>

            {showLocationDropdown && (
              <div className="rhead-dropdown-menu">
                <div className="rhead-dd-header">Select Radar Station</div>
                {RADAR_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    className={`rhead-dd-item ${loc.id === selectedLocation ? "active" : ""}`}
                    onClick={() => {
                      if (onLocationChange) onLocationChange(loc.id);
                      setShowLocationDropdown(false);
                    }}
                  >
                    <div className="rhead-dd-text">
                      <strong>{loc.name}</strong>
                      <span className="rhead-dd-sub">{loc.station}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date & Time Selector */}
          <div className="rhead-dropdown-wrapper">
            <button
              className="rhead-selector-btn"
              onClick={() => setShowDateDropdown(!showDateDropdown)}
            >
              <Calendar size={14} className="rhead-icon-muted" />
              <span>Mon, 22 Sep 2026 11:30 AM</span>
              <ChevronDown size={14} className="rhead-chevron" />
            </button>

            {showDateDropdown && (
              <div className="rhead-dropdown-menu right-aligned">
                <div className="rhead-dd-header">Radar Observation Timetable</div>
                <div className="rhead-dd-item active">
                  <strong>22 Sep 2026, 11:30 AM</strong>
                  <span className="rhead-dd-sub">Live Latest Volume Scan</span>
                </div>
                <div className="rhead-dd-item">
                  <strong>22 Sep 2026, 11:00 AM</strong>
                  <span className="rhead-dd-sub">-30 min Archive</span>
                </div>
                <div className="rhead-dd-item">
                  <strong>22 Sep 2026, 10:30 AM</strong>
                  <span className="rhead-dd-sub">-60 min Archive</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Mode Pill Tabs & Mini Playback Widget ── */}
      <div className="radar-header-modes-bar">
        {/* Mode Pills */}
        <div className="radar-mode-pills-row">
          {RADAR_MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                className={`radar-mode-pill ${isActive ? "active" : ""}`}
                onClick={() => onModeChange && onModeChange(mode.id)}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Mini Playback / Timeline Control on Top Right */}
        <div className="radar-mini-player-box">
          <button
            className={`radar-mini-play-btn ${isPlaying ? "playing" : ""}`}
            onClick={onTogglePlay}
            title={isPlaying ? "Pause Radar Playback" : "Play Radar Loop"}
          >
            {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
            <span>{isPlaying ? "Playing" : "Live (0 min ago)"}</span>
          </button>

          <div className="radar-mini-track">
            {RADAR_MINI_PLAYBACK_STEPS.map((step) => {
              const isSelected = currentMiniStep === step.id;
              return (
                <button
                  key={step.id}
                  className={`radar-mini-step-btn ${isSelected ? "selected" : ""} ${step.isForecast ? "forecast" : ""}`}
                  onClick={() => onMiniStepChange && onMiniStepChange(step.id)}
                  title={`${step.label} (${step.time}) ${step.isForecast ? "• Derived Forecast" : "• Observation"}`}
                >
                  <span className="rmini-dot" />
                  <span className="rmini-lbl">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
