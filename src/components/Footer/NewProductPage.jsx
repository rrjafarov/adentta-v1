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

//! son versiya
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

// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
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

// // Normalizasiya funksiyası (IDs-i number edir, unique)
// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData, // Əlavə prop: categoryData page.js-dən gəlir
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]); // Yeni state: seçili kateqoriyalar
//   const [brandSearchTerm, setBrandSearchTerm] = useState(""); // Brand search

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

//   // Kateqoriya məhsul count funksiyası (dummy; realda backend-dən/productData-dan hesabla)
//   const getProductCountForCategory = useCallback(
//     (categoryId) => {
//       // Dummy: realda productData.filter(p => p.categories.includes(categoryId)).length
//       return 0; // Placeholder
//     },
//     [productData]
//   );

//   // Qruplaşdırılmış kateqoriyalar (useMemo ilə)
//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) => !category.parent_id
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // Kateqoriya toggle handler
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));
//         // URL update (sadələşdirilmiş)
//         const params = new URLSearchParams(searchParams);
//         if (arr.length) params.set("categories", arr.join(","));
//         else params.delete("categories");
//         router.push(`/products?${params.toString()}`, { scroll: false });
//         return arr;
//       });
//     },
//     [router, searchParams]
//   );

//   // Seçili kateqoriyalar render (memoized)
//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

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
//         if (
//           typeof window !== "undefined" &&
//           window.history &&
//           window.history.pushState
//         ) {
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
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleCategoryToggleById(cat.id)}>
//                       ×
//                     </span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Filtre paneli: mobilde açıldığında tüm ekranı kaplar */}
//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 {/* Mobilde açılan menüde filter-titless başlığı altında olacak */}
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 {/* Mobil için seçili filtreler (filter-titless altında) */}
//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleCategoryToggleById(cat.id)}>
//                         ×
//                       </span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
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
//                   <ul
//                     style={{
//                       maxHeight: "300px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {groupedCategories.map(({ parent, children }) => {
//                       const parentProductCount = getProductCountForCategory(
//                         parent.id
//                       );
//                       const isParentSelected = selectedCategoryIds.some(
//                         (c) => Number(c) === Number(parent.id)
//                       );

//                       return (
//                         <React.Fragment key={parent.id}>
//                           <li
//                             onClick={() => handleCategoryToggleById(parent.id)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.5rem",
//                               fontWeight: isParentSelected ? "bold" : "normal",
//                               marginBottom: "4px",
//                             }}
//                           >
//                             <span>{parent.title}</span>
//                             <p>({parentProductCount})</p>
//                           </li>

//                           {children.map((child) => {
//                             const childProductCount =
//                               getProductCountForCategory(child.id);
//                             const isChildSelected = selectedCategoryIds.some(
//                               (c) => Number(c) === Number(child.id)
//                             );
//                             return (
//                               <li
//                                 key={child.id}
//                                 onClick={() =>
//                                   handleCategoryToggleById(child.id)
//                                 }
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.3rem",
//                                   fontWeight: isChildSelected
//                                     ? "bold"
//                                     : "normal",
//                                   marginLeft: "15px",
//                                   fontSize: "1.3rem",
//                                   marginBottom: "8px",
//                                   color: "#666",
//                                 }}
//                               >
//                                 <span>{child.title}</span>
//                                 <p>({childProductCount})</p>
//                               </li>
//                             );
//                           })}
//                         </React.Fragment>
//                       );
//                     })}
//                   </ul>
//                 </FilterAccordion>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => (
//                         <li key={brand?.id ?? brand?.title}>
//                           <input type="checkbox" /> {brand?.title ?? "No title"}
//                         </li>
//                       ))}
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
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
//                               alt=""
//                             />
//                             {/* <img
//                               src={`https://admin.adentta.az/storage${data.image}`}
//                               alt=""
//                             /> */}
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















"use client";
import Link from "next/link";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadMoreBTN from "../LoadMoreBTN";
import ApplyBTN from "../ApplyBTN";
import ReactSelect from "../ReactSelect";
import Manat from "../../../public/icons/manat.svg";
import axiosInstance from "@/lib/axios";

const slugify = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getCategorySlug = (cat) =>
  cat?.url_slug ??
  cat?.slug ??
  cat?.url ??
  cat?.urlSlug ??
  slugify(cat?.title ?? "");

// --- SLUG helper ---
function readCategorySlug(categoryParam) {
  if (!categoryParam) return null;
  const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
  const cleaned = raw.split("?")[0].replace(/\/+$/, "");
  return cleaned || null;
}

// Bütün category slugs (URL)
function readAllCategorySlugsFromParams(params) {
  if (!params) return [];
  const list = params.getAll("category");
  return list.map((v) => String(v).split("?")[0].replace(/\/+$/, "")).filter(Boolean);
}

// Accordion həmişə açıq (toggle yoxdur)



const FilterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true); // ilkdə açıq

  return (
    <div className="accordion">
      <button
        className="accordion-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
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



// const FilterAccordion = ({ title, children }) => {
//   return (
//     <div className="accordion">
//       <button className="accordion-header">
//         {title}
//         <img src="/icons/minus.svg" alt="Toggle Icon" className="toggle-icon" />
//       </button>
//       <div className="accordion-content">{children}</div>
//     </div>
//   );
// };

const normalizeIds = (arr = []) =>
  Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

function normalizeParentIds(parentRaw) {
  if (!parentRaw) return [];
  if (Array.isArray(parentRaw)) {
    return parentRaw
      .map((p) => (typeof p === "object" && p !== null ? p.id : p))
      .map((v) => parseInt(v, 10))
      .filter((v) => Number.isFinite(v));
  }
  if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
    const n = parseInt(parentRaw.id, 10);
    return Number.isFinite(n) ? [n] : [];
  }
  const n = parseInt(parentRaw, 10);
  return Number.isFinite(n) ? [n] : [];
}

