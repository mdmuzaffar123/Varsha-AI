import React, { useState } from "react";
import { Navigation, AlertTriangle, Eye, X, Activity, ShieldAlert } from "lucide-react";
import "./StormCellList.css";

export default function StormCellList({ locationData, onHighlightCell }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const stormCells = locationData?.stormCells || [];

  const handleCellClick = (cell) => {
    setSelectedCell(cell);
    if (onHighlightCell) onHighlightCell(cell);
  };

  return (
    <div className="radar-storm-cells-card">
      <div className="rsc-header">
        <div className="rsc-title-group">
          <h3 className="rsc-title">Detected Storm Cells</h3>
          <span className="rsc-count-badge">{stormCells.length} Active</span>
        </div>
        <span className="rsc-sub">Click cell to view convective kinematics</span>
      </div>

      {/* Storm Cells Table / Cards */}
      <div className="rsc-table-wrapper">
        <table className="rsc-table">
          <thead>
            <tr>
              <th>Cell ID</th>
              <th>Intensity</th>
              <th>Movement</th>
              <th>Speed</th>
              <th>Distance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stormCells.map((cell) => {
              const isSevere = cell.intensityLevel === "Severe";
              const isStrong = cell.intensityLevel === "Strong";
              return (
                <tr
                  key={cell.id}
                  className={`rsc-row ${selectedCell?.id === cell.id ? "selected" : ""}`}
                  onClick={() => handleCellClick(cell)}
                >
                  <td className="rsc-id-cell">
                    <strong>{cell.id}</strong>
                  </td>
                  <td>
                    <span className={`rsc-dbz-badge ${isSevere ? "severe" : isStrong ? "strong" : "moderate"}`}>
                      {cell.intensity}
                    </span>
                  </td>
                  <td className="rsc-mov-cell">
                    <Navigation size={12} className="rsc-arrow-icon" />
                    <span>{cell.movement}</span>
                  </td>
                  <td>{cell.speed}</td>
                  <td>{cell.distance}</td>
                  <td>
                    <span className="rsc-status-pill">{cell.status}</span>
                  </td>
                  <td>
                    <button
                      className="rsc-inspect-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCellClick(cell);
                      }}
                    >
                      <Eye size={12} />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Storm Cell Details Modal */}
      {selectedCell && (
        <div className="rsc-modal-overlay" onClick={() => setSelectedCell(null)}>
          <div className="rsc-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="rsc-modal-head">
              <div className="rsc-mhead-left">
                <Activity size={16} className="rsc-spark-icon" />
                <h4>{selectedCell.label} — Cell Diagnostics</h4>
              </div>
              <button
                className="rsc-modal-close"
                onClick={() => setSelectedCell(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="rsc-modal-body">
              <div className="rsc-modal-grid">
                <div className="rsc-mfield">
                  <span className="rsc-mf-lbl">Peak Reflectivity</span>
                  <strong className="rsc-mf-val red">{selectedCell.intensity}</strong>
                </div>
                <div className="rsc-mfield">
                  <span className="rsc-mf-lbl">Movement Direction</span>
                  <strong className="rsc-mf-val">{selectedCell.movement} ({selectedCell.speed})</strong>
                </div>
                <div className="rsc-mfield">
                  <span className="rsc-mf-lbl">Cell Radius</span>
                  <strong className="rsc-mf-val">~{selectedCell.radiusKm} km</strong>
                </div>
                <div className="rsc-mfield">
                  <span className="rsc-mf-lbl">Hail Risk Probability</span>
                  <strong className="rsc-mf-val purple">{selectedCell.hailProb}</strong>
                </div>
                <div className="rsc-mfield full-width">
                  <span className="rsc-mf-lbl">Kinematic State</span>
                  <strong className="rsc-mf-val green">{selectedCell.status}</strong>
                </div>
              </div>

              <div className="rsc-modal-alert">
                <ShieldAlert size={14} />
                <span>
                  Demo interpretation. AI agent algorithms identify centroid tracking and volume divergence.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
