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

























































// ? EN KRAL PADISAH SENSIN ASLANIM
// File: app/products/page.js
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import ProductsPageFilter from "@/components/ProductsPageFilter";
import Footer from "@/components/Footer/Footer";

// Parallel API calls with Promise.all
async function fetchEssentialData() {
  try {
    const [settingsRes, categoriesRes, brandsRes] = await Promise.all([
      axiosInstance.get(`/page-data/setting`, { cache: "force-cache" }),
      axiosInstance.get("/page-data/categories?per_page=999", { cache: "force-cache" }),
      axiosInstance.get("/page-data/brands?per_page=999", { cache: "force-cache" })
    ]);

    return {
      settingData: settingsRes.data?.data || [],
      categoryData: categoriesRes.data.data.data,
      brandsDataFilter: brandsRes.data.data.data
    };
  } catch (error) {
    console.error("Failed to fetch essential data", error);
    return {
      settingData: [],
      categoryData: [],
      brandsDataFilter: []
    };
  }
}

// Optimized product fetch with pagination (API default 12 per page)
async function fetchProductsByFilters(categoryIds = [], brandIds = [], searchText = "", page = 1, perPage = 12) {
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
    return {
      products: res.data.data.data,
      pagination: res.data.data
    };
  } catch (err) {
    console.error("Filter fetch error (server)", err);
    return { products: [], pagination: null };
  }
}

// PRO HƏLLİ: Hər kateqoriya üçün dəqiq məhsul sayını hesablayan funksiya
async function fetchDetailedProductCounts(categoryData) {
  try {
    const categoryCountsMap = {};
    
    // Hər kateqoriya üçün ayrıca API sorğusu göndəririk
    const countPromises = categoryData.map(async (category) => {
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
        
        return {
          categoryId: category.id,
          count: response.data?.data?.total || 0
        };
      } catch (error) {
        console.error(`Failed to fetch count for category ${category.id}:`, error);
        return {
          categoryId: category.id,
          count: 0
        };
      }
    });
    
    // Bütün sorğuları paralel icra edirik
    const results = await Promise.all(countPromises);
    
    // Nəticələri obyektə çeviririk
    results.forEach(({ categoryId, count }) => {
      categoryCountsMap[categoryId] = count;
    });
    
    return {
      categories: categoryCountsMap,
      total: Object.values(categoryCountsMap).reduce((sum, count) => sum + count, 0)
    };
    
  } catch (error) {
    console.error("Failed to fetch detailed product counts", error);
    return { categories: {}, total: 0 };
  }
}

// Fallback: Lightweight product count fetch
async function fetchProductCounts() {
  try {
    const { data } = await axiosInstance.get("/page-data/product-counts", { 
      cache: "force-cache" 
    });
    return data;
  } catch (error) {
    // Fallback to basic fetch if endpoint doesn't exist
    try {
      const { data } = await axiosInstance.get("/page-data/product?per_page=1", { 
        cache: "force-cache" 
      });
      return { total: data.data.total };
    } catch (err) {
      console.error("Failed to fetch product counts", err);
      return { total: 0 };
    }
  }
}

// Yeni: bütün məhsulları serverdə yığmaq üçün funksionallıq
// PRO qərarı: per_page=999 istifadə edirik (backend-ə uyğun olaraq artıra bilərsiniz)
async function fetchAllProducts() {
  try {
    const res = await axiosInstance.get("/page-data/product?per_page=999", { cache: "force-cache" });
    // res.data.data.data strukturuna uyğun olaraq bütün məhsullar
    return Array.isArray(res.data?.data?.data) ? res.data.data.data : [];
  } catch (err) {
    console.error("Failed to fetch all products for category counts", err);
    return [];
  }
}

async function fetchContactAndEvents() {
  const cookieStore = await cookies();
  try {
    const [contactRes, eventsRes, brandsRes] = await Promise.all([
      axiosInstance.get(`/page-data/contact`, { cache: "force-cache" }),
      axiosInstance.get(`/page-data/event?per_page=999`, { cache: "force-cache" }),
      axiosInstance.get(`/page-data/brands?per_page=999`, { cache: "force-cache" })
    ]);

    return {
      contact: contactRes.data,
      eventsData: eventsRes.data?.data?.data || [],
      brandsData: brandsRes.data?.data?.data || []
    };
  } catch (error) {
    console.error("Failed to fetch contact and events", error);
    return {
      contact: {},
      eventsData: [],
      brandsData: []
    };
  }
}

async function fetchProductsSeoData() {
  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
      cache: "force-cache",
    });
    return aboutSeo;
  } catch (error) {
    console.error("Failed to fetch products SEO data", error);
    return { data: { meta_title: "", meta_description: "", og_image: "" } };
  }
}

async function getTranslations() {
  try {
    const response = await axiosInstance.get("/translation-list", { 
      cache: "force-cache" 
    });
    return response;
  } catch (err) {
    console.log("Translation fetch error:", err);
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
      const { data: category } = await axiosInstance.get("/page-data/categories?per_page=999", {
        cache: "force-cache",
      });
      const allCategories = category.data.data;
      const slugs = categoryParam.split(",");
      const lastSlug = slugs[slugs.length - 1];
      const sel = allCategories.find((c) => c.url_slug === lastSlug);
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
  const perPage = 12; // API default per_page

  // Parallel fetch of essential data + translations + allProducts
  const [essentialData, translations, allProducts] = await Promise.all([
    fetchEssentialData(),
    getTranslations(),
    fetchAllProducts()
  ]);

  const { settingData, categoryData, brandsDataFilter } = essentialData;
  const t = translations?.data;

  // PRO HƏLLİ: Dəqiq məhsul saylarını hesablayırıq
  let productCounts;
  try {
    // Əvvəlcə detailed count API-ni çağırırıq
    productCounts = await fetchDetailedProductCounts(categoryData);
  } catch (error) {
    console.error("Detailed count failed, falling back to basic counts", error);
    // Fallback: əsas məhsul sayı API-ni çağırırıq
    productCounts = await fetchProductCounts();
  }

  // Process selected category
  let selectedCategoryObj = null;
  if (categoryParam) {
    const categorySlugs = categoryParam.split(",");
    const lastSlug = categorySlugs[categorySlugs.length - 1];
    selectedCategoryObj = categoryData.find((c) => c.url_slug === lastSlug) || null;
  }

  const brandIds = brandsParamRaw
    ? brandsParamRaw.split(",").map((s) => parseInt(s, 10)).filter(Boolean)
    : [];

  // Fetch filtered products with pagination
  const { products: initialProducts, pagination } = await fetchProductsByFilters(
    selectedCategoryObj ? [selectedCategoryObj.id] : [],
    brandIds,
    searchText,
    currentPage,
    perPage
  );

  const initialSelectedBrands = brandsDataFilter.filter((b) =>
    brandIds.includes(b.id)
  );
  const initialSelectedCategories = categoryParam
    ? categoryParam
        .split(",")
        .map((slug) => categoryData.find((c) => c.url_slug === slug))
        .filter(Boolean)
    : [];

  // Parallel fetch of footer data (non-blocking)
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
}

// ? EN KRAL PADISAH SENSIN ASLANIM
