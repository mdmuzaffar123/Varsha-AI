import React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { RISK_MATRIX_DATA } from "../../data/alertData";
import "./RiskMatrix.css";

export default function RiskMatrix() {
  return (
    <div className="risk-matrix-card">
      <div className="rmx-header">
        <div className="rmx-title-group">
          <ShieldCheck size={16} className="rmx-icon" />
          <h3 className="rmx-title">Risk Assessment Matrix</h3>
        </div>
        <span className="rmx-badge">Demo Matrix</span>
      </div>

      <p className="rmx-subtitle">
        Multi-hazard probability and impact synthesis for current monitored window.
      </p>

      {/* Matrix Table */}
      <div className="rmx-table-wrapper">
        <table className="rmx-table">
          <thead>
            <tr>
              <th>Hazard Event</th>
              <th>Probability</th>
              <th>Intensity</th>
              <th>Expected Impact</th>
              <th>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {RISK_MATRIX_DATA.map((row) => (
              <tr key={row.event}>
                <td className="rmx-event-cell">
                  <strong>{row.event}</strong>
                </td>
                <td className="rmx-val-cell">{row.probability}</td>
                <td className="rmx-val-cell">{row.intensity}</td>
                <td className="rmx-val-cell">{row.impact}</td>
                <td>
                  <span className={`rmx-level-badge ${row.levelClass}`}>
                    {row.riskLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rmx-footer-note">
        <Info size={13} />
        <span>* Illustrative demo values for system evaluation. Not officially validated warning thresholds.</span>
      </div>
    </div>
  );
}
