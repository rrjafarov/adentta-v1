import React from "react";

const LoadMoreBTN = ({t,linkTitle}) => {
  return (
    <div className="loadMoreBtn">
      <button >
        {/* {linkTitle || "Load More"} */}
        {t?.loadMoreBTN || "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreBTN;
