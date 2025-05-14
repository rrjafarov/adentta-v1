import React from "react";
import VacancyOpen from "./VacancyOpen";
import Image from "next/image";
import CareersJoinOurTeam from "./CareersJoinOurTeam";
import CareersPageSlider from "./Sliders/CareersPageSlider";
import Link from "next/link";

const Careers = ({ t, vacancy, lifeOnHereData }) => {
  return (
    <div id="careersPage">
      <div className="container">
        <div className="careersTop topper">
          <Link href="/">
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{t?.careers || "Careers"}</h4>
        </div>
      </div>
      <div className="careersPage">
        <div className="container">
          <div className="careersPageHeaderText">
            <h2>{t?.careersVacancy || "Vacancy Page"}</h2>
            <span>{t?.careers || "Careers"}</span>
          </div>
          <VacancyOpen t={t} vacancy={vacancy} />
        </div>
      </div>

      <div className="careersPageWorkSection">
        <div className="container">
          <div className="row">
            <div className="xl-6 lg-6 md-6 sm-12">
              <div className="careersPageWorkLeft">
                <div className="careersPageWorkLeftContent">
                  <span>
                    {t?.careersPageWork ||
                      "We work in a free and reliable work environment"}
                  </span>
                  <p>
                    {t?.careersPageWorkSubTitle ||
                      "Employee fully agrees with this"}
                  </p>
                </div>
              </div>
            </div>
            <div className="xl-6 lg-6 md-6 sm-12">
              <div className="careersPageWorkRight">
                <div className="careersPageWorkRightImg">
                  <Image
                    src="/images/careersPageWorkIMG.png"
                    alt="Careers"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CareersJoinOurTeam t={t} />

      <section id="careersPageSlider">
        <div className="careersPageSliderHeadText">
          <span>{lifeOnHereData.title}</span>
          <div
            dangerouslySetInnerHTML={{ __html: lifeOnHereData.content }}
          ></div>
        </div>

        <CareersPageSlider lifeOnHereData={lifeOnHereData} />
      </section>
    </div>
  );
};

export default Careers;
