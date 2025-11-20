// File: app/products/page.js
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import ProductsPageFilter from "@/components/ProductsPageFilter";
// import Footer from "@/components/Footer/Footer";

// // Fetch all products (unfiltered)
// async function fetchAboutPageData() {
//   try {
//     const { data: product } = await axiosInstance.get("/page-data/product?per_page=999999", {
//       cache: "no-store",
//     });
//     return product.data.data;
//   } catch (error) {
//     console.error("Failed to fetch product page data", error);
//     return [];
//   }
// }
// async function fetchContactPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   try {
//     const { data: contact } = await axiosInstance.get(`/page-data/contact`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return contact;
//   } catch (error) {
//     console.error("Failed to fetch contact page data", error);
//     throw error;
//   }
// }
// async function fetchSettingsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   try {
//     const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
//       cache: "no-store",
//     });
//     return setting;
//   } catch (error) {
//     console.error("Failed to fetch setting page data", error);
//     throw error;
//   }
// }

// async function getTranslations() {
//   try {
//     return await axiosInstance.get("/translation-list");
//   } catch (err) {
//     console.log("Translation fetch error:", err);
//     return null;
//   }
// }

// async function fetchBrandFilterPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get("/page-data/brands?per_page=999", {
//       cache: "no-store",
//     });
//     return brands.data.data;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     return [];
//   }
// }

// async function fetchCategoryPageData() {
//   try {
//     const { data: category } = await axiosInstance.get("/page-data/categories?per_page=999", {
//       cache: "no-store",
//     });
//     return category.data.data;
//   } catch (error) {
//     console.error("Failed to fetch category page data", error);
//     return [];
//   }
// }

// async function fetchBrandsPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
//       cache: "no-store",
//     });
//     return brands;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     throw error;
//   }
// }

// async function fetchEventsPageData() {
//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event?per_page=999`, {
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     console.error("Failed to fetch events page data", error);
//     throw error;
//   }
// }

// async function fetchProductsSeoData() {
//   try {
//     const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
//       cache: "no-store",
//     });
//     return aboutSeo;
//   } catch (error) {
//     console.error("Failed to fetch products SEO data", error);
//     throw error;
//   }
// }

// async function fetchProductsByFilters(categoryIds = [], brandIds = []) {
//   const filters = [];
//   if (categoryIds.length) {
//     filters.push({ key: "categories", operator: "IN", values: categoryIds });
//   }
//   if (brandIds.length) {
//     filters.push({ key: "brands", operator: "IN", values: brandIds });
//   }
//   if (!filters.length) {
//     return await fetchAboutPageData();
//   }
//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");
//   const url = `/page-data/product?per_page=999999&${query}`;
//   try {
//     const res = await axiosInstance.get(url, { cache: "no-store" });
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error (server)", err);
//     return [];
//   }
// }

// export async function generateMetadata({ searchParams }) {
//   const globalSeo = await fetchProductsSeoData();
//   let title = globalSeo.data.meta_title;
//   let description = globalSeo.data.meta_description;
//   let ogImage = globalSeo.data.og_image;
//   let canonicalUrl = "https://adentta.az/products";

//   const categoryParam = searchParams.category || null;
//   if (categoryParam) {
//     const allCategories = await fetchCategoryPageData();
//     const slugs = categoryParam.split(",");
//     const lastSlug = slugs[slugs.length - 1];
//     const sel = allCategories.find((c) => c.url_slug === lastSlug);
//     if (sel?.meta_title && sel?.meta_description) {
//       title = sel.meta_title;
//       description = sel.meta_description;
//       canonicalUrl = `https://adentta.az/products?category=${encodeURIComponent(categoryParam)}`;
//     }
//   }

//   const cookieStore = await cookies();
//   const locale = cookieStore.get("NEXT_LOCALE")?.value;

//   return {
//     title,
//     description,
//     alternates: { canonical: canonicalUrl },
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: ogImage
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${ogImage}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: ogImage ? [ogImage] : [],
//     },
//   };
// }

// export default async function page({ searchParams }) {
//   const categoryParam = searchParams.category || null;
//   const brandsParamRaw = searchParams.brands || null;

//   const productData = await fetchAboutPageData();
//   const brandsDataFilter = await fetchBrandFilterPageData();
//   const categoryData = await fetchCategoryPageData();

//   let selectedCategoryObj = null;
//   if (categoryParam) {
//     const categorySlugs = categoryParam.split(",");
//     const lastSlug = categorySlugs[categorySlugs.length - 1];
//     selectedCategoryObj = categoryData.find((c) => c.url_slug === lastSlug) || null;
//   }

//   const brandIds = brandsParamRaw
//     ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
//     : [];

//   const initialProducts = await fetchProductsByFilters(
//     selectedCategoryObj ? [selectedCategoryObj.id] : [],
//     brandIds
//   );

//   const initialSelectedBrands = brandsDataFilter.filter((b) =>
//     brandIds.includes(b.id)
//   );
//   const initialSelectedCategories = categoryParam
//     ? categoryParam
//         .split(",")
//         .map((slug) => categoryData.find((c) => c.url_slug === slug))
//         .filter(Boolean)
//     : [];
//   const contact = await fetchContactPageData();

//   const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
//   const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
//   const categoryPageTitle = selectedCategoryObj?.page_title || null;
//   const categoryPageDescription = selectedCategoryObj?.page_description || null;

//   const translations = await getTranslations();
//   const t = translations?.data;
//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

//   const setting = await fetchSettingsPageData();
//   const settingData = setting?.data || [];

