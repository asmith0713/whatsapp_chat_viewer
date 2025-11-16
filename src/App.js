import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import ChatView from "./components/ChatView";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(){
  const [messages, setMessages] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(()=>{
    document.body.classList.toggle("dark-mode", dark);
  },[dark]);

  return (
    <div className="app-shell">
      <nav className="site-nav d-flex align-items-center justify-content-between">
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          <div className="nav-logo">WV</div>
          <div className="nav-info">
            <div className="nav-title">WhatsApp Chat Viewer</div>
            <div className="nav-subtitle">
              <span className="badge-count">{messages.length}</span>
              messages loaded
            </div>
          </div>
        </div>

        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <input
            className="nav-search"
            placeholder="Search messages..."
            onKeyDown={(e)=>{
              if(e.key==='Enter') window.dispatchEvent(new CustomEvent("chat-search",{detail:e.target.value}));
            }}
          />
          <button className="btn-icon" onClick={()=>{
            const blob = new Blob([JSON.stringify(messages, null, 2)], {type:"application/json"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "chat.json"; a.click(); URL.revokeObjectURL(url);
          }}>
            <span>↓</span> Export
          </button>
          <button className="btn-theme" onClick={()=>setDark(d=>!d)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <div className="container-main">
        <div className="chat-wrap">
          <div className="chat-header">
            <div className="chat-title">Chat Messages</div>
            <div style={{marginLeft:"auto"}}><FileUpload onData={setMessages} /></div>
          </div>

          <div className="chat-body">
            <div className="chat-column">
              <ChatView messages={messages} />
            </div>
          </div>

          <div className="controls-bar">
            <div className="controls-info">Client-side parsing · Zero data upload</div>
          </div>
        </div>
      </div>
    </div>
  );
}
