export default function DateSeparator({ date }) {
  return (
    <div className="text-center my-4">
      <span
        className="px-3 py-1 rounded-pill"
        style={{
          background: "#BFBFBF",
          color: "white",
          fontSize: "0.8rem",
        }}
      >
        {date}
      </span>
    </div>
  );
}
