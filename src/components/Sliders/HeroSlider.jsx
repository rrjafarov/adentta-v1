"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";
import { Pagination, Autoplay } from "swiper/modules";
import LoadMoreBTN from "../LoadMoreBTN";
import Link from "next/link";
import Image from "next/image";

const SwiperJS = ({ heroSliderData, bannerData }) => {
  return (
    <>
      <section id="homePageHero">
        <div className="container">
          <div className="homePageHero">
            <div className="row ">
              <div className="xl-8 lg-8 md-8 sm-12">
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={20}
                  pagination={{
                    clickable: true,
                    el: ".custom-pagination",
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  speed={3000}
                  modules={[Pagination, Autoplay]}
                  className="mySwiper"
                >
                  {heroSliderData.map((slider) => (
                    <SwiperSlide key={slider.id} className="swprSld">
                      {/* <div className="swiperSlideContent">
                        <img
                          src={`https://admin.adentta.az/storage${slider.image}`}
                          alt=""
                        />
                      </div> */}

                      <Link href={slider.link}>
                        <div className="swiperSlideContent">
                          <Image
                            src={`https://admin.adentta.az/storage${slider.image}`}
                            alt=""
                            width={840}
                            height={500}
                          />
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}

                  {/* <SwiperSlide className="swprSld">
                    <div className="swiperSlideContent">
                      <img src="/images/heroSliderOdd.png" alt="" />
                      <div className="swiperSlideContent-text">
                        <span>Product</span>
                        <p className="slideParagraph">
                          Revolutionizing Dental Care with Premium Supplies
                        </p>
                        <p className="slideParagraph2">
                          Discover a wide range of high-quality dental products
                          designed to enhance your practice.
                        </p>

                        <Link href="/products">
                          <LoadMoreBTN />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide> */}
                </Swiper>

                <div className="custom-pagination"></div>
              </div>

              <div className="xl-4 lg-4 md-4 sm-12">
                {[bannerData].map((banner) => (
                  <Link key={banner.id} href={banner.link}>
                    <div
                      key={banner.id}
                      className="swiperSlideContent swiperSlideContentSmall"
                    >
                      <Image
                        src={`https://admin.adentta.az/storage/${banner.image}`}
                        alt="banner"
                        width={400}
                        height={400}
                      />
                      {/* <div className="swiperSlideContent-smalltext">
                      <span>Product</span>
                      <div className="ptag">
                        <p className="slideParagraph">20% </p>
                        <p>off</p>
                      </div>
                      <p className="slideParagraph2">
                        high-quality dental products designed
                      </p>
                    </div> */}
                    </div>
                  </Link>
                  // <div
                  //   key={banner.id}
                  //   className="swiperSlideContent swiperSlideContentSmall"
                  // >
                  //   <img
                  //     src={`https://admin.adentta.az/storage/${banner.image}`}
                  //     alt="banner"
                  //   />
                  //   {/* <div className="swiperSlideContent-smalltext">
                  //     <span>Product</span>
                  //     <div className="ptag">
                  //       <p className="slideParagraph">20% </p>
                  //       <p>off</p>
                  //     </div>
                  //     <p className="slideParagraph2">
                  //       high-quality dental products designed
                  //     </p>
                  //   </div> */}
                  // </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="mobileBannerSlider">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={3000}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              {heroSliderData.map((slider) => (
                <SwiperSlide key={slider.id} className="swprSld">
                  <Link href={slider.link}>
                    <div className="swiperSlideContent">
                      <Image
                        src={`https://admin.adentta.az/storage${slider.image}`}
                        alt=""
                        width={840}
                        height={500}
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default SwiperJS;
