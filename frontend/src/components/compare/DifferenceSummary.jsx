import React from "react";
import { Scale, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import "./DifferenceSummary.css";

export default function DifferenceSummary({ locations }) {
  if (locations.length < 2) return null;

  const locA = locations[0];
  const locB = locations[1];

  // Calculate neutral numerical deltas
  const rainDiff = locB.currentWeather.rainNum - locA.currentWeather.rainNum;
  const tempDiff = locB.currentWeather.tempNum - locA.currentWeather.tempNum;
  const humDiff = locA.currentWeather.humidityNum - locB.currentWeather.humidityNum;
  const windDiff = locB.currentWeather.windNum - locA.currentWeather.windNum;

  return (
    <div className="difference-summary-card">
      <div className="diff-header">
        <Scale size={16} className="diff-icon" />
        <h3 className="diff-title">Key Differences</h3>
        <span className="diff-badge">Neutral Delta Metrics</span>
      </div>

      <p className="diff-subtitle">
        Quantitative parameter variance computed between {locA.name} and {locB.name}.
      </p>

      {/* Deltas Grid */}
      <div className="diff-cards-grid">
        {/* Delta 1: Rainfall */}
        <div className="diff-item">
          <span className="diff-metric-label">Rainfall Variance</span>
          <div className="diff-val-row">
            <span className="diff-city">{locB.name}:</span>
            <span className="diff-delta">
              {rainDiff > 0 ? `+${rainDiff} mm` : `${rainDiff} mm`}
            </span>
            <span className="diff-compare-txt">compared with {locA.name}</span>
          </div>
          <span className="diff-tag">
            {rainDiff > 0 ? `${locB.name} shows higher current rainfall` : `${locA.name} shows higher current rainfall`}
          </span>
        </div>

        {/* Delta 2: Temperature */}
        <div className="diff-item">
          <span className="diff-metric-label">Temperature Variance</span>
          <div className="diff-val-row">
            <span className="diff-city">{locB.name}:</span>
            <span className="diff-delta">
              {tempDiff > 0 ? `+${tempDiff}°C` : `${tempDiff}°C`}
            </span>
            <span className="diff-compare-txt">compared with {locA.name}</span>
          </div>
          <span className="diff-tag">
            {tempDiff > 0 ? `${locB.name} shows higher temperature` : `${locA.name} shows higher temperature`}
          </span>
        </div>

        {/* Delta 3: Humidity */}
        <div className="diff-item">
          <span className="diff-metric-label">Humidity Variance</span>
          <div className="diff-val-row">
            <span className="diff-city">{locA.name}:</span>
            <span className="diff-delta">
              {humDiff > 0 ? `+${humDiff}%` : `${humDiff}%`}
            </span>
            <span className="diff-compare-txt">compared with {locB.name}</span>
          </div>
          <span className="diff-tag">
            {humDiff > 0 ? `${locA.name} shows higher relative humidity` : `${locB.name} shows higher relative humidity`}
          </span>
        </div>

        {/* Delta 4: Wind Speed */}
        <div className="diff-item">
          <span className="diff-metric-label">Wind Speed Variance</span>
          <div className="diff-val-row">
            <span className="diff-city">{locB.name}:</span>
            <span className="diff-delta">
              {windDiff > 0 ? `+${windDiff} km/h` : `${windDiff} km/h`}
            </span>
            <span className="diff-compare-txt">compared with {locA.name}</span>
          </div>
          <span className="diff-tag">
            {windDiff > 0 ? `${locB.name} shows higher wind speed` : `${locA.name} shows higher wind speed`}
          </span>
        </div>
      </div>
    </div>
  );
}
