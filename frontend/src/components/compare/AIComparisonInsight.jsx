import React, { useState } from "react";
import { Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Info, ArrowRight, Bot, Cpu, Layers } from "lucide-react";
import { AI_COMPARISON_INSIGHTS_POOL } from "../../data/compareData";
import { generateAIComparisonInsight } from "../../services/compareService";
import "./AIComparisonInsight.css";

export default function AIComparisonInsight({ locations }) {
  const [insightIndex, setInsightIndex] = useState(0);
  const [currentPool, setCurrentPool] = useState(AI_COMPARISON_INSIGHTS_POOL[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    const nextPool = await generateAIComparisonInsight(insightIndex);
    setInsightIndex((prev) => (prev + 1) % AI_COMPARISON_INSIGHTS_POOL.length);
    setCurrentPool(nextPool);
    setIsGenerating(false);
  };

  return (
    <div className="ai-comparison-insight-card">
      <div className="aici-header">
        <div className="aici-title-group">
          <Sparkles size={16} className="aici-icon" />
          <h3 className="aici-title">Key Insights</h3>
        </div>
        <span className="aici-badge">AI-Generated Demo Insight</span>
      </div>

      {/* Bullet Cards List */}
      <div className="aici-bullets-list">
        {currentPool.insights.map((item, idx) => (
          <div key={idx} className={`aici-bullet-card ${item.type}`}>
            <div className="aici-bullet-icon">
              {item.type === "success" && <CheckCircle2 size={16} className="green" />}
              {item.type === "warning" && <AlertTriangle size={16} className="amber" />}
              {item.type === "info" && <Info size={16} className="blue" />}
            </div>
            <p className="aici-bullet-text">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Conceptual Workflow Diagram */}
      <div className="aici-workflow-box">
        <span className="aici-wf-label">Conceptual Workflow:</span>
        <div className="aici-wf-flow">
          <span>Comparison Data</span>
          <ArrowRight size={12} />
          <span>Weather Metrics</span>
          <ArrowRight size={12} />
          <span>Forecast Models</span>
          <ArrowRight size={12} />
          <span>AI Agent</span>
          <ArrowRight size={12} />
          <strong>Natural Language Comparison</strong>
        </div>
      </div>

      {/* Footer bar */}
      <div className="aici-footer-bar">
        <span className="aici-disclaimer">* Neutral descriptive insights generated from frontend demo dataset</span>

        <button
          className={`aici-regen-btn ${isGenerating ? "spin" : ""}`}
          onClick={handleRegenerate}
          disabled={isGenerating}
        >
          <RefreshCw size={13} />
          <span>Regenerate Insight</span>
        </button>
      </div>
    </div>
  );
}
