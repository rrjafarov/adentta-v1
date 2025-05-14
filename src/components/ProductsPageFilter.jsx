// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";

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

// const ProductsPageFilter = ({ productData }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>Products</h4>
//         </div>

//         <div className="row">
//           <div className="xl-3 lg-3 md-3 sm-12  ">
//             <div className="filter-container">
//               {/* Filtre butonu her zaman görünsün */}
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 Filter
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
//                 <button className="filter-titless">Filter</button>

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

//                 <FilterAccordion title="Category">
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
//                 <FilterAccordion title="By Area of Use">
//                   <ul>
//                     <li>
//                       <input type="checkbox" /> Hospital
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Clinics
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Dental Offices
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Laboratories
//                     </li>
//                     <li>
//                       <input type="checkbox" /> For home use
//                     </li>
//                   </ul>
//                 </FilterAccordion>
//                 <FilterAccordion title="Functions and Features">
//                   <ul>
//                     <li>
//                       <input type="checkbox" /> Portable / Stationary
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Digital / Mechanical
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Battery-powered /
//                       Electric-powered
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Automatic / Manual
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Portable / Stationary
//                     </li>
//                   </ul>
//                 </FilterAccordion>
//                 <FilterAccordion title="Brand">
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder="Search..."
//                     />
//                   </div>
//                   <ul>
//                     <li>
//                       <input type="checkbox" /> Siemens
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Philips Healthcare
//                     </li>
//                     <li>
//                       <input type="checkbox" /> GE Healthcare
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Mindray
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Boston Scientific
//                     </li>
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
//                 <span>Sort by</span>
//                 <div>
//                   <ReactSelect />
//                 </div>
//               </div>
//               <div className="row">
//                 {productData.map((data) => (
//                   <div key={data.id} className="xl-4 lg-4 md-6 sm-6">
//                     {/* <Link href={`/products/${data.id}`} className="block"> */}
//                     <Link href={`/products/${data.title.toLowerCase().replace(/\s+/g, '-')}-${data.id}`} className="block">
//                       <div className="homePageProductCardContent">
//                         <div className="homePageProCardImgs">
//                           <div className="homePageProductCardContentImage">
//                             {/* <img src="/images/productsImg02.png" alt="" /> */}
//                             <img
//                               src={`https://admin.adentta.az/storage${data.image}`}
//                               alt=""
//                             />
//                           </div>
//                         </div>
//                         <div className="homePageProductCardContentInner">
//                           <div className="homePageProductCardContentText">
//                             <span>{data.title}</span>
//                             {/* <div
//                               dangerouslySetInnerHTML={{ __html: data.content }}
//                             ></div> */}
//                           </div>
//                           <div className="price">
//                             <div className="priceItem">
//                               <strong id="prices">{data.price}</strong>
//                               <Manat />
//                             </div>
//                           </div>
//                         </div>

//                         <div className="homePageProductCardContentBottom">
//                           <span>Learn More</span>
//                           <img src="/icons/arrowTopRight.svg" alt="" />
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center justify-center">
//               <LoadMoreBTN />
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           <h6>Ceo description - Addenta product category</h6>
//           <p>
//             Lorem ipsum dolor sit amet consectetur. Risus aliquam non aliquet et
//             tempus. Venenatis neque mollis curabitur et faucibus posuere nisl
//             justo leo. Volutpat rhoncus et et a senectus adipiscing molestie sed
//             venenatis. Tellus volutpat magnis nulla leo faucibus elementum.
//           </p>
//           <div className="productsPageDescriptionLink">
//             <Link href={"/"}>seeMore</Link>
//             <img src="/icons/rightDown.svg" alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPageFilter;

// !-------------------------------------------------------------------------------------------------

// "use client";
// import Link from "next/link";
// import React, { useState, useMemo } from "react";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios"; // öz path-ınla düzəlt

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

// // Seçilən kateqoriya üzrə məhsulları fetch edən funksiya
// const fetchProductsByCategory = async (categoryId) => {
//   const url = `/page-data/product?filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=${categoryId}`;
//   try {
//     const response = await axiosInstance.get(url, { cache: "no-store" });
//     return response.data.data.data; // ikiqat "data"
//   } catch (error) {
//     console.error("Error fetching products by category", error);
//     return [];
//   }
// };

