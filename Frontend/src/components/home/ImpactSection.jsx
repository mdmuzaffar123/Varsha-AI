import { useState } from "react";
import { Play, CheckCircle2 } from "lucide-react";
import { impactStats } from "../../data/homeData";
import heroBg from "../../assets/images/hero_bg.jpg";
import "./ImpactSection.css";

export default function ImpactSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section className="impact-section section-pad">
      <div className="container">
        <div className="impact-grid">
          {/* LEFT */}
          <div className="impact-left">
            <div className="badge badge-green" style={{ marginBottom: 16 }}>Climate Impact</div>
            <h2 className="section-title">Towards a Climate-Resilient India</h2>
            <p className="section-subtitle" style={{ marginTop: 16 }}>
              Empowering communities, authorities and decision-makers with accurate,
              AI-driven weather insights to reduce disaster risk and build safer, stronger regions.
            </p>
            <div className="impact-stats">
              {impactStats.map((s, i) => (
                <div key={i} className="impact-stat-item">
                  <CheckCircle2 size={18} className="impact-check" />
                  <div>
                    <div className="impact-stat-val">{s.value}</div>
                    <div className="impact-stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="impact-right">
            <div className="impact-media-card" style={{ backgroundImage: `url(${heroBg})` }}>
              <div className="impact-media-overlay" />
              <div className="impact-media-text">
                <div>Better Forecasts</div>
                <div>Stronger Communities</div>
                <div>A Safer India</div>
              </div>
              <button className="impact-play-btn" onClick={() => setVideoOpen(true)}>
                <Play size={28} fill="white" color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {videoOpen && (
        <div className="demo-overlay" onClick={() => setVideoOpen(false)}>
          <div className="demo-modal" onClick={e => e.stopPropagation()}>
            <button className="demo-close" onClick={() => setVideoOpen(false)}>✕</button>
            <h3 className="demo-title">VarshaAI Story</h3>
            <div className="demo-video-area">
              <Play size={48} color="#1677FF" />
              <p>Storytelling video will be integrated here.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
