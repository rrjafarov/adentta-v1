import React from "react";

const SeeOurMissionBTN = ({t}) => {
  return (
    <div className="loadMoreBtn">
      <button>{t?.missionBtn || "see our mission"}</button>
    </div>
  );
};

export default SeeOurMissionBTN;
