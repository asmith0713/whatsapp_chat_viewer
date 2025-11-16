import React, { useEffect, useState } from "react";

export default function InstallButton({ className, children }) {
  const [available, setAvailable] = useState(!!window.deferredPrompt);
  const [installed, setInstalled] = useState(false);
  const [promptEvent, setPromptEvent] = useState(window.deferredPrompt || null);

  useEffect(() => {
    function onAvailable() {
      setPromptEvent(window.deferredPrompt || null);
      setAvailable(!!window.deferredPrompt);
    }
    function onInstalled() {
      setInstalled(true);
      setAvailable(false);
      setPromptEvent(null);
    }
    window.addEventListener("pwa-install-available", onAvailable);
    window.addEventListener("pwa-installed", onInstalled);
    // in case it was already fired
    onAvailable();
    return () => {
      window.removeEventListener("pwa-install-available", onAvailable);
      window.removeEventListener("pwa-installed", onInstalled);
    };
  }, []);

  async function handleClick() {
    const evt = promptEvent || window.deferredPrompt;
    if (!evt) {
      setAvailable(false);
      return;
    }
    try {
      evt.prompt();
      const choice = await evt.userChoice;
      if (choice && choice.outcome === "accepted") {
        setInstalled(true);
        setAvailable(false);
        window.deferredPrompt = null;
      } else {
        setAvailable(!!window.deferredPrompt);
      }
    } catch (e) {
      setAvailable(false);
      window.deferredPrompt = null;
    }
  }

  if (!available || installed) return null;

  return (
    <button
      className={className || "btn btn-sm btn-outline-light"}
      onClick={handleClick}
      title="Install app"
      style={{ minWidth: 88 }}
    >
      {children || "Install App"}
    </button>
  );
}
