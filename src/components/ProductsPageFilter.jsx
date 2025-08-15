//! Bu kod duzeldi ve suretlidi
// // File: components/ProductsPageFilter.jsx
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useCallback,
//   useRef,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion başlık komponenti (className'ler orijinal)
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

// // Optimized client-side fetch with caching
// const productCache = new Map();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// async function fetchProducts(categoryIds = [], brandIds = [], searchText = "", page = 1, perPage = 24) {
//   const cacheKey = JSON.stringify({ categoryIds, brandIds, searchText, page, perPage });

//   // Check cache first
//   const cached = productCache.get(cacheKey);
//   if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//     return cached.data;
//   }

//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }

//   let url = `/page-data/product?per_page=${perPage}&page=${page}`;

//   if (searchText) {
//     url += `&search_text=${encodeURIComponent(searchText)}`;
//   }

//   if (filters.length) {
//     const query = filters
//       .map((f, idx) => {
//         const base = `filters[${idx}][key]=${encodeURIComponent(
//           f.key
//         )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//         const vals = f.values
//           .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//           .join("&");
//         return `${base}&${vals}`;
//       })
//       .join("&");
//     url += `&${query}`;
//   }

//   try {
//     const res = await axiosInstance.get(url);
//     const result = {
//       products: res.data.data.data,
//       pagination: res.data.data
//     };

//     // Cache the result
//     productCache.set(cacheKey, {
//       data: result,
//       timestamp: Date.now()
//     });

//     return result;
//   } catch (err) {
//     console.error("Filter fetch error (client)", err);
//     return { products: [], pagination: null };
//   }
// }

// // Güvenli slugify utility
// function slugify(text) {
//   if (!text) return "";
//   return text
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }

// // Memoized product card component
// const ProductCard = React.memo(({ product, t, slugify }) => (
//   <div className="xl-4 lg-4 md-6 sm-6">
//     <Link
//       href={`/products/${slugify(product.title)}-${product.id}`}
//       className="block"
//     >
//       <div className="homePageProductCardContent">
//         <div className="homePageProCardImgs">
//           <div className="homePageProductCardContentImage">
//             <img
//               src={`https://admin.adentta.az/storage${product.image}`}
//               alt={product.title}
//               loading="lazy"
//             />
//           </div>
//         </div>
//         <div className="homePageProductCardContentInner">
//           <div className="homePageProductCardContentText">
//             <span>{product.title}</span>
//           </div>
//           <div className="price">
//             <div className="priceItem">
//               <strong id="prices">{product.price}</strong>
//               <Manat />
//             </div>
//           </div>
//         </div>
//         <div className="homePageProductCardContentBottom">
//           <span>{t?.learnMore || "Learn More"}</span>
//           <img src="/icons/arrowTopRight.svg" alt="" />
//         </div>
//       </div>
//     </Link>
//   </div>
// ));

// export default function ProductsPageFilter({
//   t,
//   allProducts = [], // Keep for compatibility but won't be used heavily
//   initialProducts = [],
//   categoryData = [],
//   brandsDataFilter = [],
//   initialSelectedBrands = [],
//   initialSelectedCategories = [],
//   categoryMetaTitle = null,
//   categoryMetaDescription = null,
//   categoryPageTitle = null,
//   categoryPageDescription = null,
//   categoryId = null,
//   searchText = null,
//   perPage = 24,
//   pagination = null,
//   productCounts = {}
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [filteredProducts, setFilteredProducts] = useState(initialProducts);
//   const [currentPagination, setPagination] = useState(pagination);
//   const [selectedCategories, setSelectedCategories] = useState(
//     initialSelectedCategories
//   );
//   const [selectedBrands, setSelectedBrands] = useState(initialSelectedBrands);
//   const [sortOption, setSortOption] = useState({
//     value: "az",
//     label: t?.from || "From A-Z",
//   });
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Optimized infinite scroll
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const loadMoreRef = useRef(null);

//   // Debounced API calls
//   const debounceTimeoutRef = useRef(null);

//   const fetchProductsDebounced = useCallback(async (categoryIds, brandIds, searchTextParam, page = 1) => {
//     if (debounceTimeoutRef.current) {
//       clearTimeout(debounceTimeoutRef.current);
//     }

//     debounceTimeoutRef.current = setTimeout(async () => {
//       setIsLoading(true);
//       try {
//         const { products, pagination: newPagination } = await fetchProducts(
//           categoryIds,
//           brandIds,
//           searchTextParam,
//           page,
//           perPage
//         );

//         if (page === 1) {
//           setFilteredProducts(products);
//         } else {
//           setFilteredProducts(prev => [...prev, ...products]);
//         }
//         setPagination(newPagination);
//         setCurrentPage(page);
//       } catch (err) {
//         console.error(err);
//         if (page === 1) {
//           setFilteredProducts([]);
//         }
//       } finally {
//         setIsLoading(false);
//         setIsLoadingMore(false);
//       }
//     }, 300);
//   }, [perPage]);

//   useEffect(() => {
//     const categoryParam = searchParams.get("category");
//     const brandsParam = searchParams.get("brands");
//     const searchTextParam = searchParams.get("search_text");

//     const categorySlugs = categoryParam ? categoryParam.split(",") : [];
//     const newSelectedCategories = categoryData.filter((c) =>
//       categorySlugs.includes(c.url_slug)
//     );
//     const categoryIds = newSelectedCategories.map((c) => c.id);

//     const brandIds = brandsParam
//       ? brandsParam
//           .split(",")
//           .map((s) => parseInt(s, 10))
//           .filter(Boolean)
//       : [];
//     const newSelectedBrands = brandsDataFilter.filter((b) =>
//       brandIds.includes(b.id)
//     );

//     setSelectedCategories(newSelectedCategories);
//     setSelectedBrands(newSelectedBrands);
//     setShowDetails(false);

//     fetchProductsDebounced(categoryIds, brandIds, searchTextParam, 1);
//   }, [searchParams.toString(), categoryData, brandsDataFilter, fetchProductsDebounced]);

//   // Optimized sorting with useMemo
//   const sortedProducts = useMemo(() => {
//     if (sortOption.value === "az") {
//       return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
//     } else {
//       return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
//     }
//   }, [filteredProducts, sortOption.value]);

//   const updateUrlWithFilters = useCallback(
//     (newBrands, newCategories) => {
//       const params = new URLSearchParams();

//       if (newCategories.length) {
//         params.set("category", newCategories.map((c) => c.url_slug).join(","));
//       }
//       if (newBrands.length) {
//         params.set("brands", newBrands.map((b) => b.id).join(","));
//       }

//       const currentSearchText = searchParams.get("search_text");
//       const currentPerPage = searchParams.get("per_page");

//       if (currentSearchText) {
//         params.set("search_text", currentSearchText);
//       }
//       if (currentPerPage) {
//         params.set("per_page", currentPerPage);
//       }

//       const qs = params.toString();
//       router.push(qs ? `/products?${qs}` : `/products`);
//     },
//     [router, searchParams]
//   );

//   const handleCategoryToggle = useCallback(
//     (category) => {
//       const exists = selectedCategories.some((c) => c.id === category.id);
//       const updated = exists
//         ? selectedCategories.filter((c) => c.id !== category.id)
//         : [...selectedCategories, category];
//       updateUrlWithFilters(selectedBrands, updated);
//     },
//     [selectedCategories, selectedBrands, updateUrlWithFilters]
//   );

//   const handleBrandToggle = useCallback(
//     (brand) => {
//       const exists = selectedBrands.some((b) => b.id === brand.id);
//       const updated = exists
//         ? selectedBrands.filter((b) => b.id !== brand.id)
//         : [...selectedBrands, brand];
//       updateUrlWithFilters(updated, selectedCategories);
//     },
//     [selectedBrands, selectedCategories, updateUrlWithFilters]
//   );

//   // Optimized load more with intersection observer
//   useEffect(() => {
//     if (!loadMoreRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (
//           entry.isIntersecting &&
//           !isLoading &&
//           !isLoadingMore &&
//           currentPagination?.next_page_url
//         ) {
//           setIsLoadingMore(true);
//           const nextPage = currentPage + 1;

//           const categoryIds = selectedCategories.map(c => c.id);
//           const brandIds = selectedBrands.map(b => b.id);
//           const searchTextParam = searchParams.get("search_text");

//           fetchProductsDebounced(categoryIds, brandIds, searchTextParam, nextPage);
//         }
//       },
//       { root: null, rootMargin: "200px", threshold: 0.1 }
//     );

//     observer.observe(loadMoreRef.current);
//     return () => observer.disconnect();
//   }, [isLoading, isLoadingMore, currentPagination, currentPage, selectedCategories, selectedBrands, searchParams, fetchProductsDebounced]);

//   // Memoized filtered brands for search
//   const filteredBrands = useMemo(() => {
//     return brandsDataFilter.filter((brand) =>
//       brand?.title?.toLowerCase().includes(brandSearchTerm?.toLowerCase())
//     );
//   }, [brandsDataFilter, brandSearchTerm]);

//   // Calculate product counts more efficiently
//   const getProductCountForCategory = useCallback((categoryId) => {
//     // Use productCounts if available, otherwise fallback to calculation
//     if (productCounts.categories?.[categoryId]) {
//       return productCounts.categories[categoryId];
//     }
//     return allProducts.filter((product) =>
//       product.categories?.some((c) => c.id === categoryId)
//     ).length;
//   }, [productCounts, allProducts]);

//   return (
//     <div>
//       <div className="container">
//         {/* Başlık */}
//         <div className="filterTop topper">
//           <Link href="/">
//             <h1>Adentta</h1>
//           </Link>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products || "Products"}</h4>
//         </div>

//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}"
//                  ( {currentPagination?.total || filteredProducts.length}{" "} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           {/* Sidebar Filter */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Seçilmiş kategori və markalar - Desktop */}
//               <div className="selectedFilter desktop-only">
//                 {selectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleCategoryToggle(cat)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {selectedBrands.map((brand) => (
//                   <div
//                     className="selectedFilterInner"
//                     key={`brand-${brand.id}`}
//                   >
//                     <span onClick={() => handleBrandToggle(brand)}>×</span>
//                     <p>{brand.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 {/* Seçilmiş kategori və markalar - Mobile */}
//                 <div className="selectedFilter mobile-only">
//                   {selectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleCategoryToggle(cat)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {selectedBrands.map((brand) => (
//                     <div
//                       className="selectedFilterInner"
//                       key={`brand-${brand.id}`}
//                     >
//                       <span onClick={() => handleBrandToggle(brand)}>×</span>
//                       <p>{brand.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setIsMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 {/* Category Accordion */}
//               <FilterAccordion
//                   title={t?.productsPageFilterCategoryTitle || "Category"}
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "250px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {categoryData.map((cat) => {
//                       const productCount = allProducts.filter((product) =>
//                         product.categories?.some((c) => c.id === cat.id)
//                       ).length;
//                       const isSelected = selectedCategories.some(
//                         (c) => c.id === cat.id
//                       );
//                       return (
//                         <li
//                           key={cat.id}
//                           onClick={() => handleCategoryToggle(cat)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                             fontWeight: isSelected ? "bold" : "normal",
//                           }}
//                         >
//                           <span>{cat.title}</span>
//                           <p>({productCount})</p>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Brand Accordion */}
//                 <FilterAccordion
//                   title={t?.productsPageFilterBrandsTitle || "Brands"}
//                 >
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText || "Search..."}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul
//                     style={{
//                       maxHeight: "250px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {brandsDataFilter
//                       .filter((brand) =>
//                         brand?.title
//                           ?.toLowerCase()
//                           .includes(brandSearchTerm?.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const isSelected = selectedBrands.some(
//                           (b) => b.id === brand.id
//                         );
//                         return (
//                           <li
//                             key={brand.id}
//                             onClick={() => handleBrandToggle(brand)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.5rem",
//                               fontWeight: isSelected ? "bold" : "normal",
//                             }}
//                           >
//                             <input
//                               type="checkbox"
//                               checked={isSelected}
//                               readOnly
//                             />
//                             <span>{brand.title}</span>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Mobile Apply Button */}
//                 <div
//                   className="applyBTN flex items-center mt-4 justify-center"
//                   onClick={() => setIsMobileFilterOpen(false)}
//                 >
//                   <ApplyBTN t={t} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <div className="productPageSortingInner">
//                   <span>{t?.sortBy || "Sort by"}</span>
//                   <ReactSelect
//                     t={t}
//                     value={sortOption}
//                     onChange={setSortOption}
//                   />
//                 </div>

