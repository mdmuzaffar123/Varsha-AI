import React from "react";
import { ShieldAlert } from "lucide-react";
import { RISK_LEVEL_MATRIX_DATA } from "../../data/compareData";
import "./RiskComparisonMatrix.css";

export default function RiskComparisonMatrix({ locations }) {
  return (
    <div className="risk-comp-matrix-card">
      <div className="rcm-header">
        <ShieldAlert size={16} className="rcm-icon" />
        <h3 className="rcm-title">Risk Level Comparison</h3>
        <span className="rcm-badge">Multi-Hazard Analysis</span>
      </div>

      <div className="rcm-table-wrapper">
        <table className="rcm-table">
          <thead>
            <tr>
              <th>Parameter</th>
              {locations.map((loc) => (
                <th key={loc.id}>{loc.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RISK_LEVEL_MATRIX_DATA.map((row) => (
              <tr key={row.parameter}>
                <td className="rcm-param-cell">
                  <strong>{row.parameter}</strong>
                </td>

                {locations.map((loc) => {
                  const level = row[loc.id] || "Low";
                  return (
                    <td key={loc.id}>
                      <span className={`rcm-risk-pill ${level.toLowerCase()}`}>
                        {level}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
