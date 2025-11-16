import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import ChatView from "./components/ChatView";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index';
import './sw-register';


export default function App(){
  const [messages, setMessages] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(()=>{
    document.body.classList.toggle("dark-mode", dark);
  },[dark]);

  return (
    <div className="app-shell">
      <nav className="site-nav d-flex align-items-center justify-content-between">
        <div style={{display:"flex",gap:12,alignItems:"center",minWidth:0}}>
          <div className="nav-logo">WV</div>
          <div className="nav-info" style={{minWidth:0}}>
            <div className="nav-title">WhatsApp Viewer</div>
            <div className="nav-subtitle">
              <span className="badge-count">{messages.length}</span>
              {messages.length !== 1 ? "messages" : "message"}
            </div>
          </div>
        </div>

        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
          <input
            className="nav-search"
            placeholder="Search..."
            onKeyDown={(e)=>{
              if(e.key==='Enter') window.dispatchEvent(new CustomEvent("chat-search",{detail:e.target.value}));
            }}
          />
          <button className="btn-icon" title="Export chat" onClick={()=>{
            const blob = new Blob([JSON.stringify(messages, null, 2)], {type:"application/json"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "chat.json"; a.click(); URL.revokeObjectURL(url);
          }}>
            ↓ Export
          </button>
          <button className="btn-theme" title="Toggle theme" onClick={()=>setDark(d=>!d)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <div className="container-main">
        <div className="chat-wrap">
          <div className="chat-header">
            <div className="chat-title">Messages</div>
            <FileUpload onData={setMessages} />
          </div>

          <div className="chat-body">
            <div className="chat-column">
              {messages.length === 0 ? (
                <div style={{textAlign:"center",color:"var(--muted)",padding:"40px 20px",fontSize:"0.9rem"}}>
                  Upload a WhatsApp .txt file to view messages
                </div>
              ) : (
                <ChatView messages={messages} />
              )}
            </div>
          </div>

          <div className="controls-bar">
            <div className="controls-info">Client-side parsing · Zero upload</div>
            <FileUpload onData={setMessages} />
          </div>
        </div>
      </div>
    </div>
  );
}