const ProductsPageFilter = ({
  productData: initialProductData,
  t,
  brandsData,
  categoryData,
  selectedCategory,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [productData, setProductData] = useState(initialProductData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);

  // Ümumi nəticə sayı (total)
  const [totalCount, setTotalCount] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  // search_text
  const searchText = (searchParams.get("search_text") || "").trim();

  const isLoadingMoreRef = useRef(false);
  const prevParamsRef = useRef(searchParams.toString());

  const collectDescendantCategoryIds = useCallback(
    (parentId) => {
      const pid = Number(parentId);
      if (!Number.isFinite(pid)) return [];
      const result = new Set();
      const stack = [pid];
      const seen = new Set();

      while (stack.length) {
        const current = stack.pop();
        if (seen.has(current)) continue;
        seen.add(current);

        for (const c of categoryData || []) {
          const parents = normalizeParentIds(c.parent_id);
          if (parents.includes(current)) {
            const cid = parseInt(c.id, 10);
            if (Number.isFinite(cid) && !result.has(cid)) {
              result.add(cid);
              stack.push(cid);
            }
          }
        }
      }

      return Array.from(result);
    },
    [categoryData]
  );

  useEffect(() => {
    if (selectedCategory?.id) {
      setSelectedCategoryIds([Number(selectedCategory.id)]);
    } else {
      setSelectedCategoryIds([]);
    }
  }, [selectedCategory?.id]);

  useEffect(() => {
    const brands = searchParams.getAll("brand").map((b) => parseInt(b, 10)).filter(Number.isFinite);
    setSelectedBrandIds(brands);
  }, [searchParams]);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) setCurrentPage(parseInt(page));
    else setCurrentPage(1);
    prevParamsRef.current = searchParams.toString();
  }, [searchParams]);

  const buildRawQuery = (params = {}) => {
    const parts = [];
    for (const [key, value] of Object.entries(params || {})) {
      if (Array.isArray(value)) {
        for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
      } else if (value !== undefined && value !== null && value !== "") {
        parts.push(`${key}=${encodeURIComponent(String(value))}`);
      }
    }
    return parts.join("&");
  };

  const getProductCountForCategory = useCallback(() => {
    return 0;
  }, [productData]);

  const groupedCategories = useMemo(() => {
    const parentCategories = categoryData.filter(
      (category) => !category.parent_id || (Array.isArray(category.parent_id) && category.parent_id.length === 0)
    );
    return parentCategories.map((parentCategory) => {
      const children = categoryData.filter((sub) => {
        const parentRaw = sub.parent_id;
        if (!parentRaw) return false;
        let parents = [];
        if (Array.isArray(parentRaw))
          parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
        else if (typeof parentRaw === "object" && parentRaw.id != null)
          parents = [parentRaw.id];
        else parents = [parentRaw];
        const numericParents = parents
          .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
          .filter(Boolean);
        return numericParents.includes(parentCategory.id);
      });
      return { parent: parentCategory, children };
    });
  }, [categoryData]);

  // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz
  const handleCategoryToggleById = useCallback(
    (id) => {
      const numeric = Number(id);
      setSelectedCategoryIds((prev) => {
        const set = new Set(prev.map((v) => Number(v)));
        if (set.has(numeric)) set.delete(numeric);
        else set.add(numeric);
        const arr = normalizeIds(Array.from(set));

        const params = new URLSearchParams(searchParams);
        params.delete("category");

        if (arr.length > 0) {
          arr.forEach((cid) => {
            const catObj = categoryData.find((c) => Number(c.id) === Number(cid));
            const slug = getCategorySlug(catObj || { title: catObj?.title });
            if (slug) params.append("category", slug);
          });
        }

        Array.from(params.keys()).forEach((k) => {
          if (/^filters?\[.*\]/.test(k)) params.delete(k);
        });

        const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
        const newSearch = params.toString();

        if (typeof window !== "undefined" && window.history?.pushState) {
          window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
        } else {
          router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
        }

        return arr;
      });
    },
    [router, searchParams, categoryData]
  );

  const handleRemoveCategory = useCallback(
    (id) => {
      handleCategoryToggleById(id);
    },
    [handleCategoryToggleById]
  );

  // BRAND toggle: URL-də brand=ID
  const handleBrandToggleById = useCallback(
    (brandId) => {
      const bid = Number(brandId);
      const params = new URLSearchParams(searchParams);
      const current = new Set(params.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite));

      if (current.has(bid)) current.delete(bid);
      else current.add(bid);

      params.delete("brand");
      Array.from(current).forEach((v) => params.append("brand", String(v)));

      Array.from(params.keys()).forEach((k) => {
        if (/^filters?\[.*\]/.test(k)) params.delete(k);
      });

      const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
      const newSearch = params.toString();

      if (typeof window !== "undefined" && window.history?.pushState) {
        window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
      } else {
        router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
      }
    },
    [router, searchParams]
  );

  const renderSelectedCategories = useMemo(() => {
    return selectedCategoryIds.map((id) => {
      const cat = categoryData.find((c) => Number(c.id) === Number(id));
      return {
        id,
        title: cat ? cat.title : `Category ${id}`,
      };
    });
  }, [selectedCategoryIds, categoryData]);

  const renderSelectedBrands = useMemo(() => {
    const list = Array.isArray(brandsData) ? brandsData : Object.values(brandsData || {});
    return selectedBrandIds.map((bid) => {
      const b = list.find((x) => Number(x?.id) === Number(bid));
      return { id: bid, title: b?.title ?? `Brand ${bid}` };
    });
  }, [selectedBrandIds, brandsData]);

  const singleSelectedParent = useMemo(() => {
    if (selectedCategoryIds.length !== 1) return null;
    const onlyId = Number(selectedCategoryIds[0]);
    const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
    if (!onlyCat) return null;
    const parents = normalizeParentIds(onlyCat.parent_id);
    return parents.length === 0 ? onlyCat : null;
  }, [selectedCategoryIds, categoryData]);

  const childrenOfSelectedParent = useMemo(() => {
    if (!singleSelectedParent) return [];
    const pid = Number(singleSelectedParent.id);
    return (categoryData || []).filter((c) =>
      normalizeParentIds(c.parent_id).includes(pid)
    );
  }, [singleSelectedParent, categoryData]);

  const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
    const urlSlugs = readAllCategorySlugsFromParams(searchParams);
    if (urlSlugs.length > 0) {
      const ids = urlSlugs
        .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
        .map((id) => Number(id))
        .filter(Number.isFinite);
      if (ids.length > 0) return ids;
    }
    if (selectedCategoryIds.length > 0) return selectedCategoryIds.map(Number);
    return [];
  }, [searchParams, categoryData, selectedCategoryIds]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // cavabdan TOTAL tap
  const extractTotal = (raw, items) => {
    if (!raw) return Array.isArray(items) ? items.length : 0;
    if (typeof raw?.data?.total === "number") return raw.data.total;
    if (typeof raw?.total === "number") return raw.total;
    if (typeof raw?.meta?.total === "number") return raw.meta.total;
    return Array.isArray(items) ? items.length : 0;
  };

  const fetchMoreProducts = async (page) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      isLoadingMoreRef.current = true;

      await delay(1000);

      const paramsObj = {};
      searchParams.forEach((value, key) => {
        if (paramsObj[key] === undefined) paramsObj[key] = value;
        else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
        else paramsObj[key] = [paramsObj[key], value];
      });

      const perPage = Number(paramsObj.per_page || 12);

      const baseIds = getBaseCategoryIdsFromUrlOrState();
      const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

      let queryString = "";

      if (baseIds.length > 0) {
        const expandedSet = new Set();
        baseIds.forEach((id) => {
          const nid = Number(id);
          if (Number.isFinite(nid)) {
            expandedSet.add(nid);
            collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
          }
        });

        queryString =
          `per_page=${encodeURIComponent(String(perPage))}` +
          `&filters[0][key]=categories&filters[0][operator]=IN`;
        Array.from(expandedSet).forEach((val) => {
          queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
        });
        queryString += `&page=${encodeURIComponent(String(page))}`;
      } else {
        queryString =
          `per_page=${encodeURIComponent(String(perPage))}` +
          `&page=${encodeURIComponent(String(page))}`;
      }

      if (brandIds.length > 0) {
        const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
        queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
        brandIds.forEach((bid) => {
          queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
        });
      }

      if (searchText) {
        queryString += `&search_text=${encodeURIComponent(searchText)}`;
      }

      const { data } = await axiosInstance.get(
        `/page-data/product?${queryString}`,
        {
          headers: { Lang: "az" },
          cache: "no-store",
        }
      );

      const newItems = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : Array.isArray(data?.items)
        ? data.items
        : [];

      setTotalCount((prev) => {
        const t = extractTotal(data, newItems);
        return typeof t === "number" ? t : prev;
      });

      if (newItems.length === 0 || newItems.length < perPage) {
        setHasMore(false);
      }

      if (newItems.length > 0) {
        setProductData((prevData) => {
          const existingIds = new Set(prevData.map((item) => item.id));
          const uniqueNewItems = newItems.filter(
            (item) => !existingIds.has(item.id)
          );
          return [...prevData, ...uniqueNewItems];
        });

        const newUrl = new URL(window.location);
        newUrl.searchParams.set("page", String(page));
        const newSearch = newUrl.searchParams.toString();
        if (typeof window !== "undefined" && window.history?.pushState) {
          window.history.pushState({}, "", newUrl.pathname + (newSearch ? "?" + newSearch : ""));
        }
        setCurrentPage(page);
        prevParamsRef.current = newSearch;
      }
    } catch (error) {
      console.error("fetchMoreProducts error:", error);
      isLoadingMoreRef.current = false;
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
    if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
  }, [loading, hasMore, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const onlyPageChanged = (prevStr, nextStr) => {
    const prev = new URLSearchParams(prevStr || "");
    const next = new URLSearchParams(nextStr || "");
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
    const keysPrev = Object.keys(prevObj).sort();
    const keysNext = Object.keys(nextObj).sort();
    if (keysPrev.length !== keysNext.length) return false;
    for (let i = 0; i < keysPrev.length; i++) {
      const k = keysPrev[i];
      if (k !== keysNext[i]) return false;
      const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
      const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
      if (a.length !== b.length) return false;
      for (let j = 0; j < a.length; j++) {
        if (String(a[j]) !== String(b[j])) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const currentParamsStr = searchParams.toString();
    const prevParamsStr = prevParamsRef.current;
    const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

    if (pageChangedOnly && isLoadingMoreRef.current) {
      const page = parseInt(searchParams.get("page") || "1", 10);
      setCurrentPage(page);
      isLoadingMoreRef.current = false;
      prevParamsRef.current = currentParamsStr;
      return;
    }

    const loadProductsByParams = async () => {
      try {
        setLoading(true);

        const params = {};
        searchParams.forEach((value, key) => {
          if (params[key] === undefined) params[key] = value;
          else if (Array.isArray(params[key])) params[key].push(value);
          else params[key] = [params[key], value];
        });

        const perPage = Number(params.per_page || 12);
        const page = Number(params.page || 1);

        const baseIds = getBaseCategoryIdsFromUrlOrState();
        const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

        let queryString = "";

        if (baseIds.length > 0) {
          const expandedSet = new Set();
          baseIds.forEach((id) => {
            const nid = Number(id);
            if (Number.isFinite(nid)) {
              expandedSet.add(nid);
              collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
            }
          });
          queryString =
            `per_page=${encodeURIComponent(String(perPage))}` +
            `&filters[0][key]=categories&filters[0][operator]=IN`;
          Array.from(expandedSet).forEach((val) => {
            queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
          });
          queryString += `&page=${encodeURIComponent(String(page))}`;
        } else {
          queryString =
            `per_page=${encodeURIComponent(String(perPage))}` +
            `&page=${encodeURIComponent(String(page))}`;
        }

        if (brandIds.length > 0) {
          const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
          queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
          brandIds.forEach((bid) => {
            queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
          });
        }

        if (searchText) {
          queryString += `&search_text=${encodeURIComponent(searchText)}`;
        }

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

        setProductData(items || []);

        setTotalCount(extractTotal(data, items));

        setCurrentPage(page || 1);
        setHasMore((items?.length ?? 0) >= perPage);
        isLoadingMoreRef.current = false;
      } catch (err) {
        console.error("loadProductsByParams error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProductsByParams();
    prevParamsRef.current = currentParamsStr;
  }, [
    searchParams.toString(),
    selectedCategoryIds,
    collectDescendantCategoryIds,
    getBaseCategoryIdsFromUrlOrState,
    searchText,
  ]);

  // SEO mənbə
  const sourceCategory = useMemo(() => {
    if (selectedCategory && (selectedCategory.page_title || selectedCategory.page_description || selectedCategory.meta_title || selectedCategory.meta_description)) {
      return selectedCategory;
    }
    return productData?.[0]?.categories?.[0] || null;
  }, [selectedCategory, productData]);

  // 🔹 SORT: A-Z və ya Z-A; default: dəyişmədən (placeholder görünsün deyə selectedOption null qala bilər)
  const sortedProductData = useMemo(() => {
    const list = [...(productData || [])];
    if (selectedOption?.value === "az") {
      return list.sort((a, b) => (a?.title || "").localeCompare(b?.title || ""));
    }
    if (selectedOption?.value === "za") {
      return list.sort((a, b) => (b?.title || "").localeCompare(a?.title || ""));
    }
    return list; // seçilməyibsə dəyişmə
  }, [productData, selectedOption]);

  return (
    <div>
      <div className="container">
        <div className="filterTop topper">
          <h1>Adentta</h1>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <h4>{t?.products}</h4>
        </div>

        {/* Axtarış nəticələri (ümumi TOTAL göstərilir) */}
        <div className="searchResultsProductCount">
          {searchText && (
            <div className="search-results-info">
              <p>
                {t?.searchResults || "results found for"} "{searchText}" ( {totalCount} )
              </p>
            </div>
          )}
        </div>

        <div className="row">
          <div className="xl-3 lg-3 md-3 sm-12">
            <div className="filter-container">
              <button
                className="filter-title"
                onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
              >
                {t?.productsPageFilterTitle || "Filter"}
              </button>

              {/* Selected */}
              <div className="selectedFilter desktop-only">
                {renderSelectedCategories.map((cat) => (
                  <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                    <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
                    <p>{cat.title}</p>
                  </div>
                ))}
                {renderSelectedBrands.map((br) => (
                  <div className="selectedFilterInner" key={`brand-${br.id}`}>
                    <span onClick={() => handleBrandToggleById(br.id)}>×</span>
                    <p>{br.title}</p>
                  </div>
                ))}
              </div>

              <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
                <button className="filter-titless">
                  {t?.productsPageFilterTitle || "Filter"}
                </button>

                <div className="selectedFilter mobile-only">
                  {renderSelectedCategories.map((cat) => (
                    <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                      <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
                      <p>{cat.title}</p>
                    </div>
                  ))}
                  {renderSelectedBrands.map((br) => (
                    <div className="selectedFilterInner" key={`brand-${br.id}`}>
                      <span onClick={() => handleBrandToggleById(br.id)}>×</span>
                      <p>{br.title}</p>
                    </div>
                  ))}
                </div>

                <button className="close-btn" onClick={() => setMobileFilterOpen(false)}>
                  <img src="/icons/popupCloseIcon.svg" alt="close" />
                </button>

                <div className="lineFiltered"></div>

                {/* Category (həmişə açıq) */}
                <FilterAccordion
                  title={
                    singleSelectedParent
                      ? singleSelectedParent.title
                      : (t?.productsPageFilterCategoryTitle || "Category")
                  }
                >
                  <ul
                    // style={{
                    //   maxHeight: "300px",
                    //   overflowY: "auto",
                    //   paddingRight: "4px",
                    // }}
                  >
                    {singleSelectedParent ? (
                      childrenOfSelectedParent.map((child) => {
                        const childProductCount = getProductCountForCategory(child.id);
                        const isChildSelected = selectedCategoryIds.some(
                          (c) => Number(c) === Number(child.id)
                        );
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
                              marginLeft: "0px",
                              fontSize: "1.4rem",
                              color: "#666",
                            }}
                          >
                            <span>{child.title}</span>
                            <p>({childProductCount})</p>
                          </li>
                        );
                      })
                    ) : (
                      groupedCategories.map(({ parent, children }) => {
                        const parentProductCount = getProductCountForCategory(parent.id);
                        const isParentSelected = selectedCategoryIds.some(
                          (c) => Number(c) === Number(parent.id)
                        );
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
                              const isChildSelected = selectedCategoryIds.some(
                                (c) => Number(c) === Number(child.id)
                              );
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
                                    marginLeft: "1.5rem",
                                    fontSize: "1.5rem",
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
                      })
                    )}
                  </ul>
                </FilterAccordion>

                <div className="lineFiltered"></div>


                {/* Brands (həmişə açıq) */}
                <FilterAccordion title={t?.brands || "Brands"}>
                  <div className="filteredSearch">
                    <img src="icons/searchIcon.svg" alt="search" />
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
                    )
                      .filter((brand) =>
                        brand.title
                          .toLowerCase()
                          .includes(brandSearchTerm.toLowerCase())
                      )
                      .map((brand) => {
                        const checked = selectedBrandIds.includes(Number(brand?.id));
                        return (
                          <li key={brand?.id ?? brand?.title}>
                            <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleBrandToggleById(brand?.id)}
                              />
                              {brand?.title ?? "No title"}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </FilterAccordion>

                <div className="lineFiltered"></div>

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
                  {/* 🔹 Sort: ReactSelect-a value/onChange verdik */}
                  <ReactSelect t={t} value={selectedOption} onChange={setSelectedOption} />
                </div>
              </div>
              <div className="row">
                {/* 🔹 Siyahı sortdan sonra render olunur */}
                {sortedProductData.map((data, index) => (
                  <div
                    key={`${data.id}-${index}`}
                    className="xl-4 lg-4 md-6 sm-6"
                  >
                    <Link
                      href={`/products/${(data.title || "")
                        .toLowerCase()
                        .replace(/\s+/g, "-")}-${data.id}`}
                      className="block"
                    >
                      <div className="homePageProductCardContent">
                        <div className="homePageProCardImgs">
                          <div className="homePageProductCardContentImage">
                            <img
                              src={
                                data?.image
                                  ? `https://admin.adentta.az/storage${data.image}`
                                  : "/images/adenttaDefaultImg.svg"
                              }
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
          {(sourceCategory?.page_title || sourceCategory?.page_description) && (
            <>
              <h1>
                {sourceCategory?.page_title || "Page title is not available"}
              </h1>

              {showDetails && (
                <div
                  className="productsPageDetailsCEO"
                  style={{ marginTop: "2rem" }}
                >
                  <div
                    className="page-description-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        sourceCategory?.page_description ||
                        "Page description is not available.",
                    }}
                  />
                </div>
              )}

              <div
                className="productsPageDescriptionLink"
                style={{ marginTop: "1rem" }}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDetails((prev) => !prev);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {showDetails
                    ? t?.hideDetailsBtn || "Hide"
                    : t?.seeMoreBtn || "See more"}
                  <img
                    src="/icons/rightDown.svg"
                    alt=""
                    style={{
                      marginLeft: "0.25rem",
                      transform: showDetails ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductsPageFilter;
























// *   her sey isleyir SORT islemir ve mehsul sayi 
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// // --- SLUG helper ---
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

// // Bütün category slugs (URL)
// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list.map((v) => String(v).split("?")[0].replace(/\/+$/, "")).filter(Boolean);
// }

// // ✅ Accordion həmişə açıq (toggle yoxdur)
// const FilterAccordion = ({ title, children }) => {
//   return (
//     <div className="accordion">
//       <button className="accordion-header">
//         {title}
//         <img src="/icons/minus.svg" alt="Toggle Icon" className="toggle-icon" />
//       </button>
//       <div className="accordion-content">{children}</div>
//     </div>
//   );
// };

// const normalizeIds = (arr = []) =>
//   Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);

//   // ✅ Ümumi nəticə sayı (total)
//   const [totalCount, setTotalCount] = useState(0);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // NEW: search_text
//   const searchText = (searchParams.get("search_text") || "").trim();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       setSelectedCategoryIds([]);
//     }
//   }, [selectedCategory?.id]);

//   useEffect(() => {
//     const brands = searchParams.getAll("brand").map((b) => parseInt(b, 10)).filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const getProductCountForCategory = useCallback(() => {
//     return 0;
//   }, [productData]);

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) => !category.parent_id || (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);
//         params.delete("category");

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = categoryData.find((c) => Number(c.id) === Number(cid));
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
//         const newSearch = params.toString();

//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
//         } else {
//           router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
//         }

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   // BRAND toggle: URL-də brand=ID
//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       const params = new URLSearchParams(searchParams);
//       const current = new Set(params.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite));

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
//       const newSearch = params.toString();

//       if (typeof window !== "undefined" && window.history?.pushState) {
//         window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
//       } else {
//         router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
//       }
//     },
//     [router, searchParams]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   const renderSelectedBrands = useMemo(() => {
//     const list = Array.isArray(brandsData) ? brandsData : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === onlyId);
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null;
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
//         .map((id) => Number(id))
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     if (selectedCategoryIds.length > 0) return selectedCategoryIds.map(Number);
//     return [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   // Helper: cavabdan TOTAL tap
//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;
//     if (typeof raw?.data?.total === "number") return raw.data.total;
//     if (typeof raw?.total === "number") return raw.total;
//     if (typeof raw?.meta?.total === "number") return raw.meta.total;
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       await delay(1000);

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);

//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//       let queryString = "";

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//           }
//         });

//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&page=${encodeURIComponent(String(page))}`;
//       }

//       if (brandIds.length > 0) {
//         const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//         queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//         brandIds.forEach((bid) => {
//           queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//         });
//       }

//       if (searchText) {
//         queryString += `&search_text=${encodeURIComponent(searchText)}`;
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       // ✅ TOTAL-i saxla (ümumi nəticə sayı)
//       setTotalCount((prev) => {
//         const t = extractTotal(data, newItems);
//         return typeof t === "number" ? t : prev;
//       });

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", String(page));
//         const newSearch = newUrl.searchParams.toString();
//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState({}, "", newUrl.pathname + (newSearch ? "?" + newSearch : ""));
//         }
//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
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
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         const baseIds = getBaseCategoryIdsFromUrlOrState();
//         const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//         let queryString = "";

//         if (baseIds.length > 0) {
//           const expandedSet = new Set();
//           baseIds.forEach((id) => {
//             const nid = Number(id);
//             if (Number.isFinite(nid)) {
//               expandedSet.add(nid);
//               collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//             }
//           });
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expandedSet).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&page=${encodeURIComponent(String(page))}`;
//         }

//         if (brandIds.length > 0) {
//           const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//           queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//           brandIds.forEach((bid) => {
//             queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//           });
//         }

//         if (searchText) {
//           queryString += `&search_text=${encodeURIComponent(searchText)}`;
//         }

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

//         setProductData(items || []);

//         // ✅ TOTAL-i ilk yükləmədə də saxla
//         setTotalCount(extractTotal(data, items));

//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdsFromUrlOrState,
//     searchText,
//   ]);

//   // ---------- SEO mənbə ----------
//   const sourceCategory = useMemo(() => {
//     if (selectedCategory && (selectedCategory.page_title || selectedCategory.page_description || selectedCategory.meta_title || selectedCategory.meta_description)) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products}</h4>
//         </div>

//         {/* ✅ Axtarış nəticələri (ümumi TOTAL göstərilir) */}
//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ( {totalCount} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Selected */}
//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {renderSelectedBrands.map((br) => (
//                   <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                     <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                     <p>{br.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {renderSelectedBrands.map((br) => (
//                     <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                       <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                       <p>{br.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button className="close-btn" onClick={() => setMobileFilterOpen(false)}>
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>
//                 <div className="lineFiltered"></div>

//                 {/* ✅ Category (həmişə açıq) */}
//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : (t?.productsPageFilterCategoryTitle || "Category")
//                   }
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "300px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {singleSelectedParent ? (
//                       childrenOfSelectedParent.map((child) => {
//                         const childProductCount = getProductCountForCategory(child.id);
//                         const isChildSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(child.id)
//                         );
//                         return (
//                           <li
//                             key={child.id}
//                             onClick={() => handleCategoryToggleById(child.id)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                               fontWeight: isChildSelected ? "bold" : "normal",
//                               marginLeft: "0px",
//                               fontSize: "1.3rem",
//                               marginBottom: "8px",
//                               color: "#666",
//                             }}
//                           >
//                             <span>{child.title}</span>
//                             <p>({childProductCount})</p>
//                           </li>
//                         );
//                       })
//                     ) : (
//                       groupedCategories.map(({ parent, children }) => {
//                         const parentProductCount = getProductCountForCategory(parent.id);
//                         const isParentSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(parent.id)
//                         );
//                         return (
//                           <React.Fragment key={parent.id}>
//                             <li
//                               onClick={() => handleCategoryToggleById(parent.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 fontWeight: isParentSelected ? "bold" : "normal",
//                                 marginBottom: "4px",
//                               }}
//                             >
//                               <span>{parent.title}</span>
//                               <p>({parentProductCount})</p>
//                             </li>

//                             {children.map((child) => {
//                               const childProductCount = getProductCountForCategory(child.id);
//                               const isChildSelected = selectedCategoryIds.some(
//                                 (c) => Number(c) === Number(child.id)
//                               );
//                               return (
//                                 <li
//                                   key={child.id}
//                                   onClick={() => handleCategoryToggleById(child.id)}
//                                   style={{
//                                     cursor: "pointer",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "0.3rem",
//                                     fontWeight: isChildSelected ? "bold" : "normal",
//                                     marginLeft: "1.5rem",
//                                     fontSize: "1.5rem",
//                                     marginBottom: "8px",
//                                     color: "#666",
//                                   }}
//                                 >
//                                   <span>{child.title}</span>
//                                   <p>({childProductCount})</p>
//                                 </li>
//                               );
//                             })}
//                           </React.Fragment>
//                         );
//                       })
//                     )}
//                   </ul>
//                 </FilterAccordion>

//                 {/* ✅ Brands (həmişə açıq) */}
//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const checked = selectedBrandIds.includes(Number(brand?.id));
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() => handleBrandToggleById(brand?.id)}
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
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
//                       href={`/products/${(data.title || "")
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
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
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h1>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h1>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;






































































































// * EN OPTIMAL KODDUR SEARCH ISLEYIR (12-12 GELIR)
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// // --- SLUG helper: Heç nəyi atma, olduğu kimi oxu (sementler-4 kimi) ---
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

// // Bütün category slugs topla (URL-də təkrarlı category=...)
// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list.map((v) => String(v).split("?")[0].replace(/\/+$/, "")).filter(Boolean);
// }

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
//       {isOpen && <div className="accordion-content">{children}</div>
//       }
//     </div>
//   );
// };

// const normalizeIds = (arr = []) =>
//   Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// // ---- HELPERS: parent/child əlaqəsi ----
// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // NEW: search text (URL-dən oxu)
//   const searchText = (searchParams.get("search_text") || "").trim();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   // Törəmələri toplamaq (rekursiv) — yalnız ALT-lar
//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   // selectedCategory gəldikdə seçimi resetlə (yalnız onu yaz)
//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       setSelectedCategoryIds([]);
//     }
//   }, [selectedCategory?.id]);

//   // URL-dən brand seçimini oxu → state
//   useEffect(() => {
//     const brands = searchParams.getAll("brand").map((b) => parseInt(b, 10)).filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const getProductCountForCategory = useCallback(() => {
//     return 0;
//   }, [productData]);

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) => !category.parent_id || (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz (slug-id deyil)
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);

//         // mövcud bütün category paramlarını sil
//         params.delete("category");

//         if (arr.length > 0) {
//           // hər seçilən id üçün slug tap və təkrarlı category=slug əlavə et
//           arr.forEach((cid) => {
//             const catObj = categoryData.find((c) => Number(c.id) === Number(cid));
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         // filters... qrupundan heç nə istifadə etmirik
//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
//         const newSearch = params.toString();

//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
//         } else {
//           router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
//         }

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   // BRAND toggle: URL-də brand=ID (təkrarlı)
//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       const params = new URLSearchParams(searchParams);
//       const current = new Set(params.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite));

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       // filters.. sildiyimizə əmin olaq
//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
//       const newSearch = params.toString();

//       if (typeof window !== "undefined" && window.history?.pushState) {
//         window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
//       } else {
//         router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
//       }
//     },
//     [router, searchParams]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   // ✅ Seçilmiş brendləri çiplərə çevir
//   const renderSelectedBrands = useMemo(() => {
//     const list = Array.isArray(brandsData) ? brandsData : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   // Yalnız ÜST kateqoriya seçiləndə title və iç məzmunu dəyiş
//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === onlyId);
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null; // parentdırsa qaytar
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   // SLUG → ID (URL və ya selectedCategoryIds əsasında) — EXACT match
//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
//         .map((id) => Number(id))
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     if (selectedCategoryIds.length > 0) return selectedCategoryIds.map(Number);
//     return [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   // gecikmə helperi (1s)
//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       // 1 saniyə gecikmə
//       await delay(1000);

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);

//       // URL-dən bütün kateqoriyaları oxu, id + descendants genişləndir
//       const baseIds = getBaseCategoryIdsFromUrlOrState();

//       // URL-dən bütün brand-ları oxu
//       const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//       let queryString = "";

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//           }
//         });

//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         // Kateqoriya seçilməyibsə
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&page=${encodeURIComponent(String(page))}`;
//       }

//       if (brandIds.length > 0) {
//         const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//         queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//         brandIds.forEach((bid) => {
//           queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//         });
//       }

//       // ✅ Axtarış mətnini də API-yə ötür
//       if (searchText) {
//         queryString += `&search_text=${encodeURIComponent(searchText)}`;
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         // page paramını URL-ə yazırıq
//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", String(page));
//         const newSearch = newUrl.searchParams.toString();
//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState({}, "", newUrl.pathname + (newSearch ? "?" + newSearch : ""));
//         }
//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//        const next = new URLSearchParams(nextStr || "");
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
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         // URL-dən bütün category slugs oxu → id + descendants
//         const baseIds = getBaseCategoryIdsFromUrlOrState();

//         // URL-dən brand-lar
//         const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//         let queryString = "";

//         if (baseIds.length > 0) {
//           // ✅ ÜST + ALT kateqoriyalar
//           const expandedSet = new Set();
//           baseIds.forEach((id) => {
//             const nid = Number(id);
//             if (Number.isFinite(nid)) {
//               expandedSet.add(nid);
//               collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//             }
//           });
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expandedSet).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           // Kateqoriya seçilməyibsə
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&page=${encodeURIComponent(String(page))}`;
//         }

//         if (brandIds.length > 0) {
//           const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//           queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//           brandIds.forEach((bid) => {
//             queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//           });
//         }

//         // ✅ Axtarış mətnini də API-yə ötür
//         if (searchText) {
//           queryString += `&search_text=${encodeURIComponent(searchText)}`;
//         }

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

//         setProductData(items || []);
//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdsFromUrlOrState,
//     searchText, // ✅ search_text dəyişəndə də yenilə
//   ]);

//   // ---------- SEO mətni üçün mənbə ----------
//   const sourceCategory = useMemo(() => {
//     if (selectedCategory && (selectedCategory.page_title || selectedCategory.page_description || selectedCategory.meta_title || selectedCategory.meta_description)) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products}</h4>
//         </div>

//         {/* ✅ Axtarış nəticələri bloku */}
//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ( {productData.length} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* ✅ Selected filters — Kategoriya + Brand çipləri */}
//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {renderSelectedBrands.map((br) => (
//                   <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                     <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                     <p>{br.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {renderSelectedBrands.map((br) => (
//                     <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                       <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                       <p>{br.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button className="close-btn" onClick={() => setMobileFilterOpen(false)}>
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>
//                 <div className="lineFiltered"></div>

//                 {/* ✅ Category accordion — parent seçiləndə başlıq parent olur, içi yalnız alt kateqoriyalar */}
//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : (t?.productsPageFilterCategoryTitle || "Category")
//                   }
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "300px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {singleSelectedParent ? (
//                       // Yalnız SEÇİLMİŞ ÜST KATEQORİYANIN ALT KATEQORİYALARI (UI)
//                       childrenOfSelectedParent.map((child) => {
//                         const childProductCount = getProductCountForCategory(child.id);
//                         const isChildSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(child.id)
//                         );
//                         return (
//                           <li
//                             key={child.id}
//                             onClick={() => handleCategoryToggleById(child.id)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                               fontWeight: isChildSelected ? "bold" : "normal",
//                               marginLeft: "0px",
//                               fontSize: "1.3rem",
//                               marginBottom: "8px",
//                               color: "#666",
//                             }}
//                           >
//                             <span>{child.title}</span>
//                             <p>({childProductCount})</p>
//                           </li>
//                         );
//                       })
//                     ) : (
//                       // Default: bütün parentlər və onların child-ları
//                       groupedCategories.map(({ parent, children }) => {
//                         const parentProductCount = getProductCountForCategory(parent.id);
//                         const isParentSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(parent.id)
//                         );
//                         return (
//                           <React.Fragment key={parent.id}>
//                             <li
//                               onClick={() => handleCategoryToggleById(parent.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 fontWeight: isParentSelected ? "bold" : "normal",
//                                 marginBottom: "4px",
//                               }}
//                             >
//                               <span>{parent.title}</span>
//                               <p>({parentProductCount})</p>
//                             </li>

//                             {children.map((child) => {
//                               const childProductCount = getProductCountForCategory(child.id);
//                               const isChildSelected = selectedCategoryIds.some(
//                                 (c) => Number(c) === Number(child.id)
//                               );
//                               return (
//                                 <li
//                                   key={child.id}
//                                   onClick={() => handleCategoryToggleById(child.id)}
//                                   style={{
//                                     cursor: "pointer",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "0.3rem",
//                                     fontWeight: isChildSelected ? "bold" : "normal",
//                                     marginLeft: "15px",
//                                     fontSize: "1.3rem",
//                                     marginBottom: "8px",
//                                     color: "#666",
//                                   }}
//                                 >
//                                   <span>{child.title}</span>
//                                   <p>({childProductCount})</p>
//                                 </li>
//                               );
//                             })}
//                           </React.Fragment>
//                         );
//                       })
//                     )}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Brands */}
//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const checked = selectedBrandIds.includes(Number(brand?.id));
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() => handleBrandToggleById(brand?.id)}
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
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
//                       href={`/products/${(data.title || "")
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
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
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h1>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h1>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;




















// !  BURDA SEARCH ISLEMIR    !!!!! AMMA ZOR KODDU BUR 05.11.25
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// // --- SLUG helper: Heç nəyi atma, olduğu kimi oxu (sementler-4 kimi) ---
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

// // Bütün category slugs topla (URL-də təkrarlı category=...)
// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list.map((v) => String(v).split("?")[0].replace(/\/+$/, "")).filter(Boolean);
// }

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

// const normalizeIds = (arr = []) =>
//   Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// // ---- HELPERS: parent/child əlaqəsi ----
// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   // Törəmələri toplamaq (rekursiv) — yalnız ALT-lar
//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   // selectedCategory gəldikdə seçimi resetlə (yalnız onu yaz)
//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       setSelectedCategoryIds([]);
//     }
//   }, [selectedCategory?.id]);

//   // URL-dən brand seçimini oxu → state
//   useEffect(() => {
//     const brands = searchParams.getAll("brand").map((b) => parseInt(b, 10)).filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const getProductCountForCategory = useCallback(() => {
//     // Lokal sayım sonradan ehtiyac olsa qurular
//     return 0;
//   }, [productData]);

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) => !category.parent_id || (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz (slug-id deyil)
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);

//         // mövcud bütün category paramlarını sil
//         params.delete("category");

//         if (arr.length > 0) {
//           // hər seçilən id üçün slug tap və təkrarlı category=slug əlavə et
//           arr.forEach((cid) => {
//             const catObj = categoryData.find((c) => Number(c.id) === Number(cid));
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         // filters... qrupundan heç nə istifadə etmirik
//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
//         const newSearch = params.toString();

//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
//         } else {
//           router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
//         }

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   // BRAND toggle: URL-də brand=ID (təkrarlı) + seçilmişlərdən silmək üçün istifadə olunur
//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       const params = new URLSearchParams(searchParams);
//       const current = new Set(params.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite));

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       // filters.. sildiyimizə əmin olaq
//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const pathname = typeof window !== "undefined" ? window.location.pathname : "/product-page";
//       const newSearch = params.toString();

//       if (typeof window !== "undefined" && window.history?.pushState) {
//         window.history.pushState({}, "", pathname + (newSearch ? `?${newSearch}` : ""));
//       } else {
//         router.push(pathname + (newSearch ? `?${newSearch}` : ""), { scroll: false });
//       }
//     },
//     [router, searchParams]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   // ✅ Seçilmiş brendləri çiplərə çevir
//   const renderSelectedBrands = useMemo(() => {
//     const list = Array.isArray(brandsData) ? brandsData : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   // Yalnız ÜST kateqoriya seçiləndə title və iç məzmunu dəyiş
//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === onlyId);
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null; // parentdırsa qaytar
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   // SLUG → ID (URL və ya selectedCategoryIds əsasında) — EXACT match
//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
//         .map((id) => Number(id))
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     if (selectedCategoryIds.length > 0) return selectedCategoryIds.map(Number);
//     return [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   // gecikmə helperi (1s)
//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       // 1 saniyə gecikmə
//       await delay(1000);

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);

//       // URL-dən bütün kateqoriyaları oxu, id + descendants genişləndir
//       const baseIds = getBaseCategoryIdsFromUrlOrState();

//       // URL-dən bütün brand-ları oxu
//       const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//       let queryString = "";

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//           }
//         });

//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         // Kateqoriya seçilməyibsə
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&page=${encodeURIComponent(String(page))}`;
//       }

//       if (brandIds.length > 0) {
//         const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//         queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//         brandIds.forEach((bid) => {
//           queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//         });
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         // page paramını URL-ə yazırıq
//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", String(page));
//         const newSearch = newUrl.searchParams.toString();
//         if (typeof window !== "undefined" && window.history?.pushState) {
//           window.history.pushState({}, "", newUrl.pathname + (newSearch ? "?" + newSearch : ""));
//         }
//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
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
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         // URL-dən bütün category slugs oxu → id + descendants
//         const baseIds = getBaseCategoryIdsFromUrlOrState();

//         // URL-dən brand-lar
//         const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//         let queryString = "";

//         if (baseIds.length > 0) {
//           // ✅ ÜST + ALT kateqoriyalar
//           const expandedSet = new Set();
//           baseIds.forEach((id) => {
//             const nid = Number(id);
//             if (Number.isFinite(nid)) {
//               expandedSet.add(nid);
//               collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//             }
//           });
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expandedSet).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           // Kateqoriya seçilməyibsə
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&page=${encodeURIComponent(String(page))}`;
//         }

//         if (brandIds.length > 0) {
//           const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
//           queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
//           brandIds.forEach((bid) => {
//             queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
//           });
//         }

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

//         setProductData(items || []);
//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdsFromUrlOrState,
//   ]);

//   // ---------- SEO mətni üçün mənbə ----------
//   const sourceCategory = useMemo(() => {
//     if (selectedCategory && (selectedCategory.page_title || selectedCategory.page_description || selectedCategory.meta_title || selectedCategory.meta_description)) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

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
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* ✅ Selected filters — Kategoriya + Brand çipləri */}
//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {renderSelectedBrands.map((br) => (
//                   <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                     <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                     <p>{br.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {renderSelectedBrands.map((br) => (
//                     <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                       <span onClick={() => handleBrandToggleById(br.id)}>×</span>
//                       <p>{br.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button className="close-btn" onClick={() => setMobileFilterOpen(false)}>
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>
//                 <div className="lineFiltered"></div>

//                 {/* ✅ Category accordion — parent seçiləndə başlıq parent olur, içi yalnız alt kateqoriyalar */}
//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : (t?.productsPageFilterCategoryTitle || "Category")
//                   }
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "300px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {singleSelectedParent ? (
//                       // Yalnız SEÇİLMİŞ ÜST KATEQORİYANIN ALT KATEQORİYALARI (UI)
//                       childrenOfSelectedParent.map((child) => {
//                         const childProductCount = getProductCountForCategory(child.id);
//                         const isChildSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(child.id)
//                         );
//                         return (
//                           <li
//                             key={child.id}
//                             onClick={() => handleCategoryToggleById(child.id)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                               fontWeight: isChildSelected ? "bold" : "normal",
//                               marginLeft: "0px",
//                               fontSize: "1.3rem",
//                               marginBottom: "8px",
//                               color: "#666",
//                             }}
//                           >
//                             <span>{child.title}</span>
//                             <p>({childProductCount})</p>
//                           </li>
//                         );
//                       })
//                     ) : (
//                       // Default: bütün parentlər və onların child-ları
//                       groupedCategories.map(({ parent, children }) => {
//                         const parentProductCount = getProductCountForCategory(parent.id);
//                         const isParentSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(parent.id)
//                         );
//                         return (
//                           <React.Fragment key={parent.id}>
//                             <li
//                               onClick={() => handleCategoryToggleById(parent.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 fontWeight: isParentSelected ? "bold" : "normal",
//                                 marginBottom: "4px",
//                               }}
//                             >
//                               <span>{parent.title}</span>
//                               <p>({parentProductCount})</p>
//                             </li>

//                             {children.map((child) => {
//                               const childProductCount = getProductCountForCategory(child.id);
//                               const isChildSelected = selectedCategoryIds.some(
//                                 (c) => Number(c) === Number(child.id)
//                               );
//                               return (
//                                 <li
//                                   key={child.id}
//                                   onClick={() => handleCategoryToggleById(child.id)}
//                                   style={{
//                                     cursor: "pointer",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "0.3rem",
//                                     fontWeight: isChildSelected ? "bold" : "normal",
//                                     marginLeft: "15px",
//                                     fontSize: "1.3rem",
//                                     marginBottom: "8px",
//                                     color: "#666",
//                                   }}
//                                 >
//                                   <span>{child.title}</span>
//                                   <p>({childProductCount})</p>
//                                 </li>
//                               );
//                             })}
//                           </React.Fragment>
//                         );
//                       })
//                     )}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Brands */}
//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const checked = selectedBrandIds.includes(Number(brand?.id));
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() => handleBrandToggleById(brand?.id)}
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
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
//                       href={`/products/${data.title
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
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
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h1>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h1>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;























