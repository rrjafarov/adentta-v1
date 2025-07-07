// // File: components/ProductsPageFilter.jsx
// "use client";
// import Link from "next/link";
// import React, { useState, useEffect, useMemo } from "react";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion başlıq komponenti
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

// // Kategoriya və marka ID-lərinə görə məhsulları gətirən ümumi funksiya
// async function fetchProducts(categoryIds = [], brandIds = []) {
//   const filters = [];

//   if (categoryIds.length) {
//     filters.push({
//       key: "categories",
//       operator: "IN",
//       values: categoryIds,
//     });
//   }
//   if (brandIds.length) {
//     filters.push({
//       key: "brands",
//       operator: "IN",
//       values: brandIds,
//     });
//   }

//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(
//         f.key
//       )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");

//   try {
//     const res = await axiosInstance.get(`/page-data/product?${query}`, {
//       cache: "no-store",
//     });
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error", err);
//     return [];
//   }
// }

// export default function ProductsPageFilter({
//   t,
//   productData = [],
//   categoryData = [],
//   // brandsData = [],
//   brandsDataFilter = [],
//   categoryParam = null,
// }) {
//   const [filteredProducts, setFilteredProducts] = useState(productData);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [sortOption, setSortOption] = useState({
//     value: "az",
//     label: t?.from || "From A-Z",
//   });
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");

//   // İlk yükleme veya URL param değiştiğinde filtre uygula
//   useEffect(() => {
//     if (categoryParam) {
//       const catId = parseInt(categoryParam, 10);
//       const matched = categoryData.find((c) => c.id === catId);
//       if (matched) {
//         setIsLoading(true);
//         fetchProducts([catId], [])
//           .then((prods) => {
//             setFilteredProducts(prods);
//             setSelectedCategories([matched]);
//           })
//           .finally(() => setIsLoading(false));
//       }
//     } else {
//       setFilteredProducts(productData);
//       setSelectedCategories([]);
//     }
//   }, [categoryParam, categoryData, productData]);

//   // Kategoriya seçimi / de-seçimi
//   const handleCategoryToggle = async (category) => {
//     const exists = selectedCategories.some((c) => c.id === category.id);
//     const newCats = exists
//       ? selectedCategories.filter((c) => c.id !== category.id)
//       : [...selectedCategories, category];
//     setSelectedCategories(newCats);

//     setIsLoading(true);
//     const catIds = newCats.map((c) => c.id);
//     const brandIds = selectedBrands.map((b) => b.id);
//     const prods =
//       catIds.length || brandIds.length
//         ? await fetchProducts(catIds, brandIds)
//         : productData;
//     setFilteredProducts(prods);
//     setIsLoading(false);
//   };

//   // Marka seçimi / de-seçimi
//   const handleBrandToggle = async (brand) => {
//     const exists = selectedBrands.some((b) => b.id === brand.id);
//     const newBrands = exists
//       ? selectedBrands.filter((b) => b.id !== brand.id)
//       : [...selectedBrands, brand];
//     setSelectedBrands(newBrands);

//     setIsLoading(true);
//     const catIds = selectedCategories.map((c) => c.id);
//     const brandIds = newBrands.map((b) => b.id);
//     const prods =
//       catIds.length || brandIds.length
//         ? await fetchProducts(catIds, brandIds)
//         : productData;
//     setFilteredProducts(prods);
//     setIsLoading(false);
//   };

//   // Məhsulları sort etmək
//   const sortedProducts = useMemo(() => {
//     return [...filteredProducts].sort((a, b) =>
//       sortOption.value === "az"
//         ? a.title.localeCompare(b.title)
//         : b.title.localeCompare(a.title)
//     );
//   }, [filteredProducts, sortOption]);

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

//         <div className="row">
//           {/* Sidebar Filter */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 {t?.productsPageFilterTitle || "Filter"}
//               </button>

//               {/* Seçilmiş kateqoriya və markalar - Desktop */}
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

//                 {/* Seçilmiş kateqoriya və markalar - Mobile */}
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
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 {/* Seçilmiş filtreler - Desktop */}
//                 {/* <div className="selectedFilter desktop-only">
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
//                 <button className="filter-titless">Filter</button>
//                  */}

//                 {/* Category Accordion */}

