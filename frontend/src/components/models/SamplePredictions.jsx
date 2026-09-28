import React, { useState } from "react";
import { Play } from "lucide-react";
import { SAMPLE_PREDICTION_STEPS } from "../../data/modelData";
import "./SamplePredictions.css";

export default function SamplePredictions() {
  const [activeStep, setActiveStep] = useState("now");

  return (
    <div className="sample-predictions-card">
      <div className="spc-header">
        <div className="spc-title-group">
          <h4 className="spc-title">Sample Predictions</h4>
          <span className="spc-sub-badge">Multi-Step Nowcast</span>
        </div>
        <span className="spc-meta-hint">Click frame to inspect</span>
      </div>

      <div className="spc-steps-grid">
        {SAMPLE_PREDICTION_STEPS.map((step) => {
          const isSelected = activeStep === step.id;
          return (
            <div
              key={step.id}
              className={`spc-step-card ${isSelected ? "active" : ""}`}
              onClick={() => setActiveStep(step.id)}
              title={`${step.label} (${step.time}) — Predicted: ${step.rainMm}`}
            >
              {/* Thumbnail Map Simulation (Expanded Length & Proportions) */}
              <div className="spc-thumb-preview">
                <svg viewBox="0 0 80 115" className="spc-svg-thumb">
                  {/* Dark satellite map background */}
                  <rect width="80" height="115" fill="#071C35" />

                  {/* Satellite terrain contours */}
                  <path d="M 0,30 Q 40,22 80,52 L 80,115 L 0,115 Z" fill="#0B2748" opacity="0.75" />
                  <path d="M 0,68 Q 35,52 80,82 L 80,115 L 0,115 Z" fill="#0A223E" opacity="0.9" />

                  {/* Range circles */}
                  <circle cx="40" cy="58" r="34" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" strokeDasharray="2,2" />
                  <circle cx="40" cy="58" r="20" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="2,2" />

                  {/* Prediction Heat Cloud (Evolving Spatio-Temporal Intensity) */}
                  <circle
                    cx="40"
                    cy="58"
                    r={step.id === "now" ? 28 : step.id === "+1h" ? 32 : step.id === "+3h" ? 34 : 22}
                    fill="#06B6D4"
                    fillOpacity="0.45"
                    filter="blur(3.5px)"
                  />
                  <circle
                    cx="40"
                    cy="58"
                    r={step.id === "now" ? 18 : step.id === "+1h" ? 21 : step.id === "+3h" ? 23 : 13}
                    fill="#FACC15"
                    fillOpacity="0.68"
                    filter="blur(2.5px)"
                  />
                  <circle
                    cx="40"
                    cy="58"
                    r={step.id === "now" ? 10 : step.id === "+1h" ? 12 : step.id === "+3h" ? 14 : 7}
                    fill="#EF4444"
                    fillOpacity="0.92"
                  />

                  {/* Center pin dot */}
                  <circle cx="40" cy="58" r="3" fill="#FFFFFF" />
                </svg>

                {/* Play hover icon */}
                <div className="spc-play-overlay">
                  <div className="spc-play-bubble">
                    <Play size={14} fill="#ffffff" />
                  </div>
                </div>

                {/* Rain mm pill on top right */}
                <div className="spc-rain-tag">{step.rainMm}</div>
              </div>

              {/* Step Info Footer */}
              <div className="spc-card-footer">
                <span className="spc-step-label">{step.label}</span>
                <span className="spc-step-time">{step.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
