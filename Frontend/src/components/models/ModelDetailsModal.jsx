import React from "react";
import { X, Layers, FileText, CheckCircle2, ExternalLink, Cpu } from "lucide-react";
import "./ModelDetailsModal.css";

export default function ModelDetailsModal({ model, onClose }) {
  if (!model) return null;

  return (
    <div className="mdm-overlay" onClick={onClose}>
      <div className="mdm-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="mdm-head">
          <div className="mdm-head-left">
            <Cpu size={18} className="mdm-head-icon" />
            <div>
              <h3 className="mdm-title">{model.title}</h3>
              <span className="mdm-sub">{model.subtitle}</span>
            </div>
          </div>
          <button className="mdm-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mdm-body">
          {/* Key Architectural Highlights */}
          <div className="mdm-section">
            <h4 className="mdm-sec-title">Architectural Highlights</h4>
            <div className="mdm-features-grid">
              {model.features.map((feat, i) => (
                <div key={i} className="mdm-feat-item">
                  <CheckCircle2 size={15} className="mdm-check" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Layer Computational Hierarchy */}
          <div className="mdm-section">
            <h4 className="mdm-sec-title">Computational Tensor Hierarchy</h4>
            <div className="mdm-stack-list">
              {model.layerStack.map((layer, idx) => (
                <div key={idx} className="mdm-stack-item">
                  <div className="mdm-stack-num">0{idx + 1}</div>
                  <div className="mdm-stack-info">
                    <strong>{layer.name}</strong>
                    <span>{layer.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Metrics */}
          <div className="mdm-section">
            <h4 className="mdm-sec-title">Validation Benchmark Metrics (Illustrative Demo)</h4>
            <div className="mdm-metrics-grid">
              <div className="mdm-mcard">
                <span>Accuracy</span>
                <strong>{model.metrics.accuracy}</strong>
              </div>
              <div className="mdm-mcard">
                <span>RMSE</span>
                <strong>{model.metrics.rmse}</strong>
              </div>
              <div className="mdm-mcard">
                <span>Precision</span>
                <strong>{model.metrics.precision}</strong>
              </div>
              <div className="mdm-mcard">
                <span>Recall</span>
                <strong>{model.metrics.recall}</strong>
              </div>
              <div className="mdm-mcard">
                <span>F1 Score</span>
                <strong>{model.metrics.f1Score}</strong>
              </div>
              <div className="mdm-mcard">
                <span>MAE</span>
                <strong>{model.metrics.mae}</strong>
              </div>
            </div>
          </div>

          {/* Scientific Paper Link */}
          <div className="mdm-paper-footer">
            <div className="mdm-paper-text">
              <FileText size={16} className="mdm-paper-icon" />
              <span>{model.paperTitle}</span>
            </div>
            <a
              href={model.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mdm-paper-link"
            >
              <span>Read on arXiv</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
