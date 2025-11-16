import React, { useRef, useState } from "react";
import { parseWhatsapp } from "../utils/parseWhatsapp";

export default function FileUpload({ onData }){
  const ref = useRef();
  const [hint, setHint] = useState("Upload .txt");

  const handleFile = async (f) => {
    if(!f) return;
    const text = await f.text();
    const msgs = parseWhatsapp(text || "");
    if(!msgs.length) setHint("No messages found");
    else onData(msgs);
  };

  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <input ref={ref} type="file" accept=".txt" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])} />
      <button className="btn btn-primary btn-sm file-btn" onClick={()=>ref.current?.click()}>{hint}</button>
    </div>
  );
}
