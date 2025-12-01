"use client";
import React from "react";
import SeeOurMissionBTN from "./SeeOurMissionBTN";
import Link from "next/link";
import Image from "next/image";
import CountUp from "react-countup";
import AboutPageCountUp from "./AboutPageCountUp";

const AboutPageBanner = ({
  image,
  title,
  content,
  statistica1,
  statistica2,
  statistica3,
  statistica4,
  statistica2Title,
  statistica3Title,
  statistica4Title,
  t,
  statistica1Img,
  statistica2Img,
  statistica3Img,
  statistica4Img,
}) => {
  return (
    <>
      <div className="container">
        <div className="aboutBanner">
          <Image
            src={`https://admin.adentta.az/storage/${image}`}
            alt="banner"
            width={1200}
            height={500}
          />
          <div className="aboutTop topper">
            <Link href="/">
              <strong className="topper">Adentta</strong>
            </Link>
            <img
              className="topper"
              src="/icons/whiteRightDown.svg"
              alt="Adentta"
            />
            <span className="topper">{t?.aboutBannerTitle || "About"}</span>
          </div>
          <div className="aboutBottom">
            <h1>{t?.aboutBannerTitle || "About us"}</h1>
            <p>{t?.aboutBannerContent || "Adentta"}</p>
          </div>
        </div>

        <div className="aboutContent">
          <span>{t?.aboutBannerTitle || "About us"}</span>
          {/* <span>Who we are?</span> */}
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>

          <Link href={"/mission"} className="seeOurMissionBTN">
            <SeeOurMissionBTN t={t} />
          </Link>
        </div>
        <AboutPageCountUp
          t={t}
          statistica1={statistica1}
          statistica2={statistica2}
          statistica3={statistica3}
          statistica4={statistica4}
          statistica2Title={statistica2Title}
          statistica3Title={statistica3Title}
          statistica4Title={statistica4Title}
          statistica1Img={statistica1Img}
          statistica2Img={statistica2Img}
          statistica3Img={statistica3Img}
          statistica4Img={statistica4Img}
        />
      </div>

      <section id="aboutPageProvide">
        <div className="aboutPageProvideAndChecked">
          <div className="container">
            <div className="row">
              <div className="xl-6 lg-6 md-6 sm-12">
                <div className="aboutVidProviderContentText">
                  <span>{t?.whatWeProvide || "What We Provide"}</span>
                  <h3>
                    {t?.whatWeProvideContent ||
                      "Empowering Smiles, Elevating Care – Your Trusted Dental Supply Partner."}
                  </h3>
                  <p>
                    {t?.whatWeProvideContent2 ||
                      "Our practice is designed not only to provide cutting-edge treatments but also to create an environment where patients feel relaxed and confident in their care."}
                  </p>
                </div>
              </div>
              <div className="xl-6 lg-6 md-6 sm-12">
                <div className="aboutVidProviderContentChecked">
                  <div className="checked">
                    <div className="checkIcon">
                      <img src="/icons/check.svg" alt="" />
                    </div>
                    <span>{t?.aboutCheck1 || "/"}</span>
                  </div>
                  <div className="checked">
                    <div className="checkIcon">
                      <img src="/icons/check.svg" alt="" />
                    </div>
                    <span>{t?.aboutCheck2 || "/"}</span>
                  </div>
                  <div className="checked">
                    <div className="checkIcon">
                      <img src="/icons/check.svg" alt="" />
                    </div>
                    <span>{t?.aboutCheck3 || "/"}</span>
                  </div>
                  <div className="checked">
                    <div className="checkIcon">
                      <img src="/icons/check.svg" alt="" />
                    </div>
                    <span>{t?.aboutCheck4 || "/"}</span>
                  </div>
                  <div className="checked">
                    <div className="checkIcon">
                      <img src="/icons/check.svg" alt="" />
                    </div>
                    {/* <span>Over 10,000 Products in Stock</span> */}
                    <span>{t?.aboutCheck5 || "/"}</span>
                  </div>
                  <div className="checked">
                    <div className="checkIcon">
                      <img src="/icons/check.svg" alt="" />
                    </div>
                    <span>{t?.aboutCheck6 || "/"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPageBanner;
