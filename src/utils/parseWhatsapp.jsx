// parseWhatsapp.js
// returns array: [{ date: "15/04/25", time: "10:46:52 PM", sender: "Name", text: "..." }]

export function parseWhatsapp(text) {
    if (!text) return [];
    const lines = text.split(/\r?\n/);
    // flexible regex covering the common formats in exports
    const messageRegex = /^\[(\d{1,2}\/\d{1,2}\/\d{2}),\s*(\d{1,2}:\d{2}(?::\d{2})?)(?:\u202F|\s)?(AM|PM)\]\s([^:]+?):\s?(.*)$/i;
    const altRegex = /^(\d{1,2}\/\d{1,2}\/\d{2}),\s*(\d{1,2}:\d{2}(?::\d{2})?)(?:\u202F|\s)?(AM|PM)\s-\s([^:]+?):\s?(.*)$/i;
  
    const messages = [];
    let current = null;
  
    for (let raw of lines) {
      const line = raw.replace(/\uFEFF/g, "").trimEnd();
      let match = line.match(messageRegex) || line.match(altRegex);
  
      if (match) {
        if (current) messages.push(current);
        current = {
          date: match[1],
          time: `${match[2]} ${match[3].toUpperCase()}`,
          sender: match[4].trim(),
          text: match[5] || ""
        };
      } else {
        // line continuation
        if (current) {
          current.text += (current.text ? "\n" : "") + line;
        }
      }
    }
  
    if (current) messages.push(current);
    return messages;
  }
  