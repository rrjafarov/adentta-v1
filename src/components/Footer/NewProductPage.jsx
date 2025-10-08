// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";

// const FilterAccordion = ({ title, children }) => {
//  const [isOpen, setIsOpen] = useState(false);
//  return (
//    <div className="accordion">
//      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
//        {title}
//        <img
//          src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
//          alt="Toggle Icon"
//          className="toggle-icon"
//        />
//      </button>
//      {isOpen && <div className="accordion-content">{children}</div>}
//    </div>
//  );
// };

// const ProductsPageFilter = ({ productData }) => {
//  const [selectedOption, setSelectedOption] = useState(null);
//  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

//  return (
//    <div>
//      <div className="container">
//        <div className="filterTop topper">
//          <h1>Adentta</h1>
//          <img src="/icons/rightDown.svg" alt="Adentta" />
//          <h4>Products</h4>
//        </div>

//        <div className="row">
//          <div className="xl-3 lg-3 md-3 sm-12  ">
//            <div className="filter-container">
//              {/* Filtre butonu her zaman görünsün */}
//              <button
//                className="filter-title"
//                onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//              >
//                Filter
//              </button>

//              {/* Desktop için seçili filtreler (filter-title altında) */}
//              <div className="selectedFilter desktop-only">
//                <div className="selectedFilterInner">
//                  <span>x</span>
//                  <p>siemens</p>
//                </div>
//                <div className="selectedFilterInner">
//                  <span>x</span>
//                  <p>borsch</p>
//                </div>
//              </div>

//              {/* Filtre paneli: mobilde açıldığında tüm ekranı kaplar */}
//              <div
//                className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//              >
//                {/* Mobilde açılan menüde filter-titless başlığı altında olacak */}
//                <button className="filter-titless">Filter</button>

//                {/* Mobil için seçili filtreler (filter-titless altında) */}
//                <div className="selectedFilter mobile-only">
//                  <div className="selectedFilterInner">
//                    <span>x</span>
//                    <p>siemens</p>
//                  </div>
//                  <div className="selectedFilterInner">
//                    <span>x</span>
//                    <p>borsch</p>
//                  </div>
//                </div>

//                <button
//                  className="close-btn"
//                  onClick={() => setMobileFilterOpen(false)}
//                >
//                  <img src="/icons/popupCloseIcon.svg" alt="close" />
//                </button>
//                <div className="lineFiltered"></div>

//                <FilterAccordion title="Category">
//                  <ul>
//                    <li>
//                      X-ray Equipment<p>(22)</p>
//                    </li>
//                    <li>
//                      Medical Devices and Equipment <p>(54)</p>
//                    </li>
//                    <li>
//                      Dental Equipment <p>(23)</p>
//                    </li>
//                    <li>
//                      Surgical Equipment <p>(22)</p>
//                    </li>
//                    <li>
//                      Medical Devices and Equipment<p>(55)</p>
//                    </li>
//                    <li>
//                      Dental Equipment <p>(230)</p>
//                    </li>
//                    <li>
//                      Laser hair removal devices <p>(92)</p>
//                    </li>
//                  </ul>
//                </FilterAccordion>
//                <FilterAccordion title="By Area of Use">
//                  <ul>
//                    <li>
//                      <input type="checkbox" /> Hospital
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Clinics
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Dental Offices
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Laboratories
//                    </li>
//                    <li>
//                      <input type="checkbox" /> For home use
//                    </li>
//                  </ul>
//                </FilterAccordion>
//                <FilterAccordion title="Functions and Features">
//                  <ul>
//                    <li>
//                      <input type="checkbox" /> Portable / Stationary
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Digital / Mechanical
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Battery-powered /
//                      Electric-powered
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Automatic / Manual
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Portable / Stationary
//                    </li>
//                  </ul>
//                </FilterAccordion>
//                <FilterAccordion title="Brand">
//                  <div className="filteredSearch">
//                    <img src="icons/searchIcon.svg" alt="" />
//                    <input
//                      className="filterSrch"
//                      type="text"
//                      placeholder="Search..."
//                    />
//                  </div>
//                  <ul>
//                    <li>
//                      <input type="checkbox" /> Siemens
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Philips Healthcare
//                    </li>
//                    <li>
//                      <input type="checkbox" /> GE Healthcare
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Mindray
//                    </li>
//                    <li>
//                      <input type="checkbox" /> Boston Scientific
//                    </li>
//                  </ul>
//                </FilterAccordion>

