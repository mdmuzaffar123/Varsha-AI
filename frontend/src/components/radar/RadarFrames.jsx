import React from "react";
import { Play } from "lucide-react";
import "./RadarFrames.css";

const FRAME_THUMBS = [
  { idx: 1, time: "09:00 AM", clusterCount: 3, coreDbz: 36, scale: 0.8 },
  { idx: 2, time: "09:30 AM", clusterCount: 3, coreDbz: 40, scale: 0.9 },
  { idx: 3, time: "10:00 AM", clusterCount: 3, coreDbz: 46, scale: 1.0 },
  { idx: 4, time: "10:30 AM", clusterCount: 4, coreDbz: 48, scale: 1.1 },
  { idx: 5, time: "11:00 AM", clusterCount: 4, coreDbz: 52, scale: 1.2 },
  { idx: 6, time: "11:30 AM", clusterCount: 7, coreDbz: 55, scale: 1.3, isLive: true },
];

export default function RadarFrames({ selectedFrameIndex = 6, onSelectFrameIndex }) {
  return (
    <div className="radar-recent-frames-card">
      <div className="rrf-header">
        <h3 className="rrf-title">Recent Radar Frames</h3>
      </div>

      {/* 6 Thumbnail Cards Row */}
      <div className="rrf-thumbnails-grid">
        {FRAME_THUMBS.map((thumb) => {
          const isSelected = selectedFrameIndex === thumb.idx;
          return (
            <div
              key={thumb.time}
              className={`rrf-thumb-card ${isSelected ? "active" : ""}`}
              onClick={() => onSelectFrameIndex && onSelectFrameIndex(thumb.idx)}
              title={`Switch map to ${thumb.time} radar frame`}
            >
              {/* Mini Radar Canvas Simulation */}
              <div className="rrf-thumb-preview">
                <svg viewBox="0 0 80 60" className="rrf-svg-thumb">
                  {/* Dark satellite map backdrop */}
                  <rect width="80" height="60" fill="#0A223E" />

                  {/* Range circles */}
                  <circle cx="40" cy="30" r="16" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="2,2" />
                  <circle cx="40" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" strokeDasharray="2,2" />

                  {/* Outer cloud */}
                  <circle
                    cx="40"
                    cy="30"
                    r={18 * thumb.scale}
                    fill="#06B6D4"
                    fillOpacity="0.45"
                    filter="blur(2px)"
                  />

                  {/* Mid band */}
                  <circle
                    cx="40"
                    cy="30"
                    r={11 * thumb.scale}
                    fill="#FACC15"
                    fillOpacity="0.65"
                    filter="blur(1.5px)"
                  />

                  {/* Core red */}
                  <circle
                    cx="40"
                    cy="30"
                    r={6 * thumb.scale}
                    fill="#EF4444"
                    fillOpacity="0.9"
                  />

                  {/* Center station dot */}
                  <circle cx="40" cy="30" r="2" fill="#FFFFFF" />
                </svg>

                {/* Play hover overlay */}
                <div className="rrf-play-overlay">
                  <Play size={12} fill="#ffffff" />
                </div>
              </div>

              {/* Time Label */}
              <span className="rrf-thumb-time">{thumb.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
