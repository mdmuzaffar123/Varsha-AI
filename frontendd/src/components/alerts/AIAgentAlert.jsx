import React, { useState } from "react";
import { Sparkles, RefreshCw, ArrowRight, Bot, Cpu, ShieldAlert, CheckCircle2 } from "lucide-react";
import { AI_AGENT_INSIGHTS } from "../../data/alertData";
import { generateAIInsight } from "../../services/alertService";
import "./AIAgentAlert.css";

export default function AIAgentAlert() {
  const [insightIndex, setInsightIndex] = useState(0);
  const [currentInsight, setCurrentInsight] = useState(AI_AGENT_INSIGHTS[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    const nextInsight = await generateAIInsight(insightIndex);
    setInsightIndex((prev) => (prev + 1) % AI_AGENT_INSIGHTS.length);
    setCurrentInsight(nextInsight);
    setIsGenerating(false);
  };

  return (
    <div className="ai-agent-alert-card">
      {/* ── Section 1: AI Alert Intelligence Header & Pipeline ── */}
      <div className="aia-header">
        <div className="aia-title-group">
          <div className="aia-bot-icon">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="aia-title">AI Alert Intelligence</h3>
            <p className="aia-subtitle">
              Turning model predictions into human-readable weather insights.
            </p>
          </div>
        </div>
        <span className="aia-badge">AI-Generated Demo</span>
      </div>

      {/* 4-Stage Horizontal Pipeline */}
      <div className="aia-pipeline-flow">
        <div className="aia-pipe-step">
          <span className="aia-ps-num">01</span>
          <span className="aia-ps-name">Model Predictions</span>
        </div>
        <ArrowRight size={14} className="aia-pipe-arrow" />
        <div className="aia-pipe-step">
          <span className="aia-ps-num">02</span>
          <span className="aia-ps-name">Risk Analysis</span>
        </div>
        <ArrowRight size={14} className="aia-pipe-arrow" />
        <div className="aia-pipe-step active">
          <span className="aia-ps-num">03</span>
          <span className="aia-ps-name">AI Agent</span>
        </div>
        <ArrowRight size={14} className="aia-pipe-arrow" />
        <div className="aia-pipe-step">
          <span className="aia-ps-num">04</span>
          <span className="aia-ps-name">Alert Generation</span>
        </div>
      </div>

      {/* AI Insight Box */}
      <div className="aia-insight-box">
        <div className="aia-ib-top">
          <div className="aia-ib-tag">
            <Sparkles size={14} />
            <span>AI-Generated Demo Insight</span>
          </div>
          <span className="aia-confidence">Confidence: {currentInsight.confidence}</span>
        </div>

        <p className="aia-ib-text">"{currentInsight.text}"</p>
      </div>

      {/* ── Section 2: Visual Two-Column Panel (Model Signals vs Generated Alert) ── */}
      <div className="aia-twocol-panel">
        {/* LEFT COLUMN: Model Signals */}
        <div className="aia-col left">
          <div className="aia-col-header">
            <Cpu size={15} className="aia-col-icon blue" />
            <h4 className="aia-col-title">Model Signals</h4>
          </div>

          <div className="aia-signals-grid">
            <div className="aia-sig-item">
              <span className="aia-sig-lbl">Rainfall Probability</span>
              <span className="aia-sig-val">{currentInsight.signals.rainfallProb}</span>
            </div>
            <div className="aia-sig-item">
              <span className="aia-sig-lbl">Rainfall Intensity</span>
              <span className="aia-sig-val">{currentInsight.signals.rainfallIntensity}</span>
            </div>
            <div className="aia-sig-item">
              <span className="aia-sig-lbl">Thunderstorm Prob</span>
              <span className="aia-sig-val">{currentInsight.signals.thunderstormProb}</span>
            </div>
            <div className="aia-sig-item">
              <span className="aia-sig-lbl">Lightning Prob</span>
              <span className="aia-sig-val">{currentInsight.signals.lightningProb}</span>
            </div>
            <div className="aia-sig-item">
              <span className="aia-sig-lbl">Storm Cells</span>
              <span className="aia-sig-val">{currentInsight.signals.stormCells} Detected</span>
            </div>
            <div className="aia-sig-item">
              <span className="aia-sig-lbl">Wind Speed</span>
              <span className="aia-sig-val">{currentInsight.signals.windSpeed}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Generated Alert */}
        <div className="aia-col right">
          <div className="aia-col-header">
            <ShieldAlert size={15} className="aia-col-icon red" />
            <h4 className="aia-col-title">Generated Alert</h4>
            <span className={`aia-sev-badge ${currentInsight.generatedAlert.severity.toLowerCase()}`}>
              {currentInsight.generatedAlert.severity}
            </span>
          </div>

          <div className="aia-gen-alert-body">
            <h5 className="aia-ga-title">{currentInsight.generatedAlert.title}</h5>
            <p className="aia-ga-summary">{currentInsight.generatedAlert.summary}</p>
            <div className="aia-ga-action-box">
              <strong className="aia-ga-act-lbl">Suggested Monitoring Action:</strong>
              <span>{currentInsight.generatedAlert.suggestedAction}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer controls: Demo label + Regenerate Button */}
      <div className="aia-footer-bar">
        <span className="aia-footer-demo">* AI-generated demo insight synthesized for presentation</span>

        <button
          className={`aia-regen-btn ${isGenerating ? "spin" : ""}`}
          onClick={handleRegenerate}
          disabled={isGenerating}
        >
          <RefreshCw size={14} />
          <span>Regenerate Insight</span>
        </button>
      </div>
    </div>
  );
}
