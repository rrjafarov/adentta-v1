import React from "react";

const SeeMore = ({t}) => {
  return (
    <div>
      <div className="loadMoreBtn">
        <button>{t?.seeMoreBtn || "see more"}</button>
      </div>
    </div>
  );
};

export default SeeMore;
