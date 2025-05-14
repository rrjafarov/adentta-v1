"use client";
import React from "react";
import LoadMoreBTN from "./LoadMoreBTN";
import Link from "next/link";
import AboutUsBTN from "./AboutUsBTN";
import Image from "next/image";
import CountUp from "react-countup";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: {
    zoom: false,
  },
});

const VideoProviderHomePage = ({ homepageData, t }) => {
  return (
    <section id="vidProviderHomePage">
      <div className="container vidProviderHomePage">
        {/* <div className="row"> */}
        {/* <div className="xl-6 lg-6 md-6 sm-12"> */}
        <div className="vidProviderContent">
          <div className="vidProviderContentText">
            <span>{t?.whatWeProvide || "What We Provide"}</span>
            <p>
              {t?.whatWeProvideContent ||
                "Empowering Smiles, Elevating Care – Your Trusted Dental Supply Partner."}
            </p>
            <p>
              {t?.whatWeProvideContent2 ||
                "Our practice is designed not only to provide cutting-edge treatments but also to create an environment where patients feel relaxed and confident in their care."}
            </p>
          </div>

          <div className="vidProviderContentChecked">
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
              {/* <span>Over 10,000 Products in Stock</span> */}
              <span>{t?.aboutCheck4 || "/"}</span>
            </div>
          </div>
          <Link href={"/about"}>
            <AboutUsBTN t={t} />
          </Link>
        </div>
        {/* </div> */}

        {/* <div className="xl-6 lg-6 md-6 sm-12"> */}
        <div className="vidProviderVideo">
          <Link href={homepageData.video_url} data-fancybox="videos">
            <div className="vidProviderVideoContent">
              {/* <img src="/images/videoImage.png" alt="" /> */}
              <img
                src={`https://admin.adentta.az/storage${homepageData.video_cover}`}
                alt="video"
              />
              <div className="happyCustomer">
                <div className="smallHappyCustomer">
                  <span>
                    <CountUp
                      end={homepageData.customer_count}
                      suffix="+"
                      duration={3}
                      className="stats-number"
                    />
                  </span>
                  {/* <p>{t?.happyCustomerHomePage || "Happy customer"}</p> */}
                  <p>{homepageData.customer_text}</p>
                </div>
              </div>
              <div className="videoHomePagePlayIcon">
                <Image
                  src="/icons/videoPlay.svg"
                  alt="play"
                  width={5}
                  height={5}
                />
              </div>
            </div>
          </Link>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default VideoProviderHomePage;
