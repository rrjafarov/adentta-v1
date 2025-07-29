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
//! Bu kod duzeldi ve suretlidi


















// File: components/ProductsPageFilter.jsx
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

// Accordion başlık komponenti (className'ler orijinal)
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

// Optimized client-side fetch with caching
const productCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchProducts(categoryIds = [], brandIds = [], searchText = "", page = 1, perPage = 24) {
  const cacheKey = JSON.stringify({ categoryIds, brandIds, searchText, page, perPage });
  
  // Check cache first
  const cached = productCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const filters = [];
  if (categoryIds.length) {
    filters.push({ key: "categories", operator: "IN", values: categoryIds });
  }
  if (brandIds.length) {
    filters.push({ key: "brands", operator: "IN", values: brandIds });
  }

  let url = `/page-data/product?per_page=${perPage}&page=${page}`;

  if (searchText) {
    url += `&search_text=${encodeURIComponent(searchText)}`;
  }

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
      pagination: res.data.data
    };
    
    // Cache the result
    productCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });
    
    return result;
  } catch (err) {
    console.error("Filter fetch error (client)", err);
    return { products: [], pagination: null };
  }
}

// Güvenli slugify utility
function slugify(text) {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Memoized product card component
const ProductCard = React.memo(({ product, t, slugify }) => (
  <div className="xl-4 lg-4 md-6 sm-6">
    <Link
      href={`/products/${slugify(product.title)}-${product.id}`}
      className="block"
    >
      <div className="homePageProductCardContent">
        <div className="homePageProCardImgs">
          <div className="homePageProductCardContentImage">
            <img
              src={`https://admin.adentta.az/storage${product.image}`}
              alt={product.title}
              loading="lazy"
            />
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
));

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
  productCounts = {}
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [currentPagination, setPagination] = useState(pagination);
  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories
  );
  const [selectedBrands, setSelectedBrands] = useState(initialSelectedBrands);
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

  const fetchProductsDebounced = useCallback(async (categoryIds, brandIds, searchTextParam, page = 1) => {
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
        else setFilteredProducts(prev => [...prev, ...products]);
        setPagination(newPagination);
        setCurrentPage(page);
      } catch {
        if (page === 1) setFilteredProducts([]);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    }, 300);
  }, [perPage]);

  useEffect(() => {
    const catParam = searchParams.get("category");
    const brParam  = searchParams.get("brands");
    const stParam  = searchParams.get("search_text");

    const slugs = catParam ? catParam.split(",") : [];
    const newCats = categoryData.filter(c => slugs.includes(c.url_slug));
    const catIds  = newCats.map(c => c.id);

    const brIds = brParam
      ? brParam.split(",").map(s => parseInt(s,10)).filter(Boolean)
      : [];
    const newBrands = brandsDataFilter.filter(b => brIds.includes(b.id));

    setSelectedCategories(newCats);
    setSelectedBrands(newBrands);
    setShowDetails(false);
    fetchProductsDebounced(catIds, brIds, stParam, 1);
  }, [searchParams.toString(), categoryData, brandsDataFilter, fetchProductsDebounced]);

  const sortedProducts = useMemo(() => {
    return sortOption.value === "az"
      ? [...filteredProducts].sort((a,b) => a.title.localeCompare(b.title))
      : [...filteredProducts].sort((a,b) => b.title.localeCompare(a.title));
  }, [filteredProducts, sortOption.value]);

  const updateUrlWithFilters = useCallback((newBrands, newCats) => {
    const params = new URLSearchParams();
    if (newCats.length)   params.set("category", newCats.map(c=>c.url_slug).join(","));
    if (newBrands.length) params.set("brands",  newBrands.map(b=>b.id).join(","));
    const cs = searchParams.get("search_text");
    const pp = searchParams.get("per_page");
    if (cs) params.set("search_text", cs);
    if (pp) params.set("per_page", pp);
    const qs = params.toString();
    router.push(qs ? `/products?${qs}` : `/products`);
  }, [router, searchParams]);

  const handleCategoryToggle = useCallback(cat => {
    const exist = selectedCategories.some(c=>c.id===cat.id);
    const upd = exist
      ? selectedCategories.filter(c=>c.id!==cat.id)
      : [...selectedCategories, cat];
    updateUrlWithFilters(selectedBrands, upd);
  }, [selectedCategories, selectedBrands, updateUrlWithFilters]);

  const handleBrandToggle = useCallback(br => {
    const exist = selectedBrands.some(b=>b.id===br.id);
    const upd = exist
      ? selectedBrands.filter(b=>b.id!==br.id)
      : [...selectedBrands, br];
    updateUrlWithFilters(upd, selectedCategories);
  }, [selectedBrands, selectedCategories, updateUrlWithFilters]);

  // GÜNCELLENDİ: infinite scroll yüklemeyi 2 saniye gecikmeli yapıyoruz
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (
        entry.isIntersecting &&
        !isLoading &&
        !isLoadingMore &&
        currentPagination?.next_page_url
      ) {
        setIsLoadingMore(true);
        setTimeout(() => {
          const nextPage = currentPage + 1;
          const catIds = selectedCategories.map(c=>c.id);
          const brIds  = selectedBrands.map(b=>b.id);
          const st     = searchParams.get("search_text");
          fetchProductsDebounced(catIds, brIds, st, nextPage);
        }, 2000); // 2 saniye bekle
      }
    }, { root: null, rootMargin: "200px", threshold: 0.1 });
    obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [
    isLoading, isLoadingMore, currentPagination,
    currentPage, selectedCategories, selectedBrands,
    searchParams, fetchProductsDebounced
  ]);

  // Category count için helper'ı kullanıyoruz
  const getProductCountForCategory = useCallback(id => {
    if (productCounts.categories?.[id]) {
      return productCounts.categories[id];
    }
    return allProducts.filter(p =>
      p.categories?.some(c=>c.id===id)
    ).length;
  }, [productCounts, allProducts]);

  const filteredBrands = useMemo(() => {
    return brandsDataFilter.filter(b =>
      b.title.toLowerCase().includes(brandSearchTerm.toLowerCase())
    );
  }, [brandsDataFilter, brandSearchTerm]);

  return (
    <div>
      <div className="container">
        {/* Başlık */}
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
                {t?.searchResults || "results found for"} "{searchText}" ({" "}
                {currentPagination?.total || filteredProducts.length} )
              </p>
            </div>
          )}
        </div>

        <div className="row">
          {/* Sidebar Filter */}
          <div className="xl-3 lg-3 md-3 sm-12">
            <div className="filter-container">
              <button
                className="filter-title"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                {t?.productsPageFilterTitle || "Filter"}
              </button>

              {/* Seçilmiş kategori ve markalar - Desktop */}
              <div className="selectedFilter desktop-only">
                {selectedCategories.map(cat => (
                  <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                    <span onClick={()=>handleCategoryToggle(cat)}>×</span>
                    <p>{cat.title}</p>
                  </div>
                ))}
                {selectedBrands.map(br => (
                  <div className="selectedFilterInner" key={`brand-${br.id}`}>
                    <span onClick={()=>handleBrandToggle(br)}>×</span>
                    <p>{br.title}</p>
                  </div>
                ))}
              </div>

              <div className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}>
                <button className="filter-titless">
                  {t?.productsPageFilterTitle || "Filter"}
                </button>

                {/* Seçilmiş kategori ve markalar - Mobile */}
                <div className="selectedFilter mobile-only">
                  {selectedCategories.map(cat => (
                    <div className="selectedFilterInner" key={`cat-${cat.id}`}>
                      <span onClick={()=>handleCategoryToggle(cat)}>×</span>
                      <p>{cat.title}</p>
                    </div>
                  ))}
                  {selectedBrands.map(br => (
                    <div className="selectedFilterInner" key={`brand-${br.id}`}>
                      <span onClick={()=>handleBrandToggle(br)}>×</span>
                      <p>{br.title}</p>
                    </div>
                  ))}
                </div>

                <button
                  className="close-btn"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <img src="/icons/popupCloseIcon.svg" alt="close" />
                </button>

                <div className="lineFiltered"></div>

                {/* Category Accordion */}
                <FilterAccordion
                  title={t?.productsPageFilterCategoryTitle || "Category"}
                >
                  <ul
                    style={{
                      maxHeight: "250px",
                      overflowY: "auto",
                      paddingRight: "4px",
                    }}
                  >
                    {categoryData.map(cat => {
                      const productCount = getProductCountForCategory(cat.id);
                      const isSelected = selectedCategories.some(c=>c.id===cat.id);
                      return (
                        <li
                          key={cat.id}
                          onClick={() => handleCategoryToggle(cat)}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontWeight: isSelected ? "bold" : "normal",
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
                      onChange={e => setBrandSearchTerm(e.target.value)}
                    />
                  </div>
                  <ul
                    style={{
                      maxHeight: "250px",
                      overflowY: "auto",
                      paddingRight: "4px",
                    }}
                  >
                    {filteredBrands.map(br => {
                      const isSelected = selectedBrands.some(b=>b.id===br.id);
                      return (
                        <li
                          key={br.id}
                          onClick={() => handleBrandToggle(br)}
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

                {/* Mobile Apply Button */}
                <div
                  className="applyBTN flex items-center mt-4 justify-center"
                  onClick={() => setIsMobileFilterOpen(false)}
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
                  sortedProducts.map(d => (
                    <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
                      <Link href={`/products/${slugify(d.title)}-${d.id}`} className="block">
                        <div className="homePageProductCardContent">
                          <div className="homePageProCardImgs">
                            <div className="homePageProductCardContentImage">
                              <img src={`https://admin.adentta.az/storage${d.image}`} alt={d.title} />
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
            <div ref={loadMoreRef} style={{ height: "1px" }} />
            {isLoadingMore && (
              <div className="loader-container" style={{ margin: "1rem 0" }}>
                <div className="loader" />
              </div>
            )}
          </div>
        </div>

        {/* Dinamik meta ve toggle bölmesi */}
        <div className="productsPageDescription">
          <h1>
            {categoryPageTitle
              ? categoryPageTitle
              : t?.productsPageCeoDescription ||
                "Ceo description - Addenta product category"}
          </h1>

          {showDetails && (
            <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
              <div
                className="page-description-content"
                dangerouslySetInnerHTML={{ __html: categoryPageDescription || "" }}
              />
            </div>
          )}

          <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
            <a
              href="#"
              onClick={e => { e.preventDefault(); setShowDetails(prev => !prev) }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              {showDetails ? t?.hideDetailsBtn || "Hide" : t?.seeMoreBtn || "See more"}
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
        </div>

        {/* style jsx */}
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















// ! suretlenmis kod
// // File: components/ProductsPageFilter.jsx
// "use client";
// import Link from "next/link";
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useCallback,
//   useRef,
//   memo,
// } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Memoized accordion component for better performance
// const FilterAccordion = memo(({ title, children, isOpen, onToggle }) => {
//   return (
//     <div className="accordion">
//       <button className="accordion-header" onClick={onToggle}>
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
// });

// // Memoized product card component
// const ProductCard = memo(({ product, t, slugify }) => (
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

// // Client-side cache for API responses
// const clientCache = new Map();
// const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

// // Optimized fetch function with caching and debouncing
// async function fetchProducts(categoryIds = [], brandIds = [], searchText = "") {
//   const cacheKey = `client_products_${categoryIds.join(",")}_${brandIds.join(
//     ","
//   )}_${searchText}`;
//   const now = Date.now();
//   const cached = clientCache.get(cacheKey);

//   if (cached && now - cached.timestamp < CACHE_DURATION) {
//     return cached.data;
//   }

//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }

//   let url = `/page-data/product?per_page=999`;

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
//     const data = res.data.data.data;
//     clientCache.set(cacheKey, { data, timestamp: now });
//     return data;
//   } catch (err) {
//     console.error("Filter fetch error (client)", err);
//     return cached ? cached.data : [];
//   }
// }

// // Optimized slugify function
// const slugify = (text) => {
//   if (!text) return "";
//   return text
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// };

// // Debounce utility for search
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

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

//   // Accordion states
//   const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false);
//   const [brandAccordionOpen, setBrandAccordionOpen] = useState(false);

//   // Infinite scroll
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const loadMoreRef = useRef(null);

//   // Debounced brand search
//   const debouncedBrandSearch = useDebounce(brandSearchTerm, 300);

//   // Memoized filtered brands to prevent unnecessary re-renders
//   const filteredBrands = useMemo(() => {
//     return brandsDataFilter.filter((brand) =>
//       brand?.title
//         ?.toLowerCase()
//         .includes(debouncedBrandSearch?.toLowerCase() || "")
//     );
//   }, [brandsDataFilter, debouncedBrandSearch]);

//   // Memoized category product counts
//   const categoryProductCounts = useMemo(() => {
//     const counts = {};
//     categoryData.forEach((cat) => {
//       counts[cat.id] = allProducts.filter((product) =>
//         product.categories?.some((c) => c.id === cat.id)
//       ).length;
//     });
//     return counts;
//   }, [categoryData, allProducts]);

//   // Debounced URL update function
//   const debouncedUpdateUrl = useCallback(
//     (() => {
//       let timeoutId;
//       return (newBrands, newCategories) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//           const params = new URLSearchParams();

//           if (newCategories.length) {
//             params.set(
//               "category",
//               newCategories.map((c) => c.url_slug).join(",")
//             );
//           }
//           if (newBrands.length) {
//             params.set("brands", newBrands.map((b) => b.id).join(","));
//           }

//           const currentSearchText = searchParams.get("search_text");
//           const currentPerPage = searchParams.get("per_page");

//           if (currentSearchText) {
//             params.set("search_text", currentSearchText);
//           }
//           if (currentPerPage) {
//             params.set("per_page", currentPerPage);
//           }

//           const qs = params.toString();
//           router.push(qs ? `/products?${qs}` : `/products`);
//         }, 300);
//       };
//     })(),
//     [router, searchParams]
//   );

//   // Effect for URL parameter changes
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

//   // Memoized sorted products
//   const sortedProducts = useMemo(
//     () =>
//       [...filteredProducts].sort((a, b) =>
//         sortOption.value === "az"
//           ? a.title.localeCompare(b.title)
//           : b.title.localeCompare(a.title)
//       ),
//     [filteredProducts, sortOption]
//   );

//   // Reset visible count when products change
//   useEffect(() => {
//     setVisibleCount(12);
//   }, [sortedProducts]);

//   const handleCategoryToggle = useCallback(
//     (category) => {
//       const exists = selectedCategories.some((c) => c.id === category.id);
//       const updated = exists
//         ? selectedCategories.filter((c) => c.id !== category.id)
//         : [...selectedCategories, category];
//       debouncedUpdateUrl(selectedBrands, updated);
//     },
//     [selectedCategories, selectedBrands, debouncedUpdateUrl]
//   );

//   const handleBrandToggle = useCallback(
//     (brand) => {
//       const exists = selectedBrands.some((b) => b.id === brand.id);
//       const updated = exists
//         ? selectedBrands.filter((b) => b.id !== brand.id)
//         : [...selectedBrands, brand];
//       debouncedUpdateUrl(updated, selectedCategories);
//     },
//     [selectedBrands, selectedCategories, debouncedUpdateUrl]
//   );

//   // Infinite scroll observer
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

//   // Load more products
//   useEffect(() => {
//     if (isLoadingMore) {
//       const timer = setTimeout(() => {
//         setVisibleCount((v) => Math.min(v + 12, sortedProducts.length));
//         setIsLoadingMore(false);
//       }, 500); // Reduced timeout for faster loading
//       return () => clearTimeout(timer);
//     }
//   }, [isLoadingMore, sortedProducts.length]);

//   // Memoized visible products
//   const visibleProducts = useMemo(() => {
//     return sortedProducts.slice(0, visibleCount);
//   }, [sortedProducts, visibleCount]);

//   return (
//     <div>
//       <div className="container">
//         {/* Header */}
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
//                 {filteredProducts.length} )
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

//               {/* Selected filters - Desktop */}
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

//                 {/* Selected filters - Mobile */}
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
//                   isOpen={categoryAccordionOpen}
//                   onToggle={() =>
//                     setCategoryAccordionOpen(!categoryAccordionOpen)
//                   }
//                 >
//                   <ul
//                     style={{
//                       maxHeight: "250px",
//                       overflowY: "auto",
//                       paddingRight: "4px",
//                     }}
//                   >
//                     {categoryData.map((cat) => {
//                       const productCount = categoryProductCounts[cat.id] || 0;
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
//                   isOpen={brandAccordionOpen}
//                   onToggle={() => setBrandAccordionOpen(!brandAccordionOpen)}
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
// ! suretlenmis kod
