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
            <h1 className="topper">Adentta</h1>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <Link href="/careers">
            <h4 className="topper">{t?.careers || "Careers"}</h4>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <h4 className="topper">{careerData.title}</h4>
        </div>
        <div className="careersDetailPageHeaderContent">
          <span className="vacancyPage">
            {t?.careersPageVacancyPage || "VACANCY PAGE"}
          </span>
          <p className="vacancyName">
            {t?.careersPageVacancyName || "Vacancy name"}:
            <span>{careerData.title}</span>
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
                  {/* <Image src="/icons/dotIMG.svg" alt="1" width={8} height={8} /> */}
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