//                 {/* Search Results Info */}
//               </div>

//               <div className="row">
//                 {isLoading ? (
//                   <div className="loader-container">
//                     <div className="loader" />
//                   </div>
//                 ) : (
//                   sortedProducts.map((d) => (
//                     <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
//                       <Link
//                         href={`/products/${slugify(d.title)}-${d.id}`}
//                         className="block"
//                       >
//                         <div className="homePageProductCardContent">
//                           <div className="homePageProCardImgs">
//                             <div className="homePageProductCardContentImage">
//                               <img
//                                 src={`https://admin.adentta.az/storage${d.image}`}
//                                 alt={d.title}
//                               />
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentInner">
//                             <div className="homePageProductCardContentText">
//                               <span>{d.title}</span>
//                             </div>
//                             <div className="price">
//                               <div className="priceItem">
//                                 <strong id="prices">{d.price}</strong>
//                                 <Manat />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentBottom">
//                             <span>{t?.learnMore || "Learn More"}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//             <div ref={loadMoreRef} style={{ height: "1px" }} />
//             {isLoadingMore && (
//               <div className="loader-container" style={{ margin: "1rem 0" }}>
//                 <div className="loader" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Dinamik meta və toggle bölməsi */}
//         <div className="productsPageDescription">
//           <h1>
//             {categoryPageTitle
//               ? categoryPageTitle
//               : t?.productsPageCeoDescription ||
//                 "Ceo description - Addenta product category"}
//           </h1>

//           {/* <div
//             className="page-description-content seoPtagOnly"
//             dangerouslySetInnerHTML={{
//               __html: (
//                 categoryPageDescription ||
//                 t?.productsPageDescriptionText ||
//                 "Ceo Text"
//               )?.slice(0, 350),
//             }}
//           /> */}

//           {showDetails && (
//             <div
//               className="productsPageDetailsCEO"
//               style={{ marginTop: "2rem" }}
//             >
//               <div
//                 className="page-description-content"
//                 dangerouslySetInnerHTML={{
//                   __html: categoryPageDescription || "",
//                 }}
//               />
//             </div>
//           )}

//           <div
//             className="productsPageDescriptionLink"
//             style={{ marginTop: "1rem" }}
//           >
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowDetails((prev) => !prev);
//               }}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 textDecoration: "none",
//               }}
//             >
//               {showDetails
//                 ? t?.hideDetailsBtn || "Hide"
//                 : t?.seeMoreBtn || "See more"}
//               <img
//                 src="/icons/rightDown.svg"
//                 alt=""
//                 style={{
//                   marginLeft: "0.25rem",
//                   transform: showDetails ? "rotate(180deg)" : "none",
//                   transition: "transform 0.2s",
//                 }}
//               />
//             </a>
//           </div>
//         </div>

//         {/* style jsx */}
//         <style jsx>{`
//           .loader-container {
//             width: 100% !important;
//             min-width: 97rem;
//             min-height: 10rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             padding: 5rem auto;
//           }
//           .loader {
//             border: 5px solid #98b4de;
//             border-top: 5px solid #293881;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             animation: spin 0.8s linear infinite;
//           }
//           @keyframes spin {
//             to {
//               transform: rotate(360deg);
//             }
//           }
//           .accordion-content {
//             max-height: 250px;
//             overflow-y: auto;
//           }
//           .productsPageDetailsCEO h1 {
//             margin-bottom: 0.5rem;
//           }
//           .page-description-content {
//             margin-bottom: 0.5rem;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }





// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useCallback,
//   useRef,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion başlık komponenti
// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true);
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

// // Cache və utility-lər
// const productCache = new Map();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 dəq

// async function fetchProducts(
//   categoryIds = [],
//   brandIds = [],
//   searchText = "",
//   page = 1,
//   perPage = 24
// ) {
//   const cacheKey = JSON.stringify({
//     categoryIds,
//     brandIds,
//     searchText,
//     page,
//     perPage,
//   });

//   const cached = productCache.get(cacheKey);
//   if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//     return cached.data;
//   }

//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }

//   let url = `/page-data/product?per_page=${perPage}&page=${page}`;
//   if (searchText) url += `&search_text=${encodeURIComponent(searchText)}`;

//   if (filters.length) {
//     const query = filters
//       .map((f, idx) => {
//         const base = `filters[${idx}][key]=${encodeURIComponent(
//           f.key
//         )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//         const vals = f.values
//           .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//           .join("&");
//         return `${base}&${vals}`;
//       })
//       .join("&");
//     url += `&${query}`;
//   }

//   try {
//     const res = await axiosInstance.get(url);
//     const result = {
//       products: res.data.data.data,
//       pagination: res.data.data,
//     };
//     productCache.set(cacheKey, {
//       data: result,
//       timestamp: Date.now(),
//     });
//     return result;
//   } catch (err) {
//     console.error("Filter fetch error (client)", err);
//     return { products: [], pagination: null };
//   }
// }

// // slugify
// function slugify(text) {
//   if (!text) return "";
//   return text
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }

// // normalize id array (numeric, unique)
// const normalizeIds = (arr = []) =>
//   Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// // extract category ids from product robustly
// function extractCategoryIdsFromProduct(product) {
//   const ids = new Set();
//   if (!product) return [];
//   const raw =
//     product.categories ?? product.category_ids ?? product.category_list ?? product.category ?? null;

//   const pushId = (v) => {
//     if (v == null) return;
//     const n = typeof v === "number" ? v : Number(v);
//     if (!Number.isNaN(n)) ids.add(n);
//   };

//   if (Array.isArray(raw)) {
//     for (const item of raw) {
//       if (item == null) continue;
//       if (typeof item === "object") {
//         if (item.id) pushId(item.id);
//         else if (item.category_id) pushId(item.category_id);
//         else if (item.value) pushId(item.value);
//       } else {
//         pushId(item);
//       }
//     }
//   } else if (typeof raw === "object" && raw !== null) {
//     if (raw.id) pushId(raw.id);
//     else if (raw.category_id) pushId(raw.category_id);
//     else Object.keys(raw).forEach((k) => pushId(k));
//   } else if (typeof raw === "number" || typeof raw === "string") {
//     pushId(raw);
//   }

//   if (product.category_id) pushId(product.category_id);
//   if (product.category) pushId(product.category);

//   return Array.from(ids);
// }

// // Product card (memo)
// const ProductCard = React.memo(({ product, t }) => (
//   <div className="xl-4 lg-4 md-6 sm-6">
//     <Link href={`/products/${slugify(product.title)}-${product.id}`} className="block">
//       <div className="homePageProductCardContent">
//         <div className="homePageProCardImgs">
//           <div className="homePageProductCardContentImage">
//             <img src={`https://admin.adentta.az/storage${product.image}`} alt={product.title} loading="lazy" />
//           </div>
//         </div>
//         <div className="homePageProductCardContentInner">
//           <div className="homePageProductCardContentText">
//             <span>{product.title}</span>
//           </div>
//           <div className="price">
//             <div className="priceItem">
//               <strong id="prices">{product.price}</strong>
//               <Manat />
//             </div>
//           </div>
//         </div>
//         <div className="homePageProductCardContentBottom">
//           <span>{t?.learnMore || "Learn More"}</span>
//           <img src="/icons/arrowTopRight.svg" alt="" />
//         </div>
//       </div>
//     </Link>
//   </div>
// ));

// export default function ProductsPageFilter({
//   t,
//   allProducts = [],
//   initialProducts = [],
//   categoryData = [],
//   brandsDataFilter = [],
//   initialSelectedBrands = [],
//   initialSelectedCategories = [],
//   categoryMetaTitle = null,
//   categoryMetaDescription = null,
//   categoryPageTitle = null,
//   categoryPageDescription = null,
//   categoryId = null,
//   searchText = null,
//   perPage = 24,
//   pagination = null,
//   productCounts = {},
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // initial selected ids (normalize)
//   const initialCatIds = normalizeIds(
//     (initialSelectedCategories || []).map((c) => (c && c.id ? c.id : null))
//   );
//   const initialBrandIds = normalizeIds(
//     (initialSelectedBrands || []).map((b) => (b && b.id ? b.id : null))
//   );

//   const [filteredProducts, setFilteredProducts] = useState(initialProducts);
//   const [currentPagination, setPagination] = useState(pagination);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState(initialCatIds);
//   const [selectedBrandIds, setSelectedBrandIds] = useState(initialBrandIds);
//   const [sortOption, setSortOption] = useState({
//     value: "az",
//     label: t?.from || "From A-Z",
//   });
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const loadMoreRef = useRef(null);
//   const debounceTimeoutRef = useRef(null);

//   const fetchProductsDebounced = useCallback(
//     async (categoryIds, brandIds, searchTextParam, page = 1) => {
//       if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
//       debounceTimeoutRef.current = setTimeout(async () => {
//         setIsLoading(true);
//         try {
//           const { products, pagination: newPagination } = await fetchProducts(
//             categoryIds,
//             brandIds,
//             searchTextParam,
//             page,
//             perPage
//           );
//           if (page === 1) setFilteredProducts(products);
//           else setFilteredProducts((prev) => [...prev, ...products]);
//           setPagination(newPagination);
//           setCurrentPage(page);
//         } catch {
//           if (page === 1) setFilteredProducts([]);
//         } finally {
//           setIsLoading(false);
//           setIsLoadingMore(false);
//         }
//       }, 300);
//     },
//     [perPage]
//   );

//   // map: categoryId -> Set(productId)  (built once from allProducts)
//   const categoryToProducts = useMemo(() => {
//     const map = new Map();
//     if (!Array.isArray(allProducts)) return map;
//     for (const p of allProducts) {
//       const pId = p?.id ?? p?.product_id;
//       if (!pId) continue;
//       const cids = extractCategoryIdsFromProduct(p);
//       for (const cid of cids) {
//         const n = Number(cid);
//         if (Number.isNaN(n)) continue;
//         if (!map.has(n)) map.set(n, new Set());
//         map.get(n).add(Number(pId));
//       }
//     }
//     return map;
//   }, [allProducts]);

//   // descendant helper
//   const getDescendantCategoryIds = useCallback(
//     (startId) => {
//       const numericStart = typeof startId === "number" ? startId : parseInt(startId, 10);
//       const result = new Set();
//       const stack = [numericStart];
//       while (stack.length) {
//         const cur = stack.pop();
//         if (result.has(cur)) continue;
//         result.add(cur);
//         for (const c of categoryData) {
//           const parentRaw = c.parent_id;
//           let parents = [];
//           if (Array.isArray(parentRaw)) {
//             parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//           } else if (parentRaw && typeof parentRaw === "object" && parentRaw.id != null) {
//             parents = [parentRaw.id];
//           } else if (parentRaw) {
//             parents = [parentRaw];
//           }
//           const numericParents = parents
//             .map((p) => (typeof p === "number" ? p : parseInt(p, 10)))
//             .filter(Boolean);
//           if (numericParents.includes(cur)) {
//             const childId = typeof c.id === "number" ? c.id : parseInt(c.id, 10);
//             if (!result.has(childId)) stack.push(childId);
//           }
//         }
//       }
//       return Array.from(result);
//     },
//     [categoryData]
//   );

//   // robust getProductCountForCategory: use categoryToProducts map + descendants and return unique product count
//   const getProductCountForCategory = useCallback(
//     (id) => {
//       const numericId = typeof id === "number" ? id : parseInt(id, 10);
//       const cats = productCounts?.categories;
//       // try backend productCounts first (robust checks)
//       if (cats) {
//         if (!Array.isArray(cats) && typeof cats === "object") {
//           const byKey = cats[numericId] ?? cats[numericId.toString()];
//           if (typeof byKey === "number") return byKey;
//         }
//         if (Array.isArray(cats)) {
//           const found = cats.find(
//             (c) =>
//               (c?.id !== undefined && Number(c.id) === numericId) ||
//               (c?.category_id !== undefined && Number(c.category_id) === numericId)
//           );
//           if (found) return found.count ?? found.total ?? found.product_count ?? 0;
//         }
//         // nested checks could be added if needed
//       }

