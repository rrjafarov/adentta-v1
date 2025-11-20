import React from "react";

const AboutUsBTN = ({t}) => {
  return (
    <div className="loadMoreBtn">
      <button>{t?.aboutUsBtn || "about us"}</button>
    </div>
  );
};

export default AboutUsBTN;
