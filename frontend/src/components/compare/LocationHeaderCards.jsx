import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, CloudRain, Thermometer, Droplets, Wind, Mountain, Users } from "lucide-react";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./LocationHeaderCards.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function LocationHeaderCards({ locations }) {
  // Center map based on first location
  const mapCenter = locations.length > 0
    ? [locations[0].latNum, locations[0].lngNum]
    : [23.3441, 85.3096];

  return (
    <div className="location-header-cards-grid">
      {/* Location Cards Container */}
      <div className="lhc-cards-row">
        {locations.map((loc, idx) => (
          <div key={loc.id} className="lhc-card">
            {/* Card Header */}
            <div className="lhc-card-header">
              <div className="lhc-loc-name">
                <MapPin size={16} className="lhc-pin-icon" style={{ color: loc.themeColor }} />
                <h3>{loc.name}, {loc.state}</h3>
              </div>
              <span className={`lhc-badge ${loc.badgeType || ""}`}>
                {loc.badge || `Location ${idx + 1}`}
              </span>
            </div>

            {/* Content: Metadata Left + Current Weather Box Right */}
            <div className="lhc-card-body">
              {/* Metadata */}
              <div className="lhc-meta-block">
                <div className="lhc-meta-item">
                  <span className="lhc-meta-lbl">Latitude</span>
                  <span className="lhc-meta-val">{loc.lat}</span>
                </div>
                <div className="lhc-meta-item">
                  <span className="lhc-meta-lbl">Longitude</span>
                  <span className="lhc-meta-val">{loc.lng}</span>
                </div>
                <div className="lhc-meta-item">
                  <span className="lhc-meta-lbl">Elevation</span>
                  <span className="lhc-meta-val">{loc.elevation}</span>
                </div>
                <div className="lhc-meta-item">
                  <span className="lhc-meta-lbl">Population</span>
                  <span className="lhc-meta-val">{loc.population}</span>
                </div>
              </div>

              {/* Current Weather Stat Card */}
              <div className="lhc-weather-stat-box">
                <span className="lhc-ws-title">Current Weather</span>
                <div className="lhc-ws-main">
                  <CloudRain size={26} className="lhc-ws-rain-icon" />
                  <div className="lhc-ws-rain-data">
                    <span className="lhc-ws-mm">{loc.currentWeather.rain}</span>
                    <span className="lhc-ws-cond">{loc.currentWeather.condition}</span>
                  </div>
                </div>

                <div className="lhc-ws-pills-row">
                  <div className="lhc-ws-pill" title="Temperature">
                    <Thermometer size={12} className="amber" />
                    <span>{loc.currentWeather.temp}</span>
                  </div>
                  <div className="lhc-ws-pill" title="Humidity">
                    <Droplets size={12} className="blue" />
                    <span>{loc.currentWeather.humidity}</span>
                  </div>
                  <div className="lhc-ws-pill" title="Wind Speed">
                    <Wind size={12} className="cyan" />
                    <span>{loc.currentWeather.wind}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Leaflet Map showing location pins with callouts */}
      <div className="lhc-mini-map-wrap">
        <MapContainer
          center={mapCenter}
          zoom={5}
          scrollWheelZoom={false}
          className="lhc-leaflet-canvas"
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.latNum, loc.lngNum]}>
              <Popup className="lhc-popup">
                <div className="lhc-pop-box">
                  <strong>{loc.name}</strong>
                  <span className="lhc-pop-rain">{loc.currentWeather.rain}</span>
                  <span className="lhc-pop-sub">{loc.currentWeather.condition}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="lhc-map-overlay-badge">
          <span>Illustrative Geo Overlay</span>
        </div>
      </div>
    </div>
  );
}
