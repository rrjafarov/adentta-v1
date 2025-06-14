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

//! --------------------------------------------------------------------------------------------------------------------------



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
//   // Global SEO; kategoriye göre özelleştirmek isterseniz burada ID eşleştirmesi yapabilirsiniz.
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
//   // URL örn: /products?category=1&brands=17,53 (artık ID tabanlı)
//   const categoryIdParam = searchParams.category || null; // ID
//   const brandsParamRaw = searchParams.brands || null; // "17,53"

//   // 1. Verileri fetch et
//   const productData = await fetchAboutPageData();
//   const brandsDataFilter = await fetchBrandFilterPageData();
//   const categoryData = await fetchCategoryPageData();

//   // 2. categoryIdParam ile eşleştirme: categoryData içinde ID ile eşleştir
//   let selectedCategoryObj = null;
//   let categoryIds = [];
  
//   if (categoryIdParam) {
//     // Virgülle ayrılmış ID'leri işle
//     const idParts = categoryIdParam.split(",");
//     categoryIds = idParts.map((id) => parseInt(id, 10)).filter((n) => !isNaN(n));
    
//     // İlk kategoriyi seçili kategori olarak al (meta veriler için)
//     if (categoryIds.length > 0) {
//       selectedCategoryObj = categoryData.find((c) => c.id === categoryIds[0]) || null;
//     }
//   }

//   // 3. brandIds oluştur
//   let brandIds = [];
//   if (brandsParamRaw) {
//     const parts = Array.isArray(brandsParamRaw) ? brandsParamRaw : brandsParamRaw.split(",");
//     brandIds = parts.map((p) => parseInt(p, 10)).filter((n) => !isNaN(n));
//   }

//   // 4. Filtreli ürünleri fetch et
//   const initialProducts = await fetchProductsByFilters(categoryIds, brandIds);

//   // 5. initialSelectedBrands / initialSelectedCategories
//   const initialSelectedBrands = brandsDataFilter.filter((b) => brandIds.includes(b.id));
//   const initialSelectedCategories = categoryData.filter((c) => categoryIds.includes(c.id));

//   // 6. Seçili kategori meta ve page verileri (ilk kategori baz alınır)
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
//         categoryId={selectedCategoryObj?.id || null} // slug yerine ID
//       />
//       <Footer categoryData={categoryData} eventsData={eventsData} brandsData={brandsData} />
//     </>
//   );
// }













// File: app/products/page.jsx
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import ProductsPageFilter from "@/components/ProductsPageFilter";
import Footer from "@/components/Footer/Footer";

// Fetch all products (unfiltered)
async function fetchAboutPageData() {
  try {
    const { data: product } = await axiosInstance.get("/page-data/product?per_page=999", {
      cache: "no-store",
    });
    // API dönüşüne göre gerekirse düzelt
    return product.data.data;
  } catch (error) {
    console.error("Failed to fetch product page data", error);
    return [];
  }
}

// Fetch translations
async function getTranslations() {
  try {
    const res = await axiosInstance.get("/translation-list");
    return res;
  } catch (err) {
    console.log("Translation fetch error:", err);
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
    // API yanıt yapısına göre düzelt: Burada category.data.data mı? Örneğin:
    // return category.data.data;
    return category.data.data;
  } catch (error) {
    console.error("Failed to fetch category page data", error);
    return [];
  }
}

// Fetch brands (daha üst seviye)
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

// Fetch events
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

// Fetch SEO data for products page
async function fetchProductsSeoData() {
  try {
    const { data: aboutSeo } = await axiosInstance.get(`/page-data/product-page-info`, {
      cache: "no-store",
    });
    return aboutSeo;
  } catch (error) {
    console.error("Failed to fetch products SEO data", error);
    throw error;
  }
}

// Fetch products by filters (categoryIds, brandIds)
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

