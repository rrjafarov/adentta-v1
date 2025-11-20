// "use client";
// import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";


async function fetchVacancyPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: joinOurTeam } = await axiosInstance.get(
      `/page-data/join-our-team`,
      {
        // headers: { Lang: lang.value },
        cache: "no-store",
      }
    );
    return joinOurTeam;
  } catch (error) {
    console.error("Failed to fetch our tema page data", error);
    throw error;
  }
}

const CareersJoinOurTeam = async ({t}) => {
  const joinTeams = await fetchVacancyPageData();
  const joinOurTeamData = joinTeams?.data?.data || [];
 

  return (
    <div>
      <div className="container">
        <div className="careersPageJoinOurTeam">
          <div className="careersPageJoinOurTeamHead">
            <h2>{t?.careersPageJoinOurTeam || "Join Our Team"}</h2>
            <span>{t?.careersPageCareersAndVacancy || "Careers&Vacancy"}</span>
          </div>
          <div className="careersPageJoinOurTeamAll">
            <div className="row">
              {joinOurTeamData.map((item) => (
                <div key={item.id} className="xl-4 lg-4 md-6 sm-6">
                  {/* <CareersJoinOurTeamCard /> */}
                  <div className="careersJoinOurTeamCards">
                    <div className="careersJoinOurTeamCard">
                      <Image
                        // src="/icons/joinourTeam.svg"
                        src={`https://admin.adentta.az/storage${item.image}`}
                        
                        alt="joinouream"
                        width={100}
                        height={100}
                      />
                      <span>{item.title}</span>
                      <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersJoinOurTeam;
