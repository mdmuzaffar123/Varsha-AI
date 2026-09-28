import React from "react";
import { LOSS_CURVE_DATA } from "../../data/modelData";
import "./TrainingLossChart.css";

export default function TrainingLossChart() {
  const width = 340;
  const height = 180;
  const xPadLeft = 32;
  const xPadRight = 14;
  const yPadTop = 14;
  const yPadBottom = 26;

  const chartW = width - xPadLeft - xPadRight;
  const chartH = height - yPadTop - yPadBottom;

  // Log scale conversion (from 10^1 down to 10^-2 => span = 3 decades)
  const logMax = 1;
  const logMin = -2;

  const getX = (epoch) => xPadLeft + (epoch / 100) * chartW;
  const getY = (lossVal) => {
    const logVal = Math.log10(Math.max(lossVal, 0.01));
    const normalized = (logMax - logVal) / (logMax - logMin);
    return yPadTop + normalized * chartH;
  };

  const trainPath = LOSS_CURVE_DATA.map((d, i) => {
    const x = getX(d.epoch);
    const y = getY(d.trainLoss);
    return `${i === 0 ? "M" : "L"} ${x},${y}`;
  }).join(" ");

  const valPath = LOSS_CURVE_DATA.map((d, i) => {
    const x = getX(d.epoch);
    const y = getY(d.valLoss);
    return `${i === 0 ? "M" : "L"} ${x},${y}`;
  }).join(" ");

  return (
    <div className="training-loss-card">
      {/* Header & Legends */}
      <div className="tlc-header">
        <h4 className="tlc-title">Training & Validation</h4>
        <div className="tlc-legend-group">
          <div className="tlc-legend-item">
            <span className="tlc-dot blue" />
            <span>Training Loss</span>
          </div>
          <div className="tlc-legend-item">
            <span className="tlc-dot green" />
            <span>Validation Loss</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area (Expanded Height) */}
      <div className="tlc-svg-wrapper">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="tlc-svg-chart"
          preserveAspectRatio="none"
        >
          {/* Horizontal Grid lines (10^1, 10^0, 10^-1, 10^-2) */}
          <line x1={xPadLeft} y1={getY(10)} x2={width - xPadRight} y2={getY(10)} stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1={xPadLeft} y1={getY(1)} x2={width - xPadRight} y2={getY(1)} stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1={xPadLeft} y1={getY(0.1)} x2={width - xPadRight} y2={getY(0.1)} stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1={xPadLeft} y1={getY(0.01)} x2={width - xPadRight} y2={getY(0.01)} stroke="#E2E8F0" strokeWidth="0.8" />

          {/* Y-Axis Log Labels */}
          <text x={xPadLeft - 6} y={getY(10) + 3} fill="#94A3B8" fontSize="8.5" textAnchor="end" fontWeight="600">10¹</text>
          <text x={xPadLeft - 6} y={getY(1) + 3} fill="#94A3B8" fontSize="8.5" textAnchor="end" fontWeight="600">10⁰</text>
          <text x={xPadLeft - 6} y={getY(0.1) + 3} fill="#94A3B8" fontSize="8.5" textAnchor="end" fontWeight="600">10⁻¹</text>
          <text x={xPadLeft - 6} y={getY(0.01) + 3} fill="#94A3B8" fontSize="8.5" textAnchor="end" fontWeight="600">10⁻²</text>

          {/* Y-Axis Title */}
          <text
            x="8"
            y={height / 2 - 6}
            fill="#64748B"
            fontSize="8.5"
            fontWeight="700"
            textAnchor="middle"
            transform={`rotate(-90 8,${height / 2 - 6})`}
          >
            Loss
          </text>

          {/* Validation Loss Curve (Green) */}
          <path
            d={valPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Training Loss Curve (Blue) */}
          <path
            d={trainPath}
            fill="none"
            stroke="#1677FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dots on Curves */}
          {LOSS_CURVE_DATA.map((d, i) => (
            <React.Fragment key={i}>
              <circle cx={getX(d.epoch)} cy={getY(d.valLoss)} r="2.2" fill="#10B981" />
              <circle cx={getX(d.epoch)} cy={getY(d.trainLoss)} r="2.2" fill="#1677FF" />
            </React.Fragment>
          ))}

          {/* X-Axis Ticks (Epochs) */}
          <text x={getX(0)} y={height - 6} fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontWeight="600">0</text>
          <text x={getX(20)} y={height - 6} fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontWeight="600">20</text>
          <text x={getX(40)} y={height - 6} fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontWeight="600">40</text>
          <text x={getX(60)} y={height - 6} fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontWeight="600">60</text>
          <text x={getX(80)} y={height - 6} fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontWeight="600">80</text>
          <text x={getX(100)} y={height - 6} fill="#94A3B8" fontSize="8.5" textAnchor="middle" fontWeight="600">100</text>

          {/* X-Axis Title */}
          <text x={xPadLeft + chartW / 2} y={height - 1} fill="#64748B" fontSize="8.5" textAnchor="middle" fontWeight="700">
            Epochs
          </text>
        </svg>
      </div>
    </div>
  );
}
