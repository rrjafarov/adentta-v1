// // !Son versiya
// // File: app/products/page.jsx
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import ProductsPageFilter from "@/components/ProductsPageFilter";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// // Fetch all products (unfiltered)
// async function fetchAboutPageData() {
//   const cookieStore = await cookies();
//   // const lang = cookieStore.get("NEXT_LOCALE"); // Uncomment if needed

//   try {
//     const { data: product } = await axiosInstance.get("/page-data/product?per_page=999", {
//       cache: "no-store",
//     });
//     return product.data.data;
//   } catch (error) {
//     console.error("Failed to fetch product page data", error);
//     return [];
//   }
// }

// async function getTranslations (){
//   try {
//     const data = axiosInstance.get("/translation-list")
//     return data;
//   }catch(err){
//     console.log(err)
//   }
// }

// // Fetch brand list
// async function fetchBrandFilterPageData() {
//   const cookieStore = await cookies();
//   // const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: brands } = await axiosInstance.get("/page-data/brands", {
//       cache: "no-store",
//     });
//     return brands.data.data;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     return [];
//   }
// }

// // !category
// // Fetch category list
// async function fetchCategoryPageData() {
//   const cookieStore = await cookies();
//   // const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: category } = await axiosInstance.get(
//       "/page-data/categories?per_page=999",
//       {
//         cache: "no-store",
//       }
//     );
//     return category.data.data;
//   } catch (error) {
//     console.error("Failed to fetch category page data", error);
//     return [];
//   }
// }
// // !category  

// //! brandsApi
// async function fetchBrandsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return brands;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     throw error;
//   }
// }
// //! brandsApi

// //! eventsApi
// async function fetchEventsPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return events;
//   } catch (error) {
//     console.error("Failed to fetch events page data", error);
//     throw error;
//   }
// }
// //! eventsApi

// async function fetchProductsSeoData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
//       // headers: { Lang: lang.value },
//       cache: "no-store",
//     });
//     return aboutSeo;
//   } catch (error) {
//     console.error("Failed to fetch aboutSeo page data", error);
//     throw error;
//   }
// }