//       try {
//         const descendantIds = getDescendantCategoryIds(numericId);
//         const matchedProductIds = new Set();
//         for (const cid of descendantIds) {
//           const set = categoryToProducts.get(cid);
//           if (!set) continue;
//           for (const pid of set) matchedProductIds.add(pid);
//         }
//         return matchedProductIds.size;
//       } catch (e) {
//         console.error("Error in getProductCountForCategory", e);
//         return 0;
//       }
//     },
//     [productCounts, categoryToProducts, getDescendantCategoryIds]
//   );

//   // When URL/search change -> derive ids and fetch
//   useEffect(() => {
//     const catParam = searchParams.get("category");
//     const brParam = searchParams.get("brands");
//     const stParam = searchParams.get("search_text");

//     const slugs = catParam ? catParam.split(",").filter(Boolean) : [];
//     const slugToId = (slug) => {
//       const found = categoryData.find((c) => c.url_slug === slug);
//       return found ? Number(found.id) : null;
//     };
//     const newCatIds = normalizeIds(slugs.map(slugToId));

//     const brIds = brParam
//       ? brParam
//           .split(",")
//           .map((s) => Number(s))
//           .filter((n) => !Number.isNaN(n))
//       : [];
//     const newBrandIds = normalizeIds(brIds);

//     setSelectedCategoryIds(newCatIds);
//     setSelectedBrandIds(newBrandIds);
//     setShowDetails(false);
//     fetchProductsDebounced(newCatIds, newBrandIds, stParam, 1);
//   }, [searchParams.toString(), categoryData, brandsDataFilter, fetchProductsDebounced]);

//   const sortedProducts = useMemo(() => {
//     return sortOption.value === "az"
//       ? [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))
//       : [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
//   }, [filteredProducts, sortOption.value]);

//   // update URL with unique slugs
//   const updateUrlWithFilters = useCallback(
//     (brandIdsArr = [], categoryIdsArr = []) => {
//       const params = new URLSearchParams();

//       const uniqueCatIds = normalizeIds(categoryIdsArr);
//       const catSlugs = uniqueCatIds
//         .map((id) => {
//           const found = categoryData.find((c) => Number(c.id) === Number(id));
//           return found ? found.url_slug : null;
//         })
//         .filter(Boolean);
//       const uniqueSlugs = Array.from(new Set(catSlugs));
//       if (uniqueSlugs.length) params.set("category", uniqueSlugs.join(","));

//       const uniqueBrandIds = normalizeIds(brandIdsArr);
//       if (uniqueBrandIds.length) params.set("brands", uniqueBrandIds.join(","));

//       const cs = searchParams.get("search_text");
//       const pp = searchParams.get("per_page");
//       if (cs) params.set("search_text", cs);
//       if (pp) params.set("per_page", pp);

//       const qs = params.toString();
//       router.push(qs ? `/products?${qs}` : `/products`);
//     },
//     [router, searchParams, categoryData]
//   );

//   // toggle by numeric id (ensures uniqueness)
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));
//         updateUrlWithFilters(selectedBrandIds, arr);
//         return arr;
//       });
//     },
//     [selectedBrandIds, updateUrlWithFilters]
//   );

//   const handleBrandToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedBrandIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));
//         updateUrlWithFilters(arr, selectedCategoryIds);
//         return arr;
//       });
//     },
//     [selectedCategoryIds, updateUrlWithFilters]
//   );

//   // infinite scroll observer
//   useEffect(() => {
//     if (!loadMoreRef.current) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isLoading && !isLoadingMore && currentPagination?.next_page_url) {
//           setIsLoadingMore(true);
//           setTimeout(() => {
//             const nextPage = currentPage + 1;
//             const catIds = normalizeIds(selectedCategoryIds);
//             const brIds = normalizeIds(selectedBrandIds);
//             const st = searchParams.get("search_text");
//             fetchProductsDebounced(catIds, brIds, st, nextPage);
//           }, 2000);
//         }
//       },
//       { root: null, rootMargin: "200px", threshold: 0.1 }
//     );
//     obs.observe(loadMoreRef.current);
//     return () => obs.disconnect();
//   }, [
//     isLoading,
//     isLoadingMore,
//     currentPagination,
//     currentPage,
//     selectedCategoryIds,
//     selectedBrandIds,
//     searchParams,
//     fetchProductsDebounced,
//   ]);

//   // grouped categories for UI (parent -> children)
//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter((category) => !category.parent_id);
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw)) parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null) parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents.map((p) => (typeof p === "number" ? p : parseInt(p, 10))).filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // helpers to render selected items (pull title from categoryData/brandsData)
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
//     return selectedBrandIds.map((id) => {
//       const br = brandsDataFilter.find((b) => Number(b.id) === Number(id));
//       return {
//         id,
//         title: br ? br.title : `Brand ${id}`,
//       };
//     });
//   }, [selectedBrandIds, brandsDataFilter]);

//   const filteredBrands = useMemo(() => {
//     return brandsDataFilter.filter((b) => b.title.toLowerCase().includes(brandSearchTerm.toLowerCase()));
//   }, [brandsDataFilter, brandSearchTerm]);

//   return (
//     <div>
//       <div className="container">
//         {/* Başlıq */}
//         <div className="filterTop topper">
//           <Link href="/">
//             <h1>Adentta</h1>
//           </Link>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products || "Products"}</h4>
//         </div>

//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ( {currentPagination?.total || filteredProducts.length} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           {/* Sidebar */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button className="filter-title" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Selected filters - desktop */}
//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleCategoryToggleById(cat.id)}>×</span>
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
//                 <button className="filter-titless">{t?.productsPageFilterTitle || "Filter"}</button>

//                 {/* Selected - mobile */}
//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleCategoryToggleById(cat.id)}>×</span>
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

//                 <button className="close-btn" onClick={() => setIsMobileFilterOpen(false)}>
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered" />

//                 {/* Categories */}
//                 <FilterAccordion title={t?.productsPageFilterCategoryTitle || "Category"}>
//                   <ul style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
//                     {groupedCategories.map(({ parent, children }) => {
//                       const parentProductCount = getProductCountForCategory(parent.id);
//                       const isParentSelected = selectedCategoryIds.some((c) => Number(c) === Number(parent.id));

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
//                             const childProductCount = getProductCountForCategory(child.id);
//                             const isChildSelected = selectedCategoryIds.some((c) => Number(c) === Number(child.id));
//                             return (
//                               <li
//                                 key={child.id}
//                                 onClick={() => handleCategoryToggleById(child.id)}
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.3rem",
//                                   fontWeight: isChildSelected ? "bold" : "normal",
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

//                 {/* Brands */}
//                 <FilterAccordion title={t?.productsPageFilterBrandsTitle || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="" />
//                     <input className="filterSrch" type="text" placeholder={t?.searchText || "Search..."} value={brandSearchTerm} onChange={(e) => setBrandSearchTerm(e.target.value)} />
//                   </div>
//                   <ul style={{ maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
//                     {filteredBrands.map((br) => {
//                       const isSelected = selectedBrandIds.some((b) => Number(b) === Number(br.id));
//                       return (
//                         <li
//                           key={br.id}
//                           onClick={() => handleBrandToggleById(br.id)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                             fontWeight: isSelected ? "bold" : "normal",
//                           }}
//                         >
//                           <input type="checkbox" checked={isSelected} readOnly />
//                           <span>{br.title}</span>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="applyBTN flex items-center mt-4 justify-center" onClick={() => setIsMobileFilterOpen(false)}>
//                   <ApplyBTN t={t} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <div className="productPageSortingInner">
//                   <span>{t?.sortBy || "Sort by"}</span>
//                   <ReactSelect t={t} value={sortOption} onChange={setSortOption} />
//                 </div>
//               </div>

//               <div className="row">
//                 {isLoading ? (
//                   <div className="loader-container">
//                     <div className="loader" />
//                   </div>
//                 ) : (
//                   sortedProducts.map((d) => <ProductCard key={d.id} product={d} t={t} />)
//                 )}
//               </div>
//             </div>

//             <div ref={loadMoreRef} style={{ height: "1px" }} />
//             {isLoadingMore && (
//               <div className="loader-container" style={{ margin: "1rem 0" }}>
//                 <div className="loader" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="productsPageDescription">
//           <h1>{categoryPageTitle ? categoryPageTitle : t?.productsPageCeoDescription || "Ceo description - Addenta product category"}</h1>

//           {showDetails && (
//             <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
//               <div className="page-description-content" dangerouslySetInnerHTML={{ __html: categoryPageDescription || "" }} />
//             </div>
//           )}

//           <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowDetails((prev) => !prev);
//               }}
//               style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", textDecoration: "none" }}
//             >
//               {showDetails ? t?.hideDetailsBtn || "Hide" : t?.seeMoreBtn || "See more"}
//               <img src="/icons/rightDown.svg" alt="" style={{ marginLeft: "0.25rem", transform: showDetails ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
//             </a>
//           </div>
//         </div>

//         <style jsx>{`
//           .loader-container {
//             width: 100% !important;
//             min-width: 97rem;
//             min-height: 10rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             padding: 5rem auto;
//           }
//           .loader {
//             border: 5px solid #98b4de;
//             border-top: 5px solid #293881;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             animation: spin 0.8s linear infinite;
//           }
//           @keyframes spin {
//             to {
//               transform: rotate(360deg);
//             }
//           }
//           .accordion-content {
//             max-height: 250px;
//             overflow-y: auto;
//           }
//           .productsPageDetailsCEO h1 {
//             margin-bottom: 0.5rem;
//           }
//           .page-description-content {
//             margin-bottom: 0.5rem;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }




// ?  // ?  boxtan kral nisterb

// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useCallback,
//   useRef,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion başlık komponenti
// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true);
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

// // Cache və utility-lər
// const productCache = new Map();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 dəq

// async function fetchProducts(
//   categoryIds = [],
//   brandIds = [],
//   searchText = "",
//   page = 1,
//   perPage = 24
// ) {
//   const cacheKey = JSON.stringify({
//     categoryIds,
//     brandIds,
//     searchText,
//     page,
//     perPage,
//   });

//   const cached = productCache.get(cacheKey);
//   if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//     return cached.data;
//   }

//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }

//   let url = `/page-data/product?per_page=${perPage}&page=${page}`;
//   if (searchText) url += `&search_text=${encodeURIComponent(searchText)}`;

//   if (filters.length) {
//     const query = filters
//       .map((f, idx) => {
//         const base = `filters[${idx}][key]=${encodeURIComponent(
//           f.key
//         )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//         const vals = f.values
//           .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//           .join("&");
//         return `${base}&${vals}`;
//       })
//       .join("&");
//     url += `&${query}`;
//   }

//   try {
//     const res = await axiosInstance.get(url);
//     const result = {
//       products: res.data.data.data,
//       pagination: res.data.data,
//     };
//     productCache.set(cacheKey, {
//       data: result,
//       timestamp: Date.now(),
//     });
//     return result;
//   } catch (err) {
//     console.error("Filter fetch error (client)", err);
//     return { products: [], pagination: null };
//   }
// }

// // slugify
// function slugify(text) {
//   if (!text) return "";
//   return text
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }

// // normalize id array (numeric, unique)
// const normalizeIds = (arr = []) =>
//   Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// // extract category ids from product robustly
// function extractCategoryIdsFromProduct(product) {
//   const ids = new Set();
//   if (!product) return [];
//   const raw =
//     product.categories ?? product.category_ids ?? product.category_list ?? product.category ?? null;

//   const pushId = (v) => {
//     if (v == null) return;
//     const n = typeof v === "number" ? v : Number(v);
//     if (!Number.isNaN(n)) ids.add(n);
//   };

//   if (Array.isArray(raw)) {
//     for (const item of raw) {
//       if (item == null) continue;
//       if (typeof item === "object") {
//         if (item.id) pushId(item.id);
//         else if (item.category_id) pushId(item.category_id);
//         else if (item.value) pushId(item.value);
//       } else {
//         pushId(item);
//       }
//     }
//   } else if (typeof raw === "object" && raw !== null) {
//     if (raw.id) pushId(raw.id);
//     else if (raw.category_id) pushId(raw.category_id);
//     else Object.keys(raw).forEach((k) => pushId(k));
//   } else if (typeof raw === "number" || typeof raw === "string") {
//     pushId(raw);
//   }

//   if (product.category_id) pushId(product.category_id);
//   if (product.category) pushId(product.category);

//   return Array.from(ids);
// }