// !    bu kod 04.11.25 ucun yekun kodumdur     UST KATEGORİYA DUZ GELİR 
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// // --- SLUG helper: Heç nəyi atma, olduğu kimi oxu (sementler-4 kimi) ---
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

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

// const normalizeIds = (arr = []) =>
//   Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// // ---- HELPERS: parent/child əlaqəsi ----
// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   // Törəmələri toplamaq (rekursiv) — yalnız ID-lər
//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       // result yalnız ALT-ları toplayır; baza parent ayrıca əlavə olunacaq
//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   // selectedCategory gəldikdə seçimi resetlə (yalnız onu yaz)
//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       setSelectedCategoryIds([]);
//     }
//   }, [selectedCategory?.id]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const getProductCountForCategory = useCallback(() => {
//     // Lokal sayım sonradan ehtiyac olsa qurular
//     return 0;
//   }, [productData]);

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) => !category.parent_id || (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz (slug-id deyil)
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);

//         if (arr.length === 0) {
//           params.delete("category");
//           // bütün filter-* paramları da təmizlə
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//         } else if (arr.length === 1) {
//           const catObj = categoryData.find((c) => Number(c.id) === Number(arr[0]));
//           const slug = getCategorySlug(catObj || { title: catObj?.title });
//           // YALNIZ SLUG
//           params.set("category", `${slug}`);
//           // backend filterlərini təmizlə ki, yalnız seçili kateqoriyaya görə gəlsin
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//         } else {
//           // multi-select üçün URL-də category saxlamırıq, yalnız filters ilə gedirik
//           params.delete("category");
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//           params.set("per_page", params.get("per_page") || "12");
//           params.set("filters[0][key]", "categories");
//           params.set("filters[0][operator]", "IN");

