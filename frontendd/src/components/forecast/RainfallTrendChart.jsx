import React from "react";
import "./RainfallTrendChart.css";

export default function RainfallTrendChart() {
  const width = 340;
  const height = 165;
  const maxY = 60; // Ticks: 0, 20, 40, 60

  const dates = ["22 Sep", "23 Sep", "24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep"];

  // Actual points (Past): 3 points
  const actualData = [
    { x: 0, val: 14 },
    { x: 1, val: 28 },
    { x: 2, val: 42 },
  ];

  // Forecast points (AI): connecting from x:2
  const forecastData = [
    { x: 2, val: 42 },
    { x: 3, val: 18 },
    { x: 4, val: 26 },
    { x: 5, val: 30 },
    { x: 6, val: 52 },
    { x: 7, val: 22 },
  ];

  // Coordinate mapper
  const getCoords = (xIdx, val) => {
    const xPad = 18;
    const xStep = (width - xPad * 2) / 7;
    const x = xPad + xIdx * xStep;
    const yPadTop = 18;
    const yPadBottom = 24;
    const y = height - yPadBottom - (val / maxY) * (height - yPadTop - yPadBottom);
    return { x, y };
  };

  const actualPath = actualData
    .map((d, i) => {
      const { x, y } = getCoords(d.x, d.val);
      return `${i === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  const forecastPath = forecastData
    .map((d, i) => {
      const { x, y } = getCoords(d.x, d.val);
      return `${i === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rainfall-trend-card">
      {/* Header with Title and Legends */}
      <div className="rtrend-header">
        <h4 className="rtrend-title">Rainfall Trend (Next 7 Days)</h4>
        <div className="rtrend-legend-group">
          <div className="rtrend-legend-item">
            <span className="rtrend-dot-blue" />
            <span>Actual (Past)</span>
          </div>
          <div className="rtrend-legend-item">
            <span className="rtrend-dot-green" />
            <span>Forecast (AI)</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="rtrend-chart-body">
        {/* Y-Axis */}
        <div className="rtrend-yaxis">
          <span className="rtrend-yunit">Rainfall (mm)</span>
          <div className="rtrend-yticks">
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="rtrend-svg-wrapper">
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            {/* Horizontal Grid lines (60, 40, 20, 0) */}
            <line x1="18" y1="18" x2={width - 18} y2="18" stroke="rgba(226, 232, 240, 0.75)" strokeWidth="1" />
            <line x1="18" y1="59" x2={width - 18} y2="59" stroke="rgba(226, 232, 240, 0.75)" strokeWidth="1" />
            <line x1="18" y1="100" x2={width - 18} y2="100" stroke="rgba(226, 232, 240, 0.75)" strokeWidth="1" />
            <line x1="18" y1="141" x2={width - 18} y2="141" stroke="rgba(226, 232, 240, 0.75)" strokeWidth="1" />

            {/* Solid Blue Line (Actual Past) */}
            <path
              d={actualPath}
              fill="none"
              stroke="#1677FF"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dashed Green Line (Forecast AI) */}
            <path
              d={forecastPath}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.8"
              strokeDasharray="5 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Blue Points */}
            {actualData.map((d, i) => {
              const { x, y } = getCoords(d.x, d.val);
              return (
                <circle
                  key={`blue-${i}`}
                  cx={x}
                  cy={y}
                  r="4.2"
                  fill="#1677FF"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              );
            })}

            {/* Green Points */}
            {forecastData.slice(1).map((d, i) => {
              const { x, y } = getCoords(d.x, d.val);
              return (
                <circle
                  key={`green-${i}`}
                  cx={x}
                  cy={y}
                  r="4.2"
                  fill="#10B981"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          {/* X-Axis Labels */}
          <div className="rtrend-xaxis-labels">
            {dates.map((dt) => (
              <span key={dt}>{dt}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
