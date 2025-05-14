import Image from "next/image";
import React from "react";

const TeamPageBanner = ({
  t,
  misionTitle,
  misionContent,
  visionTitle,
  vision,
  futureGoalTitle,
  futureGoal,
  futureGoalSubTitle,
  visionSubTitle,
  misionSubTitle,
}) => {
  return (
    <section id="teamPage">
      <div className="teamPageBanner">
        <div className="container">
          <div className="teamTop topper">
            <h1 className="topper">Adentta</h1>
            <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
            <h4 className="topper">{t?.mission || "Mission"}</h4>
          </div>
        </div>
        <Image
          src="/images/teamPageBanner.png.png"
          alt="Team"
          width={2000}
          height={800}
        />
      </div>

      <div className="container">
        <div className="row-gap">
          <div className="xl-7 lg-7 md-7 sm-12">
            <div className="teamPageMission">
              <div className="missionInner">
                {/* <h6>Mission</h6> */}
                <h6>{misionTitle}</h6>
                <span>{misionSubTitle}</span>
                <div dangerouslySetInnerHTML={{ __html: misionContent }}></div>
              </div>
            </div>
          </div>
          <div className="xl-5 lg-5 md-5 sm-12">
            <div className="teamPageVision">
              <div className="visionInner">
                <h6>{visionTitle}</h6>
                <span>{visionSubTitle}</span>
                <div dangerouslySetInnerHTML={{ __html: vision }}></div>
              </div>
            </div>
          </div>
          <div className="xl-12 lg-12 md-12 sm-12">
            <div className="teamPagefutureGoals">
              <div className="row">
                <div className="xl-4 lg-4 md-4 sm-12">
                  <div className="futureGoalsLeft">
                    {/* <span>Future goals</span>  */}
                    <span>{futureGoalTitle}</span>
                  </div>
                </div>
                <div className="xl-8 lg-8 md-8 sm-12">
                  <div className="futureGoalsRight">
                    <span>{futureGoalSubTitle}</span>
                    <div dangerouslySetInnerHTML={{ __html: futureGoal }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPageBanner;