//           // yalnız seçilənlərin öz ID-lərini əlavə edirik
//           Array.from([...params.keys()]).forEach((k) => {
//             if (k === "filters[0][value][]") params.delete(k);
//           });
//           Array.from(arr).forEach((val) =>
//             params.append("filters[0][value][]", String(val))
//           );
//         }

//         const pathname =
//           typeof window !== "undefined"
//             ? window.location.pathname
//             : "/product-page";
//         const newSearch = params.toString();

//         if (
//           typeof window !== "undefined" &&
//           window.history &&
//           window.history.pushState
//         ) {
//           window.history.pushState(
//             {},
//             "",
//             pathname + (newSearch ? `?${newSearch}` : "")
//           );
//         } else {
//           router.push(pathname + (newSearch ? `?${newSearch}` : ""), {
//             scroll: false,
//           });
//         }

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   // Yalnız ÜST kateqoriya seçiləndə title və iç məzmunu dəyiş
//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === onlyId);
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null; // parentdırsa qaytar
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   // SLUG → ID (URL və ya selectedCategoryIds əsasında) — EXACT match
//   const getBaseCategoryIdFromUrlOrState = useCallback(() => {
//     const urlSlug = readCategorySlug(searchParams.get("category"));
//     if (urlSlug) {
//       const match = (categoryData || []).find((c) => getCategorySlug(c) === urlSlug);
//       if (match?.id) return Number(match.id);
//     }
//     if (selectedCategoryIds.length === 1) return Number(selectedCategoryIds[0]);
//     return null;
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);
//       const baseId = getBaseCategoryIdFromUrlOrState();

