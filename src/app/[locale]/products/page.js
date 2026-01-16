
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductsPageHero from "@/components/Sliders/ProductsPageHero";
import NewProductPage from "@/components/Footer/NewProductPage";
import React from "react";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

function buildRawQuery(searchParams = {}) {
  const parts = [];
  for (const [key, value] of Object.entries(searchParams || {})) {
    if (Array.isArray(value)) {
      for (const v of value) parts.push(`${key}=${encodeURIComponent(String(v))}`);
    } else if (value !== undefined && value !== null && value !== "") {
      parts.push(`${key}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts.join("&");
}

// ------- SLUG HELPERS -------
const slugify = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getCategorySlug = (cat) =>
  cat?.url_slug ?? cat?.slug ?? cat?.url ?? cat?.urlSlug ?? slugify(cat?.title ?? "");

// URL-dən gələn slug-ı OLDUĞU KİMİ götür (sementler-4 daxil)
function readCategorySlug(categoryParam) {
  if (!categoryParam) return null;
  const raw = Array.isArray(categoryParam) ? categoryParam[0] : String(categoryParam);
  const cleaned = raw.split("?")[0].replace(/\/+$/, "");
  return cleaned || null;
}

// URL-dən GƏLƏN BÜTÜN category slugs (category=... təkrarlı)
function readAllCategorySlugs(rawCategoryParam) {
  if (!rawCategoryParam) return [];
  if (Array.isArray(rawCategoryParam)) {
    return rawCategoryParam
      .map((v) => String(v).split("?")[0].replace(/\/+$/, ""))
      .filter(Boolean);
  }
  return [String(rawCategoryParam).split("?")[0].replace(/\/+$/, "")]
    .filter(Boolean);
}

// ---- HELPERS: parent/child əlaqəsi (server) ----
function normalizeParentIdsServer(parentRaw) {
  if (!parentRaw) return [];
  if (Array.isArray(parentRaw)) {
    return parentRaw
      .map((p) => (typeof p === "object" && p !== null ? p.id : p))
      .map((v) => parseInt(v, 10))
      .filter((v) => Number.isFinite(v));
  }
  if (typeof parentRaw === "object" && parentRaw !== null && parentRaw.id != null) {
    const n = parseInt(parentRaw.id, 10);
    return Number.isFinite(n) ? [n] : [];
  }
  const n = parseInt(parentRaw, 10);
  return Number.isFinite(n) ? [n] : [];
}

function collectDescendantCategoryIdsServer(parentId, categoryData = []) {
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
      const parents = normalizeParentIdsServer(c.parent_id);
      if (parents.includes(current)) {
        const cid = parseInt(c.id, 10);
        if (Number.isFinite(cid) && !result.has(cid)) {
          result.add(cid);
          stack.push(cid);
        }
      }
    }
  }

  // yalnız ALT-lar; baza parent ayrıca əlavə olunacaq
  return Array.from(result);
}

async function fetchProductsPageData(searchParams = {}) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("NEXT_LOCALE");
  const locale = langCookie?.value ?? undefined;

  try {
    const perPage = searchParams?.per_page ? String(searchParams.per_page) : "12";

    // 1) URL-dən BÜTÜN category slugs oxu
    const categorySlugs = readAllCategorySlugs(searchParams?.category ?? searchParams?.["category"]);

    // 2) URL-dən BÜTÜN brand id-lərini oxu
    const brandParams = searchParams?.brand ?? searchParams?.["brand"];
    const brandIds = Array.isArray(brandParams)
      ? brandParams.map((b) => parseInt(b, 10)).filter(Number.isFinite)
      : brandParams != null
      ? [parseInt(brandParams, 10)].filter(Number.isFinite)
      : [];

    // Digər parametrlər
    const otherParams = {};
    for (const [k, v] of Object.entries(searchParams || {})) {
      if (k === "per_page" || k === "category" || k === "brand") continue;
      if (/^filters?\[.*\]/.test(k)) continue;
      otherParams[k] = v;
    }
    const otherQuery = buildRawQuery(otherParams);

    let queryString = `per_page=${encodeURIComponent(perPage)}`;

    if (categorySlugs.length > 0) {
      const { data: catResp } = await axiosInstance.get(`/page-data/categories?per_page=999`, {
        cache: "no-store",
      });
      const allCats =
        Array.isArray(catResp?.data?.data) ? catResp.data.data :
        Array.isArray(catResp?.data) ? catResp.data :
        Array.isArray(catResp?.items) ? catResp.items : [];

      const expandedCatIds = new Set();
      for (const slug of categorySlugs) {
        const match = allCats.find((c) => getCategorySlug(c) === slug);
        if (match?.id != null) {
          const baseId = Number(match.id);
          if (Number.isFinite(baseId)) {
            expandedCatIds.add(baseId);
            collectDescendantCategoryIdsServer(baseId, allCats).forEach((d) =>
              expandedCatIds.add(Number(d))
            );
          }
        }
      }

      if (expandedCatIds.size > 0) {
        queryString += `&filters[0][key]=categories&filters[0][operator]=IN`;
        Array.from(expandedCatIds).forEach((id) => {
          queryString += `&filters[0][value][]=${encodeURIComponent(String(id))}`;
        });
      }
    }

    if (brandIds.length > 0) {
      const nextIdx = queryString.includes("filters[0]") ? 1 : 0;
      queryString += `&filters[${nextIdx}][key]=brands&filters[${nextIdx}][operator]=IN`;
      brandIds.forEach((bid) => {
        queryString += `&filters[${nextIdx}][value][]=${encodeURIComponent(String(bid))}`;
      });
    }

    if (otherQuery) queryString += `&${otherQuery}`;

    const { data } = await axiosInstance.get(`/page-data/product?${queryString}`, {
      headers: locale ? { Lang: locale } : {},
      cache: "no-store",
    });

    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.data?.data)
      ? data.data.data
      : Array.isArray(data?.items)
      ? data.items
      : [];

    return items;
  } catch (error) {
    throw error;
  }
}

async function fetchSettingsPageData() {
  try {
    const { data: setting } = await axiosInstance.get(`/page-data/setting`, {
      cache: "no-store",
    });
    return setting;
  } catch (error) {
    throw error;
  }
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

async function fetchContactPageData() {
  try {
    const { data: contact } = await axiosInstance.get(`/page-data/contact`, {
      cache: "no-store",
    });
    return contact;
  } catch (error) {
    throw error;
  }
}

async function fetchEventsPageData() {
  try {
    const { data: events } = await axiosInstance.get(`/page-data/event`, {
      cache: "no-store",
    });
    return events;
  } catch (error) {
    throw error;
  }
}

async function fetchBrandsPageData() {
  try {
    const { data: brands } = await axiosInstance.get(`/page-data/brands?per_page=999`, {
      cache: "no-store",
    });
    return brands;
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

export async function generateMetadata({ searchParams }) {
  const catSlug = readCategorySlug(searchParams?.category);
  let metaSourceCategory = null;

  if (catSlug) {
    const categoryResp = await fetchCategoryPageData();
    const allCats = categoryResp?.data?.data || [];
    metaSourceCategory = allCats.find((c) => getCategorySlug(c) === catSlug) || null;
  }

  if (!metaSourceCategory) {
    const products = await fetchProductsPageData(searchParams ?? {});
    const firstProduct = products?.[0];
    metaSourceCategory = firstProduct?.categories?.[0] || null;
  }

  const title = metaSourceCategory?.meta_title || "Adentta";
  const description = metaSourceCategory?.meta_description || "Adentta";
  const canonicalUrl = "https://adentta.az";

  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: metaSourceCategory?.icon
        ? [
            {
              url: `https://admin.adentta.az/storage${metaSourceCategory.icon}`,
              alt: title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      site_name: "adentta.az",
      type: "website",
      locale: lang?.value,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@adentta",
      site: "@adentta",
      images: metaSourceCategory?.icon
        ? [`https://admin.adentta.az/storage${metaSourceCategory.icon}`]
        : [],
    },
    alternates: { canonical: canonicalUrl },
  };
}

const Page = async ({ searchParams }) => {
  const productData = await fetchProductsPageData(searchParams ?? {});
  const setting = await fetchSettingsPageData();
  const settingData = setting?.data || [];
  const categoryResponse = await fetchCategoryPageData();
  const categoryData = categoryResponse?.data?.data || [];
  const contact = await fetchContactPageData();
  const brandsResponse = await fetchBrandsPageData();
  const brandsData = brandsResponse?.data?.data || [];
  const eventsResponse = await fetchEventsPageData();
  const eventsData = eventsResponse?.data?.data || [];
  const translations = await getTranslations();
  const t = translations?.data;

  // Seçilmiş kateqoriya — SLUG ilə (EXACT match)
  const categorySlug = readCategorySlug(searchParams?.category);
  let selectedCategoryObj = null;
  if (categorySlug) {
    selectedCategoryObj =
      categoryData.find((c) => getCategorySlug(c) === categorySlug) || null;
  }

  // Alt kateqoriyalar UI üçündür
  let subcategoriesForSelected = [];
  if (selectedCategoryObj) {
    const selId = parseInt(selectedCategoryObj.id, 10);

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
          typeof c.parent_id.id === "number" ? c.parent_id.id : parseInt(c.parent_id.id, 10);
        return pid === selId;
      }

      return c.parent_id === selId;
    });
  }

  return (
    <div>
      <Header settingData={settingData} categoryData={categoryData} />
      <ProductsPageHero
        t={t}
        productData={productData}
        selectedCategory={selectedCategoryObj}
        subcategories={subcategoriesForSelected}
        categoryData={categoryData}
      />
      <NewProductPage
        categoryData={categoryData}
        brandsData={brandsData}
        t={t}
        productData={productData}
        selectedCategory={selectedCategoryObj}
      />
      <Footer
        contact={contact}
        categoryData={categoryData}
        eventsData={eventsData}
        brandsData={brandsData}
      />
    </div>
  );
};

export default Page;

