import React from "react";
import { Radio, Sliders, Cpu, CloudRain, Sparkles, ShieldAlert, ArrowRight } from "lucide-react";
import { END_TO_END_WORKFLOW_STEPS } from "../../data/modelData";
import "./EndToEndWorkflow.css";

const STEP_ICONS = {
  Radio: Radio,
  Sliders: Sliders,
  Cpu: Cpu,
  CloudRain: CloudRain,
  Sparkles: Sparkles,
  ShieldAlert: ShieldAlert,
};

export default function EndToEndWorkflow() {
  return (
    <div className="end-to-end-workflow-card">
      <div className="e2e-header">
        <div className="e2e-title-row">
          <Sparkles size={16} className="e2e-spark-icon" />
          <h3 className="e2e-title">VarshaAI Intelligence Workflow</h3>
        </div>
        <span className="e2e-sub">From Multimodal Weather Ingest to Community Early Warning</span>
      </div>

      <div className="e2e-steps-flow">
        {END_TO_END_WORKFLOW_STEPS.map((step, idx) => {
          const Icon = STEP_ICONS[step.icon] || Radio;
          const isLast = idx === END_TO_END_WORKFLOW_STEPS.length - 1;

          return (
            <React.Fragment key={step.step}>
              <div className="e2e-step-node">
                <div className="e2e-step-badge">{step.step}</div>
                <div className="e2e-icon-circle">
                  <Icon size={18} />
                </div>
                <strong className="e2e-step-name">{step.name}</strong>
                <p className="e2e-step-desc">{step.desc}</p>
              </div>

              {!isLast && (
                <div className="e2e-arrow-separator">
                  <ArrowRight size={15} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
