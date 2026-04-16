"use client";
import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import HomePageProductCard from "./Sliders/HomePageProductCard";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { HiOutlinePercentBadge } from "react-icons/hi2";

const HomePageProducts = ({ categoryData, t, whatsappNumber }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showOffers, setShowOffers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  React.useEffect(() => {
    fetchProducts(null);
  }, []);

  const getSubcategoryIds = (parentCategoryId) => {
    if (!Array.isArray(categoryData)) return [];

    return categoryData
      .filter((cat) => {
        if (Array.isArray(cat.parent_id) && cat.parent_id.length > 0) {
          return cat.parent_id.some(
            (parent) => Number(parent.id) === Number(parentCategoryId),
          );
        }
        return false;
      })
      .map((cat) => cat.id);
  };

  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      let allFilteredProducts = [];
      let page = 1;
      const perPage = 50;

      while (true) {
        let url = `/page-data/product?per_page=${perPage}&page=${page}`;
        let filterIndex = 0;

        if (categoryId !== null) {
          const subcategoryIds = getSubcategoryIds(categoryId);
          const ids = subcategoryIds.length > 0 ? subcategoryIds : [categoryId];

          if (ids.length > 0) {
            url += `&filters[${filterIndex}][key]=categories&filters[${filterIndex}][operator]=IN`;
            ids.forEach((id) => {
              url += `&filters[${filterIndex}][value][]=${id}`;
            });
            filterIndex++;
          }
        }

        url += `&filters[${filterIndex}][key]=is_homepage&filters[${filterIndex}][operator]=IN&filters[${filterIndex}][value]=yes`;

        const response = await axiosInstance.get(url, { cache: "no-store" });
        const newData = response.data?.data?.data || [];
        allFilteredProducts = [...allFilteredProducts, ...newData];

        if (newData.length < perPage) break;
        page++;
        if (page > 50) break;
      }

      const shuffledProducts = allFilteredProducts.sort(
        () => Math.random() - 0.5,
      );

      setProductData(shuffledProducts);
    } catch (error) {
      console.error("Product fetch error:", error);
      setProductData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setShowOffers(false); // offers-i sıfırla
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const displayedProducts = showOffers
    ? productData.filter(
        (p) =>
          p.price &&
          Number(p.price) > 0 &&
          p.old_price &&
          Number(p.old_price) > 0,
      )
    : productData;

  const parentCategories = useMemo(() => {
    if (!Array.isArray(categoryData)) return [];

    return categoryData.filter((cat) => {
      if (Number(cat.id) === 4382) return false;

      if (!("parent_id" in cat)) return true;
      const p = cat.parent_id;

      if (Array.isArray(p) && p.length === 0) return true;
      return false;
    });
  }, [categoryData]);

  const hasOffers = useMemo(() => {
    return productData.some(
      (p) =>
        p.price &&
        Number(p.price) > 0 &&
        p.old_price &&
        Number(p.old_price) > 0,
    );
  }, [productData]);

  return (
    <section id="homePageProducts">
      <div className="homePageProducts container">
        <h2>{t?.homeProductsTitle || "Explore Our Products"}</h2>

        <div className="buttons">
          <div
            className={`btn btn-1 ${
              selectedCategory === null && !showOffers ? "active" : ""
            }`}
          >
            <button onClick={() => handleCategorySelect(null)}>
              <p>{t?.allSelect || "All"}</p>
            </button>
          </div>

          {hasOffers && (
            <div className={`superOffers ${showOffers ? "active" : ""}`}>
              <button
                onClick={() => {
                  setShowOffers(true);
                  setSelectedCategory(null);
                  fetchProducts(null);
                }}
              >
                <span>{t?.superOffers}</span>{" "}
                <HiOutlinePercentBadge color="red" className="offersIcon" />
              </button>
            </div>
          )}

          {/* Super Offers Button */}
          {/* <div className={`superOffers ${showOffers ? "active" : ""}`}>
            <button
              onClick={() => {
                setShowOffers(true);
                setSelectedCategory(null);
                fetchProducts(null);
              }}
            >
              <span>{t?.superOffers}</span>{" "}
              <HiOutlinePercentBadge color="red" className="offersIcon" />
            </button>
          </div> */}

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
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              className="category-slider"
            >
              {parentCategories.map((category) => (
                <SwiperSlide key={category.id} className="swiper-slide">
                  <div
                    className={`btn btn-2 ${
                      Number(selectedCategory) === Number(category.id) &&
                      !showOffers
                        ? "active"
                        : ""
                    }`}
                  >
                    <button
                      onClick={() => handleCategorySelect(Number(category.id))}
                    >
                      <img
                        src={`https://admin.adentta.az/storage${category.icon}`}
                        alt={category.title || "category name"}
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
              <img src="/icons/bomLeft.svg" alt="left" />
            </button>
            <button className="swiper-button-next-custom">
              <img src="/icons/bomRight.svg" alt="right" />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <>
          <div className="loader-container">
            <div className="loader"></div>
          </div>
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
                min-width: 100%;
                min-width: 50rem;
                min-height: 30rem;
                padding: 2rem 0;
              }
              .loader {
                width: 30px;
                height: 30px;
                border-width: 3px;
              }
            }
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
            .btn.active button {
              border-width: 3px !important;
              border-color: #293881 !important;
              font-weight: 600;
            }
            /* Super Offers aktiv stili */
            .superOffers.active span {
              font-weight: 600;
              color: red;
            }
            .superOffers button {
              background: none;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 4px;
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
              .btn.active button {
                border-width: 2px !important;
              }
            }
          `}</style>
        </>
      ) : (
        <HomePageProductCard
          whatsappNumber={whatsappNumber}
          t={t}
          productData={displayedProducts}
        />
      )}
    </section>
  );
};

export default HomePageProducts;
