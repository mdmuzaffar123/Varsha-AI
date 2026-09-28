import React from "react";
import { Radio, Satellite, Cpu, ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";
import "./ForecastBottomData.css";

export default function ForecastBottomData({ liveWeather }) {
  return (
    <div className="forecast-bottom-data-section">
      {/* Meteorological Data Ingest & Model Status Bar */}
      <div className="fb-data-card">
        <div className="fb-data-grid">
          {/* Item 1: Doppler Radar */}
          <div className="fb-data-item">
            <div className="fb-data-icon-wrap radar">
              <Radio size={16} />
            </div>
            <div className="fb-data-text-block">
              <span className="fb-data-label">Doppler Radar</span>
              <span className="fb-data-value">DNR Ranchi (C-Band 250km)</span>
            </div>
          </div>

          {/* Item 2: Satellite Ingest */}
          <div className="fb-data-item">
            <div className="fb-data-icon-wrap sat">
              <Satellite size={16} />
            </div>
            <div className="fb-data-text-block">
              <span className="fb-data-label">Satellite Ingest</span>
              <span className="fb-data-value">INSAT-3DR & GOES Optical</span>
            </div>
          </div>

          {/* Item 3: Deep Learning Engine */}
          <div className="fb-data-item">
            <div className="fb-data-icon-wrap ai">
              <Cpu size={16} />
            </div>
            <div className="fb-data-text-block">
              <span className="fb-data-label">AI Neural Models</span>
              <span className="fb-data-value">EarthFormer + ConvNeXt-3D</span>
            </div>
          </div>

          {/* Item 4: Model Confidence */}
          <div className="fb-data-item">
            <div className="fb-data-icon-wrap conf">
              <ShieldCheck size={16} />
            </div>
            <div className="fb-data-text-block">
              <span className="fb-data-label">Confidence Score</span>
              <span className="fb-data-value conf-val">
                <span className="fb-conf-dot" /> 94.8% High Accuracy
              </span>
            </div>
          </div>
        </div>

        {/* Sync & Refresh Meta Info */}
        <div className="fb-sync-bar">
          <div className="fb-sync-left">
            <RefreshCw size={13} className="fb-spin-icon" />
            <span>Last Telemetry Sync: <strong>22 Sep 2026, 11:30 AM IST</strong> (Auto-updates every 15 min)</span>
          </div>
          <div className="fb-sync-right">
            <span className="fb-next-cycle">Next AI Cycle: in 12 mins</span>
          </div>
        </div>

        {/* Public Safety & Emergency Authority Disclaimer */}
        <div className="fb-advisory-note">
          <AlertCircle size={14} className="fb-alert-icon" />
          <p>
            <strong>Advisory:</strong> VarshaAI provides high-resolution rainfall forecasts and flood risk simulations. For emergency evacuation and disaster response orders, always follow directives issued by the <strong>National Disaster Management Authority (NDMA)</strong> and the <strong>State Disaster Management Authority (SDMA)</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
