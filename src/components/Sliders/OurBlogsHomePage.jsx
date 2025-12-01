"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import SeeMore from "../SeeMore";

const OurBlogsHomePage = ({ blogData, t }) => {
  return (
    <section id="ourEvents" className="ourBlogs">
      <div className="container swiperjs ourEventsHomePage">
        <h2>{t?.homeBlogsTitle || "Explore our blogs"}</h2>

        <Swiper
          slidesPerView={"4"}
          spaceBetween={20}
          loop={"true"}
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
          {blogData.slice(0, 5).map((blog) => (
            <SwiperSlide key={blog.id}>
              <Link
                href={`/blogs/${(blog?.slug || blog?.title)
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}-${blog.id}`}
                className="block"
              >
                <div className="ourEvents ourBlogs">
                  <div className="ourEvent ourBlogshh">
                    <div className="ourEventImage ourEventImageBlog">
                      <Image
                        src={`https://admin.adentta.az/storage${blog.image}`}
                        alt={blog.title}
                        width={300}
                        height={300}
                      />
                    </div>

                    <div className="ourEventContent thisIsBlog">
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

        <div className="container flex justify-center seeMoreGlobal ">
          <Link href={"/blogs"}>
            <SeeMore t={t} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurBlogsHomePage;
