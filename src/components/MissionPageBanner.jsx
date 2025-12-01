import Image from "next/image";
import Link from "next/link";
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
            <Link href="/">
              <strong className="topper">Adentta</strong>
            </Link>
            <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
            <span className="topper">{t?.mission || "Mission"}</span>
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
                <h1>{misionTitle}</h1>
                <span>{misionSubTitle}</span>
                <div dangerouslySetInnerHTML={{ __html: misionContent }}></div>
              </div>
            </div>
          </div>
          <div className="xl-5 lg-5 md-5 sm-12">
            <div className="teamPageVision">
              <div className="visionInner">
                <h2>{visionTitle}</h2>
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
