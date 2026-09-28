import React, { useState } from "react";
import { History, ChevronDown, ChevronUp, Filter, CheckCircle2, Clock, XCircle } from "lucide-react";
import { ALERT_HISTORY_DATA } from "../../data/alertData";
import "./AlertHistory.css";

export default function AlertHistory() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [timeFilter, setTimeFilter] = useState("Today");

  const filteredHistory = ALERT_HISTORY_DATA.filter(
    (item) => item.dateGroup.toLowerCase() === timeFilter.toLowerCase()
  );

  return (
    <div className="alert-history-card">
      <div
        className="ahis-header-bar"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer" }}
      >
        <div className="ahis-title-group">
          <History size={16} className="ahis-icon" />
          <h3 className="ahis-title">Recent Alert History</h3>
          <span className="ahis-count">{ALERT_HISTORY_DATA.length} Historical Records</span>
        </div>

        <div className="ahis-controls">
          <span className="ahis-toggle-lbl">{isExpanded ? "Collapse" : "Expand"}</span>
          <button className="ahis-toggle-btn" aria-label="Toggle Section">
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="ahis-content-body">
          {/* Filters Bar */}
          <div className="ahis-filter-row">
            <span className="ahis-filter-lbl">Time Range:</span>
            <div className="ahis-pills">
              {["Today", "Yesterday", "Last 7 Days"].map((tf) => (
                <button
                  key={tf}
                  className={`ahis-pill ${timeFilter === tf ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeFilter(tf);
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="ahis-table-wrapper">
            <table className="ahis-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Event</th>
                  <th>Severity</th>
                  <th>Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((row) => (
                  <tr key={row.id}>
                    <td className="ahis-time-cell">
                      <Clock size={12} className="ahis-clock" />
                      <span>{row.time}</span>
                    </td>
                    <td className="ahis-loc-cell">{row.location}</td>
                    <td>
                      <span className="ahis-event-tag">{row.event}</span>
                    </td>
                    <td>
                      <span className={`ahis-sev ${row.severity.toLowerCase()}`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="ahis-src-cell">{row.source}</td>
                    <td>
                      <span className={`ahis-status-badge ${row.status.toLowerCase()}`}>
                        {row.status === "Active" && <span className="ahis-dot green" />}
                        {row.status === "Resolved" && <CheckCircle2 size={11} />}
                        {row.status === "Expired" && <XCircle size={11} />}
                        <span>{row.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
