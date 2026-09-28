import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_ALERT_MARKERS } from "../../data/alertData";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./AlertMap.css";

// Fix Leaflet icon URLs in React environment
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function AlertMap({ onSelectLocationMarker }) {
  const centerPos = [23.3441, 85.3096]; // Ranchi center

  return (
    <div className="alert-map-card">
      <div className="am-header-row">
        <div className="am-title-group">
          <h3 className="am-title">Alert Map</h3>
          <span className="am-demo-badge">Illustrative Demo Map</span>
        </div>
        <p className="am-subtitle">
          Geographic hazard distribution across monitored regional districts.
        </p>
      </div>

      {/* Map Container */}
      <div className="am-map-wrapper">
        <MapContainer
          center={centerPos}
          zoom={5}
          scrollWheelZoom={false}
          className="am-leaflet-canvas"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {MAP_ALERT_MARKERS.map((loc) => (
            <React.Fragment key={loc.id}>
              {/* Pulsing risk radius circle */}
              <Circle
                center={[loc.lat, loc.lng]}
                radius={loc.severity === "HIGH" ? 45000 : 30000}
                pathOptions={{
                  color: loc.color,
                  fillColor: loc.color,
                  fillOpacity: 0.25,
                  weight: 1.5,
                }}
              />

              {/* Marker with Popup */}
              <Marker position={[loc.lat, loc.lng]}>
                <Popup className="am-popup">
                  <div className="am-popup-content">
                    <div className="am-pop-header">
                      <strong className="am-pop-name">{loc.name}, {loc.state}</strong>
                      <span className="am-pop-badge" style={{ background: loc.color }}>
                        {loc.severity}
                      </span>
                    </div>
                    <div className="am-pop-body">
                      <span><strong>Event:</strong> {loc.eventType}</span>
                      <span><strong>Metric:</strong> {loc.metric}</span>
                      <span className="am-pop-source">{loc.badge}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="am-map-legend">
          <span className="aml-title">Risk Legend:</span>
          <div className="aml-items">
            <span className="aml-item"><span className="aml-dot blue" /> Rainfall</span>
            <span className="aml-item"><span className="aml-dot purple" /> Thunderstorm</span>
            <span className="aml-item"><span className="aml-dot yellow" /> Lightning</span>
            <span className="aml-item"><span className="aml-dot red" /> High Risk</span>
            <span className="aml-item"><span className="aml-dot green" /> Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
