import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import DateSeparator from "./DateSeparator";

export default function ChatView({ messages = [] }){
  const ref = useRef();
  const [filtered, setFiltered] = useState(messages);

  useEffect(()=> setFiltered(messages), [messages]);

  useEffect(()=>{
    const handler = (e) => {
      const q = (e.detail || "").toLowerCase();
      if(!q) return setFiltered(messages);
      setFiltered(messages.filter(m=> (m.text||"").toLowerCase().includes(q) || (m.sender||"").toLowerCase().includes(q)));
    };
    window.addEventListener("chat-search", handler);
    return ()=> window.removeEventListener("chat-search", handler);
  }, [messages]);

  useEffect(()=>{
    if(ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [filtered]);

  return (
    <div ref={ref} style={{width:"100%"}}>
      {filtered.map((m,i)=>{
        const prevDate = i===0 ? null : filtered[i-1]?.date;
        const newDay = m.date !== prevDate;
        return (
          <div key={i}>
            {newDay && <DateSeparator date={m.date} />}
            <MessageBubble msg={m} />
          </div>
        );
      })}
    </div>
  );
}
