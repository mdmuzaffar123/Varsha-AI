import React from "react";
import { EVALUATION_METRICS_TABLE } from "../../data/modelData";
import "./EvaluationMetricsTable.css";

export default function EvaluationMetricsTable() {
  return (
    <div className="eval-metrics-card">
      <div className="emc-header">
        <h4 className="emc-title">Evaluation Metrics</h4>
      </div>

      <div className="emc-table-wrap">
        <table className="emc-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {EVALUATION_METRICS_TABLE.map((row, idx) => (
              <tr key={idx} className={row.isBold ? "bold-row" : ""}>
                <td className="emc-metric-name">{row.metric}</td>
                <td className="emc-metric-val">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
