import React from "react";
import {
  CheckCircle2,
  FileText,
  Target,
  TrendingUp,
  Clock,
  Layers,
} from "lucide-react";
import {
  MODEL_ARCHITECTURES,
  ACCURACY_COMPARISON_BARS,
} from "../../data/modelData";
import "./ModelHeroShowcase.css";

export default function ModelHeroShowcase({
  activeTab = "earthformer",
  selectedDistrict = "Ranchi",
  onOpenModelDetails,
}) {
  const modelKey =
    activeTab === "convnext3d"
      ? "convNext3D"
      : activeTab === "ensemble"
      ? "ensemble"
      : activeTab === "comparison"
      ? "comparison"
      : "earthFormer";

  const currentModel = MODEL_ARCHITECTURES[modelKey] || MODEL_ARCHITECTURES.earthFormer;

  return (
    <div className="model-hero-showcase-grid">
      {/* ── Left Card: Model Architecture Showcase ── */}
      <div className="model-arch-card">
        {/* Header & Badges */}
        <div className="marc-header">
          <div className="marc-title-row">
            <h2 className="marc-title">{currentModel.title}</h2>
            <span className={`marc-badge ${currentModel.badgeType}`}>
              <span className="marc-badge-dot" />
              <span>{currentModel.badge}</span>
            </span>
          </div>
          <p className="marc-subtitle">{currentModel.subtitle}</p>
        </div>

        {/* Content Body (Features on Left + 3D Isometric Stack Graphic on Right) */}
        <div className="marc-body-layout">
          {/* Feature Checkmarks */}
          <div className="marc-features-list">
            {currentModel.features.map((feat, idx) => (
              <div key={idx} className="marc-feature-item">
                <CheckCircle2 size={16} className="marc-check-icon" />
                <span className="marc-feat-text">{feat}</span>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="marc-actions-group">
              <button
                className="marc-btn-primary"
                onClick={() => onOpenModelDetails && onOpenModelDetails(currentModel)}
              >
                <span>Model Details</span>
              </button>

              <a
                href={currentModel.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="marc-btn-outline"
                title="View Scientific Research Paper on arXiv"
              >
                <FileText size={14} />
                <span>View Research Paper</span>
              </a>
            </div>
          </div>

          {/* ── 3D Isometric SVG Diagram ── */}
          <div className="marc-isometric-diagram-wrap">
            <svg
              viewBox="0 0 340 260"
              xmlns="http://www.w3.org/2000/svg"
              className="earth-iso-svg"
            >
              <defs>
                {/*
                  All gradients use gradientUnits="userSpaceOnUse" so coordinates
                  map directly to the SVG canvas — this is the ONLY way radial gradients
                  reliably render inside clipped polygon tiles.
                */}

                {/* ═══ TILE 1: Input (DNR + Satellite) — blue/cyan satellite cloud ═══ */}
                <linearGradient id="t1bg" x1="62" y1="36" x2="174" y2="62" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0C3D6E" />
                  <stop offset="100%" stopColor="#075985" />
                </linearGradient>
                <radialGradient id="t1a" cx="95" cy="49" r="42" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t1b" cx="148" cy="30" r="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t1c" cx="160" cy="55" r="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t1d" cx="75" cy="56" r="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
                </radialGradient>

                {/* ═══ TILE 2: 3D Patch Embedding — purple/violet/indigo ═══ */}
                <linearGradient id="t2bg" x1="55" y1="82" x2="167" y2="108" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1E1B4B" />
                  <stop offset="100%" stopColor="#2E1065" />
                </linearGradient>
                <radialGradient id="t2a" cx="100" cy="95" r="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#A78BFA" />
                  <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t2b" cx="150" cy="76" r="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t2c" cx="68" cy="103" r="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#3730A3" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t2d" cx="157" cy="102" r="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                </radialGradient>

                {/* ═══ TILE 3: Transformer Blocks — full spectrum heatmap ═══ */}
                <linearGradient id="t3bg" x1="50" y1="128" x2="162" y2="154" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0C4A6E" />
                  <stop offset="100%" stopColor="#1E3A8A" />
                </linearGradient>
                <radialGradient id="t3a" cx="106" cy="141" r="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="28%" stopColor="#F97316" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="#FDE047" stopOpacity="0.6" />
                  <stop offset="85%" stopColor="#34D399" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t3b" cx="150" cy="120" r="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FDBA74" />
                  <stop offset="55%" stopColor="#FCD34D" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t3c" cx="65" cy="150" r="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#065F46" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t3d" cx="156" cy="152" r="16" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                </radialGradient>

                {/* ═══ TILE 4: Predicted Rainfall — green→yellow→orange→red ═══ */}
                <linearGradient id="t4bg" x1="45" y1="174" x2="157" y2="200" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#14532D" />
                  <stop offset="100%" stopColor="#052E16" />
                </linearGradient>
                <radialGradient id="t4a" cx="101" cy="187" r="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="25%" stopColor="#EA580C" stopOpacity="0.9" />
                  <stop offset="52%" stopColor="#FACC15" stopOpacity="0.65" />
                  <stop offset="80%" stopColor="#4ADE80" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#166534" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t4b" cx="144" cy="168" r="26" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="60%" stopColor="#FDE047" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t4c" cx="62" cy="198" r="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#14532D" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="t4d" cx="152" cy="197" r="15" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FDE047" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#166534" stopOpacity="0" />
                </radialGradient>

                {/* Clip paths — slightly larger than tile to avoid edge artifacts */}
                <clipPath id="cp1"><polygon points="60,34 174,16 174,64 60,64" /></clipPath>
                <clipPath id="cp2"><polygon points="55,80 167,62 167,110 55,110" /></clipPath>
                <clipPath id="cp3"><polygon points="50,126 162,108 162,156 50,156" /></clipPath>
                <clipPath id="cp4"><polygon points="45,172 157,154 157,202 45,202" /></clipPath>
              </defs>

              {/* ══════════════════════════════════════════════════════ */}
              {/*  3-D CHASSIS / BOX FRAME                              */}
              {/* ══════════════════════════════════════════════════════ */}
              {/* Back wall */}
              <polygon points="62,18 174,0 174,218 62,236" fill="#1E293B" />
              {/* Left side wall (darkest face) */}
              <polygon points="18,57 62,18 62,236 18,275" fill="#0F172A" />
              {/* Top lid (medium tint) */}
              <polygon points="18,57 62,18 174,0 130,39" fill="#293D54" />
              {/* Bottom floor */}
              <polygon points="18,275 62,236 174,218 130,257" fill="#0B1421" />
              {/* Right narrow face */}
              <polygon points="130,39 174,0 174,218 130,257" fill="#162031" />

              {/* Structural edge lines */}
              <line x1="18" y1="57" x2="18" y2="275" stroke="#334155" strokeWidth="1.2" />
              <line x1="62" y1="18" x2="62" y2="236" stroke="#3B5268" strokeWidth="0.8" />
              <line x1="174" y1="0" x2="174" y2="218" stroke="#3B5268" strokeWidth="0.8" />
              <line x1="130" y1="39" x2="130" y2="257" stroke="#3B5268" strokeWidth="0.8" />

              {/* ══════════════════════════════════════════════════════ */}
              {/*  TILE 1 — Input (DNR + Satellite)  y≈36–62            */}
              {/* ══════════════════════════════════════════════════════ */}
              <g clipPath="url(#cp1)">
                <polygon points="62,36 174,18 174,62 62,62" fill="url(#t1bg)" />
                <ellipse cx="95" cy="49" rx="50" ry="16" fill="url(#t1a)" />
                <ellipse cx="148" cy="30" rx="38" ry="12" fill="url(#t1b)" />
                <ellipse cx="160" cy="56" rx="24" ry="8" fill="url(#t1c)" />
                <ellipse cx="75" cy="57" rx="22" ry="7" fill="url(#t1d)" />
              </g>
              {/* Left depth edge */}
              <polygon points="18,75 62,36 62,62 18,101" fill="#0B2D42" />
              {/* Top sheen */}
              <polygon points="18,75 62,36 174,18 130,57" fill="rgba(255,255,255,0.04)" />
              {/* Borders */}
              <polygon points="62,36 174,18 174,62 62,62" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" />
              <polygon points="18,75 62,36 62,62 18,101" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.9" />

              {/* ══════════════════════════════════════════════════════ */}
              {/*  TILE 2 — 3D Patch Embedding  y≈82–108                */}
              {/* ══════════════════════════════════════════════════════ */}
              <g clipPath="url(#cp2)">
                <polygon points="55,82 167,64 167,108 55,108" fill="url(#t2bg)" />
                <ellipse cx="100" cy="95" rx="52" ry="16" fill="url(#t2a)" />
                <ellipse cx="150" cy="76" rx="36" ry="11" fill="url(#t2b)" />
                <ellipse cx="68" cy="104" rx="24" ry="8" fill="url(#t2c)" />
                <ellipse cx="157" cy="103" rx="20" ry="7" fill="url(#t2d)" />
              </g>
              <polygon points="13,121 55,82 55,108 13,147" fill="#0A1A40" />
              <polygon points="13,121 55,82 167,64 125,103" fill="rgba(255,255,255,0.03)" />
              <polygon points="55,82 167,64 167,108 55,108" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" />
              <polygon points="13,121 55,82 55,108 13,147" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.9" />

              {/* ══════════════════════════════════════════════════════ */}
              {/*  TILE 3 — Spatio-Temporal Transformer Blocks  y≈128–154 */}
              {/* ══════════════════════════════════════════════════════ */}
              <g clipPath="url(#cp3)">
                <polygon points="50,128 162,110 162,154 50,154" fill="url(#t3bg)" />
                <ellipse cx="106" cy="141" rx="54" ry="16" fill="url(#t3a)" />
                <ellipse cx="150" cy="121" rx="34" ry="11" fill="url(#t3b)" />
                <ellipse cx="65" cy="152" rx="26" ry="8" fill="url(#t3c)" />
                <ellipse cx="156" cy="153" rx="18" ry="6" fill="url(#t3d)" />
              </g>
              <polygon points="8,167 50,128 50,154 8,193" fill="#090F2C" />
              <polygon points="8,167 50,128 162,110 120,149" fill="rgba(255,255,255,0.03)" />
              <polygon points="50,128 162,110 162,154 50,154" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" />
              <polygon points="8,167 50,128 50,154 8,193" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.9" />

              {/* ══════════════════════════════════════════════════════ */}
              {/*  TILE 4 — Predicted Rainfall (Next 6 Hours) y≈174–200 */}
              {/* ══════════════════════════════════════════════════════ */}
              <g clipPath="url(#cp4)">
                <polygon points="45,174 157,156 157,200 45,200" fill="url(#t4bg)" />
                <ellipse cx="101" cy="187" rx="52" ry="16" fill="url(#t4a)" />
                <ellipse cx="144" cy="168" rx="32" ry="11" fill="url(#t4b)" />
                <ellipse cx="62" cy="199" rx="24" ry="8" fill="url(#t4c)" />
                <ellipse cx="152" cy="198" rx="17" ry="6" fill="url(#t4d)" />
              </g>
              <polygon points="3,213 45,174 45,200 3,239" fill="#060C18" />
              <polygon points="3,213 45,174 157,156 115,195" fill="rgba(255,255,255,0.02)" />
              <polygon points="45,174 157,156 157,200 45,200" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" />
              <polygon points="3,213 45,174 45,200 3,239" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.9" />

              {/* ══════════════════════════════════════════════════════ */}
              {/*  RIGHT-SIDE LABELS + CONNECTOR LINES                  */}
              {/* ══════════════════════════════════════════════════════ */}

              {/* — Label 1: Input (DNR + Satellite) — */}
              <circle cx="174" cy="40" r="3.5" fill="#38BDF8" />
              <line x1="174" y1="40" x2="222" y2="40" stroke="#38BDF8" strokeWidth="1.4" />
              <circle cx="222" cy="40" r="2.5" fill="#38BDF8" />
              <text x="227" y="36" fontSize="9" fontWeight="700" fill="#0F172A" fontFamily="Inter,system-ui,sans-serif">Input</text>
              <text x="227" y="48" fontSize="8" fill="#64748B" fontFamily="Inter,system-ui,sans-serif">(DNR + Satellite)</text>

              {/* — Label 2: 3D Patch Embedding — */}
              <circle cx="167" cy="86" r="3.5" fill="#38BDF8" />
              <line x1="167" y1="86" x2="222" y2="86" stroke="#38BDF8" strokeWidth="1.4" />
              <circle cx="222" cy="86" r="2.5" fill="#38BDF8" />
              <text x="227" y="82" fontSize="9" fontWeight="700" fill="#0F172A" fontFamily="Inter,system-ui,sans-serif">3D Patch</text>
              <text x="227" y="94" fontSize="8" fill="#64748B" fontFamily="Inter,system-ui,sans-serif">Embedding</text>

              {/* — Label 3: Spatio-Temporal Transformer Blocks — */}
              <circle cx="162" cy="132" r="3.5" fill="#38BDF8" />
              <line x1="162" y1="132" x2="222" y2="132" stroke="#38BDF8" strokeWidth="1.4" />
              <circle cx="222" cy="132" r="2.5" fill="#38BDF8" />
              <text x="227" y="128" fontSize="9" fontWeight="700" fill="#0F172A" fontFamily="Inter,system-ui,sans-serif">Spatio-Temporal</text>
              <text x="227" y="140" fontSize="8" fill="#64748B" fontFamily="Inter,system-ui,sans-serif">Transformer Blocks</text>

              {/* — Label 4: Predicted Rainfall — */}
              <circle cx="157" cy="178" r="3.5" fill="#38BDF8" />
              <line x1="157" y1="178" x2="222" y2="178" stroke="#38BDF8" strokeWidth="1.4" />
              <circle cx="222" cy="178" r="2.5" fill="#38BDF8" />
              <text x="227" y="174" fontSize="9" fontWeight="700" fill="#0F172A" fontFamily="Inter,system-ui,sans-serif">Predicted Rainfall</text>
              <text x="227" y="186" fontSize="8" fill="#64748B" fontFamily="Inter,system-ui,sans-serif">(Next 6 Hours)</text>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Right Card: Model Performance & Comparison ── */}
      <div className="model-perf-card">
        <div className="mperf-header">
          <h3 className="mperf-title">Model Performance ({selectedDistrict}, Jharkhand)</h3>
        </div>

        {/* 4 Metric Pills Row */}
        <div className="mperf-metrics-row">
          {/* Metric 1: Accuracy */}
          <div className="mperf-metric-pill">
            <div className="mperf-icon-box blue">
              <Target size={16} />
            </div>
            <div className="mperf-mdata">
              <span className="mperf-mval">{currentModel.metrics.accuracy}</span>
              <span className="mperf-mlbl">Accuracy</span>
            </div>
          </div>

          {/* Metric 2: RMSE */}
          <div className="mperf-metric-pill">
            <div className="mperf-icon-box blue">
              <TrendingUp size={16} />
            </div>
            <div className="mperf-mdata">
              <span className="mperf-mval">{currentModel.metrics.rmse}</span>
              <span className="mperf-mlbl">RMSE (mm)</span>
            </div>
          </div>

          {/* Metric 3: Horizon */}
          <div className="mperf-metric-pill">
            <div className="mperf-icon-box blue">
              <Clock size={16} />
            </div>
            <div className="mperf-mdata">
              <span className="mperf-mval">{currentModel.metrics.horizon}</span>
              <span className="mperf-mlbl">Forecast Horizon</span>
            </div>
          </div>

          {/* Metric 4: Source */}
          <div className="mperf-metric-pill">
            <div className="mperf-icon-box blue">
              <Layers size={16} />
            </div>
            <div className="mperf-mdata">
              <span className="mperf-mval">Multi-source</span>
              <span className="mperf-mlbl">{currentModel.metrics.sources}</span>
            </div>
          </div>
        </div>

        {/* Model Comparison (Accuracy) Bar Chart */}
        <div className="mperf-chart-box">
          <h4 className="mperf-chart-subtitle">Model Comparison (Accuracy)</h4>

          <div className="mperf-barchart-canvas">
            {/* Y-Axis Ticks */}
            <div className="mperf-yaxis">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* Bars Column Container */}
            <div className="mperf-bars-grid">
              {/* Horizontal Grid lines */}
              <div className="mperf-grid-line gl-100" />
              <div className="mperf-grid-line gl-80" />
              <div className="mperf-grid-line gl-60" />
              <div className="mperf-grid-line gl-40" />
              <div className="mperf-grid-line gl-20" />

              {ACCURACY_COMPARISON_BARS.map((item) => {
                return (
                  <div key={item.name} className="mperf-bar-col">
                    <span className="mperf-bar-val-label">{item.accuracy}%</span>
                    <div className="mperf-bar-track">
                      <div
                        className={`mperf-bar-fill ${item.isPrimary ? "primary" : ""} ${item.isTop ? "top" : ""}`}
                        style={{
                          height: `${item.accuracy}%`,
                          backgroundColor: item.fill,
                        }}
                      />
                    </div>
                    <span className={`mperf-bar-name ${item.isPrimary ? "bold" : ""}`}>
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
