"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import AboutPageDirector from "./AboutPageDirector";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: {
    zoom: false,
  },
});

const AboutPageParallax = ({
  videoUrl,
  videoTitle,
  videoCover,
  directorName,
  directorTitle,
  directorMessage,
  directorImage,
  t,
  directorImage2
}) => {
  return (
    <section id="aboutPageParallax">
      <div className="container">
        <div className="aboutPageParallax">
          <Link
            href={videoUrl}
            className="aboutPageVid"
            data-fancybox="videos"
          >
            <Image
              // src="/images/parallaxImg.png"
              src={`https://admin.adentta.az/storage${videoCover}`}
              alt="###"
              width={800}
              height={400}
            />
            <div className="aboutPageParallaxText">
              <span>VIDEO</span>
              {/* <p>Advanced Equipments for Better Care</p> */}
              <p>{videoTitle}</p>
              <div className="parallaxPlayIcon">
                <Image
                  src="/icons/videoPlayIcon.svg"
                  alt="play"
                  width={28}
                  height={28}
                />
              </div>
            </div>
          </Link>
        </div>
        <AboutPageDirector
          directorName={directorName}
          directorTitle={directorTitle}
          directorMessage={directorMessage}
          directorImage={directorImage}
          directorImage2={directorImage2}
        />
      </div>
    </section>
  );
};

export default AboutPageParallax;
