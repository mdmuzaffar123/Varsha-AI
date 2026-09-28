import { Radio, Satellite, Cpu, Bot, Bell } from "lucide-react";
import { productFlow } from "../../data/homeData";
import "./ProductFlow.css";

const iconMap = [Radio, Satellite, Cpu, Bot, Bell];

export default function ProductFlow() {
  return (
    <section className="flow-section section-pad">
      <div className="container">
        <div className="flow-header">
          <h2 className="section-title">From Data to Decision</h2>
          <p className="section-subtitle">How VarshaAI transforms raw atmospheric data into life-saving insights in real time.</p>
        </div>
        <div className="flow-steps">
          {productFlow.map((step, i) => {
            const Icon = iconMap[i];
            return (
              <div key={step.step} className="flow-item">
                <div className="flow-step-wrap">
                  <div className="flow-step-num">{step.step}</div>
                  <div className="flow-icon-circle">
                    <Icon size={22} />
                  </div>
                  <div className="flow-content">
                    <div className="flow-title">{step.title}</div>
                    <div className="flow-desc">{step.description}</div>
                  </div>
                </div>
                {i < productFlow.length - 1 && (
                  <div className="flow-arrow">
                    <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                      <path d="M0 8 H32 M28 4 L36 8 L28 12" stroke="#1677FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