//   let subcategoriesForSelected = [];
//   if (selectedCategoryObj) {
//     const selId =
//       typeof selectedCategoryObj.id === "number"
//         ? selectedCategoryObj.id
//         : parseInt(selectedCategoryObj.id, 10);
//     subcategoriesForSelected = categoryData.filter((c) => {
//       if (!c.parent_id) return false;
//       if (Array.isArray(c.parent_id)) {
//         return c.parent_id.some((p) => {
//           const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
//           return pid === selId;
//         });
//       }
//       if (typeof c.parent_id === "object" && c.parent_id.id != null) {
//         const pid =
//           typeof c.parent_id.id === "number"
//             ? c.parent_id.id
//             : parseInt(c.parent_id.id, 10);
//         return pid === selId;
//       }
//       return c.parent_id === selId;
//     });
//   }

//   return (
//     <>
//       <Header settingData={settingData} categoryData={categoryData} />

//       <ProductsPageHero
//         t={t}
//         productData={productData}
//         selectedCategory={selectedCategoryObj}
//         subcategories={subcategoriesForSelected}
//       />

//       <ProductsPageFilter
//         allProducts={productData}
//         initialProducts={initialProducts}
//         categoryData={categoryData}
//         brandsDataFilter={brandsDataFilter}
//         initialSelectedBrands={initialSelectedBrands}
//         initialSelectedCategories={initialSelectedCategories}
//         t={t}
//         categoryMetaTitle={categoryMetaTitle}
//         categoryMetaDescription={categoryMetaDescription}
//         categoryPageTitle={categoryPageTitle}
//         categoryPageDescription={categoryPageDescription}
//         categoryId={selectedCategoryObj?.id || null}
//       />

//       <Footer
//         categoryData={categoryData}
//         eventsData={eventsData}
//         brandsData={brandsData}
//         contact={contact}
//       />
//     </>
//   );
// }















































































// ! BU KOD DUZGUNDUR AMMA HERO BOS GELIR
// // File: app/products/page.js
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import ProductsPageFilter from "@/components/ProductsPageFilter";
// import Footer from "@/components/Footer/Footer";

// // Helper function: URL parametrlərindən category ID çıxarmaq
// function parseCategoryIdFromParam(categoryParam) {
//   if (!categoryParam) return null;
//   const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
//   const cleaned = raw.split("?")[0].replace(/\/+$/, "");
//   const parts = cleaned.split("-");
//   const last = parts[parts.length - 1];
//   return /^\d+$/.test(last) ? last : null;
// }

// // Helper function: Query string yaratmaq
// function buildRawQuery(params = {}) {
//   const parts = [];
//   for (const [key, value] of Object.entries(params || {})) {
//     if (Array.isArray(value)) {
//       for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
//     } else if (value !== undefined && value !== null && value !== "") {
//       parts.push(`${key}=${encodeURIComponent(String(value))}`);
//     }
//   }
//   return parts.join("&");
// }

// // OPTIMIZED: Yalnız lazım olan məhsulları çəkmək (12 ədəd)
// async function fetchProductsByParams(searchParams = {}) {
//   const cookieStore = await cookies();
//   const locale = cookieStore.get("NEXT_LOCALE")?.value;

//   try {
//     const stParam = searchParams.search_text || null;
//     const categoryParam = searchParams.category || null;
//     const brandsParam = searchParams.brands || null;
//     const perPage = searchParams.per_page || "12";
//     const page = searchParams.page || "1";

//     let queryString = `per_page=${encodeURIComponent(perPage)}&page=${encodeURIComponent(page)}`;

//     // Priority 1: Əgər search_text varsa
//     if (stParam) {
//       queryString += `&search_text=${encodeURIComponent(stParam)}`;
//     } 
//     // Priority 2: Əgər category varsa
//     else if (categoryParam) {
//       const categoryId = parseCategoryIdFromParam(categoryParam);
//       if (categoryId) {
//         queryString += `&filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=${encodeURIComponent(categoryId)}`;
//       }
//     }

//     // Priority 3: Əgər brands varsa
//     if (brandsParam && !stParam) {
//       const brandIds = brandsParam.split(",").map(s => s.trim()).filter(Boolean);
//       const filterIndex = categoryParam ? 1 : 0;
//       if (brandIds.length > 0) {
//         queryString += `&filters[${filterIndex}][key]=brands&filters[${filterIndex}][operator]=IN`;
//         brandIds.forEach(id => {
//           queryString += `&filters[${filterIndex}][value][]=${encodeURIComponent(id)}`;
//         });
//       }
//     }

//     const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
//       headers: locale ? { Lang: locale } : {},
//       cache: "no-store",
//     });

//     return {
//       products: data?.data?.data || [],
//       pagination: data?.data || null,
//     };
//   } catch (error) {
//     console.error("fetchProductsByParams error:", error);
//     return { products: [], pagination: null };
//   }
// }

// // OPTIMIZED: Essential data - paralel çəkmək
// async function fetchEssentialData() {
//   try {
//     const [settingsRes, categoriesRes, brandsRes] = await Promise.all([
//       axiosInstance.get(`/page-data/setting`, { cache: "force-cache" }),
//       axiosInstance.get("/page-data/categories?per_page=999", { cache: "force-cache" }),
//       axiosInstance.get("/page-data/brands?per_page=999", { cache: "force-cache" })
//     ]);

//     return {
//       settingData: settingsRes.data?.data || [],
//       categoryData: categoriesRes.data?.data?.data || [],
//       brandsDataFilter: brandsRes.data?.data?.data || []
//     };
//   } catch (error) {
//     return {
//       settingData: [],
//       categoryData: [],
//       brandsDataFilter: []
//     };
//   }
// }

