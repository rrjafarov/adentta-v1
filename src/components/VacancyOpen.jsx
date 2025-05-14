import Image from "next/image";
import Link from "next/link";
import React from "react";

const VacancyOpen = ({ vacancy ,t }) => {
  return (
    <div className="openVacanacies">
      <div className="container">
        <div className="openVacancyCardHeader">
          <strong>{t?.careersPageVacancyTitle || "Open Vacancies"}</strong>
        </div>
        <div className="vacancyCards">
          <div className="row">

            {vacancy.map((vacancyData) => (
              <div key={vacancyData.id} className="xl-6 lg-6 md-6 sm-12">
                <Link href={`/careers/${vacancyData.title.toLowerCase().replace(/\s+/g, '-')}-${vacancyData.id}`} className="block">
                  <div className="vacancyCard">
                    <div className="vacancyCardHead">
                      <span>{vacancyData.title}</span>
                      <Image
                        src="/icons/vacancyCartRightArrow.svg"
                        alt="vacancy"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="vacancyCardItem">
                      <span>{t?.careersPageDeadLine || "Application Deadline"}:</span>
                      <p>{vacancyData.deadline}</p>
                    </div>
                    <div className="vacancyCardItem">
                      <span>{t?.careersPageEmployment || "Application Deadline"}:</span>
                      <p>{vacancyData.employment_type}</p>
                    </div>
                    <div className="vacancyCardItem">
                      <span>{t?.careersPageLocation || "Application Deadline"}:</span>
                      <p>{vacancyData.location}</p>

                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyOpen;
