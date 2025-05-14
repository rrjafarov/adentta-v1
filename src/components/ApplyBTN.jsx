import React from "react";

const LoadMoreBTN = ({t}) => {
  return (
    <div className="loadMoreBtn">
      <button >
        {t?.applyButton || "Apply"}
      </button>
    </div>
  );
};

export default LoadMoreBTN;
