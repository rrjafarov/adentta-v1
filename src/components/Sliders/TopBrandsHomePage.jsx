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
          <span>{t?.homeBrandsTitle || "Top Brands"}</span>

        </div>

        <div className="container swiperjs topBrandsSwiper">
          <Swiper
            slidesPerView={"4"}
            spaceBetween={20}
            loop={"true"}
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
            {brandsData.map((brand) => (
              <SwiperSlide key={brand.id}>
                <Link href={`/brands/${brand.title.toLowerCase().replace(/\s+/g, '-')}-${brand.id}`} className="block">
                  <div className="topBrand">
                    <div className="topBrandImg">
                      <div className="topBrandLittleImg">
                        {/* <img src="/images/topBrandImg.png" alt="" /> */}
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
              // <SwiperSlide>
              //   <Link href={`/products/${product.id}`} className="block ">
              //     <div className="homePageProductCardContent ">
              //       <div className="homePageProCardImgs">
              //         <div className="homePageProductCardContentImage">
              //           {/* <img src="/images/ourproducthome.png" alt="" /> */}
              //           <img
              //             src={`https://admin-addenta.onestudio.az/storage${product.image}`}
              //             alt=""
              //           />
              //         </div>
              //       </div>
              //       <div className="homePageProductCardContentInner">
              //         <div className="homePageProductCardContentText ">
              //           <span>{product.title} </span>
              //           {/* <p>{product.content}</p> */}
              //           <div
              //             dangerouslySetInnerHTML={{ __html: product.content }}
              //           ></div>
              //         </div>
              //         <div className="price">
              //           <div className="priceItem">
              //             <strong id="prices">{product.price}</strong>
              //             <Manat />
              //           </div>
              //         </div>
              //       </div>

              //       <div className="homePageProductCardContentBottom">
              //         <span>Learn More</span>
              //         <img src="/icons/arrowTopRight.svg" alt="" />
              //       </div>
              //     </div>
              //   </Link>
              // </SwiperSlide>
            ))}

            {/* <SwiperSlide>
              <Link href="/about" className="block">
                <div className="topBrand">
                  <div className="topBrandImg">
                    <div className="topBrandLittleImg">
                      <img src="images/apoza.png" alt="" />
                    </div>
                  </div>
                  <span className="topBrandSpan">smile with confidience</span>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/about" className="block">
                <div className="topBrand">
                  <div className="topBrandImg">
                    <div className="topBrandLittleImg">
                      <img src="images/straumann.png" alt="" />
                    </div>
                  </div>
                  <span className="topBrandSpan">smile with confidience</span>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="" className="block">
                <div className="topBrand">
                  <div className="topBrandImg">
                    <div className="topBrandLittleImg">
                      <img src="images/topBrandImg.png" alt="" />
                    </div>
                  </div>
                  <span className="topBrandSpan">smile with confidience</span>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/about" className="block">
                <div className="topBrand">
                  <div className="topBrandImg">
                    <div className="topBrandLittleImg">
                      <img src="images/apoza.png" alt="" />
                    </div>
                  </div>
                  <span className="topBrandSpan">smile with confidience</span>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/about" className="block">
                <div className="topBrand">
                  <div className="topBrandImg">
                    <div className="topBrandLittleImg">
                      <img src="images/straumann.png" alt="" />
                    </div>
                  </div>
                  <span className="topBrandSpan">smile with confidience</span>
                </div>
              </Link>
            </SwiperSlide>

            <SwiperSlide>
              <Link href="/about" className="block">
                <div className="topBrand">
                  <div className="topBrandImg">
                    <div className="topBrandLittleImg">
                      <img src="images/topBrandImg.png" alt="" />
                    </div>
                  </div>
                  <span className="topBrandSpan">smile with confidience</span>
                </div>
              </Link>
            </SwiperSlide> */}
          </Swiper>
          <div className="brands-custom-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default TopBrandsHomePage;