//                 {/*AccorionFilter  */}
//                 {/* <FilterAccordion
//                   title={t?.productsPageFilterCategoryTitle || "Category"}
//                 >
//                   <ul>
//                     {categoryData.map((cat) => {
//                       const productCount = productData.filter((product) =>
//                         product.categories?.some((c) => c.id === cat.id)
//                       ).length;
//                       return (
//                         <li
//                           key={cat.id}
//                           onClick={() => handleCategoryToggle(cat)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                             fontWeight: selectedCategories.some(
//                               (c) => c.id === cat.id
//                             )
//                               ? "bold"
//                               : "normal",
//                           }}
//                         >
//                           <span>{cat.title}</span>
//                           <p>({productCount})</p>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </FilterAccordion> */}
//                 {/*AccorionFilter  */}

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
//                       const productCount = productData.filter((product) =>
//                         product.categories?.some((c) => c.id === cat.id)
//                       ).length;
//                       return (
//                         <li
//                           key={cat.id}
//                           onClick={() => handleCategoryToggle(cat)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                             fontWeight: selectedCategories.some(
//                               (c) => c.id === cat.id
//                             )
//                               ? "bold"
//                               : "normal",
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
//                   <ul>
//                     {brandsDataFilter
//                       // brandsData
//                       .filter((brand) =>
//                         brand?.title
//                           ?.toLowerCase()
//                           .includes(brandSearchTerm?.toLowerCase())
//                       )
//                       .map((brand) => (
//                         <li
//                           key={brand.id}
//                           onClick={() => handleBrandToggle(brand)}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "0.5rem",
//                           }}
//                         >
//                           <input
//                             type="checkbox"
//                             checked={selectedBrands.some(
//                               (b) => b.id === brand.id
//                             )}
//                             readOnly
//                           />
//                           <span>{brand.title}</span>
//                         </li>
//                       ))}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Mobile Apply Button */}
//                 <div
//                   className="applyBTN flex items-center mt-4 justify-center"
//                   onClick={() => setMobileFilterOpen(false)}
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
//                 <span>{t?.sortBy || "Sort by"}</span>
//                 <ReactSelect
//                   t={t}
//                   value={sortOption}
//                   onChange={setSortOption}
//                 />
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
//                         href={`/products/${d.title
//                           ?.toLowerCase()
//                           .replace(/\s+/g, "-")}-${d.id}`}
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
//             <div className="flex items-center justify-center">
//               <LoadMoreBTN t={t} className="buttonNoneDesktop" />
//             </div>

//             {/* Page Description */}
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           <h6>
//             {t?.productsPageCeoDescription ||
//               "Ceo description - Addenta product category"}
//           </h6>
//           <p>{t?.productsPageDescriptionText || "Ceo Text"}</p>
//           <div className="productsPageDescriptionLink">
//             <Link href={"/"}>{t?.seeMoreBtn || "see more"}</Link>
//             <img src="/icons/rightDown.svg" alt="" />
//           </div>
//         </div>
//       </div>

//       {/* Spinner Styles */}
//       <style jsx>{`
//         .loader-container {
//           width: 100% !important;
//           min-width: 97rem;
//           min-height: 30rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 5rem auto;
//         }
//         .loader {
//           border: 5px solid #98b4de;
//           border-top: 5px solid #293881;
//           border-radius: 50%;
//           width: 40px;
//           height: 40px;
//           animation: spin 0.8s linear infinite;
//         }
//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }
//         /* Yeni əlavə: Accordion içərisində scroll əlavə etmək üçün */
//         .accordion-content {
//           max-height: 250px;
//           overflow-y: auto;
//         }
//       `}</style>
//     </div>
//   );
// }
// * LAST VERSION
// --------------------------------------------------------------------------------------------------------------------------






// * ---------------AAAAAAAAAAAAA-AAAAAAAAAAAAAAAA-A
// File: components/ProductsPageFilter.jsx
// "use client";
// import Link from "next/link";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion başlık komponenti (className’ler orijinal)
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

// // Client-side filtre fetch fonksiyonu (isteğe bağlı; server-side navigation tercih edersen bu fonksiyonu ve useEffect içindeki fetch’i kaldırabilirsin)
// async function fetchProducts(categoryIds = [], brandIds = []) {
//   const filters = [];

//   if (categoryIds.length) {
//     filters.push({
//       key: "categories",
//       operator: "IN",
//       values: categoryIds,
//     });
//   }
//   if (brandIds.length) {
//     filters.push({
//       key: "brands",
//       operator: "IN",
//       values: brandIds,
//     });
//   }
//   if (!filters.length) {
//     try {
//       const res = await axiosInstance.get("/page-data/product?per_page=999");
//       return res.data.data.data;
//     } catch (err) {
//       console.error("Fetch all products error", err);
//       return [];
//     }
//   }
//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(
//         f.key
//       )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");
//   try {
//     const res = await axiosInstance.get(
//       `/page-data/product?per_page=999&${query}`
//     );
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error (client)", err);
//     return [];
//   }
// }

// // Güvenli slugify utility (istersen koru ya da kendi slug mantığını uygula)
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
//   allProducts = [], // Yeni: global tüm ürün listesi
//   initialProducts = [], // Server-side filtreli başlangıç listesi
//   categoryData = [],
//   brandsDataFilter = [],
//   initialSelectedBrands = [],
//   initialSelectedCategories = [],
//   categoryMetaTitle = null,
//   categoryMetaDescription = null,
//   categoryPageTitle = null,
//   categoryPageDescription = null,
//   categoryId = null,
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // filteredProducts: geçerli filtreye göre gösterilecek ürünler
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

