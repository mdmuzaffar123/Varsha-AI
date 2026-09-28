import React from "react";
import { ArrowLeftRight, Plus, RotateCcw, MapPin, Clock, Info } from "lucide-react";
import { ALL_LOCATIONS_MASTER, REGIONS_LIST } from "../../data/compareData";
import "./LocationSelector.css";

const HORIZON_OPTIONS = ["Now", "3 Hours", "6 Hours", "12 Hours", "24 Hours"];

export default function LocationSelector({
  selectedIds,
  onSelectLocation,
  onSwapLocations,
  onAddLocation,
  onRemoveLocation,
  onReset,
  forecastHorizon,
  onHorizonChange,
}) {
  return (
    <div className="location-selector-container">
      {/* Title & Top Bar */}
      <div className="loc-sel-header">
        <div className="loc-sel-title-group">
          <span className="loc-sel-badge">Location Comparison</span>
          <h1 className="loc-sel-title">Compare Locations</h1>
          <p className="loc-sel-subtitle">
            Compare rainfall forecast and climate parameters between regions using satellite data and AI models.
          </p>
        </div>

        <div className="loc-sel-demo-tag">
          <span className="loc-sel-dot" />
          <span>Demo Data</span>
        </div>
      </div>

      {/* Primary Selection Controls Bar */}
      <div className="loc-sel-controls-bar">
        <div className="loc-sel-dropdowns-group">
          {/* Location 1 (A) */}
          <div className="loc-sel-box">
            <span className="loc-sel-label">Location 1</span>
            <div className="loc-sel-input-wrap">
              <MapPin size={14} className="loc-sel-pin-icon" />
              <select
                className="loc-sel-dropdown"
                value={selectedIds[0] || "ranchi"}
                onChange={(e) => onSelectLocation(0, e.target.value)}
              >
                {ALL_LOCATIONS_MASTER.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}, {loc.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button (between Loc 1 & Loc 2) */}
          <button
            className="loc-sel-swap-btn"
            onClick={onSwapLocations}
            title="Swap Location A and Location B"
          >
            <ArrowLeftRight size={16} />
          </button>

          {/* Location 2 (B) */}
          <div className="loc-sel-box">
            <span className="loc-sel-label">Location 2</span>
            <div className="loc-sel-input-wrap">
              <MapPin size={14} className="loc-sel-pin-icon" />
              <select
                className="loc-sel-dropdown"
                value={selectedIds[1] || "patna"}
                onChange={(e) => onSelectLocation(1, e.target.value)}
              >
                {ALL_LOCATIONS_MASTER.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}, {loc.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location 3 (Optional) */}
          {selectedIds.length >= 3 && (
            <div className="loc-sel-box">
              <span className="loc-sel-label">Location 3</span>
              <div className="loc-sel-input-wrap">
                <MapPin size={14} className="loc-sel-pin-icon" />
                <select
                  className="loc-sel-dropdown"
                  value={selectedIds[2]}
                  onChange={(e) => onSelectLocation(2, e.target.value)}
                >
                  {ALL_LOCATIONS_MASTER.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}, {loc.state}
                    </option>
                  ))}
                </select>
                <button
                  className="loc-sel-rem-btn"
                  onClick={() => onRemoveLocation(2)}
                  title="Remove Location 3"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Location 4 (Optional) */}
          {selectedIds.length >= 4 && (
            <div className="loc-sel-box">
              <span className="loc-sel-label">Location 4</span>
              <div className="loc-sel-input-wrap">
                <MapPin size={14} className="loc-sel-pin-icon" />
                <select
                  className="loc-sel-dropdown"
                  value={selectedIds[3]}
                  onChange={(e) => onSelectLocation(3, e.target.value)}
                >
                  {ALL_LOCATIONS_MASTER.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}, {loc.state}
                    </option>
                  ))}
                </select>
                <button
                  className="loc-sel-rem-btn"
                  onClick={() => onRemoveLocation(3)}
                  title="Remove Location 4"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons: Add Location, Compare, Reset */}
        <div className="loc-sel-actions">
          {selectedIds.length < 4 ? (
            <button className="loc-sel-add-btn" onClick={onAddLocation}>
              <Plus size={14} />
              <span>Add Location</span>
            </button>
          ) : (
            <span className="loc-sel-max-tag">Max 4 Locations</span>
          )}

          <button className="loc-sel-reset-btn" onClick={onReset} title="Reset to Ranchi & Raipur">
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Forecast Horizon Selector Row */}
      <div className="loc-sel-horizon-bar">
        <div className="loc-sel-horizon-label">
          <Clock size={13} />
          <span>Forecast Horizon:</span>
        </div>
        <div className="loc-sel-horizon-pills">
          {HORIZON_OPTIONS.map((horizon) => (
            <button
              key={horizon}
              className={`loc-sel-h-pill ${forecastHorizon === horizon ? "active" : ""}`}
              onClick={() => onHorizonChange(horizon)}
            >
              {horizon}
            </button>
          ))}
        </div>

        <span className="loc-sel-note">
          <Info size={12} />
          <span>Illustrative comparison data — neutral descriptive indicators only.</span>
        </span>
      </div>
    </div>
  );
}
