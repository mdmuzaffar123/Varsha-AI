import React from "react";
import { ChevronRight, Map } from "lucide-react";
import { districtWiseForecastData } from "../../data/forecastData";
import "./DistrictForecastTable.css";

export default function DistrictForecastTable({ onSelectDistrict, selectedDistrict }) {
  return (
    <div className="district-table-card">
      <div className="dtable-header">
        <div className="dtable-title-group">
          <Map size={17} color="#1677FF" />
          <h4 className="dtable-title">District-wise Forecast (Jharkhand)</h4>
        </div>
      </div>

      <div className="dtable-container">
        <table className="dtable-table">
          <thead>
            <tr>
              <th className="dth-left">District</th>
              <th>Today (mm)</th>
              <th>Tomorrow (mm)</th>
              <th>Risk Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {districtWiseForecastData.map((d) => {
              const isSelected = selectedDistrict === d.name;
              const isHigh = d.risk === "High";
              const isMedium = d.risk === "Medium";

              return (
                <tr
                  key={d.id}
                  className={`dtable-row ${isSelected ? "selected" : ""}`}
                  onClick={() => onSelectDistrict && onSelectDistrict(d.name)}
                >
                  <td className="dtd-district-name">
                    <span>{d.name}</span>
                  </td>
                  <td className="dtd-num">{d.today}</td>
                  <td className="dtd-num">{d.tomorrow}</td>
                  <td>
                    <span
                      className={`dtd-risk-pill ${
                        isHigh ? "risk-high" : isMedium ? "risk-medium" : "risk-low"
                      }`}
                    >
                      {d.risk}
                    </span>
                  </td>
                  <td className="dtd-arrow">
                    <ChevronRight size={15} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
