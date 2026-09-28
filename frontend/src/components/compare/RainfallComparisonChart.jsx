import React from "react";
import { CloudRain } from "lucide-react";
import { FORECAST_DATES, RAINFALL_7DAY_DATA } from "../../data/compareData";
import "./RainfallComparisonChart.css";

export default function RainfallComparisonChart({ locations }) {
  const maxRain = 70; // mm Y-axis max

  return (
    <div className="rainfall-chart-card">
      <div className="rcc-header">
        <div className="rcc-title-group">
          <CloudRain size={16} className="rcc-icon" />
          <h3 className="rcc-title">Rainfall Comparison (Next 7 Days)</h3>
        </div>

        {/* Legend */}
        <div className="rcc-legend-row">
          {locations.map((loc) => (
            <div key={loc.id} className="rcc-legend-item">
              <span className="rcc-legend-dot" style={{ background: loc.themeColor }} />
              <span className="rcc-legend-name">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Canvas Bar Chart */}
      <div className="rcc-chart-container">
        <div className="rcc-yaxis">
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        <div className="rcc-bars-grid">
          {/* Grid lines */}
          <div className="rcc-grid-line gl-60" />
          <div className="rcc-grid-line gl-40" />
          <div className="rcc-grid-line gl-20" />
          <div className="rcc-grid-line gl-0" />

          {/* Date Columns */}
          {FORECAST_DATES.map((dateStr, idx) => (
            <div key={dateStr} className="rcc-date-group">
              <div className="rcc-bars-cluster">
                {locations.map((loc) => {
                  const values = RAINFALL_7DAY_DATA[loc.id] || RAINFALL_7DAY_DATA.ranchi;
                  const mm = values[idx] || 0;
                  const heightPct = Math.min(100, Math.max(5, (mm / maxRain) * 100));

                  return (
                    <div
                      key={loc.id}
                      className="rcc-bar-column"
                      title={`${loc.name} (${dateStr}): ${mm} mm`}
                    >
                      <div
                        className="rcc-bar-fill"
                        style={{
                          height: `${heightPct}%`,
                          backgroundColor: loc.themeColor,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <span className="rcc-date-label">{dateStr}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
