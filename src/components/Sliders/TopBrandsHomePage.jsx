"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import "../../app/globals.scss";
import "../../app/[locale]/globals.scss";

import { Pagination, Autoplay } from "swiper/modules";
import SeeMore from "../SeeMore";
import Link from "next/link";

const TopBrandsHomePage = ({ brandsData, t }) => {
  return (
    <section id="topBrandsHomePage">
      <div className="container topBrandsHomePage">
        <div className="topBrandsHeader">
          {/* <span>Top Brandlər</span> */}
          <h2>{t?.homeBrandsTitle || "Top Brands"}</h2>
        </div>

        <div className="container swiperjs topBrandsSwiper">
          <Swiper
            slidesPerView={"4"}
            spaceBetween={20}
            loop={true}
            pagination={{
              clickable: true,
              el: ".brands-custom-pagination",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1000}
            breakpoints={{
              340: {
                slidesPerView: 1.5,
                spaceBetween: 20,
                centeredSlides: true,
                loop: true,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              991: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper topBrandSwiper"
            id="homePageHero"
          >
            {(brandsData || []).slice(0, 5).map((brand) => (
              <SwiperSlide key={brand.id}>
                <Link
                  href={`/brands/${brand?.title?.toLowerCase().replace(/\s+/g, "-")}-${brand.id}`}
                  className="block"
                >
                  <div className="topBrand">
                    <div className="topBrandImg">
                      <div className="topBrandLittleImg">
                        <img
                          src={`https://admin.adentta.az/storage${brand.logo}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <span className="topBrandSpan">{brand.title}</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="brands-custom-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default TopBrandsHomePage;
