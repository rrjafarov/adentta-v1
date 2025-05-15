
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
        // headers: { Lang: lang.value },
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


//! brandsApi
async function fetchBrandsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return brands;
  } catch (error) {
    console.error("Failed to fetch brands page data", error);
    throw error;
  }
}
//! brandsApi

//! eventsApi
async function fetchEventsPageData() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  try {
    const { data: events } = await axiosInstance.get(`/page-data/event`, {
      // headers: { Lang: lang.value },
      cache: "no-store",
    });
    return events;
  } catch (error) {
    console.error("Failed to fetch events page data", error);
    throw error;
  }
}
//! eventsApi

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

  if (!productDetail) return <div>Product tapılmadı.</div>;

  // Oxşar 4 məhsulu filterlə:
  const catId = productDetail.categories?.[0]?.id;
  const similarProducts = allProducts
    .filter((p) => p.id !== productDetail.id && p.categories?.[0]?.id === catId)
    .slice(0, 4);

  return (
    <>
      {/* <Header /> */}
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