//   // URL değiştiğinde selectedCategories/Brands ve filteredProducts güncelle
//   useEffect(() => {
//     const categoryParam = searchParams.get("category");
//     const brandsParam = searchParams.get("brands");

//     let categoryIds = [];
//     if (categoryParam) {
//       const idParts = categoryParam.split(",");
//       categoryIds = idParts
//         .map((id) => parseInt(id, 10))
//         .filter((n) => !isNaN(n));
//     }

//     let brandIds = [];
//     if (brandsParam) {
//       const parts = Array.isArray(brandsParam)
//         ? brandsParam
//         : brandsParam.split(",");
//       brandIds = parts.map((p) => parseInt(p, 10)).filter((n) => !isNaN(n));
//     }

//     const newSelectedCategories = categoryData.filter((c) =>
//       categoryIds.includes(c.id)
//     );
//     const newSelectedBrands = brandsDataFilter.filter((b) =>
//       brandIds.includes(b.id)
//     );

//     setSelectedCategories(newSelectedCategories);
//     setSelectedBrands(newSelectedBrands);
//     setShowDetails(false);

//     // Eğer client-side fetch istersen, aşağıyı kullan:
//     const fetchAndSet = async () => {
//       setIsLoading(true);
//       try {
//         const prods = await fetchProducts(categoryIds, brandIds);
//         setFilteredProducts(prods);
//       } catch (err) {
//         console.error("Client fetch error in useEffect", err);
//         setFilteredProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchAndSet();

//     // Eğer yalnızca server-side navigation tercih edersen:
//     // setFilteredProducts(initialProducts);
//     // şeklinde bırakabilirsin ve fetchAndSet bloğunu kaldırabilirsin.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams.toString(), categoryData, brandsDataFilter]);

//   // Sıralı ürünler
//   const sortedProducts = useMemo(() => {
//     return [...filteredProducts].sort((a, b) =>
//       sortOption.value === "az"
//         ? a.title.localeCompare(b.title)
//         : b.title.localeCompare(a.title)
//     );
//   }, [filteredProducts, sortOption]);

//   // URL güncelleme
//   const updateUrlWithFilters = useCallback(
//     (newBrands, newCategories) => {
//       const params = new URLSearchParams();

//       if (newCategories.length) {
//         const categoryIds = newCategories.map((c) => c.id);
//         params.set("category", categoryIds.join(","));
//       }
//       if (newBrands.length) {
//         params.set("brands", newBrands.map((b) => b.id).join(","));
//       }

//       const queryString = params.toString();
//       const href = queryString ? `/products?${queryString}` : `/products`;
//       router.push(href);
//     },
//     [router]
//   );

//   const handleCategoryToggle = useCallback(
//     (category) => {
//       let newSelected;
//       if (selectedCategories.some((c) => c.id === category.id)) {
//         newSelected = selectedCategories.filter((c) => c.id !== category.id);
//       } else {
//         newSelected = [...selectedCategories, category];
//       }
//       updateUrlWithFilters(selectedBrands, newSelected);
//     },
//     [selectedCategories, selectedBrands, updateUrlWithFilters]
//   );

//   const handleBrandToggle = useCallback(
//     (brand) => {
//       let newSelected;
//       if (selectedBrands.some((b) => b.id === brand.id)) {
//         newSelected = selectedBrands.filter((b) => b.id !== brand.id);
//       } else {
//         newSelected = [...selectedBrands, brand];
//       }
//       updateUrlWithFilters(newSelected, selectedCategories);
//     },
//     [selectedBrands, selectedCategories, updateUrlWithFilters]
//   );

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

//                 {/* Seçilmiş kategori ve markalar - Mobile */}
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
//                       // Burada sayımı global allProducts üzerinden yapıyoruz:
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
//                 <span>{t?.sortBy || "Sort by"}</span>
//                 <ReactSelect
//                   t={t}
//                   value={sortOption}
//                   onChange={setSortOption}
//                 />
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
//             <div className="flex items-center justify-center">
//               <LoadMoreBTN t={t} className="buttonNoneDesktop" />
//             </div>
//           </div>
//         </div>

//         {/* Dinamik meta_title / meta_description gösterimi ve toggle ile detay gösterme */}
//         <div className="productsPageDescription">
//           <h1>
//             {categoryMetaTitle
//               ? categoryMetaTitle
//               : t?.productsPageCeoDescription ||
//                 "Ceo description - Addenta product category"}
//           </h1>
//           <p>
//             {categoryMetaDescription
//               ? categoryMetaDescription
//               : t?.productsPageDescriptionText || "Ceo Text"}
//           </p>