// // Product card (memo)
// const ProductCard = React.memo(({ product, t }) => (
//   <div className="xl-4 lg-4 md-6 sm-6">
//     <Link href={`/products/${slugify(product.title)}-${product.id}`} className="block">
//       <div className="homePageProductCardContent">
//         <div className="homePageProCardImgs">
//           <div className="homePageProductCardContentImage">
//             <img src={`https://admin.adentta.az/storage${product.image}`} alt={product.title} loading="lazy" />
//           </div>
//         </div>
//         <div className="homePageProductCardContentInner">
//           <div className="homePageProductCardContentText">
//             <span>{product.title}</span>
//           </div>
//           <div className="price">
//             <div className="priceItem">
//               <strong id="prices">{product.price}</strong>
//               <Manat />
//             </div>
//           </div>
//         </div>
//         <div className="homePageProductCardContentBottom">
//           <span>{t?.learnMore || "Learn More"}</span>
//           <img src="/icons/arrowTopRight.svg" alt="" />
//         </div>
//       </div>
//     </Link>
//   </div>
// ));

// export default function ProductsPageFilter({
//   t,
//   allProducts = [],
//   initialProducts = [],
//   categoryData = [],
//   brandsDataFilter = [],
//   initialSelectedBrands = [],
//   initialSelectedCategories = [],
//   categoryMetaTitle = null,
//   categoryMetaDescription = null,
//   categoryPageTitle = null,
//   categoryPageDescription = null,
//   categoryId = null,
//   searchText = null,
//   perPage = 24,
//   pagination = null,
//   productCounts = {},
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // initial selected ids (normalize)
//   const initialCatIds = normalizeIds(
//     (initialSelectedCategories || []).map((c) => (c && c.id ? c.id : null))
//   );
//   const initialBrandIds = normalizeIds(
//     (initialSelectedBrands || []).map((b) => (b && b.id ? b.id : null))
//   );

//   const [filteredProducts, setFilteredProducts] = useState(initialProducts);
//   const [currentPagination, setPagination] = useState(pagination);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState(initialCatIds);
//   const [selectedBrandIds, setSelectedBrandIds] = useState(initialBrandIds);
//   const [sortOption, setSortOption] = useState({
//     value: "az",
//     label: t?.from || "From A-Z",
//   });
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const loadMoreRef = useRef(null);
//   const debounceTimeoutRef = useRef(null);

//   const fetchProductsDebounced = useCallback(
//     async (categoryIds, brandIds, searchTextParam, page = 1) => {
//       if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
//       debounceTimeoutRef.current = setTimeout(async () => {
//         setIsLoading(true);
//         try {
//           const { products, pagination: newPagination } = await fetchProducts(
//             categoryIds,
//             brandIds,
//             searchTextParam,
//             page,
//             perPage
//           );
//           if (page === 1) setFilteredProducts(products);
//           else setFilteredProducts((prev) => [...prev, ...products]);
//           setPagination(newPagination);
//           setCurrentPage(page);
//         } catch {
//           if (page === 1) setFilteredProducts([]);
//         } finally {
//           setIsLoading(false);
//           setIsLoadingMore(false);
//         }
//       }, 30000);
//     },
//     [perPage]
//   );

//   // YENİ: Daha dəqiq kateqoriya-məhsul xəritəsi
//   const categoryToProducts = useMemo(() => {
//     const map = new Map();
//     if (!Array.isArray(allProducts)) return map;
    
//     for (const product of allProducts) {
//       const productId = product?.id ?? product?.product_id;
//       if (!productId) continue;
      
//       const categoryIds = extractCategoryIdsFromProduct(product);
      
//       for (const categoryId of categoryIds) {
//         const numericCategoryId = Number(categoryId);
//         if (Number.isNaN(numericCategoryId)) continue;
        
//         if (!map.has(numericCategoryId)) {
//           map.set(numericCategoryId, new Set());
//         }
//         map.get(numericCategoryId).add(Number(productId));
//       }
//     }
    
//     return map;
//   }, [allProducts]);

//   // YENİ: Daha səmərəli və dəqiq kateqoriya məhsul sayı hesablama funksiyası
//   const getProductCountForCategory = useCallback((categoryId) => {
//     const numericId = Number(categoryId);
    
//     // Birinci backend productCounts-dan yoxlayırıq
//     const backendCounts = productCounts?.categories;
//     if (backendCounts) {
//       if (typeof backendCounts === 'object' && !Array.isArray(backendCounts)) {
//         const count = backendCounts[numericId] ?? backendCounts[numericId.toString()];
//         if (typeof count === 'number' && count >= 0) {
//           return count;
//         }
//       }
//       if (Array.isArray(backendCounts)) {
//         const found = backendCounts.find(c => 
//           Number(c?.id || c?.category_id) === numericId
//         );
//         if (found && typeof (found.count || found.total || found.product_count) === 'number') {
//           return found.count || found.total || found.product_count;
//         }
//       }
//     }
    
//     // Backend-də məlumat yoxdursa, client-side hesablayırıq
//     // MƏMƏM: Yalnız həmin kateqoriyanın birbaşa məhsullarını sayırıq (alt kateqoriyalar daxil edilmir)
//     const productsInCategory = categoryToProducts.get(numericId);
//     return productsInCategory ? productsInCategory.size : 0;
    
//   }, [productCounts, categoryToProducts]);

//   // When URL/search change -> derive ids and fetch
//   useEffect(() => {
//     const catParam = searchParams.get("category");
//     const brParam = searchParams.get("brands");
//     const stParam = searchParams.get("search_text");

//     const slugs = catParam ? catParam.split(",").filter(Boolean) : [];
//     const slugToId = (slug) => {
//       const found = categoryData.find((c) => c.url_slug === slug);
//       return found ? Number(found.id) : null;
//     };
//     const newCatIds = normalizeIds(slugs.map(slugToId));

//     const brIds = brParam
//       ? brParam
//           .split(",")
//           .map((s) => Number(s))
//           .filter((n) => !Number.isNaN(n))
//       : [];
//     const newBrandIds = normalizeIds(brIds);

//     setSelectedCategoryIds(newCatIds);
//     setSelectedBrandIds(newBrandIds);
//     setShowDetails(false);
//     fetchProductsDebounced(newCatIds, newBrandIds, stParam, 1);
//   }, [searchParams.toString(), categoryData, brandsDataFilter, fetchProductsDebounced]);

//   const sortedProducts = useMemo(() => {
//     return sortOption.value === "az"
//       ? [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))
//       : [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
//   }, [filteredProducts, sortOption.value]);

//   // update URL with unique slugs
//   const updateUrlWithFilters = useCallback(
//     (brandIdsArr = [], categoryIdsArr = []) => {
//       const params = new URLSearchParams();

//       const uniqueCatIds = normalizeIds(categoryIdsArr);
//       const catSlugs = uniqueCatIds
//         .map((id) => {
//           const found = categoryData.find((c) => Number(c.id) === Number(id));
//           return found ? found.url_slug : null;
//         })
//         .filter(Boolean);
//       const uniqueSlugs = Array.from(new Set(catSlugs));
//       if (uniqueSlugs.length) params.set("category", uniqueSlugs.join(","));

//       const uniqueBrandIds = normalizeIds(brandIdsArr);
//       if (uniqueBrandIds.length) params.set("brands", uniqueBrandIds.join(","));

//       const cs = searchParams.get("search_text");
//       const pp = searchParams.get("per_page");
//       if (cs) params.set("search_text", cs);
//       if (pp) params.set("per_page", pp);

//       const qs = params.toString();
//       router.push(qs ? `/products?${qs}` : `/products`);
//     },
//     [router, searchParams, categoryData]
//   );

//   // toggle by numeric id (ensures uniqueness)
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));
//         updateUrlWithFilters(selectedBrandIds, arr);
//         return arr;
//       });
//     },
//     [selectedBrandIds, updateUrlWithFilters]
//   );

//   const handleBrandToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);
//       setSelectedBrandIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));
//         updateUrlWithFilters(arr, selectedCategoryIds);
//         return arr;
//       });
//     },
//     [selectedCategoryIds, updateUrlWithFilters]
//   );