//       let queryString = "";

//       if (Number.isFinite(baseId)) {
//         // ✅ ÜST KATEQORİYA seçilibsə: baseId + bütün altlar
//         const expandedSet = new Set([Number(baseId), ...collectDescendantCategoryIds(baseId)]);
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else if (selectedCategoryIds.length > 0) {
//         // multi-select: hər bir seçilən parent/child üçün genişlət (parentdirsə altları da daxil)
//         const expanded = new Set();
//         selectedCategoryIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expanded.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expanded.add(Number(d)));
//           }
//         });
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expanded).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         // Heç bir kateqoriya yoxdursa yalnız səhifələmə
//         const plain = new URLSearchParams(searchParams);
//         plain.set("per_page", String(perPage));
//         plain.set("page", String(page));
//         queryString = plain.toString();
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", String(page));
//         const newSearch = newUrl.searchParams.toString();
//         if (
//           typeof window !== "undefined" &&
//           window.history &&
//           window.history.pushState
//         ) {
//           window.history.pushState(
//             {},
//             "",
//             newUrl.pathname + (newSearch ? "?" + newSearch : "")
//           );
//         } else {
//         }
//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
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
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         // SLUG → ID — EXACT
//         const baseId = getBaseCategoryIdFromUrlOrState();
//         let queryString = "";

