import React from "react";

function TextDivider({ text, color }) {
  return (
    <div className="d-flex align-items-center text-divider">
      <hr className={`flex-grow-1 border border-1 border-${color || "dark"} me-2`} />
      <span className={`divider-text text-${color || "dark"}`}>{text}</span>
      <hr className={`flex-grow-1 border border-1 border-${color || "dark"} ms-2`} />
    </div>
  );
}

export default TextDivider;
