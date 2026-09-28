import { useNavigate } from "react-router-dom";
import { CloudRain, Radio, Cpu, Bell, BarChart2, FileText, ArrowRight } from "lucide-react";
import { features } from "../../data/homeData";
import "./FeatureSection.css";

const iconMap = { "cloud-rain": CloudRain, radar: Radio, cpu: Cpu, bell: Bell, "bar-chart-2": BarChart2, "file-text": FileText };

export default function FeatureSection() {
  const navigate = useNavigate();
  return (
    <section className="features-section section-pad">
      <div className="container">
        <div className="features-header">
          <h2 className="section-title">Explore Key Features</h2>
          <p className="section-subtitle">From real-time weather data to AI-powered insights — everything you need for accurate and actionable rainfall forecasts.</p>
        </div>
        <div className="features-grid">
          {features.map(f => {
            const Icon = iconMap[f.icon] || CloudRain;
            return (
              <div key={f.id} className="feature-card" onClick={() => navigate(f.route)}>
                <div className="fc-icon" style={{ background: `${f.color}18`, color: f.color }}>
                  <Icon size={22} />
                </div>
                <div className="fc-body">
                  <h3 className="fc-title">{f.title}</h3>
                  <p className="fc-desc">{f.description}</p>
                </div>
                <div className="fc-arrow"><ArrowRight size={16} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
