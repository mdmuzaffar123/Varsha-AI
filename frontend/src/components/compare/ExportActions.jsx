import React, { useState } from "react";
import { Download, Share2, Check } from "lucide-react";
import "./ExportActions.css";

export default function ExportActions() {
  const [copied, setCopied] = useState(false);

  const handleDownloadReport = () => {
    // Front-end printable trigger or report generation utility
    window.print();
  };

  const handleShareComparison = () => {
    // Front-end share utility or clipboard copy
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="export-actions-card">
      <div className="exa-text">
        <h4 className="exa-title">Export & Decision Sharing</h4>
        <p className="exa-desc">
          Generate report output or share comparative weather intelligence link.
        </p>
      </div>

      <div className="exa-btns-row">
        <button className="exa-btn download" onClick={handleDownloadReport}>
          <Download size={14} />
          <span>Download Report</span>
        </button>

        <button className="exa-btn share" onClick={handleShareComparison}>
          {copied ? <Check size={14} /> : <Share2 size={14} />}
          <span>{copied ? "Link Copied!" : "Share Comparison"}</span>
        </button>
      </div>
    </div>
  );
}
