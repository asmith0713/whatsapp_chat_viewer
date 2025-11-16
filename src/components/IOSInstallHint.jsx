// src/components/iOSInstallHint.jsx
import React, { useState, useEffect } from "react";

export default function IOSInstallHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = (window.navigator.userAgent || "").toLowerCase();
    const isIOS =
      /iphone|ipad|ipod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); // iPadOS detection

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isIOS && !isStandalone) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        right: 20,
        background: "rgba(0, 0, 0, 0.85)",
        color: "white",
        padding: "14px 16px",
        borderRadius: 12,
        fontSize: 14,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ flex: 1 }}>
        Install this app on your iPhone: tap the Share button (↗) then choose{" "}
        <strong>Add to Home Screen</strong>.
      </div>

      <button
        onClick={() => setShow(false)}
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "white",
          padding: "6px 10px",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        OK
      </button>
    </div>
  );
}
