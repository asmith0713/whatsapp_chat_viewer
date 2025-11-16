export default function DateSeparator({ date }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "24px 0",
      position: "relative"
    }}>
      <div style={{
        position: "absolute",
        width: "100%",
        height: "1px",
        background: "var(--other-border)",
        opacity: 0.5
      }} />
      <span style={{
        background: "var(--panel-elevated)",
        color: "var(--muted)",
        fontSize: "0.75rem",
        fontWeight: 600,
        padding: "6px 16px",
        borderRadius: "20px",
        border: "1px solid var(--other-border)",
        position: "relative",
        zIndex: 1,
        fontFamily: "var(--mono)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}>
        {date}
      </span>
    </div>
  );
}
