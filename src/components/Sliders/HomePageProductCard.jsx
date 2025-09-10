"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import Manat from "../../../public/icons/manat.svg";
import "../../app/[locale]/globals.scss";

const HomePageProductCard = ({ productData , t}) => {
  return (
    <div className="container swiperjs homePageProductCardAll">
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        loop
        pagination={{ clickable: true, el: ".my-custom-pagination" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1000}
        breakpoints={{
          340: { slidesPerView: 1.5, spaceBetween: 20, centeredSlides: true },
          640: { slidesPerView: 3, spaceBetween: 16 },
          991: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1440: { slidesPerView: 4, spaceBetween: 20 },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper homePageProductCard"
        id="homePageHero"
      >
        {productData.map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              href={`/products/${product.title
                .toLowerCase()
                .replace(/\s+/g, "-")}-${product.id}`}
              className="block"
            >
              <div className="homePageProductCardContent">
                <div className="homePageProCardImgs">
                  <div className="homePageProductCardContentImage">
                    {product.image ? (
                      <Image
                        src={`https://admin.adentta.az/storage${product.image}`}
                        alt={product.title}
                        width={800}
                        height={800}
                        priority
                        unoptimized
                      />
                    ) : (
                      <p>NotFound</p>
                    )}
                  </div>
                </div>
                <div className="homePageProductCardContentInner">
                  <div className="homePageProductCardContentText">
                    <span>{product.title}</span>
                  </div>
                  <div className="price">
                    <div className="priceItem">
                      <strong id="prices">{product.price}</strong>
                      <Manat />
                    </div>
                  </div>
                </div>
                <div className="homePageProductCardContentBottom">
                  <span>{t?.learnMore || "Learn More"}</span>
                  <img src="/icons/arrowTopRight.svg" alt="arrow" />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="my-custom-pagination"></div> */}
    </div>
  );
};

export default HomePageProductCard;
