import React from "react";
import { Thermometer } from "lucide-react";
import { FORECAST_DATES, TEMP_TREND_DATA } from "../../data/compareData";
import "./TemperatureTrendChart.css";

export default function TemperatureTrendChart({ locations }) {
  const minT = 15;
  const maxT = 45;
  const width = 340;
  const height = 130;

  // Build SVG path string for a location's temperature series
  const getPolylinePoints = (locId) => {
    const temps = TEMP_TREND_DATA[locId] || TEMP_TREND_DATA.ranchi;
    const count = FORECAST_DATES.length;
    const stepX = width / (count - 1);

    return temps
      .slice(0, count)
      .map((t, idx) => {
        const x = idx * stepX;
        const y = height - ((t - minT) / (maxT - minT)) * height;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  return (
    <div className="temp-chart-card">
      <div className="ttc-header">
        <div className="ttc-title-group">
          <Thermometer size={16} className="ttc-icon" />
          <h3 className="ttc-title">Temperature Comparison</h3>
        </div>

        {/* Legend */}
        <div className="ttc-legend-row">
          {locations.map((loc) => (
            <div key={loc.id} className="ttc-legend-item">
              <span className="ttc-legend-dot" style={{ background: loc.themeColor }} />
              <span className="ttc-legend-name">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Canvas Line Chart */}
      <div className="ttc-chart-container">
        <div className="ttc-yaxis">
          <span>40</span>
          <span>30</span>
          <span>20</span>
        </div>

        <div className="ttc-svg-wrap">
          <svg viewBox={`0 0 ${width} ${height}`} className="ttc-svg">
            {/* Horizontal Grid lines */}
            <line x1="0" y1="15" x2={width} y2="15" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="0" y1="65" x2={width} y2="65" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="0" y1="115" x2={width} y2="115" stroke="#e2e8f0" strokeDasharray="3 3" />

            {/* Line per location */}
            {locations.map((loc) => {
              const pointsStr = getPolylinePoints(loc.id);
              const pointsArr = pointsStr.split(" ").map((p) => p.split(","));

              return (
                <g key={loc.id}>
                  <polyline
                    fill="none"
                    stroke={loc.themeColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={pointsStr}
                  />
                  {/* Circle dots at data points */}
                  {pointsArr.map(([x, y], ptIdx) => (
                    <circle
                      key={ptIdx}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#ffffff"
                      stroke={loc.themeColor}
                      strokeWidth="2"
                    />
                  ))}
                </g>
              );
            })}
          </svg>

          {/* X Axis Date Labels */}
          <div className="ttc-xaxis">
            {FORECAST_DATES.map((d) => (
              <span key={d} className="ttc-x-label">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