//                <div className="applyBTN flex items-center mt-4 justify-center">
//                  <ApplyBTN />
//                </div>
//              </div>
//            </div>
//          </div>

//          <div className="xl-9 lg-9 md-9 sm-12">
//            <div className="productPageCards">
//              <div className="productPageSorting">
//                <span>Sort by</span>
//                <div>
//                  <ReactSelect />
//                </div>
//              </div>
//              <div className="row">
//                {productData.map((data) => (
//                  <div key={data.id} className="xl-4 lg-4 md-6 sm-6">
//                    <Link href={`/products/${data.id}`} className="block">
//                      <div className="homePageProductCardContent">
//                        <div className="homePageProCardImgs">
//                          <div className="homePageProductCardContentImage">
//                            <img
//                              src={`https://admin.addenta.az/storage${data.image}`}
//                              alt=""
//                            />
//                          </div>
//                        </div>
//                        <div className="homePageProductCardContentInner">
//                          <div className="homePageProductCardContentText">
//                            <span>{data.title}</span>
//                          </div>
//                          <div className="price">
//                            <div className="priceItem">
//                              <strong id="prices">{data.price}</strong>
//                              <Manat />
//                            </div>
//                          </div>
//                        </div>
//                        <div className="homePageProductCardContentBottom">
//                          <span>Learn More</span>
//                          <img src="/icons/arrowTopRight.svg" alt="" />
//                        </div>
//                      </div>
//                    </Link>
//                  </div>
//                ))}
//              </div>
//            </div>
//            <div className="flex items-center justify-center">
//              <LoadMoreBTN />
//            </div>
//          </div>
//        </div>

//        <div className="productsPageDescription">
//          <h6>Ceo description - Addenta product category</h6>
//          <p>
//            Lorem ipsum dolor sit amet consectetur. Risus aliquam non aliquet et
//            tempus. Venenatis neque mollis curabitur et faucibus posuere nisl
//            justo leo. Volutpat rhoncus et et a senectus adipiscing molestie sed
//            venenatis. Tellus volutpat magnis nulla leo faucibus elementum.
//          </p>
//          <div className="productsPageDescriptionLink">
//            <Link href={"/"}>seeMore</Link>
//            <img src="/icons/rightDown.svg" alt="" />
//          </div>
//        </div>
//      </div>
//    </div>
//  );
// };

// export default ProductsPageFilter;










"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadMoreBTN from "../LoadMoreBTN";
import ApplyBTN from "../ApplyBTN";
import ReactSelect from "../ReactSelect";
import Manat from "../../../public/icons/manat.svg";
import axiosInstance from "@/lib/axios";

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

// Normalizasiya funksiyası (IDs-i number edir, unique)
const normalizeIds = (arr = []) =>
  Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

