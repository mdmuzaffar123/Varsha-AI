import React from "react";
import { Radio, Satellite, MapPin, Database, Check } from "lucide-react";
import { INPUT_DATA_SOURCES } from "../../data/modelData";
import "./InputDataSources.css";

const SRC_ICONS = {
  Radio: Radio,
  Satellite: Satellite,
  MapPin: MapPin,
  Database: Database,
};

export default function InputDataSources() {
  return (
    <div className="input-sources-container">
      <h3 className="input-sources-title">Input Data Sources</h3>

      <div className="input-sources-cards-grid">
        {INPUT_DATA_SOURCES.map((src) => {
          const Icon = SRC_ICONS[src.icon] || Radio;
          return (
            <div key={src.id} className="input-source-card">
              <div className="isc-top-row">
                <div className={`isc-icon-wrap ${src.colorScheme}`}>
                  <Icon size={16} />
                </div>
                <span className="isc-badge">
                  <Check size={11} className="isc-check-icon" />
                  <span>{src.badge}</span>
                </span>
              </div>

              <div className="isc-content">
                <h4 className="isc-title">{src.title}</h4>
                <p className="isc-desc">{src.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