// const ProductsPageFilter = ({ productData, categoryData }) => {
//   // State-lər
//   const [filteredProducts, setFilteredProducts] = useState(productData);
//   const [sortOption, setSortOption] = useState({
//     value: "az",
//     label: "From A-Z",
//   });
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Kateqoriya kliklənəndə fetch və state update
//   const handleCategoryClick = async (categoryId) => {
//     setIsLoading(true);
//     const prods = await fetchProductsByCategory(categoryId);
//     setFilteredProducts(prods);
//     setIsLoading(false);
//   };

//   // Məhsulları sort etmək üçün useMemo
//   const sortedProducts = useMemo(() => {
//     const arr = [...filteredProducts];
//     return arr.sort((a, b) =>
//       sortOption.value === "az"
//         ? a.title.localeCompare(b.title)
//         : b.title.localeCompare(a.title)
//     );
//   }, [filteredProducts, sortOption]);

//   return (
//     <div>
//       <div className="container">
//         {/* Başlıq bölməsi */}
//         <div className="filterTop topper">
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>Products</h4>
//         </div>

//         <div className="row">
//           {/* Sidebar Filter */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 Filter
//               </button>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">Filter</button>

//                 <div className="selectedFilter mobile-only">
//                   {/* Burada seçilmiş filtrlər gələcək */}
//                 </div>

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 {/* Category Filter */}
//                 <FilterAccordion title="Category">
//                   <ul>
//                     {categoryData.map((cat) => (
//                       <li
//                         key={cat.id}
//                         onClick={() => handleCategoryClick(cat.id)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {cat.title} <p>({cat.count || 0})</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </FilterAccordion>

//                 {/* By Area of Use */}
//                 <FilterAccordion title="By Area of Use">
//                   <ul>
//                     <li>
//                       <input type="checkbox" /> Hospital
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Clinics
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Dental Offices
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Laboratories
//                     </li>
//                     <li>
//                       <input type="checkbox" /> For home use
//                     </li>
//                   </ul>
//                 </FilterAccordion>

//                 {/* Functions and Features */}
//                 <FilterAccordion title="Functions and Features">
//                   <ul>
//                     <li>
//                       <input type="checkbox" /> Portable / Stationary
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Digital / Mechanical
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Battery-powered /
//                       Electric-powered
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Automatic / Manual
//                     </li>
//                   </ul>
//                 </FilterAccordion>

//                 {/* Brand Filter */}
//                 <FilterAccordion title="Brand">
//                   <div className="filteredSearch">
//                     <img src="icons/searchIcon.svg" alt="" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder="Search..."
//                     />
//                   </div>
//                   <ul>
//                     <li>
//                       <input type="checkbox" /> Siemens
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Philips Healthcare
//                     </li>
//                     <li>
//                       <input type="checkbox" /> GE Healthcare
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Mindray
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Boston Scientific
//                     </li>
//                   </ul>
//                 </FilterAccordion>

//                 <div className="applyBTN flex items-center mt-4 justify-center">
//                   <ApplyBTN />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>Sort by</span>
//                 <div>
//                   <ReactSelect value={sortOption} onChange={setSortOption} />
//                 </div>
//               </div>

//               <div className="row">
//                 {isLoading ? (
//                   <div className="loader-container">
//                     <div className="loader" />
//                   </div>
//                 ) : (
//                   sortedProducts.map((d) => (
//                     <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
//                       <Link className="block"
//                         href={`/products/${d.title
//                           .toLowerCase()
//                           .replace(/\s+/g, "-")}-${d.id}`}
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
//                             <span>Learn More</span>
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
//               <LoadMoreBTN />
//             </div>
//           </div>
//         </div>

//         {/* Page Description */}
//         <div className="productsPageDescription">
//           <h6>Ceo description - Addenta product category</h6>
//           <p>
//             Lorem ipsum dolor sit amet consectetur. Risus aliquam non aliquet et
//             tempus. Venenatis neque mollis curabitur et faucibus posuere nisl
//             justo leo.
//           </p>
//           <div className="productsPageDescriptionLink">
//             <Link href={"/"}>seeMore</Link>
//             <img src="/icons/rightDown.svg" alt="" />
//           </div>
//         </div>
//       </div>

