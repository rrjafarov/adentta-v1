// File: components/ProductsPageFilter.jsx
"use client";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import LoadMoreBTN from "./LoadMoreBTN";
import ApplyBTN from "./ApplyBTN";
import ReactSelect from "./ReactSelect";
import Manat from "../../public/icons/manat.svg";
import axiosInstance from "@/lib/axios"; 

// Accordion başlıq komponenti
const FilterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="accordion">
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <img
          src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
          alt="Toggle Icon"
          className="toggle-icon"
        />
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

// Kategoriya və marka ID-lərinə görə məhsulları gətirən ümumi funksiya
async function fetchProducts(categoryIds = [], brandIds = []) {
  const filters = [];

  if (categoryIds.length) {
    filters.push({
      key: "categories",
      operator: "IN",
      values: categoryIds,
    });
  }
  if (brandIds.length) {
    filters.push({
      key: "brands",
      operator: "IN",
      values: brandIds,
    });
  }

  const query = filters
    .map((f, idx) => {
      const base = `filters[${idx}][key]=${encodeURIComponent(
        f.key
      )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
      const vals = f.values
        .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
        .join("&");
      return `${base}&${vals}`;
    })
    .join("&");

  try {
    const res = await axiosInstance.get(`/page-data/product?${query}`, {
      cache: "no-store",
    });
    return res.data.data.data;
  } catch (err) {
    console.error("Filter fetch error", err);
    return [];
  }
}

export default function ProductsPageFilter({
  t,
  productData = [],
  categoryData = [],
  // brandsData = [],
  brandsDataFilter = [],
  categoryParam = null,
}) {
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState({
    value: "az",
    label: t?.from || "From A-Z",
  });
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");

  // İlk yükleme veya URL param değiştiğinde filtre uygula
  useEffect(() => {
    if (categoryParam) {
      const catId = parseInt(categoryParam, 10);
      const matched = categoryData.find((c) => c.id === catId);
      if (matched) {
        setIsLoading(true);
        fetchProducts([catId], [])
          .then((prods) => {
            setFilteredProducts(prods);
            setSelectedCategories([matched]);
          })
          .finally(() => setIsLoading(false));
      }
    } else {
      setFilteredProducts(productData);
      setSelectedCategories([]);
    }
  }, [categoryParam, categoryData, productData]);

  // Kategoriya seçimi / de-seçimi
  const handleCategoryToggle = async (category) => {
    const exists = selectedCategories.some((c) => c.id === category.id);
    const newCats = exists
      ? selectedCategories.filter((c) => c.id !== category.id)
      : [...selectedCategories, category];
    setSelectedCategories(newCats);

    setIsLoading(true);
    const catIds = newCats.map((c) => c.id);
    const brandIds = selectedBrands.map((b) => b.id);
    const prods =
      catIds.length || brandIds.length
        ? await fetchProducts(catIds, brandIds)
        : productData;
    setFilteredProducts(prods);
    setIsLoading(false);
  };

  // Marka seçimi / de-seçimi
  const handleBrandToggle = async (brand) => {
    const exists = selectedBrands.some((b) => b.id === brand.id);
    const newBrands = exists
      ? selectedBrands.filter((b) => b.id !== brand.id)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);

    setIsLoading(true);
    const catIds = selectedCategories.map((c) => c.id);
    const brandIds = newBrands.map((b) => b.id);
    const prods =
      catIds.length || brandIds.length
        ? await fetchProducts(catIds, brandIds)
        : productData;
    setFilteredProducts(prods);
    setIsLoading(false);
  };

  // Məhsulları sort etmək
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) =>
      sortOption.value === "az"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }, [filteredProducts, sortOption]);

  return (
    <div>
      <div className="container">
        {/* Başlıq */}
        <div className="filterTop topper">
          <Link href="/">
            <h1>Adentta</h1>
          </Link>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <h4>{t?.products || "Products"}</h4>
        </div>

        <div className="row">
          {/* Sidebar Filter */}
          <div className="xl-3 lg-3 md-3 sm-12">
            <div className="filter-container">
              <button
                className="filter-title"
                onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
              >
                {t?.productsPageFilterTitle || "Filter"}
              </button>

              {/* Seçilmiş kateqoriya və markalar - Desktop */}
              <div className="selectedFilter desktop-only">
                {selectedCategories.map((cat) => (
                  <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                    <span onClick={() => handleCategoryToggle(cat)}>×</span>
                    <p>{cat.title}</p>
                  </div>
                ))}
                {selectedBrands.map((brand) => (
                  <div
                    className="selectedFilterInner"
                    key={`brand-${brand.id}`}
                  >
                    <span onClick={() => handleBrandToggle(brand)}>×</span>
                    <p>{brand.title}</p>
                  </div>
                ))}
              </div>

              <div
                className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
              >
                <button className="filter-titless">
                  {t?.productsPageFilterTitle || "Filter"}
                </button>

                {/* Seçilmiş kateqoriya və markalar - Mobile */}
                <div className="selectedFilter mobile-only">
                  {selectedCategories.map((cat) => (
                    <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                      <span onClick={() => handleCategoryToggle(cat)}>×</span>
                      <p>{cat.title}</p>
                    </div>
                  ))}
                  {selectedBrands.map((brand) => (
                    <div
                      className="selectedFilterInner"
                      key={`brand-${brand.id}`}
                    >
                      <span onClick={() => handleBrandToggle(brand)}>×</span>
                      <p>{brand.title}</p>
                    </div>
                  ))}
                </div>

                <button
                  className="close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <img src="/icons/popupCloseIcon.svg" alt="close" />
                </button>

                <div className="lineFiltered"></div>

                {/* Seçilmiş filtreler - Desktop */}
                {/* <div className="selectedFilter desktop-only">
                {selectedCategories.map((cat) => (
                  <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                    <span onClick={() => handleCategoryToggle(cat)}>×</span>
                    <p>{cat.title}</p>
                  </div>
                ))}
                {selectedBrands.map((brand) => (
                  <div
                    className="selectedFilterInner"
                    key={`brand-${brand.id}`}
                  >
                    <span onClick={() => handleBrandToggle(brand)}>×</span>
                    <p>{brand.title}</p>
                  </div>
                ))}
              </div>
              <div
                className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
              >
                <button className="filter-titless">Filter</button>
                 */}

                {/* Category Accordion */}
                <FilterAccordion
                  title={t?.productsPageFilterCategoryTitle || "Category"}
                >
                  <ul>
                    {categoryData.map((cat) => {
                      const productCount = productData.filter((product) =>
                        product.categories?.some((c) => c.id === cat.id)
                      ).length;
                      return (
                        <li
                          key={cat.id}
                          onClick={() => handleCategoryToggle(cat)}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: selectedCategories.some(
                              (c) => c.id === cat.id
                            )
                              ? "bold"
                              : "normal",
                          }}
                        >
                          <span>{cat.title}</span>
                          <p>({productCount})</p>
                        </li>
                      );
                    })}
                  </ul>
                </FilterAccordion>

                {/* Brand Accordion */}
                <FilterAccordion
                  title={t?.productsPageFilterBrandsTitle || "Brands"}
                >
                  <div className="filteredSearch">
                    <img src="/icons/searchIcon.svg" alt="" />
                    <input
                      className="filterSrch"
                      type="text"
                      placeholder={t?.searchText || "Search..."}
                      value={brandSearchTerm}
                      onChange={(e) => setBrandSearchTerm(e.target.value)}
                    />
                  </div>
                  <ul>
                    {brandsDataFilter
                      // brandsData
                      .filter((brand) =>
                        brand.title
                          .toLowerCase()
                          .includes(brandSearchTerm.toLowerCase())
                      )
                      .map((brand) => (
                        <li
                          key={brand.id}
                          onClick={() => handleBrandToggle(brand)}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.some(
                              (b) => b.id === brand.id
                            )}
                            readOnly
                          />
                          <span>{brand.title}</span>
                        </li>
                      ))}
                  </ul>
                </FilterAccordion>

                {/* Mobile Apply Button */}
                <div
                  className="applyBTN flex items-center mt-4 justify-center"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <ApplyBTN t={t} />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="xl-9 lg-9 md-9 sm-12">
            <div className="productPageCards">
              <div className="productPageSorting">
                <span>{t?.sortBy || "Sort by"}</span>
                <ReactSelect
                  t={t}
                  value={sortOption}
                  onChange={setSortOption}
                />
              </div>

              <div className="row">
                {isLoading ? (
                  <div className="loader-container">
                    <div className="loader" />
                  </div>
                ) : (
                  sortedProducts.map((d) => (
                    <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
                      <Link
                        href={`/products/${d.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}-${d.id}`}
                        className="block"
                      >
                        <div className="homePageProductCardContent">
                          <div className="homePageProCardImgs">
                            <div className="homePageProductCardContentImage">
                              <img
                                src={`https://admin.adentta.az/storage${d.image}`}
                                alt={d.title}
                              />
                            </div>
                          </div>
                          <div className="homePageProductCardContentInner">
                            <div className="homePageProductCardContentText">
                              <span>{d.title}</span>
                            </div>
                            <div className="price">
                              <div className="priceItem">
                                <strong id="prices">{d.price}</strong>
                                <Manat />
                              </div>
                            </div>
                          </div>
                          <div className="homePageProductCardContentBottom">
                            <span>{t?.learnMore || "Learn More"}</span>

                            <img src="/icons/arrowTopRight.svg" alt="" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <LoadMoreBTN t={t} className="buttonNoneDesktop" />
            </div>

            {/* Page Description */}
          </div>
        </div>



        
        <div className="productsPageDescription">
          <h6>{t?.productsPageCeoDescription || "Ceo description - Addenta product category"}</h6>
          <p>
            {t?.productsPageDescriptionText || "Ceo Text"}
          </p>
          <div className="productsPageDescriptionLink">
            <Link href={"/"}>{t?.seeMoreBtn || "see more"}</Link>
            <img src="/icons/rightDown.svg" alt="" />
          </div>
        </div>
      </div>

      {/* Spinner Styles */}
      <style jsx>{`
        .loader-container {
          width: 100% !important;
          min-width: 97rem;
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
        /* Yeni əlavə: Accordion içərisində scroll əlavə etmək üçün */
        .accordion-content {
          max-height: 250px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
// * LAST VERSION