// // OPTIMIZED: Footer data
// async function fetchContactAndEvents() {
//   try {
//     const [contactRes, eventsRes] = await Promise.all([
//       axiosInstance.get(`/page-data/contact`, { cache: "force-cache" }),
//       axiosInstance.get(`/page-data/event?per_page=999`, { cache: "force-cache" })
//     ]);

//     return {
//       contact: contactRes.data,
//       eventsData: eventsRes.data?.data?.data || []
//     };
//   } catch (error) {
//     return {
//       contact: {},
//       eventsData: []
//     };
//   }
// }

// // SEO Data
// async function fetchProductsSeoData() {
//   try {
//     const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
//       cache: "force-cache",
//     });
//     return aboutSeo;
//   } catch (error) {
//     return { data: { meta_title: "", meta_description: "", og_image: "" } };
//   }
// }

// // Translations
// async function getTranslations() {
//   try {
//     const response = await axiosInstance.get("/translation-list", { 
//       cache: "force-cache" 
//     });
//     return response;
//   } catch (err) {
//     return null;
//   }
// }

// // Metadata
// export async function generateMetadata({ searchParams }) {
//   const globalSeo = await fetchProductsSeoData();
//   let title = globalSeo.data.meta_title || "Adentta";
//   let description = globalSeo.data.meta_description || "Adentta";
//   let ogImage = globalSeo.data.og_image;
//   let canonicalUrl = "https://adentta.az/products";

//   const categoryParam = searchParams.category || null;
//   const searchText = searchParams.search_text || null;
  
//   if (categoryParam) {
//     try {
//       const { categoryData } = await fetchEssentialData();
//       const categoryId = parseCategoryIdFromParam(categoryParam);
//       const sel = categoryData.find((c) => String(c.id) === String(categoryId));
//       if (sel?.meta_title && sel?.meta_description) {
//         title = sel.meta_title;
//         description = sel.meta_description;
//         canonicalUrl = `https://adentta.az/products?category=${encodeURIComponent(categoryParam)}`;
//       }
//     } catch (error) {
//       console.error("Failed to fetch category for metadata", error);
//     }
//   }
  
//   if (searchText) {
//     const params = new URLSearchParams();
//     if (categoryParam) params.set('category', categoryParam);
//     if (searchParams.brands) params.set('brands', searchParams.brands);
//     if (searchParams.per_page) params.set('per_page', searchParams.per_page);
//     params.set('search_text', searchText);
//     canonicalUrl = `https://adentta.az/products?${params.toString()}`;
//   }

//   const cookieStore = await cookies();
//   const locale = cookieStore.get("NEXT_LOCALE")?.value;

//   return {
//     title,
//     description,
//     alternates: { canonical: canonicalUrl },
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: ogImage
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${ogImage}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: ogImage ? [ogImage] : [],
//     },
//   };
// }

// export default async function page({ searchParams }) {
//   const categoryParam = searchParams.category || null;
//   const brandsParamRaw = searchParams.brands || null;
//   const searchText = searchParams.search_text || null;
//   const currentPage = parseInt(searchParams.page) || 1;
//   const perPage = parseInt(searchParams.per_page) || 12;

//   try {
//     // CRITICAL: Paralel sorğular - daha sürətli
//     const [essentialData, translations, { products: initialProducts, pagination }] = await Promise.all([
//       fetchEssentialData(),
//       getTranslations(),
//       fetchProductsByParams(searchParams)
//     ]);

//     const { settingData, categoryData, brandsDataFilter } = essentialData;
//     const t = translations?.data;

//     // Seçilmiş kateqoriyanı tap
//     let selectedCategoryObj = null;
//     if (categoryParam) {
//       const categoryId = parseCategoryIdFromParam(categoryParam);
//       selectedCategoryObj = categoryData.find((c) => String(c.id) === String(categoryId)) || null;
//     }

//     // Seçilmiş brandları tap
//     const brandIds = brandsParamRaw
//       ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
//       : [];

//     const initialSelectedBrands = brandsDataFilter.filter((b) =>
//       brandIds.includes(b.id)
//     );

//     const initialSelectedCategories = selectedCategoryObj ? [selectedCategoryObj] : [];

//     // Alt kateqoriyalar
//     let subcategoriesForSelected = [];
//     if (selectedCategoryObj) {
//       const selId = typeof selectedCategoryObj.id === "number"
//         ? selectedCategoryObj.id
//         : parseInt(selectedCategoryObj.id, 10);
      
//       subcategoriesForSelected = categoryData.filter((c) => {
//         if (!c.parent_id) return false;
//         if (Array.isArray(c.parent_id)) {
//           return c.parent_id.some((p) => {
//             const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
//             return pid === selId;
//           });
//         }
//         if (typeof c.parent_id === "object" && c.parent_id.id != null) {
//           const pid = typeof c.parent_id.id === "number"
//             ? c.parent_id.id
//             : parseInt(c.parent_id.id, 10);
//           return pid === selId;
//         }
//         return c.parent_id === selId;
//       });
//     }

//     // Non-blocking footer data
//     const footerDataPromise = fetchContactAndEvents();

//     const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
//     const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
//     const categoryPageTitle = selectedCategoryObj?.page_title || null;
//     const categoryPageDescription = selectedCategoryObj?.page_description || null;

//     // Await footer data
//     const { contact, eventsData } = await footerDataPromise;

//     return (
//       <>
//         <Header settingData={settingData} categoryData={categoryData} />

//         <ProductsPageHero
//           t={t}
//           productData={initialProducts}
//           selectedCategory={selectedCategoryObj}
//           subcategories={subcategoriesForSelected}
//         />

