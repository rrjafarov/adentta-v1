"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import SeeMore from "../SeeMore";

const OurEventsHomePage = ({ eventsData, t }) => {
  const lang = Cookies.get("NEXT_LOCALE") || "az";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    let month;
    if (lang === "az") {
      const azMonths = {
        1: "yan",
        2: "fev",
        3: "mar",
        4: "apr",
        5: "may",
        6: "iyn",
        7: "iyl",
        8: "avq",
        9: "sen",
        10: "okt",
        11: "noy",
        12: "dek",
      };
      month = azMonths[date.getMonth() + 1];
    } else {
      month = new Intl.DateTimeFormat(lang, { month: "short" })
        .format(date)
        .replace(".", "");
    }

    return `${day} ${month} ${year}`;
  };

  const formatStatus = (status) => {
    if (status === 0 || status === "ongoing" || status === "0")
      return t?.ongoing || "ongoing";
    if (status === 1 || status === "expected" || status === "1")
      return t?.expected || "expected";
    if (status === 2 || status === "finished" || status === "2")
      return t?.finished || "finished";
    return status;
  };

  return (
    <section id="ourEvents">
      <div className="container swiperjs ourEventsHomePage">
        <span>{t?.homeEventsTitle || "Explore our events"}</span>

        <Swiper
          slidesPerView={"3"}
          spaceBetween={20}
          loop={"true"}
          pagination={{
            clickable: true,
            el: ".events-custom-pagination",
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
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {eventsData.map((event) => (
            <SwiperSlide key={event.id}>
              <Link
                href={`/events/${(event?.slug || event?.title)
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}-${event.id}`}
                className="block"
              >
                <div className="ourEvents">
                  <div className="ourEvent">
                    <div className="ourEventImage">
                      <Image
                        src={`https://admin.adentta.az/storage${event.image}`}
                        alt={event.title}
                        width={300}
                        height={300}
                      />
                      <div className="ourEventImageDate">
                        <span className="ourEventDate">
                          {formatDate(event.event_start_date)}
                        </span>
                        <p>{formatStatus(event.event_status)}</p>
                      </div>
                    </div>

                    <div className="ourEventContent ourEventContentEvent">
                      <span>{event.title}</span>
                      <p>{event.sub_title}</p>
                    </div>

                    <div className="ourEventBottom">
                      <span>{t?.learnMore || "Learn More"}</span>
                      <img src="icons/arrowTopRight.svg" alt="" />
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="events-custom-pagination"></div>

        <div className="container flex justify-center seeMoreGlobal ">
          <Link href={"/events"}>
            <SeeMore t={t} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurEventsHomePage;