//       {/* Inline CSS for spinner */}
//       <style jsx>{`
//         .loader-container {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 5rem auto;
//           // margin: 0 auto;
//         }
//         .loader {
//           border: 5px solid #98B4DE;
//           border-top: 5px solid #293881;
//           border-radius: 50%;
//           width: 50px;
//           height: 50px;
//           animation: spin 0.8s linear infinite;
//         }
//         @keyframes spin {
//           to {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;

// ! son versiya
// ProductsPageFilter.jsx
// "use client";
// import Link from "next/link";
// import React, { useState, useMemo } from "react";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios"; // layihəndə baseURL konfiqurasiyası üçün

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

// // Seçilmiş kateqoriyalar üzrə məhsulları gətirən funksiya
// const fetchProductsByCategories = async (categoryIds) => {
//   const query = categoryIds.map((id) => `filters[0][value][]=${id}`).join("&");
//   const url = `/page-data/product?filters[0][key]=categories&filters[0][operator]=IN&${query}`;
//   try {
//     const response = await axiosInstance.get(url, { cache: "no-store" });
//     // Cavab strukturu: { status_code, message, data: { current_page, data: [ … ] } }
//     return response.data.data.data;
//   } catch (error) {
//     console.error("Error fetching products by categories", error);
//     return [];
//   }
// };

// const ProductsPageFilter = ({ productData, categoryData, brandsData }) => {
//   const [filteredProducts, setFilteredProducts] = useState(productData);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [sortOption, setSortOption] = useState({
//     value: "az",
//     label: "From A-Z",
//   });
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");

//   // Kateqoriya seçimi / de-seçimi
//   const handleCategoryToggle = async (category) => {
//     // Əgər artıq seçilibsə, çıxar; yoxdursa əlavə et
//     const exists = selectedCategories.some((c) => c.id === category.id);
//     const newSelected = exists
//       ? selectedCategories.filter((c) => c.id !== category.id)
//       : [...selectedCategories, category];

//     setSelectedCategories(newSelected);
//     setIsLoading(true);

//     // Əgər heç kateqoriya qalmazsa, bütün məhsulları göstər
//     const ids = newSelected.map((c) => c.id);
//     const prods =
//       ids.length > 0 ? await fetchProductsByCategories(ids) : productData;

//     setFilteredProducts(prods);
//     setIsLoading(false);
//   };

//   // Tag üzərindəki × düyməsi eyni funksiyanı çağırır
//   const handleCategoryRemove = (category) => {
//     handleCategoryToggle(category);
//   };

//   // Məhsulları sort etmək
//   const sortedProducts = useMemo(() => {
//     const arr = [...filteredProducts];
//     return arr.sort((a, b) =>
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
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>Products</h4>
//         </div>

//         <div className="row">
//           {/* Sidebar Filter */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 Filter
//               </button>

//               {/* Seçilmiş kateqoriyalar - Desktop */}
//               <div className="selectedFilter desktop-only">
//                 {selectedCategories.map((cat) => (
//                   <div className="selectedFilterInner" key={cat.id}>
//                     <span onClick={() => handleCategoryRemove(cat)}>×</span>
//                     <p>{cat.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">Filter</button>

//                 {/* Seçilmiş kateqoriyalar - Mobile */}
//                 <div className="selectedFilter mobile-only">
//                   {selectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={cat.id}>
//                       <span onClick={() => handleCategoryRemove(cat)}>×</span>
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

//                 {/* Category Accordion */}
//                 <FilterAccordion title="Category">
//                   <ul>
//                     {categoryData.map((cat) => {
//                       // Bu kategoriyaya aid olan məhsulların sayını tapırıq
//                       const productCount = productData.filter((product) =>
//                         product.categories?.some((c) => c.id === cat.id)
//                       ).length;

