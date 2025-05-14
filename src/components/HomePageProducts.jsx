// !SON VERSİYA
"use client";
import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import HomePageProductCard from "./Sliders/HomePageProductCard";

const HomePageProducts = ({ categoryData, productData, t }) => {
  // Yeni loading state əlavə edildi
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Kategori seçimi üçün gecikməni idarə edən funksiya
  const handleCategorySelect = (id) => {
    setLoading(true); // Loading göstəricini aktivləşdir
    setTimeout(() => {
      setSelectedCategory(id); // Yeni kateqoriyanı seç
      setLoading(false); // Loading göstəricini söndür
    }, 300); // 300ms gecikmə
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === null) return productData;
    return productData.filter((p) =>
      p.categories.some((c) => Number(c.id) === Number(selectedCategory))
    );
  }, [selectedCategory, productData]);

  return (
    <section id="homePageProducts">
      <div className="homePageProducts container">
        <span>{t?.homeProductsTitle || "Explore Our Products"}</span>

        <div className="buttons">
          {/* All butonu */}
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
              spaceBetween={10}
              slidesPerView="auto"
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: false }}
              className="category-slider"
            >
              {categoryData.map((category) => (
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
                        alt=""
                      />
                      <p>{category.title}</p>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* Loading göstəricisi və ya məhsul kartlarını render et */}
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
          `}</style>
        </>
      ) : (
        <HomePageProductCard t={t} productData={filteredProducts} />
      )}
    </section>
  );
};

export default HomePageProducts;
// !SON VERSİYA
