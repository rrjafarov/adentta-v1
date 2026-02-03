// "use client";

// import Link from "next/link";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[\/\\]+/g, "-")
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

// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list
//     .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
//     .filter(Boolean);
// }

// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header"
//         onClick={() => setIsOpen((prev) => !prev)}
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

// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (
//     typeof parentRaw === "object" &&
//     parentRaw !== null &&
//     parentRaw.id != null
//   ) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData = [],
//   initialTotalCount = 0,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [totalCount, setTotalCount] = useState(initialTotalCount);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const searchText = (searchParams.get("search_text") || "").trim();

//   // SSR-dan gələn initial data-nı set et
//   useEffect(() => {
//     setProductData(initialProductData);
//     setTotalCount(initialTotalCount);
//   }, [initialProductData, initialTotalCount]);

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
//             if (Number.isFinite(cid)) {
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
//       const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//       if (urlSlugs.length > 0) {
//         const ids = urlSlugs
//           .map((slug) => categoryData.find((c) => getCategorySlug(c) === slug)?.id)
//           .map(Number)
//           .filter(Number.isFinite);
//         setSelectedCategoryIds(ids.length > 0 ? ids : []);
//       } else {
//         setSelectedCategoryIds([]);
//       }
//     }
//   }, [selectedCategory?.id, searchParams, categoryData]);

//   useEffect(() => {
//     const brands = searchParams
//       .getAll("brand")
//       .map((b) => parseInt(b, 10))
//       .filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   const perPage = useMemo(() => Number(searchParams.get("per_page") || 12), [searchParams]);

//   const totalPages = useMemo(() => (totalCount ? Math.ceil(totalCount / perPage) : 1), [totalCount, perPage]);