//   // YENİ: Düzgün infinite scroll observer - layout pozulması problemi həll edildi
//   useEffect(() => {
//     if (!loadMoreRef.current) return;
    
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (
//           entry.isIntersecting && 
//           !isLoading && 
//           !isLoadingMore && 
//           currentPagination?.next_page_url &&
//           filteredProducts.length > 0 // Bu şərt əlavə edildi
//         ) {
//           setIsLoadingMore(true);
          
//           // Kiçik gecikmə əlavə edildi ki, layout stabil olsun
//           setTimeout(() => {
//             const nextPage = currentPage + 1;
//             const catIds = normalizeIds(selectedCategoryIds);
//             const brIds = normalizeIds(selectedBrandIds);
//             const st = searchParams.get("search_text");
//             fetchProductsDebounced(catIds, brIds, st, nextPage);
//           }, 100); // 2000-dən 100-ə endirdik
//         }
//       },
//       { 
//         root: null, 
//         rootMargin: "50px", // 200px-dən 50px-ə endirdik
//         threshold: 0.1 
//       }
//     );
    
//     observer.observe(loadMoreRef.current);
    
//     return () => observer.disconnect();
//   }, [
//     isLoading,
//     isLoadingMore,
//     currentPagination,
//     currentPage,
//     selectedCategoryIds,
//     selectedBrandIds,
//     searchParams,
//     fetchProductsDebounced,
//     filteredProducts.length // Bu dependency əlavə edildi
//   ]);

//   // grouped categories for UI (parent -> children)
//   const groupedCategories = useMemo(() => {
//     const parentCategories = categoryData.filter((category) => !category.parent_id);
//     return parentCategories.map((parentCategory) => {
//       const children = categoryData.filter((sub) => {
//         const parentRaw = sub.parent_id;
//         if (!parentRaw) return false;
//         let parents = [];
//         if (Array.isArray(parentRaw)) parents = parentRaw.map((p) => (typeof p === "object" ? p.id : p));
//         else if (typeof parentRaw === "object" && parentRaw.id != null) parents = [parentRaw.id];
//         else parents = [parentRaw];
//         const numericParents = parents.map((p) => (typeof p === "number" ? p : parseInt(p, 10))).filter(Boolean);
//         return numericParents.includes(parentCategory.id);
//       });
//       return { parent: parentCategory, children };
//     });
//   }, [categoryData]);

//   // helpers to render selected items (pull title from categoryData/brandsData)
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
//     return selectedBrandIds.map((id) => {
//       const br = brandsDataFilter.find((b) => Number(b.id) === Number(id));
//       return {
//         id,
//         title: br ? br.title : `Brand ${id}`,
//       };
//     });
//   }, [selectedBrandIds, brandsDataFilter]);

//   const filteredBrands = useMemo(() => {
//     return brandsDataFilter.filter((b) => b.title.toLowerCase().includes(brandSearchTerm.toLowerCase()));
//   }, [brandsDataFilter, brandSearchTerm]);

//   return (
//     <div>
//       <div className="container">
//         {/* Başlıq */}
//         <div className="filterTop topper">
//           <Link href="/">
//             <h1>Adentta</h1>
//           </Link>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products || "Products"}</h4>
//         </div>

//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ( {currentPagination?.total || filteredProducts.length} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           {/* Sidebar */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button className="filter-title" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Selected filters - desktop */}
//               <div className="selectedFilter desktop-only">
//                 {renderSelectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleCategoryToggleById(cat.id)}>×</span>
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
//                 <button className="filter-titless">{t?.productsPageFilterTitle || "Filter"}</button>

//                 {/* Selected - mobile */}
//                 <div className="selectedFilter mobile-only">
//                   {renderSelectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleCategoryToggleById(cat.id)}>×</span>
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

//                 <button className="close-btn" onClick={() => setIsMobileFilterOpen(false)}>
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered" />

//                 {/* Categories */}
//                 <FilterAccordion title={t?.productsPageFilterCategoryTitle || "Category"}>
//                   <ul style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
//                     {groupedCategories.map(({ parent, children }) => {
//                       const parentProductCount = getProductCountForCategory(parent.id);
//                       const isParentSelected = selectedCategoryIds.some((c) => Number(c) === Number(parent.id));

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
//                             const childProductCount = getProductCountForCategory(child.id);
//                             const isChildSelected = selectedCategoryIds.some((c) => Number(c) === Number(child.id));
//                             return (
//                               <li
//                                 key={child.id}
//                                 onClick={() => handleCategoryToggleById(child.id)}
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.3rem",
//                                   fontWeight: isChildSelected ? "bold" : "normal",
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

//                 {/* Brands */}
//                 <FilterAccordion title={t?.productsPageFilterBrandsTitle || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="" />
//                     <input className="filterSrch" type="text" placeholder={t?.searchText || "Search..."} value={brandSearchTerm} onChange={(e) => setBrandSearchTerm(e.target.value)} />
//                   </div>
//                   <ul style={{ maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
//                     {filteredBrands.map((br) => {
//                       const isSelected = selectedBrandIds.some((b) => Number(b) === Number(br.id));
//                       return (
//                         <li
//                           key={br.id}
//                           onClick={() => handleBrandToggleById(br.id)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                             fontWeight: isSelected ? "bold" : "normal",
//                           }}
//                         >
//                           <input type="checkbox" checked={isSelected} readOnly />
//                           <span>{br.title}</span>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="applyBTN flex items-center mt-4 justify-center" onClick={() => setIsMobileFilterOpen(false)}>
//                   <ApplyBTN t={t} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <div className="productPageSortingInner">
//                   <span>{t?.sortBy || "Sort by"}</span>
//                   <ReactSelect t={t} value={sortOption} onChange={setSortOption} />
//                 </div>
//               </div>

//               <div className="row">
//                 {isLoading ? (
//                   <div className="loader-container">
//                     <div className="loader" />
//                   </div>
//                 ) : (
//                   sortedProducts.map((d) => <ProductCard key={d.id} product={d} t={t} />)
//                 )}
//               </div>
//             </div>

//             {/* YENİ: Loading trigger elementi daha aşağıda yerləşdirildi */}
//             {!isLoading && sortedProducts.length > 0 && (
//               <div ref={loadMoreRef} style={{ 
//                 height: "20px", 
//                 margin: "20px 0",
//                 visibility: "hidden" 
//               }} />
//             )}
            
//             {/* YENİ: Loading state daha yaxşı göstərilir */}
//             {isLoadingMore && (
//               <div className="loading-more-container">
//                 <div className="loader" />
//                 <p style={{ textAlign: "center", marginTop: "10px" }}>
//                   {t?.loadingMore || "Loading more products..."}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="productsPageDescription">
//           <h1>{categoryPageTitle ? categoryPageTitle : t?.productsPageCeoDescription || "Ceo description - Addenta product category"}</h1>

//           {showDetails && (
//             <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
//               <div className="page-description-content" dangerouslySetInnerHTML={{ __html: categoryPageDescription || "" }} />
//             </div>
//           )}

//           <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowDetails((prev) => !prev);
//               }}
//               style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", textDecoration: "none" }}
//             >
//               {showDetails ? t?.hideDetailsBtn || "Hide" : t?.seeMoreBtn || "See more"}
//               <img src="/icons/rightDown.svg" alt="" style={{ marginLeft: "0.25rem", transform: showDetails ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
//             </a>
//           </div>
//         </div>

//         <style jsx>{`
//           .loader-container {
//             width: 100% !important;
//             min-width: 97rem;
//             min-height: 10rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             padding: 5rem auto;
//           }
//           .loading-more-container {
//             width: 100%;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             padding: 2rem 0;
//             margin: 2rem 0;
//             background: rgba(152, 180, 222, 0.05);
//             border-radius: 8px;
//           }
//           .loader {
//             border: 5px solid #98b4de;
//             border-top: 5px solid #293881;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             animation: spin 0.8s linear infinite;
//           }
//           @keyframes spin {
//             to {
//               transform: rotate(360deg);
//             }
//           }
//           .accordion-content {
//             max-height: 250px;
//             overflow-y: auto;
//           }
//           .productsPageDetailsCEO h1 {
//             margin-bottom: 0.5rem;
//           }
//           .page-description-content {
//             margin-bottom: 0.5rem;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// ?  boxtan kral












// ! infinite isledi burda



























// ! DWAYNO JONSHON 15IFJR
// ? EN KRAL PADISAH SENSIN ASLANIM
"use client";
import Link from "next/link";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadMoreBTN from "./LoadMoreBTN";
import ApplyBTN from "./ApplyBTN";
import ReactSelect from "./ReactSelect";
import Manat from "../../public/icons/manat.svg";
import axiosInstance from "@/lib/axios";

// Accordion başlık komponenti
const FilterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
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

// OPTIMIZED CACHE: Smarter caching with TTL and size limits
class OptimizedCache {
  constructor(maxSize = 100, ttl = 3 * 60 * 1000) { // 3 minutes
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    // Move to end (LRU behavior)
    this.cache.delete(key);
    this.cache.set(key, item);
    return item.data;
  }

  set(key, data) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear() {
    this.cache.clear();
  }
}

const productCache = new OptimizedCache();

// PERFORMANCE BOOST: Reduced debounce time and optimized fetch
async function fetchProducts(
  categoryIds = [],
  brandIds = [],
  searchText = "",
  page = 1,
  perPage = 24
) {
  const cacheKey = JSON.stringify({
    categoryIds: categoryIds.sort(),
    brandIds: brandIds.sort(),
    searchText,
    page,
    perPage,
  });

  const cached = productCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const filters = [];
  if (categoryIds.length) {
    filters.push({ key: "categories", operator: "IN", values: categoryIds });
  }
  if (brandIds.length) {
    filters.push({ key: "brands", operator: "IN", values: brandIds });
  }

  let url = `/page-data/product?per_page=${perPage}&page=${page}`;
  if (searchText) url += `&search_text=${encodeURIComponent(searchText)}`;

  if (filters.length) {
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
    url += `&${query}`;
  }

  try {
    const res = await axiosInstance.get(url);
    const result = {
      products: res.data.data.data,
      pagination: res.data.data,
    };
    
    productCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.error("Filter fetch error (client)", err);
    return { products: [], pagination: null };
  }
}

// slugify
function slugify(text) {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// normalize id array (numeric, unique)
const normalizeIds = (arr = []) =>
  Array.from(new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v))));

// OPTIMIZED: More efficient category extraction
function extractCategoryIdsFromProduct(product) {
  const ids = new Set();
  if (!product) return [];
  
  const extractFromValue = (value) => {
    if (value == null) return;
    if (typeof value === 'number' && !Number.isNaN(value)) {
      ids.add(value);
    } else if (typeof value === 'string') {
      const num = Number(value);
      if (!Number.isNaN(num)) ids.add(num);
    } else if (typeof value === 'object' && value !== null) {
      if (value.id != null) extractFromValue(value.id);
      if (value.category_id != null) extractFromValue(value.category_id);
      if (value.value != null) extractFromValue(value.value);
    }
  };

  // Check various possible category fields
  const categoryFields = [
    'categories', 'category_ids', 'category_list', 
    'category', 'category_id'
  ];
  
  for (const field of categoryFields) {
    const value = product[field];
    if (Array.isArray(value)) {
      value.forEach(extractFromValue);
    } else if (value != null) {
      extractFromValue(value);
    }
  }

  return Array.from(ids);
}

// OPTIMIZED: Memoized product card with better performance
const ProductCard = React.memo(({ product, t }) => (
  <div className="xl-4 lg-4 md-6 sm-6">
    <Link href={`/products/${slugify(product.title)}-${product.id}`} className="block">
      <div className="homePageProductCardContent">
        <div className="homePageProCardImgs">
          <div className="homePageProductCardContentImage">
            <img src={`https://admin.adentta.az/storage${product.image}`} alt={product.title} loading="lazy" />
          </div>
        </div>
        <div className="homePageProductCardContentInner">
          <div className="homePageProductCardContentText">
            <span>{product.title}</span>
          </div>
          <div className="price">
            <div className="priceItem">
              <strong id="prices">{product.price}</strong>
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
), (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id && 
         prevProps.product.price === nextProps.product.price;
});

