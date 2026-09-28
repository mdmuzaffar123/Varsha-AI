import { CheckCircle2 } from "lucide-react";
import { whyFeatures } from "../../data/homeData";
import "./WhyVarshaAI.css";

export default function WhyVarshaAI() {
  return (
    <section className="why-section section-pad">
      <div className="container">
        <div className="why-header">
          <h2 className="section-title">Why VarshaAI?</h2>
          <p className="section-subtitle">Technology designed to turn complex weather data into simple, actionable intelligence.</p>
        </div>
        <div className="why-grid">
          {whyFeatures.map((f, i) => (
            <div key={i} className="why-card">
              <div className="why-icon"><CheckCircle2 size={20} /></div>
              <div>
                <h3 className="why-title">{f.title}</h3>
                <p className="why-desc">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
