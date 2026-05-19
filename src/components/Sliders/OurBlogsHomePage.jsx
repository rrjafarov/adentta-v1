"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import SeeMore from "../SeeMore";

const generateSlug = (text = "") => {
  return text
    .toLowerCase()
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const OurBlogsHomePage = ({ blogData, t }) => {
  return (
    <section id="ourEvents" className="ourBlogs">
      <div className="container swiperjs ourEventsHomePage">
        <h2>{t?.homeBlogsTitle || "Explore our blogs"}</h2>

        <Swiper
          slidesPerView={"4"}
          spaceBetween={20}
          loop={true}
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
          {blogData?.slice(0, 5).map((blog) => {
            const slug = blog?.slug || generateSlug(blog?.title);

            return (
              <SwiperSlide key={blog.id}>
                <Link
                  href={`/blogs/${slug}-${blog.id}`}
                  className="block"
                >
                  <div className="ourEvents ourBlogs">
                    <div className="ourEvent ourBlogshh">
                      <div className="ourEventImage ourEventImageBlog">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${blog.image}`}
                          alt={blog.title}
                          width={300}
                          height={300}
                        />
                      </div>

                      <div className="ourEventContent thisIsBlog">
                        <span>{blog.title}</span>
                        <div
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                      </div>

                      <div className="ourEventBottom">
                        <span>{t?.learnMore || "Learn More"}</span>
                        <img src="/icons/arrowTopRight.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="blogs-custom-pagination" />

        <div className="container flex justify-center seeMoreGlobal">
          <Link href={"/blogs"}>
            <SeeMore t={t} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurBlogsHomePage;