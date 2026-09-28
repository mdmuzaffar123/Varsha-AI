import React from "react";
import { Table } from "lucide-react";
import { THUNDERSTORM_COMPARISON_DATA, LIGHTNING_COMPARISON_DATA } from "../../data/compareData";
import "./ComparisonTable.css";

export default function ComparisonTable({ locations, forecastHorizon }) {
  return (
    <div className="comparison-table-card">
      <div className="ctable-header">
        <Table size={16} className="ctable-icon" />
        <h3 className="ctable-title">Location Comparison Matrix</h3>
        <span className="ctable-badge">All Metrics Overview</span>
      </div>

      <div className="ctable-wrapper">
        <table className="ctable-main">
          <thead>
            <tr>
              <th className="ctable-sticky">Metric</th>
              {locations.map((loc) => (
                <th key={loc.id}>
                  <div className="ctable-th-loc">
                    <span className="ctable-th-dot" style={{ background: loc.themeColor }} />
                    <span>{loc.name}, {loc.state}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ctable-sticky font-bold">Temperature</td>
              {locations.map((loc) => (
                <td key={loc.id}>{loc.currentWeather.temp}</td>
              ))}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Rainfall</td>
              {locations.map((loc) => (
                <td key={loc.id}>{loc.currentWeather.rain}</td>
              ))}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Rainfall Condition</td>
              {locations.map((loc) => (
                <td key={loc.id}>{loc.currentWeather.condition}</td>
              ))}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Humidity</td>
              {locations.map((loc) => (
                <td key={loc.id}>{loc.currentWeather.humidity}</td>
              ))}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Wind Speed</td>
              {locations.map((loc) => (
                <td key={loc.id}>{loc.currentWeather.wind}</td>
              ))}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Cloud Cover</td>
              {locations.map((loc) => (
                <td key={loc.id}>{loc.currentWeather.cloud}</td>
              ))}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Thunderstorm Prob</td>
              {locations.map((loc) => {
                const storm = THUNDERSTORM_COMPARISON_DATA[loc.id] || THUNDERSTORM_COMPARISON_DATA.ranchi;
                return <td key={loc.id}>{storm.prob}</td>;
              })}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Lightning Prob</td>
              {locations.map((loc) => {
                const light = LIGHTNING_COMPARISON_DATA[loc.id] || LIGHTNING_COMPARISON_DATA.ranchi;
                return <td key={loc.id}>{light.prob}</td>;
              })}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Active Storm Cells</td>
              {locations.map((loc) => {
                const storm = THUNDERSTORM_COMPARISON_DATA[loc.id] || THUNDERSTORM_COMPARISON_DATA.ranchi;
                return <td key={loc.id}>{storm.cells} Cells</td>;
              })}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">DNR Radar Reflectivity</td>
              {locations.map((loc) => (
                <td key={loc.id}>{loc.currentWeather.radarDbz} dBZ</td>
              ))}
            </tr>
            <tr>
              <td className="ctable-sticky font-bold">Forecast Horizon</td>
              {locations.map((loc) => (
                <td key={loc.id}>{forecastHorizon}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