//           {showDetails && (
//             <div
//               className="productsPageDetailsCEO"
//               style={{ marginTop: "1rem" }}
//             >
//               {categoryPageTitle && <h1>{categoryPageTitle}</h1>}
//               {categoryPageDescription && (
//                 <div
//                   className="page-description-content"
//                   dangerouslySetInnerHTML={{ __html: categoryPageDescription }}
//                 />
//               )}
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

//         {/* style jsx kısmı unchanged */}
//         <style jsx>{`
//           .loader-container {
//             width: 100% !important;
//             min-width: 97rem;
//             min-height: 30rem;
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

// * ---------------AAAAAAAAAAAAA-AAAAAAAAAAAAAAAA-A






























// "use client";
// import Link from "next/link";
// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion komponenti
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

// // Client-side məhsul sorğusu
// async function fetchProducts(categoryIds = [], brandIds = [], page = 1) {
//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }
//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(
//         f.key
//       )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");
//   const url = `/page-data/product?per_page=12&page=${page}${query ? `&${query}` : ""}`;
//   try {
//     const res = await axiosInstance.get(url, { cache: "no-store" });
//     return {
//       products: res.data.data.data,
//       nextPageUrl: res.data.data.next_page_url,
//       total: res.data.data.total,
//       lastPage: res.data.data.last_page,
//     };
//   } catch (err) {
//     console.error("Fetch products error (client)", err);
//     return { products: [], nextPageUrl: null, total: 0, lastPage: 1 };
//   }
// }

// // Slugify funksiyası
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
//   const [currentPage, setCurrentPage] = useState(1);
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const loadMoreRef = useRef(null);

//   // İlkin yüklənmə və filtr dəyişiklikləri
//   useEffect(() => {
//     const categoryParam = searchParams.get("category");
//     const brandsParam = searchParams.get("brands");
//     const pageParam = searchParams.get("page") || "1";
//     const initialPage = parseInt(pageParam, 10);

//     const categorySlugs = categoryParam ? categoryParam.split(",") : [];
//     const newSelectedCategories = categoryData.filter((c) =>
//       categorySlugs.includes(c.url_slug)
//     );
//     const categoryIds = newSelectedCategories.map((c) => c.id);

//     const brandIds = brandsParam
//       ? brandsParam.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
//       : [];
//     const newSelectedBrands = brandsDataFilter.filter((b) =>
//       brandIds.includes(b.id)
//     );

//     setSelectedCategories(newSelectedCategories);
//     setSelectedBrands(newSelectedBrands);
//     setShowDetails(false);
//     setCurrentPage(initialPage);

//     const fetchInitialProducts = async () => {
//       setIsLoading(true);
//       try {
//         const allProducts = [];
//         let nextUrl = null;
//         for (let page = 1; page <= initialPage; page++) {
//           const { products, nextPageUrl, total } = await fetchProducts(
//             categoryIds,
//             brandIds,
//             page
//           );
//           allProducts.push(...products);
//           nextUrl = nextPageUrl;
//           setTotalProducts(total);
//         }
//         setFilteredProducts(allProducts);
//         setNextPageUrl(nextUrl);
//       } catch (err) {
//         console.error(err);
//         setFilteredProducts([]);
//         setNextPageUrl(null);
//         setTotalProducts(0);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchInitialProducts();
//   }, [searchParams.toString(), categoryData, brandsDataFilter]);

//   // Sıralanmış məhsullar
//   const sortedProducts = useMemo(
//     () =>
//       [...filteredProducts].sort((a, b) =>
//         sortOption.value === "az"
//           ? a.title.localeCompare(b.title)
//           : b.title.localeCompare(a.title)
//       ),
//     [filteredProducts, sortOption]
//   );

//   // URL-i yenilə
//   const updateUrlWithFilters = useCallback(
//     (newBrands, newCategories, page = 1) => {
//       const params = new URLSearchParams();
//       if (newCategories.length) {
//         params.set(
//           "category",
//           newCategories.map((c) => c.url_slug).join(",")
//         );
//       }
//       if (newBrands.length) {
//         params.set("brands", newBrands.map((b) => b.id).join(","));
//       }
//       params.set("page", page);
//       const qs = params.toString();
//       router.push(qs ? `/products?${qs}` : `/products`);
//     },
//     [router]
//   );

//   const handleCategoryToggle = useCallback(
//     (category) => {
//       const exists = selectedCategories.some((c) => c.id === category.id);
//       const updated = exists
//         ? selectedCategories.filter((c) => c.id !== category.id)
//         : [...selectedCategories, category];
//       setCurrentPage(1);
//       updateUrlWithFilters(selectedBrands, updated, 1);
//     },
//     [selectedCategories, selectedBrands, updateUrlWithFilters]
//   );

