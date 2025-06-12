
// // pages/products/[id]/page.js
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
// import ProductsPageDetailPage from "@/components/ProductsPageDetailPage";
// import axiosInstance from "@/lib/axios";
// import { cookies } from "next/headers";

// async function fetchAllProducts() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   const { data: productRes } = await axiosInstance.get(`/page-data/product`, {
//     cache: "no-store",
//   });
//   return productRes.data.data; // bütün məhsullar array-i
// }
// // *categories
// async function fetchCategoryPageData() {
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");

//   try {
//     const { data: category } = await axiosInstance.get(
//       `/page-data/categories?per_page=999`,
//       {
//         // headers: { Lang: lang.value },
//         cache: "no-store",
//       }
//     );
//     return category;
//   } catch (error) {
//     console.error("Failed to fetch category page data", error);
//     throw error;
//   }
// }
// // *categories

// async function getTranslations() {
//   try {
//     const data = axiosInstance.get("/translation-list");
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }


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










// // !generateMetaData
// export async function generateMetadata() {
//   const seo = await fetchAllProducts();
//   const imageUrl = seo?.data.image;
//   const imageAlt = seo?.data.title || "Adentta";
//   const canonicalUrl = "https://adentta.az";
//   const cookieStore = await cookies();
//   const lang = cookieStore.get("NEXT_LOCALE");
//   return {
//     title: seo?.data.title,
//     description: seo?.data.content,
//     // icons: {
//     //   icon: "https://adentta.az/favicon.ico.svg",
//     // },
//     openGraph: {
//       title: seo?.data.title || "Adentta",
//       description: seo?.data.content,
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
//       title: seo?.data.title || "Adentta",
//       description: seo?.data.content || "Adentta",
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







// export default async function Page({ params }) {
//   const { id } = params;
//   const slug = id.split("-").pop();
//   const allProducts = await fetchAllProducts();
//   const productDetail = allProducts.find((p) => p.id.toString() === slug);
//   const categoryResponse = await fetchCategoryPageData();
//   const categoryData = categoryResponse?.data?.data || [];
//   const translations = await getTranslations();
//   const t = translations?.data;
//   const brandsResponse = await fetchBrandsPageData();
//   const brandsData = brandsResponse?.data?.data || [];

//   const eventsResponse = await fetchEventsPageData();
//   const eventsData = eventsResponse?.data?.data || [];

//   if (!productDetail) return <div>Product not found.</div>;

//   // Oxşar 4 məhsulu filterlə:
//   const catId = productDetail.categories?.[0]?.id;
//   const similarProducts = allProducts
//     .filter((p) => p.id !== productDetail.id && p.categories?.[0]?.id === catId)
//     .slice(0, 4);

//   return (
//     <>
//       {/* <Header /> */}
//       <div className="productBackground">
//         <Header categoryData={categoryData} />
//       </div>
//       <ProductsPageDetailPage
//         t={t}
//         productData={productDetail}
//         similarProducts={similarProducts}
//       />
//       <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
//     </>
//   );
// }

















// !
// pages/products/[id]/page.js
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductsPageDetailPage from "@/components/ProductsPageDetailPage";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

async function fetchAllProducts() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
  const { data: productRes } = await axiosInstance.get(`/page-data/product`, {
    cache: "no-store",
  });
  return productRes.data.data; // bütün məhsullar array-i
}

// *categories
async function fetchCategoryPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: category } = await axiosInstance.get(
      `/page-data/categories?per_page=999`,
      {
        cache: "no-store",
      }
    );
    return category;
  } catch (error) {
    console.error("Failed to fetch category page data", error);
    throw error;
  }
}
// *categories

async function getTranslations() {
  try {
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}

// !brandsApi
async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
      cache: "no-store",
    });
    return brands;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    throw error;
  }
}
// !brandsApi

// !eventsApi
async function fetchEventsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

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
// !eventsApi

// !generateMetadata
export async function generateMetadata({ params }) {
  // URL-dən slug-u ayırırıq
  const slug = params.id.split("-").pop();

  // Bütün məhsulları çəkirik
  const allProducts = await fetchAllProducts();

  // Cari məhsulu tapırıq
  const product = allProducts.find(p => p.id.toString() === slug);

  // Məhsul yoxdursa fallback
  if (!product) {
    return {
      title: "Adentta",
      description: "Product not found.",
    };
  }

  // productData-dan birbaşa götürürük
  const imageUrl = product.image;
  const imageAlt = product.title || "Adentta";
  const canonicalUrl = `https://adentta.az/products/${params.id}`;

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    title: product.title,
    description: product.content,
    openGraph: {
      title: product.title,
      description: product.content,
      url: canonicalUrl,
      images: [
        {
          url: `https://admin.adentta.az/storage${imageUrl}`,
          alt: imageAlt,
          width: 1200,
          height: 630,
        },
      ],
      site_name: "adentta.az",
      type: "website",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.content,
      creator: "@adentta",
      site: "@adentta",
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
// !generateMetadata

export default async function Page({ params }) {
  const { id } = params;
  const slug = id.split("-").pop();
  const allProducts = await fetchAllProducts();
  const productDetail = allProducts.find((p) => p.id.toString() === slug);
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  const translations = await getTranslations();
  const t = translations?.data;
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  if (!productDetail) return <div>Product not found.</div>;

  // Oxşar 4 məhsulu filterlə:
  const catId = productDetail.categories?.[0]?.id;
  const similarProducts = allProducts
    .filter((p) => p.id !== productDetail.id && p.categories?.[0]?.id === catId)
    .slice(0, 4);

  return (
    <>
      <div className="productBackground">
        <Header categoryData={categoryData} />
      </div>
      <ProductsPageDetailPage
        t={t}
        productData={productDetail}
        similarProducts={similarProducts}
      />
      <Footer categoryData={categoryData}  eventsData={eventsData} brandsData={brandsData} />
    </>
  );
}

// !