//   const currentPage = useMemo(() => Math.max(1, Number(searchParams.get("page") || 1)), [searchParams]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
//         .map(Number)
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     return selectedCategoryIds.length > 0 ? selectedCategoryIds.map(Number) : [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;
//     if (typeof raw?.data?.total === "number") return raw.data.total;
//     if (typeof raw?.total === "number") return raw.total;
//     if (typeof raw?.meta?.total === "number") return raw.meta.total;
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const loadProducts = async () => {
//     try {
//       setLoading(true);

//       const page = currentPage;
//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//       let queryString = `per_page=${encodeURIComponent(String(perPage))}&page=${encodeURIComponent(String(page))}`;

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//           }
//         });
//         queryString += `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
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

//       const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//         headers: { Lang: "az" },
//         cache: "no-store",
//       });

//       const items = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       setProductData(items || []);
//       setTotalCount(extractTotal(data, items));
//     } catch (error) {
//       console.error("loadProducts error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // URL dəyişəndə fetch et (initial yüklənmədə SSR data istifadə olunur)
//   useEffect(() => {
//     // həm searchParams varsa, həm də initialProductData boşdursa fetch et
//     const hasParams = searchParams.toString() !== "";
//     if (hasParams || (Array.isArray(initialProductData) && initialProductData.length === 0)) {
//       loadProducts();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   // ---- Burada öz pagination UI-nı əlavə edirik ----
//   const goToPage = useCallback(
//     (pageNum) => {
//       if (!Number.isFinite(Number(pageNum)) || Number(pageNum) < 1) return;
//       const p = Number(pageNum);
//       const params = new URLSearchParams(searchParams);

//       if (p === 1) params.delete("page");
//       else params.set("page", String(p));

//       const qs = params.toString();
//       router.push(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
//     },
//     [router, searchParams]
//   );

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pages = [];
//     const maxButtons = 7; // ən çox göstəriləcək səhifə düyməsi
//     let start = Math.max(1, currentPage - 3);
//     let end = Math.min(totalPages, start + maxButtons - 1);
//     if (end - start + 1 < maxButtons) {
//       start = Math.max(1, end - maxButtons + 1);
//     }

//     for (let i = start; i <= end; i++) pages.push(i);

//     return (
//       <div className="custom-pagination" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//         <button
//           onClick={() => goToPage(Math.max(1, currentPage - 1))}
//           disabled={currentPage === 1}
//           aria-label="prev"
//         >
//           ◀
//         </button>

//         {start > 1 && (
//           <>
//             <button onClick={() => goToPage(1)}>1</button>
//             {start > 2 && <span>…</span>}
//           </>
//         )}

//         {pages.map((p) => (
//           <button
//             key={p}
//             onClick={() => goToPage(p)}
//             aria-current={p === currentPage ? "page" : undefined}
//             style={{
//               fontWeight: p === currentPage ? "700" : "400",
//               textDecoration: p === currentPage ? "underline" : "none",
//             }}
//           >
//             {p}
//           </button>
//         ))}

//         {end < totalPages && (
//           <>
//             {end < totalPages - 1 && <span>…</span>}
//             <button onClick={() => goToPage(totalPages)}>{totalPages}</button>
//           </>
//         )}

//         <button
//           onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
//           disabled={currentPage === totalPages}
//           aria-label="next"
//         >
//           ▶
//         </button>
//       </div>
//     );
//   };
//   // ---- pagination end ----

//   const groupedCategories = useMemo(() => {
//     const parentCategories = (categoryData || []).filter(
//       (category) =>
//         !category.parent_id ||
//         (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = (categoryData || []).filter((sub) => {
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

//   const breadcrumbCategoryTitle = useMemo(() => {
//     if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

//     const firstId = Number(selectedCategoryIds[0]);
//     const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

//     return cat?.title || null;
//   }, [selectedCategoryIds, categoryData]);

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
//         params.delete("page");

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = categoryData.find(
//               (c) => Number(c.id) === Number(cid)
//             );
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const newSearch = params.toString();
//         const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//         router.push(newUrl, { scroll: false });

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

//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       setSelectedBrandIds((prev) => {
//         const set = new Set(prev);
//         if (set.has(bid)) set.delete(bid);
//         else set.add(bid);
//         return Array.from(set);
//       });

//       const params = new URLSearchParams(searchParams);
//       const current = new Set(
//         params
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite)
//       );

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       params.delete("page");

//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const newSearch = params.toString();
//       const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//       router.push(newUrl, { scroll: false });
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
//     const list = Array.isArray(brandsData)
//       ? brandsData
//       : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
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

//   const sourceCategory = useMemo(() => {
//     if (
//       selectedCategory &&
//       (selectedCategory.page_title ||
//         selectedCategory.page_description ||
//         selectedCategory.meta_title ||
//         selectedCategory.meta_description)
//     ) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   const sortedProductData = useMemo(() => {
//     const list = [...(productData || [])];
//     if (selectedOption?.value === "az") {
//       return list.sort((a, b) =>
//         (a?.title || "").localeCompare(b?.title || "")
//       );
//     }
//     if (selectedOption?.value === "za") {
//       return list.sort((a, b) =>
//         (b?.title || "").localeCompare(a?.title || "")
//       );
//     }
//     return list;
//   }, [productData, selectedOption]);

//   const EmptyState = () => (
//     <div className="newSpinner flex flex-col items-center w-full">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="50"
//         height="50"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#999"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
//       </svg>
//       <p className="mt-2 text-xl text-gray-600">{t?.productsNotFound || "Product not found"}</p>
//     </div>
//   );

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <strong>Adentta</strong>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.products}</span>

//           {breadcrumbCategoryTitle && (
//             <>
//               <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
//               <span>{breadcrumbCategoryTitle}</span>
//             </>
//           )}
//         </div>

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
//           <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
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

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : t?.productsPageFilterCategoryTitle || "Category"
//                   }
//                 >
//                   <ul>
//                     {singleSelectedParent
//                       ? childrenOfSelectedParent.map((child) => {
//                           const isChildSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(child.id)
//                           );
//                           return (
//                             <li
//                               key={child.id}
//                               onClick={() => handleCategoryToggleById(child.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 fontWeight: isChildSelected ? "bold" : "normal",
//                                 marginLeft: "0px",
//                                 fontSize: "1.4rem",
//                                 color: "#666",
//                               }}
//                             >
//                               <span>{child.title}</span>
//                             </li>
//                           );
//                         })
//                       : groupedCategories.map(({ parent, children }) => {
//                           const isParentSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(parent.id)
//                           );
//                           return (
//                             <React.Fragment key={parent.id}>
//                               <li
//                                 onClick={() => handleCategoryToggleById(parent.id)}
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.5rem",
//                                   fontWeight: isParentSelected ? "bold" : "normal",
//                                   marginBottom: "4px",
//                                 }}
//                               >
//                                 <span>{parent.title}</span>
//                               </li>

//                               {children.map((child) => {
//                                 const isChildSelected = selectedCategoryIds.some(
//                                   (c) => Number(c) === Number(child.id)
//                                 );
//                                 return (
//                                   <li
//                                     key={child.id}
//                                     onClick={() => handleCategoryToggleById(child.id)}
//                                     style={{
//                                       cursor: "pointer",
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: "0.3rem",
//                                       fontWeight: isChildSelected ? "bold" : "normal",
//                                       marginLeft: "1.5rem",
//                                       fontSize: "1.5rem",
//                                       marginBottom: "8px",
//                                       color: "#666",
//                                     }}
//                                   >
//                                     <span>{child.title}</span>
//                                   </li>
//                                 );
//                               })}
//                             </React.Fragment>
//                           );
//                         })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="search" />
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
//                         const checked = selectedBrandIds.includes(
//                           Number(brand?.id)
//                         );
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "6px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() =>
//                                   handleBrandToggleById(brand?.id)
//                                 }
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   <ReactSelect
//                     t={t}
//                     value={selectedOption}
//                     onChange={setSelectedOption}
//                   />
//                 </div>
//               </div>

//               <div className="row relative">
//                 {loading && (
//                   <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-white/50 z-10">
//                     <div
//                       className="loading-spinner"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         border: "4px solid #f3f3f3",
//                         borderTop: "4px solid #293881",
//                         borderRadius: "50%",
//                         animation: "spin 1s linear infinite",
//                       }}
//                     ></div>
//                   </div>
//                 )}

//                 {sortedProductData.length > 0 ? (
//                   sortedProductData.map((data, index) => (
//                     <div
//                       key={`${data.id}-${index}`}
//                       className="xl-4 lg-4 md-6 sm-6"
//                     >
//                       <Link
//                         href={`/products/${slugify(data.title || "")}-${data.id}`}
//                         className="block"
//                       >
//                         <div className="homePageProductCardContent">
//                           <div className="homePageProCardImgs">
//                             <div className="homePageProductCardContentImage">
//                               <img
//                                 src={
//                                   data?.image
//                                     ? `https://admin.adentta.az/storage${data.image}`
//                                     : "/images/adenttaDefaultImg.svg"
//                                 }
//                                 alt=""
//                               />
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentInner">
//                             <div className="homePageProductCardContentText">
//                               <span>{data.title}</span>
//                             </div>
//                             <div className="price">
//                               <div className="priceItem">
//                                 <strong id="prices">{data.price}</strong>
//                                 <Manat />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentBottom">
//                             <span>{t?.learnMore}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 ) : (
//                   <EmptyState />
//                 )}
//               </div>

//               <div className="flex justify-center mt-10">
//                 {renderPagination()}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h2>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h2>

//               {showDetails && (
//                 <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
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

//               <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
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

//         .custom-pagination button {
//           padding: 6px 10px;
//           border-radius: 6px;
//           border: 1px solid #ddd;
//           background: white;
//           cursor: pointer;
//         }
//         .custom-pagination button[disabled] {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }
//         .custom-pagination span {
//           display: inline-block;
//           padding: 0 6px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;



// ! PAGINTAR









// !BU KOD LOADING DEYIL
// "use client";

// import Link from "next/link";
// import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[\/\\]+/g, "-")
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

// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list
//     .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
//     .filter(Boolean);
// }

// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header"
//         onClick={() => setIsOpen((prev) => !prev)}
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

// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (
//     typeof parentRaw === "object" &&
//     parentRaw !== null &&
//     parentRaw.id != null
//   ) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData = [],
//   initialTotalCount = 0,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [totalCount, setTotalCount] = useState(initialTotalCount);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const searchText = (searchParams.get("search_text") || "").trim();

//   // SSR-dan gələn initial data-nı set et
//   useEffect(() => {
//     setProductData(initialProductData);
//     setTotalCount(initialTotalCount);
//   }, [initialProductData, initialTotalCount]);

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
//             if (Number.isFinite(cid)) {
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
//       const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//       if (urlSlugs.length > 0) {
//         const ids = urlSlugs
//           .map((slug) => categoryData.find((c) => getCategorySlug(c) === slug)?.id)
//           .map(Number)
//           .filter(Number.isFinite);
//         setSelectedCategoryIds(ids.length > 0 ? ids : []);
//       } else {
//         setSelectedCategoryIds([]);
//       }
//     }
//   }, [selectedCategory?.id, searchParams, categoryData]);

//   useEffect(() => {
//     const brands = searchParams
//       .getAll("brand")
//       .map((b) => parseInt(b, 10))
//       .filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   const perPage = useMemo(() => Number(searchParams.get("per_page") || 12), [searchParams]);

//   const totalPages = useMemo(() => (totalCount ? Math.ceil(totalCount / perPage) : 1), [totalCount, perPage]);

//   const currentPage = useMemo(() => Math.max(1, Number(searchParams.get("page") || 1)), [searchParams]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
//         .map(Number)
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     return selectedCategoryIds.length > 0 ? selectedCategoryIds.map(Number) : [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;
//     if (typeof raw?.data?.total === "number") return raw.data.total;
//     if (typeof raw?.total === "number") return raw.total;
//     if (typeof raw?.meta?.total === "number") return raw.meta.total;
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const loadProducts = async () => {
//     try {
//       setLoading(true);

//       const page = currentPage;
//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//       let queryString = `per_page=${encodeURIComponent(String(perPage))}&page=${encodeURIComponent(String(page))}`;

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//           }
//         });
//         queryString += `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
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

//       const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//         headers: { Lang: "az" },
//         cache: "no-store",
//       });

//       const items = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       setProductData(items || []);
//       setTotalCount(extractTotal(data, items));
//     } catch (error) {
//       console.error("loadProducts error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // URL dəyişəndə həmişə fetch et (real totalCount almaq üçün)
//   useEffect(() => {
//     loadProducts();
//   }, [searchParams]);

//   // Pagination və ya filter dəyişikliyində "Sort by" hissəsinə smooth scroll
//   const prevPage = useRef(currentPage);
//   useEffect(() => {
//     if (prevPage.current !== currentPage) {
//       const target = document.querySelector(".productPageSorting");
//       if (target) {
//         target.scrollIntoView({ behavior: "smooth" });
//       }
//       prevPage.current = currentPage;
//     }
//   }, [currentPage]);

//   // ---- Burada öz pagination UI-nı əlavə edirik ----
//   const goToPage = useCallback(
//     (pageNum) => {
//       if (!Number.isFinite(Number(pageNum)) || Number(pageNum) < 1) return;
//       const p = Number(pageNum);
//       const params = new URLSearchParams(searchParams);

//       if (p === 1) params.delete("page");
//       else params.set("page", String(p));

//       const qs = params.toString();
//       router.push(`/products${qs ? `?${qs}` : ""}`);
//     },
//     [router, searchParams]
//   );

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pages = [];
//     const maxButtons = 5; // ən çox göstəriləcək səhifə düyməsi
//     let start = Math.max(1, currentPage - 3);
//     let end = Math.min(totalPages, start + maxButtons - 1);
//     if (end - start + 1 < maxButtons) {
//       start = Math.max(1, end - maxButtons + 1);
//     }

//     for (let i = start; i <= end; i++) pages.push(i);

//     return (
//       <div 
//   className="custom-paginationProducts" 
//   style={{ 
//     display: "flex", 
//     gap: "8px", 
//     alignItems: "center",
//     justifyContent: "center" 
//   }}
// >
//   <button
//     onClick={() => goToPage(Math.max(1, currentPage - 1))}
//     disabled={currentPage === 1}
//     aria-label="prev"
//   >
//     <span className="page-link-pervious">{t?.paginatePrev}</span>
//   </button>

//   {start > 1 && (
//     <>
//       <button
//         className={`page-number ${currentPage === 1 ? "active" : ""}`}
//         onClick={() => goToPage(1)}
//         aria-current={currentPage === 1 ? "page" : undefined}
//       >
//         1
//       </button>
//       {start > 2 && <span className="ellipsis">…</span>}
//     </>
//   )}

//   {pages.map((p) => (
//     <button
//       key={p}
//       className={`page-number ${p === currentPage ? "active" : ""}`}
//       onClick={() => goToPage(p)}
//       aria-current={p === currentPage ? "page" : undefined}
//     >
//       {p}
//     </button>
//   ))}

//   {end < totalPages && (
//     <>
//       {end < totalPages - 1 && <span className="ellipsis">…</span>}
//       <button
//         className={`page-number ${currentPage === totalPages ? "active" : ""}`}
//         onClick={() => goToPage(totalPages)}
//         aria-current={currentPage === totalPages ? "page" : undefined}
//       >
//         {totalPages}
//       </button>
//     </>
//   )}

//   <button
//     onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
//     disabled={currentPage === totalPages}
//     aria-label="next"
//   >
//     <span className="page-link-next">{t?.paginateNext}</span>
//   </button>
// </div>




//     );
//   };
//   // ---- pagination end ----

//   const groupedCategories = useMemo(() => {
//     const parentCategories = (categoryData || []).filter(
//       (category) =>
//         !category.parent_id ||
//         (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = (categoryData || []).filter((sub) => {
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

//   const breadcrumbCategoryTitle = useMemo(() => {
//     if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

//     const firstId = Number(selectedCategoryIds[0]);
//     const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

//     return cat?.title || null;
//   }, [selectedCategoryIds, categoryData]);

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
//         params.delete("page");

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = categoryData.find(
//               (c) => Number(c.id) === Number(cid)
//             );
//             const slug = getCategorySlug(catObj || { title: catObj?.title });
//             if (slug) params.append("category", slug);
//           });
//         }

//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const newSearch = params.toString();
//         const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//         router.push(newUrl);

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

//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       setSelectedBrandIds((prev) => {
//         const set = new Set(prev);
//         if (set.has(bid)) set.delete(bid);
//         else set.add(bid);
//         return Array.from(set);
//       });

//       const params = new URLSearchParams(searchParams);
//       const current = new Set(
//         params
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite)
//       );

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       params.delete("page");

//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const newSearch = params.toString();
//       const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//       router.push(newUrl);
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
//     const list = Array.isArray(brandsData)
//       ? brandsData
//       : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
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

//   const sourceCategory = useMemo(() => {
//     if (
//       selectedCategory &&
//       (selectedCategory.page_title ||
//         selectedCategory.page_description ||
//         selectedCategory.meta_title ||
//         selectedCategory.meta_description)
//     ) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   const sortedProductData = useMemo(() => {
//     const list = [...(productData || [])];
//     if (selectedOption?.value === "az") {
//       return list.sort((a, b) =>
//         (a?.title || "").localeCompare(b?.title || "")
//       );
//     }
//     if (selectedOption?.value === "za") {
//       return list.sort((a, b) =>
//         (b?.title || "").localeCompare(a?.title || "")
//       );
//     }
//     return list;
//   }, [productData, selectedOption]);

//   const EmptyState = () => (
//     <div className="newSpinner flex flex-col items-center w-full">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="50"
//         height="50"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#999"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
//       </svg>
//       <p className="mt-2 text-xl text-gray-600">{t?.productsNotFound || "Product not found"}</p>
//     </div>
//   );

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <strong>Adentta</strong>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.products}</span>

//           {breadcrumbCategoryTitle && (
//             <>
//               <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
//               <span>{breadcrumbCategoryTitle}</span>
//             </>
//           )}
//         </div>

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
//           <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
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

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : t?.productsPageFilterCategoryTitle || "Category"
//                   }
//                 >
//                   <ul>
//                     {singleSelectedParent
//                       ? childrenOfSelectedParent.map((child) => {
//                           const isChildSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(child.id)
//                           );
//                           return (
//                             <li
//                               key={child.id}
//                               onClick={() => handleCategoryToggleById(child.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 fontWeight: isChildSelected ? "bold" : "normal",
//                                 marginLeft: "0px",
//                                 fontSize: "1.4rem",
//                                 color: "#666",
//                               }}
//                             >
//                               <span>{child.title}</span>
//                             </li>
//                           );
//                         })
//                       : groupedCategories.map(({ parent, children }) => {
//                           const isParentSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(parent.id)
//                           );
//                           return (
//                             <React.Fragment key={parent.id}>
//                               <li
//                                 onClick={() => handleCategoryToggleById(parent.id)}
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.5rem",
//                                   fontWeight: isParentSelected ? "bold" : "normal",
//                                   marginBottom: "4px",
//                                 }}
//                               >
//                                 <span>{parent.title}</span>
//                               </li>

//                               {children.map((child) => {
//                                 const isChildSelected = selectedCategoryIds.some(
//                                   (c) => Number(c) === Number(child.id)
//                                 );
//                                 return (
//                                   <li
//                                     key={child.id}
//                                     onClick={() => handleCategoryToggleById(child.id)}
//                                     style={{
//                                       cursor: "pointer",
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: "0.3rem",
//                                       fontWeight: isChildSelected ? "bold" : "normal",
//                                       marginLeft: "1.5rem",
//                                       fontSize: "1.5rem",
//                                       marginBottom: "8px",
//                                       color: "#666",
//                                     }}
//                                   >
//                                     <span>{child.title}</span>
//                                   </li>
//                                 );
//                               })}
//                             </React.Fragment>
//                           );
//                         })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="search" />
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
//                         const checked = selectedBrandIds.includes(
//                           Number(brand?.id)
//                         );
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "6px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() =>
//                                   handleBrandToggleById(brand?.id)
//                                 }
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   <ReactSelect
//                     t={t}
//                     value={selectedOption}
//                     onChange={setSelectedOption}
//                   />
//                 </div>
//               </div>

//               <div className="row relative">
//                 {loading && (
//                   <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-white/50 z-10">
//                     <div
//                       className="loading-spinner"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         border: "4px solid #f3f3f3",
//                         borderTop: "4px solid #293881",
//                         borderRadius: "50%",
//                         animation: "spin 1s linear infinite",
//                       }}
//                     ></div>
//                   </div>
//                 )}

//                 {sortedProductData.length > 0 ? (
//                   sortedProductData.map((data, index) => (
//                     <div
//                       key={`${data.id}-${index}`}
//                       className="xl-4 lg-4 md-6 sm-6"
//                     >
//                       <Link
//                         href={`/products/${slugify(data.title || "")}-${data.id}`}
//                         className="block"
//                       >
//                         <div className="homePageProductCardContent">
//                           <div className="homePageProCardImgs">
//                             <div className="homePageProductCardContentImage">
//                               <img
//                                 src={
//                                   data?.image
//                                     ? `https://admin.adentta.az/storage${data.image}`
//                                     : "/images/adenttaDefaultImg.svg"
//                                 }
//                                 alt=""
//                               />
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentInner">
//                             <div className="homePageProductCardContentText">
//                               <span>{data.title}</span>
//                             </div>
//                             <div className="price">
//                               <div className="priceItem">
//                                 <strong id="prices">{data.price}</strong>
//                                 <Manat />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentBottom">
//                             <span>{t?.learnMore}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 ) : (
//                   <EmptyState />
//                 )}
//               </div>

//               <div className="flex justify-center mt-10">
//                 {renderPagination()}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h2>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h2>

//               {showDetails && (
//                 <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
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

//               <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
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

//         // .custom-pagination button {
//         //   padding: 6px 10px;
//         //   border-radius: 6px;
//         //   border: 1px solid #ddd;
//         //   background: white;
//         //   cursor: pointer;
//         // }
//         // .custom-pagination button[disabled] {
//         //   opacity: 0.5;
//         //   cursor: not-allowed;
//         // }
//         // .custom-pagination span {
//         //   display: inline-block;
//         //   padding: 0 6px;
//         // }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsPageFilter;








// !CLAUDE SEHV KOD AMMA OKEY

"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactSelect from "../ReactSelect";
import Manat from "../../../public/icons/manat.svg";
import axiosInstance from "@/lib/axios";

const slugify = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\/\\]+/g, "-")
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