//   const handleBrandToggle = useCallback(
//     (brand) => {
//       const exists = selectedBrands.some((b) => b.id === brand.id);
//       const updated = exists
//         ? selectedBrands.filter((b) => b.id !== brand.id)
//         : [...selectedBrands, brand];
//       setCurrentPage(1);
//       updateUrlWithFilters(updated, selectedCategories, 1);
//     },
//     [selectedBrands, selectedCategories, updateUrlWithFilters]
//   );

//   // Infinite scroll müşahidəçi
//   useEffect(() => {
//     if (!loadMoreRef.current || !nextPageUrl) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isLoading) {
//           setIsLoading(true);
//           fetchProducts(
//             selectedCategories.map((c) => c.id),
//             selectedBrands.map((b) => b.id),
//             currentPage + 1
//           ).then(({ products, nextPageUrl: newNextPageUrl }) => {
//             setFilteredProducts((prev) => [...prev, ...products]);
//             setNextPageUrl(newNextPageUrl);
//             setCurrentPage((prev) => {
//               const newPage = prev + 1;
//               updateUrlWithFilters(selectedBrands, selectedCategories, newPage);
//               return newPage;
//             });
//             setIsLoading(false);
//           });
//         }
//       },
//       { root: null, rootMargin: "200px", threshold: 0.1 }
//     );
//     obs.observe(loadMoreRef.current);
//     return () => obs.disconnect();
//   }, [
//     isLoading,
//     nextPageUrl,
//     currentPage,
//     selectedCategories,
//     selectedBrands,
//     updateUrlWithFilters,
//   ]);

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
//                 className={`filter-panel ${
//                   isMobileFilterOpen ? "active" : ""
//                 }`}
//               >
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

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

//                 <div
//                   className="applyBTN flex items-center mt-4 justify-center"
//                   onClick={() => setIsMobileFilterOpen(false)}
//                 >
//                   <ApplyBTN t={t} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Məhsul Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy || "Sort by"}</span>
//                 <ReactSelect t={t} value={sortOption} onChange={setSortOption} />
//               </div>

//               <div className="row">
//                 {isLoading && filteredProducts.length === 0 ? (
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
//             {isLoading && filteredProducts.length > 0 && (
//               <div className="loader-container" style={{ margin: "1rem 0" }}>
//                 <div className="loader" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Dinamik meta və detallar */}
//         <div className="productsPageDescription">
//           <h1>
//             {categoryMetaTitle
//               ? categoryMetaTitle
//               : t?.productsPageCeoDescription ||
//                 "Ceo description - Addenta product category"}
//           </h1>
//           <p>
//             {categoryMetaDescription
//               ? categoryMetaDescription
//               : t?.productsPageDescriptionText || "Ceo Text"}
//           </p>

//           {showDetails && (
//             <div className="productsPageDetailsCEO" style={{ marginTop: "1rem" }}>
//               {categoryPageTitle && <h1>{categoryPageTitle}</h1>}
//               {categoryPageDescription && (
//                 <div
//                   className="page-description-content"
//                   dangerouslySetInnerHTML={{ __html: categoryPageDescription }}
//                 />
//               )}
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

//         {/* Stil */}
//         <style jsx>{`
//           .loader-container {
//             width: 100% !important;
//             min-width: 97rem;
//             min-height: 30rem;
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





























// ? bU KOD ISLEKDIR
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

// Accordion başlık komponenti (className’ler orijinal)
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