//         <ProductsPageFilter
//           initialProducts={initialProducts}
//           categoryData={categoryData}
//           brandsDataFilter={brandsDataFilter}
//           initialSelectedBrands={initialSelectedBrands}
//           initialSelectedCategories={initialSelectedCategories}
//           t={t}
//           categoryMetaTitle={categoryMetaTitle}
//           categoryMetaDescription={categoryMetaDescription}
//           categoryPageTitle={categoryPageTitle}
//           categoryPageDescription={categoryPageDescription}
//           categoryId={selectedCategoryObj?.id || null}
//           searchText={searchText}
//           perPage={perPage}
//           pagination={pagination}
//         />

//         <Footer
//           categoryData={categoryData}
//           eventsData={eventsData}
//           brandsData={brandsDataFilter}
//           contact={contact}
//         />
//       </>
//     );
//   } catch (error) {
//     console.error("Page load error:", error);
//     return (
//       <>
//         <div>Error loading page.</div>
//       </>
//     );
//   }
// }

















































































// * CLAUD bu kodu deyisdirdi yuxarida 31.10
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import ProductsPageFilter from "@/components/ProductsPageFilter";
import Footer from "@/components/Footer/Footer";

// PERFORMANCE OPTIMIZATION: Cached data store
const globalCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCachedData(key) {
  const cached = globalCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCachedData(key, data) {
  globalCache.set(key, {
    data,
    timestamp: Date.now()
  });
}

// ------- HELPERS: category tree (parent -> children) və rekursiv genişləndirmə -------

function normalizeParentIds(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((p) => (typeof p === "object" ? p?.id : p))
      .map((x) => (typeof x === "number" ? x : parseInt(x, 10)))
      .filter((x) => Number.isFinite(x));
  }
  if (typeof raw === "object" && raw.id != null) {
    const v = typeof raw.id === "number" ? raw.id : parseInt(raw.id, 10);
    return Number.isFinite(v) ? [v] : [];
  }
  const v = typeof raw === "number" ? raw : parseInt(raw, 10);
  return Number.isFinite(v) ? [v] : [];
}

function buildChildrenMap(categories = []) {
  const map = new Map(); // parentId -> Set(childId)
  for (const c of categories) {
    const id =
      typeof c.id === "number" ? c.id : parseInt(String(c.id), 10);
    if (!Number.isFinite(id)) continue;

    const parentIds = normalizeParentIds(c.parent_id);
    for (const pid of parentIds) {
      if (!map.has(pid)) map.set(pid, new Set());
      map.get(pid).add(id);
    }
  }
  return map;
}

function collectDescendants(childrenMap, rootIds = []) {
  const out = new Set();
  const stack = [];

  for (const r of rootIds) {
    const rid = Number(r);
    if (Number.isFinite(rid)) {
      // root-un özünü də daxil edəcəyik (aşağıda)
      stack.push(rid);
    }
  }

  while (stack.length) {
    const cur = stack.pop();
    const kids = childrenMap.get(cur);
    if (!kids) continue;
    for (const k of kids) {
      if (!out.has(k)) {
        out.add(k);
        stack.push(k);
      }
    }
  }

  return Array.from(out);
}

// OPTIMIZED: Parallel API calls with better caching
async function fetchEssentialData() {
  const cacheKey = 'essential_data';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const [settingsRes, categoriesRes, brandsRes] = await Promise.all([
      axiosInstance.get(`/page-data/setting`, { cache: "force-cache" }),
      axiosInstance.get("/page-data/categories?per_page=999", { cache: "force-cache" }),
      axiosInstance.get("/page-data/brands?per_page=999", { cache: "force-cache" })
    ]);

    const result = {
      settingData: settingsRes.data?.data || [],
      categoryData: categoriesRes.data.data.data,
      brandsDataFilter: brandsRes.data.data.data
    };

    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Failed to fetch essential data", error);
    return {
      settingData: [],
      categoryData: [],
      brandsDataFilter: []
    };
  }
}

