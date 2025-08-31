import React from "react";

function Pagination({ total, perPage, current, onChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages === 1) return null;

  return (
    <div className="pagination">
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          className={current === i + 1 ? "active" : ""}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