//                       return (
//                         <li
//                           key={cat.id}
//                           onClick={() => handleCategoryToggle(cat)}
//                           style={{
//                             cursor: "pointer",
//                             fontWeight: selectedCategories.some(
//                               (c) => c.id === cat.id
//                             )
//                               ? "bold"
//                               : "normal",
//                             display: "flex",
//                             justifyContent: "flex-start",
//                             gap: "0.5rem",
//                             alignItems: "center",
//                           }}
//                         >
//                           <span>{cat.title}</span>
//                           <p style={{ color: "#29282F" }}>({productCount})</p>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                   {/* <ul>
//                     {categoryData.map((cat) => (
//                       <li
//                         key={cat.id}
//                         onClick={() => handleCategoryToggle(cat)}
//                         style={{
//                           cursor: "pointer",
//                           fontWeight: selectedCategories.some(
//                             (c) => c.id === cat.id
//                           )
//                             ? "bold"
//                             : "normal",
//                         }}
//                       >
//                         {cat.title} <p>({cat.count || 0})</p>
//                       </li>
//                     ))}
//                   </ul> */}
//                 </FilterAccordion>

//                 {/* Digər Accordion-lar unchanged */}
//                 <FilterAccordion title="By Area of Use">
//                   <ul>
//                     <li>
//                       <input type="checkbox" /> Hospital
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Clinics
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Dental Offices
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Laboratories
//                     </li>
//                     <li>
//                       <input type="checkbox" /> For home use
//                     </li>
//                   </ul>
//                 </FilterAccordion>

//                 <FilterAccordion title="Functions and Features">
//                   <ul>
//                     <li>
//                       <input type="checkbox" /> Portable / Stationary
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Digital / Mechanical
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Battery-powered /
//                       Electric-powered
//                     </li>
//                     <li>
//                       <input type="checkbox" /> Automatic / Manual
//                     </li>
//                   </ul>
//                 </FilterAccordion>

