import Image from "next/image";
import React from "react";
import CareersCV from "@/components/CareersCV";
import Link from "next/link";

const CareersDetailPage = ({ careerData, t }) => {
  return (
    <div className="careersDetailPage ">
      <div className="container">
        <div className="careersTop topper">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <Link href="/careers">
            <span className="topper">{t?.careers || "Careers"}</span>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{careerData.title}</span>
        </div>

        <div className="careersDetailPageHeaderContent">
          <span className="vacancyPage">
            {t?.careersPageVacancyPage || "VACANCY PAGE"}
          </span>
          
          <p className="vacancyName">
            {t?.careersPageVacancyName || "Vacancy name"}:
            <h1>{careerData.title}</h1>
          </p>
          <div className="careersDetailPageHeaderContentValues">
            <div className="vacancyCardItem">
              <span>{t?.careersPageDeadLine || "Application Deadline"}:</span>
              <p>{careerData.deadline}</p>
            </div>
            <div className="vacancyCardItem">
              <span>{t?.careersPageEmployment || "Application Deadline"}:</span>
              {/* <p>Full-time/Part-time/Contract</p> */}
              <p>{careerData.employment_type}</p>
            </div>
            <div className="vacancyCardItem">
              <span>{t?.careersPageLocation || "Application Deadline"}:</span>
              {/* <p>Baku Azerbaijan</p> */}
              <p>{careerData.location}</p>
            </div>
          </div>
        </div>
        <div className="careersDetailPageAboutVacancy">
          <div className="row">
            <div className="xl-6 lg-6 md-6 sm-12">
              <div className="detailPageAboutVacancyText">
                <span>{t?.careersPageAboutVacancy || "About vacancy"}</span>

                <div
                  dangerouslySetInnerHTML={{ __html: careerData.about_vacancy }}
                ></div>
              </div>
            </div>
            <div className="xl-6 lg-6 md-6 sm-12">
              <div className="detailPageVacancyNeedsText">
                <span>{t?.careersPageVacancyNeeds || "Vacancy Needs"}</span>
                <div className="vacancyNeeds">
                  <div
                    className="vacancyNeedText"
                    dangerouslySetInnerHTML={{
                      __html: careerData.vacancy_needs,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="careersDetailPageCV">
          <CareersCV t={t} />
        </div>
      </div>
    </div>
  );
};

export default CareersDetailPage;