function readAllCategorySlugsFromParams(params) {
  if (!params) return [];
  const list = params.getAll("category");
  return list
    .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
    .filter(Boolean);
}

const FilterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

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

const normalizeIds = (arr = []) =>
  Array.from(
    new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
  );

function normalizeParentIds(parentRaw) {
  if (!parentRaw) return [];
  if (Array.isArray(parentRaw)) {
    return parentRaw
      .map((p) => (typeof p === "object" && p !== null ? p.id : p))
      .map((v) => parseInt(v, 10))
      .filter((v) => Number.isFinite(v));
  }
  if (
    typeof parentRaw === "object" &&
    parentRaw !== null &&
    parentRaw.id != null
  ) {
    const n = parseInt(parentRaw.id, 10);
    return Number.isFinite(n) ? [n] : [];
  }
  const n = parseInt(parentRaw, 10);
  return Number.isFinite(n) ? [n] : [];
}

const ProductsPageFilter = ({
  productData: initialProductData = [],
  initialTotalCount = 0,
  t,
  brandsData,
  categoryData,
  selectedCategory,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [productData, setProductData] = useState(initialProductData);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = (searchParams.get("search_text") || "").trim();

  // SSR-dan gələn initial data-nı set et
  useEffect(() => {
    setProductData(initialProductData);
    setTotalCount(initialTotalCount);
  }, [initialProductData, initialTotalCount]);

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
            if (Number.isFinite(cid)) {
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

  // URL-dəki category-ləri həmişə prioritet edir (multiple kategoriya üçün düzgün işləyir)
  useEffect(() => {
    const urlSlugs = readAllCategorySlugsFromParams(searchParams);

    if (urlSlugs.length > 0) {
      const ids = urlSlugs
        .map((slug) => categoryData.find((c) => getCategorySlug(c) === slug)?.id)
        .map(Number)
        .filter(Number.isFinite);
      setSelectedCategoryIds(ids.length > 0 ? ids : []);
    } else {
      setSelectedCategoryIds(selectedCategory?.id ? [Number(selectedCategory.id)] : []);
    }
  }, [searchParams, categoryData, selectedCategory?.id]);

  useEffect(() => {
    const brands = searchParams
      .getAll("brand")
      .map((b) => parseInt(b, 10))
      .filter(Number.isFinite);
    setSelectedBrandIds(brands);
  }, [searchParams]);

  const perPage = useMemo(() => Number(searchParams.get("per_page") || 12), [searchParams]);

  const totalPages = useMemo(() => (totalCount ? Math.ceil(totalCount / perPage) : 1), [totalCount, perPage]);

  const currentPage = useMemo(() => Math.max(1, Number(searchParams.get("page") || 1)), [searchParams]);

  const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
    const urlSlugs = readAllCategorySlugsFromParams(searchParams);
    if (urlSlugs.length > 0) {
      const ids = urlSlugs
        .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
        .map(Number)
        .filter(Number.isFinite);
      if (ids.length > 0) return ids;
    }
    return selectedCategoryIds.length > 0 ? selectedCategoryIds.map(Number) : [];
  }, [searchParams, categoryData, selectedCategoryIds]);

  // YENİ extractTotal – rekursiv axtarışla "total" və ya "total_count" tapır (hər hansı depth-də)
  const extractTotal = useCallback((raw, items) => {
    // Debug üçün console.log əlavə edək
    console.log('🔍 extractTotal called with:', { raw, itemsLength: items?.length });
    
    if (!raw) {
      const fallback = Array.isArray(items) ? items.length : 0;
      console.log('⚠️ No raw data, using fallback:', fallback);
      return fallback;
    }

    const findTotalRecursively = (obj, depth = 0) => {
      if (depth > 10) return null; // Sonsuz loop-dan qorunmaq üçün
      
      if (obj === null || obj === undefined) return null;
      if (typeof obj === "number" && obj >= 0) return obj;

      if (typeof obj === "object") {
        // Birbaşa total və ya total_count yoxla
        if ("total" in obj && typeof obj.total === "number" && obj.total >= 0) {
          console.log('✅ Found total:', obj.total);
          return obj.total;
        }
        if ("total_count" in obj && typeof obj.total_count === "number" && obj.total_count >= 0) {
          console.log('✅ Found total_count:', obj.total_count);
          return obj.total_count;
        }
        if ("count" in obj && typeof obj.count === "number" && obj.count >= 0) {
          console.log('✅ Found count:', obj.count);
          return obj.count;
        }

        // Dərin axtarış
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const found = findTotalRecursively(obj[key], depth + 1);
            if (found !== null && found >= 0) return found;
          }
        }
      }
      return null;
    };

    const found = findTotalRecursively(raw);
    if (found !== null && found >= 0) {
      console.log('✅ Total found:', found);
      return found;
    }

    // Heç bir total tapılmasa fallback items.length
    const fallback = Array.isArray(items) ? items.length : 0;
    console.log('⚠️ No total found, using items.length:', fallback);
    return fallback;
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const page = currentPage;
      const baseIds = getBaseCategoryIdsFromUrlOrState();
      const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

      let queryString = `per_page=${encodeURIComponent(String(perPage))}&page=${encodeURIComponent(String(page))}`;

      if (baseIds.length > 0) {
        const expandedSet = new Set();
        baseIds.forEach((id) => {
          const nid = Number(id);
          if (Number.isFinite(nid)) {
            expandedSet.add(nid);
            collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
          }
        });
        queryString += `&filters[0][key]=categories&filters[0][operator]=IN`;
        Array.from(expandedSet).forEach((val) => {
          queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
        });
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

      console.log('🚀 API Request:', `/page-data/product?${queryString}`);

      const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
        headers: { Lang: "az" },
        cache: "no-store",
      });

      console.log('📦 API Response:', data);

      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : Array.isArray(data?.items)
        ? data.items
        : [];

      const newTotal = extractTotal(data, items);
      
      console.log('📊 Final values:', { itemsCount: items.length, totalCount: newTotal });

      setProductData(items || []);
      setTotalCount(newTotal);
    } catch (error) {
      console.error("❌ loadProducts error:", error);
      setProductData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, searchText, searchParams, getBaseCategoryIdsFromUrlOrState, collectDescendantCategoryIds, extractTotal]);

  // URL dəyişəndə həmişə fetch et
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Klik olunan kimi .filter-title-ə smooth scroll funksiyası
  const scrollToFilterTitle = () => {
    const target = document.querySelector(".filter-title");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ---- Pagination ----
  const goToPage = useCallback(
    (pageNum) => {
      if (!Number.isFinite(Number(pageNum)) || Number(pageNum) < 1) return;
      const p = Number(pageNum);
      const params = new URLSearchParams(searchParams);

      if (p === 1) params.delete("page");
      else params.set("page", String(p));

      const qs = params.toString();
      
      setLoading(true);
      scrollToFilterTitle();
      
      router.push(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, searchParams]
  );

  const renderPagination = () => {
    console.log('🎯 Pagination render:', { totalPages, totalCount, currentPage });
    
    if (totalPages <= 1) {
      console.log('⚠️ Pagination hidden: totalPages <= 1');
      return null;
    }

    const pages = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);

    return (
      <div 
        className="custom-paginationProducts" 
        style={{ 
          display: "flex", 
          gap: "8px", 
          alignItems: "center",
          justifyContent: "center" 
        }}
      >
        <button
          onClick={() => goToPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="prev"
        >
          <span className="page-link-pervious">{t?.paginatePrev}</span>
        </button>

        {start > 1 && (
          <>
            <button
              className={`page-number ${currentPage === 1 ? "active" : ""}`}
              onClick={() => goToPage(1)}
              aria-current={currentPage === 1 ? "page" : undefined}
            >
              1
            </button>
            {start > 2 && <span className="ellipsis">…</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            className={`page-number ${p === currentPage ? "active" : ""}`}
            onClick={() => goToPage(p)}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="ellipsis">…</span>}
            <button
              className={`page-number ${currentPage === totalPages ? "active" : ""}`}
              onClick={() => goToPage(totalPages)}
              aria-current={currentPage === totalPages ? "page" : undefined}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="next"
        >
          <span className="page-link-next">{t?.paginateNext}</span>
        </button>
      </div>
    );
  };
  // ---- pagination end ----

  const groupedCategories = useMemo(() => {
    const parentCategories = (categoryData || []).filter(
      (category) =>
        !category.parent_id ||
        (Array.isArray(category.parent_id) && category.parent_id.length === 0)
    );
    return parentCategories.map((parentCategory) => {
      const children = (categoryData || []).filter((sub) => {
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

  const breadcrumbCategoryTitle = useMemo(() => {
    if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

    const firstId = Number(selectedCategoryIds[0]);
    const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

    return cat?.title || null;
  }, [selectedCategoryIds, categoryData]);

  const handleCategoryToggleById = useCallback(
    (id) => {
      const numeric = Number(id);

      setSelectedCategoryIds((prev) => {
        const set = new Set(prev.map((v) => Number(v)));
        if (set.has(numeric)) set.delete(numeric);
        else set.add(numeric);
        const arr = normalizeIds(Array.from(set));

        const params = new URLSearchParams(searchParams.toString());
        params.delete("category");
        params.delete("page");

        if (arr.length > 0) {
          arr.forEach((cid) => {
            const catObj = (categoryData || []).find((c) => Number(c.id) === Number(cid));
            const slug = getCategorySlug(catObj || { title: "" });
            if (slug) params.append("category", slug);
          });
        }

        Array.from(params.keys()).forEach((k) => {
          if (/^filters?\[.*\]/.test(k)) params.delete(k);
        });

        const newSearch = params.toString();
        const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

        setLoading(true);
        scrollToFilterTitle();
        router.push(newUrl, { scroll: false });

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

  const handleBrandToggleById = useCallback(
    (brandId) => {
      const bid = Number(brandId);
      setSelectedBrandIds((prev) => {
        const set = new Set(prev);
        if (set.has(bid)) set.delete(bid);
        else set.add(bid);
        return Array.from(set);
      });

      const params = new URLSearchParams(searchParams);
      const current = new Set(
        params
          .getAll("brand")
          .map((v) => parseInt(v, 10))
          .filter(Number.isFinite)
      );

      if (current.has(bid)) current.delete(bid);
      else current.add(bid);

      params.delete("brand");
      params.delete("page");

      Array.from(current).forEach((v) => params.append("brand", String(v)));

      Array.from(params.keys()).forEach((k) => {
        if (/^filters?\[.*\]/.test(k)) params.delete(k);
      });

      const newSearch = params.toString();
      const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

      setLoading(true);
      scrollToFilterTitle();
      router.push(newUrl, { scroll: false });
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
    const list = Array.isArray(brandsData)
      ? brandsData
      : Object.values(brandsData || {});
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

  const sourceCategory = useMemo(() => {
    if (
      selectedCategory &&
      (selectedCategory.page_title ||
        selectedCategory.page_description ||
        selectedCategory.meta_title ||
        selectedCategory.meta_description)
    ) {
      return selectedCategory;
    }
    return productData?.[0]?.categories?.[0] || null;
  }, [selectedCategory, productData]);

  const sortedProductData = useMemo(() => {
    const list = [...(productData || [])];
    if (selectedOption?.value === "az") {
      return list.sort((a, b) =>
        (a?.title || "").localeCompare(b?.title || "")
      );
    }
    if (selectedOption?.value === "za") {
      return list.sort((a, b) =>
        (b?.title || "").localeCompare(a?.title || "")
      );
    }
    return list;
  }, [productData, selectedOption]);

  const EmptyState = () => (
    <div className="newSpinner flex flex-col items-center w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#999"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
      </svg>
      <p className="mt-2 text-xl text-gray-600">{t?.productsNotFound || "Product not found"}</p>
    </div>
  );

  return (
    <div>
      <div className="container">
        <div className="filterTop topper">
          <strong>Adentta</strong>
          <img src="/icons/rightDown.svg" alt="Adentta" />
          <span>{t?.products}</span>

          {breadcrumbCategoryTitle && (
            <>
              <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
              <span>{breadcrumbCategoryTitle}</span>
            </>
          )}
        </div>

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
          <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
            <div className="filter-container">
              <button
                className="filter-title"
                onClick={() => setMobileFilterOpen(!isMobileFilterOpen)}
              >
                {t?.productsPageFilterTitle || "Filter"}
              </button>

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

                <button
                  className="close-btn"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <img src="/icons/popupCloseIcon.svg" alt="close" />
                </button>

                <div className="lineFiltered"></div>

                <FilterAccordion
                  title={
                    singleSelectedParent
                      ? singleSelectedParent.title
                      : t?.productsPageFilterCategoryTitle || "Category"
                  }
                >
                  <ul>
                    {singleSelectedParent
                      ? childrenOfSelectedParent.map((child) => {
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
                            </li>
                          );
                        })
                      : groupedCategories.map(({ parent, children }) => {
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
                              </li>

                              {children.map((child) => {
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
                                  </li>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                  </ul>
                </FilterAccordion>

                <div className="lineFiltered"></div>

                <FilterAccordion title={t?.brands || "Brands"}>
                  <div className="filteredSearch">
                    <img src="/icons/searchIcon.svg" alt="search" />
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
                        const checked = selectedBrandIds.includes(
                          Number(brand?.id)
                        );
                        return (
                          <li key={brand?.id ?? brand?.title}>
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                cursor: "pointer",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                  handleBrandToggleById(brand?.id)
                                }
                              />
                              {brand?.title ?? "No title"}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </FilterAccordion>

                <div className="lineFiltered"></div>
              </div>
            </div>
          </div>

          <div className="xl-9 lg-9 md-9 sm-12">
            <div className="productPageCards">
              <div className="productPageSorting">
                <span>{t?.sortBy}</span>
                <div>
                  <ReactSelect
                    t={t}
                    value={selectedOption}
                    onChange={setSelectedOption}
                  />
                </div>
              </div>

              <div className="row relative">
                {loading && (
                  <div className="absolute inset-0 flex items-start justify-center w-full h-full bg-white/75 z-10">
                    <div
                      className="loading-spinner"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "6px solid #f3f3f3",
                        borderTop: "6px solid #293881",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        
                      }}
                    ></div>
                  </div>
                )}

                {sortedProductData.length > 0 ? (
                  sortedProductData.map((data, index) => (
                    <div
                      key={`${data.id}-${index}`}
                      className="xl-4 lg-4 md-6 sm-6"
                    >
                      <Link
                        href={`/products/${slugify(data.title || "")}-${data.id}`}
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
                  ))
                ) : (
                  <EmptyState />
                )}
              </div>

              <div className="flex justify-center mt-10">
                {renderPagination()}
              </div>
            </div>
          </div>
        </div>

        <div className="productsPageDescription">
          {(sourceCategory?.page_title || sourceCategory?.page_description) && (
            <>
              <h2>
                {sourceCategory?.page_title || "Page title is not available"}
              </h2>

              {showDetails && (
                <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
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

              <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
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















// !GROK SEHV KOD AMMA OKEY


// "use client";

// import Link from "next/link";
// import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[\/\\]+/g, "-")
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

// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list
//     .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
//     .filter(Boolean);
// }

// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header"
//         onClick={() => setIsOpen((prev) => !prev)}
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

// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (
//     typeof parentRaw === "object" &&
//     parentRaw !== null &&
//     parentRaw.id != null
//   ) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData = [],
//   initialTotalCount = 0,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [totalCount, setTotalCount] = useState(initialTotalCount);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const searchText = (searchParams.get("search_text") || "").trim();

//   // SSR-dan gələn initial data-nı set et
//   useEffect(() => {
//     setProductData(initialProductData);
//     setTotalCount(initialTotalCount);
//   }, [initialProductData, initialTotalCount]);

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
//             if (Number.isFinite(cid)) {
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

//   // URL-dəki category-ləri həmişə prioritet edir (multiple kategoriya üçün düzgün işləyir)
//   useEffect(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);

//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => categoryData.find((c) => getCategorySlug(c) === slug)?.id)
//         .map(Number)
//         .filter(Number.isFinite);
//       setSelectedCategoryIds(ids.length > 0 ? ids : []);
//     } else {
//       setSelectedCategoryIds(selectedCategory?.id ? [Number(selectedCategory.id)] : []);
//     }
//   }, [searchParams, categoryData, selectedCategory?.id]);

//   useEffect(() => {
//     const brands = searchParams
//       .getAll("brand")
//       .map((b) => parseInt(b, 10))
//       .filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   const perPage = useMemo(() => Number(searchParams.get("per_page") || 12), [searchParams]);

//   const totalPages = useMemo(() => (totalCount ? Math.ceil(totalCount / perPage) : 1), [totalCount, perPage]);

//   const currentPage = useMemo(() => Math.max(1, Number(searchParams.get("page") || 1)), [searchParams]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
//         .map(Number)
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     return selectedCategoryIds.length > 0 ? selectedCategoryIds.map(Number) : [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   // YENİ extractTotal – rekursiv axtarışla "total" və ya "total_count" tapır (hər hansı depth-də)
//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;

//     const findTotalRecursively = (obj) => {
//       if (obj === null || obj === undefined) return null;
//       if (typeof obj === "number") return obj;

//       if (typeof obj === "object") {
//         // Birbaşa total və ya total_count yoxla
//         if ("total" in obj && typeof obj.total === "number") return obj.total;
//         if ("total_count" in obj && typeof obj.total_count === "number") return obj.total_count;
//         if ("count" in obj && typeof obj.count === "number") return obj.count; // əlavə ehtiyat

//         // Dərin axtarış
//         for (const key in obj) {
//           const found = findTotalRecursively(obj[key]);
//           if (found !== null) return found;
//         }
//       }
//       return null;
//     };

//     const found = findTotalRecursively(raw);
//     if (found !== null && found > 0) return found;

//     // Heç bir total tapılmasa fallback items.length (amma bu halda pagination görünməyəcək)
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const loadProducts = async () => {
//     try {
//       setLoading(true);

//       const page = currentPage;
//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//       let queryString = `per_page=${encodeURIComponent(String(perPage))}&page=${encodeURIComponent(String(page))}`;

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//           }
//         });
//         queryString += `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
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

//       const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//         headers: { Lang: "az" },
//         cache: "no-store",
//       });

//       const items = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       setProductData(items || []);
//       setTotalCount(extractTotal(data, items));
//     } catch (error) {
//       console.error("loadProducts error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // URL dəyişəndə həmişə fetch et
//   useEffect(() => {
//     loadProducts();
//   }, [searchParams]);

//   // Klik olunan kimi .filter-title-ə smooth scroll funksiyası
//   const scrollToFilterTitle = () => {
//     const target = document.querySelector(".filter-title");
//     if (target) {
//       target.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // ---- Pagination ----
//   const goToPage = useCallback(
//     (pageNum) => {
//       if (!Number.isFinite(Number(pageNum)) || Number(pageNum) < 1) return;
//       const p = Number(pageNum);
//       const params = new URLSearchParams(searchParams);

//       if (p === 1) params.delete("page");
//       else params.set("page", String(p));

//       const qs = params.toString();
      
//       setLoading(true);
//       scrollToFilterTitle();
      
//       router.push(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
//     },
//     [router, searchParams]
//   );

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pages = [];
//     const maxButtons = 5;
//     let start = Math.max(1, currentPage - 3);
//     let end = Math.min(totalPages, start + maxButtons - 1);
//     if (end - start + 1 < maxButtons) {
//       start = Math.max(1, end - maxButtons + 1);
//     }

//     for (let i = start; i <= end; i++) pages.push(i);

//     return (
//       <div 
//         className="custom-paginationProducts" 
//         style={{ 
//           display: "flex", 
//           gap: "8px", 
//           alignItems: "center",
//           justifyContent: "center" 
//         }}
//       >
//         <button
//           onClick={() => goToPage(Math.max(1, currentPage - 1))}
//           disabled={currentPage === 1}
//           aria-label="prev"
//         >
//           <span className="page-link-pervious">{t?.paginatePrev}</span>
//         </button>

//         {start > 1 && (
//           <>
//             <button
//               className={`page-number ${currentPage === 1 ? "active" : ""}`}
//               onClick={() => goToPage(1)}
//               aria-current={currentPage === 1 ? "page" : undefined}
//             >
//               1
//             </button>
//             {start > 2 && <span className="ellipsis">…</span>}
//           </>
//         )}

//         {pages.map((p) => (
//           <button
//             key={p}
//             className={`page-number ${p === currentPage ? "active" : ""}`}
//             onClick={() => goToPage(p)}
//             aria-current={p === currentPage ? "page" : undefined}
//           >
//             {p}
//           </button>
//         ))}

//         {end < totalPages && (
//           <>
//             {end < totalPages - 1 && <span className="ellipsis">…</span>}
//             <button
//               className={`page-number ${currentPage === totalPages ? "active" : ""}`}
//               onClick={() => goToPage(totalPages)}
//               aria-current={currentPage === totalPages ? "page" : undefined}
//             >
//               {totalPages}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
//           disabled={currentPage === totalPages}
//           aria-label="next"
//         >
//           <span className="page-link-next">{t?.paginateNext}</span>
//         </button>
//       </div>
//     );
//   };
//   // ---- pagination end ----

//   const groupedCategories = useMemo(() => {
//     const parentCategories = (categoryData || []).filter(
//       (category) =>
//         !category.parent_id ||
//         (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = (categoryData || []).filter((sub) => {
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

//   const breadcrumbCategoryTitle = useMemo(() => {
//     if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

//     const firstId = Number(selectedCategoryIds[0]);
//     const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

//     return cat?.title || null;
//   }, [selectedCategoryIds, categoryData]);

//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);

//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         const params = new URLSearchParams(searchParams.toString());
//         params.delete("category");
//         params.delete("page");

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = (categoryData || []).find((c) => Number(c.id) === Number(cid));
//             const slug = getCategorySlug(catObj || { title: "" });
//             if (slug) params.append("category", slug);
//           });
//         }

//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const newSearch = params.toString();
//         const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//         setLoading(true);
//         scrollToFilterTitle();
//         router.push(newUrl, { scroll: false });

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

//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       setSelectedBrandIds((prev) => {
//         const set = new Set(prev);
//         if (set.has(bid)) set.delete(bid);
//         else set.add(bid);
//         return Array.from(set);
//       });

//       const params = new URLSearchParams(searchParams);
//       const current = new Set(
//         params
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite)
//       );

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       params.delete("page");

//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const newSearch = params.toString();
//       const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//       setLoading(true);
//       scrollToFilterTitle();
//       router.push(newUrl, { scroll: false });
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
//     const list = Array.isArray(brandsData)
//       ? brandsData
//       : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
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

//   const sourceCategory = useMemo(() => {
//     if (
//       selectedCategory &&
//       (selectedCategory.page_title ||
//         selectedCategory.page_description ||
//         selectedCategory.meta_title ||
//         selectedCategory.meta_description)
//     ) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   const sortedProductData = useMemo(() => {
//     const list = [...(productData || [])];
//     if (selectedOption?.value === "az") {
//       return list.sort((a, b) =>
//         (a?.title || "").localeCompare(b?.title || "")
//       );
//     }
//     if (selectedOption?.value === "za") {
//       return list.sort((a, b) =>
//         (b?.title || "").localeCompare(a?.title || "")
//       );
//     }
//     return list;
//   }, [productData, selectedOption]);

//   const EmptyState = () => (
//     <div className="newSpinner flex flex-col items-center w-full">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="50"
//         height="50"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#999"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
//       </svg>
//       <p className="mt-2 text-xl text-gray-600">{t?.productsNotFound || "Product not found"}</p>
//     </div>
//   );

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <strong>Adentta</strong>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.products}</span>

//           {breadcrumbCategoryTitle && (
//             <>
//               <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
//               <span>{breadcrumbCategoryTitle}</span>
//             </>
//           )}
//         </div>

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
//           <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
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

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : t?.productsPageFilterCategoryTitle || "Category"
//                   }
//                 >
//                   <ul>
//                     {singleSelectedParent
//                       ? childrenOfSelectedParent.map((child) => {
//                           const isChildSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(child.id)
//                           );
//                           return (
//                             <li
//                               key={child.id}
//                               onClick={() => handleCategoryToggleById(child.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 fontWeight: isChildSelected ? "bold" : "normal",
//                                 marginLeft: "0px",
//                                 fontSize: "1.4rem",
//                                 color: "#666",
//                               }}
//                             >
//                               <span>{child.title}</span>
//                             </li>
//                           );
//                         })
//                       : groupedCategories.map(({ parent, children }) => {
//                           const isParentSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(parent.id)
//                           );
//                           return (
//                             <React.Fragment key={parent.id}>
//                               <li
//                                 onClick={() => handleCategoryToggleById(parent.id)}
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.5rem",
//                                   fontWeight: isParentSelected ? "bold" : "normal",
//                                   marginBottom: "4px",
//                                 }}
//                               >
//                                 <span>{parent.title}</span>
//                               </li>

//                               {children.map((child) => {
//                                 const isChildSelected = selectedCategoryIds.some(
//                                   (c) => Number(c) === Number(child.id)
//                                 );
//                                 return (
//                                   <li
//                                     key={child.id}
//                                     onClick={() => handleCategoryToggleById(child.id)}
//                                     style={{
//                                       cursor: "pointer",
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: "0.3rem",
//                                       fontWeight: isChildSelected ? "bold" : "normal",
//                                       marginLeft: "1.5rem",
//                                       fontSize: "1.5rem",
//                                       marginBottom: "8px",
//                                       color: "#666",
//                                     }}
//                                   >
//                                     <span>{child.title}</span>
//                                   </li>
//                                 );
//                               })}
//                             </React.Fragment>
//                           );
//                         })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="search" />
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
//                         const checked = selectedBrandIds.includes(
//                           Number(brand?.id)
//                         );
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "6px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() =>
//                                   handleBrandToggleById(brand?.id)
//                                 }
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   <ReactSelect
//                     t={t}
//                     value={selectedOption}
//                     onChange={setSelectedOption}
//                   />
//                 </div>
//               </div>

//               <div className="row relative">
//                 {loading && (
//                   <div className="absolute inset-0 flex items-start justify-center w-full h-full bg-white/75 z-10">
//                     <div
//                       className="loading-spinner"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         border: "6px solid #f3f3f3",
//                         borderTop: "6px solid #293881",
//                         borderRadius: "50%",
//                         animation: "spin 1s linear infinite",
                        
//                       }}
//                     ></div>
//                   </div>
//                 )}

//                 {sortedProductData.length > 0 ? (
//                   sortedProductData.map((data, index) => (
//                     <div
//                       key={`${data.id}-${index}`}
//                       className="xl-4 lg-4 md-6 sm-6"
//                     >
//                       <Link
//                         href={`/products/${slugify(data.title || "")}-${data.id}`}
//                         className="block"
//                       >
//                         <div className="homePageProductCardContent">
//                           <div className="homePageProCardImgs">
//                             <div className="homePageProductCardContentImage">
//                               <img
//                                 src={
//                                   data?.image
//                                     ? `https://admin.adentta.az/storage${data.image}`
//                                     : "/images/adenttaDefaultImg.svg"
//                                 }
//                                 alt=""
//                               />
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentInner">
//                             <div className="homePageProductCardContentText">
//                               <span>{data.title}</span>
//                             </div>
//                             <div className="price">
//                               <div className="priceItem">
//                                 <strong id="prices">{data.price}</strong>
//                                 <Manat />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentBottom">
//                             <span>{t?.learnMore}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 ) : (
//                   <EmptyState />
//                 )}
//               </div>

//               <div className="flex justify-center mt-10">
//                 {renderPagination()}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h2>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h2>

//               {showDetails && (
//                 <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
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

//               <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
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































// !BU KOD LOADING-DIR

// "use client";

// import Link from "next/link";
// import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import ReactSelect from "../ReactSelect";
// import Manat from "../../../public/icons/manat.svg";
// import axiosInstance from "@/lib/axios";

// const slugify = (text) => {
//   if (!text) return "";
//   return String(text)
//     .toLowerCase()
//     .normalize("NFKD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[\/\\]+/g, "-")
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

// function readAllCategorySlugsFromParams(params) {
//   if (!params) return [];
//   const list = params.getAll("category");
//   return list
//     .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
//     .filter(Boolean);
// }

// const FilterAccordion = ({ title, children }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="accordion">
//       <button
//         className="accordion-header"
//         onClick={() => setIsOpen((prev) => !prev)}
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

// const normalizeIds = (arr = []) =>
//   Array.from(
//     new Set((arr || []).map((v) => Number(v)).filter((v) => !Number.isNaN(v)))
//   );

// function normalizeParentIds(parentRaw) {
//   if (!parentRaw) return [];
//   if (Array.isArray(parentRaw)) {
//     return parentRaw
//       .map((p) => (typeof p === "object" && p !== null ? p.id : p))
//       .map((v) => parseInt(v, 10))
//       .filter((v) => Number.isFinite(v));
//   }
//   if (
//     typeof parentRaw === "object" &&
//     parentRaw !== null &&
//     parentRaw.id != null
//   ) {
//     const n = parseInt(parentRaw.id, 10);
//     return Number.isFinite(n) ? [n] : [];
//   }
//   const n = parseInt(parentRaw, 10);
//   return Number.isFinite(n) ? [n] : [];
// }

// const ProductsPageFilter = ({
//   productData: initialProductData = [],
//   initialTotalCount = 0,
//   t,
//   brandsData,
//   categoryData,
//   selectedCategory,
// }) => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
//   const [productData, setProductData] = useState(initialProductData);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
//   const [selectedBrandIds, setSelectedBrandIds] = useState([]);
//   const [brandSearchTerm, setBrandSearchTerm] = useState("");
//   const [showDetails, setShowDetails] = useState(false);
//   const [totalCount, setTotalCount] = useState(initialTotalCount);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const searchText = (searchParams.get("search_text") || "").trim();

//   // SSR-dan gələn initial data-nı set et
//   useEffect(() => {
//     setProductData(initialProductData);
//     setTotalCount(initialTotalCount);
//   }, [initialProductData, initialTotalCount]);

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
//             if (Number.isFinite(cid)) {
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
//       const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//       if (urlSlugs.length > 0) {
//         const ids = urlSlugs
//           .map((slug) => categoryData.find((c) => getCategorySlug(c) === slug)?.id)
//           .map(Number)
//           .filter(Number.isFinite);
//         setSelectedCategoryIds(ids.length > 0 ? ids : []);
//       } else {
//         setSelectedCategoryIds([]);
//       }
//     }
//   }, [selectedCategory?.id, searchParams, categoryData]);

//   useEffect(() => {
//     const brands = searchParams
//       .getAll("brand")
//       .map((b) => parseInt(b, 10))
//       .filter(Number.isFinite);
//     setSelectedBrandIds(brands);
//   }, [searchParams]);

//   const perPage = useMemo(() => Number(searchParams.get("per_page") || 12), [searchParams]);

//   const totalPages = useMemo(() => (totalCount ? Math.ceil(totalCount / perPage) : 1), [totalCount, perPage]);

//   const currentPage = useMemo(() => Math.max(1, Number(searchParams.get("page") || 1)), [searchParams]);

//   const getBaseCategoryIdsFromUrlOrState = useCallback(() => {
//     const urlSlugs = readAllCategorySlugsFromParams(searchParams);
//     if (urlSlugs.length > 0) {
//       const ids = urlSlugs
//         .map((slug) => (categoryData || []).find((c) => getCategorySlug(c) === slug)?.id)
//         .map(Number)
//         .filter(Number.isFinite);
//       if (ids.length > 0) return ids;
//     }
//     return selectedCategoryIds.length > 0 ? selectedCategoryIds.map(Number) : [];
//   }, [searchParams, categoryData, selectedCategoryIds]);

//   const extractTotal = (raw, items) => {
//     if (!raw) return Array.isArray(items) ? items.length : 0;
//     if (typeof raw?.data?.total === "number") return raw.data.total;
//     if (typeof raw?.total === "number") return raw.total;
//     if (typeof raw?.meta?.total === "number") return raw.meta.total;
//     return Array.isArray(items) ? items.length : 0;
//   };

//   const loadProducts = async () => {
//     try {
//       setLoading(true);

//       const page = currentPage;
//       const baseIds = getBaseCategoryIdsFromUrlOrState();
//       const brandIds = searchParams.getAll("brand").map((v) => parseInt(v, 10)).filter(Number.isFinite);

//       let queryString = `per_page=${encodeURIComponent(String(perPage))}&page=${encodeURIComponent(String(page))}`;

//       if (baseIds.length > 0) {
//         const expandedSet = new Set();
//         baseIds.forEach((id) => {
//           const nid = Number(id);
//           if (Number.isFinite(nid)) {
//             expandedSet.add(nid);
//             collectDescendantCategoryIds(nid).forEach((d) => expandedSet.add(Number(d)));
//           }
//         });
//         queryString += `&filters[0][key]=categories&filters[0][operator]=IN`;
//         Array.from(expandedSet).forEach((val) => {
//           queryString += `&filters[0][value][]=${encodeURIComponent(String(val))}`;
//         });
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

//       const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//         headers: { Lang: "az" },
//         cache: "no-store",
//       });

//       const items = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.data)
//         ? data.data
//         : Array.isArray(data?.data?.data)
//         ? data.data.data
//         : Array.isArray(data?.items)
//         ? data.items
//         : [];

//       setProductData(items || []);
//       setTotalCount(extractTotal(data, items));
//     } catch (error) {
//       console.error("loadProducts error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // URL dəyişəndə həmişə fetch et
//   useEffect(() => {
//     loadProducts();
//   }, [searchParams]);

//   // Klik olunan kimi .filter-title-ə smooth scroll funksiyası
//   const scrollToFilterTitle = () => {
//     const target = document.querySelector(".filter-title");
//     if (target) {
//       target.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // ---- Pagination ----
//   const goToPage = useCallback(
//     (pageNum) => {
//       if (!Number.isFinite(Number(pageNum)) || Number(pageNum) < 1) return;
//       const p = Number(pageNum);
//       const params = new URLSearchParams(searchParams);

//       if (p === 1) params.delete("page");
//       else params.set("page", String(p));

//       const qs = params.toString();
      
//       // Klik olunan kimi loading + scroll
//       setLoading(true);
//       scrollToFilterTitle();
      
//       router.push(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
//     },
//     [router, searchParams]
//   );

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pages = [];
//     const maxButtons = 5;
//     let start = Math.max(1, currentPage - 3);
//     let end = Math.min(totalPages, start + maxButtons - 1);
//     if (end - start + 1 < maxButtons) {
//       start = Math.max(1, end - maxButtons + 1);
//     }

//     for (let i = start; i <= end; i++) pages.push(i);

//     return (
//       <div 
//         className="custom-paginationProducts" 
//         style={{ 
//           display: "flex", 
//           gap: "8px", 
//           alignItems: "center",
//           justifyContent: "center" 
//         }}
//       >
//         <button
//           onClick={() => goToPage(Math.max(1, currentPage - 1))}
//           disabled={currentPage === 1}
//           aria-label="prev"
//         >
//           <span className="page-link-pervious">{t?.paginatePrev}</span>
//         </button>

//         {start > 1 && (
//           <>
//             <button
//               className={`page-number ${currentPage === 1 ? "active" : ""}`}
//               onClick={() => goToPage(1)}
//               aria-current={currentPage === 1 ? "page" : undefined}
//             >
//               1
//             </button>
//             {start > 2 && <span className="ellipsis">…</span>}
//           </>
//         )}

//         {pages.map((p) => (
//           <button
//             key={p}
//             className={`page-number ${p === currentPage ? "active" : ""}`}
//             onClick={() => goToPage(p)}
//             aria-current={p === currentPage ? "page" : undefined}
//           >
//             {p}
//           </button>
//         ))}

//         {end < totalPages && (
//           <>
//             {end < totalPages - 1 && <span className="ellipsis">…</span>}
//             <button
//               className={`page-number ${currentPage === totalPages ? "active" : ""}`}
//               onClick={() => goToPage(totalPages)}
//               aria-current={currentPage === totalPages ? "page" : undefined}
//             >
//               {totalPages}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
//           disabled={currentPage === totalPages}
//           aria-label="next"
//         >
//           <span className="page-link-next">{t?.paginateNext}</span>
//         </button>
//       </div>
//     );
//   };
//   // ---- pagination end ----

//   const groupedCategories = useMemo(() => {
//     const parentCategories = (categoryData || []).filter(
//       (category) =>
//         !category.parent_id ||
//         (Array.isArray(category.parent_id) && category.parent_id.length === 0)
//     );
//     return parentCategories.map((parentCategory) => {
//       const children = (categoryData || []).filter((sub) => {
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

//   const breadcrumbCategoryTitle = useMemo(() => {
//     if (!selectedCategoryIds || selectedCategoryIds.length === 0) return null;

//     const firstId = Number(selectedCategoryIds[0]);
//     const cat = (categoryData || []).find((c) => Number(c.id) === firstId);

//     return cat?.title || null;
//   }, [selectedCategoryIds, categoryData]);

//   // ---------- FIXED function ----------
//   const handleCategoryToggleById = useCallback(
//     (id) => {
//       const numeric = Number(id);

//       // compute new array deterministically from current state
//       setSelectedCategoryIds((prev) => {
//         const set = new Set(prev.map((v) => Number(v)));
//         if (set.has(numeric)) set.delete(numeric);
//         else set.add(numeric);
//         const arr = normalizeIds(Array.from(set));

//         // build URL params from current searchParams (clone to avoid mutation surprises)
//         const params = new URLSearchParams(searchParams.toString());
//         params.delete("category");
//         params.delete("page");

//         if (arr.length > 0) {
//           arr.forEach((cid) => {
//             const catObj = (categoryData || []).find((c) => Number(c.id) === Number(cid));
//             // safer fallback: if catObj missing, give empty title so slugify doesn't get undefined
//             const slug = getCategorySlug(catObj || { title: "" });
//             if (slug) params.append("category", slug);
//           });
//         }

//         // remove any filters[...] keys so backend filters don't persist unexpectedly
//         Array.from(params.keys()).forEach((k) => {
//           if (/^filters?\[.*\]/.test(k)) params.delete(k);
//         });

//         const newSearch = params.toString();
//         const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//         // Klik olunan kimi loading + scroll
//         setLoading(true);
//         scrollToFilterTitle();
//         router.push(newUrl, { scroll: false });

//         return arr;
//       });
//     },
//     [router, searchParams, categoryData]
//   );
//   // ---------- end fixed function ----------

//   const handleRemoveCategory = useCallback(
//     (id) => {
//       handleCategoryToggleById(id);
//     },
//     [handleCategoryToggleById]
//   );

//   const handleBrandToggleById = useCallback(
//     (brandId) => {
//       const bid = Number(brandId);
//       setSelectedBrandIds((prev) => {
//         const set = new Set(prev);
//         if (set.has(bid)) set.delete(bid);
//         else set.add(bid);
//         return Array.from(set);
//       });

//       const params = new URLSearchParams(searchParams);
//       const current = new Set(
//         params
//           .getAll("brand")
//           .map((v) => parseInt(v, 10))
//           .filter(Number.isFinite)
//       );

//       if (current.has(bid)) current.delete(bid);
//       else current.add(bid);

//       params.delete("brand");
//       params.delete("page");

//       Array.from(current).forEach((v) => params.append("brand", String(v)));

//       Array.from(params.keys()).forEach((k) => {
//         if (/^filters?\[.*\]/.test(k)) params.delete(k);
//       });

//       const newSearch = params.toString();
//       const newUrl = `/products${newSearch ? `?${newSearch}` : ""}`;

//       // Klik olunan kimi loading + scroll
//       setLoading(true);
//       scrollToFilterTitle();
//       router.push(newUrl, { scroll: false });
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
//     const list = Array.isArray(brandsData)
//       ? brandsData
//       : Object.values(brandsData || {});
//     return selectedBrandIds.map((bid) => {
//       const b = list.find((x) => Number(x?.id) === Number(bid));
//       return { id: bid, title: b?.title ?? `Brand ${bid}` };
//     });
//   }, [selectedBrandIds, brandsData]);

//   const singleSelectedParent = useMemo(() => {
//     if (selectedCategoryIds.length !== 1) return null;
//     const onlyId = Number(selectedCategoryIds[0]);
//     const onlyCat = categoryData.find((c) => Number(c.id) === Number(onlyId));
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

//   const sourceCategory = useMemo(() => {
//     if (
//       selectedCategory &&
//       (selectedCategory.page_title ||
//         selectedCategory.page_description ||
//         selectedCategory.meta_title ||
//         selectedCategory.meta_description)
//     ) {
//       return selectedCategory;
//     }
//     return productData?.[0]?.categories?.[0] || null;
//   }, [selectedCategory, productData]);

//   const sortedProductData = useMemo(() => {
//     const list = [...(productData || [])];
//     if (selectedOption?.value === "az") {
//       return list.sort((a, b) =>
//         (a?.title || "").localeCompare(b?.title || "")
//       );
//     }
//     if (selectedOption?.value === "za") {
//       return list.sort((a, b) =>
//         (b?.title || "").localeCompare(a?.title || "")
//       );
//     }
//     return list;
//   }, [productData, selectedOption]);

//   const EmptyState = () => (
//     <div className="newSpinner flex flex-col items-center w-full">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="50"
//         height="50"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#999"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
//       </svg>
//       <p className="mt-2 text-xl text-gray-600">{t?.productsNotFound || "Product not found"}</p>
//     </div>
//   );

//   return (
//     <div>
//       <div className="container">
//         <div className="filterTop topper">
//           <strong>Adentta</strong>
//           <img src="/icons/rightDown.svg" alt="Adentta" />
//           <span>{t?.products}</span>

//           {breadcrumbCategoryTitle && (
//             <>
//               <img src="/icons/rightDown.svg" alt={breadcrumbCategoryTitle} />
//               <span>{breadcrumbCategoryTitle}</span>
//             </>
//           )}
//         </div>

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
//           <div className="xl-3 lg-3 md-3 sm-12" id="filterColumnNotMobile">
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

//                 <button
//                   className="close-btn"
//                   onClick={() => setMobileFilterOpen(false)}
//                 >
//                   <img src="/icons/popupCloseIcon.svg" alt="close" />
//                 </button>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion
//                   title={
//                     singleSelectedParent
//                       ? singleSelectedParent.title
//                       : t?.productsPageFilterCategoryTitle || "Category"
//                   }
//                 >
//                   <ul>
//                     {singleSelectedParent
//                       ? childrenOfSelectedParent.map((child) => {
//                           const isChildSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(child.id)
//                           );
//                           return (
//                             <li
//                               key={child.id}
//                               onClick={() => handleCategoryToggleById(child.id)}
//                               style={{
//                                 cursor: "pointer",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.3rem",
//                                 fontWeight: isChildSelected ? "bold" : "normal",
//                                 marginLeft: "0px",
//                                 fontSize: "1.4rem",
//                                 color: "#666",
//                               }}
//                             >
//                               <span>{child.title}</span>
//                             </li>
//                           );
//                         })
//                       : groupedCategories.map(({ parent, children }) => {
//                           const isParentSelected = selectedCategoryIds.some(
//                             (c) => Number(c) === Number(parent.id)
//                           );
//                           return (
//                             <React.Fragment key={parent.id}>
//                               <li
//                                 onClick={() => handleCategoryToggleById(parent.id)}
//                                 style={{
//                                   cursor: "pointer",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "0.5rem",
//                                   fontWeight: isParentSelected ? "bold" : "normal",
//                                   marginBottom: "4px",
//                                 }}
//                               >
//                                 <span>{parent.title}</span>
//                               </li>

//                               {children.map((child) => {
//                                 const isChildSelected = selectedCategoryIds.some(
//                                   (c) => Number(c) === Number(child.id)
//                                 );
//                                 return (
//                                   <li
//                                     key={child.id}
//                                     onClick={() => handleCategoryToggleById(child.id)}
//                                     style={{
//                                       cursor: "pointer",
//                                       display: "flex",
//                                       alignItems: "center",
//                                       gap: "0.3rem",
//                                       fontWeight: isChildSelected ? "bold" : "normal",
//                                       marginLeft: "1.5rem",
//                                       fontSize: "1.5rem",
//                                       marginBottom: "8px",
//                                       color: "#666",
//                                     }}
//                                   >
//                                     <span>{child.title}</span>
//                                   </li>
//                                 );
//                               })}
//                             </React.Fragment>
//                           );
//                         })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>

//                 <FilterAccordion title={t?.brands || "Brands"}>
//                   <div className="filteredSearch">
//                     <img src="/icons/searchIcon.svg" alt="search" />
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
//                         const checked = selectedBrandIds.includes(
//                           Number(brand?.id)
//                         );
//                         return (
//                           <li key={brand?.id ?? brand?.title}>
//                             <label
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "6px",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               <input
//                                 type="checkbox"
//                                 checked={checked}
//                                 onChange={() =>
//                                   handleBrandToggleById(brand?.id)
//                                 }
//                               />
//                               {brand?.title ?? "No title"}
//                             </label>
//                           </li>
//                         );
//                       })}
//                   </ul>
//                 </FilterAccordion>

//                 <div className="lineFiltered"></div>
//               </div>
//             </div>
//           </div>

//           <div className="xl-9 lg-9 md-9 sm-12">
//             <div className="productPageCards">
//               <div className="productPageSorting">
//                 <span>{t?.sortBy}</span>
//                 <div>
//                   <ReactSelect
//                     t={t}
//                     value={selectedOption}
//                     onChange={setSelectedOption}
//                   />
//                 </div>
//               </div>

//               <div className="row relative">
//                 {loading && (
//                   <div className="absolute inset-0 flex items-start justify-center w-full h-full bg-white/75 z-10">
//                     <div
//                       className="loading-spinner"
//                       style={{
//                         width: "50px",
//                         height: "50px",
//                         border: "6px solid #f3f3f3",
//                         borderTop: "6px solid #293881",
//                         borderRadius: "50%",
//                         animation: "spin 1s linear infinite",
                        
//                       }}
//                     ></div>
//                   </div>
//                 )}

//                 {sortedProductData.length > 0 ? (
//                   sortedProductData.map((data, index) => (
//                     <div
//                       key={`${data.id}-${index}`}
//                       className="xl-4 lg-4 md-6 sm-6"
//                     >
//                       <Link
//                         href={`/products/${slugify(data.title || "")}-${data.id}`}
//                         className="block"
//                       >
//                         <div className="homePageProductCardContent">
//                           <div className="homePageProCardImgs">
//                             <div className="homePageProductCardContentImage">
//                               <img
//                                 src={
//                                   data?.image
//                                     ? `https://admin.adentta.az/storage${data.image}`
//                                     : "/images/adenttaDefaultImg.svg"
//                                 }
//                                 alt=""
//                               />
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentInner">
//                             <div className="homePageProductCardContentText">
//                               <span>{data.title}</span>
//                             </div>
//                             <div className="price">
//                               <div className="priceItem">
//                                 <strong id="prices">{data.price}</strong>
//                                 <Manat />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="homePageProductCardContentBottom">
//                             <span>{t?.learnMore}</span>
//                             <img src="/icons/arrowTopRight.svg" alt="" />
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))
//                 ) : (
//                   <EmptyState />
//                 )}
//               </div>

//               <div className="flex justify-center mt-10">
//                 {renderPagination()}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="productsPageDescription">
//           {(sourceCategory?.page_title || sourceCategory?.page_description) && (
//             <>
//               <h2>
//                 {sourceCategory?.page_title || "Page title is not available"}
//               </h2>

//               {showDetails && (
//                 <div className="productsPageDetailsCEO" style={{ marginTop: "2rem" }}>
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

//               <div className="productsPageDescriptionLink" style={{ marginTop: "1rem" }}>
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







