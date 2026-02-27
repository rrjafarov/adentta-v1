import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductsPageDetailPage from "@/components/ProductsPageDetailPage";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";

async function fetchSettingsPageData() {
  try {
    const { data: setting } = await axiosInstance.get(
      `/page-data/setting`,
      { cache: "no-store" }
    );
    return setting;
  } catch (error) {
    throw error;
  }
}

async function fetchProductById(id) {
  const { data } = await axiosInstance.get(
    `/first-page-data/${id}`,
    { cache: "no-store" }
  );
  return data?.data || data;
}

async function fetchCategoryPageData() {
  try {
    const { data: category } = await axiosInstance.get(
      `/page-data/categories?per_page=999`,
      { cache: "no-store" }
    );
    return category;
  } catch (error) {
    throw error;
  }
}

async function getTranslations() {
  try {
    const data = axiosInstance.get("/translation-list");
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function fetchBrandsPageData() {
  try {
    const { data: brands } = await axiosInstance.get(
      `/page-data/brands?per_page=999`,
      { cache: "no-store" }
    );
    return brands;
  } catch (error) {
    throw error;
  }
}

async function fetchEventsPageData() {
  try {
    const { data: events } = await axiosInstance.get(
      `/page-data/event`,
      { cache: "no-store" }
    );
    return events;
  } catch (error) {
    throw error;
  }
}

export async function generateMetadata({ params }) {
  const id = params.id.split("-").pop();
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: "Adentta",
      description: "Product not found.",
    };
  }

  const imageUrl = product.image || "";
  const baseUrl = "https://adentta.az";
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "az";

  // locales siyahısını lazım olan dillərlə uyğunlaşdır
  const locales = ["az", "ru", "en"];

  // canonical: baseUrl/{lang}/products/{params.id}
  const canonicalUrl = `${baseUrl}/${lang}/products/${params.id}`;

  // languages map-i avtomatik qururuq
  const languages = locales.reduce((acc, l) => {
    acc[l] = `${baseUrl}/${l}/products/${params.id}`;
    return acc;
  }, {});
  // x-default əlavə et
  languages["x-default"] = baseUrl;

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
          alt: product.title || "Adentta",
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
      images: [`https://admin.adentta.az/storage${imageUrl}`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}


async function fetchContactPageData() {
  try {
    const { data: contact } = await axiosInstance.get(
      `/page-data/contact`,
      { cache: "no-store" }
    );
    return contact;
  } catch (error) {
    throw error;
  }
}


export default async function Page({ params }) {
  const id = params.id.split("-").pop();

  // ✅ Product detail
  const productDetail = await fetchProductById(id);
  if (!productDetail) return <div>Product not found.</div>;

  // ✅ Category, translations, brands, events, setting, contact
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];

  const translations = await getTranslations();
  const t = translations?.data;

  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];

  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];

  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];

  const contact = await fetchContactPageData();
  const rawPhone = contact?.data?.phone || "";
  const whatsappNumber = rawPhone
    .replace(/\D+/g, "")
    .replace(/^00/, "")
    .replace(/^0/, "994")
    .replace(/^(?!994)/, "994");

    

  // ✅ Similar products (category id əsasında)
  let similarProducts = [];
  const categoryId = productDetail.categories?.[0]?.id; // <- əsas category, parent yox
  if (categoryId) {
    const { data } = await axiosInstance.get(
      `/page-data/product?per_page=12&filters[0][key]=categories&filters[0][operator]=IN&filters[0][value][]=${categoryId}`,
      { cache: "no-store" }
    );

    similarProducts = (data?.data?.data || [])
      .filter(p => p.id !== productDetail.id)
      .slice(0, 4); // maksimum 4 oxşar məhsul
  }

  // ✅ Render
  return (
    <>
      <div className="productBackground">
      </div>

      <ProductsPageDetailPage
        t={t}
        productData={productDetail}
        similarProducts={similarProducts}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}

