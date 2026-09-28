import React from "react";
import { Activity, Clock, Layers, MapPin, RefreshCw, ShieldAlert } from "lucide-react";
import { ALERT_STATUS_BAR } from "../../data/alertData";
import "./AlertStatusBar.css";

export default function AlertStatusBar() {
  return (
    <div className="alert-status-bar">
      {/* Chip 1: Monitoring Status */}
      <div className="asb-chip">
        <div className="asb-icon active">
          <Activity size={14} />
        </div>
        <div className="asb-data">
          <span className="asb-label">Monitoring Status</span>
          <span className="asb-value green">{ALERT_STATUS_BAR.monitoringStatus}</span>
        </div>
      </div>

      <div className="asb-divider" />

      {/* Chip 2: Last Analysis */}
      <div className="asb-chip">
        <div className="asb-icon blue">
          <Clock size={14} />
        </div>
        <div className="asb-data">
          <span className="asb-label">Last Analysis</span>
          <span className="asb-value">{ALERT_STATUS_BAR.lastAnalysis}</span>
        </div>
      </div>

      <div className="asb-divider" />

      {/* Chip 3: Data Sources */}
      <div className="asb-chip">
        <div className="asb-icon cyan">
          <Layers size={14} />
        </div>
        <div className="asb-data">
          <span className="asb-label">Data Sources</span>
          <span className="asb-value">{ALERT_STATUS_BAR.dataSources}</span>
        </div>
      </div>

      <div className="asb-divider" />

      {/* Chip 4: Locations Monitored */}
      <div className="asb-chip">
        <div className="asb-icon purple">
          <MapPin size={14} />
        </div>
        <div className="asb-data">
          <span className="asb-label">Locations Monitored</span>
          <span className="asb-value">{ALERT_STATUS_BAR.locationsMonitored} Districts</span>
        </div>
      </div>

      <div className="asb-divider" />

      {/* Chip 5: Update Interval */}
      <div className="asb-chip">
        <div className="asb-icon gray">
          <RefreshCw size={14} />
        </div>
        <div className="asb-data">
          <span className="asb-label">Update Interval</span>
          <span className="asb-value">{ALERT_STATUS_BAR.updateInterval}</span>
        </div>
      </div>

      <div className="asb-divider" />

      {/* Chip 6: Data Mode */}
      <div className="asb-chip">
        <div className="asb-icon amber">
          <ShieldAlert size={14} />
        </div>
        <div className="asb-data">
          <span className="asb-label">Data Mode</span>
          <span className="asb-value amber">{ALERT_STATUS_BAR.dataMode}</span>
        </div>
      </div>
    </div>
  );
}