// // !generateMetaData
// export async function generateMetadata() {
//   const seo = await fetchProductsSeoData();
//   const imageUrl = seo?.data.og_image;
//   const imageAlt = seo?.data.meta_title || "Adentta";
//   const canonicalUrl = "https://adentta.az";
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   return {
//     title: seo?.data.meta_title,
//     description: seo?.data.meta_description,
//     // icons: {
//     //   icon: "https://adentta.az/favicon.ico.svg",
//     // },
//     openGraph: {
//       title: seo?.data.meta_title || "Adentta",
//       description: seo?.data.meta_description,
//       url: canonicalUrl,
//       images: [
//         {
//           url: `https://admin.adentta.az/storage${imageUrl}`,
//           alt: imageAlt,
//           width: 1200,
//           height: 630,
//         },
//       ],
//       site_name: "adentta.az",
//       type: "website",
//       locale: lang?.value,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seo?.data.meta_title || "Adentta",
//       description: seo?.data.meta_description || "Adentta",
//       creator: "@adentta",
//       site: "@adentta",
//       images: [imageUrl],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }
// // !generateMetaData





// // Main page component
// export default async function page({ searchParams }) {
//   // Read ?category=ID from URL (e.g. /products?category=3)
//   const categoryParam = searchParams.category || null;
//   console.log( categoryParam  , "categoryParam");   

//   // Fetch initial data
//   const productData = await fetchAboutPageData();
//   const brandsDataFilter = await fetchBrandFilterPageData();
//   const categoryData = await fetchCategoryPageData();
//   const translations = await getTranslations()
//   const t = translations?.data

//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];

//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

  
//   return (
//     <>
//       {/* <Header /> */}
//       <Header categoryData={categoryData} />
//       <ProductsPageHero t={t} productData={productData} />
//       <ProductsPageFilter
//         productData={productData}
//         categoryData={categoryData}
//         // brandsData={brandsData}
//         brandsDataFilter={brandsDataFilter}
//         categoryParam={categoryParam}
//         t={t}
//       />
//       <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
//     </>
//   );
// }

// !Son versiya

// --------------------------------------------------------------------------------------------------------------------------













// File: app/products/page.jsx
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import ProductsPageFilter from "@/components/ProductsPageFilter";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

// Fetch all products (unfiltered)
async function fetchAboutPageData() {
  try {
    const { data: product } = await axiosInstance.get("/page-data/product?per_page=999", {
      cache: "no-store",
    });
    // API dönüşünüze göre gerekirse burada düzeltin:
    return product.data.data;
  } catch (error) {
    console.error("Failed to fetch product page data", error);
    return [];
  }
}

async function getTranslations() {
  try {
    const res = await axiosInstance.get("/translation-list");
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Fetch brand list
async function fetchBrandFilterPageData() {
  try {
    const { data: brands } = await axiosInstance.get("/page-data/brands", {
      cache: "no-store",
    });
    return brands.data.data;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    return [];
  }
}

// Fetch category list
async function fetchCategoryPageData() {
  try {
    const { data: category } = await axiosInstance.get("/page-data/categories?per_page=999", {
      cache: "no-store",
    });
    return category.data.data;
  } catch (error) {
    console.error("Failed to fetch category page data", error);
    return [];
  }
}

// brandsApi
async function fetchBrandsPageData() {
  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands`, {
      cache: "no-store",
    });
    return brands;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    throw error;
  }
}

// eventsApi
async function fetchEventsPageData() {
  try {
    const { data: events } = await axiosInstance.get(`/page-data/event`, {
      cache: "no-store",
    });
    return events;
  } catch (error) {
    console.error("Failed to fetch events page data", error);
    throw error;
  }
}

async function fetchProductsSeoData() {
  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
      cache: "no-store",
    });
    return aboutSeo;
  } catch (error) {
    console.error("Failed to fetch aboutSeo page data", error);
    throw error;
  }
}

export async function generateMetadata({ searchParams }) {
  // Global SEO; kategoriye göre özelleştirmek isterseniz burada ID eşleştirmesi yapabilirsiniz.
  const seo = await fetchProductsSeoData();
  const imageUrl = seo?.data.og_image;
  const imageAlt = seo?.data.meta_title || "Adentta";
  const canonicalUrl = "https://adentta.az/products";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  return {
    title: seo?.data.meta_title,
    description: seo?.data.meta_description,
    openGraph: {
      title: seo?.data.meta_title || "Adentta",
      description: seo?.data.meta_description,
      url: canonicalUrl,
      images: [
        imageUrl
          ? {
              url: `https://admin.adentta.az/storage${imageUrl}`,
              alt: imageAlt,
              width: 1200,
              height: 630,
            }
          : null,
      ].filter(Boolean),
      site_name: "adentta.az",
      type: "website",
      locale: lang?.value,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.data.meta_title || "Adentta",
      description: seo?.data.meta_description || "Adentta",
      creator: "@adentta",
      site: "@adentta",
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// ID dizilerine göre backend filtreli ürün fetch eden fonksiyon
async function fetchProductsByFilters(categoryIds = [], brandIds = []) {
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
  if (!filters.length) {
    return await fetchAboutPageData();
  }
  const query = filters
    .map((f, idx) => {
      const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(
        f.operator
      )}`;
      const vals = f.values
        .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
        .join("&");
      return `${base}&${vals}`;
    })
    .join("&");
  const url = `/page-data/product?per_page=999&${query}`;
  try {
    const res = await axiosInstance.get(url, { cache: "no-store" });
    // API dönüş yapınıza göre gerektiğinde düzeltin:
    return res.data.data.data;
  } catch (err) {
    console.error("Filter fetch error (server)", err);
    return [];
  }
}

// Main page component
export default async function page({ searchParams }) {
  // URL örn: /products?category=1&brands=17,53 (artık ID tabanlı)
  const categoryIdParam = searchParams.category || null; // ID
  const brandsParamRaw = searchParams.brands || null; // "17,53"

  // 1. Verileri fetch et
  const productData = await fetchAboutPageData();
  const brandsDataFilter = await fetchBrandFilterPageData();
  const categoryData = await fetchCategoryPageData();

  // 2. categoryIdParam ile eşleştirme: categoryData içinde ID ile eşleştir
  let selectedCategoryObj = null;
  let categoryIds = [];
  
  if (categoryIdParam) {
    // Virgülle ayrılmış ID'leri işle
    const idParts = categoryIdParam.split(",");
    categoryIds = idParts.map((id) => parseInt(id, 10)).filter((n) => !isNaN(n));
    
    // İlk kategoriyi seçili kategori olarak al (meta veriler için)
    if (categoryIds.length > 0) {
      selectedCategoryObj = categoryData.find((c) => c.id === categoryIds[0]) || null;
    }
  }

  // 3. brandIds oluştur
  let brandIds = [];
  if (brandsParamRaw) {
    const parts = Array.isArray(brandsParamRaw) ? brandsParamRaw : brandsParamRaw.split(",");
    brandIds = parts.map((p) => parseInt(p, 10)).filter((n) => !isNaN(n));
  }

  // 4. Filtreli ürünleri fetch et
  const initialProducts = await fetchProductsByFilters(categoryIds, brandIds);

  // 5. initialSelectedBrands / initialSelectedCategories
  const initialSelectedBrands = brandsDataFilter.filter((b) => brandIds.includes(b.id));
  const initialSelectedCategories = categoryData.filter((c) => categoryIds.includes(c.id));

  // 6. Seçili kategori meta ve page verileri (ilk kategori baz alınır)
  const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
  const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
  const categoryPageTitle = selectedCategoryObj?.page_title || null;
  const categoryPageDescription = selectedCategoryObj?.page_description || null; // HTML içerebilir

  // 7. Diğer veriler
  const translations = await getTranslations();
  const t = translations?.data;
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];
  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  // Hero: tüm ürünler veya initialProducts
  const allProductsForHero = productData;

  return (
    <>
      <Header categoryData={categoryData} />
      <ProductsPageHero t={t} productData={allProductsForHero} />
      <ProductsPageFilter
        initialProducts={initialProducts}
        categoryData={categoryData}
        brandsDataFilter={brandsDataFilter}
        initialSelectedBrands={initialSelectedBrands}
        initialSelectedCategories={initialSelectedCategories}
        t={t}
        // Dinamik meta için
        categoryMetaTitle={categoryMetaTitle}
        categoryMetaDescription={categoryMetaDescription}
        // Dinamik page verileri için
        categoryPageTitle={categoryPageTitle}
        categoryPageDescription={categoryPageDescription}
        categoryId={selectedCategoryObj?.id || null} // slug yerine ID
      />
      <Footer categoryData={categoryData} eventsData={eventsData} brandsData={brandsData} />
    </>
  );
}



















// // File: app/products/page.jsx
// import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";
// import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
// import ProductsPageFilter from "@/components/ProductsPageFilter";
// import React from "react";
// import { cookies } from "next/headers";
// import axiosInstance from "@/lib/axios";

// // Fetch all products (unfiltered)
// async function fetchAboutPageData() {
//   try {
//     const { data: product } = await axiosInstance.get("/page-data/product?per_page=999", {
//       cache: "no-store",
//     });
//     // API dönüşünüze göre gerekirse burada düzeltin:
//     return product.data.data;
//   } catch (error) {
//     console.error("Failed to fetch product page data", error);
//     return [];
//   }
// }

// async function getTranslations() {
//   try {
//     const res = await axiosInstance.get("/translation-list");
//     return res;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }

// // Fetch brand list
// async function fetchBrandFilterPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get("/page-data/brands", {
//       cache: "no-store",
//     });
//     return brands.data.data;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     return [];
//   }
// }

// // Fetch category list
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

// // brandsApi
// async function fetchBrandsPageData() {
//   try {
//     const { data: brands } = await axiosInstance.get(`/page-data/brands`, {
//       cache: "no-store",
//     });
//     return brands;
//   } catch (error) {
//     console.error("Failed to fetch brands page data", error);
//     throw error;
//   }
// }

// // eventsApi
// async function fetchEventsPageData() {
//   try {
//     const { data: events } = await axiosInstance.get(`/page-data/event`, {
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
//     console.error("Failed to fetch aboutSeo page data", error);
//     throw error;
//   }
// }

// export async function generateMetadata({ searchParams }) {
//   // Yine global SEO; kategoriye göre özelleştirmek isterseniz burada slug eşleştirmesi yapabilirsiniz.
//   const seo = await fetchProductsSeoData();
//   const imageUrl = seo?.data.og_image;
//   const imageAlt = seo?.data.meta_title || "Adentta";
//   const canonicalUrl = "https://adentta.az/products";
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   return {
//     title: seo?.data.meta_title,
//     description: seo?.data.meta_description,
//     openGraph: {
//       title: seo?.data.meta_title || "Adentta",
//       description: seo?.data.meta_description,
//       url: canonicalUrl,
//       images: [
//         imageUrl
//           ? {
//               url: `https://admin.adentta.az/storage${imageUrl}`,
//               alt: imageAlt,
//               width: 1200,
//               height: 630,
//             }
//           : null,
//       ].filter(Boolean),
//       site_name: "adentta.az",
//       type: "website",
//       locale: lang?.value,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seo?.data.meta_title || "Adentta",
//       description: seo?.data.meta_description || "Adentta",
//       creator: "@adentta",
//       site: "@adentta",
//       images: imageUrl ? [imageUrl] : [],
//     },
//     alternates: {
//       canonical: canonicalUrl,
//     },
//   };
// }

// // ID dizilerine göre backend filtreli ürün fetch eden fonksiyon
// async function fetchProductsByFilters(categoryIds = [], brandIds = []) {
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
//     return await fetchAboutPageData();
//   }
//   const query = filters
//     .map((f, idx) => {
//       const base = `filters[${idx}][key]=${encodeURIComponent(f.key)}&filters[${idx}][operator]=${encodeURIComponent(
//         f.operator
//       )}`;
//       const vals = f.values
//         .map((v) => `filters[${idx}][value][]=${encodeURIComponent(v)}`)
//         .join("&");
//       return `${base}&${vals}`;
//     })
//     .join("&");
//   const url = `/page-data/product?per_page=999&${query}`;
//   try {
//     const res = await axiosInstance.get(url, { cache: "no-store" });
//     // API dönüş yapınıza göre gerektiğinde düzeltin:
//     return res.data.data.data;
//   } catch (err) {
//     console.error("Filter fetch error (server)", err);
//     return [];
//   }
// }

// // Main page component
// export default async function page({ searchParams }) {
//   // URL örn: /products?category=cerrahiyye&brands=17,53
//   const categorySlug = searchParams.category || null; // slug
//   const brandsParamRaw = searchParams.brands || null; // "17,53"

//   // 1. Verileri fetch et
//   const productData = await fetchAboutPageData();
//   const brandsDataFilter = await fetchBrandFilterPageData();
//   const categoryData = await fetchCategoryPageData();

//   // 2. categorySlug ile eşleştirme: categoryData içinde url_slug veya title’dan slugify
//   let selectedCategoryObj = null;
//   if (categorySlug) {
//     selectedCategoryObj = categoryData.find((c) => {
//       if (c.url_slug) {
//         return c.url_slug === categorySlug;
//       }
//       // fallback slugify title
//       const normalized = c.title
//         .toString()
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .toLowerCase()
//         .trim()
//         .replace(/\s+/g, "-")
//         .replace(/[^\w\-]+/g, "")
//         .replace(/\-\-+/g, "-");
//       return normalized === categorySlug;
//     }) || null;
//   }

//   // 3. categoryIds ve brandIds oluştur
//   let categoryIds = [];
//   if (selectedCategoryObj) {
//     categoryIds = [selectedCategoryObj.id];
//   }
//   let brandIds = [];
//   if (brandsParamRaw) {
//     const parts = Array.isArray(brandsParamRaw) ? brandsParamRaw : brandsParamRaw.split(",");
//     brandIds = parts.map((p) => parseInt(p, 10)).filter((n) => !isNaN(n));
//   }

//   // 4. Filtreli ürünleri fetch et
//   const initialProducts = await fetchProductsByFilters(categoryIds, brandIds);

//   // 5. initialSelectedBrands / initialSelectedCategories
//   const initialSelectedBrands = brandsDataFilter.filter((b) => brandIds.includes(b.id));
//   const initialSelectedCategories = [];
//   if (selectedCategoryObj) {
//     initialSelectedCategories.push(selectedCategoryObj);
//   }

//   // 6. Seçili kategori meta ve page verileri
//   const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
//   const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
//   const categoryPageTitle = selectedCategoryObj?.page_title || null;
//   const categoryPageDescription = selectedCategoryObj?.page_description || null; // HTML içerebilir

//   // 7. Diğer veriler
//   const translations = await getTranslations();
//   const t = translations?.data;
//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];
//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

//   // Hero: tüm ürünler veya initialProducts
//   const allProductsForHero = productData;

//   return (
//     <>
//       <Header categoryData={categoryData} />
//       <ProductsPageHero t={t} productData={allProductsForHero} />
//       <ProductsPageFilter
//         initialProducts={initialProducts}
//         categoryData={categoryData}
//         brandsDataFilter={brandsDataFilter}
//         initialSelectedBrands={initialSelectedBrands}
//         initialSelectedCategories={initialSelectedCategories}
//         t={t}
//         // Dinamik meta için
//         categoryMetaTitle={categoryMetaTitle}
//         categoryMetaDescription={categoryMetaDescription}
//         // Dinamik page verileri için
//         categoryPageTitle={categoryPageTitle}
//         categoryPageDescription={categoryPageDescription}
//         categorySlug={selectedCategoryObj?.url_slug || null}
//       />
//       <Footer categoryData={categoryData} eventsData={eventsData} brandsData={brandsData} />
//     </>
//   );
// }
