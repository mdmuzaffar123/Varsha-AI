import React from "react";
import "./RadarCrossSection.css";

export default function RadarCrossSection({ locationData }) {
  const crossSection = locationData?.crossSection || {
    title: "Vertical Cross-Section (Height vs Reflectivity)",
    sliceBearing: "SW to NE (225° - 45°)",
    peakDbz: 55,
    corePeakAlt: 8.5,
  };

  return (
    <div className="radar-cross-section-card">
      <div className="rcs-header">
        <h3 className="rcs-title">Vertical Cross-Section (Height vs Reflectivity)</h3>
        <span className="rcs-bearing-tag">Slice: {crossSection.sliceBearing || "SW to NE"}</span>
      </div>

      {/* SVG Atmospheric Radar Cross-Section Graphic */}
      <div className="rcs-canvas-wrapper">
        <svg
          viewBox="0 0 440 180"
          className="rcs-svg-chart"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Multi-tier Convective Plume Gradient */}
            <linearGradient id="cloudOuterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#10B981" stopOpacity="0.75" />
              <stop offset="90%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="cloudMidGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FACC15" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="cloudCoreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#DC2626" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="cloudSevereCore" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#991B1B" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Dark Radar Scan Background */}
          <rect x="40" y="10" width="385" height="140" fill="#071C35" rx="4" />

          {/* Horizontal Height Gridlines (15km, 10km, 5km, 0km) */}
          <line x1="40" y1="10" x2="425" y2="10" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="56" x2="425" y2="56" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="103" x2="425" y2="103" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="150" x2="425" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          {/* Vertical Distance Gridlines (0km, 30km, 60km, 90km, 120km) */}
          <line x1="40" y1="10" x2="40" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="136" y1="10" x2="136" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="232" y1="10" x2="232" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="328" y1="10" x2="328" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="425" y1="10" x2="425" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* 1. Outer Echo Plume (Cyan/Green - reaches up to 11km) */}
          <path
            d="M 60,150 
               C 80,135 110,120 140,110 
               C 170,100 190,45 230,35 
               C 270,28 290,42 320,55 
               C 350,68 380,120 410,150 
               Z"
            fill="url(#cloudOuterGrad)"
          />

          {/* 2. Mid Convective Tower (Yellow/Orange - reaches 9km) */}
          <path
            d="M 120,150 
               C 145,130 170,105 195,85 
               C 220,65 240,48 265,52 
               C 290,56 315,80 340,110 
               C 365,135 385,145 395,150 
               Z"
            fill="url(#cloudMidGrad)"
          />

          {/* 3. Severe Precipitation Core (Red - reaches 7.5km) */}
          <path
            d="M 175,150 
               C 195,125 210,95 235,78 
               C 260,65 285,72 305,92 
               C 325,112 340,138 355,150 
               Z"
            fill="url(#cloudCoreGrad)"
          />

          {/* 4. Peak Reflectivity Hotspot (Dark Red 55+ dBZ) */}
          <path
            d="M 215,150 
               C 228,128 238,102 255,95 
               C 272,90 282,110 292,130 
               C 300,142 308,148 315,150 
               Z"
            fill="url(#cloudSevereCore)"
          />

          {/* Freezing Level 0°C Isotherm Line (approx 4.5 km) */}
          <line x1="40" y1="108" x2="425" y2="108" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="4,2" />
          <text x="48" y="105" fill="#38BDF8" fontSize="8.5" fontWeight="600">0°C Freezing Level (4.5 km)</text>

          {/* Y-Axis Labels (Height km) */}
          <text x="32" y="14" fill="#94A3B8" fontSize="9" textAnchor="end" fontWeight="600">15</text>
          <text x="32" y="60" fill="#94A3B8" fontSize="9" textAnchor="end" fontWeight="600">10</text>
          <text x="32" y="107" fill="#94A3B8" fontSize="9" textAnchor="end" fontWeight="600">5</text>
          <text x="32" y="153" fill="#94A3B8" fontSize="9" textAnchor="end" fontWeight="600">0</text>

          {/* Y-Axis Title */}
          <text
            x="12"
            y="80"
            fill="#64748B"
            fontSize="8.5"
            fontWeight="700"
            textAnchor="middle"
            transform="rotate(-90 12,80)"
          >
            Height (km)
          </text>

          {/* X-Axis Labels (Distance km) */}
          <text x="40" y="168" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="600">0 km</text>
          <text x="136" y="168" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="600">30 km</text>
          <text x="232" y="168" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="600">60 km</text>
          <text x="328" y="168" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="600">90 km</text>
          <text x="425" y="168" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="600">120 km</text>
        </svg>
      </div>
    </div>
  );
}
