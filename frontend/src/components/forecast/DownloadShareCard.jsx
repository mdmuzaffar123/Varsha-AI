import React, { useState } from "react";
import {
  FileText,
  Image,
  Code2,
  Share2,
  ChevronRight,
  Download,
  Check,
} from "lucide-react";
import "./DownloadShareCard.css";

export default function DownloadShareCard() {
  const [copied, setCopied] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState("");

  const handleAction = (type, label) => {
    if (type === "share") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setDownloadMsg(`Preparing ${label}...`);
      setTimeout(() => setDownloadMsg(""), 2200);
    }
  };

  const actionItems = [
    {
      id: "pdf",
      icon: FileText,
      iconBg: "rgba(22, 119, 255, 0.1)",
      iconColor: "#1677FF",
      title: "Download PDF Report",
      subtitle: "Detailed forecast report",
    },
    {
      id: "map",
      icon: Image,
      iconBg: "rgba(32, 199, 217, 0.12)",
      iconColor: "#0284C7",
      title: "Download Map Image",
      subtitle: "High-resolution map",
    },
    {
      id: "api",
      icon: Code2,
      iconBg: "rgba(139, 92, 246, 0.1)",
      iconColor: "#8B5CF6",
      title: "Get API Data",
      subtitle: "For researchers & developers",
    },
    {
      id: "share",
      icon: Share2,
      iconBg: "rgba(22, 119, 255, 0.1)",
      iconColor: "#1677FF",
      title: "Share Forecast",
      subtitle: "Share via link",
    },
  ];

  return (
    <div className="download-share-card">
      <div className="dshare-header">
        <div className="dshare-title-group">
          <Download size={17} color="#1677FF" />
          <h4 className="dshare-title">Download & Share</h4>
        </div>
        {downloadMsg && <span className="dshare-feedback-pill">{downloadMsg}</span>}
        {copied && <span className="dshare-feedback-pill success">Link Copied!</span>}
      </div>

      <div className="dshare-list">
        {actionItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="dshare-row"
              onClick={() => handleAction(item.id, item.title)}
            >
              <div className="dshare-row-left">
                <div
                  className="dshare-icon-box"
                  style={{ background: item.iconBg, color: item.iconColor }}
                >
                  <IconComponent size={18} />
                </div>
                <div className="dshare-meta">
                  <span className="dshare-item-title">{item.title}</span>
                  <span className="dshare-item-sub">{item.subtitle}</span>
                </div>
              </div>

              <div className="dshare-chevron">
                {item.id === "share" && copied ? (
                  <Check size={16} color="#16B86A" />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
