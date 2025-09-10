"use client";
import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import HomePageProductCard from "./Sliders/HomePageProductCard";

const HomePageProducts = ({ categoryData, productData, t }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = (id) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCategory(id);
      setLoading(false);
    }, 200);
  };

  // Yalnız üst (parent) kategorileri seç
  const parentCategories = useMemo(() => {
    if (!Array.isArray(categoryData)) return [];
    return categoryData.filter(cat => {
      // Eğer parent_id yoksa kesin üst kategori
      if (!("parent_id" in cat)) return true;
      // Eğer parent_id array'i varsa ama boşsa (teorik) yine üst kabul et
      const p = cat.parent_id;
      if (Array.isArray(p) && p.length === 0) return true;
      // Aksi halde alt kategori, atla
      return false;
    });
  }, [categoryData]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === null) return productData;
    return productData.filter((p) =>
      // p.categories.some((c) => Number(c.id) === Number(selectedCategory))


     Array.isArray(p.categories) &&
     p.categories.some((c) => Number(c.id) === Number(selectedCategory))
    );
  }, [selectedCategory, productData]);

  return (
    <section id="homePageProducts">
      <div className="homePageProducts container">
        <span>{t?.homeProductsTitle || "Explore Our Products"}</span>

        <div className="buttons">
          <div
            className={`btn btn-1 ${selectedCategory === null ? "active" : ""}`}
          >
            <button onClick={() => handleCategorySelect(null)}>
              <p>{t?.allSelect || "All"}</p>
            </button>
          </div>

          {/* Kategori slider */}
          <div className="category-slider-wrapper">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView="auto"
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: false }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              className="category-slider"
            >
              {parentCategories.map((category) => (
                <SwiperSlide key={category.id} className="swiper-slide">
                  <div
                    className={`btn btn-2 ${
                      Number(selectedCategory) === Number(category.id)
                        ? "active"
                        : ""
                    }`}
                  >
                    <button
                      onClick={() => handleCategorySelect(Number(category.id))}
                    >
                      <img
                        src={`https://admin.adentta.az/storage${category.icon}`}
                        alt={category.title || ""}
                      />
                      <p>{category.title}</p>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="swiper-navigation">
            <button className="swiper-button-prev-custom">
              <img src="/icons/bomLeft.svg" alt="" />
            </button>
            <button className="swiper-button-next-custom">
              <img src="/icons/bomRight.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <>
          <div className="loader-container">
            <div className="loader"></div>
          </div>
          {/* Spinner Styles */}
          <style jsx>{`
            .loader-container {
              width: 100% !important;
              min-width: 100rem;
              min-height: 30rem;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 5rem auto;
            }
            .loader {
              border: 5px solid #98b4de;
              border-top: 5px solid #293881;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
            @media (max-width: 768px) {
              .loader-container {
                min-width: 100%; /* Full width on smaller screens */
                min-width: 50rem;
                min-height: 30rem; /* Reduce height for mobile */
                padding: 2rem 0; /* Adjust padding */
              }

              .loader {
                width: 30px; /* Smaller loader size */
                height: 30px;
                border-width: 3px; /* Thinner border for smaller size */
              }
            }
            
            /* Navigation Styles */
            .buttons {
              display: flex;
              align-items: center;
              gap: 15px;
            }
            
            .category-slider-wrapper {
              position: relative;
              flex: 1;
            }
            
            .swiper-navigation {
              display: flex;
              gap: 15px !important;
              align-items: center;
            }
            
            .swiper-button-prev-custom,
            .swiper-button-next-custom {
              width: 100px !important;
              height: 100px !important;
              border: 2px solid #293881;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s ease;
              color: #293881;
            }
            
            .swiper-button-prev-custom:hover,
            .swiper-button-next-custom:hover {
              background: #293881;
              color: white;
              transform: scale(1.05);
            }
            
            .swiper-button-prev-custom:active,
            .swiper-button-next-custom:active {
              transform: scale(0.95);
            }
            
            @media (max-width: 768px) {
              .buttons {
                gap: 10px;
              }
              
              .swiper-navigation {
                gap: 5px;
              }
              
              .swiper-button-prev-custom,
              .swiper-button-next-custom {
                width: 35px;
                height: 35px;
                border-width: 1.5px;
              }
              
              .swiper-button-prev-custom svg,
              .swiper-button-next-custom svg {
                width: 16px;
                height: 16px;
              }
            }
          `}</style>
        </>
      ) : (
        <HomePageProductCard t={t} productData={filteredProducts} />
      )}
    </section>
  );
};

export default HomePageProducts;
// *son versiya