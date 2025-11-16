import React, { useState, useEffect } from "react";
import Header from "./components/Header";
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
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:36,height:36,borderRadius:8,background:"#0b7a64",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>WV</div>
          <div>
            <div style={{fontWeight:700}}>WhatsApp Chat Viewer</div>
            <div style={{fontSize:12,color:"var(--muted)"}}>{messages.length} messages</div>
          </div>
        </div>

        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <input className="form-control form-control-sm" style={{width:220}} placeholder="Search" onKeyDown={(e)=>{
            if(e.key==='Enter') window.dispatchEvent(new CustomEvent("chat-search",{detail:e.target.value}));
          }} />
          <button className="btn btn-outline-secondary btn-sm" onClick={()=>{
            const blob = new Blob([JSON.stringify(messages, null, 2)], {type:"application/json"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "chat.json"; a.click(); URL.revokeObjectURL(url);
          }}>Export</button>
          <button className="btn btn-sm" onClick={()=>setDark(d=>!d)}>{dark ? "Light" : "Dark"}</button>
        </div>
      </nav>

      <div className="container-main">
        <div className="chat-wrap">
          <div className="chat-header">
            <div className="chat-title">Minimal chat</div>
            <div style={{marginLeft:"auto"}}><FileUpload onData={setMessages} /></div>
          </div>

          <div className="chat-body">
            <div className="chat-column">
              <ChatView messages={messages} />
            </div>
          </div>

          <div className="controls-bar">
            <div style={{color:"var(--muted)",fontSize:13}}>Client-side parsing. Nothing is uploaded.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
