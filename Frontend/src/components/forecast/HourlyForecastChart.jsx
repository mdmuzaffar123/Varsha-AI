import React, { useState } from "react";
import { hourly24HoursData } from "../../data/forecastData";
import "./HourlyForecastChart.css";

export default function HourlyForecastChart() {
  const [hoveredIndex, setHoveredIndex] = useState(12); // Default to 12 PM peak
  const maxVal = 40; // Max Y-axis value from reference image (0, 10, 20, 30, 40)

  return (
    <div className="hourly-chart-card">
      <div className="hchart-header">
        <h3 className="hchart-title">Hourly Forecast (Next 24 Hours)</h3>
      </div>

      <div className="hchart-body">
        {/* Y-Axis Label & Ticks */}
        <div className="hchart-yaxis-wrap">
          <span className="hchart-yaxis-unit">Rainfall (mm)</span>
          <div className="hchart-yticks">
            <span>40</span>
            <span>30</span>
            <span>20</span>
            <span>10</span>
            <span>0</span>
          </div>
        </div>

        {/* Chart Canvas / Bars Area */}
        <div className="hchart-bars-container">
          {/* Horizontal Grid lines */}
          <div className="hchart-gridlines">
            <div className="hgrid-line" style={{ bottom: "100%" }} />
            <div className="hgrid-line" style={{ bottom: "75%" }} />
            <div className="hgrid-line" style={{ bottom: "50%" }} />
            <div className="hgrid-line" style={{ bottom: "25%" }} />
            <div className="hgrid-line" style={{ bottom: "0%" }} />
          </div>

          {/* 24 Hourly Bars */}
          <div className="hchart-bars-track">
            {hourly24HoursData.map((item, idx) => {
              const barHeightPct = Math.min((item.value / maxVal) * 100, 100);
              const isPeak = item.isPeak || idx === 12;
              const isHovered = hoveredIndex === idx;
              const showTooltip = isHovered;

              return (
                <div
                  key={idx}
                  className="hbar-column"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(12)}
                >
                  {/* Floating Peak Tooltip */}
                  {showTooltip && (
                    <div className="hbar-peak-tooltip">
                      <span className="htip-time">{item.time || item.hour}</span>
                      <span className="htip-val">{item.value} mm</span>
                      <div className="htip-arrow" />
                    </div>
                  )}

                  <div className="hbar-fill-wrapper">
                    <div
                      className={`hbar-fill ${isPeak ? "peak-bar" : ""}`}
                      style={{ height: `${barHeightPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-Axis Ticks (12AM, 4AM, 8AM, 12PM, 4PM, 8PM) */}
          <div className="hchart-xaxis-ticks">
            <span>12AM</span>
            <span>4AM</span>
            <span>8AM</span>
            <span>12PM</span>
            <span>4PM</span>
            <span>8PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
