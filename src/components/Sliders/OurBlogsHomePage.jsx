"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";

import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

const OurBlogsHomePage = ({ blogData, t }) => {
  return (
    <section id="ourEvents" className="ourBlogs">
      <div className="container swiperjs ourEventsHomePage">
        <span>{t?.homeBlogsTitle || "Explore our blogs"}</span>

        <Swiper
          slidesPerView={"4"}
          spaceBetween={20}
          // loop={"true"}
          pagination={{
            clickable: true,
            el: ".blogs-custom-pagination",
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
          className="mySwiper"
        >
          {blogData.map((blog) => (
            <SwiperSlide key={blog.id}>
              <Link
                href={`/blogs/${blog?.title?.toLowerCase()
                  .replace(/\s+/g, "-")}-${blog.id}`}
                className="block"
              >
                <div className="ourEvents ourBlogs">
                  <div className="ourEvent ourBlogshh">
                    <div className="ourEventImage ourEventImageBlog">
                      <img
                        src={`https://admin.adentta.az/storage${blog.image}`}
                        alt=""
                      />
                    </div>

                    <div className="ourEventContent">
                      <span> {blog.title}</span>
                        <div
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        ></div>
                    </div>

                    <div className="ourEventBottom">
                      <span>{t?.learnMore || "Learn More"}</span>
                      <img src="/icons/arrowTopRight.svg" alt="" />
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="blogs-custom-pagination"></div>
      </div>
    </section>
  );
};

export default OurBlogsHomePage;