const ProductsPageFilter = ({
  productData: initialProductData,
  t,
  brandsData,
  categoryData, // Əlavə prop: categoryData page.js-dən gəlir
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [productData, setProductData] = useState(initialProductData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]); // Yeni state: seçili kateqoriyalar
  const [brandSearchTerm, setBrandSearchTerm] = useState(""); // Brand search

  const router = useRouter();
  const searchParams = useSearchParams();

  // Refs for controlling behavior when URL/page changes
  const isLoadingMoreRef = useRef(false); // true when we initiated loadMore
  const prevParamsRef = useRef(searchParams.toString()); // previous search params string

  // URL-dən cari səhifəni götür (initially)
  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page));
    } else {
      setCurrentPage(1);
    }
    // initialize prevParamsRef
    prevParamsRef.current = searchParams.toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  const buildRawQuery = (params = {}) => {
    const parts = [];
    for (const [key, value] of Object.entries(params || {})) {
      if (Array.isArray(value)) {
        for (const v of value)
          parts.push(`${key}=${encodeURIComponent(String(v))}`);
      } else if (value !== undefined && value !== null && value !== "") {
        parts.push(`${key}=${encodeURIComponent(String(value))}`);
      }
    }
    return parts.join("&");
  };

  // Kateqoriya məhsul count funksiyası (dummy; realda backend-dən/productData-dan hesabla)
  const getProductCountForCategory = useCallback((categoryId) => {
    // Dummy: realda productData.filter(p => p.categories.includes(categoryId)).length
    return 0; // Placeholder
  }, [productData]);

  // Qruplaşdırılmış kateqoriyalar (useMemo ilə)
  const groupedCategories = useMemo(() => {
    const parentCategories = categoryData.filter((category) => !category.parent_id);
    return parentCategories.map((parentCategory) => {
      const children = categoryData.filter((sub) => {
        const parentRaw = sub.parent_id;
        if (!parentRaw) return false;
        let parents = [];
        if (Array.isArray(parentRaw)) parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
        else if (typeof parentRaw === "object" && parentRaw.id != null) parents = [parentRaw.id];
        else parents = [parentRaw];
        const numericParents = parents.map((p) => (typeof p === "number" ? p : parseInt(p, 10))).filter(Boolean);
        return numericParents.includes(parentCategory.id);
      });
      return { parent: parentCategory, children };
    });
  }, [categoryData]);

  // Kateqoriya toggle handler
  const handleCategoryToggleById = useCallback(
    (id) => {
      const numeric = Number(id);
      setSelectedCategoryIds((prev) => {
        const set = new Set(prev.map((v) => Number(v)));
        if (set.has(numeric)) set.delete(numeric);
        else set.add(numeric);
        const arr = normalizeIds(Array.from(set));
        // URL update (sadələşdirilmiş)
        const params = new URLSearchParams(searchParams);
        if (arr.length) params.set("categories", arr.join(","));
        else params.delete("categories");
        router.push(`/products?${params.toString()}`, { scroll: false });
        return arr;
      });
    },
    [router, searchParams]
  );

  // Seçili kateqoriyalar render (memoized)
  const renderSelectedCategories = useMemo(() => {
    return selectedCategoryIds.map((id) => {
      const cat = categoryData.find((c) => Number(c.id) === Number(id));
      return {
        id,
        title: cat ? cat.title : `Category ${id}`,
      };
    });
  }, [selectedCategoryIds, categoryData]);

  const fetchMoreProducts = async (page) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      isLoadingMoreRef.current = true; // indicate we are loading more by scroll

      // Mövcud search params-ları götür
      const params = {};
      searchParams.forEach((value, key) => {
        if (params[key] === undefined) {
          params[key] = value;
        } else if (Array.isArray(params[key])) {
          params[key].push(value);
        } else {
          params[key] = [params[key], value];
        }
      });

      // Yeni səhifə nömrəsini əlavə et
      params.page = page;
      params.per_page = 12;

      // Əgər filter parametrləri yoxdursa, default filter əlavə et
      if (!params["filters[0][key]"]) {
        params["filters[0][key]"] = "categories";
        params["filters[0][operator]"] = "IN";
        params["filters[0][value][]"] = "99";
      }

      const queryString = buildRawQuery(params);

      const { data } = await axiosInstance.get(
        `/page-data/product?${queryString}`,
        {
          headers: { Lang: "az" }, // və ya dinamik locale
          cache: "no-store",
        }
      );

      // Normalizasiya: müxtəlif backend strukturlarına uyğun çıxarırıq
      const newItems = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : Array.isArray(data?.items)
        ? data.items
        : [];

      // Əgər yeni məhsul yoxdursa, hasMore-u false et
      if (newItems.length === 0 || newItems.length < 12) {
        setHasMore(false);
      }

      // Yeni məhsulları mövcud məhsullara əlavə et
      if (newItems.length > 0) {
        setProductData((prevData) => {
          // Duplicate məhsulları yoxla
          const existingIds = new Set(prevData.map((item) => item.id));
          const uniqueNewItems = newItems.filter(
            (item) => !existingIds.has(item.id)
          );
          return [...prevData, ...uniqueNewItems];
        });

        // ------------------ DÜZƏLDİLMİŞ HISSƏ (router.push -> history.pushState) ------------------
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("page", page);
        const newSearch = newUrl.searchParams.toString();

        // Daha etibarlı: window.history ilə ünvanı dərhal dəyişirik
        if (typeof window !== "undefined" && window.history && window.history.pushState) {
          window.history.pushState({}, "", newUrl.pathname + "?" + newSearch);
        } else {
          // Fallback: router.push (əgər history mövcud deyilsə)
          router.push(newUrl.pathname + "?" + newSearch, { scroll: false });
        }

        // sync state & prevParams ref to avoid refetch-on-url-change bug
        setCurrentPage(page);
        prevParamsRef.current = newSearch;
        // ---------------------------------------------------------------------------------------
      }
    } catch (error) {
      console.error("fetchMoreProducts error:", error);
      isLoadingMoreRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll məntiqi
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    // Bottom-dan 200px qaldığında yeni məhsulları yüklə
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;

    if (scrolledToBottom) {
      fetchMoreProducts(currentPage + 1);
    }
  }, [loading, hasMore, currentPage]); // currentPage included

  // Scroll event listener əlavə et
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Manual load more funksiyası (button üçün)
  const handleLoadMore = () => {
    fetchMoreProducts(currentPage + 1);
  };

  // Helper: convert URLSearchParams -> plain object (arrays for duplicate keys)
  const parseSearchParamsToObj = (sp) => {
    const obj = {};
    sp.forEach((value, key) => {
      if (obj[key] === undefined) {
        obj[key] = value;
      } else if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    });
    return obj;
  };

  // Compare two param objects excluding 'page'
  const onlyPageChanged = (prevStr, nextStr) => {
    const prev = new URLSearchParams(prevStr || "");
    const next = new URLSearchParams(nextStr || "");
    // Build plain objects excluding page
    const prevObj = {};
    prev.forEach((v, k) => {
      if (k === "page") return;
      if (prevObj[k] === undefined) prevObj[k] = v;
      else if (Array.isArray(prevObj[k])) prevObj[k].push(v);
      else prevObj[k] = [prevObj[k], v];
    });
    const nextObj = {};
    next.forEach((v, k) => {
      if (k === "page") return;
      if (nextObj[k] === undefined) nextObj[k] = v;
      else if (Array.isArray(nextObj[k])) nextObj[k].push(v);
      else nextObj[k] = [nextObj[k], v];
    });
    // Simple deep-equality for these small objects
    const keysPrev = Object.keys(prevObj).sort();
    const keysNext = Object.keys(nextObj).sort();
    if (keysPrev.length !== keysNext.length) return false;
    for (let i = 0; i < keysPrev.length; i++) {
      const k = keysPrev[i];
      if (k !== keysNext[i]) return false;
      const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
      const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
      if (a.length !== b.length) return false;
      // compare values (order matters because searchParams order may matter for filters)
      for (let j = 0; j < a.length; j++) {
        if (String(a[j]) !== String(b[j])) return false;
      }
    }
    return true;
  };

  // --------- Yeni əlavə: searchParams dəyişdikdə tam re-fetch et (replace productData)
  // Amma əgər dəyişən yalnız 'page' və biz onu infinite-scroll ilə yaratmışıqsa -> fetch etmə (maintain appended data).
  useEffect(() => {
    const currentParamsStr = searchParams.toString();
    const prevParamsStr = prevParamsRef.current;

    const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

    // If only page changed and we initiated loading more, skip re-fetch (we already appended)
    if (pageChangedOnly && isLoadingMoreRef.current) {
      // update currentPage from URL but don't replace productData
      const page = parseInt(searchParams.get("page") || "1", 10);
      setCurrentPage(page);
      // reset the flag and prevParamsRef
      isLoadingMoreRef.current = false;
      prevParamsRef.current = currentParamsStr;
      return;
    }

    // Otherwise — do full load (replace productData)
    const loadProductsByParams = async () => {
      try {
        setLoading(true);

        const params = {};
        searchParams.forEach((value, key) => {
          if (params[key] === undefined) {
            params[key] = value;
          } else if (Array.isArray(params[key])) {
            params[key].push(value);
          } else {
            params[key] = [params[key], value];
          }
        });

        if (!params.per_page) params.per_page = 12;
        if (!params.page) params.page = 1;

        if (!params["filters[0][key]"]) {
          params["filters[0][key]"] = "categories";
          params["filters[0][operator]"] = "IN";
          params["filters[0][value][]"] = "99";
        }

        const queryString = buildRawQuery(params);

        const { data } = await axiosInstance.get(
          `/page-data/product?${queryString}`,
          {
            headers: { Lang: "az" },
            cache: "no-store",
          }
        );

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.data)
          ? data.data.data
          : Array.isArray(data?.items)
          ? data.items
          : [];

        // Replace mövcud productData ilə — UI dərhal yenilənəcək
        setProductData(items || []);
        setCurrentPage(parseInt(params.page || 1, 10) || 1);
        setHasMore((items?.length ?? 0) >= 12);

        // reset the loading-more flag because this is external refill
        isLoadingMoreRef.current = false;
      } catch (err) {
        console.error("loadProductsByParams error:", err);
      } finally {
        setLoading(false);
      }
    };

    // run load
    loadProductsByParams();

    // update prev params ref
    prevParamsRef.current = currentParamsStr;

  }, [searchParams.toString()]);
  // --------------------------------------------------------------------------------------------

  return (
    <div>
      <div className="container">
        <div className="filterTop topper">
          <h1>Adentta</h1>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <h4>{t?.products}</h4>
        </div>

        <div className="row">
          <div className="xl-3 lg-3 md-3 sm-12">
            <div className="filter-container">
              {/* Filtre butonu her zaman görünsün */}
              <button
                className="filter-title"
                onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
              >
                {t?.productsPageFilterTitle || "Filter"}
              </button>

              {/* Desktop için seçili filtreler (filter-title altında) */}
              <div className="selectedFilter desktop-only">
                {renderSelectedCategories.map((cat) => (
                  <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                    <span onClick={() => handleCategoryToggleById(cat.id)}>×</span>
                    <p>{cat.title}</p>
                  </div>
                ))}
              </div>

              {/* Filtre paneli: mobilde açıldığında tüm ekranı kaplar */}
              <div
                className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
              >
                {/* Mobilde açılan menüde filter-titless başlığı altında olacak */}
                <button className="filter-titless">{t?.productsPageFilterTitle || "Filter"}</button>

                {/* Mobil için seçili filtreler (filter-titless altında) */}
                <div className="selectedFilter mobile-only">
                  {renderSelectedCategories.map((cat) => (
                    <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                      <span onClick={() => handleCategoryToggleById(cat.id)}>×</span>
                      <p>{cat.title}</p>
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

                <FilterAccordion
                  title={t?.productsPageFilterCategoryTitle || "Category"}
                >
                  <ul style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
                    {groupedCategories.map(({ parent, children }) => {
                      const parentProductCount = getProductCountForCategory(parent.id);
                      const isParentSelected = selectedCategoryIds.some((c) => Number(c) === Number(parent.id));

                      return (
                        <React.Fragment key={parent.id}>
                          <li
                            onClick={() => handleCategoryToggleById(parent.id)}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              fontWeight: isParentSelected ? "bold" : "normal",
                              marginBottom: "4px",
                            }}
                          >
                            <span>{parent.title}</span>
                            <p>({parentProductCount})</p>
                          </li>

                          {children.map((child) => {
                            const childProductCount = getProductCountForCategory(child.id);
                            const isChildSelected = selectedCategoryIds.some((c) => Number(c) === Number(child.id));
                            return (
                              <li
                                key={child.id}
                                onClick={() => handleCategoryToggleById(child.id)}
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.3rem",
                                  fontWeight: isChildSelected ? "bold" : "normal",
                                  marginLeft: "15px",
                                  fontSize: "1.3rem",
                                  marginBottom: "8px",
                                  color: "#666",
                                }}
                              >
                                <span>{child.title}</span>
                                <p>({childProductCount})</p>
                              </li>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </ul>
                </FilterAccordion>

                <FilterAccordion title={t?.brands || "Brands"}>
                  <div className="filteredSearch">
                    {/* <img src="icons/searchIcon.svg" alt="search" /> */}
                    <input
                      className="filterSrch"
                      type="text"
                      placeholder={t?.searchText}
                      value={brandSearchTerm}
                      onChange={(e) => setBrandSearchTerm(e.target.value)}
                    />
                  </div>
                  <ul>
                    {(Array.isArray(brandsData)
                      ? brandsData
                      : Object.values(brandsData || {})
                    ).filter((brand) => brand.title.toLowerCase().includes(brandSearchTerm.toLowerCase()))
                      .map((brand) => (
                        <li key={brand?.id ?? brand?.title}>
                          <input type="checkbox" /> {brand?.title ?? "No title"}
                        </li>
                      ))}
                  </ul>
                </FilterAccordion>

                <div className="applyBTN flex items-center mt-4 justify-center">
                  <ApplyBTN />
                </div>
              </div>
            </div>
          </div>

          <div className="xl-9 lg-9 md-9 sm-12">
            <div className="productPageCards">
              <div className="productPageSorting">
                <span>{t?.sortBy}</span>
                <div>
                  <ReactSelect t={t} />
                </div>
              </div>
              <div className="row">
                {productData.map((data, index) => (
                  <div
                    key={`${data.id}-${index}`}
                    className="xl-4 lg-4 md-6 sm-6"
                  >
                    <Link
                      href={`/products/${data.title}-${data.id}`}
                      className="block"
                    >
                      <div className="homePageProductCardContent">
                        <div className="homePageProCardImgs">
                          <div className="homePageProductCardContentImage">
                            <img
                              src={`https://admin.adentta.az/storage${data.image}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="homePageProductCardContentInner">
                          <div className="homePageProductCardContentText">
                            <span>{data.title}</span>
                          </div>
                          <div className="price">
                            <div className="priceItem">
                              <strong id="prices">{data.price}</strong>
                              <Manat />
                            </div>
                          </div>
                        </div>
                        <div className="homePageProductCardContentBottom">
                          <span>{t?.learnMore}</span>
                          <img src="/icons/arrowTopRight.svg" alt="" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>


            <div className="flex items-center justify-center flex-col gap-4 py-8">
              {loading && (
                <div
                  className="loading-spinner"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "4px solid #f3f3f3",
                    borderTop: "4px solid #293881",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>

        <div className="productsPageDescription">
          <h1>
            {productData[0]?.categories?.[0]?.page_title ||
              "Page title is not aviable"}
          </h1>
          <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
            <div
              className="page-description-content"
              dangerouslySetInnerHTML={{
                __html:
                  productData[0]?.categories?.[0]?.page_description ||
                  "Page description is not available.",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ProductsPageFilter;





















// "use client";
// import Link from "next/link";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="accordion">
//       <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
//         {title}
//         <img
//           src={isOpen ? "/icons/minus.svg" : "/icons/plusIcon.svg"}
//           alt="Toggle Icon"
//           className="toggle-icon"
//         />
//       </button>
//       {isOpen && <div className="accordion-content">{children}</div>}
//     </div>
//   );
// };

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Refs for controlling behavior when URL/page changes
//   const isLoadingMoreRef = useRef(false); // true when we initiated loadMore
//   const prevParamsRef = useRef(searchParams.toString()); // previous search params string

//   // URL-dən cari səhifəni götür (initially)
//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) {
//       setCurrentPage(parseInt(page));
//     } else {
//       setCurrentPage(1);
//     }
//     // initialize prevParamsRef
//     prevParamsRef.current = searchParams.toString();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // only on mount

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value)
//           parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true; // indicate we are loading more by scroll

//       // Mövcud search params-ları götür
//       const params = {};
//       searchParams.forEach((value, key) => {
//         if (params[key] === undefined) {
//           params[key] = value;
//         } else if (Array.isArray(params[key])) {
//           params[key].push(value);
//         } else {
//           params[key] = [params[key], value];
//         }
//       });

//       // Yeni səhifə nömrəsini əlavə et
//       params.page = page;
//       params.per_page = 12;

//       // Əgər filter parametrləri yoxdursa, default filter əlavə et
//       if (!params["filters[0][key]"]) {
//         params["filters[0][key]"] = "categories";
//         params["filters[0][operator]"] = "IN";
//         params["filters[0][value][]"] = "99";
//       }

//       const queryString = buildRawQuery(params);

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" }, // və ya dinamik locale
//           cache: "no-store",
//         }
//       );

//       // Normalizasiya: müxtəlif backend strukturlarına uyğun çıxarırıq
//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       // Əgər yeni məhsul yoxdursa, hasMore-u false et
//       if (newItems.length === 0 || newItems.length < 12) {
//         setHasMore(false);
//       }

//       // Yeni məhsulları mövcud məhsullara əlavə et
//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           // Duplicate məhsulları yoxla
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         // ------------------ DÜZƏLDİLMİŞ HISSƏ (router.push -> history.pushState) ------------------
//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", page);
//         const newSearch = newUrl.searchParams.toString();

//         // Daha etibarlı: window.history ilə ünvanı dərhal dəyişirik
//         if (typeof window !== "undefined" && window.history && window.history.pushState) {
//           window.history.pushState({}, "", newUrl.pathname + "?" + newSearch);
//         } else {
//           // Fallback: router.push (əgər history mövcud deyilsə)
//           router.push(newUrl.pathname + "?" + newSearch, { scroll: false });
//         }

//         // sync state & prevParams ref to avoid refetch-on-url-change bug
//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//         // ---------------------------------------------------------------------------------------
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Infinite scroll məntiqi
//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;

//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;

//     // Bottom-dan 200px qaldığında yeni məhsulları yüklə
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;

//     if (scrolledToBottom) {
//       fetchMoreProducts(currentPage + 1);
//     }
//   }, [loading, hasMore, currentPage]); // currentPage included

//   // Scroll event listener əlavə et
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   // Manual load more funksiyası (button üçün)
//   const handleLoadMore = () => {
//     fetchMoreProducts(currentPage + 1);
//   };

//   // Helper: convert URLSearchParams -> plain object (arrays for duplicate keys)
//   const parseSearchParamsToObj = (sp) => {
//     const obj = {};
//     sp.forEach((value, key) => {
//       if (obj[key] === undefined) {
//         obj[key] = value;
//       } else if (Array.isArray(obj[key])) {
//         obj[key].push(value);
//       } else {
//         obj[key] = [obj[key], value];
//       }
//     });
//     return obj;
//   };

//   // Compare two param objects excluding 'page'
//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
//     // Build plain objects excluding page
//     const prevObj = {};
//     prev.forEach((v, k) => {
//       if (k === "page") return;
//       if (prevObj[k] === undefined) prevObj[k] = v;
//       else if (Array.isArray(prevObj[k])) prevObj[k].push(v);
//       else prevObj[k] = [prevObj[k], v];
//     });
//     const nextObj = {};
//     next.forEach((v, k) => {
//       if (k === "page") return;
//       if (nextObj[k] === undefined) nextObj[k] = v;
//       else if (Array.isArray(nextObj[k])) nextObj[k].push(v);
//       else nextObj[k] = [nextObj[k], v];
//     });
//     // Simple deep-equality for these small objects
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       // compare values (order matters because searchParams order may matter for filters)
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   // --------- Yeni əlavə: searchParams dəyişdikdə tam re-fetch et (replace productData)
//   // Amma əgər dəyişən yalnız 'page' və biz onu infinite-scroll ilə yaratmışıqsa -> fetch etmə (maintain appended data).
//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;

//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     // If only page changed and we initiated loading more, skip re-fetch (we already appended)
//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       // update currentPage from URL but don't replace productData
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       // reset the flag and prevParamsRef
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     // Otherwise — do full load (replace productData)
//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) {
//             params[key] = value;
//           } else if (Array.isArray(params[key])) {
//             params[key].push(value);
//           } else {
//             params[key] = [params[key], value];
//           }
//         });

//         if (!params.per_page) params.per_page = 12;
//         if (!params.page) params.page = 1;

//         if (!params["filters[0][key]"]) {
//           params["filters[0][key]"] = "categories";
//           params["filters[0][operator]"] = "IN";
//           params["filters[0][value][]"] = "99";
//         }

//         const queryString = buildRawQuery(params);

//         const { data } = await axiosInstance.get(
//           `/page-data/product?${queryString}`,
//           {
//             headers: { Lang: "az" },
//             cache: "no-store",
//           }
//         );

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.data)
//           ? data.data
//           : Array.isArray(data?.data?.data)
//           ? data.data.data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         // Replace mövcud productData ilə — UI dərhal yenilənəcək
//         setProductData(items || []);
//         setCurrentPage(parseInt(params.page || 1, 10) || 1);
//         setHasMore((items?.length ?? 0) >= 12);

//         // reset the loading-more flag because this is external refill
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // run load
//     loadProductsByParams();

//     // update prev params ref
//     prevParamsRef.current = currentParamsStr;

//   }, [searchParams.toString()]);
//   // --------------------------------------------------------------------------------------------

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products}</h4>
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               {/* Filtre butonu her zaman görünsün */}
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Desktop için seçili filtreler (filter-title altında) */}
//               <div className="selectedFilter desktop-only">
//                 <div className="selectedFilterInner">
//                   <span>x</span>
//                   <p>siemens</p>
//                 </div>
//                 <div className="selectedFilterInner">
//                   <span>x</span>
//                   <p>borsch</p>
//                 </div>
//               </div>

//               {/* Filtre paneli: mobilde açıldığında tüm ekranı kaplar */}
//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 {/* Mobilde açılan menüde filter-titless başlığı altında olacak */}
//                 <button className="filter-titless">{t?.productsPageFilterTitle || "Filter"}</button>

//                 {/* Mobil için seçili filtreler (filter-titless altında) */}
//                 <div className="selectedFilter mobile-only">
//                   <div className="selectedFilterInner">
//                     <span>x</span>
//                     <p>siemens</p>
//                   </div>
//                   <div className="selectedFilterInner">
//                     <span>x</span>
//                     <p>borsch</p>
//                   </div>
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>
//                 <div className="lineFiltered"></div>

//                 <FilterAccordion
//                   title={t?.productsPageFilterCategoryTitle || "Category"}
//                 >
//                   <ul>
//                     <li>
//                       X-ray Equipment<p>(22)</p>
//                     </li>
//                     <li>
//                       Medical Devices and Equipment <p>(54)</p>
//                     </li>
//                     <li>
//                       Dental Equipment <p>(23)</p>
//                     </li>
//                     <li>
//                       Surgical Equipment <p>(22)</p>
//                     </li>
//                     <li>
//                       Medical Devices and Equipment<p>(55)</p>
//                     </li>
//                     <li>
//                       Dental Equipment <p>(230)</p>
//                     </li>
//                     <li>
//                       Laser hair removal devices <p>(92)</p>
//                     </li>
//                   </ul>
//                 </FilterAccordion>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     {/* <img src="icons/searchIcon.svg" alt="search" /> */}
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     ).map((brand) => (
//                       <li key={brand?.id ?? brand?.title}>
//                         <input type="checkbox" /> {brand?.title ?? "No title"}
//                       </li>
//                     ))}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="applyBTN flex items-center mt-4 justify-center">
//                   <ApplyBTN />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   <ReactSelect t={t} />
//                 </div>
//               </div>
//               <div className="row">
//                 {productData.map((data, index) => (
//                   <div
//                     key={`${data.id}-${index}`}
//                     className="xl-4 lg-4 md-6 sm-6"
//                   >
//                     <Link
//                       href={`/products/${data.title}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={`https://admin.adentta.az/storage${data.image}`}
//                               alt=""
//                             />
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentInner">
//                           <div className="homePageProductCardContentText">
//                             <span>{data.title}</span>
//                           </div>
//                           <div className="price">
//                             <div className="priceItem">
//                               <strong id="prices">{data.price}</strong>
//                               <Manat />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentBottom">
//                           <span>{t?.learnMore}</span>
//                           <img src="/icons/arrowTopRight.svg" alt="" />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>


//             <div className="flex items-center justify-center flex-col gap-4 py-8">
//               {loading && (
//                 <div
//                   className="loading-spinner"
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     border: "4px solid #f3f3f3",
//                     borderTop: "4px solid #293881",
//                     borderRadius: "50%",
//                     animation: "spin 1s linear infinite",
//                   }}
//                 ></div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           <h1>
//             {productData[0]?.categories?.[0]?.page_title ||
//               "Page title is not aviable"}
//           </h1>
//           <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
//             <div
//               className="page-description-content"
//               dangerouslySetInnerHTML={{
//                 __html:
//                   productData[0]?.categories?.[0]?.page_description ||
//                   "Page description is not available.",
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;