//         if (Number.isFinite(baseId)) {
//           // ✅ ÜST KATEQORİYA: baseId + bütün alt kateqoriyalar
//           const expandedSet = new Set([Number(baseId), ...collectDescendantCategoryIds(baseId)]);
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expandedSet).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else if (selectedCategoryIds.length > 0) {
//           // multi-select: parentdirsə altları da daxil
//           const expanded = new Set();
//           selectedCategoryIds.forEach((id) => {
//             const nid = Number(id);
//             if (Number.isFinite(nid)) {
//               expanded.add(nid);
//               collectDescendantCategoryIds(nid).forEach((d) => expanded.add(Number(d)));
//             }
//           });
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           Array.from(expanded).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           // Kateqoriya seçilməyibsə sadəcə səhifələmə
//           const plain = new URLSearchParams(searchParams);
//           plain.set("per_page", String(perPage));
//           plain.set("page", String(page));
//           queryString = plain.toString();
//         }

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

//         setProductData(items || []);
//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdFromUrlOrState,
//   ]);

//   // ---------- SEO mətni üçün mənbə ----------
//   const sourceCategory = useMemo(() => {
//     if (selectedCategory && (selectedCategory.page_title || selectedCategory.page_description || selectedCategory.meta_title || selectedCategory.meta_description)) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//         <h4>{t?.products}</h4>
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button className="close-btn" onClick={() => setMobileFilterOpen(false)}>
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>
//                 <div className="lineFiltered"></div>

//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : (t?.productsPageFilterCategoryTitle || "Category")
//                   }
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "300px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {singleSelectedParent ? (
//                       // Yalnız SEÇİLMİŞ ÜST KATEQORİYANIN ALT KATEQORİYALARI (UI)
//                       childrenOfSelectedParent.map((child) => {
//                         const childProductCount = getProductCountForCategory(child.id);
//                         const isChildSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(child.id)
//                         );
//                         return (
//                           <li
//                             key={child.id}
//                             onClick={() => handleCategoryToggleById(child.id)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                               fontWeight: isChildSelected ? "bold" : "normal",
//                               marginLeft: "0px",
//                               fontSize: "1.3rem",
//                               marginBottom: "8px",
//                               color: "#666",
//                             }}
//                           >
//                             <span>{child.title}</span>
//                             <p>({childProductCount})</p>
//                           </li>
//                         );
//                       })
//                     ) : (
//                       // Default: bütün parentlər və onların child-ları
//                       groupedCategories.map(({ parent, children }) => {
//                         const parentProductCount = getProductCountForCategory(parent.id);
//                         const isParentSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(parent.id)
//                         );
//                         return (
//                           <React.Fragment key={parent.id}>
//                             <li
//                               onClick={() => handleCategoryToggleById(parent.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 fontWeight: isParentSelected ? "bold" : "normal",
//                                 marginBottom: "4px",
//                               }}
//                             >
//                               <span>{parent.title}</span>
//                               <p>({parentProductCount})</p>
//                             </li>

//                             {children.map((child) => {
//                               const childProductCount = getProductCountForCategory(child.id);
//                               const isChildSelected = selectedCategoryIds.some(
//                                 (c) => Number(c) === Number(child.id)
//                               );
//                               return (
//                                 <li
//                                   key={child.id}
//                                   onClick={() => handleCategoryToggleById(child.id)}
//                                   style={{
//                                     cursor: "pointer",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "0.3rem",
//                                     fontWeight: isChildSelected ? "bold" : "normal",
//                                     marginLeft: "15px",
//                                     fontSize: "1.3rem",
//                                     marginBottom: "8px",
//                                     color: "#666",
//                                   }}
//                                 >
//                                   <span>{child.title}</span>
//                                   <p>({childProductCount})</p>
//                                 </li>
//                               );
//                             })}
//                           </React.Fragment>
//                         );
//                       })
//                     )}
//                   </ul>
//                 </FilterAccordion>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => (
//                         <li key={brand?.id ?? brand?.title}>
//                           <input type="checkbox" /> {brand?.title ?? "No title"}
//                         </li>
//                       ))}
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
//                       href={`/products/${data.title
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
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
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h1>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h1>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;































// !HERSEY QAYDASINDADIR URL ILE GELIR DATA AMMA UST KATEGORIYA BOS GELIR
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// // --- SLUG helper: Heç nəyi atma, olduğu kimi oxu (sementler-4 kimi) ---
// function readCategorySlug(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   return cleaned || null;
// }

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

// const normalizeIds = (arr = []) =>
//   Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// // ---- HELPERS: parent/child əlaqəsi ----
// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   // Törəmələri toplamaq (rekursiv) — (UI üçün lazımsa istifadə edərik; data çəkilişində descendants YOX)
//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   // selectedCategory gəldikdə seçimi resetlə (yalnız onu yaz)
//   useEffect(() => {
//     if (selectedCategory?.id) {
//       setSelectedCategoryIds([Number(selectedCategory.id)]);
//     } else {
//       setSelectedCategoryIds([]);
//     }
//   }, [selectedCategory?.id]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

//   const buildRawQuery = (params = {}) => {
//     const parts = [];
//     for (const [key, value] of Object.entries(params || {})) {
//       if (Array.isArray(value)) {
//         for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
//       } else if (value !== undefined && value !== null && value !== "") {
//         parts.push(`${key}=${encodeURIComponent(String(value))}`);
//       }
//     }
//     return parts.join("&");
//   };

//   const getProductCountForCategory = useCallback(() => {
//     // Lokal sayım sonradan ehtiyac olsa qurular
//     return 0;
//   }, [productData]);

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) => !category.parent_id || (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // KATEQORİYA DƏYİŞİMİ: URL-ə yalnız SLUG yaz (slug-id deyil)
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);

//         if (arr.length === 0) {
//           params.delete("category");
//           // bütün filter-* paramları da təmizlə
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//         } else if (arr.length === 1) {
//           const catObj = categoryData.find((c) => Number(c.id) === Number(arr[0]));
//           const slug = getCategorySlug(catObj || { title: catObj?.title });
//           // YALNIZ SLUG
//           params.set("category", `${slug}`);
//           // backend filterlərini təmizlə ki, yalnız seçili kateqoriyaya görə gəlsin
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//         } else {
//           // multi-select üçün URL-də category saxlamırıq, yalnız filters ilə gedirik
//           params.delete("category");
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//           params.set("per_page", params.get("per_page") || "12");
//           params.set("filters[0][key]", "categories");
//           params.set("filters[0][operator]", "IN");

//           const expanded = new Set();
//           arr.forEach((val) => {
//             expanded.add(Number(val));
//             // UI-da lazım olsa altları əlavə edə bilərik, amma məhsul çəkilişində descendants əlavə ETMİRİK.
//             // collectDescendantCategoryIds(Number(val)).forEach((d) => expanded.add(Number(d)));
//           });

//           // təkrarlanan value-ları təmizlə
//           Array.from([...params.keys()]).forEach((k) => {
//             if (k === "filters[0][value][]") params.delete(k);
//           });
//           Array.from(expanded).forEach((val) =>
//             params.append("filters[0][value][]", String(val))
//           );
//         }

//         const pathname =
//           typeof window !== "undefined"
//             ? window.location.pathname
//             : "/product-page";
//         const newSearch = params.toString();

//         if (
//           typeof window !== "undefined" &&
//           window.history &&
//           window.history.pushState
//         ) {
//           window.history.pushState(
//             {},
//             "",
//             pathname + (newSearch ? `?${newSearch}` : "")
//           );
//         } else {
//           router.push(pathname + (newSearch ? `?${newSearch}` : ""), {
//             scroll: false,
//           });
//         }

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   // Yalnız ÜST kateqoriya seçiləndə title və iç məzmunu dəyiş
//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === onlyId);
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null; // parentdırsa qaytar
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   // SLUG → ID (URL və ya selectedCategoryIds əsasında) — EXACT match
//   const getBaseCategoryIdFromUrlOrState = useCallback(() => {
//     const urlSlug = readCategorySlug(searchParams.get("category"));
//     if (urlSlug) {
//       const match = (categoryData || []).find((c) => getCategorySlug(c) === urlSlug);
//       if (match?.id) return Number(match.id);
//     }
//     if (selectedCategoryIds.length === 1) return Number(selectedCategoryIds[0]);
//     return null;
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = Number(paramsObj.per_page || 12);
//       const baseId = getBaseCategoryIdFromUrlOrState();

//       let queryString = "";

//       if (Number.isFinite(baseId)) {
//         // YALNIZ baseId (descendants yox)
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN` +
//           `&filters[0][value][]=${encodeURIComponent(String(baseId))}` +
//           `&page=${encodeURIComponent(String(page))}`;
//       } else if (selectedCategoryIds.length > 0) {
//         // multi-selectdə yalnız seçilənlərin özləri
//         queryString =
//           `per_page=${encodeURIComponent(String(perPage))}` +
//           `&filters[0][key]=categories&filters[0][operator]=IN`;
//         selectedCategoryIds.forEach((id) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(id))}`;
//         });
//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         // Heç bir kateqoriya yoxdursa yalnız səhifələmə
//         const plain = new URLSearchParams(searchParams);
//         plain.set("per_page", String(perPage));
//         plain.set("page", String(page));
//         queryString = plain.toString();
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       if (newItems.length === 0 || newItems.length < perPage) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         // (İstəsən sonradan page-i URL-də göstərməməyi burada history.replaceState ilə edərik)
//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", String(page));
//         const newSearch = newUrl.searchParams.toString();
//         if (
//           typeof window !== "undefined" &&
//           window.history &&
//           window.history.pushState
//         ) {
//           window.history.pushState(
//             {},
//             "",
//             newUrl.pathname + (newSearch ? "?" + newSearch : "")
//           );
//         } else {
//           router.push(newUrl.pathname + (newSearch ? "?" + newSearch : ""), {
//             scroll: false,
//           });
//         }

//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
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
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         const perPage = Number(params.per_page || 12);
//         const page = Number(params.page || 1);

//         // SLUG → ID — EXACT
//         const baseId = getBaseCategoryIdFromUrlOrState();
//         let queryString = "";

