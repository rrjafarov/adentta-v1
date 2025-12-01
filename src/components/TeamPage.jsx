import Image from "next/image";
import Link from "next/link";
import React from "react";

const TeamPage = ({ t, teamMembers = [] }) => {
  return (
    <div className="teamsPage">
      <div className="container">
        <div className="teamsTop">
          <Link href="/">
            <strong className="topper">Adentta</strong>
          </Link>
          <img className="topper" src="/icons/rightDown.svg" alt="Adentta" />
          <span className="topper">{t?.teamTitle || "Team"}</span>
        </div>

        <div className="teamsPageHeaderText">
          <span>{t?.teamTitle || "Team"}</span>
          <h1> {t?.teamMeet || "Meet our team"}</h1>
          <p>
            {t?.teamContent || "Adentta Professional Team"}
          </p>
        </div>

        <div className="teamsPageCards">
          <div className="row-gap">
            {teamMembers.map((member) => (
              <div key={member.id} className="xl-3 lg-3 md-6 sm-12">
                <div className="teamsCards">
                  <div className="teamsPageCard">
                    <div className="teamsPageCardImg">
                      {member.image && (
                        <Image
                          src={`https://admin.adentta.az/storage${member.image}`}
                          alt={member.title}
                          width={400}
                          height={400}
                        />
                      )}
                    </div>
                  </div>
                  <div className="teamsPageCardContent">
                    <h3>{member.title}</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: member.content }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
