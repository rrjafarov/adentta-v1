"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../app/[locale]/globals.scss";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import SeeMore from "../SeeMore";
import Image from "next/image";
import { Globe } from "../Footer/Globe";

const GlobalExcellence = ({ brandsData, t }) => {
  return (
    <section id="globalExcellence">
      <div className="container swiperjs globalExcellence">
        <h2>
          {t?.homeBrandsTitle2 || "Global Excellence, Trusted Brands."}
        </h2>
        <p>
          {t?.homeBrandsContent ||
            "Our trusted brands hail from countries known for innovation and  quality, including Sweden, Poland, Italy, Germany, China, Korea, Japan, and Taiwan. Discover the difference global expertise makes."}
        </p>
      </div>

      <Swiper
        slidesPerView={"6"}
        spaceBetween={20}
        loop={"true"}
        pagination={{
          clickable: true,
          el: "ss",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        breakpoints={{
          340: {
            slidesPerView: 2.4,
            spaceBetween: 20,
            centeredSlides: true,
            loop: true,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper globalBrandSlider"
      >
        {brandsData.map((brand) => (
          <SwiperSlide key={brand.id} className="globalBrandSliderItem">
            <div className="globalExBrands">
              <img
                src={`https://admin.adentta.az/storage${brand.logo}`}
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container flex justify-center seeMoreGlobal ">
        <Link href={"/brands"}>
          <SeeMore t={t} />
        </Link>
      </div>

      <div className="globeBanner">
        {/* <Image
          src="/images/globeGIF.png"
          alt="globe"
          width={1000}
          height={500}
        /> */}
        <Globe className="globeCanvas" />
        
      </div>
    </section>
  );
};

export default GlobalExcellence;