//                 <FilterAccordion title="Brand">
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder="Search..."
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {brandsData
//                       .filter((brand) =>
//                         brand.title
//                           .toLowerCase()
//                           .includes(brandSearchTerm.toLowerCase())
//                       )
//                       .map((brand) => (
//                         <li key={brand.id}>
//                           <label>
//                             <input type="checkbox" />
//                             {brand.title}
//                           </label>
//                         </li>
//                       ))}
//                   </ul>
//                 </FilterAccordion>

//                 <div
//                   onClick={() => setMobileFilterOpen(false)}
//                   className="applyBTN flex items-center mt-4 justify-center"
//                 >
//                   <ApplyBTN />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>Sort by</span>
//                 <ReactSelect value={sortOption} onChange={setSortOption} />
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
//                           .toLowerCase()
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
//                             <span>Learn More</span>
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
//               <LoadMoreBTN className="buttonNoneDesktop" />
//             </div>
//           </div>
//         </div>

//         {/* Page Description */}
//         <div className="productsPageDescription">
//           <h6>Ceo description - Addenta product category</h6>
//           <p>
//             Lorem ipsum dolor sit amet consectetur. Risus aliquam non aliquet et
//             tempus. Venenatis neque mollis curabitur et faucibus posuere nisl
//             justo leo.
//           </p>
//           <div className="productsPageDescriptionLink">
//             <Link href={"/"}>seeMore</Link>
//             <img src="/icons/rightDown.svg" alt="" />
//           </div>
//         </div>
//       </div>

//       {/* Spinner Styles */}
//       <style jsx>{`
//         .loader-container {
//           width: 100%;
//           width: 100rem;
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
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;

// ! BU MENIM SON VERSIYAMDIR
// "use client";
// import Link from "next/link";
// import React, { useState, useMemo } from "react";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios"; // layihəndə baseURL konfiqurasiyası üçün

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
// const fetchProducts = async (categoryIds = [], brandIds = []) => {
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
//       const base = `filters[${idx}][key]=${f.key}&filters[${idx}][operator]=${f.operator}`;
//       const vals = f.values.map((v) => `filters[${idx}][value][]=${v}`).join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");

//   const url = `/page-data/product?${query}`;
//   try {
//     const res = await axiosInstance.get(url, { cache: "no-store" });
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error", err);
//     return [];
//   }
// };

// const ProductsPageFilter = ({ productData, categoryData, brandsData }) => {
//   const [filteredProducts, setFilteredProducts] = useState(productData);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [sortOption, setSortOption] = useState({ value: "az", label: "From A-Z" });
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");

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
//     const arr = [...filteredProducts];
//     return arr.sort((a, b) =>
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
//           <h1>Adentta</h1>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <h4>Products</h4>
//         </div>

//         <div className="row">
//           {/* Sidebar Filter */}
//           <div className="xl-3 lg-3 md-3 sm-12">
//             <div className="filter-container">
//               <button
//                 className="filter-title"
//                 onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//               >
//                 Filter
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
//                   <div className="selectedFilterInner" key={`brand-${brand.id}`}>
//                     <span onClick={() => handleBrandToggle(brand)}>×</span>
//                     <p>{brand.title}</p>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className={`filter-panel ${isMobileFilterOpen ? "active" : ""}`}
//               >
//                 <button className="filter-titless">Filter</button>

//                 {/* Seçilmiş kateqoriya və markalar - Mobile */}
//                 <div className="selectedFilter mobile-only">
//                   {selectedCategories.map((cat) => (
//                     <div className="selectedFilterInner" key={`cat-${cat.id}`}>
//                       <span onClick={() => handleCategoryToggle(cat)}>×</span>
//                       <p>{cat.title}</p>
//                     </div>
//                   ))}
//                   {selectedBrands.map((brand) => (
//                     <div className="selectedFilterInner" key={`brand-${brand.id}`}>
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

//                 {/* Category Accordion */}
//                 <FilterAccordion title="Category">
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
//                             fontWeight: selectedCategories.some((c) => c.id === cat.id)
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

//                 {/* By Area of Use Accordion */}
//                 {/* <FilterAccordion title="By Area of Use">
//                   <ul>
//                     <li><input type="checkbox" /> Hospital</li>
//                     <li><input type="checkbox" /> Clinics</li>
//                     <li><input type="checkbox" /> Dental Offices</li>
//                     <li><input type="checkbox" /> Laboratories</li>
//                     <li><input type="checkbox" /> For home use</li>
//                   </ul>
//                 </FilterAccordion> */}

//                 {/* Functions and Features Accordion */}
//                 {/* <FilterAccordion title="Functions and Features">
//                   <ul>
//                     <li><input type="checkbox" /> Portable / Stationary</li>
//                     <li><input type="checkbox" /> Digital / Mechanical</li>
//                     <li><input type="checkbox" /> Battery-powered / Electric-powered</li>
//                     <li><input type="checkbox" /> Automatic / Manual</li>
//                   </ul>
//                 </FilterAccordion> */}

//                 {/* Brand Accordion */}
//                 <FilterAccordion title="Brand">
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="" />
//                     <input
//                       className="filterSrch"
//                       type="text"
//                       placeholder="Search..."
//                       value={brandSearchTerm}
//                       onChange={(e) => setBrandSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <ul>
//                     {brandsData
//                       .filter((brand) =>
//                         brand.title.toLowerCase().includes(brandSearchTerm.toLowerCase())
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
//                             checked={selectedBrands.some((b) => b.id === brand.id)}
//                             readOnly
//                           />
//                           <span>{brand.title}</span>
//                         </li>
//                       ))}
//                   </ul>
//                 </FilterAccordion>

//                 {/* Mobile Apply Button */}
//                 <div
//                   onClick={() => setMobileFilterOpen(false)}
//                   className="applyBTN flex items-center mt-4 justify-center"
//                 >
//                   <ApplyBTN />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>Sort by</span>
//                 <ReactSelect value={sortOption} onChange={setSortOption} />
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
//                           .toLowerCase()
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
//                             <span>Learn More</span>
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
//               <LoadMoreBTN className="buttonNoneDesktop" />
//             </div>
//           </div>
//         </div>

//         {/* Page Description */}
//         <div className="productsPageDescription">
//           <h6>Ceo description - Addenta product category</h6>
//           <p>
//             Lorem ipsum dolor sit amet consectetur. Risus aliquam non aliquet et
//             tempus. Venenatis neque mollis curabitur et faucibus posuere nisl
//             justo leo.
//           </p>
//           <div className="productsPageDescriptionLink">
//             <Link href={"/"}>seeMore</Link>
//             <img src="/icons/rightDown.svg" alt="" />
//           </div>
//         </div>
//       </div>

//       {/* Spinner Styles */}
//       <style jsx>{`
//         .loader-container {
//           width: 100%;
//           width: 100rem;
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
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;
// ! BU MENIM SON VERSIYAMDIR

// * tetdt----------
// File: components/ProductsPageFilter.jsx
// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import LoadMoreBTN from "./LoadMoreBTN";
// import ApplyBTN from "./ApplyBTN";
// import ReactSelect from "./ReactSelect";
// import Manat from "../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// // Accordion başlık komponenti
// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-expanded={isOpen}
//       >
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

// // API'den filtrelenmiş ürünleri çek
// async function fetchProducts(categoryIds = [], brandIds = []) {
//   const filters = [];
//   if (categoryIds.length) filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   if (brandIds.length) filters.push({ key: "brands", operator: "IN", values: brandIds });

//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map(v => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");

//   try {
//     const res = await axiosInstance.get(`/page-data/product?${query}`, { cache: "no-store" });
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error", err);
//     return [];
//   }
// }

// // Props: productData, categoryData, brandsData, categoryParam (URL parametre)
// export default function ProductsPageFilter({
//   productData = [],
//   categoryData = [],
//   brandsData = [],
//   categoryParam = null
// }) {
//   const [filteredProducts, setFilteredProducts] = useState(productData);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [sortOption, setSortOption] = useState({ value: "az", label: "From A-Z" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

//   // İlk yükleme veya URL'den kategori geldiğinde çalışır
//   useEffect(() => {
//     if (categoryParam) {
//       const catId = parseInt(categoryParam, 10);
//       const matched = categoryData.find(c => c.id === catId);
//       if (matched) {
//         setIsLoading(true);
//         fetchProducts([catId], [])
//           .then(prods => {
//             setFilteredProducts(prods);
//             setSelectedCategories([matched]);
//           })
//           .finally(() => setIsLoading(false));
//       }
//     } else {
//       // Param yoksa tüm ürünleri göster
//       setFilteredProducts(productData);
//       setSelectedCategories([]);
//     }
//   }, [categoryParam, categoryData, productData]);

//   // Kategori seç/toggle
//   const handleCategoryToggle = async category => {
//     const exists = selectedCategories.some(c => c.id === category.id);
//     const newCats = exists
//       ? selectedCategories.filter(c => c.id !== category.id)
//       : [...selectedCategories, category];
//     setSelectedCategories(newCats);

//     setIsLoading(true);
//     const catIds = newCats.map(c => c.id);
//     const brandIds = selectedBrands.map(b => b.id);
//     const prods = catIds.length || brandIds.length
//       ? await fetchProducts(catIds, brandIds)
//       : productData;
//     setFilteredProducts(prods);
//     setIsLoading(false);
//   };

//   // Marka seç/toggle
//   const handleBrandToggle = async brand => {
//     const exists = selectedBrands.some(b => b.id === brand.id);
//     const newBrands = exists
//       ? selectedBrands.filter(b => b.id !== brand.id)
//       : [...selectedBrands, brand];
//     setSelectedBrands(newBrands);

//     setIsLoading(true);
//     const catIds = selectedCategories.map(c => c.id);
//     const brandIds = newBrands.map(b => b.id);
//     const prods = catIds.length || brandIds.length
//       ? await fetchProducts(catIds, brandIds)
//       : productData;
//     setFilteredProducts(prods);
//     setIsLoading(false);
//   };

//   // Sıralama
//   const sortedProducts = useMemo(() => {
//     return [...filteredProducts].sort((a, b) =>
//       sortOption.value === "az"
//         ? a.title.localeCompare(b.title)
//         : b.title.localeCompare(a.title)
//     );
//   }, [filteredProducts, sortOption]);

//   return (
//     <div className="container">
//       {/* Başlık */}
//       <div className="filterTop topper">
//         <h1>Adentta</h1>
//         <img src="/icons/rightDown.svg" alt="" />
//         <h4>Products</h4>
//       </div>

//       <div className="row">
//         {/* Sidebar Filter */}
//         <div className="xl-3 lg-3 md-3 sm-12">
//           <button
//             className="filter-title"
//             onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
//           >
//             Filter
//           </button>

//           {isMobileFilterOpen && (
//             <div className="filter-panel active">
//               {/* Category Accordion */}
//               <FilterAccordion title="Category">
//                 <ul>
//                   {categoryData.map(cat => (
//                     <li
//                       key={cat.id}
//                       onClick={() => handleCategoryToggle(cat)}
//                       style={{ cursor: "pointer", fontWeight: selectedCategories.some(c => c.id === cat.id) ? "bold" : "normal" }}
//                     >
//                       {cat.title}
//                     </li>
//                   ))}
//                 </ul>
//               </FilterAccordion>

//               {/* Brand Accordion */}
//               <FilterAccordion title="Brand">
//                 <div className="filteredSearch">
//                   <img src="/icons/searchIcon.svg" alt="" />
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     value={brandSearchTerm}
//                     onChange={e => setBrandSearchTerm(e.target.value)}
//                     className="filterSrch"
//                   />
//                 </div>
//                 <ul>
//                   {brandsData
//                     .filter(b => b.title.toLowerCase().includes(brandSearchTerm.toLowerCase()))
//                     .map(brand => (
//                       <li
//                         key={brand.id}
//                         onClick={() => handleBrandToggle(brand)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         <input type="checkbox" readOnly checked={selectedBrands.some(b => b.id === brand.id)} />
//                         {brand.title}
//                       </li>
//                     ))}
//                 </ul>
//               </FilterAccordion>

//               <div className="applyBTN flex items-center mt-4 justify-center" onClick={() => setMobileFilterOpen(false)}>
//                 <ApplyBTN />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Products Grid */}
//         <div className="xl-9 lg-9 md-9 sm-12">
//           <div className="productPageSorting">
//             <span>Sort by</span>
//             <ReactSelect value={sortOption} onChange={setSortOption} />
//           </div>

//           <div className="row">
//             {isLoading ? (
//               <div className="loader-container"><div className="loader" /></div>
//             ) : (
//               sortedProducts.map(d => (
//                 <div key={d.id} className="xl-4 lg-4 md-6 sm-6">
//                   <Link href={`/products/${d.title.replace(/\s+/g, "-").toLowerCase()}-${d.id}`}>
//                     <div className="homePageProductCardContent">
//                       <div className="homePageProCardImgs">
//                         <div className="homePageProductCardContentImage">
//                           <img src={`https://admin.adentta.az/storage${d.image}`} alt={d.title} />
//                         </div>
//                       </div>
//                       <div className="homePageProductCardContentInner">
//                         <div className="homePageProductCardContentText">
//                           <span>{d.title}</span>
//                         </div>
//                         <div className="price">
//                           <div className="priceItem">
//                             <strong id="prices">{d.price}</strong>
//                             <Manat />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="homePageProductCardContentBottom">
//                         <span>Learn More</span>
//                         <img src="/icons/arrowTopRight.svg" alt="" />
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="flex items-center justify-center">
//             <LoadMoreBTN />
//           </div>
//         </div>
//       </div>

//       {/* Page Description */}
//       <div className="productsPageDescription">
//         <h6>Ceo description - Addenta product category</h6>
//         <p>
//           Lorem ipsum dolor sit amet consectetur. Risus aliquam non aliquet et
//           tempus. Venenatis neque mollis curabitur et faucibus posuere nisl
//           justo leo.
//         </p>
//         <div className="productsPageDescriptionLink">
//           <Link href="/">seeMore</Link>
//           <img src="/icons/rightDown.svg" alt="" />
//         </div>
//       </div>

//       {/* Spinner Styles */}
//       <style jsx>{`
//         .loader-container {
//           width: 100%;
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
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }





  
// * LAST VERSION


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
    label: "From A-Z",
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