// Client-side filtre fetch fonksiyonu
async function fetchProducts(categoryIds = [], brandIds = []) {
  const filters = [];
  if (categoryIds.length) {
    filters.push({ key: "categories", operator: "IN", values: categoryIds });
  }
  if (brandIds.length) {
    filters.push({ key: "brands", operator: "IN", values: brandIds });
  }
  if (!filters.length) {
    try {
      const res = await axiosInstance.get("/page-data/product?per_page=999");
      return res.data.data.data;
    } catch (err) {
      console.error("Fetch all products error", err);
      return [];
    }
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
    const res = await axiosInstance.get(
      `/page-data/product?per_page=999&${query}`
    );
    return res.data.data.data;
  } catch (err) {
    console.error("Filter fetch error (client)", err);
    return [];
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
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
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

  // infinite scroll
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const brandsParam = searchParams.get("brands");

    // kategori slug→id
    const categorySlugs = categoryParam ? categoryParam.split(",") : [];
    const newSelectedCategories = categoryData.filter((c) =>
      categorySlugs.includes(c.url_slug)
    );
    const categoryIds = newSelectedCategories.map((c) => c.id);

    // brands id (keçmiş versiya)
    const brandIds = brandsParam
      ? brandsParam.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
      : [];
    const newSelectedBrands = brandsDataFilter.filter((b) =>
      brandIds.includes(b.id)
    );

    setSelectedCategories(newSelectedCategories);
    setSelectedBrands(newSelectedBrands);
    setShowDetails(false);

    const fetchAndSet = async () => {
      setIsLoading(true);
      try {
        const prods = await fetchProducts(categoryIds, brandIds);
        setFilteredProducts(prods);
      } catch (err) {
        console.error(err);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSet();
    setVisibleCount(12);
  }, [searchParams.toString(), categoryData, brandsDataFilter]);

  const sortedProducts = useMemo(
    () =>
      [...filteredProducts].sort((a, b) =>
        sortOption.value === "az"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      ),
    [filteredProducts, sortOption]
  );

  useEffect(() => {
    setVisibleCount(12);
  }, [sortedProducts]);

  // URL güncelle: kategori slug, brands id
  const updateUrlWithFilters = useCallback(
    (newBrands, newCategories) => {
      const params = new URLSearchParams();
      if (newCategories.length) {
        params.set(
          "category",
          newCategories.map((c) => c.url_slug).join(",")
        );
      }
      if (newBrands.length) {
        params.set("brands", newBrands.map((b) => b.id).join(","));
      }
      const qs = params.toString();
      router.push(qs ? `/products?${qs}` : `/products`);
    },
    [router]
  );

  const handleCategoryToggle = useCallback(
    (category) => {
      const exists = selectedCategories.some((c) => c.id === category.id);
      const updated = exists
        ? selectedCategories.filter((c) => c.id !== category.id)
        : [...selectedCategories, category];
      updateUrlWithFilters(selectedBrands, updated);
    },
    [selectedCategories, selectedBrands, updateUrlWithFilters]
  );

  const handleBrandToggle = useCallback(
    (brand) => {
      const exists = selectedBrands.some((b) => b.id === brand.id);
      const updated = exists
        ? selectedBrands.filter((b) => b.id !== brand.id)
        : [...selectedBrands, brand];
      updateUrlWithFilters(updated, selectedCategories);
    },
    [selectedBrands, selectedCategories, updateUrlWithFilters]
  );

  // infinite scroll obs
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isLoading &&
          !isLoadingMore &&
          visibleCount < sortedProducts.length
        ) {
          setIsLoadingMore(true);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [isLoading, isLoadingMore, visibleCount, sortedProducts.length]);

  useEffect(() => {
    if (isLoadingMore) {
      const timer = setTimeout(() => {
        setVisibleCount((v) => Math.min(v + 12, sortedProducts.length));
        setIsLoadingMore(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoadingMore, sortedProducts.length]);

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

              {/* Seçilmiş kategori və markalar - Desktop */}
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
                className={`filter-panel ${
                  isMobileFilterOpen ? "active" : ""
                }`}
              >
                <button className="filter-titless">
                  {t?.productsPageFilterTitle || "Filter"}
                </button>

                {/* Seçilmiş kategori və markalar - Mobile */}
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
                    {categoryData.map((cat) => {
                      const productCount = allProducts.filter((product) =>
                        product.categories?.some((c) => c.id === cat.id)
                      ).length;
                      const isSelected = selectedCategories.some(
                        (c) => c.id === cat.id
                      );
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
                      onChange={(e) => setBrandSearchTerm(e.target.value)}
                    />
                  </div>
                  <ul
                    style={{
                      maxHeight: "250px",
                      overflowY: "auto",
                      paddingRight: "4px",
                    }}
                  >
                    {brandsDataFilter
                      .filter((brand) =>
                        brand?.title
                          ?.toLowerCase()
                          .includes(brandSearchTerm?.toLowerCase())
                      )
                      .map((brand) => {
                        const isSelected = selectedBrands.some(
                          (b) => b.id === brand.id
                        );
                        return (
                          <li
                            key={brand.id}
                            onClick={() => handleBrandToggle(brand)}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              fontWeight: isSelected ? "bold" : "normal",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                            />
                            <span>{brand.title}</span>
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
                <span>{t?.sortBy || "Sort by"}</span>
                <ReactSelect t={t} value={sortOption} onChange={setSortOption} />
              </div>

              <div className="row">
                {isLoading ? (
                  <div className="loader-container">
                    <div className="loader" />
                  </div>
                ) : (
                  sortedProducts.slice(0, visibleCount).map((d) => (
                    <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
                      <Link
                        href={`/products/${slugify(d.title)}-${d.id}`}
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
            <div ref={loadMoreRef} style={{ height: "1px" }} />
            {isLoadingMore && (
              <div className="loader-container" style={{ margin: "1rem 0" }}>
                <div className="loader" />
              </div>
            )}
          </div>
        </div>

        {/* Dinamik meta və toggle bölməsi */}
        <div className="productsPageDescription">
          <h1>
            {categoryMetaTitle
              ? categoryMetaTitle
              : t?.productsPageCeoDescription ||
                "Ceo description - Addenta product category"}
          </h1>
          <p>
            {categoryMetaDescription
              ? categoryMetaDescription
              : t?.productsPageDescriptionText || "Ceo Text"}
          </p>

          {showDetails && (
            <div className="productsPageDetailsCEO" style={{ marginTop: "1rem" }}>
              {categoryPageTitle && <h1>{categoryPageTitle}</h1>}
              {categoryPageDescription && (
                <div
                  className="page-description-content"
                  dangerouslySetInnerHTML={{ __html: categoryPageDescription }}
                />
              )}
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
        </div>

        {/* style jsx */}
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









// *id versiya url
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

// // Accordion başlık komponenti (className’ler orijinal)
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

// // Client-side filtre fetch fonksiyonu (isteğe bağlı; server-side navigation tercih edersen bu fonksiyonu ve useEffect içindeki fetch’i kaldırabilirsin)
// async function fetchProducts(categoryIds = [], brandIds = []) {
//   const filters = [];

//   if (categoryIds.length) {
//     filters.push({
//       key: "categories",
//       operator: "IN",
//       values: categoryIds,
//     });
//   }
//   if (brandIds.length) {
//     filters.push({
//       key: "brands",
//       operator: "IN",
//       values: brandIds,
//     });
//   }
//   if (!filters.length) {
//     try {
//       const res = await axiosInstance.get("/page-data/product?per_page=999");
//       return res.data.data.data;
//     } catch (err) {
//       console.error("Fetch all products error", err);
//       return [];
//     }
//   }
//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(
//         f.key
//       )}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");
//   try {
//     const res = await axiosInstance.get(
//       `/page-data/product?per_page=999&${query}`
//     );
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error (client)", err);
//     return [];
//   }
// }

// // Güvenli slugify utility (orijinal)
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
//   allProducts = [], // Yeni: global tüm ürün listesi
//   initialProducts = [], // Server-side filtreli başlangıç listesi
//   categoryData = [],
//   brandsDataFilter = [],
//   initialSelectedBrands = [],
//   initialSelectedCategories = [],
//   categoryMetaTitle = null,
//   categoryMetaDescription = null,
//   categoryPageTitle = null,
//   categoryPageDescription = null,
//   categoryId = null,
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Filtrelenmiş ve sıralı ürünler:
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

//   // ==== Aşağıdaki üç satır sadece infinite scroll eklemesi için eklendi, diğer bölümler birebir aynı kalacak ====
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const loadMoreRef = useRef(null);
//   // ================================================================================================

//   // URL değiştiğinde selectedCategories/Brands ve filteredProducts güncelle
//   useEffect(() => {
//     const categoryParam = searchParams.get("category");
//     const brandsParam = searchParams.get("brands");

//     let categoryIds = [];
//     if (categoryParam) {
//       const idParts = categoryParam.split(",");
//       categoryIds = idParts
//         .map((id) => parseInt(id, 10))
//         .filter((n) => !isNaN(n));
//     }

//     let brandIds = [];
//     if (brandsParam) {
//       const parts = Array.isArray(brandsParam)
//         ? brandsParam
//         : brandsParam.split(",");
//       brandIds = parts.map((p) => parseInt(p, 10)).filter((n) => !isNaN(n));
//     }

//     const newSelectedCategories = categoryData.filter((c) =>
//       categoryIds.includes(c.id)
//     );
//     const newSelectedBrands = brandsDataFilter.filter((b) =>
//       brandIds.includes(b.id)
//     );

//     setSelectedCategories(newSelectedCategories);
//     setSelectedBrands(newSelectedBrands);
//     setShowDetails(false);

//     // Client-side fetch:
//     const fetchAndSet = async () => {
//       setIsLoading(true);
//       try {
//         const prods = await fetchProducts(categoryIds, brandIds);
//         setFilteredProducts(prods);
//       } catch (err) {
//         console.error("Client fetch error in useEffect", err);
//         setFilteredProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchAndSet();

//     // Filtre değiştiğinde infinite scroll'u reset etmek için:
//     setVisibleCount(12);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams.toString(), categoryData, brandsDataFilter]);

//   // Sıralı ürünler
//   const sortedProducts = useMemo(() => {
//     return [...filteredProducts].sort((a, b) =>
//       sortOption.value === "az"
//         ? a.title.localeCompare(b.title)
//         : b.title.localeCompare(a.title)
//     );
//   }, [filteredProducts, sortOption]);

//   // sortedProducts değiştiğinde infinite scroll'u resetle
//   useEffect(() => {
//     setVisibleCount(12);
//   }, [sortedProducts]);

//   // URL güncelleme
//   const updateUrlWithFilters = useCallback(
//     (newBrands, newCategories) => {
//       const params = new URLSearchParams();

//       if (newCategories.length) {
//         const categoryIds = newCategories.map((c) => c.id);
//         params.set("category", categoryIds.join(","));
//       }
//       if (newBrands.length) {
//         params.set("brands", newBrands.map((b) => b.id).join(","));
//       }

//       const queryString = params.toString();
//       const href = queryString ? `/products?${queryString}` : `/products`;
//       router.push(href);
//     },
//     [router]
//   );

//   const handleCategoryToggle = useCallback(
//     (category) => {
//       let newSelected;
//       if (selectedCategories.some((c) => c.id === category.id)) {
//         newSelected = selectedCategories.filter((c) => c.id !== category.id);
//       } else {
//         newSelected = [...selectedCategories, category];
//       }
//       updateUrlWithFilters(selectedBrands, newSelected);
//     },
//     [selectedCategories, selectedBrands, updateUrlWithFilters]
//   );

//   const handleBrandToggle = useCallback(
//     (brand) => {
//       let newSelected;
//       if (selectedBrands.some((b) => b.id === brand.id)) {
//         newSelected = selectedBrands.filter((b) => b.id !== brand.id);
//       } else {
//         newSelected = [...selectedBrands, brand];
//       }
//       updateUrlWithFilters(newSelected, selectedCategories);
//     },
//     [selectedBrands, selectedCategories, updateUrlWithFilters]
//   );

//   // ==== Aşağıda sadece infinite scroll için eklenen useEffect’ler var; diğer kod tamamen aynı ====

//   // Infinite scroll: Intersection Observer
//   useEffect(() => {
//     if (!loadMoreRef.current) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];
//         if (
//           entry.isIntersecting &&
//           !isLoading &&
//           !isLoadingMore &&
//           visibleCount < sortedProducts.length
//         ) {
//           setIsLoadingMore(true);
//         }
//       },
//       {
//         root: null,
//         rootMargin: "200px", // isterseniz azaltabilirsiniz
//         threshold: 0.1,
//       }
//     );
//     observer.observe(loadMoreRef.current);
//     return () => {
//       observer.disconnect();
//     };
//   }, [isLoading, isLoadingMore, visibleCount, sortedProducts.length]);

//   // isLoadingMore true olduğunda visibleCount artır ve spinner'ı gizle
//   useEffect(() => {
//     if (isLoadingMore) {
//       const timer = setTimeout(() => {
//         setVisibleCount((prev) =>
//           Math.min(prev + 12, sortedProducts.length)
//         );
//         setIsLoadingMore(false);
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [isLoadingMore, sortedProducts.length]);

//   // ============================================================================================

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
//                 className={`filter-panel ${
//                   isMobileFilterOpen ? "active" : ""
//                 }`}
//               >
//                 <button className="filter-titless">
//                   {t?.productsPageFilterTitle || "Filter"}
//                 </button>

//                 {/* Seçilmiş kategori ve markalar - Mobile */}
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
//                       // Burada sayımı global allProducts üzerinden yapıyoruz:
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
//                 <span>{t?.sortBy || "Sort by"}</span>
//                 <ReactSelect t={t} value={sortOption} onChange={setSortOption} />
//               </div>

//               <div className="row">
//                 {isLoading ? (
//                   <div className="loader-container">
//                     <div className="loader" />
//                   </div>
//                 ) : (
//                   // Sadece visibleCount kadarını göster
//                   sortedProducts.slice(0, visibleCount).map((d) => (
//                     <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
//                       <Link href={`/products/${slugify(d.title)}-${d.id}`} className="block">
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
//             {/* Infinite scroll için gözlem div’i */}
//             <div ref={loadMoreRef} style={{ height: "1px" }} />

//             {/* Loading more spinner */}
//             {isLoadingMore && (
//               <div className="loader-container" style={{ margin: "1rem 0" }}>
//                 <div className="loader" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Dinamik meta_title / meta_description gösterimi ve toggle ile detay gösterme */}
//         <div className="productsPageDescription">
//           <h1>
//             {categoryMetaTitle
//               ? categoryMetaTitle
//               : t?.productsPageCeoDescription ||
//                 "Ceo description - Addenta product category"}
//           </h1>
//           <p>
//             {categoryMetaDescription
//               ? categoryMetaDescription
//               : t?.productsPageDescriptionText || "Ceo Text"}
//           </p>

//           {showDetails && (
//             <div className="productsPageDetailsCEO" style={{ marginTop: "1rem" }}>
//               {categoryPageTitle && <h1>{categoryPageTitle}</h1>}
//               {categoryPageDescription && (
//                 <div
//                   className="page-description-content"
//                   dangerouslySetInnerHTML={{ __html: categoryPageDescription }}
//                 />
//               )}
//             </div>
//           )}

//           <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
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

//         {/* style jsx kısmı unchanged, sadece className’larda ufak düzeltme yaptık */}
//         <style jsx>{`



//           .loader-container {
//             width: 100% !important;
//             min-width: 97rem;
//             min-height: 30rem;
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
