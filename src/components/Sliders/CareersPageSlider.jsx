"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
// import "../../app/globals.scss";
import "../../app/[locale]/globals.scss";
import { Autoplay, Navigation } from "swiper/modules";

Fancybox.bind("[data-fancybox]", {
  dragToClose: false,
  Image: {
    zoom: false,
  },
});

const CareersPageSlider = ({ lifeOnHereData }) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        speed={2000}
        loop={true}
        centeredSlides={true}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".careersCustom-next",
          prevEl: ".careersCustom-prev",
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          767: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
        className="mySwiper careersSwiper"
      >

        {lifeOnHereData.photos &&
          lifeOnHereData.photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <Link
                // href={photo}
                href={`https://admin.adentta.az/storage${photo}`}

                className="careersSliderGalleryImg"
                data-fancybox="videos"
              >
                <Image
                  // src={photo}
                  src={`https://admin.adentta.az/storage${photo}`}

                  className="careersSliderCardImg"
                  alt={`Slide ${index}`}
                  width={400}
                  height={400}
                />
              </Link>
            </SwiperSlide>
          ))}

        {/* <SwiperSlide>
          <Link
            href="/images/careersPhoto.png"
            className="careersSliderGalleryImg"
            data-fancybox="videos"
          >
            <div className="videoGaleryImg">
              <Image
                src="/images/careersPhoto.png"
                // effect="blur"
                className="careersSliderCardImg"
                alt="22"
                width={100}
                height={100}
                // placeholder="blur"
                // blurDataURL={Blur.src}
              />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            href="/images/careersPhoto.png"
            className="careersSliderGalleryImg"
            data-fancybox="videos"
          >
            <div className="videoGaleryImg">
              <Image
                src="/images/careersPhoto.png"
                // effect="blur"
                className="careersSliderCardImg"
                alt="22"
                width={100}
                height={100}
                // placeholder="blur"
                // blurDataURL={Blur.src}
              />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            href="/images/careersPhoto.png"
            className="careersSliderGalleryImg"
            data-fancybox="videos"
          >
            <div className="videoGaleryImg">
              <Image
                src="/images/careersPhoto.png"
                // effect="blur"
                className="careersSliderCardImg"
                alt="22"
                width={100}
                height={100}
                // placeholder="blur"
                // blurDataURL={Blur.src}
              />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            href="/images/careersPhoto.png"
            className="careersSliderGalleryImg"
            data-fancybox="videos"
          >
            <div className="videoGaleryImg">
              <Image
                src="/images/careersPhoto.png"
                // effect="blur"
                className="careersSliderCardImg"
                alt="22"
                width={100}
                height={100}
                // placeholder="blur"
                // blurDataURL={Blur.src}
              />
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link
            href="/images/careersPhoto.png"
            className="careersSliderGalleryImg"
            data-fancybox="videos"
          >
            <div className="videoGaleryImg">
              <Image
                src="/images/careersPhoto.png"
                // effect="blur"
                className="careersSliderCardImg"
                alt="22"
                width={100}
                height={100}
                // placeholder="blur"
                // blurDataURL={Blur.src}
              />
            </div>
          </Link>
        </SwiperSlide> */}
      </Swiper>

      <div className="careersCustom-navigation">
        <button className="careersCustom-prev">
          <img src="/icons/careersLeftArrow.svg" alt="" />
        </button>
        <button className="careersCustom-next">
          <img src="/icons/careersRightArrow.svg" alt="" />
        </button>
      </div>
    </>
  );
};

export default CareersPageSlider;