// Metadata üretimi
export async function generateMetadata({ searchParams }) {
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

// Main page component
export default async function page({ searchParams }) {
  // 1. URL’den kategori parametresini al
  const categoryParam = searchParams.category || null;
  const brandsParamRaw = searchParams.brands || null; // örn. "17,53"

  // 2. Tüm verileri fetch et
  const productData = await fetchAboutPageData();
  const brandsDataFilter = await fetchBrandFilterPageData();
  const categoryData = await fetchCategoryPageData();
  // İsteğe bağlı debug:
  // console.log("DEBUG categoryData örnek:", categoryData.slice(0, 5));

  // 3. URL parametresine göre seçili kategori objesini bul
  let selectedCategoryObj = null;
  if (categoryParam) {
    // Önce numeric (ID) olarak bak
    const maybeNum = parseInt(categoryParam, 10);
    if (!isNaN(maybeNum)) {
      selectedCategoryObj =
        categoryData.find((c) => {
          if (typeof c.id === "number") {
            return c.id === maybeNum;
          } else {
            // eğer c.id string geliyorsa
            return parseInt(c.id, 10) === maybeNum;
          }
        }) || null;
    }
    // Eğer ID ile bulunamadıysa slug ile dene
    if (!selectedCategoryObj) {
      selectedCategoryObj =
        categoryData.find((c) => c.url_slug === categoryParam) || null;
    }
  }
  // console.log("DEBUG selectedCategoryObj:", selectedCategoryObj);

  // 4. Alt kategorileri bul: parent_id içinde selectedCategoryObj.id olanlar
  let subcategoriesForSelected = [];
  if (selectedCategoryObj) {
    const selId = typeof selectedCategoryObj.id === "number"
      ? selectedCategoryObj.id
      : parseInt(selectedCategoryObj.id, 10);

    subcategoriesForSelected = categoryData.filter((c) => {
      if (!c.parent_id) return false;
      // parent_id API'da dizi olarak geliyorsa:
      if (Array.isArray(c.parent_id)) {
        return c.parent_id.some((p) => {
          const parentId = typeof p.id === "number" ? p.id : parseInt(p.id, 10);
          return parentId === selId;
        });
      }
      // parent_id obje olarak geliyorsa:
      if (typeof c.parent_id === "object" && c.parent_id.id != null) {
        const parentId = typeof c.parent_id.id === "number"
          ? c.parent_id.id
          : parseInt(c.parent_id.id, 10);
        return parentId === selId;
      }
      // parent_id direkt number geliyorsa:
      if (typeof c.parent_id === "number") {
        return c.parent_id === selId;
      }
      return false;
    });
  }
  // console.log("DEBUG subcategoriesForSelected:", subcategoriesForSelected);

  // 5. brandIds oluştur
  let brandIds = [];
  if (brandsParamRaw) {
    const parts = Array.isArray(brandsParamRaw)
      ? brandsParamRaw
      : brandsParamRaw.split(",");
    brandIds = parts
      .map((p) => {
        const parsed = parseInt(p, 10);
        return isNaN(parsed) ? null : parsed;
      })
      .filter((n) => n !== null);
  }

  // 6. Filtreli ürünleri fetch et
  const initialProducts = await fetchProductsByFilters(
    selectedCategoryObj ? [selectedCategoryObj.id] : [],
    brandIds
  );

  // 7. initialSelectedBrands / initialSelectedCategories
  const initialSelectedBrands = brandsDataFilter.filter((b) =>
    brandIds.includes(b.id)
  );
  const initialSelectedCategories = selectedCategoryObj
    ? [selectedCategoryObj]
    : [];

  // 8. Seçili kategori meta/page verileri
  const categoryMetaTitle = selectedCategoryObj?.meta_title || null;
  const categoryMetaDescription = selectedCategoryObj?.meta_description || null;
  const categoryPageTitle = selectedCategoryObj?.page_title || null;
  const categoryPageDescription = selectedCategoryObj?.page_description || null;

  // 9. Diğer veriler
  const translations = await getTranslations();
  const t = translations?.data;
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];
  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  // 10. Hero: tüm ürünler veya filtreli ürünler ihtiyaca göre
  const allProductsForHero = productData; // eğer hero’da tüm ürünleri göstereceksen
  // veya istersen filtreli ürünleri de görebilirsin:
  // const heroProducts = selectedCategoryObj ? initialProducts : productData;

  return (
    <>
      <Header categoryData={categoryData} />

      {/* ProductsPageHero’a selectedCategory ve subcategories prop’larını ekledik */}
      <ProductsPageHero
        t={t}
        productData={allProductsForHero}
        selectedCategory={selectedCategoryObj}
        subcategories={subcategoriesForSelected}
      />

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
        categoryId={selectedCategoryObj?.id || null}
      />

      <Footer
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
      />
    </>
  );
}