//         if (Number.isFinite(baseId)) {
//           // YALNIZ həmin ID (descendants yox)
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN` +
//             `&filters[0][value][]=${encodeURIComponent(String(baseId))}` +
//             `&page=${encodeURIComponent(String(page))}`;
//         } else if (selectedCategoryIds.length > 0) {
//           // multi-select: yalnız seçilənlər
//           queryString =
//             `per_page=${encodeURIComponent(String(perPage))}` +
//             `&filters[0][key]=categories&filters[0][operator]=IN`;
//           selectedCategoryIds.forEach((id) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(id))}`;
//           });
//           queryString += `&page=${encodeURIComponent(String(page))}`;
//         } else {
//           // Kateqoriya seçilməyibsə sadəcə səhifələmə
//           const plain = new URLSearchParams(searchParams);
//           plain.set("per_page", String(perPage));
//           plain.set("page", String(page));
//           queryString = plain.toString();
//         }

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

//         setProductData(items || []);
//         setCurrentPage(page || 1);
//         setHasMore((items?.length ?? 0) >= perPage);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [
//     searchParams.toString(),
//     selectedCategoryIds,
//     collectDescendantCategoryIds,
//     getBaseCategoryIdFromUrlOrState,
//   ]);

//   // ---------- SEO mətni üçün mənbə ----------
//   const sourceCategory = useMemo(() => {
//     if (selectedCategory && (selectedCategory.page_title || selectedCategory.page_description || selectedCategory.meta_title || selectedCategory.meta_description)) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//         <h4>{t?.products}</h4>
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button className="close-btn" onClick={() => setMobileFilterOpen(false)}>
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>
//                 <div className="lineFiltered"></div>

//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : (t?.productsPageFilterCategoryTitle || "Category")
//                   }
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "300px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {singleSelectedParent ? (
//                       // Yalnız SEÇİLMİŞ ÜST KATEQORİYANIN ALT KATEQORİYALARI (UI)
//                       childrenOfSelectedParent.map((child) => {
//                         const childProductCount = getProductCountForCategory(child.id);
//                         const isChildSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(child.id)
//                         );
//                         return (
//                           <li
//                             key={child.id}
//                             onClick={() => handleCategoryToggleById(child.id)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                               fontWeight: isChildSelected ? "bold" : "normal",
//                               marginLeft: "0px",
//                               fontSize: "1.3rem",
//                               marginBottom: "8px",
//                               color: "#666",
//                             }}
//                           >
//                             <span>{child.title}</span>
//                             <p>({childProductCount})</p>
//                           </li>
//                         );
//                       })
//                     ) : (
//                       // Default: bütün parentlər və onların child-ları
//                       groupedCategories.map(({ parent, children }) => {
//                         const parentProductCount = getProductCountForCategory(parent.id);
//                         const isParentSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(parent.id)
//                         );
//                         return (
//                           <React.Fragment key={parent.id}>
//                             <li
//                               onClick={() => handleCategoryToggleById(parent.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 fontWeight: isParentSelected ? "bold" : "normal",
//                                 marginBottom: "4px",
//                               }}
//                             >
//                               <span>{parent.title}</span>
//                               <p>({parentProductCount})</p>
//                             </li>

//                             {children.map((child) => {
//                               const childProductCount = getProductCountForCategory(child.id);
//                               const isChildSelected = selectedCategoryIds.some(
//                                 (c) => Number(c) === Number(child.id)
//                               );
//                               return (
//                                 <li
//                                   key={child.id}
//                                   onClick={() => handleCategoryToggleById(child.id)}
//                                   style={{
//                                     cursor: "pointer",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "0.3rem",
//                                     fontWeight: isChildSelected ? "bold" : "normal",
//                                     marginLeft: "15px",
//                                     fontSize: "1.3rem",
//                                     marginBottom: "8px",
//                                     color: "#666",
//                                   }}
//                                 >
//                                   <span>{child.title}</span>
//                                   <p>({childProductCount})</p>
//                                 </li>
//                               );
//                             })}
//                           </React.Fragment>
//                         );
//                       })
//                     )}
//                   </ul>
//                 </FilterAccordion>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => (
//                         <li key={brand?.id ?? brand?.title}>
//                           <input type="checkbox" /> {brand?.title ?? "No title"}
//                         </li>
//                       ))}
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
//                       href={`/products/${data.title
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
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
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h1>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h1>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;


















































// ! burda her sey qaydasindaidi    04.11.25   polopopo  id ile gelir data
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "../LoadMoreBTN";
// import ApplyBTN from "../ApplyBTN";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-z0-9-]+/g, "-")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const getCategorySlug = (cat) =>
//   cat?.url_slug ??
//   cat?.slug ??
//   cat?.url ??
//   cat?.urlSlug ??
//   slugify(cat?.title ?? "");

// function parseCategoryIdFromParam(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam)
//     ? categoryParam[0]
//     : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   const parts = cleaned.split("-");
//   const last = parts[parts.length - 1];
//   return /^\d+$/.test(last) ? last : null;
// }

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

// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// // ---- HELPERS: parent/child əlaqəsi ----
// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData || []);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const isLoadingMoreRef = useRef(false);
//   const prevParamsRef = useRef(searchParams.toString());

//   // Törəmələri toplamaq (rekursiv)
//   const collectDescendantCategoryIds = useCallback(
//     (parentId) => {
//       const pid = Number(parentId);
//       if (!Number.isFinite(pid)) return [];
//       const result = new Set();
//       const stack = [pid];
//       const seen = new Set();

//       while (stack.length) {
//         const current = stack.pop();
//         if (seen.has(current)) continue;
//         seen.add(current);

//         for (const c of categoryData || []) {
//           const parents = normalizeParentIds(c.parent_id);
//           if (parents.includes(current)) {
//             const cid = parseInt(c.id, 10);
//             if (Number.isFinite(cid) && !result.has(cid)) {
//               result.add(cid);
//               stack.push(cid);
//             }
//           }
//         }
//       }

//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   useEffect(() => {
//     if (selectedCategory?.id) {
//       const catId = Number(selectedCategory.id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         set.add(catId);
//         return Array.from(set);
//       });
//     }
//   }, [selectedCategory]);

//   useEffect(() => {
//     const page = searchParams.get("page");
//     if (page) setCurrentPage(parseInt(page));
//     else setCurrentPage(1);
//     prevParamsRef.current = searchParams.toString();
//   }, [searchParams]);

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

//   const getProductCountForCategory = useCallback(
//     (categoryId) => {
//       return 0;
//     },
//     [productData]
//   );

//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter(
//       (category) => !category.parent_id
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw))
//           parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null)
//           parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents
//           .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//           .filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams);

//         if (arr.length === 0) {
//           params.delete("category");
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//         } else if (arr.length === 1) {
//           const catObj = categoryData.find(
//             (c) => Number(c.id) === Number(arr[0])
//           );
//           const slug = getCategorySlug(catObj || { title: catObj?.title });
//           params.set("category", `${slug}-${arr[0]}`);
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//         } else {
//           params.delete("category");
//           Array.from(params.keys()).forEach((k) => {
//             if (/^filters?\[.*\]/.test(k)) params.delete(k);
//           });
//           params.set("per_page", params.get("per_page") || "12");
//           params.set("filters[0][key]", "categories");
//           params.set("filters[0][operator]", "IN");

//           const expanded = new Set();
//           arr.forEach((val) => {
//             expanded.add(Number(val));
//             collectDescendantCategoryIds(Number(val)).forEach((d) =>
//               expanded.add(Number(d))
//             );
//           });

//           Array.from(params.keys()).forEach((k) => {
//             if (k === "filters[0][value][]") params.delete(k);
//           });
//           Array.from(expanded).forEach((val) =>
//             params.append("filters[0][value][]", String(val))
//           );
//         }

