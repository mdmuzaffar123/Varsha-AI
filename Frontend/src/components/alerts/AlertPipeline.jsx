import React from "react";
import { ArrowRight, Eye, Cpu, Activity, Bot, BellRing } from "lucide-react";
import { ALERT_PIPELINE_STAGES } from "../../data/alertData";
import "./AlertPipeline.css";

const STAGE_ICON_MAP = {
  "01": Eye,
  "02": Cpu,
  "03": Activity,
  "04": Bot,
  "05": BellRing,
};

export default function AlertPipeline() {
  return (
    <div className="alert-pipeline-card">
      <div className="apl-header">
        <h3 className="apl-title">AI Early-Warning Alert Pipeline</h3>
        <span className="apl-badge">5-Stage System Architecture</span>
      </div>

      <p className="apl-subtitle">
        End-to-end transformation from raw sensor radar and satellite streams to actionable early-warning alerts.
      </p>

      {/* 5 Stage Grid */}
      <div className="apl-stages-grid">
        {ALERT_PIPELINE_STAGES.map((stg, idx) => {
          const IconComponent = STAGE_ICON_MAP[stg.step] || Eye;
          return (
            <React.Fragment key={stg.step}>
              <div className="apl-stage-card">
                <div className="apl-sc-top">
                  <span className="apl-num">{stg.step}</span>
                  <div className="apl-icon-box">
                    <IconComponent size={16} />
                  </div>
                </div>

                <span className="apl-stage-name">{stg.name}</span>
                <h4 className="apl-stage-title">{stg.title}</h4>
                <p className="apl-stage-desc">{stg.desc}</p>
              </div>

              {idx < ALERT_PIPELINE_STAGES.length - 1 && (
                <div className="apl-arrow-wrapper">
                  <ArrowRight size={16} className="apl-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
