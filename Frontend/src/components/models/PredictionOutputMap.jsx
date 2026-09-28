import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Minus, Crosshair, ChevronDown } from "lucide-react";
import {
  PREDICTION_DISTRICTS,
  PREDICTION_HEATMAP_CLUSTERS,
  PREDICTION_SCALE_TICKS,
} from "../../data/modelData";
import "./PredictionOutputMap.css";

// Fix Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function PredictionOutputMap({ selectedDistrict = "Ranchi" }) {
  const mapRef = useRef(null);
  const centerCoords = [23.3441, 85.3096]; // Ranchi center

  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };
  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };
  const handleResetCenter = () => {
    if (mapRef.current) mapRef.current.setView(centerCoords, 7.5, { animate: true });
  };

  // Custom Red Location Pin (Ranchi 24 mm)
  const redPinIcon = L.divIcon({
    className: "custom-pred-red-pin",
    html: `
      <div class="pred-pin-wrap">
        <div class="pred-pin-svg">
          <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <filter id="predPinShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.4)"/>
            </filter>
            <path d="M16 0C7.16344 0 0 7.16344 0 16C0 26.5 16 42 16 42C16 42 32 26.5 32 16C32 7.16344 24.8366 0 16 0Z" fill="#EF4444" filter="url(#predPinShadow)"/>
            <circle cx="16" cy="15" r="5.5" fill="#FFFFFF"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
  });

  return (
    <div className="prediction-output-card">
      {/* ── Header ── */}
      <div className="pred-header">
        <h3 className="pred-title">Prediction Output (Next 6 Hours)</h3>
        <div className="pred-mode-dropdown-pill">
          <span>Rainfall (mm)</span>
          <ChevronDown size={13} />
        </div>
      </div>

      {/* ── Leaflet Map Canvas ── */}
      <div className="pred-map-wrapper">
        <MapContainer
          center={centerCoords}
          zoom={7.5}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          {/* Base Satellite Imagery Layer */}
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri World Imagery"
            maxZoom={18}
          />

          {/* Multi-tier Prediction Heatmap Overlay */}
          {PREDICTION_HEATMAP_CLUSTERS.map((cl, i) => (
            <CircleMarker
              key={i}
              center={[cl.lat, cl.lon]}
              radius={cl.radius}
              pathOptions={{
                className: `pred-heat-layer ${cl.intensity}`,
                fillColor: cl.color,
                fillOpacity: cl.intensity === "high" ? 0.75 : cl.intensity === "mid" ? 0.55 : 0.35,
                color: cl.color,
                weight: 0.8,
                opacity: 0.5,
              }}
            />
          ))}

          {/* Surrounding District Labels */}
          {PREDICTION_DISTRICTS.map((d) => {
            if (d.isPrimary) return null; // Primary handled by red pin
            return (
              <CircleMarker
                key={d.name}
                center={[d.lat, d.lon]}
                radius={2.5}
                pathOptions={{
                  fillColor: "#FFFFFF",
                  fillOpacity: 0.8,
                  color: "#000000",
                  weight: 1,
                }}
              >
                <Tooltip
                  direction="center"
                  permanent={true}
                  className="pred-district-label"
                >
                  <span>{d.name}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}

          {/* Primary Red Location Pin on Ranchi */}
          <Marker position={centerCoords} icon={redPinIcon} zIndexOffset={1000}>
            <Tooltip
              direction="right"
              offset={[14, -20]}
              permanent={true}
              className="pred-pin-box-tip"
            >
              <div className="pred-pin-bubble">
                <span className="ppb-title">Ranchi</span>
                <span className="ppb-val">24 mm</span>
              </div>
            </Tooltip>
          </Marker>
        </MapContainer>

        {/* ── Map Zoom Controls (Bottom Left) ── */}
        <div className="pred-map-zoom-controls">
          <button className="pmz-btn" onClick={handleZoomIn} title="Zoom in">
            <Plus size={14} />
          </button>
          <button className="pmz-btn" onClick={handleZoomOut} title="Zoom out">
            <Minus size={14} />
          </button>
          <button className="pmz-btn" onClick={handleResetCenter} title="Focus Ranchi">
            <Crosshair size={14} />
          </button>
        </div>

        {/* ── Vertical 0-200mm Color Scale Legend (Right side of map) ── */}
        <div className="pred-map-vertical-legend">
          <div className="pmvl-bar" />
          <div className="pmvl-ticks">
            {PREDICTION_SCALE_TICKS.map((t) => (
              <span key={t.val} className="pmvl-tick-num">
                {t.val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
