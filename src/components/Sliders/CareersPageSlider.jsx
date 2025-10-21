"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
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
        autoplay={{
          delay: 3000, // 3 saniyədən bir slayd dəyişsin
          disableOnInteraction: false, // istifadəçi klikləsə belə davam etsin
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
            <SwiperSlide key={index} className="careersSwiperSlide">
              <Link
                href={`https://admin.adentta.az/storage${photo}`}
                data-fancybox="videos"
                className="careersSliderGalleryImg"
              >
                <div className="careersImageFillWrapper">
                  <Image
                    src={`https://admin.adentta.az/storage${photo}`}
                    alt={`Slide ${index}`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 33vw"
                    className="careersSliderCardImg"
                    priority={index === 0}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
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