export default function ProductsPageFilter({
  t,
  allProducts = [],
  initialProducts = [],
  categoryData = [],
  brandsDataFilter = [],
  initialSelectedBrands = [],
  initialSelectedCategories = [],
  categoryMetaTitle = null,
  categoryMetaDescription = null,
  categoryPageTitle = null,
  categoryPageDescription = null,
  categoryId = null,
  searchText = null,
  perPage = 24,
  pagination = null,
  productCounts = {},
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // initial selected ids (normalize)
  const initialCatIds = normalizeIds(
    (initialSelectedCategories || []).map((c) => (c && c.id ? c.id : null))
  );
  const initialBrandIds = normalizeIds(
    (initialSelectedBrands || []).map((b) => (b && b.id ? b.id : null))
  );

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [currentPagination, setPagination] = useState(pagination);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(initialCatIds);
  const [selectedBrandIds, setSelectedBrandIds] = useState(initialBrandIds);
  const [sortOption, setSortOption] = useState({
    value: "az",
    label: t?.from || "From A-Z",
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  // PERFORMANCE IMPROVEMENT: Reduced debounce from 2000ms to 300ms
  const fetchProductsDebounced = useCallback(
    async (categoryIds, brandIds, searchTextParam, page = 1) => {
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const { products, pagination: newPagination } = await fetchProducts(
            categoryIds,
            brandIds,
            searchTextParam,
            page,
            perPage
          );
          if (page === 1) setFilteredProducts(products);
          else setFilteredProducts((prev) => [...prev, ...products]);
          setPagination(newPagination);
          setCurrentPage(page);
        } catch {
          if (page === 1) setFilteredProducts([]);
        } finally {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }, 300); // Reduced from 2000ms to 300ms
    },
    [perPage]
  );

  // PERSISTENT PRODUCT COUNTS: Store counts globally to prevent loss on rerender
  const persistentProductCounts = useMemo(() => {
    // Create a stable reference that persists across rerenders
    if (!window.globalProductCounts) {
      window.globalProductCounts = new Map();
    }
    
    // Update with latest data
    if (productCounts?.categories) {
      Object.entries(productCounts.categories).forEach(([catId, count]) => {
        window.globalProductCounts.set(Number(catId), count);
      });
    }
    
    return window.globalProductCounts;
  }, [productCounts]);

  // OPTIMIZED: Enhanced category-product mapping with persistent storage
  const categoryToProducts = useMemo(() => {
    if (!window.globalCategoryProductMap) {
      window.globalCategoryProductMap = new Map();
    }
    
    const map = window.globalCategoryProductMap;
    
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      // Clear and rebuild map only if we have new data
      map.clear();
      
      for (const product of allProducts) {
        const productId = product?.id ?? product?.product_id;
        if (!productId) continue;
        
        const categoryIds = extractCategoryIdsFromProduct(product);
        
        for (const categoryId of categoryIds) {
          const numericCategoryId = Number(categoryId);
          if (Number.isNaN(numericCategoryId)) continue;
          
          if (!map.has(numericCategoryId)) {
            map.set(numericCategoryId, new Set());
          }
          map.get(numericCategoryId).add(Number(productId));
        }
      }
    }
    
    return map;
  }, [allProducts]);

  // ENHANCED: Product count calculation with fallback and persistence
  const getProductCountForCategory = useCallback((categoryId) => {
    const numericId = Number(categoryId);
    
    // Priority 1: Check persistent global counts
    if (persistentProductCounts.has(numericId)) {
      return persistentProductCounts.get(numericId);
    }
    
    // Priority 2: Check backend productCounts
    const backendCounts = productCounts?.categories;
    if (backendCounts) {
      if (typeof backendCounts === 'object' && !Array.isArray(backendCounts)) {
        const count = backendCounts[numericId] ?? backendCounts[numericId.toString()];
        if (typeof count === 'number' && count >= 0) {
          persistentProductCounts.set(numericId, count);
          return count;
        }
      }
      if (Array.isArray(backendCounts)) {
        const found = backendCounts.find(c => 
          Number(c?.id || c?.category_id) === numericId
        );
        if (found && typeof (found.count || found.total || found.product_count) === 'number') {
          const count = found.count || found.total || found.product_count;
          persistentProductCounts.set(numericId, count);
          return count;
        }
      }
    }
    
    // Priority 3: Calculate from client-side data
    const productsInCategory = categoryToProducts.get(numericId);
    const count = productsInCategory ? productsInCategory.size : 0;
    persistentProductCounts.set(numericId, count);
    return count;
    
  }, [productCounts, categoryToProducts, persistentProductCounts]);

  // OPTIMIZED: URL parameter handling with better performance
  useEffect(() => {
    const catParam = searchParams.get("category");
    const brParam = searchParams.get("brands");
    const stParam = searchParams.get("search_text");

    const slugs = catParam ? catParam.split(",").filter(Boolean) : [];
    const slugToId = (slug) => {
      const found = categoryData.find((c) => c.url_slug === slug);
      return found ? Number(found.id) : null;
    };
    const newCatIds = normalizeIds(slugs.map(slugToId));

    const brIds = brParam
      ? brParam
          .split(",")
          .map((s) => Number(s))
          .filter((n) => !Number.isNaN(n))
      : [];
    const newBrandIds = normalizeIds(brIds);

    setSelectedCategoryIds(newCatIds);
    setSelectedBrandIds(newBrandIds);
    setShowDetails(false);
    fetchProductsDebounced(newCatIds, newBrandIds, stParam, 1);
  }, [searchParams.toString(), categoryData, brandsDataFilter, fetchProductsDebounced]);

  const sortedProducts = useMemo(() => {
    return sortOption.value === "az"
      ? [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))
      : [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
  }, [filteredProducts, sortOption.value]);

  // OPTIMIZED: URL update with debouncing
  const updateUrlWithFilters = useCallback(
    (brandIdsArr = [], categoryIdsArr = []) => {
      const params = new URLSearchParams();

      const uniqueCatIds = normalizeIds(categoryIdsArr);
      const catSlugs = uniqueCatIds
        .map((id) => {
          const found = categoryData.find((c) => Number(c.id) === Number(id));
          return found ? found.url_slug : null;
        })
        .filter(Boolean);
      const uniqueSlugs = Array.from(new Set(catSlugs));
      if (uniqueSlugs.length) params.set("category", uniqueSlugs.join(","));

      const uniqueBrandIds = normalizeIds(brandIdsArr);
      if (uniqueBrandIds.length) params.set("brands", uniqueBrandIds.join(","));

      const cs = searchParams.get("search_text");
      const pp = searchParams.get("per_page");
      if (cs) params.set("search_text", cs);
      if (pp) params.set("per_page", pp);

      const qs = params.toString();
      router.push(qs ? `/products?${qs}` : `/products`);
    },
    [router, searchParams, categoryData]
  );

  // PERFORMANCE OPTIMIZED: Toggle handlers with immediate UI feedback
  const handleCategoryToggleById = useCallback(
    (id) => {
      const numeric = Number(id);
      setSelectedCategoryIds((prev) => {
        const set = new Set(prev.map((v) => Number(v)));
        if (set.has(numeric)) set.delete(numeric);
        else set.add(numeric);
        const arr = normalizeIds(Array.from(set));
        
        // Immediate URL update for better UX
        setTimeout(() => updateUrlWithFilters(selectedBrandIds, arr), 0);
        return arr;
      });
    },
    [selectedBrandIds, updateUrlWithFilters]
  );

  const handleBrandToggleById = useCallback(
    (id) => {
      const numeric = Number(id);
      setSelectedBrandIds((prev) => {
        const set = new Set(prev.map((v) => Number(v)));
        if (set.has(numeric)) set.delete(numeric);
        else set.add(numeric);
        const arr = normalizeIds(Array.from(set));
        
        // Immediate URL update for better UX
        setTimeout(() => updateUrlWithFilters(arr, selectedCategoryIds), 0);
        return arr;
      });
    },
    [selectedCategoryIds, updateUrlWithFilters]
  );

  // OPTIMIZED: Improved infinite scroll with better performance
  useEffect(() => {
    if (!loadMoreRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting && 
          !isLoading && 
          !isLoadingMore && 
          currentPagination?.next_page_url &&
          filteredProducts.length > 0
        ) {
          setIsLoadingMore(true);
          
          const nextPage = currentPage + 1;
          const catIds = normalizeIds(selectedCategoryIds);
          const brIds = normalizeIds(selectedBrandIds);
          const st = searchParams.get("search_text");
          fetchProductsDebounced(catIds, brIds, st, nextPage);
        }
      },
      { 
        root: null, 
        rootMargin: "100px",
        threshold: 0.1 
      }
    );
    
    observer.observe(loadMoreRef.current);
    
    return () => observer.disconnect();
  }, [
    isLoading,
    isLoadingMore,
    currentPagination,
    currentPage,
    selectedCategoryIds,
    selectedBrandIds,
    searchParams,
    fetchProductsDebounced,
    filteredProducts.length
  ]);

  // OPTIMIZED: Memoized grouped categories with better performance
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

  // MEMOIZED: Selected items rendering
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
    return selectedBrandIds.map((id) => {
      const br = brandsDataFilter.find((b) => Number(b.id) === Number(id));
      return {
        id,
        title: br ? br.title : `Brand ${id}`,
      };
    });
  }, [selectedBrandIds, brandsDataFilter]);

  const filteredBrands = useMemo(() => {
    return brandsDataFilter.filter((b) => b.title.toLowerCase().includes(brandSearchTerm.toLowerCase()));
  }, [brandsDataFilter, brandSearchTerm]);

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

        <div className="searchResultsProductCount">
          {searchText && (
            <div className="search-results-info">
              <p>
                {t?.searchResults || "results found for"} "{searchText}" ( {currentPagination?.total || filteredProducts.length} )
              </p>
            </div>
          )}
        </div>

        <div className="row">
          {/* Sidebar */}
          <div className="xl-3 lg-3 md-3 sm-12">
            <div className="filter-container">
              <button className="filter-title" onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
                {t?.productsPageFilterTitle || "Filter"}
              </button>

              {/* Selected filters - desktop */}
              <div className="selectedFilter desktop-only">
                {renderSelectedCategories.map((cat) => (
                  <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                    <span onClick={() => handleCategoryToggleById(cat.id)}>×</span>
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
                <button className="filter-titless">{t?.productsPageFilterTitle || "Filter"}</button>

                {/* Selected - mobile */}
                <div className="selectedFilter mobile-only">
                  {renderSelectedCategories.map((cat) => (
                    <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                      <span onClick={() => handleCategoryToggleById(cat.id)}>×</span>
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

                <button className="close-btn" onClick={() => setIsMobileFilterOpen(false)}>
                  <img src="/icons/popupCloseIcon.svg" alt="close" />
                </button>

                <div className="lineFiltered" />

                {/* Categories */}
                <FilterAccordion title={t?.productsPageFilterCategoryTitle || "Category"}>
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

                {/* Brands */}
                <FilterAccordion title={t?.productsPageFilterBrandsTitle || "Brands"}>
                  <div className="filteredSearch">
                    <img src="/icons/searchIcon.svg" alt="" />
                    <input className="filterSrch" type="text" placeholder={t?.searchText || "Search..."} value={brandSearchTerm} onChange={(e) => setBrandSearchTerm(e.target.value)} />
                  </div>
                  <ul style={{ maxHeight: "250px", overflowY: "auto", paddingRight: "4px" }}>
                    {filteredBrands.map((br) => {
                      const isSelected = selectedBrandIds.some((b) => Number(b) === Number(br.id));
                      return (
                        <li
                          key={br.id}
                          onClick={() => handleBrandToggleById(br.id)}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: isSelected ? "bold" : "normal",
                          }}
                        >
                          <input type="checkbox" checked={isSelected} readOnly />
                          <span>{br.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </FilterAccordion>

                <div className="applyBTN flex items-center mt-4 justify-center" onClick={() => setIsMobileFilterOpen(false)}>
                  <ApplyBTN t={t} />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="xl-9 lg-9 md-9 sm-12">
            <div className="productPageCards">
              <div className="productPageSorting">
                <div className="productPageSortingInner">
                  <span>{t?.sortBy || "Sort by"}</span>
                  <ReactSelect t={t} value={sortOption} onChange={setSortOption} />
                </div>
              </div>

              <div className="row">
                {isLoading ? (
                  <div className="loader-container">
                    <div className="loader" />
                  </div>
                ) : (
                  sortedProducts.map((d) => <ProductCard key={d.id} product={d} t={t} />)
                )}
              </div>
            </div>

            {/* Loading trigger element */}
            {!isLoading && sortedProducts.length > 0 && (
              <div ref={loadMoreRef} style={{ 
                height: "20px", 
                margin: "20px 0",
                visibility: "hidden" 
              }} />
            )}
            
            {/* Loading state */}
            {isLoadingMore && (
              <div className="loading-more-container">
                <div className="loader" />
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="productsPageDescription">
          <h1>{categoryPageTitle ? categoryPageTitle : t?.productsPageCeoDescription || "Ceo description - Addenta product category"}</h1>

          {showDetails && (
            <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
              <div className="page-description-content" dangerouslySetInnerHTML={{ __html: categoryPageDescription || "" }} />
            </div>
          )}

          <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowDetails((prev) => !prev);
              }}
              style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", textDecoration: "none" }}
            >
              {showDetails ? t?.hideDetailsBtn || "Hide" : t?.seeMoreBtn || "See more"}
              <img src="/icons/rightDown.svg" alt="" style={{ marginLeft: "0.25rem", transform: showDetails ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </a>
          </div>
        </div>

        <style jsx>{`
          .loader-container {
            width: 100% !important;
            min-width: 97rem;
            min-height: 10rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5rem auto;
          }
          .loading-more-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem 0;
            margin: 2rem 0;
            border-radius: 8px;
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
          .accordion-content {
            max-height: 250px;
            overflow-y: auto;
          }
          .productsPageDetailsCEO h1 {
            margin-bottom: 0.5rem;
          }
          .page-description-content {
            margin-bottom: 0.5rem;
          }
        `}</style>
      </div>
    </div>
  );
}
// ? EN KRAL PADISAH SENSIN ASLANIM
// ! DWAYNO JONSHON 15IFJR































































// ! sen kisisen manaf COX KOHNE KODDUR BU
// // File: components/ProductsPageFilter.jsx
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useCallback,
//   useRef,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion başlık komponenti (className'ler orijinal)
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

// // Optimized client-side fetch with caching
// const productCache = new Map();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// async function fetchProducts(categoryIds = [], brandIds = [], searchText = "", page = 1, perPage = 24) {
//   const cacheKey = JSON.stringify({ categoryIds, brandIds, searchText, page, perPage });

//   // Check cache first
//   const cached = productCache.get(cacheKey);
//   if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//     return cached.data;
//   }

//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }

//   let url = `/page-data/product?per_page=${perPage}&page=${page}`;

//   if (searchText) {
//     url += `&search_text=${encodeURIComponent(searchText)}`;
//   }

//   if (filters.length) {
//     const query = filters
//       .map((f, idx) => {
//         const base = `filters[${idx}][key]=${encodeURIComponent(
//           f.key
//         )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//         const vals = f.values
//           .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//           .join("&");
//         return `${base}&${vals}`;
//       })
//       .join("&");
//     url += `&${query}`;
//   }

//   try {
//     const res = await axiosInstance.get(url);
//     const result = {
//       products: res.data.data.data,
//       pagination: res.data.data
//     };

//     // Cache the result
//     productCache.set(cacheKey, {
//       data: result,
//       timestamp: Date.now()
//     });

//     return result;
//   } catch (err) {
//     console.error("Filter fetch error (client)", err);
//     return { products: [], pagination: null };
//   }
// }

// // Güvenli slugify utility
// function slugify(text) {
//   if (!text) return "";
//   return text
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }

// // Memoized product card component
// const ProductCard = React.memo(({ product, t, slugify }) => (
//   <div className="xl-4 lg-4 md-6 sm-6">
//     <Link
//       href={`/products/${slugify(product.title)}-${product.id}`}
//       className="block"
//     >
//       <div className="homePageProductCardContent">
//         <div className="homePageProCardImgs">
//           <div className="homePageProductCardContentImage">
//             <img
//               src={`https://admin.adentta.az/storage${product.image}`}
//               alt={product.title}
//               loading="lazy"
//             />
//           </div>
//         </div>
//         <div className="homePageProductCardContentInner">
//           <div className="homePageProductCardContentText">
//             <span>{product.title}</span>
//           </div>
//           <div className="price">
//             <div className="priceItem">
//               <strong id="prices">{product.price}</strong>
//               <Manat />
//             </div>
//           </div>
//         </div>
//         <div className="homePageProductCardContentBottom">
//           <span>{t?.learnMore || "Learn More"}</span>
//           <img src="/icons/arrowTopRight.svg" alt="" />
//         </div>
//       </div>
//     </Link>
//   </div>
// ));

// export default function ProductsPageFilter({
//   t,
//   allProducts = [],
//   initialProducts = [],
//   categoryData = [],
//   brandsDataFilter = [],
//   initialSelectedBrands = [],
//   initialSelectedCategories = [],
//   categoryMetaTitle = null,
//   categoryMetaDescription = null,
//   categoryPageTitle = null,
//   categoryPageDescription = null,
//   categoryId = null,
//   searchText = null,
//   perPage = 24,
//   pagination = null,
//   productCounts = {}
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [filteredProducts, setFilteredProducts] = useState(initialProducts);
//   const [currentPagination, setPagination] = useState(pagination);
//   const [selectedCategories, setSelectedCategories] = useState(
//     initialSelectedCategories
//   );
//   const [selectedBrands, setSelectedBrands] = useState(initialSelectedBrands);
//   const [sortOption, setSortOption] = useState({
//     value: "az",
//     label: t?.from || "From A-Z",
//   });
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const loadMoreRef = useRef(null);
//   const debounceTimeoutRef = useRef(null);

//   const fetchProductsDebounced = useCallback(async (categoryIds, brandIds, searchTextParam, page = 1) => {
//     if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
//     debounceTimeoutRef.current = setTimeout(async () => {
//       setIsLoading(true);
//       try {
//         const { products, pagination: newPagination } = await fetchProducts(
//           categoryIds,
//           brandIds,
//           searchTextParam,
//           page,
//           perPage
//         );
//         if (page === 1) setFilteredProducts(products);
//         else setFilteredProducts(prev => [...prev, ...products]);
//         setPagination(newPagination);
//         setCurrentPage(page);
//       } catch {
//         if (page === 1) setFilteredProducts([]);
//       } finally {
//         setIsLoading(false);
//         setIsLoadingMore(false);
//       }
//     }, 300);
//   }, [perPage]);

//   useEffect(() => {
//     const catParam = searchParams.get("category");
//     const brParam  = searchParams.get("brands");
//     const stParam  = searchParams.get("search_text");

//     const slugs = catParam ? catParam.split(",") : [];
//     const newCats = categoryData.filter(c => slugs.includes(c.url_slug));
//     const catIds  = newCats.map(c => c.id);

//     const brIds = brParam
//       ? brParam.split(",").map(s => parseInt(s,10)).filter(Boolean)
//       : [];
//     const newBrands = brandsDataFilter.filter(b => brIds.includes(b.id));

//     setSelectedCategories(newCats);
//     setSelectedBrands(newBrands);
//     setShowDetails(false);
//     fetchProductsDebounced(catIds, brIds, stParam, 1);
//   }, [searchParams.toString(), categoryData, brandsDataFilter, fetchProductsDebounced]);

//   const sortedProducts = useMemo(() => {
//     return sortOption.value === "az"
//       ? [...filteredProducts].sort((a,b) => a.title.localeCompare(b.title))
//       : [...filteredProducts].sort((a,b) => b.title.localeCompare(a.title));
//   }, [filteredProducts, sortOption.value]);

//   const updateUrlWithFilters = useCallback((newBrands, newCats) => {
//     const params = new URLSearchParams();
//     if (newCats.length)   params.set("category", newCats.map(c=>c.url_slug).join(","));
//     if (newBrands.length) params.set("brands",  newBrands.map(b=>b.id).join(","));
//     const cs = searchParams.get("search_text");
//     const pp = searchParams.get("per_page");
//     if (cs) params.set("search_text", cs);
//     if (pp) params.set("per_page", pp);
//     const qs = params.toString();
//     router.push(qs ? `/products?${qs}` : `/products`);
//   }, [router, searchParams]);

//   const handleCategoryToggle = useCallback(cat => {
//     const exist = selectedCategories.some(c=>c.id===cat.id);
//     const upd = exist
//       ? selectedCategories.filter(c=>c.id!==cat.id)
//       : [...selectedCategories, cat];
//     updateUrlWithFilters(selectedBrands, upd);
//   }, [selectedCategories, selectedBrands, updateUrlWithFilters]);

//   const handleBrandToggle = useCallback(br => {
//     const exist = selectedBrands.some(b=>b.id===br.id);
//     const upd = exist
//       ? selectedBrands.filter(b=>b.id!==br.id)
//       : [...selectedBrands, br];
//     updateUrlWithFilters(upd, selectedCategories);
//   }, [selectedBrands, selectedCategories, updateUrlWithFilters]);

//   // GÜNCELLENDİ: infinite scroll yüklemeyi 2 saniye gecikmeli yapıyoruz
//   useEffect(() => {
//     if (!loadMoreRef.current) return;
//     const obs = new IntersectionObserver(([entry]) => {
//       if (
//         entry.isIntersecting &&
//         !isLoading &&
//         !isLoadingMore &&
//         currentPagination?.next_page_url
//       ) {
//         setIsLoadingMore(true);
//         setTimeout(() => {
//           const nextPage = currentPage + 1;
//           const catIds = selectedCategories.map(c=>c.id);
//           const brIds  = selectedBrands.map(b=>b.id);
//           const st     = searchParams.get("search_text");
//           fetchProductsDebounced(catIds, brIds, st, nextPage);
//         }, 2000); // 2 saniye bekle
//       }
//     }, { root: null, rootMargin: "200px", threshold: 0.1 });
//     obs.observe(loadMoreRef.current);
//     return () => obs.disconnect();
//   }, [
//     isLoading, isLoadingMore, currentPagination,
//     currentPage, selectedCategories, selectedBrands,
//     searchParams, fetchProductsDebounced
//   ]);

//   // Category count için helper'ı kullanıyoruz
//   const getProductCountForCategory = useCallback(id => {
//     if (productCounts.categories?.[id]) {
//       return productCounts.categories[id];
//     }
//     return allProducts.filter(p =>
//       p.categories?.some(c=>c.id===id)
//     ).length;
//   }, [productCounts, allProducts]);

//   const filteredBrands = useMemo(() => {
//     return brandsDataFilter.filter(b =>
//       b.title.toLowerCase().includes(brandSearchTerm.toLowerCase())
//     );
//   }, [brandsDataFilter, brandSearchTerm]);

//   return (
//     <div>
//       <div className="container">
//         {/* Başlık */}
//         <div className="filterTop topper">
//           <Link href="/">
//             <h1>Adentta</h1>
//           </Link>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products || "Products"}</h4>
//         </div>

//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}" ({" "}
//                 {currentPagination?.total || filteredProducts.length} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           {/* Sidebar Filter */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Seçilmiş kategori ve markalar - Desktop */}
//               <div className="selectedFilter desktop-only">
//                 {selectedCategories.map(cat => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={()=>handleCategoryToggle(cat)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {selectedBrands.map(br => (
//                   <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                     <span onClick={()=>handleBrandToggle(br)}>×</span>
//                     <p>{br.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 {/* Seçilmiş kategori ve markalar - Mobile */}
//                 <div className="selectedFilter mobile-only">
//                   {selectedCategories.map(cat => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={()=>handleCategoryToggle(cat)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {selectedBrands.map(br => (
//                     <div className="selectedFilterInner" key={`brand-${br.id}`}>
//                       <span onClick={()=>handleBrandToggle(br)}>×</span>
//                       <p>{br.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setIsMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 {/* Category Accordion */}
//                 <FilterAccordion
//                   title={t?.productsPageFilterCategoryTitle || "Category"}
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "250px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {categoryData.map(cat => {
//                       const productCount = getProductCountForCategory(cat.id);
//                       const isSelected = selectedCategories.some(c=>c.id===cat.id);
//                       return (
//                         <li
//                           key={cat.id}
//                           onClick={() => handleCategoryToggle(cat)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                             fontWeight: isSelected ? "bold" : "normal",
//                           }}
//                         >
//                           <span>{cat.title}</span>
//                           <p>({productCount})</p>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Brand Accordion */}
//                 <FilterAccordion
//                   title={t?.productsPageFilterBrandsTitle || "Brands"}
//                 >
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText || "Search..."}
//                       value={brandSearchTerm}
//                       onChange={e => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul
//                     style={{
//                       maxHeight: "250px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {filteredBrands.map(br => {
//                       const isSelected = selectedBrands.some(b=>b.id===br.id);
//                       return (
//                         <li
//                           key={br.id}
//                           onClick={() => handleBrandToggle(br)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                             fontWeight: isSelected ? "bold" : "normal",
//                           }}
//                         >
//                           <input type="checkbox" checked={isSelected} readOnly />
//                           <span>{br.title}</span>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Mobile Apply Button */}
//                 <div
//                   className="applyBTN flex items-center mt-4 justify-center"
//                   onClick={() => setIsMobileFilterOpen(false)}
//                 >
//                   <ApplyBTN t={t} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <div className="productPageSortingInner">
//                   <span>{t?.sortBy || "Sort by"}</span>
//                   <ReactSelect t={t} value={sortOption} onChange={setSortOption} />
//                 </div>
//               </div>

//               <div className="row">
//                 {isLoading ? (
//                   <div className="loader-container">
//                     <div className="loader" />
//                   </div>
//                 ) : (
//                   sortedProducts.map(d => (
//                     <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
//                       <Link href={`/products/${slugify(d.title)}-${d.id}`} className="block">
//                         <div className="homePageProductCardContent">
//                           <div className="homePageProCardImgs">
//                             <div className="homePageProductCardContentImage">
//                               <img src={`https://admin.adentta.az/storage${d.image}`} alt={d.title} />
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentInner">
//                             <div className="homePageProductCardContentText">
//                               <span>{d.title}</span>
//                             </div>
//                             <div className="price">
//                               <div className="priceItem">
//                                 <strong id="prices">{d.price}</strong>
//                                 <Manat />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentBottom">
//                             <span>{t?.learnMore || "Learn More"}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//             <div ref={loadMoreRef} style={{ height: "1px" }} />
//             {isLoadingMore && (
//               <div className="loader-container" style={{ margin: "1rem 0" }}>
//                 <div className="loader" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Dinamik meta ve toggle bölmesi */}
//         <div className="productsPageDescription">
//           <h1>
//             {categoryPageTitle
//               ? categoryPageTitle
//               : t?.productsPageCeoDescription ||
//                 "Ceo description - Addenta product category"}
//           </h1>

//           {showDetails && (
//             <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
//               <div
//                 className="page-description-content"
//                 dangerouslySetInnerHTML={{ __html: categoryPageDescription || "" }}
//               />
//             </div>
//           )}

//           <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
//             <a
//               href="#"
//               onClick={e => { e.preventDefault(); setShowDetails(prev => !prev) }}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 textDecoration: "none",
//               }}
//             >
//               {showDetails ? t?.hideDetailsBtn || "Hide" : t?.seeMoreBtn || "See more"}
//               <img
//                 src="/icons/rightDown.svg"
//                 alt=""
//                 style={{
//                   marginLeft: "0.25rem",
//                   transform: showDetails ? "rotate(180deg)" : "none",
//                   transition: "transform 0.2s",
//                 }}
//               />
//             </a>
//           </div>
//         </div>

//         {/* style jsx */}
//         <style jsx>{`
//           .loader-container {
//             width: 100% !important;
//             min-width: 97rem;
//             min-height: 10rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             padding: 5rem auto;
//           }
//           .loader {
//             border: 5px solid #98b4de;
//             border-top: 5px solid #293881;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             animation: spin 0.8s linear infinite;
//           }
//           @keyframes spin {
//             to {
//               transform: rotate(360deg);
//             }
//           }
//           .accordion-content {
//             max-height: 250px;
//             overflow-y: auto;
//           }
//           .productsPageDetailsCEO h1 {
//             margin-bottom: 0.5rem;
//           }
//           .page-description-content {
//             margin-bottom: 0.5rem;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// * search isleyir

// // File: components/ProductsPageFilter.jsx
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useCallback,
//   useRef,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion başlık komponenti (className'ler orijinal)
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

// // Client-side filtre fetch fonksiyonu with search support
// async function fetchProducts(categoryIds = [], brandIds = [], searchText = "") {
//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }

//   let url = `/page-data/product?per_page=999`;

//   // Add search parameter if provided
//   if (searchText) {
//     url += `&search_text=${encodeURIComponent(searchText)}`;
//   }

//   // Add filters if any
//   if (filters.length) {
//     const query = filters
//       .map((f, idx) => {
//         const base = `filters[${idx}][key]=${encodeURIComponent(
//           f.key
//         )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//         const vals = f.values
//           .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//           .join("&");
//         return `${base}&${vals}`;
//       })
//       .join("&");
//     url += `&${query}`;
//   }

//   try {
//     const res = await axiosInstance.get(url);
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error (client)", err);
//     return [];
//   }
// }

// // Güvenli slugify utility
// function slugify(text) {
//   if (!text) return "";
//   return text
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }

// export default function ProductsPageFilter({
//   t,
//   allProducts = [],
//   initialProducts = [],
//   categoryData = [],
//   brandsDataFilter = [],
//   initialSelectedBrands = [],
//   initialSelectedCategories = [],
//   categoryMetaTitle = null,
//   categoryMetaDescription = null,
//   categoryPageTitle = null,
//   categoryPageDescription = null,
//   categoryId = null,
//   searchText = null,
//   perPage = 999999,
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [filteredProducts, setFilteredProducts] = useState(initialProducts);
//   const [selectedCategories, setSelectedCategories] = useState(
//     initialSelectedCategories
//   );
//   const [selectedBrands, setSelectedBrands] = useState(initialSelectedBrands);
//   const [sortOption, setSortOption] = useState({
//     value: "az",
//     label: t?.from || "From A-Z",
//   });
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);

//   // infinite scroll
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const loadMoreRef = useRef(null);

//   useEffect(() => {
//     const categoryParam = searchParams.get("category");
//     const brandsParam = searchParams.get("brands");
//     const searchTextParam = searchParams.get("search_text");

//     const categorySlugs = categoryParam ? categoryParam.split(",") : [];
//     const newSelectedCategories = categoryData.filter((c) =>
//       categorySlugs.includes(c.url_slug)
//     );
//     const categoryIds = newSelectedCategories.map((c) => c.id);

//     const brandIds = brandsParam
//       ? brandsParam
//           .split(",")
//           .map((s) => parseInt(s, 10))
//           .filter(Boolean)
//       : [];
//     const newSelectedBrands = brandsDataFilter.filter((b) =>
//       brandIds.includes(b.id)
//     );

//     setSelectedCategories(newSelectedCategories);
//     setSelectedBrands(newSelectedBrands);
//     setShowDetails(false);

//     const fetchAndSet = async () => {
//       setIsLoading(true);
//       try {
//         const prods = await fetchProducts(
//           categoryIds,
//           brandIds,
//           searchTextParam
//         );
//         setFilteredProducts(prods);
//       } catch (err) {
//         console.error(err);
//         setFilteredProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchAndSet();
//     setVisibleCount(12);
//   }, [searchParams.toString(), categoryData, brandsDataFilter]);

//   const sortedProducts = useMemo(
//     () =>
//       [...filteredProducts].sort((a, b) =>
//         sortOption.value === "az"
//           ? a.title.localeCompare(b.title)
//           : b.title.localeCompare(a.title)
//       ),
//     [filteredProducts, sortOption]
//   );

//   useEffect(() => {
//     setVisibleCount(12);
//   }, [sortedProducts]);

//   const updateUrlWithFilters = useCallback(
//     (newBrands, newCategories) => {
//       const params = new URLSearchParams();

//       if (newCategories.length) {
//         params.set("category", newCategories.map((c) => c.url_slug).join(","));
//       }
//       if (newBrands.length) {
//         params.set("brands", newBrands.map((b) => b.id).join(","));
//       }

//       // Preserve existing search parameters
//       const currentSearchText = searchParams.get("search_text");
//       const currentPerPage = searchParams.get("per_page");

//       if (currentSearchText) {
//         params.set("search_text", currentSearchText);
//       }
//       if (currentPerPage) {
//         params.set("per_page", currentPerPage);
//       }

//       const qs = params.toString();
//       router.push(qs ? `/products?${qs}` : `/products`);
//     },
//     [router, searchParams]
//   );

//   const handleCategoryToggle = useCallback(
//     (category) => {
//       const exists = selectedCategories.some((c) => c.id === category.id);
//       const updated = exists
//         ? selectedCategories.filter((c) => c.id !== category.id)
//         : [...selectedCategories, category];
//       updateUrlWithFilters(selectedBrands, updated);
//     },
//     [selectedCategories, selectedBrands, updateUrlWithFilters]
//   );

//   const handleBrandToggle = useCallback(
//     (brand) => {
//       const exists = selectedBrands.some((b) => b.id === brand.id);
//       const updated = exists
//         ? selectedBrands.filter((b) => b.id !== brand.id)
//         : [...selectedBrands, brand];
//       updateUrlWithFilters(updated, selectedCategories);
//     },
//     [selectedBrands, selectedCategories, updateUrlWithFilters]
//   );

//   useEffect(() => {
//     if (!loadMoreRef.current) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (
//           entry.isIntersecting &&
//           !isLoading &&
//           !isLoadingMore &&
//           visibleCount < sortedProducts.length
//         ) {
//           setIsLoadingMore(true);
//         }
//       },
//       { root: null, rootMargin: "200px", threshold: 0.1 }
//     );
//     obs.observe(loadMoreRef.current);
//     return () => obs.disconnect();
//   }, [isLoading, isLoadingMore, visibleCount, sortedProducts.length]);

//   useEffect(() => {
//     if (isLoadingMore) {
//       const timer = setTimeout(() => {
//         setVisibleCount((v) => Math.min(v + 12, sortedProducts.length));
//         setIsLoadingMore(false);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isLoadingMore, sortedProducts.length]);

//   return (
//     <div>
//       <div className="container">
//         {/* Başlık */}
//         <div className="filterTop topper">
//           <Link href="/">
//             <h1>Adentta</h1>
//           </Link>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>{t?.products || "Products"}</h4>
//           {/* {searchText && (
//             <>
//               <img src="/icons/rightDown.svg" alt="Adentta" />
//               <h4>Search: "{searchText}"</h4>
//             </>
//           )} */}
//         </div>

//         <div className="searchResultsProductCount">
//           {searchText && (
//             <div className="search-results-info">
//               <p>
//                 {t?.searchResults || "results found for"} "{searchText}"
//                  ( {filteredProducts.length}{" "} )
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="row">
//           {/* Sidebar Filter */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Seçilmiş kategori və markalar - Desktop */}
//               <div className="selectedFilter desktop-only">
//                 {selectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                     <span onClick={() => handleCategoryToggle(cat)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//                 {selectedBrands.map((brand) => (
//                   <div
//                     className="selectedFilterInner"
//                     key={`brand-${brand.id}`}
//                   >
//                     <span onClick={() => handleBrandToggle(brand)}>×</span>
//                     <p>{brand.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 {/* Seçilmiş kategori və markalar - Mobile */}
//                 <div className="selectedFilter mobile-only">
//                   {selectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleCategoryToggle(cat)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {selectedBrands.map((brand) => (
//                     <div
//                       className="selectedFilterInner"
//                       key={`brand-${brand.id}`}
//                     >
//                       <span onClick={() => handleBrandToggle(brand)}>×</span>
//                       <p>{brand.title}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setIsMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 {/* Category Accordion */}
//                 <FilterAccordion
//                   title={t?.productsPageFilterCategoryTitle || "Category"}
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "250px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {categoryData.map((cat) => {
//                       const productCount = allProducts.filter((product) =>
//                         product.categories?.some((c) => c.id === cat.id)
//                       ).length;
//                       const isSelected = selectedCategories.some(
//                         (c) => c.id === cat.id
//                       );
//                       return (
//                         <li
//                           key={cat.id}
//                           onClick={() => handleCategoryToggle(cat)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                             fontWeight: isSelected ? "bold" : "normal",
//                           }}
//                         >
//                           <span>{cat.title}</span>
//                           <p>({productCount})</p>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Brand Accordion */}
//                 <FilterAccordion
//                   title={t?.productsPageFilterBrandsTitle || "Brands"}
//                 >
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder={t?.searchText || "Search..."}
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul
//                     style={{
//                       maxHeight: "250px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {brandsDataFilter
//                       .filter((brand) =>
//                         brand?.title
//                           ?.toLowerCase()
//                           .includes(brandSearchTerm?.toLowerCase())
//                       )
//                       .map((brand) => {
//                         const isSelected = selectedBrands.some(
//                           (b) => b.id === brand.id
//                         );
//                         return (
//                           <li
//                             key={brand.id}
//                             onClick={() => handleBrandToggle(brand)}
//                             style={{
//                               cursor: "pointer",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "0.5rem",
//                               fontWeight: isSelected ? "bold" : "normal",
//                             }}
//                           >
//                             <input
//                               type="checkbox"
//                               checked={isSelected}
//                               readOnly
//                             />
//                             <span>{brand.title}</span>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Mobile Apply Button */}
//                 <div
//                   className="applyBTN flex items-center mt-4 justify-center"
//                   onClick={() => setIsMobileFilterOpen(false)}
//                 >
//                   <ApplyBTN t={t} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <div className="productPageSortingInner">
//                   <span>{t?.sortBy || "Sort by"}</span>
//                   <ReactSelect
//                     t={t}
//                     value={sortOption}
//                     onChange={setSortOption}
//                   />
//                 </div>

//                 {/* Search Results Info */}
//               </div>

//               <div className="row">
//                 {isLoading ? (
//                   <div className="loader-container">
//                     <div className="loader" />
//                   </div>
//                 ) : (
//                   sortedProducts.slice(0, visibleCount).map((d) => (
//                     <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
//                       <Link
//                         href={`/products/${slugify(d.title)}-${d.id}`}
//                         className="block"
//                       >
//                         <div className="homePageProductCardContent">
//                           <div className="homePageProCardImgs">
//                             <div className="homePageProductCardContentImage">
//                               <img
//                                 src={`https://admin.adentta.az/storage${d.image}`}
//                                 alt={d.title}
//                               />
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentInner">
//                             <div className="homePageProductCardContentText">
//                               <span>{d.title}</span>
//                             </div>
//                             <div className="price">
//                               <div className="priceItem">
//                                 <strong id="prices">{d.price}</strong>
//                                 <Manat />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentBottom">
//                             <span>{t?.learnMore || "Learn More"}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//             <div ref={loadMoreRef} style={{ height: "1px" }} />
//             {isLoadingMore && (
//               <div className="loader-container" style={{ margin: "1rem 0" }}>
//                 <div className="loader" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Dinamik meta və toggle bölməsi */}
//         <div className="productsPageDescription">
//           <h1>
//             {categoryPageTitle
//               ? categoryPageTitle
//               : t?.productsPageCeoDescription ||
//                 "Ceo description - Addenta product category"}
//           </h1>

//           {/* <div
//             className="page-description-content seoPtagOnly"
//             dangerouslySetInnerHTML={{
//               __html: (
//                 categoryPageDescription ||
//                 t?.productsPageDescriptionText ||
//                 "Ceo Text"
//               )?.slice(0, 350),
//             }}
//           /> */}

//           {showDetails && (
//             <div
//               className="productsPageDetailsCEO"
//               style={{ marginTop: "2rem" }}
//             >
//               <div
//                 className="page-description-content"
//                 dangerouslySetInnerHTML={{
//                   __html: categoryPageDescription || "",
//                 }}
//               />
//             </div>
//           )}

//           <div
//             className="productsPageDescriptionLink"
//             style={{ marginTop: "1rem" }}
//           >
//             <a
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowDetails((prev) => !prev);
//               }}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 textDecoration: "none",
//               }}
//             >
//               {showDetails
//                 ? t?.hideDetailsBtn || "Hide"
//                 : t?.seeMoreBtn || "See more"}
//               <img
//                 src="/icons/rightDown.svg"
//                 alt=""
//                 style={{
//                   marginLeft: "0.25rem",
//                   transform: showDetails ? "rotate(180deg)" : "none",
//                   transition: "transform 0.2s",
//                 }}
//               />
//             </a>
//           </div>
//         </div>

//         {/* style jsx */}
//         <style jsx>{`
//           .loader-container {
//             width: 100% !important;
//             min-width: 97rem;
//             min-height: 10rem;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             padding: 5rem auto;
//           }
//           .loader {
//             border: 5px solid #98b4de;
//             border-top: 5px solid #293881;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             animation: spin 0.8s linear infinite;
//           }
//           @keyframes spin {
//             to {
//               transform: rotate(360deg);
//             }
//           }
//           .accordion-content {
//             max-height: 250px;
//             overflow-y: auto;
//           }
//           .productsPageDetailsCEO h1 {
//             margin-bottom: 0.5rem;
//           }
//           .page-description-content {
//             margin-bottom: 0.5rem;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// *seacrh isledi