// OPTIMIZED: Single efficient product count calculation
async function fetchOptimizedProductCounts(categoryData) {
  const cacheKey = 'product_counts_detailed';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    // Strategy 1: Try batch endpoint first
    try {
      const batchRes = await axiosInstance.get("/page-data/product-counts-batch", { 
        cache: "force-cache" 
      });
      if (batchRes.data) {
        setCachedData(cacheKey, batchRes.data);
        return batchRes.data;
      }
    } catch (e) {
    }

    // Strategy 2: Optimized parallel requests with concurrency limit
    const BATCH_SIZE = 5; // Process 5 categories at a time to avoid overwhelming server
    const categoryCountsMap = {};
    
    for (let i = 0; i < categoryData.length; i += BATCH_SIZE) {
      const batch = categoryData.slice(i, i + BATCH_SIZE);
      
      const batchPromises = batch.map(async (category) => {
        const cacheKey = `cat_count_${category.id}`;
        const cached = getCachedData(cacheKey);
        if (cached !== null) return { categoryId: category.id, count: cached };

        try {
          const filters = [{ 
            key: "categories", 
            operator: "IN", 
            values: [category.id] 
          }];
          
          const query = filters
            .map((f, idx) => {
              const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
              const vals = f.values
                .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
                .join("&");
              return `${base}&${vals}`;
            })
            .join("&");
            
          const url = `/page-data/product?per_page=1&${query}`;
          const response = await axiosInstance.get(url, { cache: "force-cache" });
          
          const count = response.data?.data?.total || 0;
          setCachedData(`cat_count_${category.id}`, count);
          
          return { categoryId: category.id, count };
        } catch (error) {
          return { categoryId: category.id, count: 0 };
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach(({ categoryId, count }) => {
        categoryCountsMap[categoryId] = count;
      });
    }
    
    const result = {
      categories: categoryCountsMap,
      total: Object.values(categoryCountsMap).reduce((sum, count) => sum + count, 0)
    };
    
    setCachedData(cacheKey, result);
    return result;
    
  } catch (error) {
    return { categories: {}, total: 0 };
  }
}

// OPTIMIZED: Product fetch with better pagination
async function fetchProductsByFilters(categoryIds = [], brandIds = [], searchText = "", page = 1, perPage = 12) {
  const cacheKey = `products_${JSON.stringify({categoryIds, brandIds, searchText, page, perPage})}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

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
        const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
        const vals = f.values
          .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
          .join("&");
        return `${base}&${vals}`;
      })
      .join("&");
    url += `&${query}`;
  }
  
  try {
    const res = await axiosInstance.get(url, { cache: "no-store" });
    const result = {
      products: res.data.data.data,
      pagination: res.data.data
    };
    setCachedData(cacheKey, result);
    return result;
  } catch (err) {
    return { products: [], pagination: null };
  }
}

// OPTIMIZED: Lightweight all products fetch with smart caching
async function fetchAllProducts() {
  const cacheKey = 'all_products';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const res = await axiosInstance.get("/page-data/product?per_page=999", { cache: "force-cache" });
    const products = Array.isArray(res.data?.data?.data) ? res.data.data.data : [];
    setCachedData(cacheKey, products);
    return products;
  } catch (err) {
    return [];
  }
}

// OPTIMIZED: Single contact and events fetch
async function fetchContactAndEvents() {
  const cacheKey = 'contact_events';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const [contactRes, eventsRes, brandsRes] = await Promise.all([
      axiosInstance.get(`/page-data/contact`, { cache: "force-cache" }),
      axiosInstance.get(`/page-data/event?per_page=999`, { cache: "force-cache" }),
      axiosInstance.get(`/page-data/brands?per_page=999`, { cache: "force-cache" })
    ]);

    const result = {
      contact: contactRes.data,
      eventsData: eventsRes.data?.data?.data || [],
      brandsData: brandsRes.data?.data?.data || []
    };

    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    return {
      contact: {},
      eventsData: [],
      brandsData: []
    };
  }
}

async function fetchProductsSeoData() {
  const cacheKey = 'products_seo';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
      cache: "force-cache",
    });
    setCachedData(cacheKey, aboutSeo);
    return aboutSeo;
  } catch (error) {
    return { data: { meta_title: "", meta_description: "", og_image: "" } };
  }
}

async function getTranslations() {
  const cacheKey = 'translations';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await axiosInstance.get("/translation-list", { 
      cache: "force-cache" 
    });
    setCachedData(cacheKey, response);
    return response;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ searchParams }) {
  const globalSeo = await fetchProductsSeoData();
  let title = globalSeo.data.meta_title;
  let description = globalSeo.data.meta_description;
  let ogImage = globalSeo.data.og_image;
  let canonicalUrl = "https://adentta.az/products";

  const categoryParam = searchParams.category || null;
  const searchText = searchParams.search_text || null;
  
  if (categoryParam) {
    try {
      const { categoryData } = await fetchEssentialData();
      const slugs = categoryParam.split(",");
      const lastSlug = slugs[slugs.length - 1];
      const sel = categoryData.find((c) => c.url_slug === lastSlug);
      if (sel?.meta_title && sel?.meta_description) {
        title = sel.meta_title;
        description = sel.meta_description;
        canonicalUrl = `https://adentta.az/products?category=${encodeURIComponent(categoryParam)}`;
      }
    } catch (error) {
      console.error("Failed to fetch category for metadata", error);
    }
  }
  
  if (searchText) {
    const params = new URLSearchParams();
    if (categoryParam) params.set('category', categoryParam);
    if (searchParams.brands) params.set('brands', searchParams.brands);
    if (searchParams.per_page) params.set('per_page', searchParams.per_page);
    params.set('search_text', searchText);
    canonicalUrl = `https://adentta.az/products?${params.toString()}`;
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: ogImage
        ? [
            {
              url: `https://admin.adentta.az/storage${ogImage}`,
              alt: title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      site_name: "adentta.az",
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@adentta",
      site: "@adentta",
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function page({ searchParams }) {
  const categoryParam = searchParams.category || null;
  const brandsParamRaw = searchParams.brands || null;
  const searchText = searchParams.search_text || null;
  const currentPage = parseInt(searchParams.page) || 1;
  const perPage = 12;

  try {
    // PERFORMANCE BOOST: Start all critical requests immediately
    const [essentialData, translations] = await Promise.all([
      fetchEssentialData(),
      getTranslations()
    ]);

    const { settingData, categoryData, brandsDataFilter } = essentialData;
    const t = translations?.data;

    // Process selected category first (needed for product counts)
    let selectedCategoryObj = null;
    if (categoryParam) {
      const categorySlugs = categoryParam.split(",");
      const lastSlug = categorySlugs[categorySlugs.length - 1];
      selectedCategoryObj = categoryData.find((c) => c.url_slug === lastSlug) || null;
    }

    // -------- NEW: seçilmiş kateqoriyanın BUTUN alt-ları ilə birlikdə genişləndirilməsi --------
    const childrenMap = buildChildrenMap(categoryData);
    const expandedCategoryIds = (() => {
      if (!selectedCategoryObj) return [];
      const rootId =
        typeof selectedCategoryObj.id === "number"
          ? selectedCategoryObj.id
          : parseInt(String(selectedCategoryObj.id), 10);
      if (!Number.isFinite(rootId)) return [];
      const descendants = collectDescendants(childrenMap, [rootId]);
      // root + descendants
      return Array.from(new Set([rootId, ...descendants]));
    })();

    const brandIds = brandsParamRaw
      ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
      : [];

    // CRITICAL OPTIMIZATION: Parallel execution of heavy operations
    const [productCounts, { products: initialProducts, pagination }, allProducts] = await Promise.all([
      fetchOptimizedProductCounts(categoryData),
      // IMPORTANT: artıq parent + bütün altları ilə filtrləyirik
      fetchProductsByFilters(
        expandedCategoryIds, // <-- burada genişləndirilmiş id-lər
        brandIds,
        searchText,
        currentPage,
        perPage
      ),
      fetchAllProducts()
    ]);

    // Process remaining data
    const initialSelectedBrands = brandsDataFilter.filter((b) =>
      brandIds.includes(b.id)
    );
    const initialSelectedCategories = categoryParam
      ? categoryParam
          .split(",")
          .map((slug) => categoryData.find((c) => c.url_slug === slug))
          .filter(Boolean)
      : [];

    // Non-blocking footer data fetch
    const footerDataPromise = fetchContactAndEvents();

    const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
    const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
    const categoryPageTitle = selectedCategoryObj?.page_title || null;
    const categoryPageDescription = selectedCategoryObj?.page_description || null;

    let subcategoriesForSelected = [];
    if (selectedCategoryObj) {
      const selId =
        typeof selectedCategoryObj.id === "number"
          ? selectedCategoryObj.id
          : parseInt(selectedCategoryObj.id, 10);
      subcategoriesForSelected = categoryData.filter((c) => {
        if (!c.parent_id) return false;
        if (Array.isArray(c.parent_id)) {
          return c.parent_id.some((p) => {
            const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
            return pid === selId;
          });
        }
        if (typeof c.parent_id === "object" && c.parent_id.id != null) {
          const pid =
            typeof c.parent_id.id === "number"
              ? c.parent_id.id
              : parseInt(c.parent_id.id, 10);
          return pid === selId;
        }
        return c.parent_id === selId;
      });
    }

    // Await footer data at the end
    const { contact, eventsData, brandsData } = await footerDataPromise;

    return (
      <>
        <Header settingData={settingData} categoryData={categoryData} />

        <ProductsPageHero
          t={t}
          productData={initialProducts}
          selectedCategory={selectedCategoryObj}
          subcategories={subcategoriesForSelected}
          productCounts={productCounts}
        />

        <ProductsPageFilter
          allProducts={allProducts}
          initialProducts={initialProducts}
          categoryData={categoryData}
          brandsDataFilter={brandsDataFilter}
          initialSelectedBrands={initialSelectedBrands}
          initialSelectedCategories={initialSelectedCategories}
          t={t}
          categoryMetaTitle={categoryMetaTitle}
          categoryMetaDescription={categoryMetaDescription}
          categoryPageTitle={categoryPageTitle}
          categoryPageDescription={categoryPageDescription}
          categoryId={selectedCategoryObj?.id || null}
          searchText={searchText}
          perPage={perPage}
          pagination={pagination}
          productCounts={productCounts}
        />

        <Footer
          categoryData={categoryData}
          eventsData={eventsData}
          brandsData={brandsData}
          contact={contact}
        />
      </>
    );
  } catch (error) {
    return (
      <>
        <div>Error loading page.</div>
      </>
    );
  }
}
















































// ? Neriman bey asagidadir 
// // File: app/products/page.js
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import ProductsPageFilter from "@/components/ProductsPageFilter";
// import Footer from "@/components/Footer/Footer";

// // PERFORMANCE OPTIMIZATION: Cached data store
// const globalCache = new Map();
// const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// function getCachedData(key) {
//   const cached = globalCache.get(key);
//   if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
//     return cached.data;
//   }
//   return null;
// }

// function setCachedData(key, data) {
//   globalCache.set(key, {
//     data,
//     timestamp: Date.now()
//   });
// }

// // OPTIMIZED: Parallel API calls with better caching
// async function fetchEssentialData() {
//   const cacheKey = 'essential_data';
//   const cached = getCachedData(cacheKey);
//   if (cached) return cached;

//   try {
//     const [settingsRes, categoriesRes, brandsRes] = await Promise.all([
//       axiosInstance.get(`/page-data/setting`, { cache: "force-cache" }),
//       axiosInstance.get("/page-data/categories?per_page=999", { cache: "force-cache" }),
//       axiosInstance.get("/page-data/brands?per_page=999", { cache: "force-cache" })
//     ]);

//     const result = {
//       settingData: settingsRes.data?.data || [],
//       categoryData: categoriesRes.data.data.data,
//       brandsDataFilter: brandsRes.data.data.data
//     };

//     setCachedData(cacheKey, result);
//     return result;
//   } catch (error) {
//     console.error("Failed to fetch essential data", error);
//     return {
//       settingData: [],
//       categoryData: [],
//       brandsDataFilter: []
//     };
//   }
// }

// // OPTIMIZED: Single efficient product count calculation
// async function fetchOptimizedProductCounts(categoryData) {
//   const cacheKey = 'product_counts_detailed';
//   const cached = getCachedData(cacheKey);
//   if (cached) return cached;

//   try {
//     // Strategy 1: Try batch endpoint first
//     try {
//       const batchRes = await axiosInstance.get("/page-data/product-counts-batch", { 
//         cache: "force-cache" 
//       });
//       if (batchRes.data) {
//         setCachedData(cacheKey, batchRes.data);
//         return batchRes.data;
//       }
//     } catch (e) {
//     }

//     // Strategy 2: Optimized parallel requests with concurrency limit
//     const BATCH_SIZE = 5; // Process 5 categories at a time to avoid overwhelming server
//     const categoryCountsMap = {};
    
//     for (let i = 0; i < categoryData.length; i += BATCH_SIZE) {
//       const batch = categoryData.slice(i, i + BATCH_SIZE);
      
//       const batchPromises = batch.map(async (category) => {
//         const cacheKey = `cat_count_${category.id}`;
//         const cached = getCachedData(cacheKey);
//         if (cached !== null) return { categoryId: category.id, count: cached };

//         try {
//           const filters = [{ 
//             key: "categories", 
//             operator: "IN", 
//             values: [category.id] 
//           }];
          
//           const query = filters
//             .map((f, idx) => {
//               const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//               const vals = f.values
//                 .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//                 .join("&");
//               return `${base}&${vals}`;
//             })
//             .join("&");
            
//           const url = `/page-data/product?per_page=1&${query}`;
//           const response = await axiosInstance.get(url, { cache: "force-cache" });
          
//           const count = response.data?.data?.total || 0;
//           setCachedData(`cat_count_${category.id}`, count);
          
//           return { categoryId: category.id, count };
//         } catch (error) {
//           return { categoryId: category.id, count: 0 };
//         }
//       });
      
//       const batchResults = await Promise.all(batchPromises);
//       batchResults.forEach(({ categoryId, count }) => {
//         categoryCountsMap[categoryId] = count;
//       });
//     }
    
//     const result = {
//       categories: categoryCountsMap,
//       total: Object.values(categoryCountsMap).reduce((sum, count) => sum + count, 0)
//     };
    
//     setCachedData(cacheKey, result);
//     return result;
    
//   } catch (error) {
//     return { categories: {}, total: 0 };
//   }
// }

// // OPTIMIZED: Product fetch with better pagination
// async function fetchProductsByFilters(categoryIds = [], brandIds = [], searchText = "", page = 1, perPage = 12) {
//   const cacheKey = `products_${JSON.stringify({categoryIds, brandIds, searchText, page, perPage})}`;
//   const cached = getCachedData(cacheKey);
//   if (cached) return cached;

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
//         const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(f.operator)}`;
//         const vals = f.values
//           .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//           .join("&");
//         return `${base}&${vals}`;
//       })
//       .join("&");
//     url += `&${query}`;
//   }
  
//   try {
//     const res = await axiosInstance.get(url, { cache: "no-store" });
//     const result = {
//       products: res.data.data.data,
//       pagination: res.data.data
//     };
//     setCachedData(cacheKey, result);
//     return result;
//   } catch (err) {
//     return { products: [], pagination: null };
//   }
// }

// // OPTIMIZED: Lightweight all products fetch with smart caching
// async function fetchAllProducts() {
//   const cacheKey = 'all_products';
//   const cached = getCachedData(cacheKey);
//   if (cached) return cached;

//   try {
//     const res = await axiosInstance.get("/page-data/product?per_page=999", { cache: "force-cache" });
//     const products = Array.isArray(res.data?.data?.data) ? res.data.data.data : [];
//     setCachedData(cacheKey, products);
//     return products;
//   } catch (err) {
//     return [];
//   }
// }

// // OPTIMIZED: Single contact and events fetch
// async function fetchContactAndEvents() {
//   const cacheKey = 'contact_events';
//   const cached = getCachedData(cacheKey);
//   if (cached) return cached;

//   try {
//     const [contactRes, eventsRes, brandsRes] = await Promise.all([
//       axiosInstance.get(`/page-data/contact`, { cache: "force-cache" }),
//       axiosInstance.get(`/page-data/event?per_page=999`, { cache: "force-cache" }),
//       axiosInstance.get(`/page-data/brands?per_page=999`, { cache: "force-cache" })
//     ]);

//     const result = {
//       contact: contactRes.data,
//       eventsData: eventsRes.data?.data?.data || [],
//       brandsData: brandsRes.data?.data?.data || []
//     };

//     setCachedData(cacheKey, result);
//     return result;
//   } catch (error) {
//     return {
//       contact: {},
//       eventsData: [],
//       brandsData: []
//     };
//   }
// }

// async function fetchProductsSeoData() {
//   const cacheKey = 'products_seo';
//   const cached = getCachedData(cacheKey);
//   if (cached) return cached;

//   try {
//     const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
//       cache: "force-cache",
//     });
//     setCachedData(cacheKey, aboutSeo);
//     return aboutSeo;
//   } catch (error) {
//     return { data: { meta_title: "", meta_description: "", og_image: "" } };
//   }
// }

// async function getTranslations() {
//   const cacheKey = 'translations';
//   const cached = getCachedData(cacheKey);
//   if (cached) return cached;

//   try {
//     const response = await axiosInstance.get("/translation-list", { 
//       cache: "force-cache" 
//     });
//     setCachedData(cacheKey, response);
//     return response;
//   } catch (err) {
//     return null;
//   }
// }

// export async function generateMetadata({ searchParams }) {
//   const globalSeo = await fetchProductsSeoData();
//   let title = globalSeo.data.meta_title;
//   let description = globalSeo.data.meta_description;
//   let ogImage = globalSeo.data.og_image;
//   let canonicalUrl = "https://adentta.az/products";

//   const categoryParam = searchParams.category || null;
//   const searchText = searchParams.search_text || null;
  
//   if (categoryParam) {
//     try {
//       const { categoryData } = await fetchEssentialData();
//       const slugs = categoryParam.split(",");
//       const lastSlug = slugs[slugs.length - 1];
//       const sel = categoryData.find((c) => c.url_slug === lastSlug);
//       if (sel?.meta_title && sel?.meta_description) {
//         title = sel.meta_title;
//         description = sel.meta_description;
//         canonicalUrl = `https://adentta.az/products?category=${encodeURIComponent(categoryParam)}`;
//       }
//     } catch (error) {
//       console.error("Failed to fetch category for metadata", error);
//     }
//   }
  
//   if (searchText) {
//     const params = new URLSearchParams();
//     if (categoryParam) params.set('category', categoryParam);
//     if (searchParams.brands) params.set('brands', searchParams.brands);
//     if (searchParams.per_page) params.set('per_page', searchParams.per_page);
//     params.set('search_text', searchText);
//     canonicalUrl = `https://adentta.az/products?${params.toString()}`;
//   }

//   const cookieStore = await cookies();
//   const locale = cookieStore.get("NEXT_LOCALE")?.value;

//   return {
//     title,
//     description,
//     alternates: { canonical: canonicalUrl },
//     openGraph: {
//       title,
//       description,
//       url: canonicalUrl,
//       images: ogImage
//         ? [
//             {
//               url: `https://admin.adentta.az/storage${ogImage}`,
//               alt: title,
//               width: 1200,
//               height: 630,
//             },
//           ]
//         : [],
//       site_name: "adentta.az",
//       type: "website",
//       locale,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@adentta",
//       site: "@adentta",
//       images: ogImage ? [ogImage] : [],
//     },
//   };
// }

// export default async function page({ searchParams }) {
//   const categoryParam = searchParams.category || null;
//   const brandsParamRaw = searchParams.brands || null;
//   const searchText = searchParams.search_text || null;
//   const currentPage = parseInt(searchParams.page) || 1;
//   const perPage = 12;

//   try {
//     // PERFORMANCE BOOST: Start all critical requests immediately
//     const [essentialData, translations] = await Promise.all([
//       fetchEssentialData(),
//       getTranslations()
//     ]);

//     const { settingData, categoryData, brandsDataFilter } = essentialData;
//     const t = translations?.data;

//     // Process selected category first (needed for product counts)
//     let selectedCategoryObj = null;
//     if (categoryParam) {
//       const categorySlugs = categoryParam.split(",");
//       const lastSlug = categorySlugs[categorySlugs.length - 1];
//       selectedCategoryObj = categoryData.find((c) => c.url_slug === lastSlug) || null;
//     }

//     const brandIds = brandsParamRaw
//       ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
//       : [];

//     // CRITICAL OPTIMIZATION: Parallel execution of heavy operations
//     const [productCounts, { products: initialProducts, pagination }, allProducts] = await Promise.all([
//       fetchOptimizedProductCounts(categoryData),
//       fetchProductsByFilters(
//         selectedCategoryObj ? [selectedCategoryObj.id] : [],
//         brandIds,
//         searchText,
//         currentPage,
//         perPage
//       ),
//       fetchAllProducts()
//     ]);

//     // Process remaining data
//     const initialSelectedBrands = brandsDataFilter.filter((b) =>
//       brandIds.includes(b.id)
//     );
//     const initialSelectedCategories = categoryParam
//       ? categoryParam
//           .split(",")
//           .map((slug) => categoryData.find((c) => c.url_slug === slug))
//           .filter(Boolean)
//       : [];

//     // Non-blocking footer data fetch
//     const footerDataPromise = fetchContactAndEvents();

//     const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
//     const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
//     const categoryPageTitle = selectedCategoryObj?.page_title || null;
//     const categoryPageDescription = selectedCategoryObj?.page_description || null;

//     let subcategoriesForSelected = [];
//     if (selectedCategoryObj) {
//       const selId =
//         typeof selectedCategoryObj.id === "number"
//           ? selectedCategoryObj.id
//           : parseInt(selectedCategoryObj.id, 10);
//       subcategoriesForSelected = categoryData.filter((c) => {
//         if (!c.parent_id) return false;
//         if (Array.isArray(c.parent_id)) {
//           return c.parent_id.some((p) => {
//             const pid = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
//             return pid === selId;
//           });
//         }
//         if (typeof c.parent_id === "object" && c.parent_id.id != null) {
//           const pid =
//             typeof c.parent_id.id === "number"
//               ? c.parent_id.id
//               : parseInt(c.parent_id.id, 10);
//           return pid === selId;
//         }
//         return c.parent_id === selId;
//       });
//     }

//     // Await footer data at the end
//     const { contact, eventsData, brandsData } = await footerDataPromise;

//     return (
//       <>
//         <Header settingData={settingData} categoryData={categoryData} />

//         <ProductsPageHero
//           t={t}
//           productData={initialProducts}
//           selectedCategory={selectedCategoryObj}
//           subcategories={subcategoriesForSelected}
//           productCounts={productCounts}
//         />

//         <ProductsPageFilter
//           allProducts={allProducts}
//           initialProducts={initialProducts}
//           categoryData={categoryData}
//           brandsDataFilter={brandsDataFilter}
//           initialSelectedBrands={initialSelectedBrands}
//           initialSelectedCategories={initialSelectedCategories}
//           t={t}
//           categoryMetaTitle={categoryMetaTitle}
//           categoryMetaDescription={categoryMetaDescription}
//           categoryPageTitle={categoryPageTitle}
//           categoryPageDescription={categoryPageDescription}
//           categoryId={selectedCategoryObj?.id || null}
//           searchText={searchText}
//           perPage={perPage}
//           pagination={pagination}
//           productCounts={productCounts}
//         />

//         <Footer
//           categoryData={categoryData}
//           eventsData={eventsData}
//           brandsData={brandsData}
//           contact={contact}
//         />
//       </>
//     );
//   } catch (error) {
//     return (
//       <>
//         <div>Error loading page.</div>
//       </>
//     );
//   }
// }
