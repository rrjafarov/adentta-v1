"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/autoplay";
// import "../../app/globals.scss";
import "../../app/[locale]/globals.scss";

import { Navigation } from "swiper/modules";

const ProductsPageHero = ({t ,productData}) => {
  return (
    <section id="productsPageHero">
      <div className="container productsPageHero">
        <div className="productsPageHeroHeader">
          {/* <span>{t?.productsPageFilterTitle || "Filter"}</span> */}
          <div className="productsPageHeaderText">
            <h4>{t?.productsPageAllEquipments || "All Equipments Category"}</h4>
            <p>
              {t?.productsPageHeroText || "Lorem ipsum dolor sit amet, "}
            </p>
          </div>
          <div className="custom-navigation">
            <button className="custom-prev">
              <img src="/icons/leftDownNavigate.svg" alt="" />
            </button>
            <button className="custom-next">
              <img src="/icons/rightDownNavigate.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="productsPageSlider">
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
            speed={1000}
            loop={true}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              320: { slidesPerView: 2.3 },
              480: { slidesPerView: 3.5 },
              640: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            className="mySwiper"
          >
            
            {productData?.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="productsPageSliderItem">
                  <div className="productsPageSliderInner">
                    <div className="productsPageSliderItemImage">
                      <img
                        src={`https://admin.adentta.az/storage${item.image}`}
                        alt={item.title}
                      />
                    </div>
                  </div>
                  <div className="productsPageSliderItemText">
                    <span>{item.title}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductsPageHero;
