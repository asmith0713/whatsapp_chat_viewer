import React, { useRef, useState } from "react";
import { parseWhatsapp } from "../utils/parseWhatsapp";

export default function FileUpload({ onData }){
  const ref = useRef();
  const [hint, setHint] = useState("📁 Upload");
  const [loading, setLoading] = useState(false);

  const handleFile = async (f) => {
    if(!f) return;
    setLoading(true);
    try {
      const text = await f.text();
      const msgs = parseWhatsapp(text || "");
      if(!msgs.length) {
        setHint("❌ No messages");
        setTimeout(() => setHint("📁 Upload"), 2000);
      } else {
        setHint("✓ Loaded");
        onData(msgs);
        setTimeout(() => setHint("📁 Upload"), 2000);
      }
    } catch (e) {
      setHint("❌ Error");
      setTimeout(() => setHint("📁 Upload"), 2000);
    } finally {
      setLoading(false);
      ref.current.value = "";
    }
  };

  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <input
        ref={ref}
        type="file"
        accept=".txt"
        style={{display:"none"}}
        onChange={e=>handleFile(e.target.files[0])}
        disabled={loading}
      />
      <button
        className="file-btn"
        onClick={()=>ref.current?.click()}
        disabled={loading}
        style={{opacity: loading ? 0.7 : 1}}
      >
        {hint}
      </button>
    </div>
  );
}
