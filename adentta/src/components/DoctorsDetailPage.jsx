// !Son versiya
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DoctorsDetailPage = ({ t, doctorsDetailDataDetail, otherDoctors }) => {
  return (
    <div>
      <div className="container">
        <div className="doctorsTop topper">
          <Link href="/">
            <h1>Adentta</h1>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <Link href="/doctors">
            <h4>{t?.doctors || "Doctors"}</h4>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <h4>{doctorsDetailDataDetail.title}</h4>
        </div>

        <div className="doctorsDetailProfile">
          <div className="row">
            <div className="xl-3 lg-3 md-3 sm-12">
              <div className="doctorProfile">
                <div className="detailProfileImg">
                  <Image
                    src={`https://admin.adentta.az/storage${doctorsDetailDataDetail.image}`}
                    alt="team"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
              <div className="doctorSocialMedia">
                <span className="doctorName">
                  {doctorsDetailDataDetail.title}
                </span>
                <br />
                <span>{doctorsDetailDataDetail.workplace}</span>

                <div className="doctorsNumbers">
                  <div className="doctorNumber">
                    {(doctorsDetailDataDetail.phone ||
                      doctorsDetailDataDetail.whatsapp_link) && (
                      <div className="doctorNumber">
                        <span>{t?.doctorsPageNumber || "number:"}:</span>

                        {doctorsDetailDataDetail.phone && (
                          <div className="doctorNumberIcon">
                            <Image
                              src="/icons/boldPhone.svg"
                              alt="phone"
                              width={10}
                              height={10}
                            />
                            <p>{doctorsDetailDataDetail.phone}</p>
                          </div>
                        )}

                        {doctorsDetailDataDetail.whatsapp_link && (
                          <div className="doctorNumberIcon">
                            <Image
                              src="/icons/whatsappBold.svg"
                              alt="phone"
                              width={10}
                              height={10}
                            />
                            <Link
                              href={doctorsDetailDataDetail.whatsapp_link}
                              target="_blank"
                            >
                              <p>WhatsApp</p>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {/* <span>{t?.doctorsPageLocation || "location"}:</span>
                    <div className="doctorNumberIcon">
                      <Image
                        src="/icons/boldLocation.svg"
                        alt="phone"
                        width={10}
                        height={10}
                      />
                      <p>{doctorsDetailDataDetail.location || "N/A"}</p>
                    </div> */}

                    {doctorsDetailDataDetail.location && (
                      <>
                        <span>{t?.doctorsPageLocation || "location"}:</span>
                        <div className="doctorNumberIcon">
                          <Image
                            src="/icons/boldLocation.svg"
                            alt="location"
                            width={10}
                            height={10}
                          />
                          <p>{doctorsDetailDataDetail.location}</p>
                        </div>
                      </>
                    )}

                    {/* <div className="doctorsSocialLinks">
                      <ul>
                        <li>
                          <Link
                            href={
                              doctorsDetailDataDetail.whatsapp_link || "N/A"
                            }
                          >
                            <img src="/icons/whatsappNormal.svg" alt="" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={doctorsDetailDataDetail.linkedin || "N/A"}
                          >
                            <img src="/icons/linkedinNormal.svg" alt="" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={doctorsDetailDataDetail.instagram || "N/A"}
                          >
                            <img src="/icons/instagramNormal.svg" alt="" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={doctorsDetailDataDetail.facebook || "N/A"}
                          >
                            <img src="/icons/facebookNormal.svg" alt="" />
                          </Link>
                        </li>
                      </ul>
                    </div> */}

                    <div className="doctorsSocialLinks">
                      <ul>
                        {doctorsDetailDataDetail.whatsapp_link && (
                          <Link href={doctorsDetailDataDetail.whatsapp_link}>
                            <li>
                              <img
                                src="/icons/whatsappNormal.svg"
                                alt="WhatsApp"
                              />
                            </li>
                          </Link>
                        )}

                        {doctorsDetailDataDetail.linkedin && (
                          <Link href={doctorsDetailDataDetail.linkedin}>
                            <li>
                              <img
                                src="/icons/linkedinNormal.svg"
                                alt="LinkedIn"
                              />
                            </li>
                          </Link>
                        )}

                        {doctorsDetailDataDetail.instagram && (
                          <Link href={doctorsDetailDataDetail.instagram}>
                            <li>
                              <img
                                src="/icons/instagramNormal.svg"
                                alt="Instagram"
                              />
                            </li>
                          </Link>
                        )}

                        {doctorsDetailDataDetail.facebook && (
                          <Link href={doctorsDetailDataDetail.facebook}>
                            <li>
                              <img
                                src="/icons/facebookNormal.svg"
                                alt="Facebook"
                              />
                            </li>
                          </Link>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl-9 lg-9 md-9 sm-12">
              {/* About */}
              {doctorsDetailDataDetail.about && (
                <div className="doctorDetailContent">
                  <div className="doctorDetailContentHeader">
                    <h3>{t?.doctorsPageAboutTitle || "About"}</h3>
                  </div>
                  <div
                    className="portos"
                    dangerouslySetInnerHTML={{
                      __html: doctorsDetailDataDetail.about,
                    }}
                  />
                </div>
              )}

              {/* Preparation */}
              {doctorsDetailDataDetail.preparation && (
                <div className="doctorDetailContent doctorDetailContentPreparation">
                  <div className="verticalLine"></div>
                  <div className="doctorDetailContentHeader">
                    <h3>{t?.doctorsPagePreparationTitle || "Preparation"}</h3>
                  </div>
                  <div
                    className="portos"
                    dangerouslySetInnerHTML={{
                      __html: doctorsDetailDataDetail.preparation,
                    }}
                  />
                </div>
              )}
              {/* Brand */}
              {doctorsDetailDataDetail.brand &&
                doctorsDetailDataDetail.brand.length > 0 && (
                  <div className="doctorDetailContent">
                    <div className="doctorDetailContentBrand">
                      <div className="doctorDetailContentHeader">
                        <h3>
                          {t?.doctorsPageBrandTitle ||
                            "The brand operated by the doctor"}
                        </h3>
                      </div>
                      {/* Optional brand description */}
                      {doctorsDetailDataDetail.brand[0].about_brand && (
                        <div
                          className="portos"
                          dangerouslySetInnerHTML={{
                            __html:
                              doctorsDetailDataDetail.brand[0].about_brand,
                          }}
                        />
                      )}
                      <div className="detailBrandItems">
                        {doctorsDetailDataDetail.brand.map((b) => (
                          <div className="detailBrandItem" key={b.id}>
                            <Image
                              src={`https://admin.adentta.az/storage${b.logo}`}
                              alt={b.title}
                              width={100}
                              height={100}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              {/* Interpretation */}
              {doctorsDetailDataDetail.preparation && (
                <div className="doctorDetailContent">
                  <div className="doctorDetailContentHeader">
                    <h3>
                      {t?.doctorsPageInterpretation ||
                        "Interpretation of Preparation Instructions"}
                    </h3>
                  </div>
                  <div className="doctorDetailContentInter">
                    <div className="doctorDetailContentInterText">
                      <p>
                        <div
                          className="portos"
                          dangerouslySetInnerHTML={{
                            __html: doctorsDetailDataDetail.preparation,
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Certificates */}
              {doctorsDetailDataDetail.certificates && (
                <div className="doctorDetailContent">
                  <div className="doctorDetailContentHeader">
                    <h3>{t?.doctorsPageCertificates || "Certificates"}</h3>
                  </div>
                  <div className="certificates">
                    <div className="certificateImg">
                      <Image
                        src={`https://admin.adentta.az/storage${doctorsDetailDataDetail.certificates}`}
                        alt="certificates"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="doctorsDetailPageOtherDoctors">
          <div className="doctorsOtherDoctors">
            <span>{t?.doctorsPageOtherDoctors || "Other Doctors"}</span>
          </div>
          <div className="row">
            {otherDoctors.splice(0, 4).map((doctor) => (
              <div key={doctor.id} className="xl-3 lg-3 md-6 sm-12">
                <Link
                  href={`/doctors/${doctor?.slug
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}-${doctor.id}`}
                  className="block"
                >
                  <div className="doctorsCards">
                    <div className="doctorsCard">
                      <div className="doctorsCardImg">
                        {doctor.image && (
                          <Image
                            src={`https://admin.adentta.az/storage${doctor.image}`}
                            alt={doctor.title}
                            width={400}
                            height={400}
                          />
                        )}
                      </div>
                    </div>
                    <div className="doctorsCardContent">
                      <div className="doctorJobTypes">
                        {doctor.category?.map((cat, index) => (
                          <div className="doctorJobType" key={index}>
                            <span>{cat.title}</span>
                          </div>
                        ))}
                      </div>
                      <h3>{doctor.title}</h3>
                      <div className="doctorBey">
                        <span>{doctor.workplace}</span>
                        <Image
                          src="/icons/dotIMG.svg"
                          alt="1"
                          width={6}
                          height={6}
                        />
                        <span>{doctor.location}</span>
                      </div>
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

export default DoctorsDetailPage;

// !
