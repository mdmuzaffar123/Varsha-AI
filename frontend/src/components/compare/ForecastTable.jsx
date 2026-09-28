import React from "react";
import { Calendar, CloudRain, Sun, CloudLightning } from "lucide-react";
import { FORECAST_DATES, RAINFALL_7DAY_DATA } from "../../data/compareData";
import "./ForecastTable.css";

export default function ForecastTable({ locations }) {
  return (
    <div className="forecast-table-card">
      <div className="ftc-header">
        <Calendar size={16} className="ftc-icon" />
        <h3 className="ftc-title">7-Day Forecast Comparison</h3>
        <span className="ftc-badge">Daily Accumulation</span>
      </div>

      <div className="ftc-table-wrapper">
        <table className="ftc-table">
          <thead>
            <tr>
              <th className="ftc-sticky-col">Date</th>
              {FORECAST_DATES.map((d) => (
                <th key={d}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => {
              const rainArr = RAINFALL_7DAY_DATA[loc.id] || RAINFALL_7DAY_DATA.ranchi;

              return (
                <tr key={loc.id}>
                  <td className="ftc-sticky-col ftc-loc-cell">
                    <span className="ftc-dot" style={{ background: loc.themeColor }} />
                    <strong>{loc.name}</strong>
                  </td>

                  {rainArr.slice(0, FORECAST_DATES.length).map((mm, idx) => (
                    <td key={idx} className="ftc-val-cell">
                      <div className="ftc-cell-box">
                        {mm >= 30 ? (
                          <CloudLightning size={14} className="ftc-cicon purple" />
                        ) : mm >= 10 ? (
                          <CloudRain size={14} className="ftc-cicon blue" />
                        ) : (
                          <Sun size={14} className="ftc-cicon amber" />
                        )}
                        <span className="ftc-cell-mm">{mm} mm</span>
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
