import React from "react";

export default function MessageBubble({ msg }){
  const meKey = "asmith"; // change to your name snippet if needed
  const isMe = msg.sender && msg.sender.toLowerCase().includes(meKey);
  const initials = (msg.sender||"U").split(" ").slice(0,2).map(s=>s[0]).join("").toUpperCase();

  return (
    <div className={`msg-row ${isMe ? "me" : "other"}`} style={{marginBottom:10}}>
      {!isMe && <div className="avatar">{initials}</div>}
      <div className="bubble">
        {!isMe && <div className="sender">{msg.sender}</div>}
        <div>{msg.text}</div>
        <div className="time">{msg.time}</div>
      </div>
      {isMe && <div className="avatar">{initials}</div>}
    </div>
  );
}