//         const pathname =
//           typeof window !== "undefined"
//             ? window.location.pathname
//             : "/products";
//         const newSearch = params.toString();
//         if (
//           typeof window !== "undefined" &&
//           window.history &&
//           window.history.pushState
//         ) {
//           window.history.pushState(
//             {},
//             "",
//             pathname + (newSearch ? `?${newSearch}` : "")
//           );
//         } else {
//           router.push(pathname + (newSearch ? `?${newSearch}` : ""), {
//             scroll: false,
//           });
//         }

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData, collectDescendantCategoryIds]
//   );

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   const renderSelectedCategories = useMemo(() => {
//     return selectedCategoryIds.map((id) => {
//       const cat = categoryData.find((c) => Number(c.id) === Number(id));
//       return {
//         id,
//         title: cat ? cat.title : `Category ${id}`,
//       };
//     });
//   }, [selectedCategoryIds, categoryData]);

//   // ----- YENİ: yalnız ÜST kateqoriya seçiləndə title və iç məzmunu dəyiş -----
//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === onlyId);
//     if (!onlyCat) return null;
//     const parents = normalizeParentIds(onlyCat.parent_id);
//     return parents.length === 0 ? onlyCat : null; // parentdırsa qaytar
//   }, [selectedCategoryIds, categoryData]);

//   const childrenOfSelectedParent = useMemo(() => {
//     if (!singleSelectedParent) return [];
//     const pid = Number(singleSelectedParent.id);
//     return (categoryData || []).filter((c) =>
//       normalizeParentIds(c.parent_id).includes(pid)
//     );
//   }, [singleSelectedParent, categoryData]);

//   const fetchMoreProducts = async (page) => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       isLoadingMoreRef.current = true;

//       const paramsObj = {};
//       searchParams.forEach((value, key) => {
//         if (paramsObj[key] === undefined) paramsObj[key] = value;
//         else if (Array.isArray(paramsObj[key])) paramsObj[key].push(value);
//         else paramsObj[key] = [paramsObj[key], value];
//       });

//       const perPage = paramsObj.per_page || 12;

//       const urlCategoryParam = searchParams.get("category");
//       const urlCategoryId = parseCategoryIdFromParam(urlCategoryParam);

//       let queryString = "";

//       if (urlCategoryId) {
//         const baseId = Number(urlCategoryId);
//         const expanded = new Set([baseId, ...collectDescendantCategoryIds(baseId)]);

//         queryString = `per_page=${encodeURIComponent(
//           String(perPage)
//         )}&filters[0][key]=categories&filters[0][operator]=IN`;

//         Array.from(expanded).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });

//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else if (selectedCategoryIds.length > 0) {
//         const expanded = new Set();
//         selectedCategoryIds.forEach((id) => {
//           const n = Number(id);
//           if (Number.isFinite(n)) {
//             expanded.add(n);
//             collectDescendantCategoryIds(n).forEach((d) => expanded.add(d));
//           }
//         });

//         queryString = `per_page=${encodeURIComponent(
//           String(perPage)
//         )}&filters[0][key]=categories&filters[0][operator]=IN`;

//         Array.from(expanded).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });

//         queryString += `&page=${encodeURIComponent(String(page))}`;
//       } else {
//         paramsObj.page = page;
//         paramsObj.per_page = perPage;
//         if (!paramsObj["filters[0][key]"]) {
//           paramsObj["filters[0][key]"] = "categories";
//           paramsObj["filters[0][operator]"] = "IN";
//           paramsObj["filters[0][value][]"] = "99";
//         }
//         queryString = buildRawQuery(paramsObj);
//       }

//       const { data } = await axiosInstance.get(
//         `/page-data/product?${queryString}`,
//         {
//           headers: { Lang: "az" },
//           cache: "no-store",
//         }
//       );

//       const newItems = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       if (newItems.length === 0 || newItems.length < Number(perPage)) {
//         setHasMore(false);
//       }

//       if (newItems.length > 0) {
//         setProductData((prevData) => {
//           const existingIds = new Set(prevData.map((item) => item.id));
//           const uniqueNewItems = newItems.filter(
//             (item) => !existingIds.has(item.id)
//           );
//           return [...prevData, ...uniqueNewItems];
//         });

//         const newUrl = new URL(window.location);
//         newUrl.searchParams.set("page", String(page));
//         const newSearch = newUrl.searchParams.toString();
//         if (
//           typeof window !== "undefined" &&
//           window.history &&
//           window.history.pushState
//         ) {
//           window.history.pushState(
//             {},
//             "",
//             newUrl.pathname + (newSearch ? "?" + newSearch : "")
//           );
//         } else {
//           router.push(newUrl.pathname + (newSearch ? "?" + newSearch : ""), {
//             scroll: false,
//           });
//         }

//         setCurrentPage(page);
//         prevParamsRef.current = newSearch;
//       }
//     } catch (error) {
//       console.error("fetchMoreProducts error:", error);
//       isLoadingMoreRef.current = false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = useCallback(() => {
//     if (loading || !hasMore) return;
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight =
//       document.documentElement.clientHeight || window.innerHeight;
//     const scrolledToBottom =
//       Math.ceil(scrollTop + clientHeight) >= scrollHeight - 900;
//     if (scrolledToBottom) fetchMoreProducts(currentPage + 1);
//   }, [loading, hasMore, currentPage]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const onlyPageChanged = (prevStr, nextStr) => {
//     const prev = new URLSearchParams(prevStr || "");
//     const next = new URLSearchParams(nextStr || "");
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
//     const keysPrev = Object.keys(prevObj).sort();
//     const keysNext = Object.keys(nextObj).sort();
//     if (keysPrev.length !== keysNext.length) return false;
//     for (let i = 0; i < keysPrev.length; i++) {
//       const k = keysPrev[i];
//       if (k !== keysNext[i]) return false;
//       const a = Array.isArray(prevObj[k]) ? prevObj[k] : [prevObj[k]];
//       const b = Array.isArray(nextObj[k]) ? nextObj[k] : [nextObj[k]];
//       if (a.length !== b.length) return false;
//       for (let j = 0; j < a.length; j++) {
//         if (String(a[j]) !== String(b[j])) return false;
//       }
//     }
//     return true;
//   };

//   useEffect(() => {
//     const currentParamsStr = searchParams.toString();
//     const prevParamsStr = prevParamsRef.current;
//     const pageChangedOnly = onlyPageChanged(prevParamsStr, currentParamsStr);

//     if (pageChangedOnly && isLoadingMoreRef.current) {
//       const page = parseInt(searchParams.get("page") || "1", 10);
//       setCurrentPage(page);
//       isLoadingMoreRef.current = false;
//       prevParamsRef.current = currentParamsStr;
//       return;
//     }

//     const loadProductsByParams = async () => {
//       try {
//         setLoading(true);

//         const params = {};
//         searchParams.forEach((value, key) => {
//           if (params[key] === undefined) params[key] = value;
//           else if (Array.isArray(params[key])) params[key].push(value);
//           else params[key] = [params[key], value];
//         });

//         if (!params.per_page) params.per_page = 12;
//         if (!params.page) params.page = 1;

//         const urlCategoryId = parseCategoryIdFromParam(
//           searchParams.get("category")
//         );

//         let queryString = "";

//         if (urlCategoryId) {
//           const baseId = Number(urlCategoryId);
//           const expanded = new Set([baseId, ...collectDescendantCategoryIds(baseId)]);

//           queryString = `per_page=${encodeURIComponent(
//             String(params.per_page)
//           )}&filters[0][key]=categories&filters[0][operator]=IN`;

//           Array.from(expanded).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//           });

//           queryString += `&page=${encodeURIComponent(String(params.page))}`;
//         } else if (selectedCategoryIds.length > 0) {
//           const expanded = new Set();
//           selectedCategoryIds.forEach((id) => {
//             const n = Number(id);
//             if (Number.isFinite(n)) {
//               expanded.add(n);
//               collectDescendantCategoryIds(n).forEach((d) => expanded.add(d));
//             }
//           });

//           queryString = `per_page=${encodeURIComponent(
//             String(params.per_page)
//           )}&filters[0][key]=categories&filters[0][operator]=IN`;

//           Array.from(expanded).forEach((val) => {
//             queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//           });

//           queryString += `&page=${encodeURIComponent(String(params.page))}`;
//         } else {
//           if (!params["filters[0][key]"]) {
//             params["filters[0][key]"] = "categories";
//             params["filters[0][operator]"] = "IN";
//             params["filters[0][value][]"] = "99";
//           }
//           queryString = buildRawQuery(params);
//         }

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

//         setProductData(items || []);
//         setCurrentPage(parseInt(params.page || 1, 10) || 1);
//         setHasMore((items?.length ?? 0) >= 12);
//         isLoadingMoreRef.current = false;
//       } catch (err) {
//         console.error("loadProductsByParams error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductsByParams();
//     prevParamsRef.current = currentParamsStr;
//   }, [searchParams.toString(), selectedCategoryIds, collectDescendantCategoryIds]);

//   // ---------- SEO mətni üçün mənbə ----------
//   const sourceCategory = useMemo(() => {
//     if (selectedCategory && (selectedCategory.page_title || selectedCategory.page_description || selectedCategory.meta_title || selectedCategory.meta_description)) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

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
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleRemoveCategory(cat.id)}>
//                       ×
//                     </span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleRemoveCategory(cat.id)}>
//                         ×
//                       </span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>
//                 <div className="lineFiltered"></div>

//                 {/* ====== BURADA DƏYİŞİKLİK: yalnız üst kateqoriya seçilibsə başlıq və iç siyahı dəyişir ====== */}
//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : (t?.productsPageFilterCategoryTitle || "Category")
//                   }
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "300px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {singleSelectedParent ? (
//                       // Yalnız SEÇİLMİŞ ÜST KATEQORİYANIN ALT KATEQORİYALARI
//                       childrenOfSelectedParent.map((child) => {
//                         const childProductCount =
//                           getProductCountForCategory(child.id);
//                         const isChildSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(child.id)
//                         );
//                         return (
//                           <li
//                             key={child.id}
//                             onClick={() => handleCategoryToggleById(child.id)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.3rem",
//                               fontWeight: isChildSelected ? "bold" : "normal",
//                               marginLeft: "0px",
//                               fontSize: "1.3rem",
//                               marginBottom: "8px",
//                               color: "#666",
//                             }}
//                           >
//                             <span>{child.title}</span>
//                             <p>({childProductCount})</p>
//                           </li>
//                         );
//                       })
//                     ) : (
//                       // Default: bütün parentlər və onların child-ları
//                       groupedCategories.map(({ parent, children }) => {
//                         const parentProductCount =
//                           getProductCountForCategory(parent.id);
//                         const isParentSelected = selectedCategoryIds.some(
//                           (c) => Number(c) === Number(parent.id)
//                         );
//                         return (
//                           <React.Fragment key={parent.id}>
//                             <li
//                               onClick={() =>
//                                 handleCategoryToggleById(parent.id)
//                               }
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                                 fontWeight: isParentSelected ? "bold" : "normal",
//                                 marginBottom: "4px",
//                               }}
//                             >
//                               <span>{parent.title}</span>
//                               <p>({parentProductCount})</p>
//                             </li>

//                             {children.map((child) => {
//                               const childProductCount =
//                                 getProductCountForCategory(child.id);
//                               const isChildSelected = selectedCategoryIds.some(
//                                 (c) => Number(c) === Number(child.id)
//                               );
//                               return (
//                                 <li
//                                   key={child.id}
//                                   onClick={() =>
//                                     handleCategoryToggleById(child.id)
//                                   }
//                                   style={{
//                                     cursor: "pointer",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: "0.3rem",
//                                     fontWeight: isChildSelected
//                                       ? "bold"
//                                       : "normal",
//                                     marginLeft: "15px",
//                                     fontSize: "1.3rem",
//                                     marginBottom: "8px",
//                                     color: "#666",
//                                   }}
//                                 >
//                                   <span>{child.title}</span>
//                                   <p>({childProductCount})</p>
//                                 </li>
//                               );
//                             })}
//                           </React.Fragment>
//                         );
//                       })
//                     )}
//                   </ul>
//                 </FilterAccordion>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="search" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {(Array.isArray(brandsData)
//                       ? brandsData
//                       : Object.values(brandsData || {})
//                     )
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => (
//                         <li key={brand?.id ?? brand?.title}>
//                           <input type="checkbox" /> {brand?.title ?? "No title"}
//                         </li>
//                       ))}
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
//                       href={`/products/${data.title
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}-${data.id}`}
//                       className="block"
//                     >
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             <img
//                               src={
//                                 data?.image
//                                   ? `https://admin.adentta.az/storage${data.image}`
//                                   : "/images/adenttaDefaultImg.svg"
//                               }
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
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h1>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h1>

//               {showDetails && (
//                 <div
//                   className="productsPageDetailsCEO"
//                   style={{ marginTop: "2rem" }}
//                 >
//                   <div
//                     className="page-description-content"
//                     dangerouslySetInnerHTML={{
//                       __html:
//                         sourceCategory?.page_description ||
//                         "Page description is not available.",
//                     }}
//                   />
//                 </div>
//               )}

//               <div
//                 className="productsPageDescriptionLink"
//                 style={{ marginTop: "1rem" }}
//               >
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowDetails((prev) => !prev);
//                   }}
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                   }}
//                 >
//                   {showDetails
//                     ? t?.hideDetailsBtn || "Hide"
//                     : t?.seeMoreBtn || "See more"}
//                   <img
//                     src="/icons/rightDown.svg"
//                     alt=""
//                     style={{
//                       marginLeft: "0.25rem",
//                       transform: showDetails ? "rotate(180deg)" : "none",
//                       transition: "transform 0.2s",
//                     }}
//                   />
//                 </a>
//               </div>
//             </>
//           )}
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
