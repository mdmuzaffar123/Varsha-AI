import React from "react";
import { Wind, Droplets, Cloud, Radio } from "lucide-react";
import "./QuickGaugesRow.css";

export default function QuickGaugesRow({ locations }) {
  return (
    <div className="quick-gauges-grid">
      {/* Card 1: Wind Speed */}
      <div className="qg-card">
        <div className="qg-card-header">
          <Wind size={15} className="qg-icon cyan" />
          <h4 className="qg-title">Wind Speed (km/h)</h4>
        </div>
        <div className="qg-bars-list">
          {locations.map((loc) => {
            const val = loc.currentWeather.windNum;
            const pct = Math.min(100, (val / 50) * 100);
            return (
              <div key={loc.id} className="qg-bar-row">
                <span className="qg-loc-name">{loc.name}</span>
                <div className="qg-track">
                  <div
                    className="qg-fill cyan"
                    style={{ width: `${pct}%`, backgroundColor: loc.themeColor }}
                  />
                </div>
                <span className="qg-val">{val} km/h</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 2: Humidity */}
      <div className="qg-card">
        <div className="qg-card-header">
          <Droplets size={15} className="qg-icon blue" />
          <h4 className="qg-title">Humidity (%)</h4>
        </div>
        <div className="qg-bars-list">
          {locations.map((loc) => {
            const val = loc.currentWeather.humidityNum;
            return (
              <div key={loc.id} className="qg-bar-row">
                <span className="qg-loc-name">{loc.name}</span>
                <div className="qg-track">
                  <div
                    className="qg-fill blue"
                    style={{ width: `${val}%`, backgroundColor: loc.themeColor }}
                  />
                </div>
                <span className="qg-val">{val}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 3: Cloud Cover */}
      <div className="qg-card">
        <div className="qg-card-header">
          <Cloud size={15} className="qg-icon gray" />
          <h4 className="qg-title">Cloud Cover (%)</h4>
        </div>
        <div className="qg-bars-list">
          {locations.map((loc) => {
            const val = loc.currentWeather.cloudNum;
            return (
              <div key={loc.id} className="qg-bar-row">
                <span className="qg-loc-name">{loc.name}</span>
                <div className="qg-track">
                  <div
                    className="qg-fill gray"
                    style={{ width: `${val}%`, backgroundColor: loc.themeColor }}
                  />
                </div>
                <span className="qg-val">{val}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 4: DNR Radar Intensity */}
      <div className="qg-card">
        <div className="qg-card-header">
          <Radio size={15} className="qg-icon purple" />
          <h4 className="qg-title">DNR Radar Intensity (dBZ)</h4>
        </div>
        <div className="qg-bars-list">
          {locations.map((loc) => {
            const val = loc.currentWeather.radarDbz;
            const pct = Math.min(100, (val / 75) * 100);
            return (
              <div key={loc.id} className="qg-bar-row">
                <span className="qg-loc-name">{loc.name}</span>
                <div className="qg-track">
                  <div
                    className="qg-fill radar"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="qg-val">{val} dBZ</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
