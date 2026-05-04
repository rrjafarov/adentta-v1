"use client";
import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function VerticalCenteredSlider({ historyYears, t }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="changeYearFolder">
      <div className="container">
        <div className="verticalSliderHeaderText">
          <p className="topper">{t?.aboutBannerTitle || "About"}</p>
          <h3>{t?.changeYearContent || "Overview of the company's history"}</h3>
        </div>
        <div className="vertical-slider-container">
          {/* Slider Sol Kısım */}
          <div className="vertical-slider-left">
            <div className="vertical-slider-wrapper">
              <Swiper
                direction={isMobile ? "horizontal" : "vertical"}
                slidesPerView={isMobile ? 5 : 7}
                centeredSlides={true}
                // loop={true}
                spaceBetween={10}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                slideToClickedSlide={true}
                className="vertical-swiper"
              >
                {historyYears.map((item, idx) => (
                  <SwiperSlide key={item.id}>
                    <div
                      className={`vertical-slide ${
                        idx === activeIndex ? "active" : ""
                      }`}
                    >
                      {!isMobile && idx === activeIndex && (
                        <span className="active-plus">
                          <img src="/icons/ellipses.svg.svg" alt="Ellipse" />
                          {/* <ChangeYearDot /> */}
                        </span>
                      )}
                      {item.history}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* İçerik ve Resim Kısmı */}
          <div className="vertical-slider-right">
            <div className="vertical-content">
              <span>{historyYears[activeIndex]?.title}</span>
              <p
                className="changeYearDesc"
                dangerouslySetInnerHTML={{
                  __html: historyYears[activeIndex]?.content,
                }}
              ></p>
            </div>

            <div className="verticalImages">
              {historyYears[activeIndex]?.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${historyYears[activeIndex].image}`}
                  alt={historyYears[activeIndex]?.title || "banner"}
                  width={600}
                  height={600}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
