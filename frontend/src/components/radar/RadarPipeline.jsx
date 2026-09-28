import React from "react";
import { Radio, Sliders, Layers, Cpu, CloudRain, Sparkles, ShieldAlert, ArrowRight } from "lucide-react";
import { RADAR_AI_PIPELINE_STEPS } from "../../data/radarData";
import "./RadarPipeline.css";

const PIPELINE_ICONS = {
  Radio: Radio,
  Sliders: Sliders,
  Layers: Layers,
  Cpu: Cpu,
  CloudRain: CloudRain,
  Sparkles: Sparkles,
  ShieldAlert: ShieldAlert,
};

export default function RadarPipeline() {
  return (
    <div className="radar-pipeline-card">
      <div className="rpipe-header">
        <div className="rpipe-title-row">
          <Cpu size={16} className="rpipe-icon-spark" />
          <h3 className="rpipe-title">From Radar Observation to AI Forecast</h3>
        </div>
        <span className="rpipe-sub">Deep Learning Pipeline Architecture Preview</span>
      </div>

      <div className="rpipe-steps-scroll">
        {RADAR_AI_PIPELINE_STEPS.map((step, idx) => {
          const Icon = PIPELINE_ICONS[step.icon] || Radio;
          const isLast = idx === RADAR_AI_PIPELINE_STEPS.length - 1;

          return (
            <React.Fragment key={step.step}>
              <div className="rpipe-step-box">
                <div className="rpipe-step-num">{step.step}</div>
                <div className="rpipe-step-icon">
                  <Icon size={18} />
                </div>
                <div className="rpipe-step-name">{step.name}</div>
                <div className="rpipe-step-desc">{step.desc}</div>
              </div>

              {!isLast && (
                <div className="rpipe-arrow-divider">
                  <ArrowRight size={14} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
