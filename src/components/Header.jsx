import React from "react";

export default function Header({ messages }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#075E54" }}>
      <div className="container-fluid">

        <span className="navbar-brand fw-bold">WhatsApp Chat Viewer</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto"></ul>

          <form className="d-flex me-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              onChange={(e) => {
                const ev = new CustomEvent("chat-search", { detail: e.target.value });
                window.dispatchEvent(ev);
              }}
            />
          </form>

          <span className="badge bg-light text-dark me-3">
            {messages.length} messages
          </span>

          <button className="btn btn-light">Light</button>
        </div>
      </div>
      <button
  className="btn btn-sm btn-outline-primary"
  onClick={() => {
    const trigger = window.deferredPrompt;
    if (!trigger) return alert('Install prompt not available');
    trigger.prompt();
    trigger.userChoice.then(() => { window.deferredPrompt = null; });
  }}
>
  Install App
</button>

    </nav>
  );
}
